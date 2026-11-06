import {MISSIONS,missionById,evaluateMission,freshProgress,completeMission,isUnlocked,validateProgress} from './engine.mjs';

const $=id=>document.getElementById(id);
const storageKey='catalyst.progress.v1';
let progress=loadProgress();
let active=missionById(progress.activeId)||MISSIONS[0];
let answer=defaultAnswer(active);
let soundOn=false;

function loadProgress(){
  try{return validateProgress(JSON.parse(localStorage.getItem(storageKey)));}catch{return freshProgress();}
}
function saveProgress(){localStorage.setItem(storageKey,JSON.stringify(progress));}
function defaultAnswer(mission){
  if(mission.type==='sequence')return [];
  if(mission.type==='balance')return [1,1,1];
  if(mission.type==='ratio')return [0,0];
  return null;
}
function stars(grade=0){return '★'.repeat(grade)+'☆'.repeat(3-grade);}
function beep(success){
  if(!soundOn)return;
  const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;
  const context=new AudioContext(),osc=context.createOscillator(),gain=context.createGain();
  osc.type='square';osc.frequency.value=success?660:150;gain.gain.setValueAtTime(.04,context.currentTime);gain.gain.exponentialRampToValueAtTime(.001,context.currentTime+.18);osc.connect(gain).connect(context.destination);osc.start();osc.stop(context.currentTime+.2);
}

function renderProgressMeta(){
  const completedCount=Object.keys(progress.completed).length;
  $('credits').textContent=String(progress.credits).padStart(3,'0');
  $('progress-count').textContent=`${completedCount} / ${MISSIONS.length}`;
  $('archive-count').textContent=`${completedCount} FOUND`;
  const levels=['Dusty basement','Working laboratory','Research institute','Catalyst center'];
  const level=Math.min(3,Math.floor(completedCount/2));
  $('level-copy').textContent=levels[level];
  $('level-fill').style.width=`${completedCount/MISSIONS.length*100}%`;
  $('guide-line').textContent=completedCount===MISSIONS.length?'The lab is alive again. Every answer came from evidence.':`Mission ${active.chapter}: ${active.short}`;
}

function render(){
  renderProgressMeta();
  $('pixel-lab').dataset.scene=active.type;
  $('chapter').textContent=`CHAPTER ${active.chapter}`;
  $('mission-title').textContent=active.title;
  $('stars').textContent=stars(progress.completed[active.id]);
  $('briefing-copy').textContent=active.briefing;
  $('why-copy').textContent=active.why;
  renderMissions();renderPuzzle();renderArchive();
}

function renderMissions(){
  $('mission-list').innerHTML=MISSIONS.map((mission,index)=>{
    const unlocked=isUnlocked(progress,index),grade=progress.completed[mission.id]||0;
    return `<button class="mission-button ${mission.id===active.id?'active':''}" data-mission="${mission.id}" ${unlocked?'':'disabled'}><span>${mission.chapter}</span><div><strong>${mission.title}</strong><small>${unlocked?mission.short:'Complete previous mission'}</small></div><b>${unlocked?stars(grade):'LOCK'}</b></button>`;
  }).join('');
  document.querySelectorAll('[data-mission]').forEach(button=>button.addEventListener('click',()=>selectMission(button.dataset.mission)));
}

function selectMission(id){active=missionById(id);progress={...progress,activeId:id};answer=defaultAnswer(active);saveProgress();resetFeedback();render();const lab=$('pixel-lab');lab.classList.add('camera-cut');setTimeout(()=>lab.classList.remove('camera-cut'),260);}

