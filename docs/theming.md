---
title: Theming
nav: Theming
description: Override colors, radius and fonts with one CSS file.
order: 5
updated: 2026-09-08
---

The default look is Mulish on a cool gray. What you are reading is a theme
on top of it. To change yours, point
`theme` in `bakemd.json` at a CSS file in the content folder:

```json
{ "theme": "_theme.css" }
```

That file loads after the built-in styles, so redeclare only what you want to
change. Everything is a CSS custom property on `:root`, with dark values on
`.dark:root`.

```css
:root {
  --primary: #1f7a5c;
  --background: #f6f8f7;
}

.dark:root {
  --primary: #4fc99a;
  --background: #0f1714;
}
```

If you change the backgrounds, set `themeColor` in `bakemd.json` to the same
two values so the browser chrome on mobile follows along.

Use `.dark:root` rather than `.dark`. The defaults are declared on
`.dark:root`, and a bare `.dark` loses to it.

This site's own theme is on the [colors](/theming/colors) page, and
[fonts](/theming/fonts) covers bringing your own typeface.
