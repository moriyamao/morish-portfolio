"""Observed split problems are separate from learned column suspicions."""

from collections import defaultdict
from datetime import datetime
import json
import math
import statistics

from .model import predict, load_model
from .profile import numeric, profile


def canonical(value):
    if value is None or str(value).strip() == '':
        return None
    number = numeric(value)
    if number is not None:
        return int(number) if number.is_integer() else number
    return str(value)


def row_key(row, columns):
    return json.dumps([canonical(row.get(column)) for column in columns], ensure_ascii=False, separators=(',', ':'))


def quantile(values, q):
    values = sorted(values)
    position = (len(values) - 1) * q
    lower = math.floor(position)
    return values[lower] + (values[math.ceil(position)] - values[lower]) * (position - lower)


def near_duplicates(train, test, columns, exact, threshold=0.02):
    # Bound CPU and disclose the deterministic sample; statistics are fit on train only.
    t_sample, v_sample = train[:2000], test[:500]
    selected = []
    for column in columns:
        values = [numeric(row.get(column)) for row in t_sample]
        observed = [value for value in values if value is not None]
        if len(observed) < max(2, 0.8 * len(values)):
            continue
        median = statistics.median(observed)
        scale = quantile(observed, 0.75) - quantile(observed, 0.25)
        if scale > 0:
            selected.append((column, median, scale))
    if not selected:
        return {'matches': [], 'numeric_columns': [], 'train_rows_scanned': len(t_sample), 'test_rows_scanned': len(v_sample), 'threshold': threshold}
    def vector(row):
        return [((numeric(row.get(name)) if numeric(row.get(name)) is not None else fill) - fill) / scale for name, fill, scale in selected]
    train_vectors = [vector(row) for row in t_sample]
    matches = []
    for index, row in enumerate(v_sample):
        if index in exact:
            continue
        target = vector(row)
        distance, nearest = min((math.sqrt(sum((a - b) ** 2 for a, b in zip(target, candidate)) / len(selected)), i) for i, candidate in enumerate(train_vectors))
        if distance <= threshold:
            matches.append({'test_row': index, 'train_row': nearest, 'distance': distance})
    return {'matches': matches[:20], 'match_count_in_sample': len(matches), 'numeric_columns': [row[0] for row in selected],
            'train_rows_scanned': len(t_sample), 'test_rows_scanned': len(v_sample), 'threshold': threshold}


def audit(train, test, target, group=None, time=None, unavailable=(), ignore=(), model=None, include_near=True):
    if not train or not test:
        raise ValueError('Both training and test data must contain rows.')
    if len(train) > 20000 or len(test) > 20000:
        raise ValueError('This prototype accepts at most 20,000 rows per partition.')
    required = [target] + ([group] if group else []) + ([time] if time else [])
    for column in required:
        if any(column not in row for row in train) or (column != target and any(column not in row for row in test)):
            raise ValueError(f'Missing required column: {column}')
    if len(train) < 40:
        raise ValueError('Use at least 40 training rows for statistical review.')
    classes = sorted(set(str(row[target]) for row in train))
    if len(classes) != 2 or any(row[target] is None or str(row[target]).strip() == '' for row in train):
        raise ValueError('The current reviewer supports a non-missing binary training target only.')
    labels = [classes.index(str(row[target])) for row in train]
    if min(labels.count(0), labels.count(1)) < 10:
        raise ValueError('At least ten training rows per target class are required.')
    excluded = {target, group, time, *ignore}
    columns = [column for column in train[0] if column not in excluded]
    if not columns or len(columns) > 100:
        raise ValueError('Choose between 1 and 100 feature columns.')
    if any(set(row) != set(train[0]) for row in train):
        raise ValueError('Training rows must have a consistent schema.')
    if any(any(column not in row for column in columns) for row in test):
        raise ValueError('Test data is missing training feature columns.')
    if any(column not in columns for column in unavailable):
        raise ValueError('Unavailable columns must be included feature columns.')
    index = defaultdict(list)
    for row_number, row in enumerate(train):
        index[row_key(row, columns)].append(row_number)
    overlap = []
    for row_number, row in enumerate(test):
        key = row_key(row, columns)
        if key in index:
            overlap.append({'test_row': row_number, 'train_row': index[key][0]})
    conflicts = 0
    for rows in index.values():
        if len({str(train[i][target]) for i in rows}) > 1:
            conflicts += 1
    findings = []
    if overlap:
        findings.append({'kind': 'exact_overlap', 'evidence': 'observed', 'count': len(overlap),
                         'message': 'Test feature rows also occur in training. Check whether those observations should be independent.'})
    if group:
        left = {str(row[group]) for row in train if row[group] is not None and str(row[group]).strip()}
        right = {str(row[group]) for row in test if row[group] is not None and str(row[group]).strip()}
        shared = left & right
        if shared:
            findings.append({'kind': 'group_overlap', 'evidence': 'observed', 'count': len(shared),
                             'message': 'Entities occur in both partitions; this undermines evaluation on unseen entities.'})
    if time:
        def stamp(row):
            try:
                parsed = datetime.fromisoformat(str(row[time]).replace('Z', '+00:00'))
                if parsed.tzinfo is None:
                    from datetime import timezone
                    parsed = parsed.replace(tzinfo=timezone.utc)
                return parsed.timestamp()
            except (ValueError, TypeError):
                raise ValueError(f'Invalid ISO timestamp in {time}') from None
        train_times, test_times = [stamp(row) for row in train], [stamp(row) for row in test]
        if max(train_times) >= min(test_times):
            findings.append({'kind': 'time_interleaving', 'evidence': 'observed',
                             'count': sum(value >= min(test_times) for value in train_times),
                             'message': 'Some training timestamps meet or exceed the earliest test timestamp. Review the forecast cutoff.'})
    model = model or load_model()
    column_reports = []
    for column in columns:
        stats = profile([row.get(column) for row in train], labels)
        risk = predict(stats, model)
        column_reports.append({'column': column, 'stats': stats, 'model': risk,
                               'available_at_prediction': False if column in unavailable else 'unknown'})
        if column in unavailable:
            findings.append({'kind': 'unavailable_feature', 'evidence': 'user_declared', 'column': column,
                             'message': 'You declared this feature unavailable at prediction time; exclude it from the prediction pipeline.'})
    near = near_duplicates(train, test, columns, {row['test_row'] for row in overlap}) if include_near else None
    if near and near.get('match_count_in_sample', 0):
        findings.append({'kind': 'near_overlap', 'evidence': 'distance_heuristic', 'count': near['match_count_in_sample'],
                         'message': 'Numerically similar rows were found in a bounded sample. These may be legitimate similar observations.'})
    return {'task': 'binary classification', 'train_rows': len(train), 'test_rows': len(test),
            'feature_columns': columns, 'excluded_columns': sorted(v for v in excluded if v is not None),
            'exact_overlap': {'count': len(overlap), 'test_fraction': len(overlap) / len(test), 'examples': overlap[:20]},
            'conflicting_train_feature_groups': conflicts, 'near_overlap': near, 'findings': findings,
            'columns': sorted(column_reports, key=lambda row: -row['model']['score']),
            'model_scope': 'Synthetic target-proxy similarity score, not proof of leakage or a calibrated probability.',
            'limitations': ['An audit cannot recover data collection timing or preprocessing history from CSV values.',
                            'Strong legitimate predictors can look like leaked outcomes. Feature availability requires human review.',
                            'Exact matching uses selected features, excluding target and declared identifiers/times.',
                            'Near matching considers numeric features only and scans at most 2,000 train and 500 test rows.'],
            'raw_rows_in_report': False}
