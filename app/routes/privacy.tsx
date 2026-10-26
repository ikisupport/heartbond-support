import { Fragment } from 'react';
import type { MetaArgs } from 'react-router';
import { headFor } from '../head';
import { useLocaleApi } from '../lib/locale';
import s from './privacy.module.css';

/**
 * Privacy policy. HeartBond's story is HealthKit plus the visitor's own iCloud
 * account, not "nothing leaves the device". Keep it stated that way.
 *
 * One of the two `localized: false` routes: registered for the default locale
 * only, so a prefixed locale would 404 here rather than serve an untranslated
 * legal page.
 */
export const meta = ({ location }: MetaArgs) => headFor(location.pathname);

export default function Privacy() {
  const { copy } = useLocaleApi();

  return (
    <app-privacy>
      <article className="container prose">
        <h1>{copy.privacy.heading}</h1>
        <p className={s.prose__meta}>{copy.privacy.meta}</p>
        <p>{copy.privacy.intro}</p>
        {copy.privacy.sections.map(sec => (
          <Fragment key={sec.heading}>
            <h2>{sec.heading}</h2>
            {sec.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Fragment>
        ))}
      </article>
    </app-privacy>
  );
}
