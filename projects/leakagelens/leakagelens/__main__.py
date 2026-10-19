import argparse
import csv
import json
from pathlib import Path

from .audit import audit


def read_csv(path):
    with Path(path).open(newline='', encoding='utf-8-sig') as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames or len(set(reader.fieldnames)) != len(reader.fieldnames):
            raise ValueError('CSV headers must be present and unique.')
        rows = list(reader)
        if any(None in row or any(v is None for v in row.values()) for row in rows):
            raise ValueError('CSV rows must match the header width.')
        return rows


def main():
    parser = argparse.ArgumentParser(description='Audit a binary classification train/test split locally.')
    parser.add_argument('--train', required=True)
    parser.add_argument('--test', required=True)
    parser.add_argument('--target', required=True)
    parser.add_argument('--group')
    parser.add_argument('--time')
    parser.add_argument('--unavailable', nargs='*', default=[])
    parser.add_argument('--ignore', nargs='*', default=[])
    parser.add_argument('--no-near', action='store_true')
    args = parser.parse_args()
    try:
        report = audit(read_csv(args.train), read_csv(args.test), args.target, group=args.group,
                       time=args.time, unavailable=args.unavailable, ignore=args.ignore, include_near=not args.no_near)
    except (ValueError, OSError) as error:
        parser.exit(2, str(error) + '\n')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()
