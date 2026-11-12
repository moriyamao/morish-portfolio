import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const INTRO_KEY = "mm-intro-seen";
let lenis: Lenis | undefined;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function animateRows(list: HTMLElement) {
  if (reducedMotion()) return;
  gsap.fromTo(list.children, {y: 24, opacity: 0}, {y: 0, opacity: 1, duration: .55, ease: "power3.out", stagger: .025, overwrite: true});
}

export function initMotion(root: HTMLElement) {
  const html = document.documentElement;
  const cleanups: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
    window.addEventListener(type, fn, opts);
    cleanups.push(() => window.removeEventListener(type, fn));
  };

  // Nav state and progress bar run regardless of motion preference.
  const nav = root.querySelector<HTMLElement>(".v-nav")!;
  const bar = root.querySelector<HTMLElement>(".v-progress i")!;
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("is-scrolled", y > 40);
    nav.classList.toggle("is-hidden", y > 400 && y > lastY && !html.classList.contains("menu-open"));
    lastY = y;
  };
  on("scroll", onScroll, {passive: true});
  onScroll();

  const finishIntro = () => {
    html.classList.remove("intro");
    html.classList.add("hero-ready");
    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* storage unavailable */ }
  };

  if (reducedMotion()) {
    finishIntro();
    return () => cleanups.forEach(fn => fn());
  }

  gsap.registerPlugin(ScrollTrigger);
  lenis = new Lenis({lerp: .1, wheelMultiplier: 1});
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const onAnchor = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.hash.length < 2) return;
    const target = document.querySelector<HTMLElement>(a.hash);
    if (!target) return;
    e.preventDefault();
    lenis?.scrollTo(target, {duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4)});
    history.replaceState(null, "", a.hash);
  };
  document.addEventListener("click", onAnchor);
  cleanups.push(() => document.removeEventListener("click", onAnchor));

  const menuObserver = new MutationObserver(() => html.classList.contains("menu-open") ? lenis?.stop() : lenis?.start());
  menuObserver.observe(html, {attributes: true, attributeFilter: ["class"]});
  cleanups.push(() => menuObserver.disconnect());

  const fine = window.matchMedia("(pointer: fine)").matches;
  let mm: gsap.MatchMedia | undefined;
  const ctx = gsap.context(() => {
    // ---------- Intro + hero entrance ----------
    const hero = root.querySelector<HTMLElement>(".v-hero")!;
    const heroWords = hero.querySelectorAll(".v-w > span");
    const heroBits = hero.querySelectorAll("[data-hero]");
    const cards = gsap.utils.toArray<HTMLElement>(".v-stack__card");
    gsap.set(heroWords, {yPercent: 115, rotate: 4});
    gsap.set(heroBits, {y: 24, opacity: 0});
    gsap.set(cards, {y: () => window.innerHeight * .7, rotate: (i: number) => 18 - i * 6, opacity: 0});
    html.classList.add("hero-ready");

    const entrance = gsap.timeline({paused: true, defaults: {ease: "expo.out"}})
      .to(heroWords, {yPercent: 0, rotate: 0, duration: 1.3, stagger: .07})
      .to(cards, {y: 0, rotate: 0, opacity: 1, duration: 1.5, stagger: .1}, "<.15")
      .to(heroBits, {y: 0, opacity: 1, duration: 1, stagger: .08}, "<.25");

    const loader = root.querySelector<HTMLElement>(".v-loader")!;
    if (html.classList.contains("intro")) {
      const counter = loader.querySelector("span")!;
      const state = {v: 0};
      lenis.stop();
      gsap.timeline({onComplete: () => { finishIntro(); lenis?.start(); }})
        .from(loader.querySelector(".v-loader__mark"), {scale: .4, rotate: -90, opacity: 0, duration: .8, ease: "back.out(1.6)"})
        .to(state, {v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => { counter.textContent = String(Math.round(state.v)).padStart(3, "0"); }}, "<")
        .to(loader.querySelectorAll(".v-loader__count, .v-loader__line, .v-loader__mark"), {y: -30, opacity: 0, duration: .45, stagger: .05, ease: "power2.in"})
        .to(loader, {clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut"}, "-=.1")
        .add(() => { entrance.play(); }, "-=.55");
    } else {
      finishIntro();
      entrance.play(.1);
    }

    // ---------- Hero scroll + pointer parallax ----------
    const stack = root.querySelector<HTMLElement>(".v-stack")!;
    gsap.timeline({scrollTrigger: {trigger: hero, start: "top top", end: "bottom top", scrub: .8}})
      .to(hero.querySelector(".v-hero__copy"), {yPercent: -18, opacity: .15, ease: "none"}, 0)
      .to(".v-stack__slot", {x: (i: number) => (i - 1.5) * 90, y: (i: number) => -60 - i * 30, rotate: (i: number) => (i - 1.5) * 7, ease: "none"}, 0)
      .to(stack, {scale: 1.12, ease: "none"}, 0);

    if (fine) {
      const rx = gsap.quickTo(stack, "rotationX", {duration: .9, ease: "power3"});
      const ry = gsap.quickTo(stack, "rotationY", {duration: .9, ease: "power3"});
      const onMove = (e: PointerEvent) => {
        if (window.scrollY > window.innerHeight) return;
        ry((e.clientX / window.innerWidth - .5) * 16);
        rx((e.clientY / window.innerHeight - .5) * -12);
      };
      on("pointermove", onMove);
      cards.forEach(card => {
        card.addEventListener("pointerenter", () => gsap.to(card, {z: 80, duration: .5, ease: "power3.out"}));
        card.addEventListener("pointerleave", () => gsap.to(card, {z: 0, duration: .6, ease: "power3.out"}));
      });
    }

    // ---------- Marquee, reacting to scroll velocity ----------
    const track = root.querySelector<HTMLElement>(".v-marquee__track")!;
    const loop = gsap.to(track, {xPercent: -50, duration: 28, ease: "none", repeat: -1});
    ScrollTrigger.create({trigger: track, start: "top bottom", end: "bottom top", onUpdate: self => {
      const v = self.getVelocity() / 300;
      const dir = self.direction;
      gsap.to(loop, {timeScale: dir * Math.max(1, Math.min(6, Math.abs(v))), duration: .2, overwrite: true});
      gsap.to(loop, {timeScale: dir, duration: 1.2, delay: .2, overwrite: false});
    }});

    // ---------- Section headings: word rise ----------
    gsap.utils.toArray<HTMLElement>("[data-split]").forEach(h => {
      gsap.from(h.querySelectorAll(".v-w > span"), {yPercent: 115, rotate: 3, duration: 1.1, ease: "expo.out", stagger: .06,
        scrollTrigger: {trigger: h, start: "top 85%"}});
    });

    // ---------- Generic reveals ----------
    gsap.set("[data-reveal]", {opacity: 0});
    ScrollTrigger.batch("[data-reveal]", {start: "top 90%", once: true,
      onEnter: batch => gsap.fromTo(batch, {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: .08, overwrite: true})});

    // ---------- Featured: pinned horizontal scroll ----------
    mm = gsap.matchMedia();
    const featured = root.querySelector<HTMLElement>(".v-featured")!;
    const ftrack = featured.querySelector<HTMLElement>(".v-featured__track")!;
    mm.add("(min-width: 960px)", () => {
      const distance = () => ftrack.scrollWidth - window.innerWidth;
      const slide = gsap.to(ftrack, {x: () => -distance(), ease: "none",
        scrollTrigger: {trigger: featured, start: "top top", end: () => "+=" + distance(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1}});
      gsap.utils.toArray<HTMLElement>(".v-panel__media", featured).forEach(media => {
        gsap.fromTo(media, {clipPath: "inset(12% 8% 12% 8% round 18px)"}, {clipPath: "inset(0% 0% 0% 0% round 18px)", ease: "none",
          scrollTrigger: {trigger: media, containerAnimation: slide, start: "left 95%", end: "left 55%", scrub: true}});
      });
      gsap.utils.toArray<HTMLElement>(".v-panel__num", featured).forEach(num => {
        gsap.from(num, {yPercent: 100, opacity: 0, ease: "power2.out",
          scrollTrigger: {trigger: num, containerAnimation: slide, start: "left 90%", end: "left 60%", scrub: true}});
      });
    });
    mm.add("(max-width: 959px)", () => {
      gsap.utils.toArray<HTMLElement>(".v-panel__media", featured).forEach(media => curtain(media));
    });

    // ---------- Image curtains elsewhere ----------
    gsap.utils.toArray<HTMLElement>(".v-client__media").forEach(media => curtain(media));

    function curtain(media: HTMLElement) {
      const img = media.querySelector("img");
      const tl = gsap.timeline({scrollTrigger: {trigger: media, start: "top 88%"}});
      tl.fromTo(media, {clipPath: "inset(100% 0% 0% 0% round 14px)"}, {clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 1.3, ease: "expo.inOut"});
      if (img) tl.fromTo(img, {scale: 1.35}, {scale: 1, duration: 1.6, ease: "expo.out"}, "<.1");
    }

    // ---------- Playground ----------
    gsap.fromTo(".v-play__bg", {yPercent: -12, scale: 1.15}, {yPercent: 12, scale: 1, ease: "none",
      scrollTrigger: {trigger: ".v-play", start: "top bottom", end: "bottom top", scrub: true}});
    gsap.from(".v-card", {x: 160, opacity: 0, rotate: 4, duration: 1.2, ease: "expo.out", stagger: .09,
      scrollTrigger: {trigger: ".v-play__track", start: "top 80%"}});

    // ---------- About: words light up as you read ----------
    const scrubWords = root.querySelectorAll(".v-scrub .v-w > span");
    gsap.fromTo(scrubWords, {opacity: .14}, {opacity: 1, ease: "none", stagger: .1,
      scrollTrigger: {trigger: ".v-scrub", start: "top 80%", end: "bottom 45%", scrub: true}});

    // ---------- Contact backdrop + giant footer word ----------
    gsap.fromTo(".v-end__bg", {yPercent: -15}, {yPercent: 10, ease: "none",
      scrollTrigger: {trigger: ".v-end", start: "top bottom", end: "bottom top", scrub: true}});
    gsap.from(".v-footer__word", {yPercent: 60, opacity: 0, ease: "none",
      scrollTrigger: {trigger: ".v-footer", start: "top bottom", end: "bottom bottom", scrub: true}});

    // ---------- Section color shift for the nav ----------
    gsap.utils.toArray<HTMLElement>(".v-play, .v-end").forEach(section => {
      ScrollTrigger.create({trigger: section, start: "top 40px", end: "bottom 40px", toggleClass: {targets: nav, className: "is-dark"}});
    });
  }, root);
  cleanups.push(() => { mm?.revert(); ctx.revert(); });

  // ---------- Pointer-only extras: cursor, magnetic, previews, drag ----------
  if (fine) {
    html.classList.add("has-cursor");
    const cursor = root.querySelector<HTMLElement>(".v-cursor")!;
    const label = cursor.querySelector<HTMLElement>(".v-cursor__ring span")!;
    const dotX = gsap.quickTo(".v-cursor__dot", "x", {duration: .12, ease: "power3"});
    const dotY = gsap.quickTo(".v-cursor__dot", "y", {duration: .12, ease: "power3"});
    const ringX = gsap.quickTo(".v-cursor__ring", "x", {duration: .5, ease: "power3"});
    const ringY = gsap.quickTo(".v-cursor__ring", "y", {duration: .5, ease: "power3"});
    const preview = root.querySelector<HTMLElement>(".v-preview")!;
    const previewImg = preview.querySelector("img")!;
    const pvX = gsap.quickTo(preview, "x", {duration: .6, ease: "power3"});
    const pvY = gsap.quickTo(preview, "y", {duration: .6, ease: "power3"});
    let lastPX = 0;
    const onMove = (e: PointerEvent) => {
      dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY);
      pvX(e.clientX); pvY(e.clientY);
      gsap.to(preview, {rotate: Math.max(-12, Math.min(12, (e.clientX - lastPX) * .6)), duration: .5, overwrite: "auto"});
      lastPX = e.clientX;
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      const interactive = target.closest("a, button, summary, input, select, textarea, label");
      cursor.dataset.state = labelled ? "label" : interactive ? "hover" : "";
      label.textContent = labelled?.dataset.cursor || "";
      const row = target.closest<HTMLElement>("[data-preview]");
      const src = row?.dataset.preview;
      if (src) {
        if (!previewImg.src.endsWith(src)) previewImg.src = src;
        preview.dataset.on = "true";
      } else preview.dataset.on = "false";
    };
    on("pointermove", onMove);
    on("scroll", () => { preview.dataset.on = "false"; }, {passive: true});
    const onLeave = () => { cursor.dataset.state = "gone"; preview.dataset.on = "false"; };
    document.addEventListener("pointerleave", onLeave);
    cleanups.push(() => { document.removeEventListener("pointerleave", onLeave); html.classList.remove("has-cursor"); });

    root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(el => {
      const mx = gsap.quickTo(el, "x", {duration: .6, ease: "elastic.out(1, .4)"});
      const my = gsap.quickTo(el, "y", {duration: .6, ease: "elastic.out(1, .4)"});
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * .3);
        my((e.clientY - r.top - r.height / 2) * .4);
      };
      const leave = () => { mx(0); my(0); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
    });

    const strip = root.querySelector<HTMLElement>(".v-play__track");
    if (strip) {
      let down = false, startX = 0, startScroll = 0, moved = 0;
      const press = (e: PointerEvent) => { down = true; moved = 0; startX = e.clientX; startScroll = strip.scrollLeft; strip.classList.add("is-dragging"); };
      const drag = (e: PointerEvent) => { if (!down) return; moved = Math.abs(e.clientX - startX); strip.scrollLeft = startScroll - (e.clientX - startX) * 1.4; };
      const release = () => { down = false; strip.classList.remove("is-dragging"); };
      const click = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
      strip.addEventListener("pointerdown", press);
      on("pointermove", drag);
      on("pointerup", release);
      strip.addEventListener("click", click, true);
      cleanups.push(() => { strip.removeEventListener("pointerdown", press); strip.removeEventListener("click", click, true); });
    }
  }

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, {once: true});
  document.fonts?.ready.then(refresh);

  return () => {
    cleanups.forEach(fn => fn());
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = undefined;
  };
}
