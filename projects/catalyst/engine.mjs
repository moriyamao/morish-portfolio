export const MISSIONS = Object.freeze([
  {
    id:'mixture-rescue', chapter:'01', title:'Mixture Rescue', short:'Separate salt from sand.', type:'sequence',
    briefing:'A jar contains sand and salt. Recover the salt without carrying sand into the final dish.',
    why:'Mixtures keep the properties of their parts, so physical processes can separate them.',
    options:['add-water','stir','filter','evaporate'], expected:['add-water','stir','filter','evaporate'],
    labels:{'add-water':'Add water','stir':'Stir','filter':'Filter','evaporate':'Evaporate'},
    success:'The salt dissolved, the sand stayed in the filter, and evaporation recovered the salt.',
    archive:{formula:'NaCl',name:'Sodium chloride',note:'An ionic compound that dissolves in water.'}
  },
  {
    id:'water-works', chapter:'02', title:'Water Works', short:'Balance a familiar reaction.', type:'balance',
    briefing:'Balance hydrogen and oxygen forming water. Use the smallest whole-number coefficients.',
    why:'Balanced equations conserve every atom. Reactions rearrange atoms; they do not create or destroy them.',
    species:['H₂','O₂','H₂O'], expected:[2,1,2], equation:'H₂ + O₂ → H₂O',
    success:'Two hydrogen molecules and one oxygen molecule contain exactly the atoms needed for two water molecules.',
    archive:{formula:'H₂O',name:'Water',note:'Two hydrogen atoms bonded to one oxygen atom.'}
  },
  {
    id:'ph-rescue', chapter:'03', title:'pH Rescue', short:'Neutralize equal partners.', type:'ratio',
    briefing:'Match hydrochloric acid and sodium hydroxide so neither is left over. Work in abstract lab units.',
    why:'This acid and base react in a 1:1 particle ratio. Equal reacting amounts approach neutral conditions.',
    inputs:[{id:'acid',label:'HCl',tone:'acid'},{id:'base',label:'NaOH',tone:'base'}], expected:[3,3], max:6,
    success:'Equal reacting amounts produced water and dissolved sodium chloride, with no planned excess.',
    archive:{formula:'H⁺ + OH⁻ → H₂O',name:'Neutralization',note:'Hydrogen and hydroxide ions combine to form water.'}
  },
  {
    id:'heat-trail', chapter:'04', title:'Heat Trail', short:'Track where the energy goes.', type:'choice',
    briefing:'Calcium chloride dissolves and the cup becomes warmer. Where did the measured heat move?',
    why:'An exothermic process transfers energy from the chemical system to its surroundings.',
    options:['into-system','to-surroundings','no-transfer'], expected:'to-surroundings',
    labels:{'into-system':'Into the mixture','to-surroundings':'To the surroundings','no-transfer':'No energy moved'},
    success:'The warmer cup is evidence that energy moved from the system to the surroundings.',
    archive:{formula:'CaCl₂',name:'Calcium chloride',note:'Its dissolution in water is commonly exothermic.'}
  },
  {
    id:'cold-case', chapter:'05', title:'Cold Case', short:'Explain a cooling mixture.', type:'choice',
    briefing:'Urea dissolves in water and the cup becomes cooler. Which description fits the observation?',
    why:'An endothermic process absorbs energy from the surroundings, which can make the surroundings feel cooler.',
    options:['exothermic','endothermic','no-change'], expected:'endothermic',
    labels:{exothermic:'Exothermic',endothermic:'Endothermic','no-change':'No energy transfer'},
    success:'The dissolving process absorbed energy from the surroundings, so the cup cooled.',
    archive:{formula:'CO(NH₂)₂',name:'Urea',note:'Dissolving urea in water is an endothermic process.'}
  },
  {
    id:'molecule-factory', chapter:'06', title:'Molecule Factory', short:'Find the limiting reactant.', type:'factory',
    briefing:'The model starts with 5 H₂ molecules and 2 O₂ molecules. How many H₂O molecules can form?',
    why:'The limiting reactant runs out first and sets the maximum product. This model uses 2 H₂ + 1 O₂ → 2 H₂O.',
    options:[2,3,4,5], expected:4,
    success:'Two O₂ consume four H₂ and form four H₂O. One H₂ molecule remains.',
    archive:{formula:'2H₂ + O₂ → 2H₂O',name:'Limiting reactant',note:'The available oxygen limits this model to four water molecules.'}
  }
]);

export function missionById(id){return MISSIONS.find(m=>m.id===id)||null;}

export function evaluateMission(mission,answer){
  if(!mission) throw new Error('Unknown mission.');
  let correct=false;
  if(mission.type==='sequence'||mission.type==='balance'||mission.type==='ratio'){
    correct=Array.isArray(answer)&&answer.length===mission.expected.length&&answer.every((value,index)=>value===mission.expected[index]);
  }else correct=answer===mission.expected;
  if(correct)return {correct:true,grade:3,message:mission.success};
  if(mission.type==='sequence'){
    const prefix=Array.isArray(answer)&&answer.every((value,index)=>mission.expected[index]===value);
    return {correct:false,grade:prefix?1:0,message:prefix?'Good start. Keep the order going.':'That order carries material into the wrong stage. Think about what dissolves, what stays solid, and what the filter can catch.'};
  }
  if(mission.type==='balance'){
    const valid=Array.isArray(answer)&&answer.every(Number.isInteger);
    return {correct:false,grade:0,message:valid?'Count hydrogen and oxygen atoms on both sides. Each element needs the same total.':'Use whole-number coefficients for all three species.'};
  }
  if(mission.type==='ratio'){
    if(!Array.isArray(answer))return {correct:false,grade:0,message:'Set both amounts before testing the mixture.'};
    const relation=answer[0]>answer[1]?'acid remains':answer[1]>answer[0]?'base remains':'the ratio is equal';
    return {correct:false,grade:1,message:`${relation[0].toUpperCase()+relation.slice(1)}. The target also asks for three units of each reactant.`};
  }
  return {correct:false,grade:0,message:'Use the observation in the briefing, then try another answer.'};
}

export function freshProgress(){return {version:1,credits:0,completed:{},activeId:MISSIONS[0].id};}

export function completeMission(progress,id,grade=3){
  const index=MISSIONS.findIndex(m=>m.id===id);
  if(index<0)throw new Error('Unknown mission.');
  const prior=progress.completed[id]||0;
  const improved=Math.max(prior,grade);
  const credits=progress.credits+(improved-prior)*40;
  const next=MISSIONS[Math.min(index+1,MISSIONS.length-1)].id;
  return {...progress,credits,completed:{...progress.completed,[id]:improved},activeId:next};
}

export function isUnlocked(progress,index){return index===0||Boolean(progress.completed[MISSIONS[index-1].id]);}

export function validateProgress(value){
  if(!value||value.version!==1||!Number.isInteger(value.credits)||value.credits<0||typeof value.completed!=='object')return freshProgress();
  const completed={};
  for(const mission of MISSIONS){const grade=value.completed[mission.id];if(Number.isInteger(grade)&&grade>=1&&grade<=3)completed[mission.id]=grade;}
  const activeId=missionById(value.activeId)?.id||MISSIONS[0].id;
  return {version:1,credits:value.credits,completed,activeId};
}
