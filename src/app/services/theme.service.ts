import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** What the visitor picked. `system` is a rule, the other three are pins. */
export type ThemeChoice = 'system' | 'calm' | 'classic' | 'dark';

/** What actually lands on `<html data-theme>`. */
export type ResolvedTheme = 'calm' | 'classic' | 'dark';

/**
 * System-aware theming with a manual override.
 *
 * - `system` follows the OS `prefers-color-scheme` and updates live: dark
 *   systems get `dark`, everything else gets `calm`. Note that the fallback is
 *   calm, not classic. Calm is the brand default and classic is opt-in.
 * - `calm` / `classic` / `dark` pin the theme regardless of the OS.
 *
 * The resolved theme is written to `<html data-theme="...">`; `index.html`
 * applies the same logic inline before first paint to avoid a flash. Keep the
 * two in step.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private static readonly KEY = 'heartbond-theme';
  private static readonly CHOICES: readonly ThemeChoice[] = ['system', 'calm', 'classic', 'dark'];

  /** Matches the `--bg-color` token each theme defines in `index.html`. */
  private static readonly THEME_COLOR: Record<ResolvedTheme, string> = {
    calm: '#c989c9',
    classic: '#f6eef6',
    dark: '#161218',
  };

  private readonly isBrowser: boolean;

  readonly themeChoice = signal<ThemeChoice>('system');

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.init();
    }
  }

  private init(): void {
    this.setTheme(this.normalize(localStorage.getItem(ThemeService.KEY)));

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (this.themeChoice() === 'system') {
          this.apply('system');
        }
      });
  }

  setTheme(choice: ThemeChoice): void {
    this.themeChoice.set(choice);
    if (this.isBrowser) {
      localStorage.setItem(ThemeService.KEY, choice);
      this.apply(choice);
    }
  }

  private normalize(raw: string | null): ThemeChoice {
    return ThemeService.CHOICES.includes(raw as ThemeChoice) ? (raw as ThemeChoice) : 'system';
  }

  private apply(choice: ThemeChoice): void {
    const resolved = this.resolve(choice);
    document.documentElement.setAttribute('data-theme', resolved);
    const meta = document.getElementById('meta-theme-color');
    if (meta) {
      meta.setAttribute('content', ThemeService.THEME_COLOR[resolved]);
    }
  }

  private resolve(choice: ThemeChoice): ResolvedTheme {
    if (choice === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'calm';
    }
    return choice;
  }
}
