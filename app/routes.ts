import { type RouteConfig, index, route } from '@react-router/dev/routes';
import { routeEntries } from '../scripts/lib/route-matrix.mjs';

/**
 * Route table, generated per locale from src/app/content/locales.json.
 *
 * The same matrix feeds `react-router.config.ts`'s prerender list and the
 * sitemap, so the set of URLs that exist cannot drift between them. That is
 * the whole reason locales.json exists on a site that ships one locale: the
 * four routes are written down once.
 *
 * English stays unprefixed (`/getting-started/`) so existing inbound links and
 * the sitemap keep working. Pages flagged `localized: false` (Privacy, Terms)
 * are registered for the default locale only.
 *
 * One module serves every locale of a page, so each registration needs an
 * explicit unique id — React Router derives ids from the file path, which
 * would collide the moment the same file is mounted twice.
 */
const MODULES: Record<string, string> = {
  '': 'routes/home.tsx',
  'getting-started': 'routes/getting-started.tsx',
  privacy: 'routes/privacy.tsx',
  terms: 'routes/terms.tsx',
};

export default (async () => {
  const entries = await routeEntries();
  const routes: RouteConfig = [];

  for (const entry of entries) {
    const module = MODULES[entry.routePath];
    if (!module) {
      throw new Error(`no route module mapped for "${entry.routePath}" (from locales.json)`);
    }
    // entry.url is '/', '/getting-started/'; React Router wants the path
    // without the surrounding slashes.
    const path = entry.url.replace(/^\/|\/$/g, '');
    const id = `${entry.locale.code}/${entry.routePath || 'home'}`;

    routes.push(path === '' ? index(module, { id }) : route(path, module, { id }));
  }

  // Prerendered to /404/index.html, which the publish step also copies to
  // /404.html — the file GitHub Pages serves for an unmatched URL. The 404 is
  // registered here rather than in locales.json: it is not a page of the site
  // and must not reach the sitemap.
  routes.push(route('404', 'routes/not-found.tsx', { id: 'not-found' }));
  // Client-side fallback for a URL that matches nothing. This is the Angular
  // site's `path: '**'` wildcard.
  routes.push(route('*', 'routes/not-found.tsx', { id: 'not-found-splat' }));

  return routes;
})() satisfies Promise<RouteConfig>;
