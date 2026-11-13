import { useEffect, useState, type ReactNode } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="nav">
      <a className="skip-link" href="#work">
        Skip to Selected Work
      </a>
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="Applied Curiosity, back to top">
          <span className="dot" aria-hidden="true" />
          <span>Morish</span>
          <b>Macayan</b>
          <span className="long">/ Applied Curiosity</span>
        </a>

        <nav className="nav-links" aria-label="Sections">
          <a className="nav-link" href="#work">
            Selected Work
          </a>
          <a className="nav-link" href="/morish-portfolio/showcase/">
            3D Showcase
          </a>
          <a className="nav-link" href="#academic">
            Academic
          </a>
          <a className="nav-link" href="#clients">
            Clients
          </a>
          <a className="nav-link" href="#about">
            About
          </a>
          <a className="nav-link" href="#contact">
            Contact
          </a>
        </nav>

        <a className="nav-skip" href="#work">
          <span aria-hidden="true">↳</span> <span className="txt">Skip to Work</span>
        </a>
        <a className="nav-resume" href="https://moriyamao.github.io/morish-portfolio/resume.pdf">
          Résumé ↗
        </a>

        <button
          className="nav-menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div className="mobile-drawer" id="mobile-nav" data-open={open ? "true" : "false"}>
        <a href="#work" onClick={() => setOpen(false)}>
          Selected Work
        </a>
        <a href="/morish-portfolio/showcase/" onClick={() => setOpen(false)}>
          3D Showcase
        </a>
        <a href="#academic" onClick={() => setOpen(false)}>
          Academic Projects
        </a>
        <a href="#clients" onClick={() => setOpen(false)}>
          Clients
        </a>
        <a href="#about" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
        <a href="https://moriyamao.github.io/morish-portfolio/resume.pdf">Résumé ↗</a>
      </div>
    </header>
  );
}

export function SectionHead({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <div>
        <div className="sec-eyebrow">
          <span className="lbl">
            {index} / {label}
          </span>
          <span className="ln" />
        </div>
        <h2 className="sec-title">{title}</h2>
      </div>
      {lede ? <div className="sec-lede">{lede}</div> : null}
    </div>
  );
}

export function LinkRow({ links, className = "link-row" }: { links: { label: string; href: string; primary?: boolean }[]; className?: string }) {
  return (
    <div className={className}>
      {links.map((l) => (
        <a
          key={l.href + l.label}
          className={l.primary ? "lnk primary" : "lnk"}
          href={l.href}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel={l.href.startsWith("http") ? "noreferrer" : undefined}
        >
          {l.label} <span className="arw">↗</span>
        </a>
      ))}
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((t) => (
        <span className="chip" key={t}>
          {t}
        </span>
      ))}
    </div>
  );
}

