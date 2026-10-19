import hashlib
import json
import subprocess
import unittest
from copy import deepcopy

import numpy as np
from sklearn.metrics import roc_auc_score

from leakagelens.__main__ import read_csv
from leakagelens.audit import audit, row_key
from leakagelens.benchmark import dataset
from leakagelens.model import ROOT, load_model, predict
from leakagelens.profile import FEATURES, auc, numeric, profile
from leakagelens.train import fit, matrix


class LeakageLensTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.model = load_model()
        cls.train = read_csv(ROOT / 'samples/train.csv')
        cls.test = read_csv(ROOT / 'samples/test.csv')
        cls.records = [json.loads(line) for line in (ROOT / 'artifacts/benchmark.jsonl').read_text().splitlines()]

    def run_audit(self, train=None, test=None, **kwargs):
        return audit(train or self.train, test or self.test, 'target', group='customer_id', time='observed_at', model=self.model, **kwargs)

    def test_planted_exact_overlap(self):
        report = self.run_audit(include_near=False)
        self.assertEqual(report['exact_overlap']['count'], 8)
        self.assertEqual(report['exact_overlap']['test_fraction'], 0.1)

    def test_planted_group_and_timestamp_overlap(self):
        report = self.run_audit(include_near=False)
        observed = {row['kind']: row for row in report['findings']}
        self.assertEqual(observed['group_overlap']['count'], 5)
        self.assertEqual(observed['time_interleaving']['evidence'], 'observed')

    def test_declared_feature_availability_is_distinct_from_model_score(self):
        report = self.run_audit(unavailable=['final_outcome'], include_near=False)
        observed = [row for row in report['findings'] if row['kind'] == 'unavailable_feature']
        self.assertEqual(observed[0]['evidence'], 'user_declared')
        self.assertTrue(any(row['column'] == 'review_code' and row['available_at_prediction'] == 'unknown' for row in report['columns']))

    def test_clean_partition_has_no_structural_findings(self):
        left = read_csv(ROOT / 'samples/clean_train.csv')
        right = read_csv(ROOT / 'samples/clean_test.csv')
        report = self.run_audit(left, right, include_near=False)
        self.assertEqual(report['findings'], [])
        self.assertEqual(report['exact_overlap']['count'], 0)

    def test_known_near_duplicate_found_and_exact_rows_excluded(self):
        report = self.run_audit()
        matches = report['near_overlap']['matches']
        self.assertTrue(any(row['test_row'] == 8 and row['train_row'] == 35 for row in matches))
        self.assertFalse(any(row['test_row'] < 8 for row in matches))
        self.assertNotIn('review_code', report['near_overlap']['numeric_columns'])

    def test_target_not_part_of_row_matching(self):
        changed = deepcopy(self.test)
        changed[0]['target'] = str(1 - int(changed[0]['target']))
        self.assertEqual(self.run_audit(test=changed, include_near=False)['exact_overlap']['count'], 8)

    def test_test_labels_never_affect_column_scores(self):
        changed = deepcopy(self.test)
        for row in changed: row['target'] = 'completely different test label'
        original = self.run_audit(include_near=False)['columns']
        actual = self.run_audit(test=changed, include_near=False)['columns']
        self.assertEqual(original, actual)

    def test_absent_test_target_is_supported(self):
        test = [{key: value for key, value in row.items() if key != 'target'} for row in self.test]
        self.assertEqual(self.run_audit(test=test, include_near=False)['exact_overlap']['count'], 8)

    def test_target_proxy_numeric_profile(self):
        labels = [0, 1] * 30
        stats = profile(labels, labels)
        self.assertAlmostEqual(stats['oriented_auc'], 1)
        self.assertEqual(stats['binary_agreement'], 1)
        self.assertEqual(stats['repeated_value_purity'], 1)

    def test_constant_and_missing_columns_finite(self):
        labels = [0, 1] * 30
        for column in ([None] * 60, [1] * 60, ['category'] * 60):
            self.assertTrue(all(np.isfinite(value) for value in profile(column, labels).values()))

    def test_auc_tie_handling_matches_sklearn(self):
        labels = [0, 1, 0, 1, 0, 1]
        values = [1, 1, 2, 4, 4, 4]
        expected = roc_auc_score(labels, values)
        self.assertAlmostEqual(auc(labels, values), max(expected, 1 - expected))

    def test_numeric_parser_does_not_treat_category_codes_as_numbers(self):
        self.assertIsNone(numeric('1_2'))
        self.assertIsNone(numeric('NaN'))
        self.assertIsNone(numeric('inf'))
        self.assertEqual(numeric(' -1.2e3 '), -1200)

    def test_duplicate_keys_normalize_numeric_strings(self):
        self.assertEqual(row_key({'x': '1.0', 'y': ''}, ['x', 'y']), row_key({'x': 1, 'y': None}, ['x', 'y']))

    def test_input_guards(self):
        with self.assertRaises(ValueError): self.run_audit(unavailable=['not_a_feature'], include_near=False)
        broken = deepcopy(self.train); broken[0]['target'] = None
        with self.assertRaises(ValueError): self.run_audit(train=broken, include_near=False)
        broken = deepcopy(self.train); broken[0]['observed_at'] = 'not a time'
        with self.assertRaises(ValueError): self.run_audit(train=broken, include_near=False)
        with self.assertRaises(ValueError): audit([], self.test, 'target')

    def test_benchmark_source_groups_are_disjoint_and_hash_matches(self):
        groups = {name: {r['dataset_id'] for r in self.records if r['split'] == name} for name in ('train', 'validation', 'test')}
        self.assertFalse(groups['train'] & groups['test'])
        self.assertFalse(groups['train'] & groups['validation'])
        self.assertFalse(groups['validation'] & groups['test'])
        report = json.loads((ROOT / 'artifacts/evaluation.json').read_text())
        self.assertEqual(hashlib.sha256((ROOT / 'artifacts/benchmark.jsonl').read_bytes()).hexdigest(), report['dataset_sha256'])

    def test_portable_forest_matches_fitted_sklearn_model(self):
        classifier = fit([r for r in self.records if r['split'] == 'train'])
        expected = classifier.predict_proba(matrix(self.records))[:, 1]
        actual = [predict(row['stats'], self.model)['score'] for row in self.records]
        np.testing.assert_allclose(actual, expected, atol=1e-12)

    def test_browser_profiles_and_predictions_match_python(self):
        labels, columns = dataset(71)
        inputs = [{'values': values, 'labels': labels} for _, values, _, _ in columns]
        script = "const fs=require('node:fs'),c=require('./web/core.js');const d=JSON.parse(fs.readFileSync(0,'utf8'));console.log(JSON.stringify(d.inputs.map(r=>{const stats=c.profile(r.values,r.labels);return {stats,prediction:c.predict(stats,d.model)}})));"
        result = subprocess.run(['node', '-e', script], input=json.dumps({'inputs': inputs, 'model': self.model}), check=True, capture_output=True, text=True, cwd=ROOT)
        for original, browser in zip(inputs, json.loads(result.stdout)):
            stats = profile(original['values'], original['labels'])
            np.testing.assert_allclose([browser['stats'][name] for name in FEATURES], [stats[name] for name in FEATURES], atol=1e-12)
            self.assertAlmostEqual(browser['prediction']['score'], predict(stats, self.model)['score'], places=12)

    def test_browser_audit_matches_cli_overlap_and_scores(self):
        script = "const fs=require('node:fs'),c=require('./web/core.js');const d=JSON.parse(fs.readFileSync(0,'utf8'));console.log(JSON.stringify(c.audit(d.train,d.test,{target:'target',group:'customer_id',time:'observed_at',unavailable:['final_outcome']},d.model)));"
        result = subprocess.run(['node', '-e', script], input=json.dumps({'train': self.train, 'test': self.test, 'model': self.model}), check=True, capture_output=True, text=True, cwd=ROOT)
        browser = json.loads(result.stdout); python = self.run_audit(unavailable=['final_outcome'], include_near=False)
        self.assertEqual(browser['exact_overlap'], python['exact_overlap'])
        for expected, actual in zip(python['columns'], browser['columns']):
            self.assertEqual(expected['column'], actual['column'])
            self.assertAlmostEqual(expected['model']['score'], actual['model']['score'], places=12)

    def test_report_does_not_include_raw_observation_values(self):
        report = self.run_audit(include_near=False)
        self.assertFalse(report['raw_rows_in_report'])
        serialized = json.dumps(report)
        self.assertNotIn('customer_10', serialized)
        self.assertNotIn('2025-01-', serialized)


if __name__ == '__main__':
    unittest.main()
