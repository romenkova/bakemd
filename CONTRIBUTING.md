# Contributing to bakemd

Contributions are welcome, thank you for your interest!

## New features

bakemd is meant to stay small: a folder of Markdown in, HTML out, almost no
JS in the output. Before you start on a feature, please open an issue so we
can check it fits.

I respond within a week.

## Bugfixes and docs

Ordinary bugfixes and documentation updates can be submitted via PR right away.

## AI and vibecoding

Contributions should be made by humans, and so should commits. The commit author is the one who owns a commit and is responsible for it, so fully AI commits are forbidden.

AI assisted coding is allowed, but all code changes should be reviewed and tested by humans.

## Dev setup

Node 22+ and pnpm are required.

### Running locally

1. Clone the repo, install deps, I use pnpm
2. Run `pnpm dev` - it serves `docs/` from the sources on port 5174

Edits to `src/`, the styles and the Markdown reload the page. Edits to
`src/lib/` or `bin/` restart the server.

`src/` is TypeScript and the published package is `dist/` only, so build
before running the CLI outside dev:

```sh
pnpm build
node dist/bin/bakemd.js build path/to/docs --out out
```

`docs/` is the place to try a change against real pages.

## Checks

There are no tests yet. Before a PR, run:

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm build:docs` and look at the result in `docs-dist/`

## Contact

You can contact me at rita.romenkova@gmail.com
