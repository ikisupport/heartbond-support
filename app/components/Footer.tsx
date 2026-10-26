import { Link } from 'react-router';
import s from './Footer.module.css';
import { useLocaleApi } from '../lib/locale';

/**
 * Shared footer: the same four page links as the navbar, a link out to IKI
 * Systems, and the copyright line.
 *
 * `copyrightHtml` is a template in copy.json carrying an `<a>`, so it is set
 * as HTML rather than text — the one place on the site that is. The two
 * placeholders are filled here exactly as the Angular shell filled them.
 */
export function Footer() {
  const locale = useLocaleApi();
  const { copy } = locale;

  const copyright = copy.app.footer.copyrightHtml
    .replace('{{year}}', String(new Date().getFullYear()))
    .replace('{{ikiSystemsHome}}', copy.links.ikiSystemsHome);

  return (
    <footer className={s.footer}>
      <div className={`container ${s.footer__inner}`}>
        <nav className={s.footer__links} aria-label="Footer">
          <Link to={locale.path('')}>{copy.app.footer.links.home}</Link>
          <Link to={locale.path('getting-started')}>{copy.app.footer.links.gettingStarted}</Link>
          <Link to={locale.path('privacy')}>{copy.app.footer.links.privacy}</Link>
          <Link to={locale.path('terms')}>{copy.app.footer.links.terms}</Link>
          <a href={copy.links.ikiSystemsHome} target="_blank" rel="noopener noreferrer">
            {copy.app.footer.links.ikiSystems}
          </a>
        </nav>
        <p className={s.footer__fine} dangerouslySetInnerHTML={{ __html: copyright }} />
      </div>
    </footer>
  );
}
