# HeartBond support website

The support site for **HeartBond**, a heart rate, HRV and sleep graphing app
for iPhone, iPad, and Mac. It reads Apple Health, draws each day as a graph,
and syncs your downloaded days through your own iCloud account.

Live at **<https://heartbond.ikisystems.com>**.

Four pages and a 404: the support home, Getting started, the Privacy Policy,
and the Terms of Service.

## Running it

React Router 7 with prerendering. Every page is built to static HTML, so the
deployed site needs no server.

```sh
npm ci
npm start -- --port <n>    # dev server; pick any free port
npm run build              # prerender every route into build/client/
```

`npm start` fails loudly if the port you asked for is taken, rather than
quietly moving to the next one and leaving you with a bookmark to a dead
server.

## Where things live

| What | Where |
| --- | --- |
| Every visible string | `src/app/content/copy.json` |
| Per-route title and meta description | the `seo` section of that file |
| Which URLs exist | `src/app/content/locales.json` |
| The palette | `src/theme-tokens.css` |
| Pre-paint theme script | `src/theme-prepaint.js` |
| Global styles | `src/styles.css` |
| Per-page styles | `app/routes/<page>.module.css` |
| Images, favicons, badges | `public/` |

Copy changes are a `copy.json` edit and nothing else — no page needs touching
to change a sentence. The route list in `locales.json` feeds the router, the
prerender list and `sitemap.xml` from one table, so the set of URLs that exist
cannot drift from the set that is advertised.

The palette is a real stylesheet that gets inlined into every page's `<head>`
by `scripts/extract-theme-prelude.mjs`, ahead of the deferred stylesheet. That
is what stops a dark-system visitor seeing a frame of the light palette.
`src/theme-prepaint.js` resolves the saved choice before first paint; the
appearance selector in the navbar offers System, Calm, Classic and Dark.

## Deployment

Pushing `main` runs `.github/workflows/pages.yml`, which builds the site,
checks it, and pushes `_site` to the `gh-pages` branch. In the repo Settings,
Pages → Build and deployment → Source stays **Deploy from a branch**, with
branch **gh-pages** / `(root)`. Pointing that dropdown at `main` / `(root)`
publishes this README instead of the site.

`public/CNAME` carries the custom domain and is copied into the artifact
verbatim.

See `CONTRIBUTING.md` for the checks a change has to pass.
