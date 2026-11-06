import test from 'node:test';
import assert from 'node:assert/strict';
import {createMarket,quote,stepMarket} from './engine.mjs';
import {createPortfolio,placeOrder,portfolioSummary,processPendingOrders,tradingFee,validatePortfolio} from './portfolio.mjs';

test('market buy uses ask and fee, then immediate sale loses spread plus fees',()=>{
  const market=createMarket(),current=quote(market,'nova'),start=createPortfolio(),buy=placeOrder(start,market,{assetId:'nova',side:'buy',type:'market',quantity:3}),buyGross=current.ask*3,buyFee=tradingFee(buyGross);
  assert.equal(buy.transaction.price,current.ask);assert.equal(buy.portfolio.cash,Math.round((10000-buyGross-buyFee)*100)/100);
  const sell=placeOrder(buy.portfolio,market,{assetId:'nova',side:'sell',type:'market',quantity:3}),sellGross=current.bid*3,sellFee=tradingFee(sellGross),summary=portfolioSummary(sell.portfolio,market);
  assert.equal(summary.totalPnL,-Math.round(((current.ask-current.bid)*3+buyFee+sellFee)*100)/100);
  assert.equal(summary.totalPnL,summary.realizedPnL+summary.unrealizedPnL);
});

test('limit order waits, reserves cash, and fills at an improved quote',()=>{
  const market=createMarket(),limit=quote(market,'nova').ask-1,placed=placeOrder(createPortfolio(),market,{assetId:'nova',side:'buy',type:'limit',quantity:100,limitPrice:limit});assert.equal(placed.status,'pending');
  assert.throws(()=>placeOrder(placed.portfolio,market,{assetId:'nova',side:'buy',type:'limit',quantity:10000,limitPrice:limit}),/unreserved cash/);
  const cheaper=structuredClone(market);cheaper.prices.nova=limit-1;cheaper.history.nova.at(-1).price=limit-1;const processed=processPendingOrders(placed.portfolio,cheaper);assert.equal(processed.filled.length,1);assert.ok(processed.filled[0].price<limit);assert.equal(processed.portfolio.pendingOrders.length,0);
});

test('sell orders cannot promise shares the user does not own twice',()=>{
  const market=createMarket(),owned=placeOrder(createPortfolio(),market,{assetId:'harvest',side:'buy',type:'market',quantity:5}).portfolio;
  const first=placeOrder(owned,market,{assetId:'harvest',side:'sell',type:'limit',quantity:4,limitPrice:100});assert.equal(first.status,'pending');
  assert.throws(()=>placeOrder(first.portfolio,market,{assetId:'harvest',side:'sell',type:'limit',quantity:2,limitPrice:100}),/unreserved shares/);
});

test('failed market order is atomic',()=>{const market=createMarket(),portfolio=createPortfolio(),snapshot=structuredClone(portfolio);assert.throws(()=>placeOrder(portfolio,market,{assetId:'nova',side:'buy',type:'market',quantity:10000}),/cash/);assert.deepEqual(portfolio,snapshot);});

test('cent cost basis keeps realized and unrealized P&L consistent after partial sale',()=>{
  const market=createMarket(),bought=placeOrder(createPortfolio(),market,{assetId:'cedar',side:'buy',type:'market',quantity:7}).portfolio,moved=stepMarket(market,{event:null}),sold=placeOrder(bought,moved,{assetId:'cedar',side:'sell',type:'market',quantity:3}).portfolio,summary=portfolioSummary(sold,moved);
  assert.equal(summary.totalPnL,Math.round((summary.realizedPnL+summary.unrealizedPnL)*100)/100);
});

test('portfolio validation rejects broken accounting and duplicate order ids',()=>{
  const valid=createPortfolio();assert.deepEqual(validatePortfolio(valid),valid);const bad={...valid,feesPaid:NaN};assert.throws(()=>validatePortfolio(bad),/valid/);
  const order={id:'same',assetId:'nova',side:'buy',type:'limit',quantity:1,limitPrice:1},duplicate={...valid,pendingOrders:[order,{...order}]};assert.throws(()=>validatePortfolio(duplicate),/pending/);
});
