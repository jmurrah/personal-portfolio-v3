---
name: warm-precision-color-system
description: Color usage system for Jacob Murrah's personal portfolio. Use when editing its palette, CSS variables, surfaces, links, navigation states, cards, code, blockquotes, status indicators, or other UI color decisions.
---

# Warm Precision Color System

Reduce the interface to neutral graphite/paper, off-white/dark text, and one muted-blue interaction family. Let photography provide warmth. The only non-blue UI hue is the scoped orange article-blockquote accent.

## Source Of Truth

Keep every exact color in `src/palette.css`. Components and local CSS consume semantic variables only.

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

/* One interaction hue */
--blue;
--blue-hover;
--blue-border;

/* Article-only exception */
--blockquote-accent;

/* Depth */
--shadow-sm;
--shadow-md;
```

Do not add compatibility aliases, colored soft-surface tokens, generic orange tokens, green tokens, status palettes, or decorative accent colors.

## Theme Rules

- Light is the default `:root` theme.
- The optional dark alternate is `:root[data-theme='dark']`.
- Both themes use only different lightness values of their neutral family plus the same muted-blue interaction concept.
- Large and small UI surfaces remain neutral: `--bg`, `--surface`, or `--surface-muted`.
- Never use colored card, code, badge, callout, or hover surfaces.

## Interaction

- Resting link labels use `--text`, not blue.
- Resting link underlines may use `--blue-border`.
- Hover/focus states may use `--blue-hover`.
- Active navigation keeps neutral text with a `--blue` underline.
- Blue is otherwise limited to genuinely interactive elements, selected states, the breadcrumb cursor, and browser UI such as the scrollbar.
- Non-interactive timeline markers and decoration stay neutral.

## Text And Structure

- Primary text: `--text`.
- Secondary text: `--muted`.
- Dates, captions, and tertiary-only information: `--muted-light`.
- Structure: `--border` and `--border-strong`.
- Literal code uses `--surface-muted`, `--text`, and `--border`.

## Article Blockquote Exception

Article blockquotes/highlights may use `--blockquote-accent` only as a narrow left border. Their background, remaining border, and text stay neutral.

```css
blockquote {
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 4px solid var(--blockquote-accent);
  color: var(--text);
}
```

Do not use this orange token anywhere else.

## Final Check

- Exact colors exist only in `src/palette.css`.
- No blue/orange/green tinted surfaces exist.
- Resting links read as normal text first.
- Blue communicates interaction only.
- Green UI does not exist.
- Orange appears only on article blockquote/highlight left borders.
- Photography provides warmth and visual color.
