import pandas as pd

orders = pd.DataFrame({'total': [250, 120]})
new_orders = pd.DataFrame({'total': [90]})
result = pd.concat([orders, new_orders], ignore_index=True)
assert result['total'].tolist() == [250, 120, 90]
print(result)
