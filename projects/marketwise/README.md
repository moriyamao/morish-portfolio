# MARKETWISE

A beginner-friendly practice market made with buildless HTML, CSS, and
JavaScript. MARKETWISE uses generated companies, prices, events, and practice
capital. It does not request real financial information, execute real-money
trades, or make investment recommendations.

## Step 1: implemented

- $10,000 starting capital, eight generated companies across different sectors,
  and one generated broad-market index fund.
- Seeded daily price movement with individual drift and volatility settings.
- Random company, sector, and market-wide headlines that apply visible price
  shocks. Results from a MARKETWISE run do not predict real returns.
- Market orders at the current bid or ask; limit orders that wait for a chosen
  price. Pending orders reserve the cash or shares needed to prevent double use.
- Bid/ask spread, trading fees, exact cent-based cost basis, holdings, marked
  value, estimated liquidation value, realized/unrealized P&L, and total return.
- Plain-language “Why this matters” explanations where each Step 1 concept first
  appears.
- Local autosave plus validated JSON download and upload.
- Responsive desktop and mobile layouts with native labeled controls.

## How the market model works

Each asset starts with a generated price. One MARKETWISE day applies a geometric
Brownian motion step: a small expected-return term plus a random move scaled by
that asset's volatility. This keeps prices positive and makes high-volatility
companies move more sharply. A generated headline can add a one-time company,
sector, or market shock. The same saved random state produces the same next day.

Prices are stored with more precision than the two decimals shown on screen.
Buying uses the ask price; selling uses the bid price. A small fee is charged on
each trade. Holdings store their total cost basis in cents so partial sales and
P&L remain internally consistent. Portfolio value uses the displayed middle
price, while the UI separately reports an estimate of what the portfolio would
return if every holding were sold at current bids after fees.

## Run and test

Serve the repository over HTTP, then open `/projects/marketwise/`. Browser ES
modules do not run reliably from a double-clicked `file:` URL.

```powershell
node --test projects/marketwise/*.test.mjs
```

The tests cover deterministic positive price paths, targeted news shocks,
bid/ask quotes, malformed saves, market-order execution, fees, limit-order
reservation and fills, insufficient-fund atomicity, partial-sale P&L, and
portfolio validation.

## Planned later steps

Playback speeds and longer skips, full range charts, lessons, diversification
comparisons, dollar-cost averaging, bull/bear scenarios, sector pie charts, and
the report card are intentionally outside Step 1.
