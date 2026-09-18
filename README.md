# HeartBond support website

Angular 19 with SSR. Nested git repo inside `Bond-AI`. Gitea remote:
`ssh://daniel@192.168.200.99:2222/d108/heartbond-support.git`. GitHub remote:
`ikisupport/heartbond-support`. Public host is `heartbond.ikisystems.com`.

```sh
make start-local-support-website   # http://localhost:4200
make build                         # prerender + SSR build, proves the wiring
```

GitHub Pages cannot run the Express SSR server. Pushing `main` runs
`.github/workflows/pages.yml`, which builds the prerendered files in
`dist/heartbond-support/browser` and pushes them to the `gh-pages` branch
(same pattern as SpeakWith). In the repo Settings, Pages → Build and
deployment → Source stays **Deploy from a branch**, with branch **gh-pages**
/ `(root)`. Pointing that dropdown at `main` / `(root)` publishes `README.md`
instead of the site.

Routes: `/` (support home), `/getting-started`, `/privacy`, `/terms`, plus a
wildcard 404.

Visible strings live in `src/app/content/copy.json`. The palette lives inline in
`src/index.html`. See `AGENTS.md` for the conventions and `STYLE.md` for how the
copy is written.
