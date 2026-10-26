import { Fragment } from 'react';
import type { MetaArgs } from 'react-router';
import { headFor } from '../head';
import { asset } from '../lib/asset';
import { useLocaleApi } from '../lib/locale';
import s from './getting-started.module.css';

/**
 * Getting started. Steps match the current app: Health consent, download
 * windows, iCloud, and Keep all samples. Walkthrough screenshots stay dashed
 * until a current capture exists; Health Access has one now.
 *
 * Two of the four sections carry `figure: null` and every `placeholder` is the
 * empty string, so those blocks render nothing — the same as in Angular, where
 * `@if` on a null figure and on an empty string both fall through. They are
 * kept so a figure or a placeholder added to copy.json needs no code change.
 */
export const meta = ({ location }: MetaArgs) => headFor(location.pathname);

export default function GettingStarted() {
  const { copy } = useLocaleApi();

  return (
    <app-getting-started>
      <article className="container prose">
        <h1>{copy.gettingStarted.heading}</h1>
        <p className={s.prose__meta}>{copy.gettingStarted.meta}</p>
        <p>{copy.gettingStarted.intro}</p>
        {copy.gettingStarted.sections.map(sec => (
          <Fragment key={sec.heading}>
            <h2>{sec.heading}</h2>
            {sec.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {sec.figure && (
              <figure className={s.prose__figure}>
                <img
                  className={s.prose__shot}
                  src={asset(sec.figure.src)}
                  alt={sec.figure.alt}
                  width={1206}
                  height={2622}
                />
                <figcaption className={s.prose__caption}>
                  {sec.figure.caption.map(para => (
                    <p key={para}>{para}</p>
                  ))}
                </figcaption>
              </figure>
            )}
            {/* .placeholder and .placeholder__note are global classes owned by
                styles.css; this page's module only adds spacing to the first,
                through a :global() rule. So both stay plain strings. */}
            {sec.placeholder && (
              <div className="placeholder">
                <p className="placeholder__note">{sec.placeholder}</p>
              </div>
            )}
          </Fragment>
        ))}
      </article>
    </app-getting-started>
  );
}
