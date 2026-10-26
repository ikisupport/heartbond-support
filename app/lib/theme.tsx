import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

/** What the visitor picked. `system` is a rule, the other three are pins. */
export type ThemeChoice = 'system' | 'calm' | 'classic' | 'dark';

/** What actually lands on `<html data-theme>`. */
export type ResolvedTheme = 'calm' | 'classic' | 'dark';

const KEY = 'heartbond-theme';
const CHOICES: readonly ThemeChoice[] = ['system', 'calm', 'classic', 'dark'];
const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * The `theme-color` meta each resolved theme advertises. Ported verbatim from
 * the Angular `ThemeService`, including the value for `calm`, which is the
 * brand magenta rather than calm's own `--bg-color` (#f3e6f4). The static
 * `<meta name="theme-color">` the Angular index.html shipped carried the same
 * magenta, so this keeps what the browser chrome has always been given.
 */
const THEME_COLOR: Record<ResolvedTheme, string> = {
  calm: '#c989c9',
  classic: '#f6eef6',
  dark: '#161218',
};

/**
 * System-aware theming with a manual override. Port of the Angular site's
 * `ThemeService`.
 *
 * - `system` follows the OS `prefers-color-scheme` and updates live: dark
 *   systems get `dark`, everything else gets `calm`. Note that the fallback is
 *   calm, not classic. Calm is the brand default and classic is opt-in.
 * - `calm` / `classic` / `dark` pin the theme regardless of the OS.
 *
 * The resolved theme is written to `<html data-theme="...">`;
 * `src/theme-prepaint.js` applies the same rule before first paint to avoid a
 * flash, and the two are a pair — see the note at the top of that file.
 *
 * Why the server snapshot is `'system'` with `prefersDark: false` — i.e. calm:
 * Angular read `localStorage` synchronously in a constructor and could render
 * the right value immediately. React cannot, because the prerendered HTML is
 * produced with no browser at all. The static HTML and React's FIRST client
 * render must agree on one value or hydration silently keeps the wrong DOM,
 * and the value they agree on is what the prerender emits: calm, which is also
 * what `:root` in theme-tokens.css defines.
 *
 * Which is why the mirror effect below is GATED on `loaded`, and that gate is
 * load-bearing rather than tidiness. Without it, a visitor who pinned Dark on
 * a light system gets this sequence: the pre-paint script writes `dark`;
 * hydration renders at the agreed-on `calm`; the mount effects run in
 * declaration order, so the mirror effect writes `calm` onto <html> BEFORE the
 * state update from localStorage has re-rendered anything. `body` carries a
 * 0.2s background-color transition, so that is a visible flash of the light
 * palette on a dark page — the exact thing the pre-paint script exists to
 * prevent, reintroduced one frame later. The gate makes the first write happen
 * only once the stored choice is known, and `setChoice` + `setLoaded` are
 * batched into one re-render so there is no intermediate paint to catch.
 */
interface ThemeContextValue {
  themeChoice: ThemeChoice;
  setTheme: (choice: ThemeChoice) => void;
  /** The theme actually on `<html data-theme>`: the choice, or the OS rule. */
  resolvedTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeChoice: 'system',
  setTheme: () => {},
  resolvedTheme: 'calm',
});

function normalize(raw: string | null): ThemeChoice {
  return CHOICES.includes(raw as ThemeChoice) ? (raw as ThemeChoice) : 'system';
}

/** Subscribe to the OS preference. Server snapshot is false, i.e. calm. */
function subscribePrefersDark(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function usePrefersDark(): boolean {
  return useSyncExternalStore(
    subscribePrefersDark,
    () => window.matchMedia(DARK_QUERY).matches,
    () => false,
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts at the prerendered value on purpose; the effect below reconciles it
  // with localStorage after hydration.
  const [themeChoice, setChoice] = useState<ThemeChoice>('system');
  // False until the stored choice has been read. See the note above: this is
  // what keeps the mirror effect from writing the prerendered default over the
  // attribute the pre-paint script already set correctly.
  const [loaded, setLoaded] = useState(false);
  const prefersDark = usePrefersDark();

  useEffect(() => {
    try {
      setChoice(normalize(localStorage.getItem(KEY)));
    } catch {
      /* private window, or site data blocked; leave the default */
    }
    // Same effect, so React batches this with setChoice into one re-render.
    setLoaded(true);
  }, []);

  const setTheme = useCallback((choice: ThemeChoice) => {
    setChoice(choice);
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* nothing to persist to; the in-memory choice still applies */
    }
  }, []);

  const resolvedTheme: ResolvedTheme =
    themeChoice === 'system' ? (prefersDark ? 'dark' : 'calm') : themeChoice;

  // Mirror onto <html> exactly as the pre-paint script does, so the attribute
  // the script set is kept in step once React owns the page. Gated: until the
  // stored choice is known, the pre-paint script's value is the correct one and
  // must not be overwritten.
  useEffect(() => {
    if (!loaded) return;
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.getElementById('meta-theme-color')?.setAttribute('content', THEME_COLOR[resolvedTheme]);
  }, [loaded, resolvedTheme]);

  const value = useMemo(
    () => ({ themeChoice, setTheme, resolvedTheme }),
    [themeChoice, setTheme, resolvedTheme],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
