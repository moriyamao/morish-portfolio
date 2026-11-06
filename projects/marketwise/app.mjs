import {ASSETS,createMarket,getAsset,quote,stepMarket,validateMarket} from './engine.mjs';
import {cancelOrder,createPortfolio,placeOrder,portfolioSummary,processPendingOrders,tradingFee,validatePortfolio} from './portfolio.mjs';

const $=id=>document.getElementById(id),storageKey='marketwise.simulation.v1';
let market=createMarket(),portfolio=createPortfolio(),selectedId=ASSETS[0].id;
const money=value=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
const percent=value=>`${value>=0?'+':''}${value.toFixed(2)}%`;

function setMessage(text,error=false){$('order-message').textContent=text;$('order-message').classList.toggle('error',error);}
function saveLocal(){try{localStorage.setItem(storageKey,JSON.stringify({version:1,market,portfolio}));$('save-status').textContent='Saved on this device';}catch{$('save-status').textContent='Autosave unavailable';}}
function download(blob,name){const link=document.createElement('a'),url=URL.createObjectURL(blob);link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function dailyChange(id){const history=market.history[id];if(history.length<2)return 0;return (history.at(-1).price/history.at(-2).price-1)*100;}
function riskLevel(volatility){return Math.max(1,Math.min(5,Math.round(volatility/.08)));}

function sparkline(id){const points=market.history[id].slice(-30),values=points.map(point=>point.price),min=Math.min(...values),max=Math.max(...values),range=max-min||1,coords=points.map((point,index)=>`${points.length===1?50:index/(points.length-1)*100},${54-(point.price-min)/range*48}`).join(' ');return `<svg class="spark" viewBox="0 0 100 58" preserveAspectRatio="none" role="img" aria-label="Recent MARKETWISE price path"><line x1="0" y1="55" x2="100" y2="55"/><polyline points="${coords}"/></svg>`;}

function renderMarket(){
  $('market-rows').innerHTML=ASSETS.map(asset=>{const change=dailyChange(asset.id),risk=riskLevel(asset.volatility);return `<tr data-asset="${asset.id}" class="${asset.id===selectedId?'selected':''}" tabindex="0"><td><span class="company"><strong>${asset.name}</strong><small>${asset.ticker}${asset.isIndex?' · INDEX FUND':''}</small></span></td><td class="sector">${asset.sector}</td><td class="price">${money(market.prices[asset.id])}<span class="change ${change>0?'positive':change<0?'negative':''}">${market.day?percent(change):'Opening price'}</span></td><td><span class="risk-meter" aria-label="${risk} of 5 volatility">${[1,2,3,4,5].map(n=>`<i class="${n<=risk?'on':''}"></i>`).join('')}</span></td></tr>`;}).join('');
  document.querySelectorAll('[data-asset]').forEach(row=>{const choose=()=>{selectedId=row.dataset.asset;render();};row.addEventListener('click',choose);row.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose();}});});
}

function renderAsset(){const asset=getAsset(selectedId),current=quote(market,selectedId),change=dailyChange(selectedId);$('asset-detail').innerHTML=`<div class="asset-title"><div><h3>${asset.name}</h3><span>${asset.ticker} · ${asset.sector}</span></div><span>${asset.isIndex?'BASKET OF COMPANIES':'SINGLE COMPANY'}</span></div><p class="asset-price">${money(current.mid)}</p><div class="asset-meta"><span class="${change>0?'positive':change<0?'negative':''}">${market.day?`${percent(change)} today`:'Day 0 opening price'}</span><span>${Math.round(asset.volatility*100)}% yearly volatility setting</span></div>${sparkline(selectedId)}`;$('bid-price').textContent=money(current.bid);$('ask-price').textContent=money(current.ask);if(!$('limit-price').value)$('limit-price').value=current.mid.toFixed(2);updateEstimate();}

function updateEstimate(){const current=quote(market,selectedId),quantity=Number($('quantity').value)||0,side=document.querySelector('[name=side]:checked').value,type=$('order-type').value,limit=Number($('limit-price').value),price=type==='limit'&&limit>0?limit:(side==='buy'?current.ask:current.bid),gross=price*quantity,fee=tradingFee(gross);$('order-estimate').textContent=quantity?money(side==='buy'?gross+fee:gross-fee):'—';$('fee-estimate').textContent=quantity?`${money(fee)} fee · estimate uses ${type==='limit'?'your limit':'the current quote'}`:'Includes trading fee';}

