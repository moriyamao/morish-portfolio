export const TRADING_DAYS = 252;

export const ASSETS = Object.freeze([
  {id:'nova',ticker:'NOVA',name:'Nova Circuit',sector:'Technology',startPrice:84,drift:.10,volatility:.32,spreadBps:18},
  {id:'harvest',ticker:'HRVT',name:'Harvest Table',sector:'Food',startPrice:42,drift:.06,volatility:.17,spreadBps:12},
  {id:'solaris',ticker:'SLRS',name:'Solaris Grid',sector:'Energy',startPrice:61,drift:.08,volatility:.26,spreadBps:16},
  {id:'kindred',ticker:'KIND',name:'Kindred Health',sector:'Healthcare',startPrice:73,drift:.07,volatility:.21,spreadBps:14},
  {id:'northline',ticker:'NRTH',name:'Northline Transit',sector:'Industrials',startPrice:36,drift:.055,volatility:.20,spreadBps:15},
  {id:'cedar',ticker:'CDAR',name:'Cedar Home',sector:'Consumer',startPrice:49,drift:.065,volatility:.23,spreadBps:16},
  {id:'bluebank',ticker:'BLUE',name:'Bluebank',sector:'Financials',startPrice:57,drift:.06,volatility:.19,spreadBps:13},
  {id:'cloudnine',ticker:'CLDN',name:'Cloud Nine Media',sector:'Communication',startPrice:29,drift:.085,volatility:.38,spreadBps:22},
  {id:'wise',ticker:'WISE',name:'MarketWise Index Fund',sector:'Index fund',startPrice:100,drift:.065,volatility:.14,spreadBps:8,isIndex:true}
].map(Object.freeze));

const assetById = new Map(ASSETS.map(asset=>[asset.id,asset]));
export function getAsset(id){const asset=assetById.get(id);if(!asset)throw new Error('Unknown investment.');return asset;}
const money=value=>Math.max(.01,Math.round(value*100)/100);
const precise=value=>Math.max(.000001,Math.round(value*1e6)/1e6);

function nextRandom(state){const next=(Math.imul(state>>>0,1664525)+1013904223)>>>0;return [next/4294967296,next];}
function gaussian(state){let u,v;[u,state]=nextRandom(state);[v,state]=nextRandom(state);u=Math.max(u,Number.EPSILON);return [Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v),state];}

export function quote(market,id){
  const asset=getAsset(id),mid=market.prices[id],half=asset.spreadBps/20000;
  return {mid,bid:money(mid*(1-half)),ask:money(mid*(1+half)),spreadBps:asset.spreadBps};
}

function randomEvent(state){
  let roll;[roll,state]=nextRandom(state);
  if(roll>.14)return [null,state];
  let kindRoll,targetRoll,directionRoll;[kindRoll,state]=nextRandom(state);[targetRoll,state]=nextRandom(state);[directionRoll,state]=nextRandom(state);
  if(kindRoll<.18){const crash=kindRoll<.09;return [{scope:'market',shock:crash?-.075:.06,headline:crash?'Sudden uncertainty sends the whole market lower.':'Broad optimism lifts nearly every company.'},state];}
  if(kindRoll<.45){const sectors=[...new Set(ASSETS.filter(a=>!a.isIndex).map(a=>a.sector))],sector=sectors[Math.floor(targetRoll*sectors.length)],up=directionRoll>.5;return [{scope:'sector',sector,shock:up?.045:-.05,headline:`${sector} ${up?'breakthrough':'setback'} moves the entire sector ${up?'higher':'lower'}.`},state];}
  const stocks=ASSETS.filter(a=>!a.isIndex),asset=stocks[Math.floor(targetRoll*stocks.length)],beat=directionRoll>.5;
  return [{scope:'asset',assetId:asset.id,shock:beat?.07:-.065,headline:`${asset.name} reports ${beat?'better':'weaker'} results than investors expected.`},state];
}

function eventShock(event,asset){
  if(!event)return 0;
  if(event.scope==='market')return event.shock*(asset.isIndex?.72:1);
  if(event.scope==='sector')return asset.sector===event.sector?event.shock:(asset.isIndex?event.shock*.12:0);
  return asset.id===event.assetId?event.shock:(asset.isIndex?event.shock*.08:0);
}

export function createMarket({seed=246813579}={}){
  const prices=Object.fromEntries(ASSETS.map(asset=>[asset.id,asset.startPrice]));
  const history=Object.fromEntries(ASSETS.map(asset=>[asset.id,[{day:0,price:asset.startPrice}]]));
  return {version:1,day:0,rngState:seed>>>0,prices,history,lastNews:{headline:'The market opens quietly. Prices will change as each MARKETWISE day passes.',scope:'market',shock:0}};
}

export function stepMarket(market,{event:forcedEvent}={}){
  let state=market.rngState,event=forcedEvent;
  if(event===undefined)[event,state]=randomEvent(state);
  const prices={},history={};
  for(const asset of ASSETS){
    let z;[z,state]=gaussian(state);
    const daily=(asset.drift-.5*asset.volatility**2)/TRADING_DAYS+asset.volatility/Math.sqrt(TRADING_DAYS)*z;
    const shock=eventShock(event,asset);
    prices[asset.id]=precise(market.prices[asset.id]*Math.exp(daily+(shock?Math.log1p(shock):0)));
    history[asset.id]=[...market.history[asset.id].map(point=>({...point})),{day:market.day+1,price:prices[asset.id]}].slice(-TRADING_DAYS*2);
  }
  return {...market,day:market.day+1,rngState:state,prices,history,lastNews:event?structuredClone(event):{headline:'A routine day: company prices move as buyers and sellers reassess them.',scope:'none',shock:0}};
}

export function validateMarket(value){
  if(!value||value.version!==1||!Number.isInteger(value.day)||value.day<0||!Number.isInteger(value.rngState)||value.rngState<0||value.rngState>0xffffffff)throw new Error('This market save is not valid.');
  for(const asset of ASSETS){
    const price=value.prices?.[asset.id],points=value.history?.[asset.id];
    if(!Number.isFinite(price)||price<=0||!Array.isArray(points)||!points.length)throw new Error('This market save has invalid prices.');
    let previous=-1;for(const point of points){if(!Number.isInteger(point?.day)||point.day<0||point.day<=previous||point.day>value.day||!Number.isFinite(point.price)||point.price<=0)throw new Error('This market save has invalid price history.');previous=point.day;}
    const last=points.at(-1);if(last.day!==value.day||Math.abs(last.price-price)>1e-8)throw new Error('This market save has inconsistent prices.');
  }
  return structuredClone(value);
}
