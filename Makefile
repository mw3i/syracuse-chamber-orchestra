.PHONY: install build dev lint preview

install:
	npm install

build:
	npm run build

dev:
	npm run dev

lint:
	npm run lint

preview: build
	npx --yes serve out
