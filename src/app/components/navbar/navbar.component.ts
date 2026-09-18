import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import COPY from '../../content/copy.json';

/**
 * Top navigation: HeartBond wordmark, primary links, and the appearance
 * selector. Shown on every page via `AppComponent`. The wordmark uses the
 * Mac AppIcon (`app-icon.png`), not the marketing plate used in the hero.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  template: `
    <header class="nav">
      <div class="container nav__inner">
        <a class="wordmark" routerLink="/" aria-label="HeartBond support home">
          <img class="wordmark__icon" src="app-icon.png" width="32" height="32" alt="">
          {{ copy.nav.wordmark }}
        </a>

        <nav class="nav__links" aria-label="Primary">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">{{ copy.nav.links.home }}</a>
          <a routerLink="/getting-started" routerLinkActive="active">{{ copy.nav.links.gettingStarted }}</a>
          <a routerLink="/privacy" routerLinkActive="active">{{ copy.nav.links.privacy }}</a>
          <a routerLink="/terms" routerLinkActive="active">{{ copy.nav.links.terms }}</a>
        </nav>

        <label class="theme">
          <span class="visually-hidden">{{ copy.nav.theme.label }}</span>
          <select
            [ngModel]="theme.themeChoice()"
            (ngModelChange)="theme.setTheme($event)"
            [attr.aria-label]="copy.nav.theme.label">
            <option value="system">{{ copy.nav.theme.system }}</option>
            <option value="calm">{{ copy.nav.theme.calm }}</option>
            <option value="classic">{{ copy.nav.theme.classic }}</option>
            <option value="dark">{{ copy.nav.theme.dark }}</option>
          </select>
        </label>
      </div>
    </header>
  `,
  styles: [`
    .nav {
      position: sticky;
      top: 0;
      z-index: 10;
      background: color-mix(in srgb, var(--bg-color) 88%, transparent);
      backdrop-filter: saturate(160%) blur(10px);
      border-bottom: 1px solid var(--rule);
    }

    .nav__inner {
      display: flex;
      align-items: center;
      gap: 1rem 1.5rem;
      flex-wrap: wrap;
      padding: 0.8rem 0;
    }

    .wordmark {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: -0.01em;
      color: var(--text-primary);
      text-decoration: none;
    }

    .wordmark__icon {
      width: 2rem;
      height: 2rem;
      border: 1px solid color-mix(in srgb, var(--text-primary) 22%, transparent);
      border-radius: 22%;
      overflow: hidden;
    }

    .nav__links {
      display: flex;
      gap: 0.4rem 1.2rem;
      flex-wrap: wrap;
      margin-left: auto;
      font-weight: 600;
      font-size: 0.94rem;
    }

    .nav__links a {
      color: var(--text-secondary);
      text-decoration: none;
      border-bottom: 2px solid transparent;
      padding-bottom: 2px;
    }

    .nav__links a:hover,
    .nav__links a.active {
      color: var(--accent-green-dark);
      border-bottom-color: var(--accent-green);
    }

    .theme select {
      font: inherit;
      font-size: 0.9rem;
      padding: 0.35rem 0.6rem;
      border-radius: 0.5rem;
      border: 1px solid var(--rule);
      background: var(--surface);
      color: var(--text-primary);
      cursor: pointer;
    }

    @media (max-width: 640px) {
      .nav__links { margin-left: 0; width: 100%; }
    }
  `]
})
export class NavbarComponent {
  protected readonly copy = COPY;
  constructor(public theme: ThemeService) {}
}
