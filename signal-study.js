/* Original canvas study: a field of points assembles into a letter, not an ML visualization. */
window.createSignalStudy = function createSignalStudy(canvas) {
  'use strict';
  const context = canvas.getContext('2d');
  if (!context) return null;
  const figure = canvas.closest('figure');
  figure.classList.add('canvas-ready');
  let width = 1, height = 1, frame = 0, paused = true, visible = true;
  let elapsed = 0, lastTime = 0;
  const pointer = { x: -1000, y: -1000 };
  const vertices = [[.15, .8], [.15, .2], [.5, .65], [.85, .2], [.85, .8]];
  const points = [];
  for (let segment = 0; segment < vertices.length - 1; segment++) {
    for (let sample = 0; sample < 24; sample++) {
      const t = sample / 23;
      points.push({
        x: vertices[segment][0] * (1 - t) + vertices[segment + 1][0] * t,
        y: vertices[segment][1] * (1 - t) + vertices[segment + 1][1] * t,
        seed: segment * 24 + sample
      });
    }
  }
  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#30372a';
    for (let x = 12; x < width; x += 20) {
      for (let y = 12; y < height; y += 20) context.fillRect(x, y, 1, 1);
    }
    const letterWidth = Math.min(width * .8, height * 1.55);
    const left = (width - letterWidth) / 2;
    const scatter = paused ? 0 : Math.pow((Math.sin(elapsed * .00045) + 1) / 2, 5) * .33;
    points.forEach(point => {
      let x = left + point.x * letterWidth;
      let y = point.y * height;
      const seed = point.seed;
      x += Math.sin(seed * 17.3 + elapsed * .0003) * letterWidth * scatter;
      y += Math.cos(seed * 11.1 + elapsed * .0002) * height * scatter;
      if (!paused) {
        const dx = x - pointer.x, dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 65 && distance > 0) {
          const push = (1 - distance / 65) * 27;
          x += dx / distance * push;
          y += dy / distance * push;
        }
      }
      context.fillStyle = seed % 8 === 0 ? '#f2f2e8' : '#d3f99b';
      context.beginPath();
      context.arc(x, y, seed % 8 === 0 ? 2 : 1.45, 0, Math.PI * 2);
      context.fill();
    });
    context.fillStyle = '#d3f99b';
    context.fillRect(left + letterWidth * .99, height * .78, 6, 6);
    context.strokeStyle = '#4c5840';
    context.lineWidth = 1;
    for (const [x, y] of [[1, 1], [width - 1, height - 1]]) {
      const direction = x === 1 ? 1 : -1;
      context.beginPath();
      context.moveTo(x, y + 10 * direction);
      context.lineTo(x, y);
      context.lineTo(x + 10 * direction, y);
      context.stroke();
    }
  };
  const tick = time => {
    frame = 0;
    if (paused || !visible || document.hidden) return;
    if (lastTime) elapsed += Math.min(time - lastTime, 40);
    lastTime = time;
    draw();
    frame = window.requestAnimationFrame(tick);
  };
  const sync = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    draw();
    if (!paused && visible && !document.hidden) frame = window.requestAnimationFrame(tick);
  };
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    sync();
  };
  canvas.addEventListener('pointermove', event => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
  });
  canvas.addEventListener('pointerleave', () => { pointer.x = pointer.y = -1000; });
  if ('ResizeObserver' in window) new window.ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  if ('IntersectionObserver' in window) {
    new window.IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }).observe(canvas);
  }
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  });
  resize();
  return { setPaused(value) { paused = value; sync(); } };
};
