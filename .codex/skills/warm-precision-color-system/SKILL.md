---
name: warm-precision-color-system
description: Color usage system for Jacob Murrah's personal portfolio. Use when editing its palette, CSS variables, surfaces, links, navigation states, cards, code, blockquotes, status indicators, or other UI color decisions.
---

# Warm Precision Color System

Reduce the interface to neutral graphite/paper, off-white/dark text, and one muted-blue interaction family. Let photography provide warmth. The only non-blue UI hue is the scoped orange content accent.

## Source Of Truth

Keep every exact UI color in `src/palette.css`. Components and local CSS consume semantic variables only. Supplied brand icon artwork may retain its embedded colors.

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

/* Scoped content exceptions */
--blockquote-accent;
--blockquote-bg;
--image-corner-accent;

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
- Never use colored card, code, badge, or hover surfaces. Article blockquotes are the only colored-surface exception.

## Interaction

- Resting link labels use `--text`, not blue.
- Resting link underlines use dotted `--text` decoration.
- Hover/focus states keep the dotted underline and transition both label and decoration to `--blue-hover`.
- Home hero icon-label links use the shared dotted underline on labels; their labels and arrows turn `--blue-hover` on hover/focus. Supplied brand marks retain their colors.
- Active top navigation and mobile drawer navigation use `--blue-hover` text with a `--blue` underline.
- Blue is otherwise limited to genuinely interactive elements, selected states, the breadcrumb cursor, and browser UI such as the scrollbar.
- Non-interactive timeline markers and decoration stay neutral.

## Text And Structure

- Primary text: `--text`.
- Secondary text: `--muted`.
- Dates, captions, and tertiary-only information: `--muted-light`.
- Structure: `--border` and `--border-strong`.
- Literal code uses `--surface-muted`, `--text`, and `--border`.

## Article Accent Exception

Article blockquotes/highlights use `--blockquote-accent` as their only border and light `--blockquote-bg` as their full background. Interactive content-image hover/focus may use the slightly brighter `--image-corner-accent` for small L-shaped corner marks only. Text stays neutral.

```css
blockquote {
  background: var(--blockquote-bg);
  border: 0;
  border-left: 4px solid var(--blockquote-accent);
  color: var(--text);
}
```

Do not use these orange tokens anywhere else. The supplied Substack icon retains its original brand orange.

## Final Check

- Exact UI colors exist only in `src/palette.css`; supplied brand marks retain their embedded colors.
- No blue/green tinted surfaces exist; orange surfaces are limited to article blockquotes.
- Resting links read as normal text first.
- Blue communicates interaction only.
- Green UI does not exist.
- Orange appears only on article blockquote left borders/backgrounds, interactive content-image corner marks, and the supplied Substack brand mark.
- Photography provides warmth and visual color.
