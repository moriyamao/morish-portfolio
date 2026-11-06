import test from 'node:test';
import assert from 'node:assert/strict';
import {ASSETS,createMarket,quote,stepMarket,validateMarket} from './engine.mjs';

test('same seed produces the same immutable daily path',()=>{
  const a=createMarket({seed:42}),b=createMarket({seed:42}),nextA=stepMarket(a),nextB=stepMarket(b);
  assert.deepEqual(nextA,nextB);assert.equal(a.day,0);assert.equal(a.history.nova.length,1);
  for(const asset of ASSETS)assert.ok(nextA.prices[asset.id]>0);
});

test('forced event changes only its target plus the small index exposure',()=>{
  const base=createMarket({seed:7}),event={scope:'asset',assetId:'nova',shock:.10,headline:'Test beat'},withEvent=stepMarket(base,{event}),withoutEvent=stepMarket(base,{event:null});
  assert.ok(Math.abs(withEvent.prices.nova/withoutEvent.prices.nova-1.10)<1e-6);
  assert.ok(Math.abs(withEvent.prices.harvest-withoutEvent.prices.harvest)<1e-8);
  assert.ok(withEvent.prices.wise>withoutEvent.prices.wise);
  event.headline='Mutated';assert.equal(withEvent.lastNews.headline,'Test beat');
});

test('quotes put the bid below and ask above the market price',()=>{
  const market=createMarket(),current=quote(market,'nova');assert.ok(current.bid<current.mid);assert.ok(current.ask>current.mid);
});

test('validation rejects malformed or inconsistent price history',()=>{
  const valid=stepMarket(createMarket({seed:9}),{event:null});assert.deepEqual(validateMarket(valid),valid);
  const bad=structuredClone(valid);bad.history.nova[1].price=-1;assert.throws(()=>validateMarket(bad),/history/);
  const inconsistent=structuredClone(valid);inconsistent.history.nova.at(-1).price+=1;assert.throws(()=>validateMarket(inconsistent),/inconsistent/);
});

test('asset definitions cannot be changed by UI code',()=>{assert.throws(()=>{ASSETS[0].drift=9;},TypeError);});
