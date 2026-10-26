import { Link, type MetaArgs } from 'react-router';
import { headFor } from '../head';
import { cx } from '../lib/cx';
import { useLocaleApi } from '../lib/locale';
import s from './not-found.module.css';

/**
 * 404 page. Registered twice: at `/404`, which is prerendered so the publish
 * step can copy it to the `404.html` GitHub Pages serves for an unmatched URL,
 * and at the `*` splat for a client-side navigation that matches nothing.
 */
export const meta = ({ location }: MetaArgs) => headFor(location.pathname);

export default function NotFound() {
  const locale = useLocaleApi();
  const { copy } = locale;

  return (
    <app-not-found>
      <section className={cx('container', s.nf)}>
        <p className={s.nf__code}>{copy.notFound.code}</p>
        <h1>{copy.notFound.heading}</h1>
        <p className={s.nf__lead}>{copy.notFound.lead}</p>
        <Link className="button button--primary" to={locale.path('')}>
          {copy.notFound.cta}
        </Link>
      </section>
    </app-not-found>
  );
}
