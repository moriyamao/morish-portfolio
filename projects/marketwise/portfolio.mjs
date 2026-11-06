import {ASSETS,getAsset,quote} from './engine.mjs';

export const STARTING_CASH=10000;
export const FEE_RATE=.001;
export const MIN_FEE=.25;
const cents=value=>Math.round((value+Number.EPSILON)*100)/100;
export const tradingFee=value=>cents(Math.max(MIN_FEE,value*FEE_RATE));

export function createPortfolio(){return {version:1,cash:STARTING_CASH,netContributions:STARTING_CASH,holdings:{},realizedPnL:0,feesPaid:0,pendingOrders:[],transactions:[],nextOrderId:1};}

function assertOrder(order){
  getAsset(order.assetId);
  if(!['buy','sell'].includes(order.side)||!['market','limit'].includes(order.type))throw new Error('Choose a valid order.');
  if(!Number.isInteger(order.quantity)||order.quantity<1||order.quantity>10000)throw new Error('Quantity must be a whole number from 1 to 10,000.');
  if(order.type==='limit'&&(!Number.isFinite(order.limitPrice)||order.limitPrice<=0))throw new Error('Enter a positive limit price.');
}

function reservedCash(portfolio,exceptId){return cents(portfolio.pendingOrders.filter(order=>order.id!==exceptId&&order.side==='buy').reduce((sum,order)=>{const gross=cents(order.limitPrice*order.quantity);return sum+gross+tradingFee(gross);},0));}
function reservedShares(portfolio,assetId,exceptId){return portfolio.pendingOrders.filter(order=>order.id!==exceptId&&order.side==='sell'&&order.assetId===assetId).reduce((sum,order)=>sum+order.quantity,0);}

function fill(portfolio,market,order,price){
  const next=structuredClone(portfolio),gross=cents(price*order.quantity),fee=tradingFee(gross),current=next.holdings[order.assetId]||{quantity:0,costBasis:0};
  if(order.side==='buy'){
    const debit=cents(gross+fee),available=cents(next.cash-reservedCash(next,order.id));if(debit>available)throw new Error(`Not enough available cash. This purchase needs $${debit.toFixed(2)}.`);
    next.cash=cents(next.cash-debit);next.holdings[order.assetId]={quantity:current.quantity+order.quantity,costBasis:cents(current.costBasis+debit)};
  }else{
    const available=current.quantity-reservedShares(next,order.assetId,order.id);if(available<order.quantity)throw new Error(`You have ${available} available share${available===1?'':'s'}, so you cannot sell ${order.quantity}.`);
    const credit=cents(gross-fee),cost=cents(current.costBasis*(order.quantity/current.quantity));
    next.cash=cents(next.cash+credit);next.realizedPnL=cents(next.realizedPnL+credit-cost);
    const remaining=current.quantity-order.quantity;if(remaining)next.holdings[order.assetId]={quantity:remaining,costBasis:cents(current.costBasis-cost)};else delete next.holdings[order.assetId];
  }
  next.feesPaid=cents(next.feesPaid+fee);
  const transaction={id:order.id,day:market.day,assetId:order.assetId,side:order.side,quantity:order.quantity,price,gross,fee,type:order.type,...(order.type==='limit'?{limitPrice:order.limitPrice}:{})};
  next.transactions=[transaction,...next.transactions].slice(0,100);return {portfolio:next,transaction};
}

function executablePrice(market,order){const current=quote(market,order.assetId);if(order.type==='market')return order.side==='buy'?current.ask:current.bid;if(order.side==='buy'&&current.ask<=order.limitPrice)return current.ask;if(order.side==='sell'&&current.bid>=order.limitPrice)return current.bid;return null;}

