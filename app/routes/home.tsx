import { Link, type MetaArgs } from 'react-router';
import { headFor } from '../head';
import { asset } from '../lib/asset';
import { cx } from '../lib/cx';
import { useLocaleApi } from '../lib/locale';
import s from './home.module.css';

/**
 * Support home. Store badges are the official Apple artwork (black lockup
 * on light themes, white lockup on dark) and the live App Store ID. The
 * hero uses a current Mac capture of Demo Data, which is a product
 * environment, not a demo watermark.
 *
 * The light/dark badge swap stays in CSS. Angular did it with
 * `:host-context([data-theme="dark"])`; here the module selects the
 * document attribute directly, so the right lockup is in the prerendered HTML
 * for both themes and no JavaScript has to run to choose one.
 */
export const meta = ({ location }: MetaArgs) => headFor(location.pathname);

export default function Home() {
  const locale = useLocaleApi();
  const { copy } = locale;
  const home = copy.home;

  return (
    <app-home>
      <section className={s.hero}>
        <div className="container">
          <img className={s.hero__icon} src={asset('icon-384.png')} width={96} height={96} alt="" />
          <p className={s.hero__eyebrow}>{home.hero.eyebrow}</p>
          <h1>{home.hero.headline}</h1>
          <p className={s.hero__lead}>{home.hero.lead}</p>
          <p className={s.hero__lead}>{home.hero.graph}</p>
          <p className={s.hero__note}>{home.hero.note}</p>
        </div>
        <figure className={s.hero__figure}>
          <div className={s.hero__frame}>
            <img
              className={s.hero__shot}
              src={asset(home.screenshot.src)}
              alt={home.screenshot.alt}
              width={2880}
              height={1232}
              fetchPriority="high"
            />
          </div>
          <figcaption className={s.hero__caption}>
            {home.screenshot.caption.map(para => (
              <p key={para}>{para}</p>
            ))}
          </figcaption>
        </figure>
      </section>

      <section className={cx('container', s.section)}>
        <h2>{home.store.heading}</h2>
        <p className={s.section__lead}>
          {home.store.leadBefore}
          <Link to={locale.path('getting-started')}>{home.store.leadLink}</Link>
          {home.store.leadAfter}
        </p>
        <ul className={s.badges}>
          {home.store.badges.map(badge => {
            // Only the two App Store lockups have a white variant; the Apple
            // Health badge is one artwork for every theme and keeps the plain
            // mark class, so no swap rule applies to it.
            const dark = 'srcDark' in badge ? badge.srcDark : undefined;
            return (
              <li key={badge.id}>
                <a className={s['store-badge']} href={badge.href} rel="noopener noreferrer">
                  <img
                    className={cx(
                      s['store-badge__mark'],
                      dark && s['store-badge__mark--on-light'],
                    )}
                    src={asset(badge.src)}
                    alt={badge.alt}
                    height={40}
                  />
                  {dark && (
                    <img
                      className={cx(s['store-badge__mark'], s['store-badge__mark--on-dark'])}
                      src={asset(dark)}
                      alt=""
                      height={40}
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={cx('container', s.section)}>
        <h2>{home.features.heading}</h2>
        <ul className={s.features}>
          {home.features.items.map(item => (
            <li className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p className={s.card__body}>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={cx('container', s.section)}>
        <h2>{home.help.heading}</h2>
        <ul className={s.help}>
          {home.help.items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={s.section__lead}>
          {/* The explicit {' '} is load-bearing. In the Angular template the
              interpolation and the <a> were on separate lines, and HTML
              collapses that newline to one space; JSX drops it entirely, which
              renders "on theGitHub Discussions page". */}
          {home.help.discussionsBefore}{' '}
          <a href={home.help.discussionsHref} rel="noopener noreferrer">
            {home.help.discussionsLabel}
          </a>
          {home.help.discussionsAfter}
        </p>
      </section>
    </app-home>
  );
}
