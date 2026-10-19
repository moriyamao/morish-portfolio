import ast
import hashlib
import json
import subprocess
import unittest
from unittest.mock import patch

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

from tutorialcheck.analyze import analyze, diagnose
from tutorialcheck.catalog import examples
from tutorialcheck.model import ROOT, TOKEN_PATTERN, load_model, predict


class TutorialCheckTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.model = load_model()
        cls.rows = [json.loads(line) for line in (ROOT / 'artifacts/benchmark.jsonl').read_text().splitlines()]

    def test_no_group_or_identical_source_leakage(self):
        for field in ('recipe_group', 'code'):
            sets = {name: {r[field] for r in self.rows if r['split'] == name} for name in ('train', 'validation', 'test')}
            self.assertFalse(sets['train'] & sets['validation'])
            self.assertFalse(sets['train'] & sets['test'])
            self.assertFalse(sets['validation'] & sets['test'])

    def test_original_fixtures_all_parse(self):
        for row in examples():
            ast.parse(row['code'])

    def test_dataset_hash_and_counts_match_report(self):
        raw = (ROOT / 'artifacts/benchmark.jsonl').read_bytes()
        report = json.loads((ROOT / 'artifacts/evaluation.json').read_text())
        self.assertEqual(hashlib.sha256(raw).hexdigest(), report['dataset_sha256'])
        self.assertEqual(len(self.rows), sum(report['counts'].values()))
        self.assertEqual(report['challenge']['count'], 24)

    def test_model_arithmetic_matches_sklearn(self):
        vectorizer = TfidfVectorizer(token_pattern=TOKEN_PATTERN, lowercase=True, ngram_range=(1, 2), sublinear_tf=True, vocabulary=self.model['vocabulary'])
        vectorizer.idf_ = np.array(self.model['idf'])
        texts = [r['code'] for r in self.rows]
        logits = vectorizer.transform(texts) @ np.array(self.model['coefficients']) + self.model['intercept']
        expected = 1 / (1 + np.exp(-logits))
        actual = [predict(text, self.model)['risk_score'] for text in texts]
        np.testing.assert_allclose(actual, expected, atol=1e-12)

    def test_browser_inference_matches_python(self):
        cases = [r['code'] for r in self.rows]
        report = json.loads((ROOT / 'artifacts/evaluation.json').read_text())
        cases += [r['code'] for r in report['challenge']['cases']] + ['', 'SELECT customer FROM purchases', '🔥']
        script = "const fs=require('node:fs');const {predict}=require('./web/inference.js');const d=JSON.parse(fs.readFileSync(0,'utf8'));console.log(JSON.stringify(d.codes.map(c=>predict(c,d.model))));"
        result = subprocess.run(['node', '-e', script], input=json.dumps({'codes': cases, 'model': self.model}), capture_output=True, text=True, check=True, cwd=ROOT)
        actual = json.loads(result.stdout)
        for text, browser in zip(cases, actual):
            python = predict(text, self.model)
            self.assertAlmostEqual(browser['risk_score'], python['risk_score'], places=12)
            self.assertAlmostEqual(browser['coverage'], python['coverage'], places=12)
            self.assertEqual(browser['prediction'], python['prediction'])

    def test_aliased_import_and_line_location(self):
        report = diagnose("import pandas as tables\nrows = tables.DataFrame({'x': [1]})\nresult = rows.append(rows)\n")
        self.assertEqual(report[0]['family'], 'frame_append')
        self.assertEqual(report[0]['line'], 3)
        self.assertEqual(report[0]['certainty'], 'confirmed_symbol')

    def test_list_append_is_not_flagged(self):
        self.assertEqual(diagnose('items = []\nitems.append(2)\n'), [])

    def test_unknown_receiver_is_not_confirmed(self):
        report = diagnose('def add(rows):\n    return rows.append(1)\n')
        self.assertEqual(report[0]['certainty'], 'receiver_unknown')

    def test_string_and_comment_not_treated_as_calls(self):
        self.assertEqual(diagnose("# pd.Int64Index([1])\ntext = 'df.append(other)'\n"), [])

    def test_read_csv_keyword(self):
        report = diagnose("import pandas as pd\nresult = pd.read_csv('data.csv', squeeze=True)\n")
        self.assertEqual(report[0]['family'], 'csv_squeeze')

    def test_modern_concat_has_no_catalogued_issue(self):
        self.assertEqual(diagnose("import pandas as pd\nresult = pd.concat([a, b])\n"), [])

    def test_snippet_is_not_executed(self):
        source = "import os\nos.system('exit 99')\n"
        with patch('os.system', side_effect=AssertionError('Snippet executed')):
            self.assertFalse(analyze(source, self.model)['executed_user_code'])

    def test_target_and_size_guards(self):
        with self.assertRaises(ValueError):
            analyze('pass', self.model, target='1.5.3')
        with self.assertRaises(ValueError):
            analyze('x' * 50001, self.model)

    def test_empty_input_abstains(self):
        self.assertTrue(predict('', self.model)['abstained'])

    def test_syntax_error_is_reported(self):
        with self.assertRaises(SyntaxError):
            analyze('def broken(', self.model)


if __name__ == '__main__':
    unittest.main()
