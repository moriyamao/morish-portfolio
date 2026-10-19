import pandas as pd

orders = pd.DataFrame({'total': [250, 120]})
new_orders = pd.DataFrame({'total': [90]})
result = orders.append(new_orders, ignore_index=True)
print(result)
