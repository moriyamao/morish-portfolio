import { hydrateRoot } from 'react-dom/client';
import { Page } from './pages';
const root = document.getElementById('portfolio-root');
if (root) hydrateRoot(root, <Page page={root.dataset.page || 'home'} slug={root.dataset.slug || ''}/>);
