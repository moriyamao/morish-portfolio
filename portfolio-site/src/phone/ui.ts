/**
 * The phone's screen: a tiny app drawn on a 2D canvas that becomes the 3D screen texture.
 * Taps arrive as canvas coordinates (from a raycast on the 3D screen) and hit-test against
 * rectangles registered while drawing, so what you see is exactly what you can tap.
 */

export const W = 620;
export const H = 1316;

export type Profile = {
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  avatar: string;
  banner: string;
};

type Screen = "home" | "github" | "linkedin" | "mail";
type Action = () => void;
type Hit = { x: number; y: number; w: number; h: number; run: Action; label: string };

type Repo = { name: string; description: string | null; language: string | null; stargazers_count: number; html_url: string };
type GitHubData = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  repos: Repo[];
};

const FOREST = "#0f1813";
const LIME = "#dcff6e";
const SANS = '"Archivo", system-ui, -apple-system, "Segoe UI", sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

const SUBJECTS = [
  { label: "Project inquiry", body: "Hi Morish,\n\nI have a project in mind and would love to talk about it.\n\n" },
  { label: "Internship / role", body: "Hi Morish,\n\nWe're hiring and I think you'd be a great fit.\n\n" },
  { label: "Just saying hi", body: "Hi Morish,\n\nI came across your portfolio and wanted to say hello!\n\n" },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5", HTML: "#e34c26", CSS: "#663399",
  Lua: "#000080", Luau: "#00A2FF", Java: "#b07219", "C#": "#178600", "C++": "#f34b7d", Jupyter: "#DA5B0B",
};

// Brand marks, used only as links to Morish's own profiles.
const GITHUB_MARK = new Path2D(
  "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3",
);

