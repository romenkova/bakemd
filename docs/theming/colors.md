---
title: Colors
nav: Colors
description: The tokens the docs UI reads, and the theme used on this site.
order: 1
updated: 2026-09-09
---

These are the tokens the docs layout reads.

| Token                                                               | Where it shows                                     |
| ------------------------------------------------------------------- | -------------------------------------------------- |
| `--background`, `--foreground`                                      | Page background and text                           |
| `--muted`, `--muted-foreground`                                     | Hover states, quotes, captions, secondary text     |
| `--border`                                                          | Header border, table rules, code block edges       |
| `--primary`                                                         | Link hover color                                   |
| `--popover`, `--popover-foreground`                                 | The mobile nav drawer                              |
| `--docs-nav`                                                        | Sidebar link color                                 |
| `--code`, `--code-foreground`, `--code-border`                      | Fenced code blocks                                 |
| `--inline-code`, `--inline-code-foreground`, `--inline-code-border` | Inline `code`                                      |
| `--radius`                                                          | Base corner radius, everything else scales from it |

## This site

The theme you are looking at is borrowed from [Flexoki](https://stephango.com/flexoki).

```css
/* Flexoki (stephango.com/flexoki) */
@import "@fontsource-variable/outfit";
@import "@fontsource-variable/fira-code";

:root {
  --font-sans:
    "Outfit Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, Menlo, monospace;
  --radius: 0.375rem;

  --background: #fffcf0; /* paper */
  --foreground: #100f0f; /* black */
  --muted: #f2f0e5; /* base-50 */
  --muted-foreground: #6f6e69; /* base-600 */
  --border: #e6e4d9; /* base-100 */
  --primary: #bc5215; /* orange-600 */
  --primary-foreground: #fffcf0;
  --popover: #fffcf0;
  --popover-foreground: #100f0f;

  --code: #1c1b1a; /* base-950 */
  --code-foreground: #cecdc3; /* base-200 */
  --code-border: #282726; /* base-900 */
  --inline-code: #e6e4d9; /* base-100 */
  --inline-code-foreground: #100f0f;
  --inline-code-border: #dad8ce; /* base-150 */
  --docs-nav: #6f6e69;
}

.dark:root {
  --background: #100f0f; /* black */
  --foreground: #cecdc3; /* base-200 */
  --muted: #1c1b1a; /* base-950 */
  --muted-foreground: #878580; /* base-500 */
  --border: #282726; /* base-900 */
  --primary: #da702c; /* orange-400 */
  --primary-foreground: #100f0f;
  --popover: #1c1b1a;
  --popover-foreground: #cecdc3;

  --code: #1c1b1a;
  --code-foreground: #cecdc3;
  --code-border: #282726;
  --inline-code: #282726; /* base-900 */
  --inline-code-foreground: #cecdc3;
  --inline-code-border: #343331; /* base-850 */
  --docs-nav: #878580;
}
```

Toggle the theme in the header to see both halves.
