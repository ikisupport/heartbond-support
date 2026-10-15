-include .env
export

PORT     ?= 4200

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
