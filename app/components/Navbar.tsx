import { Link } from 'react-router';
import s from './Navbar.module.css';
import { asset } from '../lib/asset';
import { useLocaleApi } from '../lib/locale';
import { useTheme, type ThemeChoice } from '../lib/theme';

/**
 * Top navigation: HeartBond wordmark, primary links, and the appearance
 * selector. Shown on every page via the root shell. The wordmark uses the Mac
 * AppIcon (`app-icon.png`), not the marketing plate used in the hero.
 */
export function Navbar() {
  const locale = useLocaleApi();
  const { copy } = locale;
  const { themeChoice, setTheme } = useTheme();

  /**
   * Port of Angular's `routerLinkActive`, computed from the matched route
   * rather than taken from React Router's `NavLink`.
   *
   * NavLink is wrong here. These links are built by `locale.path()`, which
   * returns a TRAILING-SLASH URL ('/privacy/') to match the prerendered
   * directories, and against that NavLink marks a descendant active while
   * failing the exact case — leaving pages with no active link at all, where
   * Angular marks one. The navbar sits outside <main>, so the text parity gate
   * cannot see that regression.
   *
   * Home uses `routerLinkActiveOptions: { exact: true }` in the Angular
   * template, which is the `routePath === ''` arm below.
   */
  const isActive = (routePath: string): boolean =>
    routePath === ''
      ? locale.page === ''
      : locale.page === routePath || locale.page.startsWith(`${routePath}/`);

  // `s.active`, not the bare string 'active': a CSS Module hashes the class in
  // Navbar.module.css, so a literal would never match the rule.
  const linkProps = (routePath: string) =>
    isActive(routePath) ? { className: s.active, 'aria-current': 'page' as const } : {};

  return (
    <header className={s.nav}>
      <div className={`container ${s.nav__inner}`}>
        <Link className={s.wordmark} to={locale.path('')} aria-label="HeartBond support home">
          <img
            className={s.wordmark__icon}
            src={asset('app-icon.png')}
            width={32}
            height={32}
            alt=""
          />
          {copy.nav.wordmark}
        </Link>

        <nav className={s.nav__links} aria-label="Primary">
          <Link to={locale.path('')} {...linkProps('')}>
            {copy.nav.links.home}
          </Link>
          <Link to={locale.path('getting-started')} {...linkProps('getting-started')}>
            {copy.nav.links.gettingStarted}
          </Link>
          <Link to={locale.path('privacy')} {...linkProps('privacy')}>
            {copy.nav.links.privacy}
          </Link>
          <Link to={locale.path('terms')} {...linkProps('terms')}>
            {copy.nav.links.terms}
          </Link>
        </nav>

        <label className={s.theme}>
          <span className="visually-hidden">{copy.nav.theme.label}</span>
          <select
            value={themeChoice}
            onChange={e => setTheme(e.target.value as ThemeChoice)}
            aria-label={copy.nav.theme.label}
          >
            <option value="system">{copy.nav.theme.system}</option>
            <option value="calm">{copy.nav.theme.calm}</option>
            <option value="classic">{copy.nav.theme.classic}</option>
            <option value="dark">{copy.nav.theme.dark}</option>
          </select>
        </label>
      </div>
    </header>
  );
}
