"""Synthetic provenance is known; high predictive power alone is not a label."""

import numpy as np
from .profile import profile


def dataset(seed):
    rng = np.random.default_rng(seed)
    count = 160 + (seed % 5) * 40
    x = rng.normal(size=(count, 6))
    before = 1.2 * x[:, 0] + 0.6 * x[:, 1] + 0.4 * np.sin(x[:, 2])
    y = (before + rng.normal(scale=0.7, size=count) > 0).astype(int)
    columns = []
    for index in range(6):
        columns.append((f'preexisting_{index}', x[:, index].tolist(), 0, 'legitimate'))
    columns.extend([
        ('strong_preexisting', before.tolist(), 0, 'legitimate_signal'),
        ('identifier', rng.permutation(count).tolist(), 0, 'identifier'),
        ('random_category', rng.integers(0, 6, count).astype(str).tolist(), 0, 'category_control'),
        ('constant', [1] * count, 0, 'constant'),
        ('random_missing', [None if rng.random() < 0.3 else float(v) for v in x[:, 3]], 0, 'missing_control'),
        ('label_copy', y.tolist(), 1, 'copy'),
        ('label_inverse', (1 - y).tolist(), 1, 'inverse'),
        ('label_scaled', (y * 73 + 11).tolist(), 1, 'scaled'),
        ('label_noise', (y + rng.normal(scale=0.18, size=count)).tolist(), 1, 'noisy'),
        ('label_flips', np.where(rng.random(count) < 0.15, 1 - y, y).tolist(), 1, 'corrupted_copy'),
        ('outcome_code', [f'{"yes" if label else "no"}_{rng.integers(0, 4)}' for label in y], 1, 'codebook'),
        ('outcome_missing', [None if label else float(value) for label, value in zip(y, x[:, 4])], 1, 'missingness'),
        ('outcome_magnitude', ((2 * y - 1) * rng.uniform(1, 3, count)).tolist(), 1, 'signed_magnitude'),
    ])
    return y.tolist(), columns


def records():
    for seed in range(40):
        labels, columns = dataset(seed)
        split = 'train' if seed < 24 else 'validation' if seed < 30 else 'test'
        for name, values, label, mechanism in columns:
            yield {'dataset_id': seed, 'column_id': name, 'split': split, 'label': label,
                   'mechanism': mechanism, 'stats': profile(values, labels)}


def real_data_challenge():
    # scikit-learn's bundled UCI Wine data: original columns are preexisting measurements.
    from sklearn.datasets import load_wine
    wine = load_wine()
    y = (wine.target == 0).astype(int).tolist()
    for index, name in enumerate(wine.feature_names):
        yield {'column_id': name, 'label': 0, 'stats': profile(wine.data[:, index].tolist(), y)}
    rng = np.random.default_rng(503)
    injected = [
        ('injected_copy', y),
        ('injected_scaled', [value * 17 + 3 for value in y]),
        ('injected_noisy', (np.array(y) + rng.normal(scale=0.2, size=len(y))).tolist()),
        ('injected_missing', [None if value else float(rng.normal()) for value in y]),
        ('injected_code', [f'{value}_{i % 3}' for i, value in enumerate(y)]),
    ]
    for name, values in injected:
        yield {'column_id': name, 'label': 1, 'stats': profile(values, y)}
