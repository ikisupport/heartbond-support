-include .env
export

# 4202 matches the heartbond-web pane in the `support-websites` tmux
# environment (SpeakWith's support site gets 4201). Both sit off Angular's
# default 4200 so a hand-run `ng serve` never collides with a pane.
PORT     ?= 4202

.PHONY: install-deps start-local-support-website build

install-deps:
	@test -d node_modules/.bin/ng || npm ci

# Angular dev server — open http://localhost:$(PORT)
start-local-support-website: install-deps
	npm start -- --port $(PORT)

# Production build: prerenders every route and compiles the SSR entry. Run this
# before calling a change done; `ng serve` alone does not prove the SSR wiring.
build: install-deps
	npm run build
