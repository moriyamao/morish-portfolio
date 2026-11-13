import { createFileRoute } from "@tanstack/react-router";
import { Chips } from "@/components/site/parts";
import { selected, alsoBuilt, lab, type CaseLink } from "@/site/content";

export const Route = createFileRoute("/showcase")({component: Showcase});

const BASE = "/morish-portfolio";

type Part = {
  key: string; code: string; part: string; kind: string; title: string; line: string; built?: string;
  tags: string[]; img?: string; alt: string; status: string; links: CaseLink[];
};

const work = (k: string) => [...selected, ...alsoBuilt].find(p => p.key === k)!;
const labItem = (k: string) => lab.find(p => p.key === k)!;

const fromWork = (k: string, code: string, part: string, kind: string, status: string): Part => {
  const w = work(k);
  return {key: w.key, code, part, kind, title: w.title, line: w.line, built: w.built, tags: w.tags, img: w.img, alt: w.alt || w.title, status, links: w.links};
};
const fromLab = (k: string, code: string, part: string, kind: string, play: string): Part => {
  const l = labItem(k);
  return {key: l.key, code, part, kind, title: l.title, line: l.line, tags: l.tags, img: l.img, alt: l.alt || l.title, status: l.status,
    links: [{label: play, href: l.href, primary: true}, ...(l.extra ? [l.extra] : [])]};
};

export const parts: Part[] = [
  fromWork("habitat", "HB-01", "Spatial processor", "cpu", "Playable"),
  fromWork("leakagelens", "LL-02", "Leakage sensor array", "sensor", "Live demo"),
  fromWork("tutorialcheck", "TC-03", "Lint co-processor", "module", "Live demo"),
  fromWork("travelease", "TE-04", "Itinerary bus", "connector", "Live site"),
  fromLab("trace", "TR-05", "Execution display", "matrix", "Open the lab"),
  fromLab("marketwise", "MW-06", "Market memory", "ram", "Play it"),
  fromLab("catalyst", "CT-07", "Reaction coil", "coil", "Play it"),
  fromLab("last-tenant", "LT-08", "Game core", "fan", "Play on Roblox"),
];

const external = (href: string) => /^https?:/.test(href) ? {target: "_blank", rel: "noreferrer"} : {};

function Showcase() {
  return <div className="sc">
    <canvas className="sc-canvas" aria-hidden="true"/>
    <div className="sc-vignette" aria-hidden="true"/>
    <header className="sc-top">
      <a href={`${BASE}/`} className="sc-back"><span aria-hidden="true">←</span> Portfolio</a>
      <span className="sc-title">Showcase <i>/</i> Rev. 2026</span>
      <span className="sc-status" aria-live="polite">Booting board…</span>
    </header>
    <nav className="sc-rail" aria-label="Projects on the board">
      {parts.map((p, i) => <a key={p.key} href={`#sc-${p.key}`} data-index={i}><span>{p.code}</span><b>{p.title}</b></a>)}
    </nav>
    <div className="sc-tip" aria-hidden="true"><b/><span/></div>
    <div className="sc-progress" aria-hidden="true"><i/></div>

    <main className="sc-steps">
      <section className="sc-step sc-intro" id="sc-intro">
        <div className="sc-intro__copy">
          <p className="v-label">Morish Macayan / Showcase</p>
          <h1>Eight systems.<br/><em>One board.</em></h1>
          <p>Every project I'm proudest of, mounted as a component on a working circuit. Scroll to power each one, and the arm will hand it to you.</p>
          <span className="sc-hint"><i aria-hidden="true"/>Scroll to power on</span>
        </div>
      </section>

      {parts.map((p, i) => <section className="sc-step" id={`sc-${p.key}`} key={p.key}
        data-key={p.key} data-kind={p.kind} data-img={p.img || ""} data-title={p.title} data-part={p.part} data-code={p.code}
        data-tags={p.tags.join(" · ")} data-href={p.links[0].href}>
        <article className="sc-card">
          <div className="sc-card__head"><span className="sc-card__num">0{i + 1}</span><span className="v-label">{p.code} / {p.part}</span></div>
          <h2>{p.title}</h2>
          <p>{p.line}</p>
          {p.built && <p className="sc-card__built">{p.built}</p>}
          <Chips items={p.tags}/>
          {p.img && <img className="sc-card__img" src={p.img} alt={p.alt} loading="lazy" width={1280} height={800}/>}
          <div className="v-links">{p.links.map(l => <a key={l.label} href={l.href} className={l.primary ? "is-primary" : undefined} {...external(l.href)}><span>{l.label}</span><i aria-hidden="true">↗</i></a>)}</div>
          <span className="sc-card__status"><i aria-hidden="true"/>{p.status}</span>
        </article>
      </section>)}

      <section className="sc-step sc-outro" id="sc-outro">
        <div className="sc-intro__copy">
          <p className="v-label">End of board</p>
          <h2>That's the<br/><em>whole circuit.</em></h2>
          <p>Fourteen more projects live in the full index, from client storefronts to co-authored research.</p>
          <div className="sc-actions">
            <a className="v-btn is-lime" href={`${BASE}/#index`}><span>See every project</span><i aria-hidden="true">↗</i></a>
            <a className="v-btn" href={`${BASE}/#contact`}><span>Start a project</span><i aria-hidden="true">↗</i></a>
          </div>
        </div>
      </section>
    </main>
  </div>;
}
