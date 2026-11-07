import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import { LinkRow, Chips } from "@/components/site/parts";
import { ContactForm as BriefForm } from "@/components/site/contact";
import { selected, alsoBuilt, lab, academic, clients, timeline, toolkit, credentials, site } from "@/site/content";
import "@/site/system.css";

export const Route = createFileRoute("/")({component: Index});

function Index() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(document.querySelectorAll(".project-stage, .system-section-head, .business-grid article, .credential-card"));
    let observer: IntersectionObserver | undefined;
    const configure = () => {
      observer?.disconnect();
      items.forEach(node => node.classList.remove("reveal-pending"));
      if (media.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.remove("reveal-pending"); observer?.unobserve(entry.target); }
      }), {threshold:0.08, rootMargin:"0px 0px -35px 0px"});
      items.forEach(node => {
        if (node.getBoundingClientRect().top > window.innerHeight) node.classList.add("reveal-pending");
        observer?.observe(node);
      });
    };
    configure();
    media.addEventListener("change", configure);
    return () => { observer?.disconnect(); media.removeEventListener("change", configure); items.forEach(node => node.classList.remove("reveal-pending")); };
  }, []);
  return <div className="system-site">
    <header className="system-nav"><a href="#top" className="system-brand" aria-label="Morish Macayan home"><img src="/assets/brand/favicon.svg" alt=""/></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#sandbox">Play</a><a href="#clients">Clients</a><a href="#about">About</a><a href="#certifications">Certificates</a></nav><a className="system-contact-link" href="#contact">Let's talk ↗</a></header>
    <main>
      <Hero/>
      <section className="system-work system-section" id="work"><span id="projects" aria-hidden="true"/>
        <div className="system-section-head"><span className="sys-label">01 / Selected work</span><h2>Built to be<br/><span>used.</span></h2><p>Real interfaces. Technical decisions. Honest limitations. Open a project to see what went into it.</p></div>
        {selected.map((p,i)=><article className="project-stage" key={p.key}><div className="project-heading"><span className="sys-label">0{i+1} / {p.kind}</span><h3><a href={`/case/${p.caseSlug}`}>{p.title}<span>↗</span></a></h3></div><a className="project-screen" href={`/case/${p.caseSlug}`}><img src={p.img} alt={p.alt} loading="lazy" width={1280} height={800}/><span>Inside the project ↗</span></a><div className="project-details"><p>{p.line}</p><div><p>{p.built}</p><Chips items={p.tags}/><LinkRow links={p.links}/></div></div></article>)}
        <div className="system-index"><div className="sys-label">More systems, more questions</div>{alsoBuilt.map(p=><article key={p.key}><h3>{p.title}</h3><p>{p.line}</p><LinkRow links={p.links}/></article>)}<article><h3>FlyRank</h3><p>Machine learning internship: baseline, model evaluation, and the limits of the result.</p><LinkRow links={[{label:"Case study",href:"/case/flyrank"},{label:"Research paper",href:"https://moriyamao.github.io/flyrank-ml-internship/"}]}/></article></div>
      </section>
      <section className="system-play system-section" id="sandbox"><span id="sandbox-projects" aria-hidden="true"/><div className="system-section-head"><span className="sys-label">02 / The playground</span><h2>What if<span>?</span></h2><p>Small questions turned into things you can interact with.</p></div><div className="experiment-strip">{lab.map(l=><article key={l.key}><a href={l.href} target="_blank" rel="noreferrer" className="experiment-image">{l.img?<img src={l.img} alt={l.alt} loading="lazy" width={1280} height={800}/>:<span className="experiment-placeholder">LAST<br/>TENANT</span>}<span className="experiment-arrow">↗</span></a><div className="sys-label">{l.num} / {l.kind}</div><h3>{l.title}</h3><p>{l.line}</p><span className="sys-label">{l.status}</span>{l.extra&&<LinkRow links={[l.extra]}/>}</article>)}</div><a className="sys-button" href="/lab">Enter the full Lab <span>↗</span></a></section>
      <section className="system-clients system-section" id="clients"><span id="client-work" aria-hidden="true"/><div className="system-section-head"><span className="sys-label">03 / Clients & concepts</span><h2>Made for<br/><span>people.</span></h2><p>Business websites and interactive concepts presented to prospective clients. Each is labelled by its status.</p></div><div className="business-grid">{clients.map(c=><article key={c.key}><a href={c.live} target="_blank" rel="noreferrer"><img src={c.img} alt={c.alt} loading="lazy" width={1280} height={800}/></a><div className="business-title"><h3>{c.title}</h3><span className="sys-label">{c.status==="demo"?"Presented concept":"Delivered"}</span></div><p>{c.line}</p><LinkRow links={[{label:c.status==="demo"?"Open demo":"Visit website",href:c.live},{label:"Source",href:c.source}]}/></article>)}</div></section>
      <section className="system-about system-section" id="about"><div className="sys-label">04 / The person behind the systems</div><div className="about-statement"><h2>Curiosity is<br/>the starting point.<br/><span>Building is the rest.</span></h2><div><p>I'm {site.fullName}, a Computer Science student on the AI track at Mapúa University and an independent developer in Malolos.</p><p>I build web products, interactive learning tools, and visual experiments. I care about understanding how something works—and being clear about where it doesn't.</p><a className="sys-button" href={site.resume}>Read my résumé <span>↗</span></a></div></div><div className="system-experience">{timeline.map(t=><div key={t.role}><span className="sys-label">{t.year}</span><h3>{t.role}</h3><p>{t.org} / {t.note}</p></div>)}</div><div className="system-toolkit"><span className="sys-label">Tools I work with</span><Chips items={toolkit}/></div></section>
      <section className="system-certifications system-section" id="certifications"><div className="system-section-head"><span className="sys-label">05 / Certifications · {credentials.length}</span><h2>Learning<br/><span>with proof.</span></h2><p>Professional certificates, internship completion, and continued study. Open a record to view the available evidence.</p></div><div className="credential-grid">{credentials.map((c,i)=><a className="credential-card" key={c.name} href={c.href} target="_blank" rel="noreferrer"><span className="credential-top"><span className="sys-label">{c.org}</span><span aria-hidden="true">↗</span></span><h3>{c.name}</h3><span className="credential-bottom"><span>{String(i+1).padStart(2,"0")}</span><span>{c.href === site.linkedin ? "View LinkedIn profile" : c.href.endsWith(".pdf") ? "View certificate PDF" : "View credential"}</span></span></a>)}</div></section>
      <section className="system-research system-section" id="academic"><span id="academic-projects" aria-hidden="true"/><div className="system-section-head"><span className="sys-label">06 / Academic work</span><h2>Learning,<br/><span>documented.</span></h2><p>Coursework, applications, and co-authored research.</p></div>{academic.map(a=><details className="system-disclosure" key={a.key}><summary><span>{a.num} / {a.title}</span><span>+</span></summary><div className="research-content"><span className="sys-label">{a.kind} / {a.role}</span><p>{a.line}</p>{a.shared&&<p>{a.shared}</p>}<Chips items={a.tags}/><LinkRow links={a.links}/></div></details>)}</section>
      <section className="system-end system-section" id="contact"><span className="sys-label">07 / Next connection</span><h2>Have something<br/>in <em>mind?</em></h2><div className="system-end-grid"><div><a className="email-link" href={`mailto:${site.email}`}>{site.email} ↗</a><p>{site.location}</p><LinkRow links={[{label:"GitHub",href:site.github},{label:"LinkedIn",href:site.linkedin},{label:"Résumé",href:site.resume}]}/></div><BriefForm/></div></section>
    </main>
    <footer className="system-footer"><a href="#top">Morish Macayan ↗</a><span>Applied curiosity, made tangible.</span><a href="#top">Back to top ↑</a></footer>
  </div>;
}
