# Changelog

## [0.2.2] - 2026-09-09

### Added

- A missing `bakemd.json` is written on the first run.

### Changed

- `lib/` rewritten in TypeScript.

## [0.2.1] - 2026-09-09

### Added

- Heading anchors: every heading gets an id and a link to itself.

## [0.2.0] - 2026-09-09

### Added

- Code highlighting. `codeTheme` in `bakemd.json` uses highlight.js
  theme.
- `robots: true` writes a `robots.txt`.

## [0.1.1] - 2026-09-09

### Added

- `home` in `bakemd.json`.
- The site can be served from a path, like `example.com/docs`.
- CLI: `bakemd build [folder] [--out dist]` and `bakemd dev [folder] [--port 5174]`.
- The docs for this repo, examples.
- nginx example.

### Fixed

- Fonts are preloaded.
- Images no longer overflow the page.

## [0.1.0] - 2026-09-08

### Added

- The docs engine moved out of Doska into its own package.
