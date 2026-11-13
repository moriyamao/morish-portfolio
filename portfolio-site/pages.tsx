import { PageContext } from './router';
import { Route as Home } from './src/routes/index';
import { Route as Case } from './src/routes/case.$slug';
import { Route as Showcase } from './src/routes/showcase';
export { cases, credentials } from './src/site/content';
export { allProjects, showcase } from './src/site/project-map';

export function Page({ page, slug = '' }: { page: string; slug?: string }) {
  const Component = page === 'case' ? Case.component : page === 'showcase' ? Showcase.component : Home.component;
  return <PageContext.Provider value={{slug}}><Component/></PageContext.Provider>;
}
