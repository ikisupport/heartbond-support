import type { MetaDescriptor } from 'react-router';
import {
  DEFAULT_LOCALE,
  LOCALES,
  MULTILINGUAL,
  ORIGIN,
  copyFor,
  localeDef,
  localizedPath,
} from '../src/content/copy';
import { resolveRoute } from './lib/route-resolve';

/**
 * Route-aware SEO tags: canonical URL plus Open Graph and Twitter text cards.
 * Pure port of the Angular site's `SeoService`, as one function over the
 * pathname rather than a service reacting to NavigationEnd.
 *
 * It returns the COMPLETE set every time. React Router replaces a parent's
 * meta with the leaf's rather than merging them, so a partial return here
 * would silently drop whatever the root contributed.
 *
 * The tag set is deliberately the Angular site's, tag for tag: a `summary`
 * Twitter card and the app icon as `og:image`, with no `og:image:width` /
 * `:height` / `:alt` and no `twitter:image:alt`. The site has no 1200x630
 * social card, and a `summary_large_image` card pointing at a square icon
 * renders worse than the small card does. The parity gate compares every
 * `og:*` and `twitter:*` tag, so an addition here is a parity failure until
 * the Angular build is retired.
 */
const SITE_NAME = 'HeartBond';
const DEFAULT_DESCRIPTION =
  'Support for HeartBond, a heart rate graphing app for iPhone, iPad, and Mac. Reads Apple Health, draws days of heart rate in five-minute bins, and syncs your downloaded days through your own iCloud account.';
// The app icon. There is no separate social card image (public/icon-384.png).
const DEFAULT_IMAGE = `${ORIGIN}/icon-384.png`;

/** Absolute canonical URL, with a trailing slash to match prerendered dirs. */
function canonicalUrl(pathname: string): string {
  const path = pathname.split('#')[0].split('?')[0];
  if (path === '' || path === '/') {
    return `${ORIGIN}/`;
  }
  return `${ORIGIN}${path.replace(/\/+$/, '')}/`;
}

/**
 * Absolute alternates for the page, plus `x-default`. Empty when the page is
 * not localized or when this build ships a single locale — which is every
 * build today: a lone `en` + `x-default` pair says nothing and would only
 * churn the index. Kept so adding a locale to locales.json is the whole change.
 */
function alternates(page: string, localized: boolean): MetaDescriptor[] {
  if (!MULTILINGUAL || !localized) {
    return [];
  }
  const links = LOCALES.map(locale => ({
    tagName: 'link' as const,
    rel: 'alternate',
    hreflang: locale.htmlLang,
    href: `${ORIGIN}${localizedPath(page, locale)}`,
  }));
  links.push({
    tagName: 'link' as const,
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${ORIGIN}${localizedPath(page, localeDef(DEFAULT_LOCALE))}`,
  });
  return links;
}

/** The full head for `pathname`: title, description, canonical, og:*, twitter:*. */
export function headFor(pathname: string): MetaDescriptor[] {
  const { locale, page, localized, notFound, def } = resolveRoute(pathname);
  const copy = copyFor(locale.code);
  const seo = notFound
    ? (copy.seo.notFound as { title: string; description?: string })
    : (copy.seo[def!.seoKey] as { title: string; description?: string });

  const title = seo.title ?? SITE_NAME;
  // The 404 page carries a title only, and falls back to the site-wide
  // description, exactly as SeoService did for a route with no `data`.
  const description = seo.description ?? DEFAULT_DESCRIPTION;
  const canonical = canonicalUrl(pathname);

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonical },
    ...alternates(page, localized),

    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:locale', content: locale.ogLocale },
    { property: 'og:image', content: DEFAULT_IMAGE },

    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_IMAGE },
  ];
}
