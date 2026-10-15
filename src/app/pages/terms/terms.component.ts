import { Component } from '@angular/core';
import COPY from '../../content/copy.json';

/**
 * Terms of service. Carries the medical disclaimer and states how the graph
 * bins samples, so the five-minute summary is never mistaken for raw data.
 *
 * This is a plain-language draft and is not a substitute for review by a
 * qualified legal professional before launch.
 */
@Component({
  selector: 'app-terms',
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
      }
    </article>
  `,
  styles: [`
    .prose__meta {
      color: var(--text-secondary);
      font-size: 0.92rem;
      margin-bottom: 1.4rem;
    }
  `]
})
export class TermsComponent {
  protected readonly copy = COPY.terms;
}
