import { renderToString } from 'react-dom/server';
import { Page } from './pages';
export { cases, credentials, allProjects, showcase } from './pages';
export function render(page: string, slug = '') { return renderToString(<Page page={page} slug={slug}/>); }
