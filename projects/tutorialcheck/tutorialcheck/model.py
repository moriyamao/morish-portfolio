"""Portable TF-IDF + logistic regression inference; model files are JSON."""

from collections import Counter
import json
import math
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
TOKEN_PATTERN = r"[A-Za-z_][A-Za-z_0-9]*"


def features(code):
    tokens = re.findall(TOKEN_PATTERN, code.lower())
    return tokens + [left + " " + right for left, right in zip(tokens, tokens[1:])]


def load_model(path=None):
    return json.loads(Path(path or ROOT / "artifacts" / "model.json").read_text())


def predict(code, model=None):
    model = model or load_model()
    counts = Counter(features(code))
    vocab = model["vocabulary"]
    weighted = {vocab[term]: (1 + math.log(count)) * model["idf"][vocab[term]]
                for term, count in counts.items() if term in vocab}
    length = math.sqrt(sum(value * value for value in weighted.values())) or 1
    contributions = [{"feature": model["terms"][index], "weight": value / length * model["coefficients"][index]}
                     for index, value in weighted.items()]
    logit = model["intercept"] + sum(row["weight"] for row in contributions)
    score = 1 / (1 + math.exp(-max(-700, min(700, logit))))
    coverage = sum(count for term, count in counts.items() if term in vocab) / max(sum(counts.values()), 1)
    abstain = coverage < model["minimum_coverage"] or len(code.strip()) < 10
    return {"risk_score": score, "coverage": coverage, "abstained": abstain,
            "prediction": None if abstain else int(score >= model["threshold"]),
            "contributors": sorted(contributions, key=lambda row: abs(row["weight"]), reverse=True)[:6]}
