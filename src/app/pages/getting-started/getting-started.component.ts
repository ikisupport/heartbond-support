import { Component } from '@angular/core';
import COPY from '../../content/copy.json';

/**
 * Getting started. Steps match the current app: Health consent, download
 * windows, iCloud, and Keep all samples. Walkthrough screenshots stay dashed
 * until a current capture exists.
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
  `]
})
export class GettingStartedComponent {
  protected readonly copy = COPY.gettingStarted;
}
