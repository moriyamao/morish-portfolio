"""Training-partition statistics used by the learned column reviewer."""

from collections import Counter, defaultdict
import math
import re
import statistics

FEATURES = ['abs_correlation', 'oriented_auc', 'unique_ratio', 'missing_rate',
            'binary_agreement', 'repeated_value_purity', 'missingness_auc',
            'abs_rank_correlation', 'is_numeric']


def numeric(value):
    if value is None or str(value).strip() == '':
        return None
    if not re.fullmatch(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?', str(value).strip()):
        return None
    try:
        number = float(value)
        return number if math.isfinite(number) else None
    except (ValueError, TypeError):
        return None


def ranks(values):
    order = sorted(range(len(values)), key=values.__getitem__)
    result = [0.0] * len(values)
    cursor = 0
    while cursor < len(order):
        end = cursor + 1
        while end < len(order) and values[order[end]] == values[order[cursor]]:
            end += 1
        for index in order[cursor:end]:
            result[index] = (cursor + end + 1) / 2
        cursor = end
    return result


def correlation(left, right):
    lm, rm = statistics.mean(left), statistics.mean(right)
    numerator = sum((a - lm) * (b - rm) for a, b in zip(left, right))
    denominator = math.sqrt(sum((a - lm) ** 2 for a in left) * sum((b - rm) ** 2 for b in right))
    return numerator / denominator if denominator else 0.0


def auc(labels, scores):
    positives = sum(labels)
    negatives = len(labels) - positives
    if not positives or not negatives:
        return 0.5
    ranked = ranks(scores)
    value = (sum(rank for rank, label in zip(ranked, labels) if label) - positives * (positives + 1) / 2) / (positives * negatives)
    return max(value, 1 - value)


def profile(values, labels):
    if len(values) != len(labels) or len(values) < 2 or set(labels) != {0, 1}:
        raise ValueError('A column needs aligned rows and both binary target classes.')
    missing = [value is None or str(value).strip() == '' for value in values]
    observed = [value for value, absent in zip(values, missing) if not absent]
    numbers = [numeric(value) for value in observed]
    is_numeric = bool(observed) and all(value is not None for value in numbers)
    # Canonical strings make categorical purity independent of label encodings.
    keys = [None if absent else str(value) for value, absent in zip(values, missing)]
    if is_numeric:
        fill = statistics.median(numbers) if numbers else 0.0
        encoded = [fill if absent else float(value) for value, absent in zip(values, missing)]
        keys = [None if absent else str(float(value)) for value, absent in zip(values, missing)]
    else:
        categories = {value: i for i, value in enumerate(sorted(set(v for v in keys if v is not None)))}
        encoded = [-1 if value is None else categories[value] for value in keys]
    groups = defaultdict(Counter)
    for key, label in zip(keys, labels):
        if key is not None:
            groups[key][label] += 1
    repeated = [counts for counts in groups.values() if sum(counts.values()) >= 3]
    support = sum(sum(counts.values()) for counts in repeated)
    purity = sum(max(counts.values()) for counts in repeated) / support if support else 0.5
    if is_numeric and all(value in (0, 1) for value in encoded):
        agreement = max(sum(a == b for a, b in zip(encoded, labels)), sum(a != b for a, b in zip(encoded, labels))) / len(labels)
    else:
        agreement = 0.5
    vector = [abs(correlation(encoded, labels)), auc(labels, encoded), len(groups) / len(values),
              sum(missing) / len(values), agreement, purity, auc(labels, [int(v) for v in missing]),
              abs(correlation(ranks(encoded), labels)), float(is_numeric)]
    return dict(zip(FEATURES, vector))
