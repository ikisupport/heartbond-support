import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  type LinksFunction,
} from 'react-router';
import { useEffect } from 'react';
import { THEME_PREPAINT_JS, THEME_TOKENS_CSS } from './generated/theme-prelude';
import { resolveRoute } from './lib/route-resolve';
import { ThemeProvider } from './lib/theme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import '@site/styles.css';
import shell from './root.module.css';

// The favicon set the Angular index.html shipped, root-absolute because no
// <base href="/"> ships here. `icon-384.png` doubles as the apple-touch-icon
// and as og:image (see app/head.ts).
export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
  { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' },
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', href: '/icon-384.png' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { locale } = resolveRoute(pathname);

  return (
    // suppressHydrationWarning: the pre-paint script below sets `data-theme` on
    // this element before React ever runs, so the server HTML and the live DOM
    // differ by that attribute by design. Without it React logs a hydration
    // mismatch on every page, which would drown any real mismatch.
    <html lang={locale.htmlLang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#c989c9" id="meta-theme-color" />
        {/* Theme tokens are inlined (not in styles.css) so they apply on the very
            first paint, before the deferred stylesheet loads. This is what prevents
            the light-background flash on dark systems. Authored in
            src/theme-tokens.css and src/theme-prepaint.js; see
            scripts/extract-theme-prelude.mjs. */}
        <style id="theme-tokens" dangerouslySetInnerHTML={{ __html: THEME_TOKENS_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_PREPAINT_JS }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Application shell: sticky navbar, routed page content, shared footer.
 *
 * Angular put SEO init in the shell constructor; here the head is a pure
 * `meta` export per route (app/head.ts), because a service reacting to
 * navigation has nothing to react to during prerender.
 */
export default function App() {
  useHashScroll();

  return (
    <ThemeProvider>
      <app-root className={shell.shell}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </app-root>
    </ThemeProvider>
  );
}

/**
 * Scroll to `#id` after a navigation that carries a hash.
 *
 * Replaces Angular's default anchor scrolling. `<ScrollRestoration>` covers
 * position restoration but not anchor scrolling.
 */
function useHashScroll() {
  const { hash, key } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
      el.scrollIntoView();
    }
  }, [hash, key]);
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <h1>Something went wrong</h1>
      <p>{message}</p>
      <p>
        <a href="/">Back to the support page</a>
      </p>
    </div>
  );
}
