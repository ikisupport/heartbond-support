import { Fragment } from 'react';
import type { MetaArgs } from 'react-router';
import { headFor } from '../head';
import { useLocaleApi } from '../lib/locale';
import s from './terms.module.css';

/**
 * Terms of service. Carries the medical disclaimer and states how the graph
 * bins samples, so the five-minute summary is never mistaken for raw data.
 *
 * This is a plain-language draft and is not a substitute for review by a
 * qualified legal professional before launch.
 *
 * The other `localized: false` route; see privacy.tsx.
 */
export const meta = ({ location }: MetaArgs) => headFor(location.pathname);

export default function Terms() {
  const { copy } = useLocaleApi();

  return (
    <app-terms>
      <article className="container prose">
        <h1>{copy.terms.heading}</h1>
        <p className={s.prose__meta}>{copy.terms.meta}</p>
        <p>{copy.terms.intro}</p>
        {copy.terms.sections.map(sec => (
          <Fragment key={sec.heading}>
            <h2>{sec.heading}</h2>
            {sec.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Fragment>
        ))}
      </article>
    </app-terms>
  );
}
