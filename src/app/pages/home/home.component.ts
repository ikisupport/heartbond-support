import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import COPY from '../../content/copy.json';

/**
 * Support home. Store badges are the official Apple artwork (black lockup
 * on light themes, white lockup on dark) and the live App Store ID. The
 * hero uses a current Mac capture of Synthetic Data, which is a product
 * environment, not a demo watermark.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container">
        <img class="hero__icon" src="icon-384.png" width="96" height="96" alt="">
        <p class="hero__eyebrow">{{ copy.hero.eyebrow }}</p>
        <h1>{{ copy.hero.headline }}</h1>
        <p class="hero__lead">{{ copy.hero.lead }}</p>
        <p class="hero__lead">{{ copy.hero.graph }}</p>
        <p class="hero__note">{{ copy.hero.note }}</p>
      </div>
      <figure class="hero__figure">
        <div class="hero__frame">
          <img
            class="hero__shot"
            [src]="copy.screenshot.src"
            [alt]="copy.screenshot.alt"
            width="3104"
            height="1586"
            fetchpriority="high">
        </div>
        <figcaption class="hero__caption">
          @for (para of copy.screenshot.caption; track para) {
            <p>{{ para }}</p>
          }
        </figcaption>
      </figure>
    </section>

    <section class="container section">
      <h2>{{ copy.store.heading }}</h2>
      <p class="section__lead">
        {{ copy.store.leadBefore }}<a routerLink="/getting-started">{{ copy.store.leadLink }}</a>{{ copy.store.leadAfter }}
      </p>
      <ul class="badges">
        @for (badge of copy.store.badges; track badge.id) {
          <li>
            <a class="store-badge" [href]="badge.href" rel="noopener noreferrer">
              <img
                class="store-badge__mark"
                [class.store-badge__mark--on-light]="!!darkSrc(badge)"
                [src]="badge.src"
                [alt]="badge.alt"
                height="40">
              @if (darkSrc(badge); as dark) {
                <img
                  class="store-badge__mark store-badge__mark--on-dark"
                  [src]="dark"
                  alt=""
                  height="40"
                  aria-hidden="true">
              }
            </a>
          </li>
        }
      </ul>
    </section>

    <section class="container section">
      <h2>{{ copy.features.heading }}</h2>
      <ul class="features">
        @for (item of copy.features.items; track item.title) {
          <li class="card">
            <h3>{{ item.title }}</h3>
            <p class="card__body">{{ item.body }}</p>
          </li>
        }
      </ul>
    </section>

    <section class="container section">
      <h2>{{ copy.help.heading }}</h2>
      <ul class="help">
        @for (item of copy.help.items; track item) {
          <li>{{ item }}</li>
        }
      </ul>
      <p class="section__lead">
        {{ copy.help.discussionsBefore }}
        <a [href]="copy.help.discussionsHref" rel="noopener noreferrer">{{ copy.help.discussionsLabel }}</a>{{ copy.help.discussionsAfter }}
      </p>
    </section>
  `,
  styles: [`
    .hero {
      background: var(--surface-2);
      border-bottom: 1px solid var(--rule);
      padding: 3.5rem 0 2.2rem;
      margin-bottom: 1rem;
    }

    .hero__icon {
      display: block;
      width: 6rem;
      height: 6rem;
      border-radius: 1.35rem;
      margin-bottom: 1.1rem;
    }

    .hero__eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--accent-green-dark);
      margin-bottom: 0.5rem;
    }

    .hero__lead {
      color: var(--text-secondary);
      font-size: 1.08rem;
      margin-top: 0.8rem;
    }

    .hero__note {
      color: var(--text-secondary);
      font-size: 0.94rem;
    }

    .hero__figure {
      width: 100%;
      margin: 1.8rem auto 0;
    }

    /* hero-mac.png is the CleanShot window capture: the Mac window sits in a
       soft alpha shadow field. A CSS drop-shadow or border-radius follows
       that field, not the window edge, so the frame is only a size constraint. */
    .hero__frame {
      width: min(92%, 900px);
      margin: 0 auto;
    }

    .hero__shot {
      display: block;
      width: 100%;
      height: auto;
    }

    .hero__caption {
      width: min(92%, var(--max-width));
      /* 148px is the transparent pad under the window in the 3104-wide PNG.
         Pull the caption up by that amount so the gap tracks the window, not
         the image box. 2rem is the remaining space under the chrome. */
      margin: calc(2rem - min(92%, 900px) * 148 / 3104) auto 0;
      color: var(--text-secondary);
      font-size: 0.84rem;
      line-height: 1.5;
    }

    .hero__caption p {
      margin-bottom: 0.5rem;
    }

    .hero__caption p:first-child {
      color: var(--text-primary);
      font-size: 0.9rem;
      line-height: 1.45;
    }

    .hero__caption p:last-child {
      margin-bottom: 0;
    }

    .section {
      padding: 1.6rem 0;
    }

    .section__lead {
      color: var(--text-secondary);
    }

    .badges {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
      align-items: center;
      justify-content: center;
      margin-top: 0.8rem;
    }

    .store-badge {
      display: inline-flex;
      align-items: center;
      line-height: 0;
    }

    .store-badge__mark {
      height: 40px;
      width: auto;
      display: block;
    }

    .store-badge__mark--on-dark {
      display: none;
    }

    :host-context([data-theme="dark"]) .store-badge__mark--on-light {
      display: none;
    }

    :host-context([data-theme="dark"]) .store-badge__mark--on-dark {
      display: block;
    }

    .features {
      list-style: none;
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
      margin-top: 0.6rem;
    }

    .card__body {
      color: var(--text-secondary);
      margin-bottom: 0;
    }

    .help {
      margin: 0.4rem 0 1rem 1.2rem;
      color: var(--text-secondary);
    }

    .help li {
      margin-bottom: 0.3rem;
    }
  `]
})
export class HomeComponent {
  protected readonly copy = COPY.home;
  protected readonly nav = COPY.nav.links;

  protected darkSrc(badge: { srcDark?: string }): string | undefined {
    return badge.srcDark;
  }
}
