import { Component } from '@angular/core';
import COPY from '../../content/copy.json';

/**
 * Getting started. Steps match the current app: Health consent, download
 * windows, iCloud, and Keep all samples. Walkthrough screenshots stay dashed
 * until a current capture exists; Health Access has one now.
 */
@Component({
  selector: 'app-getting-started',
  standalone: true,
  template: `
    <article class="container prose">
      <h1>{{ copy.heading }}</h1>
      <p class="prose__meta">{{ copy.meta }}</p>
      <p>{{ copy.intro }}</p>
      @for (sec of copy.sections; track sec.heading) {
        <h2>{{ sec.heading }}</h2>
        @for (para of sec.paragraphs; track $index) {
          <p>{{ para }}</p>
        }
        @if (sec.figure; as fig) {
          <figure class="prose__figure">
            <img class="prose__shot" [src]="fig.src" [alt]="fig.alt" width="1206" height="2622">
            <figcaption class="prose__caption">
              @for (para of fig.caption; track para) {
                <p>{{ para }}</p>
              }
            </figcaption>
          </figure>
        }
        @if (sec.placeholder) {
          <div class="placeholder">
            <p class="placeholder__note">{{ sec.placeholder }}</p>
          </div>
        }
      }
    </article>
  `,
  styles: [`
    .prose__meta {
      color: var(--text-secondary);
      font-size: 0.92rem;
      margin-bottom: 1.4rem;
    }

    .placeholder {
      margin: 1rem 0 0.5rem;
      padding: 1.5rem 1.25rem;
    }

    .prose__figure {
      width: min(100%, 300px);
      margin: 1.4rem auto 1rem;
    }

    .prose__shot {
      display: block;
      width: 100%;
      height: auto;
    }

    .prose__caption {
      margin-top: 0.8rem;
      color: var(--text-secondary);
      font-size: 0.84rem;
      line-height: 1.5;
    }

    .prose__caption p {
      margin-bottom: 0.5rem;
    }

    .prose__caption p:first-child {
      color: var(--text-primary);
      font-size: 0.9rem;
      line-height: 1.45;
    }

    .prose__caption p:last-child {
      margin-bottom: 0;
    }
  `]
})
export class GettingStartedComponent {
  protected readonly copy = COPY.gettingStarted;
}
