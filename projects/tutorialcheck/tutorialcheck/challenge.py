"""Independently authored challenge snippets, never used for fitting or tuning."""

CASES = [
    ("csv_then_append", "import pandas as p\nfrom io import StringIO\norders = p.read_csv(StringIO('price\\n10\\n20'))\nresult = orders.append(orders)\n"),
    ("direct_import_append", "from pandas import DataFrame\nbasket = DataFrame({'qty': [1]})\nresult = basket.append(basket)\n"),
    ("chained_append", "import pandas as p\nresult = p.DataFrame({'stock': [9]}).append(p.DataFrame({'stock': [8]}))\n"),
    ("parameter_iteritems", "import pandas as p\ndef summarize(table):\n    return list(table.iteritems())\nresult = summarize(p.DataFrame({'stock': [3]}))\n"),
    ("csv_removed_argument", "from io import StringIO\nimport pandas as tables\nresult = tables.read_csv(StringIO('visitors\\n42'), squeeze=True)\n"),
    ("index_removed", "import pandas as library\nresult = library.Int64Index(range(4))\n"),
    ("np_removed", "import pandas\nresult = pandas.np.zeros(3)\n"),
    ("date_removed", "import pandas as dataframes\nresult = dataframes.datetime(2025, 7, 18)\n"),
    ("empty_append", "import pandas as p\nrows = p.DataFrame(columns=['x'])\nresult = rows.append({'x': 2}, ignore_index=True)\n"),
    ("series_from_dict", "import pandas as p\nvisitors = p.Series({'Monday': 12})\nresult = list(visitors.iteritems())\n"),
    ("series_append_different_names", "import pandas as p\nbefore = p.Series([8])\nafter = p.Series([9])\nresult = before.append(after)\n"),
    ("warn_bad_lines_removed", "import pandas as p\nfrom io import StringIO\nresult = p.read_csv(StringIO('x\\n1'), warn_bad_lines=False)\n"),
    ("list_aggregation", "import pandas as p\nframe = p.DataFrame({'price': [2, 4]})\nprices = []\nfor item in frame['price']:\n    prices.append(item)\nassert prices == [2, 4]\n"),
    ("index_append_is_valid", "import pandas as p\nfirst = p.Index([10])\nresult = first.append(p.Index([20]))\nassert len(result) == 2\n"),
    ("string_mentions_obsolete_api", "import pandas as pd\nnotice = 'Do not use pd.Int64Index or DataFrame.append anymore'\nresult = pd.DataFrame({'note': [notice]})\nassert len(result) == 1\n"),
    ("comment_mentions_obsolete_api", "import pandas as pd\n# Old examples use pd.np and series.iteritems; this one uses current APIs.\nresult = pd.Series([1, 2]).sum()\nassert result == 3\n"),
    ("modern_csv", "from io import StringIO\nimport pandas as p\nresult = p.read_csv(StringIO('views\\n81')).squeeze('columns')\nassert result.iloc[0] == 81\n"),
    ("modern_concat", "from pandas import DataFrame, concat\nresult = concat([DataFrame({'cost': [8]}), DataFrame({'cost': [9]})])\nassert len(result) == 2\n"),
    ("dictionary_items", "import pandas as p\ncounts = {'a': 2}\nresult = p.DataFrame(list(counts.items()))\nassert len(result) == 1\n"),
    ("modern_timestamp", "import pandas as p\nresult = p.Timestamp('2025-07-18')\nassert result.year == 2025\n"),
    ("modern_numpy", "import numpy as np\nimport pandas as p\nresult = p.DataFrame(np.zeros((2, 2)))\nassert result.shape == (2, 2)\n"),
    ("custom_append", "import pandas as p\nclass Basket:\n    def append(self, item):\n        return item\nresult = Basket().append(p.Series([4]))\nassert result.iloc[0] == 4\n"),
    ("modern_items", "import pandas as p\nresult = {key: values.sum() for key, values in p.DataFrame({'views': [2, 5]}).items()}\nassert result['views'] == 7\n"),
    ("grouped_aggregation", "import pandas as p\nresult = p.DataFrame({'team': ['A', 'A'], 'views': [1, 4]}).groupby('team')['views'].sum()\nassert result.iloc[0] == 5\n"),
]


def examples():
    for name, code in CASES:
        yield {"id": name, "code": code}
