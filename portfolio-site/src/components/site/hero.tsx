import { useEffect, useRef, useState } from "react";
import { allProjects, mapGroups, projectPositions, showcase, showcaseKeys } from "@/site/project-map";

export function Hero() {
  const [active, setActive] = useState("habitat");
  const [motion, setMotion] = useState(true);
  const root = useRef<HTMLElement>(null);
  const project = allProjects.find(p=>p.key===active) || allProjects[0];

  useEffect(() => {
    const el=root.current;
    if(!el) return;
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame=0;
    let progress:number|undefined;
    const clamp=(n:number)=>Math.max(0,Math.min(1,n));
    const ease=(n:number)=>{const v=clamp(n);return v*v*(3-2*v);};
    const paint=()=>{
      frame=0;
      const reduced=media.matches || !motion;
      el.dataset.reduced=String(reduced);
      const target=clamp(-el.getBoundingClientRect().top/Math.max(1,el.offsetHeight-window.innerHeight));
      progress=progress===undefined || reduced ? target : progress+(target-progress)*.22;
      if(Math.abs(target-progress)<.001) progress=target;
      const p=reduced ? 0.5 : progress;
      const spread=reduced ? 1 : ease(p/0.3);
      const resolve=reduced ? 0 : ease((p-0.66)/0.28);
      const positions=projectPositions.map(h=>({x:50+(h.x-50)*spread,y:45+(h.y-45)*spread}));
      el.querySelectorAll<HTMLElement>(".universe-node").forEach((node,i)=>{
        node.style.left=positions[i].x+"%";
        node.style.top=positions[i].y+"%";
      });
      el.querySelectorAll<SVGPathElement>(".universe-wire").forEach(node=>{
        const i=Number(node.dataset.project);
        const h=positions[i];
        const group=mapGroups.indexOf(allProjects[i].group);
        node.setAttribute("d",`M ${(10+group*20)*10} 30 L ${(10+group*20)*10} ${h.y*6} L ${h.x*10} ${h.y*6}`);
      });
      el.style.setProperty("--universe-opacity",String((reduced?1:ease((p-.04)/.16))*(1-resolve)));
      el.style.setProperty("--universe-scale",String(1-resolve*.2));
      el.style.setProperty("--showcase-opacity",String(resolve));
      el.style.setProperty("--showcase-shift",`${(1-resolve)*80}px`);
      el.style.setProperty("--wire-progress",String(spread));
      el.style.setProperty("--intro-opacity",String(1-ease((p-.1)/.13)));
      el.style.setProperty("--connect-opacity",String(ease((p-.18)/.12)*(1-ease((p-.62)/.1))));
      el.style.setProperty("--resolve-opacity",String(ease((p-.7)/.18)));
      el.style.setProperty("--scroll-progress",String(p));
      const phase=p<.23?"assemble":p<.9?"connect":"build";
      el.dataset.phase=phase;
      const universe=el.querySelector<HTMLElement>(".universe-viewport");
      const final=el.querySelector<HTMLElement>(".showcase-grid");
      if(universe) universe.inert=resolve>.9;
      if(final) final.inert=resolve<.1 && !reduced;
      const inspector=el.querySelector<HTMLElement>(".system-inspector");
      const note=el.querySelector<HTMLElement>(".showcase-note");
      if(inspector) inspector.inert=resolve>.9;
      if(note) note.inert=resolve<.1 && !reduced;
      if(progress!==target) frame=requestAnimationFrame(paint);
    };
    const update=()=>{if(!frame)frame=requestAnimationFrame(paint);};
    paint();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    media.addEventListener("change",update);
    return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);media.removeEventListener("change",update);cancelAnimationFrame(frame);};
  },[motion]);

  return <section className="system-hero universe-hero" id="top" ref={root} data-motion={motion} data-reduced="true">
    <div className="system-pin">
      <div className="system-strap"><span>Morish Macayan / Portfolio</span><span>{allProjects.length} projects · One connected practice</span></div>
      <div className="scroll-chapters" aria-hidden="true"><span className="scroll-chapter chapter-intro">An idea starts here.</span><span className="scroll-chapter chapter-connect">Connect the pieces.</span><span className="scroll-chapter chapter-build">Make something real.</span></div>
      <div className="universe-seed" aria-hidden="true"><img src="/assets/brand/favicon.svg" alt=""/><i/></div><div className="universe-viewport" aria-label="All projects, grouped by discipline">
        <div className="universe-map">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <path className="universe-backbone" d="M100 30 H900"/>
            {allProjects.map((p,i)=><path key={p.key} className="universe-wire" data-project={i} data-active={p.key===active} pathLength={1} d={`M ${projectPositions[i].x*10} 30 V ${projectPositions[i].y*6}`}/>)}
          </svg>
          {mapGroups.map((group,i)=><span className="universe-group" style={{left:(10+i*20)+"%"}} key={group}>{group}</span>)}
          {allProjects.map((p,i)=><button className="universe-node" key={p.key} data-active={p.key===active} style={{left:projectPositions[i].x+"%",top:projectPositions[i].y+"%"}} onClick={()=>setActive(p.key)} aria-pressed={p.key===active}><span aria-hidden="true">↗</span><span className="node-title">{p.title}</span></button>)}
        </div>
      </div>
      <div className="showcase-grid" aria-label="Four selected showcase projects">
        {showcase.map((p,i)=><a className="showcase-card" href={p.href} key={p.key}><span className="sys-label">0{i+1} / {p.group}</span><span className="showcase-mark" aria-hidden="true">{["⌘","∴","↗","ƒ"][i]}</span><h2>{p.title}</h2><p>{p.line}</p><span className="showcase-link">Explore the case study ↗</span></a>)}
      </div>
      <div className="system-bottom">
        <div className="system-heading"><div className="sys-label">Developer · AI track · Mapúa</div><h1>Ideas into<br/><em>working systems.</em></h1><a className="sys-button" href="#work">Explore my work <span>↓</span></a></div>
        <div className="system-inspector" aria-live="polite"><div className="sys-label">{project.group} / {project.note || project.tags.join(" · ")}</div><h2>{project.title}</h2><p>{project.line}</p><a href={project.href}>Explore this project ↗</a></div>
        <div className="showcase-note"><span className="sys-label">The shortlist / {showcaseKeys.length} of {allProjects.length}</span><p>Interactive engineering. Evaluated ML. Full-stack delivery. Professional research.</p></div>
      </div>
      <div className="system-foot"><span>Scroll to connect · Select any project · Swipe the map on mobile</span><button onClick={()=>setMotion(!motion)} aria-pressed={!motion}>{motion?"Reduce motion":"Enable motion"}</button></div>
      <div className="scroll-meter" aria-hidden="true"><i/></div>
    </div>
  </section>;
}
