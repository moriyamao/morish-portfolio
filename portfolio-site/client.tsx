import { hydrateRoot } from 'react-dom/client';
import { Page } from './pages';
const root = document.getElementById('portfolio-root');
if (root && root.dataset.page !== 'showcase') hydrateRoot(root, <Page page={root.dataset.page || 'home'} slug={root.dataset.slug || ''}/>);

// The 3D contact phone is heavy (three.js + model), so fetch it only when the section is close.
const phone = document.querySelector<HTMLElement>('[data-phone]');
if (phone?.dataset.script && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    io.disconnect();
    const version = new URL((document.querySelector('script[src*="/app.js"]') as HTMLScriptElement)?.src || location.href).searchParams.get('v');
    const s = document.createElement('script');
    s.type = 'module';
    s.src = phone.dataset.script + (version ? `?v=${version}` : '');
    document.body.appendChild(s);
  }, {rootMargin: '600px 0px'});
  io.observe(phone);
}
