import {MATERIALS,detectRooms,wallPoints,wallLength,pointOnWall,bounds} from './model.mjs';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const line=(a,b,attributes='')=>`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" ${attributes}/>`;
const path=points=>points.map((p,i)=>`${i?'L':'M'}${p.x},${p.y}`).join(' ')+'Z';
export function planContent(m,{selected=null,grid=true,labels=true,exporting=false,overlap=null}={}) {
  const out=[];
  if(grid)out.push('<defs><pattern id="grid-small" width=".1" height=".1" patternUnits="userSpaceOnUse"><path d="M .1 0 L 0 0 0 .1" fill="none" stroke="#d5cec2" stroke-width=".003"/></pattern><pattern id="grid-large" width="1" height="1" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="url(#grid-small)"/><path d="M 1 0 L 0 0 0 1" fill="none" stroke="#cec5b6" stroke-width=".009"/></pattern></defs><rect x="-100" y="-100" width="200" height="200" fill="url(#grid-large)" pointer-events="none"/>');
  for(const [i,r]of detectRooms(m).entries()) {
    out.push(`<path d="${path(r.points)} ${r.holes.map(path).join(' ')}" fill="${MATERIALS[m.settings.floor]}" fill-opacity=".17" fill-rule="evenodd" stroke="none"/>`);
    if(labels){const a=r.points[0],b=r.points[1],l=Math.hypot(b.x-a.x,b.y-a.y),x=(a.x+b.x)/2-(b.y-a.y)/l*.45,y=(a.y+b.y)/2+(b.x-a.x)/l*.45;out.push(`<text x="${x}" y="${y}" text-anchor="middle" fill="#817767" font-size=".13" font-family="Arial,sans-serif" pointer-events="none">ROOM ${String(i+1).padStart(2,'0')} · ${r.area.toFixed(1)} m²</text>`);}
  }
  for(const w of m.walls) {
    const [a,b]=wallPoints(m,w),active=w.id===selected;
    out.push(`<g data-id="${w.id}" data-kind="wall">${line(a,b,`stroke="${active?'#b96f45':'#3e423f'}" stroke-width="${w.thickness}" stroke-linecap="square"`)}${exporting?'':line(a,b,'stroke="transparent" stroke-width=".3"')}`);
    if(labels){const vertical=a.x===b.x;out.push(`<text x="${(a.x+b.x)/2+(vertical?-.24:0)}" y="${(a.y+b.y)/2+(vertical?0:-.24)}" text-anchor="middle" fill="#6b6c63" font-family="Arial,sans-serif" font-size=".14" ${vertical?`transform="rotate(-90 ${(a.x+b.x)/2-.24} ${(a.y+b.y)/2})"`:''}>${wallLength(m,w).toFixed(2)} m</text>`);}
    out.push('</g>');
  }
  for(const o of m.openings){const w=m.walls.find(w=>w.id===o.wallId),[a,b]=wallPoints(m,w),start=pointOnWall(m,w,o.offset-o.width/2),end=pointOnWall(m,w,o.offset+o.width/2),angle=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI,active=o.id===selected,c=active?'#b96f45':'#8d9f9f';out.push(`<g data-id="${o.id}" data-kind="opening" transform="translate(${start.x} ${start.y}) rotate(${angle})"><path d="M0 0H${o.width}" stroke="#faf8f3" stroke-width="${w.thickness+.025}"/>`);
    if(o.kind==='window')out.push(`<rect x="0" y="${-w.thickness/2}" width="${o.width}" height="${w.thickness}" fill="#c6d8d6" stroke="${c}" stroke-width=".025"/><path d="M0 0H${o.width}" stroke="${c}" stroke-width=".02"/>`);
    else out.push(`<path d="M0 0V${-o.width}M0 ${-o.width}A${o.width} ${o.width} 0 0 1 ${o.width} 0" fill="none" stroke="${active?c:'#a18c71'}" stroke-width=".025"/><path d="M0 0H${o.width}" stroke="transparent" stroke-width=".35"/>`);
    out.push('</g>');}
  const objects=[...m.objects.filter(o=>o.catalogId==='rug'),...m.objects.filter(o=>o.catalogId!=='rug')];
  for(const o of objects){const warning=!exporting&&o.id===overlap,c=warning?'#e7a59e':MATERIALS[o.material],active=o.id===selected,w=o.w,d=o.d;out.push(`<g data-id="${o.id}" data-kind="object" transform="translate(${o.x} ${o.y}) rotate(${o.rotation})" fill="${c}" stroke="${warning?'#a3322c':active?'#b96f45':'#726b5f'}" stroke-width="${active||warning?.035:.018}">`);
    if(o.catalogId==='plant'){out.push(`<ellipse rx="${w/2}" ry="${d/2}" fill="${warning?c:'#9ca58c'}"/><path d="M${-w*.3} 0Q0 ${-d*.5} ${w*.3} 0Q0 ${d*.5} ${-w*.3} 0M0 ${-d*.35}V${d*.35}" fill="none"/>`);}
    else if(o.catalogId==='tallPlant'){
      out.push(`<ellipse rx="${w/2}" ry="${d/2}" fill-opacity=".35"/><path d="M0 0Q${-w*.28} ${-d*.33} 0 ${-d*.46}Q${w*.28} ${-d*.33} 0 0Q${w*.33} ${-d*.28} ${w*.46} 0Q${w*.33} ${d*.28} 0 0Q${w*.28} ${d*.33} 0 ${d*.46}Q${-w*.28} ${d*.33} 0 0Q${-w*.33} ${d*.28} ${-w*.46} 0Q${-w*.33} ${-d*.28} 0 0Z"/><ellipse rx="${w*.1}" ry="${d*.1}" fill="none"/>`);
    }
    else if(o.catalogId==='diningTable')out.push(`<ellipse rx="${w/2}" ry="${d/2}"/><ellipse rx="${w*.42}" ry="${d*.38}" fill="none"/>`);
    else if(o.catalogId==='lamp')out.push(`<ellipse rx="${w/2}" ry="${d/2}"/><ellipse rx="${w*.15}" ry="${d*.15}" fill="#f4e7cb"/>`);
    else {out.push(`<rect x="${-w/2}" y="${-d/2}" width="${w}" height="${d}" rx=".05"/>`);
      if(o.catalogId==='sofa')out.push(`<rect x="${-w/2+.08}" y="${-d/2+.18}" width="${w-.16}" height="${Math.max(.05,d-.26)}" rx=".06" fill="#ffffff" fill-opacity=".25"/><path d="M0 ${-d/2+.18}V${d/2-.08}"/>`);
      if(o.catalogId==='bed')out.push(`<rect x="${-w/2+.08}" y="${-d/2+.08}" width="${w/2-.12}" height="${d*.2}" rx=".05" fill="#f4efe5"/><rect x=".04" y="${-d/2+.08}" width="${w/2-.12}" height="${d*.2}" rx=".05" fill="#f4efe5"/><path d="M${-w/2} ${-d*.14}H${w/2}"/>`);
      if(o.catalogId==='bath')out.push(`<rect x="${-w*.39}" y="${-d*.44}" width="${w*.78}" height="${d*.88}" rx="${Math.min(w,d)*.25}" fill="#edf0e9"/>`);
      if(o.catalogId==='toilet')out.push(`<ellipse cx="0" cy="${d*.1}" rx="${w*.35}" ry="${d*.28}" fill="#f5f4ed"/>`);
      if(o.catalogId==='chair')out.push(`<path d="M${-w*.4} ${-d*.25}H${w*.4}" fill="none" stroke-width=".06"/>`);
      if(o.catalogId==='counter')out.push(`<path d="M${-w*.2} ${-d/2}V${d/2}M${w*.2} ${-d/2}V${d/2}"/>`);
      if(o.catalogId==='stair')for(let j=1;j<9;j++)out.push(`<path d="M${-w/2} ${-d/2+d*j/9}H${w/2}"/>`);
      if(o.catalogId==='wardrobe')out.push(`<path d="M0 ${-d/2}V${d/2}M${-w*.1} ${d*.3}h${w*.055}m${w*.09} 0h${w*.055}" fill="none"/>`);
      if(o.catalogId==='desk')out.push(`<rect x="${w*.18}" y="${-d*.4}" width="${w*.25}" height="${d*.8}" fill-opacity=".45"/><path d="M${w*.24} ${d*.23}h${w*.13}"/>`);
      if(o.catalogId==='tvUnit')out.push(`<path d="M${-w*.38} ${-d*.18}H${w*.38}" stroke-width=".04"/><rect x="${-w*.14}" y="${-d*.1}" width="${w*.28}" height="${d*.28}" fill="none"/>`);
      if(o.catalogId==='rug')out.push(`<rect x="${-w*.45}" y="${-d*.43}" width="${w*.9}" height="${d*.86}" rx=".025" fill="none"/><path d="M${-w*.22} 0L0 ${-d*.28} ${w*.22} 0 0 ${d*.28}Z" fill="none"/>`);
      if(o.catalogId==='bookshelf')out.push(`<path d="M${-w*.36} ${-d*.31}H${w*.36}M${-w*.31} ${-d*.31}V${d*.32}m${w*.12} ${-d*.63}v${d*.55}m${w*.12} ${-d*.55}v${d*.63}m${w*.24} ${-d*.63}l${w*.13} ${d*.6}" fill="none"/>`);
      if(o.catalogId==='vanity')out.push(`<ellipse cy="${d*.06}" rx="${w*.32}" ry="${d*.32}" fill="${warning?c:'#edf0e9'}"/><circle cy="${-d*.34}" r="${Math.min(w,d)*.055}"/><circle cy="${d*.06}" r="${Math.min(w,d)*.035}"/>`);
    }
    if(active&&!exporting){out.push(`<rect x="${-w/2-.07}" y="${-d/2-.07}" width="${w+.14}" height="${d+.14}" fill="none" stroke-dasharray=".06 .04"/><circle data-handle="resize" cx="${w/2}" cy="${d/2}" r=".09" fill="#fff"/><path d="M0 ${-d/2-.07}V${-d/2-.4}"/><circle data-handle="rotate" cx="0" cy="${-d/2-.4}" r=".09" fill="#fff"/>`);}out.push('</g>');}
  if(!exporting){const wall=m.walls.find(w=>w.id===selected);if(wall)for(const v of wallPoints(m,wall))out.push(`<circle data-vertex="${v.id}" cx="${v.x}" cy="${v.y}" r=".1" fill="#faf8f3" stroke="#b96f45" stroke-width=".035"/>`);}
  return out.join('');
}
export function exportSVG(m) {
  const b=bounds(m),w=Math.max(1,Math.round(Math.min(1800,1800*b.w/b.h))),h=Math.round(w*b.h/b.w),bar=Math.min(2,Math.floor(b.w/2));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h+100}" viewBox="${b.x} ${b.y} ${b.w} ${b.h+100*b.w/w}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h+100*b.w/w}" fill="white"/>${planContent(m,{grid:false,exporting:true})}<g fill="#333b36" font-family="Arial,sans-serif"><text x="${b.x+.25}" y="${b.y+b.h+.2}" font-size="${b.w*.012}">${esc(m.name)} · HABITAT · metres</text><path d="M${b.x+.25} ${b.y+b.h-.25}h${bar}m-${bar} -.08v.16m${bar} -.16v.16" fill="none" stroke="#333b36" stroke-width=".02"/><text x="${b.x+.25}" y="${b.y+b.h-.4}" font-size=".13">${bar} m</text></g></svg>`;
}
