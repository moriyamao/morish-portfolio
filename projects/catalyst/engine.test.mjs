import test from 'node:test';
import assert from 'node:assert/strict';
import {MISSIONS,evaluateMission,freshProgress,completeMission,isUnlocked,validateProgress} from './engine.mjs';

test('all six missions have stable unique ids and classroom explanations',()=>{
  assert.equal(MISSIONS.length,6);
  assert.equal(new Set(MISSIONS.map(m=>m.id)).size,6);
  for(const mission of MISSIONS){assert.ok(mission.briefing.length>20);assert.ok(mission.why.length>20);}
});

test('each canonical answer succeeds and nearby incorrect answers fail',()=>{
  for(const mission of MISSIONS){
    assert.equal(evaluateMission(mission,mission.expected).correct,true,mission.id);
  }
  assert.equal(evaluateMission(MISSIONS[0],['filter']).correct,false);
  assert.equal(evaluateMission(MISSIONS[1],[1,1,1]).correct,false);
  assert.equal(evaluateMission(MISSIONS[2],[3,2]).correct,false);
  assert.equal(evaluateMission(MISSIONS[3],'into-system').correct,false);
  assert.equal(evaluateMission(MISSIONS[5],5).correct,false);
});

test('progress awards only improved grades and unlocks missions in order',()=>{
  const initial=freshProgress();
  assert.equal(isUnlocked(initial,0),true);
  assert.equal(isUnlocked(initial,1),false);
  const completed=completeMission(initial,MISSIONS[0].id,3);
  assert.equal(completed.credits,120);
  assert.equal(isUnlocked(completed,1),true);
  assert.equal(completeMission(completed,MISSIONS[0].id,3).credits,120);
});

test('progress validation strips unknown fields and invalid grades',()=>{
  const value=validateProgress({version:1,credits:80,activeId:'water-works',completed:{'mixture-rescue':3,bad:3,'water-works':9},admin:true});
  assert.deepEqual(value,{version:1,credits:80,completed:{'mixture-rescue':3},activeId:'water-works'});
  assert.deepEqual(validateProgress(null),freshProgress());
});
