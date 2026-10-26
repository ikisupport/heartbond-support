# Contributing

Four gates. Each one exists because something got published that should not
have, or nearly did.

```sh
npm run check:repo       # no address or port literals in any tracked file
npm run typecheck        # the build strips types without checking them
npm run check:publish    # build, stage _site, verify what would deploy
npm run check:assets     # every asset a prerendered page references exists
npm run check:routes     # the URL -> route truth table
```

That is the order `.github/workflows/pages.yml` runs them in, so a green local
run and a green CI run mean the same thing.

## `check:repo` — no machine, host or port literals

The site documents things people do on their own computers, so the rule cannot
be "no paths" or "no URLs". It is narrower: nothing in a tracked file may
hard-code an address or a port. A published literal is both a thing that goes
stale and a thing that describes whoever wrote it. A dev server takes
`--port`; that is why the README says `npm start -- --port <n>` and names no
number.

## `typecheck` — because the build will not do it

`vite build` strips TypeScript types without checking them. A type error in a
page builds green and ships. `npm run typecheck` runs `react-router typegen`
first, so generated route types are current before `tsc` sees them.

## `check:publish` — what would actually deploy

Builds, stages `build/client/*` into `_site` exactly as the Actions job does,
then runs `scripts/verify-publish-artifact.mjs` over the result. It refuses:

- any source directory or config file that leaked into the artifact
  (`app/`, `scripts/`, `src/`, `package.json`, `locales.json`, …);
- any `.ts`, `.mjs`, `.map` or `.json` file;
- any dotfile but `.nojekyll` — `extname('.DS_Store')` is `''` in Node, so the
  extension rule can never catch one, and the same hole admits `.env`;
- tooling attribution in any published HTML, JS or SVG;
- a private identifier (a `.swift` filename, an absolute volume path) in the
  same;
- **any XML comment in a published SVG.** Export tools write a banner naming
  themselves and their version. Strip it at source — there are five badge SVGs
  in `public/badges/` and all five are comment-free. The rule is not applied to
  HTML, because the prerender emits framework comment nodes into every page.

## `check:assets` — the failure the other gates cannot see

`copy.json` stores image paths relative to the site root
(`hero-mac-20261014.png`, `badges/app-store.svg`). The legacy Angular site had
`<base href="/">` in its `index.html`, which made those resolve from the root
on every route. **No base tag ships here** — one would also rewrite the in-page
`#fragment` links — so `app/lib/asset.ts` makes each path root-absolute at
render time.

Get that wrong and the page renders the correct text with the correct head
tags while every image on `/getting-started/` 404s. This gate resolves every
`src`, `poster`, `srcset` and icon `href` in every prerendered page against the
build root and asserts the file is there. It also fails a reference that is
merely *relative*, even when the file happens to exist at the root, because on
a nested route that reference is already wrong.

## Two things that must not be changed

**`ssr: true` in `react-router.config.ts`, never `false`.** React Router reads
`false` as SPA mode, and prerendering then writes the same empty shell to every
path — no `<title>`, no meta, no page text. On a site whose entire value is
SEO-correct static HTML that is a silent catastrophe, and it looks fine in a
browser, because the client renders the real page a moment later.

**`routeDiscovery: 'initial'`.** The `lazy` default fetches `/__manifest` on
navigation to discover routes, an endpoint only a running React Router server
answers. On a file host every client-side navigation would 404 against it.

## Style

One CSS Module per page. Only genuinely global classes belong in
`src/styles.css` — `.container`, `.button`, `.card`, `.prose`,
`.placeholder`, `.visually-hidden` and the per-page custom element rules.
Merging a page's rules into the global sheet silently restyles other pages,
which is exactly the collision the CSS audit watches for.

Edit `src/theme-tokens.css` and `src/theme-prepaint.js`, never
`app/generated/theme-prelude.ts` — that file is generated per build and
git-ignored.
