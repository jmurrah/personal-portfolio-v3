---
name: warm-precision-color-system
description: Color usage system for Jacob Murrah's personal portfolio. Use when editing this portfolio's palette, CSS variables, backgrounds, links, navigation states, cards, badges, buttons, code blocks, blockquotes, status labels, or any UI color decisions so the site stays warm, precise, restrained, and technically credible.
---

# Warm Precision Color System

Use color as a signal system, not decoration. The site should feel like a cool-neutral page with warm ink, precise typography, technical blue interaction, burnt orange human/status accents, and very little color overall.

## Source Of Truth

Use `src/palette.css` as the only source of exact color values. Do not copy hex/rgb/hsl color values into components, page CSS, or this skill. When a new color is genuinely needed, add a semantic token in `src/palette.css` first, then consume the token elsewhere.

Canonical tokens:

```css
/* Neutrals */
--bg;
--surface;
--surface-muted;
--text;
--muted;
--muted-light;
--border;
--border-strong;

/* Technical interaction */
--blue;
--blue-hover;
--blue-soft;
--blue-border;

/* Human/status emphasis */
--orange;
--orange-hover;
--orange-soft;
--orange-border;

/* Rare operational success */
--green;
--green-soft;
--green-border;

/* Code */
--code-bg;
--code-text;

/* Depth */
--shadow-sm;
--shadow-md;
```

Compatibility aliases may exist in `src/palette.css` for older call sites, for example `--accent: var(--blue)`, `--signal: var(--orange)`, `--success: var(--green)`, `--primary: var(--blue)`, and `--text-muted: var(--muted)`. Prefer canonical tokens in new or touched CSS.

## Signal Rules

- Cool-gray neutrals are the default canvas: use `--bg`, `--surface`, `--surface-muted`, `--text`, `--muted`, and borders for most UI.
- The base neutrals are cool-gray, not warm beige. This keeps accent colors reading as sharp signals rather than blending into a warm background. The text and orange main values remain warm; that contrast between warm ink/signal and cool surface is intentional.
- Blue means clickable, technical, selected, linked, navigational, focus, or interactive.
- Orange means current, important, personal, status, editorial emphasis, human signal, or blockquote emphasis.
- Green means live, healthy, verified, shipped, available, or running. Use it rarely.
- Avoid blue or orange as large background areas. Use them as small signals.

Target ratio:

```text
80-85% cool neutral
8-12% white surfaces
3-5% blue
1-2% orange
<1% green
```

## Backgrounds And Surfaces

- Page background: `--bg`.
- Cards and structured content: `--surface` with `1px solid var(--border)`.
- Code, blockquotes, notes, and low-emphasis callouts: `--surface-muted`.
- Prefer borders and spacing over heavy shadows or colored blocks.

Page background is a cool neutral, not warm cream. This is deliberate: warm text and orange signals read with more precision against a cooler field. Do not drift `--bg` back toward beige; the system depends on this cool base.

```css
body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}
```

## Text

- Primary text uses `--text`.
- Secondary text, metadata, dates, descriptions, footer text, and inactive breadcrumb/nav text use `--muted`.
- Avoid pure black.
- Keep muted gray compatible with the warm text while the canvas stays cool-neutral.

## Links And Navigation

Use blue for intentionally colored technical/clickable interaction:

```css
a {
  color: var(--blue);
  text-decoration-color: color-mix(in srgb, var(--blue) 35%, transparent);
}

a:hover {
  color: var(--blue-hover);
}
```

If the user asks for neutral links, keep links inheriting text color but preserve underline/focus affordance.

Active navigation should become primary text and use an underline. Inactive navigation can use `--muted`.

## Orange Usage

Use orange for human/status emphasis, not normal links:

- Currently building
- Featured
- Now
- Writing
- Personal note
- Blockquote border
- Small status dots

```css
.badge-status {
  background: var(--orange-soft);
  color: var(--orange);
  border: 1px solid var(--orange-border);
}

blockquote {
  background: var(--surface-muted);
  border-left: 3px solid var(--orange);
  color: var(--text);
}
```

Do not use orange for all links.

## Green Usage

Use green almost never. It is for operational/shipped signals only:

- Live
- Healthy
- Verified
- Shipped
- Available
- Running

Avoid large green backgrounds.

## Buttons, Tags, And Badges

Primary technical action:

```css
.button-primary {
  background: var(--blue);
  color: white;
}
```

Secondary action:

```css
.button-secondary {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}
```

Tag mapping:

```text
React / TypeScript / ML / Infra = blue
Essay / Notes / Reflection = neutral
Currently / Featured / Personal = orange
Live / Shipped = green
```

## Code

Code should feel technical but calm:

```css
code {
  background: var(--code-bg);
  color: var(--code-text);
  border: 1px solid var(--border);
}

pre {
  background: var(--code-bg);
  border: 1px solid var(--border);
  color: var(--text);
}
```

Avoid dark code blocks unless the whole site has a dark-mode counterpart.

## Final Check

Before finishing color-related work, confirm:

- Exact color values live in `src/palette.css`, not scattered through app files.
- The page still reads mostly cool neutral.
- Blue only marks technical/interactive meaning.
- Orange appears only where attention is deserved.
- Green is rare and operational.
- Borders and typography carry more polish than color.
