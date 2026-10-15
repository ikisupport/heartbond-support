import { Component } from '@angular/core';
import COPY from '../../content/copy.json';

/**
 * Privacy policy. HeartBond's story is HealthKit plus the visitor's own iCloud
 * account, not "nothing leaves the device". Keep it stated that way.
 */
@Component({
  selector: 'app-privacy',
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
export class PrivacyComponent {
  protected readonly copy = COPY.privacy;
}
