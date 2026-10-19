"""Conservative AST checks complement a learned triage score."""

import ast
from .catalog import DOCS, MIGRATIONS, TARGET
from .model import predict


def diagnose(code):
    tree = ast.parse(code)
    aliases = {node.asname or node.name for node in ast.walk(tree)
               if isinstance(node, ast.Import) for node in node.names if node.name == "pandas"}
    findings = []
    # Bindings are local to each lexical scope. Unknown receivers remain uncertain.
    def inspect_scope(statements, inherited=None):
        bindings = dict(inherited or {})
        for statement in statements:
            if isinstance(statement, (ast.FunctionDef, ast.AsyncFunctionDef)):
                local = {k: v for k, v in bindings.items() if k not in {a.arg for a in statement.args.args}}
                inspect_scope(statement.body, local)
                continue
            for node in ast.walk(statement):
                if isinstance(node, ast.Assign):
                    kind = None
                    value = node.value
                    if isinstance(value, ast.List):
                        kind = "list"
                    elif isinstance(value, ast.Call) and isinstance(value.func, ast.Attribute):
                        receiver = value.func.value
                        if isinstance(receiver, ast.Name) and receiver.id in aliases:
                            kind = {"DataFrame": "frame", "Series": "series", "read_csv": "frame"}.get(value.func.attr)
                        elif isinstance(receiver, ast.Attribute) and isinstance(receiver.value, ast.Name) and receiver.value.id in aliases and receiver.attr == "DataFrame":
                            kind = "frame"
                    for target in node.targets:
                        if isinstance(target, ast.Name):
                            bindings[target.id] = kind
                if not isinstance(node, ast.Call) or not isinstance(node.func, ast.Attribute):
                    continue
                receiver, method = node.func.value, node.func.attr
                family = None
                certainty = "confirmed_symbol"
                if isinstance(receiver, ast.Name) and receiver.id in aliases:
                    family = {"Int64Index": "int64index", "Float64Index": "float64index", "UInt64Index": "uint64index", "datetime": "pd_datetime"}.get(method)
                    if method == "read_csv":
                        for keyword in node.keywords:
                            candidate = {"squeeze": "csv_squeeze", "error_bad_lines": "csv_bad_lines"}.get(keyword.arg)
                            if candidate:
                                add(candidate, node, certainty)
                elif isinstance(receiver, ast.Attribute) and isinstance(receiver.value, ast.Name) and receiver.value.id in aliases and receiver.attr == "np":
                    family = "pd_np"
                elif method in ("append", "iteritems"):
                    kind = bindings.get(receiver.id) if isinstance(receiver, ast.Name) else None
                    if kind in ("frame", "series"):
                        family = kind + "_" + method
                    elif kind != "list":
                        family = "frame_" + method
                        certainty = "receiver_unknown"
                if family:
                    add(family, node, certainty)
    def add(family, node, certainty):
        title, suggestion = MIGRATIONS[family]
        findings.append({"family": family, "line": node.lineno, "column": node.col_offset,
                         "end_line": node.end_lineno, "symbol": title, "certainty": certainty,
                         "suggestion": suggestion, "docs": DOCS})
    inspect_scope(tree.body)
    unique = {(f["family"], f["line"], f["column"]): f for f in findings}
    return sorted(unique.values(), key=lambda f: (f["line"], f["column"]))


def analyze(code, model=None, target=TARGET):
    if target != TARGET:
        raise ValueError(f"This model is execution-validated only for pandas {TARGET}; requested {target}.")
    if len(code) > 50000:
        raise ValueError("Keep snippets below 50,000 characters.")
    findings = diagnose(code)
    return {"target": TARGET, "model": predict(code, model), "findings": findings,
            "executed_user_code": False,
            "scope": "Known pandas 2.0 removals, evaluated against 2.2.3. A low score does not establish compatibility."}
