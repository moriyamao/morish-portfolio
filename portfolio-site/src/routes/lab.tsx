import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Nav, Footer, Plate } from "@/components/site/parts";
import { lab } from "@/site/content";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "The Lab - Morish Macayan" },
      {
        name: "description",
        content:
          "Five experiments by Morish Macayan: HABITAT, TRACE, MARKETWISE, CATALYST and LAST TENANT. Built to test an idea or make it tangible.",
      },
    ],
  }),
  component: LabPage,
});

type Group = "all" | "space" | "learning" | "game";

const groups: { key: Group; label: string }[] = [
  { key: "all", label: "All" },
  { key: "space", label: "Space" },
  { key: "learning", label: "Learning" },
  { key: "game", label: "Game" },
];

function LabPage() {
  const [group, setGroup] = useState<Group>("all");

  const items = useMemo(() => (group === "all" ? lab : lab.filter((l) => l.group === group)), [group]);

  return (
    <>
      <Nav />
      <main>
        <section className="sec" id="lab">
          <div className="wrap" style={{ paddingTop: 34 }}>
            <div className="sec-eyebrow">
              <span className="lbl">Lab / 005</span>
              <span className="ln" />
            </div>
            <h1 className="sec-title" style={{ fontSize: "clamp(44px, 8vw, 116px)", maxWidth: "12ch" }}>
              The Lab.
            </h1>
            <p className="sec-lede" style={{ marginTop: 22, maxWidth: "56ch" }}>
              Five experiments built to test an idea, teach a concept, or make something interesting enough to keep
              exploring. No single discipline. One rule: make the idea tangible.
            </p>

            <div className="filters" style={{ marginTop: 38 }}>
              <div className="filter-group">
                <span className="mono">Type</span>
                <div className="filter-btns">
                  {groups.map((g) => (
                    <button
                      key={g.key}
                      className="fbtn"
                      aria-pressed={group === g.key}
                      onClick={() => setGroup(g.key)}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-count" aria-live="polite">
                {items.length} of {lab.length} experiments
              </div>
            </div>

            <div className="lab-grid">
              {items.map((l) => (
                <article className="lab-card" key={l.key}>
                  <div className="shot">
                    {l.img ? (
                      <img src={l.img} alt={l.alt} loading="lazy" width={1280} height={800} />
                    ) : (
                      <Plate kind="tenant" />
                    )}
                  </div>
                  <div className="body">
                    <div className="lab-top">
                      <span className="lab-num">{l.num}</span>
                      <span className="status">{l.status}</span>
                    </div>
                    <div>
                      <div className="lab-kind">{l.kind}</div>
                      <h2 className="lab-title">{l.title}</h2>
                    </div>
                    <p className="lab-line">{l.line}</p>
                    <div className="chips">
                      {l.tags.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="lab-links">
                      <a className="lnk primary" href={l.href} target="_blank" rel="noreferrer">
                        Open ↗
                      </a>
                      {l.extra ? (
                        <a className="lnk" href={l.extra.href}>
                          {l.extra.label} ↗
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="note-line" style={{ marginTop: 26 }}>
              Captures are of the live experiments. LAST TENANT runs on Roblox and uses its game artwork.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
