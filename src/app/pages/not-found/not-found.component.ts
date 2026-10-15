import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import COPY from '../../content/copy.json';

/** 404 page: wildcard route. Offers a clear path back to support. */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="container nf">
      <p class="nf__code">{{ copy.code }}</p>
      <h1>{{ copy.heading }}</h1>
      <p class="nf__lead">{{ copy.lead }}</p>
      <a class="button button--primary" routerLink="/">{{ copy.cta }}</a>
    </section>
  `,
  styles: [`
    .nf {
      text-align: center;
      padding: 5rem 0 6rem;
    }

    .nf__code {
      font-size: 4.5rem;
      font-weight: 800;
      color: var(--accent-green-dark);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .nf__lead {
      color: var(--text-secondary);
      max-width: 34rem;
      margin: 0.6rem auto 1.8rem;
    }
  `]
})
export class NotFoundComponent {
  protected readonly copy = COPY.notFound;
}
