import { createContext, useContext, type ComponentType, type ReactNode } from 'react';

// Static documents use normal links. This adapter retains the exported page components.
export const PageContext = createContext({ slug: '' });
const base = '/morish-portfolio';
export const createFileRoute = (_path: string) => (options: { component: ComponentType; head?: unknown }) => ({
  ...options,
  useParams: () => useContext(PageContext),
});
export function Link({ to, params, hash, children, ...props }: {
  to: string; params?: { slug: string }; hash?: string; children?: ReactNode; className?: string;
}) {
  let href = to.replace('$slug', params?.slug || '');
  if (!href.startsWith(base)) href = base + href;
  if (!href.endsWith('/')) href += '/';
  if (hash) href += '#' + hash;
  return <a {...props} href={href}>{children}</a>;
}
