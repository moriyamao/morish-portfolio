"""Small, original fixtures; no scraped tutorials or user code are executed."""

TARGET = "2.2.3"
DOCS = "https://pandas.pydata.org/pandas-docs/version/2.2.3/whatsnew/v2.0.0.html"

MIGRATIONS = {
    "frame_append": ("DataFrame.append", "Use pd.concat([frame, other], ignore_index=True). Dicts/Series need conversion to a DataFrame first."),
    "series_append": ("Series.append", "Use pd.concat([series, other], ignore_index=True)."),
    "frame_iteritems": ("DataFrame.iteritems", "Use frame.items() to iterate over columns."),
    "series_iteritems": ("Series.iteritems", "Use series.items() to iterate over index/value pairs."),
    "csv_squeeze": ("read_csv(squeeze=...)", "Remove squeeze and call .squeeze('columns') on the returned DataFrame."),
    "csv_bad_lines": ("read_csv(error_bad_lines=...)", "Replace error_bad_lines=False with on_bad_lines='skip'; True corresponds to 'error'."),
    "int64index": ("pd.Int64Index", "Use pd.Index(values, dtype='int64')."),
    "float64index": ("pd.Float64Index", "Use pd.Index(values, dtype='float64')."),
    "uint64index": ("pd.UInt64Index", "Use pd.Index(values, dtype='uint64')."),
    "pd_datetime": ("pd.datetime", "Import datetime from Python's datetime module, or use pd.Timestamp for a pandas timestamp."),
    "pd_np": ("pd.np", "Import numpy directly: import numpy as np."),
}


def examples():
    """Keep both sides of a migration and all value variants in one split group."""
    for context in range(6):
        split = "train" if context < 4 else "validation" if context == 4 else "test"
        for variant in range(3):
            alias = ("pd", "pandas_lib", "tablelib")[variant]
            name = ("data", "records", "observations")[variant]
            n = 2 + variant + context * 3
            frames = [
                f"{alias}.DataFrame({{'value': [{n}, {n + 1}]}})",
                f"{alias}.DataFrame.from_records([{{'value': {n}}}, {{'value': {n + 1}}}])",
                f"{alias}.DataFrame.from_dict({{'value': [{n}, {n + 1}]}})",
                f"{alias}.DataFrame(list(zip([{n}, {n + 1}])), columns=['value'])",
                f"{alias}.DataFrame({{'value': range({n}, {n + 2})}})",
                f"{alias}.DataFrame([({n},), ({n + 1},)], columns=['value'])",
            ]
            prefix = f"import pandas as {alias}\nfrom io import StringIO\n"
            frame = f"{name} = {frames[context]}\n"
            series = f"{name} = {alias}.Series([{n}, {n + 1}])\n"
            pairs = {
                "frame_append": (frame, f"{name}.append({name}, ignore_index=True)", f"{alias}.concat([{name}, {name}], ignore_index=True)", "assert len(result) == 4"),
                "series_append": (series, f"{name}.append({name}, ignore_index=True)", f"{alias}.concat([{name}, {name}], ignore_index=True)", "assert len(result) == 4"),
                "frame_iteritems": (frame, f"list({name}.iteritems())", f"list({name}.items())", "assert len(result) == 1"),
                "series_iteritems": (series, f"list({name}.iteritems())", f"list({name}.items())", "assert len(result) == 2"),
                "csv_squeeze": (f"text = StringIO('value\\n{n}\\n{n + 1}\\n')\n", f"{alias}.read_csv(text, squeeze=True)", f"{alias}.read_csv(text).squeeze('columns')", "assert result.ndim == 1 and len(result) == 2"),
                "csv_bad_lines": (f"text = StringIO('a,b\\n{n},1\\n{n + 1},2,3\\n')\n", f"{alias}.read_csv(text, error_bad_lines=False)", f"{alias}.read_csv(text, on_bad_lines='skip')", "assert len(result) == 1"),
                "int64index": ("", f"{alias}.Int64Index([{n}, {n + 1}])", f"{alias}.Index([{n}, {n + 1}], dtype='int64')", "assert str(result.dtype) == 'int64'"),
                "float64index": ("", f"{alias}.Float64Index([{n}.0, {n + 1}.0])", f"{alias}.Index([{n}.0, {n + 1}.0], dtype='float64')", "assert str(result.dtype) == 'float64'"),
                "uint64index": ("", f"{alias}.UInt64Index([{n}, {n + 1}])", f"{alias}.Index([{n}, {n + 1}], dtype='uint64')", "assert str(result.dtype) == 'uint64'"),
                "pd_datetime": ("from datetime import datetime\n", f"{alias}.datetime(2024, 1, {n})", f"datetime(2024, 1, {n})", "assert result.year == 2024"),
                "pd_np": ("import numpy as np\n", f"{alias}.np.array([{n}, {n + 1}])", f"np.array([{n}, {n + 1}])", "assert result.shape == (2,)"),
            }
            for family, (setup, legacy, repaired, check) in pairs.items():
                for version, expression in [("legacy", legacy), ("repaired", repaired)]:
                    body = setup + f"result = {expression}\n{check}\n"
                    # The wrapper changes syntax without supplying the target label.
                    body = wrap(body, context)
                    yield {"id": f"{family}-{context}-{variant}-{version}", "family": family,
                           "recipe_group": f"{family}-{context}", "split": split,
                           "variant": version, "code": prefix + body}
            # Hard negatives: a Python list's append is still valid.
            body = f"{name} = [{n}, {n + 1}]\n{name}.append({n + 2})\nresult = {name}\nassert len(result) == 3\n"
            yield {"id": f"list_append-{context}-{variant}", "family": "list_append",
                   "recipe_group": f"list_append-{context}", "split": split,
                   "variant": "working_control", "code": prefix + wrap(body, context)}


def wrap(body, context):
    indented = "".join("    " + line + "\n" for line in body.splitlines())
    if context in (1, 4, 5):
        name = {1: "build_example", 4: "load_tutorial", 5: "prepare_report"}[context]
        return f"def {name}():\n" + indented + f"    return result\nresult = {name}()\n"
    if context == 2:
        return "if True:\n" + indented
    if context == 3:
        return "for attempt in range(1):\n" + indented
    return body