/** Illustrative plates: clearly diagrams, never presented as screenshots. */
export function Plate({ kind }: { kind: "tenant" | "agent" }) {
  if (kind === "tenant") {
    return (
      <div className="plate">
        <svg viewBox="0 0 400 300" role="img" aria-label="Illustrative diagram: a boarding-house corridor with one lit doorway">
          <defs>
            <linearGradient id="lamp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3b6bff" stopOpacity="0.32" />
              <stop offset="1" stopColor="#3b6bff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="400" height="300" fill="#0b0c0e" />
          {/* corridor perspective */}
          <path d="M0 260 L150 190 L150 60 L0 0 Z" fill="#101317" />
          <path d="M400 260 L250 190 L250 60 L400 0 Z" fill="#14181c" />
          <rect x="150" y="60" width="100" height="130" fill="#0d0f12" />
          <path d="M150 260 L250 190 L250 60 L150 60 Z" fill="none" stroke="rgba(244,241,234,0.16)" />
          <path d="M250 260 L250 190 L400 260" fill="none" stroke="rgba(244,241,234,0.08)" />
          {/* door */}
          <rect x="176" y="96" width="48" height="94" fill="#1b2027" stroke="rgba(244,241,234,0.22)" />
          <rect x="228" y="150" width="4" height="4" fill="#3b6bff" />
          {/* light spill */}
          <path d="M176 190 L224 190 L250 260 L150 260 Z" fill="url(#lamp)" />
          <path d="M176 96 L224 96 L224 190 L176 190 Z" fill="#3b6bff" opacity="0.06" />
          <text x="20" y="40" fill="#83868a" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2">
            SOLO BUILD / ROBLOX
          </text>
          <text x="20" y="56" fill="#f4f1ea" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="3">
            ONE LIT DOOR
          </text>
        </svg>
        <span className="cap">Illustrative diagram, not a screenshot</span>
      </div>
    );
  }
  return (
    <div className="plate">
      <svg viewBox="0 0 400 300" role="img" aria-label="Illustrative diagram: a terminal session with a generated pandas query and its result">
        <rect x="0" y="0" width="400" height="300" fill="#0b0c0e" />
        <rect x="26" y="30" width="348" height="240" fill="#101317" stroke="rgba(244,241,234,0.14)" />
        <rect x="26" y="30" width="348" height="22" fill="#16191d" stroke="rgba(244,241,234,0.14)" />
        <circle cx="40" cy="41" r="3" fill="#3b6bff" />
        <text x="52" y="45" fill="#83868a" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.6">
          DATA SCOUT / BOUNDED TOOL LOOP
        </text>
        {[
          { t: "> which pages lost clicks last month?", c: "#f4f1ea" },
          { t: "  tool: query_content_performance", c: "#3b6bff" },
          { t: "  df[df.ctr_delta < 0].sort_values('clicks')", c: "#83868a" },
          { t: "  rows: 128  ·  verified against tool output", c: "#83868a" },
          { t: "  12 pages, 3 with a ranking change", c: "#f4f1ea" },
        ].map((l, i) => (
          <text
            key={i}
            x="42"
            y={76 + i * 22}
            fill={l.c}
            fontFamily="JetBrains Mono, monospace"
            fontSize="9.5"
            letterSpacing="0.2"
          >
            {l.t}
          </text>
        ))}
        <line x1="42" y1="196" x2="358" y2="196" stroke="rgba(244,241,234,0.12)" />
        <text x="42" y="216" fill="#83868a" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.4">
          EVERY EXECUTED QUERY IS SHOWN
        </text>
        <rect x="42" y="230" width="62" height="3" fill="#3b6bff" />
      </svg>
      <span className="cap">Illustrative diagram, not a screenshot</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-inner">
          <div>
            <div className="sig">Morish Macayan</div>
            <div className="fine" style={{ marginTop: 8 }}>
              Built with intention. Always in progress.
            </div>
          </div>
          <div className="fine">© 2026 · Applied Curiosity</div>
          <a className="to-top" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export function BriefForm() {
  const [name, setName] = useState("");
  const [what, setWhat] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project brief${what ? `: ${what}` : ""}`);
    const body = encodeURIComponent(`${msg}\n\nFrom: ${name || "name not given"}`);
    window.location.href = `mailto:morishalfonsomacayan@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="brief" onSubmit={submit}>
      <h3>Compose a brief</h3>
      <p>This opens your mail app with the brief filled in. Nothing is stored on this site.</p>
      <div className="field">
        <label htmlFor="bf-name">Your name</label>
        <input id="bf-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="bf-what">What is it</label>
        <input
          id="bf-what"
          value={what}
          onChange={(e) => setWhat(e.target.value)}
          placeholder="Business site, prototype, role"
        />
      </div>
      <div className="field">
        <label htmlFor="bf-msg">What should it accomplish</label>
        <textarea id="bf-msg" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} />
      </div>
      <button className="brief-btn" type="submit">
        Open in mail ↗
      </button>
      <p className="hint">Or email directly: morishalfonsomacayan@gmail.com</p>
    </form>
  );
}
