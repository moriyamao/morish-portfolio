import { Fragment, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Chips } from "@/components/site/parts";
import { ContactForm } from "@/components/site/contact";
import { selected, alsoBuilt, lab, academic, clients, timeline, toolkit, credentials, site, type Work } from "@/site/content";
import { allProjects, mapGroups } from "@/site/project-map";
import { initMotion, animateRows } from "@/site/motion";

export const Route = createFileRoute("/")({component: Index});

type Link = { label: string; href: string; primary?: boolean };

const flyrank: Work = {
  key: "flyrank",
  title: "FlyRank",
  kind: "Internship / applied ML",
  line: "Machine learning internship: baseline, model evaluation, and the limits of the result.",
  built: "Content-refresh research: rule baselines, client-grouped validation, and a reproducible report.",
  tags: ["Python", "scikit-learn", "Evaluation"],
  img: "/assets/shots/flyrank.jpg",
  alt: "FlyRank internship research report",
  links: [{label: "Case study", href: "/case/flyrank"}, {label: "Research paper", href: "https://moriyamao.github.io/flyrank-ml-internship/"}],
  caseSlug: "flyrank",
};
const featured: Work[] = [selected[0], selected[1], selected[2], flyrank, alsoBuilt[0]];

const shots: Record<string, string> = {flyrank: "/assets/shots/flyrank.jpg"};
[...selected, ...alsoBuilt, ...lab, ...clients].forEach(p => { if (p.img && !shots[p.key]) shots[p.key] = p.img; });

const heroStack = [
  {src: "/assets/shots/trace.jpg", alt: "TRACE algorithm learning lab"},
  {src: "/assets/shots/travelease-dashboard.png", alt: "TravelEase dashboard"},
  {src: "/assets/shots/leakagelens.jpg", alt: "LeakageLens dataset auditor"},
  {src: "/assets/shots/habitat.jpg", alt: "HABITAT floor plan and 3D view"},
];

const featuredCredentialIdx = [0, 1, 2, 3, 6, 7];
const featuredCredentials = featuredCredentialIdx.map(i => credentials[i]);
const otherCredentials = credentials.filter((_, i) => !featuredCredentialIdx.includes(i));
const delivered = clients.filter(c => c.status === "delivered");
const concepts = clients.filter(c => c.status === "demo");
const filters = ["All", ...mapGroups] as const;
const disciplines: Record<string, string> = {
  "Web & apps": "Full-stack products, from PHP and MySQL back ends to polished front ends.",
  "ML & AI": "Trained models with honest evaluation and documented limits.",
  "Interactive": "Sandboxes, learning labs and games you can actually play.",
  "Research": "Co-authored academic research, written up in full.",
  "Clients": "Storefronts delivered end to end, and concepts pitched to clients.",
};

const isExternal = (href: string) => /^https?:/.test(href);
const credentialAction = (href: string) => href === site.linkedin ? "LinkedIn" : href.endsWith(".pdf") ? "PDF" : "Verify";

function Words({ text, className }: { text: string; className?: string }) {
  return <>{text.split(" ").map((w, i, a) => <Fragment key={i}><span className={"v-w" + (className ? " " + className : "")}><span>{w}</span></span>{i < a.length - 1 ? " " : ""}</Fragment>)}</>;
}

function Links({ links }: { links: Link[] }) {
  return <div className="v-links">{links.map(l => <a key={l.label} href={l.href} className={l.primary ? "is-primary" : undefined} {...(isExternal(l.href) ? {target: "_blank", rel: "noreferrer"} : {})}><span>{l.label}</span><i aria-hidden="true">↗</i></a>)}</div>;
}

function Head({ num, label, title, accent, note }: { num: string; label: string; title: string; accent: string; note?: string }) {
  return <header className="v-head">
    <span className="v-label" data-reveal>{num} / {label}</span>
    <h2 data-split><Words text={title}/> <Words text={accent} className="is-accent"/></h2>
    {note && <p data-reveal>{note}</p>}
  </header>;
}