function renderPortfolio(){
  const summary=portfolioSummary(portfolio,market),pnlClass=summary.totalPnL>0?'positive':summary.totalPnL<0?'negative':'';
  $('cash-value').textContent=money(summary.cash);$('holdings-value').textContent=money(summary.holdingsValue);$('total-value').textContent=money(summary.totalValue);$('pnl-value').textContent=`${summary.totalPnL>=0?'+':''}${money(summary.totalPnL)}`;$('pnl-value').className=pnlClass;$('pnl-percent').textContent=percent(summary.totalReturnPct);$('pnl-percent').className=pnlClass;$('fee-total').textContent=`${money(portfolio.feesPaid)} paid in fees · ${money(summary.liquidationValue)} if sold now`;
  $('holdings').innerHTML=summary.positions.length?summary.positions.map(position=>{const asset=getAsset(position.assetId),css=position.unrealizedPnL>0?'positive':position.unrealizedPnL<0?'negative':'';return `<article class="holding"><div><h3>${asset.ticker}</h3><small>${position.quantity} share${position.quantity===1?'':'s'} · avg. ${money(position.averageCost)}</small></div><span>${money(position.marketValue)}</span><small>${asset.sector}</small><small class="holding-pnl ${css}">${position.unrealizedPnL>=0?'+':''}${money(position.unrealizedPnL)}</small></article>`;}).join(''):'<p class="empty"><b>Your cash is ready.</b>Choose an investment, then buy a share to create your first holding.</p>';
  $('pending-orders').innerHTML=portfolio.pendingOrders.length?portfolio.pendingOrders.map(order=>`<div class="pending-order"><span><b>${order.side.toUpperCase()} ${order.quantity} ${getAsset(order.assetId).ticker}</b><br>at ${money(order.limitPrice)} or better</span><button data-cancel="${order.id}">Cancel</button></div>`).join(''):'<p class="pending-empty">No orders are waiting.</p>';
  document.querySelectorAll('[data-cancel]').forEach(button=>button.addEventListener('click',()=>{try{portfolio=cancelOrder(portfolio,button.dataset.cancel);saveLocal();render();setMessage('Pending order cancelled.');}catch(error){setMessage(error.message,true);}}));
}

function render(){renderMarket();renderAsset();renderPortfolio();$('day-label').textContent=`DAY ${market.day}`;const legacyOpening='The market opens quietly. Prices will change as each simulated day passes.';$('news-headline').textContent=market.lastNews.headline===legacyOpening?'The market opens quietly. Prices will change as each MARKETWISE day passes.':market.lastNews.headline;}

function nextDay(){market=stepMarket(market);const result=processPendingOrders(portfolio,market);portfolio=result.portfolio;saveLocal();render();setMessage(result.filled.length?`${result.filled.length} waiting order${result.filled.length===1?'':'s'} filled today.`:'A new MARKETWISE trading day has passed.');}

$('order-form').addEventListener('submit',event=>{event.preventDefault();const input={assetId:selectedId,side:new FormData(event.currentTarget).get('side'),type:$('order-type').value,quantity:Number($('quantity').value)};if(input.type==='limit')input.limitPrice=Number($('limit-price').value);try{const result=placeOrder(portfolio,market,input);portfolio=result.portfolio;saveLocal();render();setMessage(result.status==='filled'?`${input.side==='buy'?'Bought':'Sold'} ${input.quantity} share${input.quantity===1?'':'s'} of ${getAsset(selectedId).ticker}.`:'Limit order placed. It will wait for your chosen price.');}catch(error){setMessage(error.message,true);}});
for(const input of document.querySelectorAll('#order-form input, #order-form select'))input.addEventListener('input',updateEstimate);
$('order-type').addEventListener('change',()=>{$('limit-field').hidden=$('order-type').value!=='limit';updateEstimate();});
$('next-day').addEventListener('click',nextDay);
$('save-button').addEventListener('click',()=>{download(new Blob([JSON.stringify({version:1,market,portfolio},null,2)],{type:'application/json'}),`marketwise-day-${market.day}.json`);setMessage('MARKETWISE save downloaded.');});
$('load-button').addEventListener('click',()=>$('load-file').click());
$('load-file').addEventListener('change',async event=>{const file=event.target.files[0];event.target.value='';if(!file)return;try{if(file.size>2_000_000)throw new Error('That save is larger than the 2 MB limit.');const data=JSON.parse(await file.text());if(data.version!==1)throw new Error('Unsupported save version.');market=validateMarket(data.market);portfolio=validatePortfolio(data.portfolio);selectedId=ASSETS[0].id;saveLocal();render();setMessage('Validated MARKETWISE save loaded.');}catch(error){setMessage(`Could not load: ${error.message}`,true);}});
$('reset-button').addEventListener('click',()=>{if(!confirm('Start again with $10,000? Your downloaded JSON files will not be affected.'))return;market=createMarket();portfolio=createPortfolio();selectedId=ASSETS[0].id;saveLocal();render();setMessage('Fresh MARKETWISE run started.');});

try{const saved=localStorage.getItem(storageKey);if(saved){const data=JSON.parse(saved);market=validateMarket(data.market);portfolio=validatePortfolio(data.portfolio);$('save-status').textContent='Restored from this device';}}catch{localStorage.removeItem(storageKey);$('save-status').textContent='Fresh local market';}
render();
