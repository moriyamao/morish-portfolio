import argparse
import json
from pathlib import Path
import sys

from .analyze import analyze
from .catalog import TARGET


def main():
    parser = argparse.ArgumentParser(description='Review pandas tutorial compatibility without executing the snippet.')
    parser.add_argument('file', type=Path)
    parser.add_argument('--target', default=TARGET)
    parser.add_argument('--json', action='store_true', dest='as_json')
    args = parser.parse_args()
    try:
        report = analyze(args.file.read_text(), target=args.target)
    except (SyntaxError, ValueError, OSError) as error:
        parser.exit(2, str(error) + '\n')
    if args.as_json:
        print(json.dumps(report, indent=2))
    else:
        model = report['model']
        print(f"pandas {report['target']} | risk score {model['risk_score']:.3f} | coverage {model['coverage']:.0%}")
        if model['abstained']:
            print('Model abstained: insufficient familiar input.')
        for issue in report['findings']:
            print(f"L{issue['line']} {issue['symbol']} [{issue['certainty']}]: {issue['suggestion']}")
            print('  ' + issue['docs'])
        print(report['scope'])
    return 0


if __name__ == '__main__':
    sys.exit(main())
