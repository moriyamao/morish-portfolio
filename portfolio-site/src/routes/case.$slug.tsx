import { createFileRoute, Link } from "@tanstack/react-router";

import { Nav, Footer } from "@/components/site/parts";
import { caseSlugList, getCase } from "@/site/content";

export const Route = createFileRoute("/case/$slug")({
  component: CasePage,
});

function CasePage() {
  const { slug } = Route.useParams();
  const study = getCase(slug);

  if (!study) {
    return (
      <>
        <Nav />
        <main>
          <section className="sec" style={{ paddingTop: 140 }}>
            <div className="wrap">
              <p className="mono">404 / No such case study</p>
              <h1 className="sec-title" style={{ marginTop: 14 }}>
                That page is not in the index.
              </h1>
              <p className="sec-lede" style={{ marginTop: 18 }}>
                The work index has every project and case study that exists.
              </p>
              <div style={{ marginTop: 26 }}>
                <Link className="lnk primary" to="/">
                  Back to the portfolio
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const idx = caseSlugList.indexOf(study.slug);
  const prev = idx > 0 ? getCase(caseSlugList[idx - 1]) : undefined;
  const next = idx < caseSlugList.length - 1 ? getCase(caseSlugList[idx + 1]) : undefined;

  return (
    <>
      <Nav />
      <main>
        <header className="case-hero">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Portfolio</Link>
              <span>/</span>
              <Link to="/" hash="work">
                Work
              </Link>
              <span>/</span>
              <span>Case {study.num}</span>
            </nav>
            <div className="case-grid">
              <div>
                <div className="case-kicker">{study.kicker}</div>
                <h1 className="case-title" style={{ viewTransitionName: `case-${study.slug}` } as React.CSSProperties}>{study.title}</h1>
                <p className="case-lede">{study.lede}</p>
                <div className="chips" style={{ marginTop: 20 }}>
                  {study.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <aside className="case-facts">
                {study.facts.map((f) => (
                  <div className="f" key={f.k}>
                    <span className="k">{f.k}</span>
                    <span className="v">{f.v}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </header>

        <div className="wrap">
          <div className="case-body">
            <aside className="case-rail" aria-label="Sections">
              {study.sections.map((s, i) => (
                <a key={s.h} href={`#s${i}`}>
                  {String(i + 1).padStart(2, "0")} {s.h}
                </a>
              ))}
            </aside>

            <div className="case-sections">
              {study.sections.map((s, i) => (
                <section className="case-sec" key={s.h} id={`s${i}`}>
                  <div className="sec-eyebrow">
                    <span className="lbl">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ln" />
                  </div>
                  <h2>{s.h}</h2>
                  {s.fig ? (
                    <figure className="case-fig">
                      <img src={s.fig.src} alt={s.fig.alt} loading="lazy" width={1280} height={800} />
                      <figcaption>{s.fig.caption}</figcaption>
                    </figure>
                  ) : null}
                  {s.p?.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {s.list ? (
                    <ul>
                      {s.list.map((li) => (
                        <li key={li.slice(0, 40)}>{li}</li>
                      ))}
                    </ul>
                  ) : null}
                  {s.table ? (
                    <table>
                      <thead>
                        <tr>
                          {s.table.head.map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r) => (
                          <tr key={r.join("|")}>
                            {r.map((c, ci) => (
                              <td key={ci}>{c}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}
                </section>
              ))}
            </div>
          </div>

          <div className="case-foot">
            {study.note ? <p className="note-line">{study.note}</p> : null}
            <div className="link-row">
              {study.links.map((l) => (
                <a
                  key={l.label}
                  className={l.primary ? "lnk primary" : "lnk"}
                  href={l.href}
                  target={l.href.startsWith("http") || l.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>

            <div className="next-nav">
              {prev ? (
                <Link to="/case/$slug" params={{ slug: prev.slug }}>
                  <span className="mono">← Previous</span>
                  <span className="t">{prev.title}</span>
                </Link>
              ) : (
                <Link to="/">
                  <span className="mono">← All work</span>
                  <span className="t">Portfolio</span>
                </Link>
              )}
              {next ? (
                <Link to="/case/$slug" params={{ slug: next.slug }} className="right">
                  <span className="mono">Next →</span>
                  <span className="t">{next.title}</span>
                </Link>
              ) : (
                <Link to="/" hash="contact" className="right">
                  <span className="mono">Next</span>
                  <span className="t">Contact</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
