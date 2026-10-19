"""Portable random forest inference from JSON, without pickle."""

import json
from pathlib import Path
from .profile import FEATURES

ROOT = Path(__file__).resolve().parents[1]


def load_model():
    return json.loads((ROOT / 'artifacts/model.json').read_text())


def predict(stats, model=None):
    model = model or load_model()
    vector = [stats[name] for name in model['features']]
    scores = []
    for tree in model['trees']:
        node = 0
        while tree['left'][node] != -1:
            feature = tree['feature'][node]
            node = tree['left'][node] if vector[feature] <= tree['threshold'][node] else tree['right'][node]
        scores.append(tree['risk'][node])
    score = sum(scores) / len(scores)
    return {'score': score, 'review': score >= model['threshold'], 'calibrated': False}


def heuristic(stats):
    return float(stats['abs_correlation'] >= 0.98 or
                 (stats['repeated_value_purity'] >= 0.99 and stats['unique_ratio'] <= 0.2))