function renderPuzzle(){
  const area=$('puzzle-area');
  if(active.type==='sequence'){
    area.innerHTML=`<div class="puzzle-grid">${active.options.map(option=>`<button class="process-button" data-process="${option}">${active.labels[option]}</button>`).join('')}</div><div class="process-order">${answer.length?answer.map((item,index)=>`${index+1}. ${active.labels[item]}`).join(' → '):'Process order appears here.'}</div>`;
    area.querySelectorAll('[data-process]').forEach(button=>button.addEventListener('click',()=>{if(answer.length<active.expected.length){answer=[...answer,button.dataset.process];renderPuzzle();}}));
    return;
  }
  if(active.type==='balance'||active.type==='ratio'){
    const labels=active.type==='balance'?active.species:active.inputs.map(input=>input.label);
    const max=active.max||4;
    area.innerHTML=`${active.equation?`<div class="equation-line">${active.equation}</div>`:''}<div class="stepper-row">${labels.map((label,index)=>`<div class="stepper"><label>${label}</label><button data-step="${index}" data-delta="-1" aria-label="Decrease ${label}">−</button><b>${answer[index]}</b><button data-step="${index}" data-delta="1" aria-label="Increase ${label}">+</button></div>`).join('')}</div>`;
    area.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.step),minimum=active.type==='balance'?1:0;answer=[...answer];answer[index]=Math.max(minimum,Math.min(max,answer[index]+Number(button.dataset.delta)));renderPuzzle();}));
    return;
  }
  area.innerHTML=`<div class="puzzle-grid">${active.options.map(option=>`<button class="choice-button ${answer===option?'selected':''}" data-choice="${option}">${active.labels?.[option]??`${option} H₂O molecules`}</button>`).join('')}</div>`;
  area.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{answer=active.type==='factory'?Number(button.dataset.choice):button.dataset.choice;renderPuzzle();}));
}

function renderArchive(){
  $('archive-list').innerHTML=MISSIONS.map(mission=>{
    const found=Boolean(progress.completed[mission.id]);
    return `<article class="archive-entry ${found?'':'locked'}"><b>${found?mission.archive.formula:'???'}</b><strong>${found?mission.archive.name:'UNDISCOVERED'}</strong><p>${found?mission.archive.note:'Complete the matching mission to identify this entry.'}</p></article>`;
  }).join('');
}

function resetFeedback(){
  $('feedback').className='feedback';$('feedback').textContent='Set up the experiment, then run it.';
  $('pixel-lab').className='pixel-lab pov-lab';$('lab-status').textContent='READY';
}

function runExperiment(){
  const lab=$('pixel-lab');lab.className='pixel-lab pov-lab reacting';$('lab-status').textContent='ANALYZING';
  $('run-experiment').disabled=true;
  setTimeout(()=>{
    const result=evaluateMission(active,answer);
    lab.className=`pixel-lab pov-lab ${result.correct?'success':'fail'}`;
    $('lab-status').textContent=result.correct?'COMPLETE':'RECHECK';
    $('feedback').className=`feedback ${result.correct?'success':'fail'}`;
    $('feedback').textContent=result.message;beep(result.correct);
    if(result.correct){progress=completeMission(progress,active.id,result.grade);saveProgress();renderProgressMeta();renderMissions();renderArchive();$('stars').textContent=stars(progress.completed[active.id]);}
    $('run-experiment').disabled=false;
  },700);
}

$('run-experiment').addEventListener('click',runExperiment);
$('clear-answer').addEventListener('click',()=>{answer=defaultAnswer(active);resetFeedback();renderPuzzle();});
$('why-button').addEventListener('click',()=>{const expanded=$('why-button').getAttribute('aria-expanded')==='true';$('why-button').setAttribute('aria-expanded',String(!expanded));$('why-button').textContent=`WHY THIS MATTERS ${expanded?'+':'−'}`;$('why-copy').hidden=expanded;});
$('sound-toggle').addEventListener('click',()=>{soundOn=!soundOn;$('sound-toggle').setAttribute('aria-pressed',String(soundOn));$('sound-toggle').textContent=soundOn?'♪ ON':'♪ OFF';});
$('reset-game').addEventListener('click',()=>{if(!confirm('Start a new laboratory? Current mission progress will be cleared.'))return;progress=freshProgress();active=MISSIONS[0];answer=defaultAnswer(active);saveProgress();resetFeedback();render();});

render();