export function createPhoneUI(profile: Profile, opts: { reducedMotion: boolean; open: (url: string) => void }) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  let screen: Screen = "home";
  let from: Screen | null = null; // screen we're animating away from
  let t = 1; // transition progress 0..1
  let subject = 0;
  let toast: { text: string; until: number } | null = null;
  let pressed: string | null = null;
  let hits: Hit[] = [];
  let dirty = true;
  let gh: GitHubData | null = null;
  let ghState: "idle" | "loading" | "ready" | "error" = "idle";
  const images = new Map<string, HTMLImageElement>();

  function image(src: string, cors = false) {
    let img = images.get(src);
    if (!img) {
      img = new Image();
      if (cors) img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.onload = () => (dirty = true);
      img.src = src;
      images.set(src, img);
    }
    return img.complete && img.naturalWidth ? img : null;
  }
  // Warm the images used on first open.
  image(profile.avatar);
  image(profile.banner);

  // ── GitHub: live public data, cached per tab, with a static fallback ───────────────────
  const ghUser = profile.github.replace(/\/+$/, "").split("/").pop()!;
  async function loadGitHub() {
    if (ghState !== "idle") return;
    ghState = "loading";
    try {
      const cached = sessionStorage.getItem(`phone:gh:${ghUser}`);
      if (cached) {
        gh = JSON.parse(cached) as GitHubData;
        ghState = "ready";
        dirty = true;
        return;
      }
    } catch {
      /* storage blocked: fetch instead */
    }
    try {
      const [u, r] = await Promise.all([
        fetch(`https://api.github.com/users/${ghUser}`).then((res) => (res.ok ? res.json() : Promise.reject(res.status))),
        fetch(`https://api.github.com/users/${ghUser}/repos?sort=pushed&per_page=5`).then((res) =>
          res.ok ? res.json() : Promise.reject(res.status),
        ),
      ]);
      gh = { ...u, repos: (r as Repo[]).filter((x) => !(x as Repo & { fork?: boolean }).fork).slice(0, 4) };
      ghState = "ready";
      try {
        sessionStorage.setItem(`phone:gh:${ghUser}`, JSON.stringify(gh));
      } catch {
        /* fine without cache */
      }
    } catch {
      ghState = "error";
    }
    dirty = true;
  }

  // ── Navigation ─────────────────────────────────────────────────────────────────────────
  function go(next: Screen) {
    if (next === screen) return;
    from = screen;
    screen = next;
    t = opts.reducedMotion ? 1 : 0;
    if (next === "github") void loadGitHub();
    dirty = true;
  }

  function flash(text: string) {
    toast = { text, until: performance.now() + 1800 };
    dirty = true;
  }

  function mailUrl() {
    const s = SUBJECTS[subject]!;
    const q = new URLSearchParams({ view: "cm", fs: "1", to: profile.email, su: s.label, body: s.body });
    return `https://mail.google.com/mail/?${q}`;
  }

  // ── Drawing helpers ────────────────────────────────────────────────────────────────────
  const hit = (x: number, y: number, w: number, h: number, label: string, run: Action) => hits.push({ x, y, w, h, run, label });

  function rr(x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  }

  function text(s: string, x: number, y: number, size: number, color: string, opt: { weight?: number; font?: string; align?: CanvasTextAlign } = {}) {
    ctx.font = `${opt.weight ?? 400} ${size}px ${opt.font ?? SANS}`;
    ctx.fillStyle = color;
    ctx.textAlign = opt.align ?? "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(s, x, y);
  }

  /** Word-wrapped text; returns the y after the last line. */
  function para(s: string, x: number, y: number, maxW: number, size: number, color: string, lineH = size * 1.35, maxLines = 6, weight = 400) {
    ctx.font = `${weight} ${size}px ${SANS}`;
    const lines: string[] = [];
    for (const block of s.split("\n")) {
      let line = "";
      for (const word of block.split(" ")) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxW && line) {
          lines.push(line);
          line = word;
        } else line = test;
      }
      lines.push(line);
    }
    const shown = lines.slice(0, maxLines);
    if (lines.length > maxLines) shown[maxLines - 1] = `${shown[maxLines - 1]!.replace(/\s+\S*$/, "")}…`;
    shown.forEach((l, i) => text(l, x, y + i * lineH, size, color, { weight }));
    return y + shown.length * lineH;
  }

  function button(x: number, y: number, w: number, h: number, label: string, bg: string, fg: string, run: Action, id = label) {
    const down = pressed === id;
    rr(x, y + (down ? 2 : 0), w, h, h / 2);
    ctx.fillStyle = bg;
    ctx.fill();
    text(label, x + w / 2, y + h / 2 + 9 + (down ? 2 : 0), 26, fg, { weight: 700, align: "center" });
    hit(x, y, w, h, id, run);
  }

  function avatar(src: string | null, cx: number, cy: number, r: number, ring?: string) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r + (ring ? 6 : 0), 0, Math.PI * 2);
    ctx.fillStyle = ring ?? "#ccc";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    const img = src ? image(src, src.startsWith("http")) : null;
    if (img) ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
    else {
      ctx.fillStyle = "#5d6b62";
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      text("MM", cx, cy + r * 0.25, r * 0.7, "#fff", { weight: 700, align: "center" });
    }
    ctx.restore();
  }

  function statusBar(dark: boolean) {
    const c = dark ? "#fff" : "#111";
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "");
    text(time, 92, 72, 28, c, { weight: 700, align: "center" });
    // signal bars, wifi-ish arcs and battery, drawn simply
    ctx.fillStyle = c;
    [10, 14, 18, 22].forEach((h, i) => ctx.fillRect(428 + i * 9, 74 - h, 6, h));
    rr(478, 52, 46, 22, 6);
    ctx.strokeStyle = c;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    rr(482, 56, 32, 14, 3);
    ctx.fill();
    ctx.fillRect(526, 59, 3, 8);
  }

  function homeIndicator(dark: boolean) {
    rr(W / 2 - 100, H - 34, 200, 9, 5);
    ctx.fillStyle = dark ? "rgba(255,255,255,.85)" : "rgba(0,0,0,.75)";
    ctx.fill();
    if (screen !== "home") hit(W / 2 - 160, H - 90, 320, 90, "Home", () => go("home"));
  }

  function backBar(dark: boolean, title: string) {
    const c = dark ? "#e6edf3" : "#0a66c2";
    hit(20, 92, 170, 70, "Back", () => go("home"));
    text("‹ Home", 34, 140, 28, c, { weight: 600 });
    text(title, W / 2, 140, 28, dark ? "#e6edf3" : "#111", { weight: 700, align: "center" });
  }

  // ── Screens ────────────────────────────────────────────────────────────────────────────
  function drawHome() {
    const g = ctx.createLinearGradient(0, 0, W * 0.4, H);
    g.addColorStop(0, "#1b2d22");
    g.addColorStop(0.55, FOREST);
    g.addColorStop(1, "#070c09");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // soft lime blobs, echoing the portfolio terrain
    for (const [x, y, r, a] of [[90, 330, 260, 0.16], [560, 760, 300, 0.1], [200, 1180, 240, 0.08]] as const) {
      const b = ctx.createRadialGradient(x, y, 0, x, y, r);
      b.addColorStop(0, `rgba(220,255,110,${a})`);
      b.addColorStop(1, "rgba(220,255,110,0)");
      ctx.fillStyle = b;
      ctx.fillRect(0, 0, W, H);
    }
    statusBar(true);

    // name widget
    rr(40, 140, W - 80, 250, 40);
    ctx.fillStyle = "rgba(231,236,229,.08)";
    ctx.fill();
    ctx.strokeStyle = "rgba(231,236,229,.14)";
    ctx.lineWidth = 2;
    ctx.stroke();
    avatar(profile.avatar, 128, 265, 62, LIME);
    text("Morish Macayan", 214, 245, 36, "#e7ece5", { weight: 800 });
    text("Applied curiosity", 214, 285, 24, "rgba(231,236,229,.65)", { font: MONO });
    rr(214, 306, 196, 40, 20);
    ctx.fillStyle = LIME;
    ctx.fill();
    text("Open to work", 312, 334, 22, FOREST, { weight: 700, align: "center" });

    // apps
    const apps: { id: Screen | "resume"; label: string; draw: (x: number, y: number, s: number) => void }[] = [
      { id: "github", label: "GitHub", draw: iconGitHub },
      { id: "linkedin", label: "LinkedIn", draw: iconLinkedIn },
      { id: "mail", label: "Gmail", draw: iconMail },
      { id: "resume", label: "Résumé", draw: iconResume },
    ];
    const size = 112;
    const gap = (W - 80 - size * 4) / 3;
    apps.forEach((a, i) => {
      const x = 40 + i * (size + gap);
      const y = 450;
      const down = pressed === a.label;
      ctx.save();
      if (down) {
        ctx.translate(x + size / 2, y + size / 2);
        ctx.scale(0.92, 0.92);
        ctx.translate(-(x + size / 2), -(y + size / 2));
      }
      a.draw(x, y, size);
      ctx.restore();
      text(a.label, x + size / 2, y + size + 38, 22, "#e7ece5", { weight: 600, align: "center" });
      hit(x - 8, y - 8, size + 16, size + 56, a.label, () => (a.id === "resume" ? opts.open(profile.resume) : go(a.id)));
    });

    text("Tap an app", W / 2, 760, 24, "rgba(231,236,229,.45)", { font: MONO, align: "center" });

    // dock
    rr(28, H - 210, W - 56, 150, 46);
    ctx.fillStyle = "rgba(231,236,229,.1)";
    ctx.fill();
    text("Based in the Philippines · UTC+8", W / 2, H - 150, 22, "rgba(231,236,229,.75)", { font: MONO, align: "center" });
    text("Usually replies within a day", W / 2, H - 110, 22, LIME, { font: MONO, align: "center" });
    homeIndicator(true);
  }

  function drawGitHub() {
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, W, H);
    statusBar(true);
    backBar(true, "GitHub");
    const d = gh;
    avatar(d?.avatar_url ?? profile.avatar, 110, 250, 70);
    text(d?.name || "Morish Macayan", 205, 236, 34, "#e6edf3", { weight: 700 });
    text(d?.login ?? ghUser, 205, 276, 26, "#8b949e");
    let y = 360;
    if (d?.bio) y = para(d.bio, 40, y, W - 80, 25, "#c9d1d9", 34, 3) + 10;
    const stat = (label: string, value: number | string, x: number) => {
      text(String(value), x, y + 20, 26, "#e6edf3", { weight: 700 });
      const vw = ctx.measureText(String(value)).width;
      text(label, x + vw + 8, y + 20, 24, "#8b949e");
    };
    if (d) {
      stat("followers", d.followers, 40);
      stat("repos", d.public_repos, 330);
    } else text(ghState === "error" ? "Couldn't reach GitHub. Open the profile instead." : "Loading live profile…", 40, y + 20, 24, "#8b949e");
    y += 70;
    text("Recently updated", 40, y, 24, "#8b949e", { weight: 600, font: MONO });
    y += 20;
    for (const repo of d?.repos ?? []) {
      rr(40, y, W - 80, 150, 18);
      ctx.fillStyle = pressed === repo.name ? "#1c2330" : "#161b22";
      ctx.fill();
      ctx.strokeStyle = "#30363d";
      ctx.lineWidth = 2;
      ctx.stroke();
      text(repo.name.length > 26 ? `${repo.name.slice(0, 25)}…` : repo.name, 64, y + 44, 27, "#58a6ff", { weight: 700 });
      para(repo.description ?? "No description", 64, y + 82, W - 140, 21, "#8b949e", 28, 1);
      if (repo.language) {
        ctx.beginPath();
        ctx.arc(72, y + 122, 8, 0, Math.PI * 2);
        ctx.fillStyle = LANG_COLORS[repo.language] ?? "#8b949e";
        ctx.fill();
        text(repo.language, 88, y + 130, 21, "#8b949e");
      }
      text(`★ ${repo.stargazers_count}`, W - 64, y + 130, 21, "#8b949e", { align: "right" });
      hit(40, y, W - 80, 150, repo.name, () => opts.open(repo.html_url));
      y += 166;
    }
    button(40, H - 190, W - 80, 84, "Open GitHub profile", "#238636", "#fff", () => opts.open(profile.github));
    homeIndicator(true);
  }

  function drawLinkedIn() {
    ctx.fillStyle = "#f4f2ee";
    ctx.fillRect(0, 0, W, H);
    statusBar(false);
    backBar(false, "LinkedIn");
    // card
    rr(24, 176, W - 48, 860, 24);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.save();
    rr(24, 176, W - 48, 860, 24);
    ctx.clip();
    const banner = image(profile.banner);
    if (banner) {
      const bw = W - 48;
      const bh = 200;
      const scale = Math.max(bw / banner.naturalWidth, bh / banner.naturalHeight);
      const sw = bw / scale;
      const sh = bh / scale;
      ctx.drawImage(banner, (banner.naturalWidth - sw) / 2, (banner.naturalHeight - sh) / 2, sw, sh, 24, 176, bw, bh);
    } else {
      ctx.fillStyle = "#1d2b20";
      ctx.fillRect(24, 176, W - 48, 200);
    }
    ctx.restore();
    avatar(profile.avatar, 140, 376, 92, "#fff");
    let y = 530;
    text("Morish Macayan", 52, y, 38, "#191919", { weight: 700 });
    text("He/Him", 52 + ctx.measureText("Morish Macayan").width + 16, y, 24, "#666");
    y = para("BSCS at Mapúa University | ML Intern at FlyRank AI | Full Stack Developer | AWS ML Trainee", 52, y + 46, W - 120, 26, "#191919", 35, 4);
    text("Manila, National Capital Region, Philippines", 52, y + 14, 22, "#666");
    text("500+ connections", 52, y + 56, 23, "#0a66c2", { weight: 700 });
    y += 100;
    for (const [mark, name, color] of [["F", "Freelance", "#8a9ba8"], ["M", "Mapúa University", "#b4232c"]] as const) {
      rr(52, y, 52, 52, 8);
      ctx.fillStyle = color;
      ctx.fill();
      text(mark, 78, y + 37, 28, "#fff", { weight: 800, align: "center" });
      text(name, 124, y + 35, 26, "#191919", { weight: 600 });
      y += 72;
    }
    button(52, 1060, W - 104, 84, "View profile on LinkedIn", "#0a66c2", "#fff", () => opts.open(profile.linkedin));
    homeIndicator(false);
  }

  function drawMail() {
    ctx.fillStyle = "#f6f8fc";
    ctx.fillRect(0, 0, W, H);
    statusBar(false);
    hit(20, 92, 170, 70, "Back", () => go("home"));
    text("‹ Home", 34, 140, 28, "#c5221f", { weight: 600 });
    text("Mail", W / 2, 140, 28, "#111", { weight: 700, align: "center" });

    // contact card
    rr(32, 180, W - 64, 230, 28);
    ctx.fillStyle = "#fff";
    ctx.fill();
    avatar(profile.avatar, 112, 262, 54);
    text("Morish Macayan", 190, 250, 32, "#1f1f1f", { weight: 700 });
    text("Developer · ML · Web", 190, 288, 23, "#5f6368");
    rr(56, 334, 268, 46, 23);
    ctx.fillStyle = "#e6f4ea";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(82, 357, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#1e8e3e";
    ctx.fill();
    text("Replies within 24h", 100, 365, 22, "#137333", { weight: 600 });

    // compose
    let y = 456;
    text("New message", 40, y, 26, "#1f1f1f", { weight: 700 });
    y += 26;
    rr(32, y, W - 64, 610, 24);
    ctx.fillStyle = "#fff";
    ctx.fill();
    text("To", 60, y + 56, 24, "#5f6368");
    rr(110, y + 24, 400, 46, 23);
    ctx.fillStyle = "#e8f0fe";
    ctx.fill();
    text(profile.email.length > 26 ? `${profile.email.slice(0, 25)}…` : profile.email, 130, y + 55, 21, "#1a73e8", { weight: 600 });
    ctx.fillStyle = "#eceff1";
    ctx.fillRect(56, y + 92, W - 112, 2);
    text("Subject", 60, y + 140, 24, "#5f6368");
    let cy = y + 166;
    SUBJECTS.forEach((s, i) => {
      const on = i === subject;
      const w = ctx.measureText(s.label).width + 60;
      ctx.font = `600 22px ${SANS}`;
      const cw = ctx.measureText(s.label).width + 52;
      rr(56, cy, cw, 52, 26);
      ctx.fillStyle = on ? "#c2e7ff" : "#f1f3f4";
      ctx.fill();
      text(`${on ? "✓ " : ""}${s.label}`, 82, cy + 34, 22, on ? "#001d35" : "#3c4043", { weight: 600 });
      hit(56, cy, Math.max(cw, w), 52, s.label, () => {
        subject = i;
        dirty = true;
      });
      cy += 64;
    });
    ctx.fillStyle = "#eceff1";
    ctx.fillRect(56, cy + 6, W - 112, 2);
    para(SUBJECTS[subject]!.body.trim(), 60, cy + 54, W - 130, 23, "#3c4043", 32, 4);

    button(40, H - 300, W - 80, 84, "Write in Gmail", "#c5221f", "#fff", () => opts.open(mailUrl()));
    button(40, H - 200, (W - 96) / 2, 72, "Copy address", "#e8eaed", "#1f1f1f", async () => {
      try {
        await navigator.clipboard.writeText(profile.email);
        flash("Email copied");
      } catch {
        flash(profile.email);
      }
    });
    button(56 + (W - 96) / 2, H - 200, (W - 96) / 2, 72, "Mail app", "#e8eaed", "#1f1f1f", () =>
      opts.open(`mailto:${profile.email}?subject=${encodeURIComponent(SUBJECTS[subject]!.label)}`),
    );
    homeIndicator(false);
  }

  // ── Icons ──────────────────────────────────────────────────────────────────────────────
  function tile(x: number, y: number, s: number, fill: string | CanvasGradient) {
    rr(x, y, s, s, s * 0.24);
    ctx.fillStyle = fill;
    ctx.fill();
  }
  function iconGitHub(x: number, y: number, s: number) {
    tile(x, y, s, "#0d1117");
    ctx.save();
    ctx.translate(x + s * 0.2, y + s * 0.2);
    ctx.scale((s * 0.6) / 24, (s * 0.6) / 24);
    ctx.fillStyle = "#fff";
    ctx.fill(GITHUB_MARK);
    ctx.restore();
  }
  function iconLinkedIn(x: number, y: number, s: number) {
    tile(x, y, s, "#0a66c2");
    text("in", x + s / 2, y + s * 0.72, s * 0.62, "#fff", { weight: 800, align: "center" });
  }
  function iconMail(x: number, y: number, s: number) {
    tile(x, y, s, "#fff");
    const l = x + s * 0.18;
    const r = x + s * 0.82;
    const t = y + s * 0.28;
    const b = y + s * 0.72;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = s * 0.1;
    ctx.strokeStyle = "#4285f4";
    ctx.beginPath();
    ctx.moveTo(l, b);
    ctx.lineTo(l, t + s * 0.04);
    ctx.stroke();
    ctx.strokeStyle = "#34a853";
    ctx.beginPath();
    ctx.moveTo(r, b);
    ctx.lineTo(r, t + s * 0.04);
    ctx.stroke();
    ctx.strokeStyle = "#ea4335";
    ctx.beginPath();
    ctx.moveTo(l, t + s * 0.04);
    ctx.lineTo(x + s / 2, y + s * 0.5);
    ctx.lineTo(r, t + s * 0.04);
    ctx.stroke();
  }
  function iconResume(x: number, y: number, s: number) {
    tile(x, y, s, LIME);
    rr(x + s * 0.28, y + s * 0.18, s * 0.44, s * 0.62, 6);
    ctx.fillStyle = FOREST;
    ctx.fill();
    ctx.fillStyle = LIME;
    for (let i = 0; i < 4; i++) ctx.fillRect(x + s * 0.35, y + s * (0.3 + i * 0.11), s * (i === 3 ? 0.18 : 0.3), s * 0.045);
  }

  const painters: Record<Screen, () => void> = { home: drawHome, github: drawGitHub, linkedin: drawLinkedIn, mail: drawMail };

  // ── Frame ──────────────────────────────────────────────────────────────────────────────
  let lastMinute = -1;
  return {
    canvas,
    /** Advance animations; returns true when the texture needs re-uploading. */
    update(dt: number) {
      const minute = new Date().getMinutes();
      if (minute !== lastMinute) {
        lastMinute = minute;
        dirty = true;
      }
      if (t < 1) {
        t = Math.min(1, t + dt / 0.38);
        dirty = true;
      }
      if (toast && performance.now() > toast.until) {
        toast = null;
        dirty = true;
      }
      if (!dirty) return false;
      dirty = false;
      hits = [];
      const ease = 1 - Math.pow(1 - t, 3);
      const opening = screen !== "home";
      if (t < 1 && from) {
        // Apps grow out of the home screen and shrink back into it.
        const under = opening ? from : screen;
        const over = opening ? screen : from;
        const k = opening ? ease : 1 - ease;
        painters[under]();
        hits = [];
        ctx.save();
        ctx.globalAlpha = Math.min(1, k * 1.4);
        const sc = 0.82 + 0.18 * k;
        ctx.translate(W / 2, H * 0.45);
        ctx.scale(sc, sc);
        ctx.translate(-W / 2, -H * 0.45);
        rr(0, 0, W, H, 60 * (1 - k));
        ctx.clip();
        painters[over]();
        ctx.restore();
        hits = []; // no taps mid-animation
      } else {
        painters[screen]();
      }
      if (toast) {
        ctx.font = `600 24px ${SANS}`;
        const tw = ctx.measureText(toast.text).width + 60;
        rr(W / 2 - tw / 2, H - 400, tw, 64, 32);
        ctx.fillStyle = "rgba(32,33,36,.92)";
        ctx.fill();
        text(toast.text, W / 2, H - 358, 24, "#fff", { weight: 600, align: "center" });
      }
      return true;
    },
    /** Which control is under a canvas point (for the hand cursor), or null. */
    hitAt(x: number, y: number) {
      for (let i = hits.length - 1; i >= 0; i--) {
        const h = hits[i]!;
        if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) return h;
      }
      return null;
    },
    press(x: number, y: number) {
      pressed = this.hitAt(x, y)?.label ?? null;
      dirty = true;
    },
    release(x: number, y: number) {
      const h = this.hitAt(x, y);
      const was = pressed;
      pressed = null;
      dirty = true;
      if (h && h.label === was) h.run();
    },
    cancel() {
      pressed = null;
      dirty = true;
    },
    get screen() {
      return screen;
    },
    go,
  };
}

export type PhoneUI = ReturnType<typeof createPhoneUI>;