export function placeOrder(portfolio,market,input){
  const order={...input,id:`order-${portfolio.nextOrderId}`};assertOrder(order);
  const holding=portfolio.holdings[order.assetId]||{quantity:0};
  if(order.side==='sell'&&holding.quantity-reservedShares(portfolio,order.assetId)<order.quantity)throw new Error('You do not have enough unreserved shares for this order.');
  if(order.type==='limit'&&order.side==='buy'){const gross=cents(order.limitPrice*order.quantity),needed=cents(gross+tradingFee(gross));if(needed>cents(portfolio.cash-reservedCash(portfolio)))throw new Error('You do not have enough unreserved cash for this limit order.');}
  const price=executablePrice(market,order);
  if(price!==null){const result=fill({...portfolio,nextOrderId:portfolio.nextOrderId+1},market,order,price);return {...result,status:'filled'};}
  const next=structuredClone(portfolio);next.nextOrderId++;next.pendingOrders.push(order);return {portfolio:next,order,status:'pending'};
}

export function processPendingOrders(portfolio,market){
  let next=structuredClone(portfolio);const filled=[],waiting=[];
  for(const order of [...next.pendingOrders]){const price=executablePrice(market,order);if(price===null){waiting.push(order);continue;}next.pendingOrders=next.pendingOrders.filter(item=>item.id!==order.id);const result=fill(next,market,order,price);next=result.portfolio;filled.push(result.transaction);}
  next.pendingOrders=waiting;return {portfolio:next,filled};
}

export function cancelOrder(portfolio,id){const next=structuredClone(portfolio),before=next.pendingOrders.length;next.pendingOrders=next.pendingOrders.filter(order=>order.id!==id);if(next.pendingOrders.length===before)throw new Error('Pending order not found.');return next;}

export function portfolioSummary(portfolio,market){
  let holdingsValue=0,costBasis=0,liquidationValue=portfolio.cash;const positions=[];
  for(const asset of ASSETS){const holding=portfolio.holdings[asset.id];if(!holding)continue;const marketValue=cents(holding.quantity*market.prices[asset.id]),basis=holding.costBasis,unrealized=cents(marketValue-basis),saleGross=cents(holding.quantity*quote(market,asset.id).bid),saleNet=cents(saleGross-tradingFee(saleGross));holdingsValue=cents(holdingsValue+marketValue);costBasis=cents(costBasis+basis);liquidationValue=cents(liquidationValue+saleNet);positions.push({assetId:asset.id,...holding,averageCost:holding.costBasis/holding.quantity,marketValue,costBasis:basis,liquidationValue:saleNet,unrealizedPnL:unrealized,returnPct:basis?unrealized/basis*100:0});}
  const totalValue=cents(portfolio.cash+holdingsValue),totalPnL=cents(totalValue-portfolio.netContributions),investedReturnPct=costBasis?((holdingsValue-costBasis)/costBasis)*100:0;
  return {cash:portfolio.cash,holdingsValue,totalValue,liquidationValue,totalPnL,totalReturnPct:totalPnL/portfolio.netContributions*100,realizedPnL:portfolio.realizedPnL,unrealizedPnL:cents(holdingsValue-costBasis),investedReturnPct,positions};
}

export function validatePortfolio(value){
  if(!value||value.version!==1||!Number.isFinite(value.cash)||value.cash<0||!Number.isFinite(value.netContributions)||value.netContributions<=0||!Number.isFinite(value.realizedPnL)||!Number.isFinite(value.feesPaid)||value.feesPaid<0||!Number.isInteger(value.nextOrderId)||value.nextOrderId<1||!Array.isArray(value.pendingOrders)||!Array.isArray(value.transactions))throw new Error('This portfolio save is not valid.');
  for(const [id,holding] of Object.entries(value.holdings||{})){getAsset(id);if(!Number.isInteger(holding.quantity)||holding.quantity<1||!Number.isFinite(holding.costBasis)||holding.costBasis<=0)throw new Error('This portfolio save has invalid holdings.');}
  const ids=new Set();for(const order of value.pendingOrders){assertOrder(order);if(typeof order.id!=='string'||!order.id||ids.has(order.id))throw new Error('This portfolio save has invalid pending orders.');ids.add(order.id);}
  for(const transaction of value.transactions){if(typeof transaction?.id!=='string'||!Number.isInteger(transaction.day)||transaction.day<0||!Number.isFinite(transaction.price)||transaction.price<=0||!Number.isFinite(transaction.fee)||transaction.fee<0)throw new Error('This portfolio save has invalid transactions.');assertOrder(transaction);}
  return structuredClone(value);
}
