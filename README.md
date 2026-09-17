# HeartBond support website

Angular 19 with SSR. Nested git repo inside `Bond-AI`. Gitea remote:
`ssh://daniel@192.168.200.99:2222/d108/heartbond-support.git`. No deploy is
configured here; the live public host is `heartbond.ikiapps.com`.

```sh
make start-local-support-website   # http://localhost:4200
make build                         # prerender + SSR build, proves the wiring
```

Routes: `/` (support home), `/getting-started`, `/privacy`, `/terms`, plus a
wildcard 404.

Visible strings live in `src/app/content/copy.json`. The palette lives inline in
`src/index.html`. See `AGENTS.md` for the conventions and `STYLE.md` for how the
copy is written.