function Index() {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [menu, setMenu] = useState(false);
  const visible = filter === "All" ? allProjects : allProjects.filter(p => p.group === filter);

  useEffect(() => root.current ? initMotion(root.current) : undefined, []);
  const filtered = useRef(false);
  useEffect(() => { if (filtered.current && list.current) animateRows(list.current); filtered.current = true; }, [filter]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menu);
    if (!menu) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  const nav = [["#work", "Work"], ["#index", "Index"], ["#play", "Play"], ["#clients", "Clients"], ["#about", "About"]];

  return <div className="v-site" ref={root}>
    <div className="v-loader" aria-hidden="true">
      <div className="v-loader__mark"><img src="/assets/brand/favicon.svg" alt=""/></div>
      <div className="v-loader__count"><span>000</span><small>%</small></div>
      <div className="v-loader__line">Morish Macayan — Applied curiosity</div>
    </div>
    <div className="v-progress" aria-hidden="true"><i/></div>
    <div className="v-cursor" aria-hidden="true" data-state="gone"><i className="v-cursor__dot"/><i className="v-cursor__ring"><span/></i></div>
    <div className="v-preview" aria-hidden="true"><img alt="" src="/assets/shots/habitat.jpg"/></div>

    <header className="v-nav">
      <a href="#top" className="v-nav__brand" aria-label="Morish Macayan, back to top"><img src="/assets/brand/favicon.svg" alt=""/><span>Morish Macayan</span></a>
      <nav aria-label="Main navigation" className="v-nav__links">{nav.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
      <a className="v-nav__cta" href="#contact" data-magnetic><span>Let's talk</span><i aria-hidden="true">↗</i></a>
      <button className="v-nav__menu" aria-expanded={menu} aria-controls="v-menu" onClick={() => setMenu(!menu)}><span className="sr">{menu ? "Close menu" : "Open menu"}</span><i/><i/></button>
    </header>
    <div className="v-menu" id="v-menu" data-open={menu} inert={!menu}>
      <nav aria-label="Mobile navigation">{[...nav, ["#contact", "Contact"]].map(([h, t], i) => <a key={h} href={h} onClick={() => setMenu(false)} style={{"--i": i} as React.CSSProperties}><small>0{i + 1}</small>{t}</a>)}</nav>
      <div className="v-menu__foot"><a href={`mailto:${site.email}`}>{site.email}</a><span>{site.location}</span></div>
    </div>

    <main>
      <section className="v-hero" id="top">
        <div className="v-hero__grid" aria-hidden="true"/>
        <div className="v-hero__copy">
          <p className="v-label" data-hero>Morish Macayan — Developer · AI track · Mapúa University</p>
          <h1 data-hero-title aria-label="Ideas into working systems."><span className="v-line"><Words text="Ideas into"/></span><span className="v-line is-accent"><Words text="working"/></span><span className="v-line"><Words text="systems."/></span></h1>
          <p className="v-hero__lede" data-hero>I build web products, applied machine-learning tools, and interactive systems — and I'm clear about where they stop working.</p>
          <div className="v-hero__actions" data-hero>
            <a href="#work" className="v-btn is-solid" data-magnetic><span>See the work</span><i aria-hidden="true">↓</i></a>
            <a href="#contact" className="v-btn" data-magnetic><span>Start a project</span><i aria-hidden="true">↗</i></a>
          </div>
        </div>
        <div className="v-stack" aria-hidden="true">
          {heroStack.map((s, i) => <div className="v-stack__slot" key={s.src} style={{"--i": i} as React.CSSProperties}><figure className="v-stack__card"><img src={s.src} alt="" width={1280} height={800}/></figure></div>)}
        </div>
        <dl className="v-hero__meta" data-hero>
          <div><dt>Projects</dt><dd>{allProjects.length}</dd></div>
          <div><dt>ML internship</dt><dd>FlyRank</dd></div>
          <div><dt>Delivered sites</dt><dd>{delivered.length}</dd></div>
          <div><dt>Based in</dt><dd>Malolos, PH</dd></div>
        </dl>
        <a href="#work" className="v-hero__scroll" data-hero aria-label="Scroll to work"><span>Scroll</span><i/></a>
      </section>

      <nav className="v-stats" aria-label="Projects by discipline">
        {mapGroups.map((g, i) => <a key={g} href="#index" className="v-stat" onClick={() => setFilter(g)}>
          <span className="v-label">0{i + 1} / {g}</span>
          <strong data-count={allProjects.filter(p => p.group === g).length}>{allProjects.filter(p => p.group === g).length}</strong>
          <p>{disciplines[g]}</p>
          <span className="v-stat__go">View in index <i aria-hidden="true">↓</i></span>
        </a>)}
      </nav>

      <section className="v-featured" id="work">
        <div className="v-featured__intro">
          <Head num="01" label="Selected work" title="Built to be" accent="used." note="Five projects that carry the most weight: real interfaces, measured models, and honest limits."/>
          <p className="v-featured__hint" data-reveal><span>Scroll</span><i aria-hidden="true">→</i></p>
        </div>
        <div className="v-featured__track">
          {featured.map((p, i) => <article className="v-panel" key={p.key}>
            <a className="v-panel__media" href={p.caseSlug ? `/case/${p.caseSlug}` : p.links[0].href} data-cursor="Case study" data-curtain>
              <img src={p.img} alt={p.alt} loading={i < 2 ? "eager" : "lazy"} width={1280} height={800}/>
            </a>
            <div className="v-panel__body">
              <span className="v-panel__num">0{i + 1}</span>
              <div>
                <span className="v-label">{p.kind}</span>
                <h3 style={p.caseSlug ? {viewTransitionName: `case-${p.caseSlug}`} as React.CSSProperties : undefined}>{p.title}</h3>
                <p>{p.line}</p>
                <p className="v-panel__built">{p.built}</p>
                <Chips items={p.tags}/>
                <Links links={p.links}/>
              </div>
            </div>
          </article>)}
          <div className="v-panel v-panel--end"><span className="v-label">And {allProjects.length - featured.length} more</span><a href="#index" className="v-btn is-solid" data-magnetic><span>Open the full index</span><i aria-hidden="true">↓</i></a></div>
        </div>
      </section>

      <section className="v-index" id="index">
        <div className="v-wrap">
          <Head num="02" label="Index" title="Every project," accent="sorted." note="Filter by discipline. Hover a row to preview it."/>
          <div className="v-filters" role="toolbar" aria-label="Filter projects" data-reveal>
            {filters.map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}<sup>{f === "All" ? allProjects.length : allProjects.filter(p => p.group === f).length}</sup></button>)}
          </div>
          <ol className="v-rows" ref={list}>
            {visible.map(p => <li key={p.key}>
              <a href={p.href} data-preview={shots[p.key] || ""} {...(isExternal(p.href) ? {target: "_blank", rel: "noreferrer"} : {})}>
                <span className="v-rows__num">{String(allProjects.indexOf(p) + 1).padStart(2, "0")}</span>
                <span className="v-rows__title">{p.title}</span>
                <span className="v-rows__line">{p.line}</span>
                <span className="v-rows__group">{p.group}</span>
                <i aria-hidden="true">↗</i>
              </a>
            </li>)}
          </ol>
        </div>
      </section>

      <section className="v-play" id="play">
        <div className="v-play__bg" aria-hidden="true"/>
        <div className="v-wrap">
          <Head num="03" label="The playground" title="What" accent="if?" note="Small questions turned into things you can play with."/>
        </div>
        <div className="v-play__track" data-cursor="Drag">
          {lab.map(l => <article className="v-card" key={l.key}>
            <a href={l.href} target="_blank" rel="noreferrer" className="v-card__media" draggable={false}>
              {l.img ? <img src={l.img} alt={l.alt} loading="lazy" width={1280} height={800} draggable={false}/> : <span className="v-card__plate">LAST<br/>TENANT</span>}
            </a>
            <div className="v-card__meta"><span className="v-label">{l.num} / {l.kind}</span><span className="v-tag">{l.status}</span></div>
            <h3>{l.title}</h3>
            <p>{l.line}</p>
            {l.extra && <Links links={[l.extra]}/>}
          </article>)}
        </div>
        <div className="v-wrap v-play__foot"><a className="v-btn is-lime" href="/lab" data-magnetic><span>Enter the full Lab</span><i aria-hidden="true">↗</i></a></div>
      </section>

      <section className="v-clients" id="clients">
        <div className="v-wrap">
          <Head num="04" label="Clients & concepts" title="Made for" accent="people." note="Storefronts delivered end to end, and interactive concepts pitched to prospective clients."/>
          {[["Delivered", delivered], ["Presented concepts", concepts]].map(([label, group]) => <div className="v-clients__group" key={label as string}>
            <h3 className="v-label" data-reveal>{label as string} · {(group as typeof clients).length}</h3>
            <div className="v-clients__grid">{(group as typeof clients).map(c => <article key={c.key} className="v-client">
              <a href={c.live} target="_blank" rel="noreferrer" className="v-client__media" data-cursor="Visit" data-curtain><img src={c.img} alt={c.alt} loading="lazy" width={1280} height={800}/></a>
              <div className="v-client__row"><h4>{c.title}</h4><span>{c.kind}</span></div>
              <p>{c.line}</p>
              <Links links={[{label: c.status === "demo" ? "Open demo" : "Visit site", href: c.live}, {label: "Source", href: c.source}]}/>
            </article>)}</div>
          </div>)}
        </div>
      </section>

      <section className="v-about" id="about">
        <div className="v-wrap">
          <span className="v-label" data-reveal>05 / The person behind the systems</span>
          <p className="v-scrub"><Words text={`I'm ${site.fullName} — a Computer Science student on the AI track at Mapúa University and an independent developer in Malolos. I care about understanding how something works, and being clear about where it doesn't.`}/></p>
          <div className="v-about__grid">
            <ol className="v-timeline">{timeline.map(t => <li key={t.role} data-reveal><span className="v-label">{t.year}</span><h3>{t.role}</h3><p>{t.org} / {t.note}</p></li>)}</ol>
            <div className="v-about__side" data-reveal>
              <span className="v-label">Tools I work with</span>
              <Chips items={toolkit}/>
              <a className="v-btn is-solid" href={site.resume} target="_blank" rel="noreferrer" data-magnetic><span>Read my résumé</span><i aria-hidden="true">↗</i></a>
            </div>
          </div>
        </div>
      </section>

      <section className="v-certs" id="certifications">
        <div className="v-wrap">
          <Head num="06" label={`Credentials · ${credentials.length}`} title="Learning" accent="with proof." note="The six that carry the most weight. Every record links to its evidence."/>
          <div className="v-certs__grid">{featuredCredentials.map((c, i) => <a className="v-cert" key={c.name} href={c.href} target="_blank" rel="noreferrer" data-reveal>
            <span className="v-cert__top"><span className="v-label">{c.org}</span><i aria-hidden="true">↗</i></span>
            <h3>{c.name}</h3>
            <span className="v-cert__foot"><span>{String(i + 1).padStart(2, "0")}</span><span>{credentialAction(c.href)}</span></span>
          </a>)}</div>
          <details className="v-more" data-reveal>
            <summary><span>Show all {credentials.length} credentials</span><i aria-hidden="true">+</i></summary>
            <ul>{otherCredentials.map(c => <li key={c.name}><a href={c.href} target="_blank" rel="noreferrer"><span>{c.name}</span><span className="v-label">{c.org}</span><i aria-hidden="true">↗</i></a></li>)}</ul>
          </details>
        </div>
      </section>

      <section className="v-academic" id="academic">
        <div className="v-wrap">
          <Head num="07" label="Academic work" title="Learning," accent="documented." note="Coursework, applications, and co-authored research."/>
          {academic.map(a => <details className="v-disclosure" key={a.key} data-reveal>
            <summary><span className="v-label">{a.num}</span><span>{a.title}</span><i aria-hidden="true">+</i></summary>
            <div><span className="v-label">{a.kind} / {a.role}</span><p>{a.line}</p>{a.shared && <p>{a.shared}</p>}<Chips items={a.tags}/><Links links={a.links}/></div>
          </details>)}
        </div>
      </section>

      <section className="v-end" id="contact">
        <div className="v-end__bg" aria-hidden="true"/>
        <div className="v-wrap">
          <span className="v-label" data-reveal>08 / Next connection</span>
          <h2 data-split><Words text="Have something"/> <Words text="in mind?" className="is-accent"/></h2>
          <div className="v-end__grid">
            <div className="v-end__info" data-reveal>
              <a className="v-end__email" href={`mailto:${site.email}`} data-magnetic><span>{site.email}</span><i aria-hidden="true">↗</i></a>
              <p>{site.location}</p>
              <Links links={[{label: "GitHub", href: site.github}, {label: "LinkedIn", href: site.linkedin}, {label: "Résumé", href: site.resume}]}/>
            </div>
            <div data-reveal><ContactForm/></div>
          </div>
        </div>
      </section>
    </main>

    <footer className="v-footer">
      <div className="v-footer__word" aria-hidden="true">Applied curiosity</div>
      <div className="v-wrap v-footer__row"><span>© {new Date().getFullYear()} {site.name}</span><span>Ideas into working systems.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  </div>;
}
