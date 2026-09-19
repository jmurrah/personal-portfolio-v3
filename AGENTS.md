# AGENTS.md

You are a senior React engineer working on this repo. Be direct, conservative, and explicit. Prefer the existing architecture and design language over introducing new patterns.

## Living Guideline Rule

This file is the repo-level agent guideline. When the user establishes a durable project rule, design decision, architecture constraint, or workflow preference, update this file in the same turn unless the user says not to.

Rules added here should be:

- Specific enough to guide future edits.
- Short enough to stay useful.
- Kept current with the codebase.
- Removed or revised when they become stale.

Do not treat chat-only preferences as permanent unless they affect future repo work. Durable examples include color systems, typography rules, routing conventions, data ownership, file placement, and validation workflow.

## Project Overview

This is a Vite + React single-page app for a personal portfolio and writing/blog content. Routing uses `react-router-dom`. Blog content is static and sourced from `src/constants/prerenderedPosts.json`; there is no runtime Substack fetching in React.

Current site direction:

- Home route renders hero copy plus a concise experience timeline.
- The layout still renders header, route outlet, and footer.
- The public writing route is `/writing`; legacy `/blog` URLs redirect to `/writing`.
- Projects route, project navigation, theme switching, and contact section have been removed.

## System Map

- `src/app/routes.tsx` - route config.
- `src/pages/` - route-level views.
- `src/layouts/` - layout wrappers.
- `src/components/` - shared UI.
- `src/components/Blog/` - blog feed, post rendering, blog routing helpers.
- `src/constants/prerenderedPosts.json` - static blog source of truth.
- `src/assets/` - images/icons referenced by code.
- `src/palette.css` - exact color token values and compatibility aliases.
- `src/index.css` - global typography, reset, shared utility styles.
- `.codex/skills/warm-precision-color-system/` - repo-specific color usage skill.
- `scripts/` - Node-only build/CI utilities.
- `public/` - static files.
- `.github/workflows/` - deploy and cache updater workflows.

## Architecture Rules

- UI code may import constants, assets, helpers, and CSS.
- UI code must not import from `scripts/`.
- Keep data fetching, parsing, and side effects out of React components when possible.
- Treat `src/constants` data as immutable at runtime; clone before transforming.
- Scripts run in Node only and are not client dependencies.
- Keep route definitions centralized in `src/app/routes.tsx`.
- Use existing blog helpers such as `getPostSlug` and `getPostPath`; do not duplicate slug/path logic.
- Public writing links should use `/writing`; keep `/blog` only as a legacy redirect.

## File Placement

- New route: `src/pages/<Name>.tsx`, or `src/pages/<Name>/` when it needs page-only subcomponents.
- Page-only helpers/components: colocate under the page folder.
- Reusable UI: `src/components/<Component>.tsx` plus CSS if needed.
- Use the reusable `SectionRail` for fixed desktop section navigation. Home entries map to its three major sections. Article rails begin with the article title, followed by entries derived from stable H2-H4 ids. Article marker length and indentation must show heading depth (title/H2 full, H3 nested, H4 nested further). Markers progressively fill blue through each section, completed sections remain blue, and a section starts at 1% fill. Rail hit areas must fill the visual gaps between markers. Hover labels use `--bg` behind the text for legibility. Hide the rail below `900px`.
- Reused timeline-style sections should share the same line/marker CSS rather than duplicating timeline visuals.
- Use `Timeline` for the home experience timeline and `LabeledTimeline` for age-labeled Signals; keep their spacing and responsive behavior separate.
- Experience timeline content padding should stay fixed at `2.2rem` across breakpoints; only Signals timeline spacing should change responsively.
- Timeline row spacing should be configurable on timeline components via a single prop rather than hardcoded per page or repeated per item.
- The home experience timeline should use `Timeline`: linked company stacked above muted role on the left, with right-aligned dates visually aligned to the role row rather than the company row, then summary below. Do not render location or company logos there unless explicitly requested.
- Blog-specific reusable UI/helpers: `src/components/Blog/`.
- Static data: `src/constants/<name>.json|ts`.
- Build/CI utilities: `scripts/*.ts`.
- Static public assets with no imports: `public/`.
- Repo-specific skills: `.codex/skills/<skill-name>/`.

## Styling And Design

- Use `src/palette.css` as the only source of exact color values.
- Do not scatter hex/rgb/hsl values through app CSS or components.
- Prefer canonical color tokens from the Warm Precision system:
  - Neutrals: `--bg`, `--surface`, `--surface-muted`, `--text`, `--muted`, `--muted-light`, `--border`, `--border-strong`.
  - Interaction: `--blue`, `--blue-hover`, `--blue-border`.
  - Article-only exception: `--blockquote-accent`.
- Use the repo skill `.codex/skills/warm-precision-color-system` for color decisions.
- Color is limited to neutral graphite/paper, off-white/dark text, and one muted-blue interaction family. Photography supplies warmth.
- Light is the default theme. `:root[data-theme='dark']` provides the optional dark alternate.
- Keep every UI surface neutral (`--bg`, `--surface`, or `--surface-muted`). Never add colored card, code, badge, or callout fills.
- Blue is interaction-only: links, active navigation, hover/focus, selected states, interactive controls, and the scrollbar. Non-interactive decoration must use neutral tokens.
- Orange exists only as `--blockquote-accent` on article blockquote/highlight left borders. Do not use orange elsewhere. Do not introduce green UI tokens or states.
- Do not add decorative gradients, glassmorphism, pure black, or new accent colors.
- Reusable styles belong in CSS files imported by components.
- Inline Tailwind classes are fine for local layout and one-off spacing.
- Preserve accessibility: focus states, aria labels, descriptive alt text, and readable contrast.
- Do not use one global link style for every surface. Keep separate treatments for nav links, clustered/meta links, inline sentence links, and long-form prose links.
- Meta, inline, prose, and shared underlined text links should use `--blue-border` for the resting underline and transition both label and underline together to solid `--blue-hover` with a fast `100ms` color-only transition and fixed underline thickness.
- Reuse shared link underline utilities from `src/index.css` such as `.meta-link`, `.inline-link`, and `.link-underline`; do not redefine the same underline token logic in component-local CSS when an existing shared class fits.
- Header nav links should stay neutral and undecorated at rest; hover/focus may turn blue. Active nav keeps neutral text with a blue underline.
- Terminal breadcrumb hover/focus states should use `--blue-hover` for the full interactive token, including the `~` home marker and segment labels.
- Keep `GraduationHeadshot` available as a photo asset, but do not render a headshot in the Home hero unless explicitly requested.
- The Home hero should render the `sunset` photo below the hero links at full available width with fixed height, `object-cover`, and centered cropping.
- Keep non-link controls such as the hamburger/menu toggle and close button on separate classes so link underline styling only applies to actual links; their hover/focus state should use `--blue-hover` and show a pointer cursor.
- Footer social icons should stay `xsmall` by default, with the Substack icon intentionally overridden to `17px` square for visual balance.

## Typography

- Instrument Serif is the display/editorial font. Use it at weight 400 with its native zero letter spacing for `h1`, `h2`, hero/name typography, page titles, article titles, and other major editorial headings. Never bold it, apply custom tracking, or stretch it with `scaleX()`.
- Inter is the main prose/body font for paragraphs, descriptions, long-form writing, buttons, and normal UI copy.
- Instrument Sans is the secondary UI font for nav, breadcrumbs, dates, metadata, locations, tags, eyebrow text, status labels, chips, and other small UI elements.
- Geist Mono is removed and must not be restored as a stylistic font.
- Literal `code` and `pre` content uses the system monospace stack only.
- Article headings `h1`-`h4` use Instrument Serif. Smaller headings `h5`/`h6`, post card titles, and article bodies stay in Inter unless explicitly requested otherwise.
- Route-level page headers such as `Writing` and `Signals` should use the responsive scale `text-3xl sm:text-4xl`; Signals timeline age labels should use `text-sm sm:text-base`, item titles `text-base sm:text-lg`, and descriptions `text-sm sm:text-base`.
- Use the global tokens:
  - `--font-family`
  - `--font-family-display`
  - `--font-family-ui`
  - `--font-family-code`
- Reusable typography classes exist in `src/index.css`:
  - `.ui-label`
  - `.identity-name`
  - `.h1-tagline`

## Blog Rules

- Source of truth: `src/constants/prerenderedPosts.json`.
- Never add runtime fetching for Substack content inside React components.
- Updater: `scripts/update-substack-cache.ts`.
- Run locally: `npm run update:substack`.
- Cache updater workflow: `.github/workflows/update-substack-cache.yml`.
- Blog item shape must include: `title`, `pubDate`, `link`, `guid`, `author`, `thumbnail`, `description`, `content`, `enclosure{link,type}`, `categories[]`.
- `pubDate` must match `YYYY-MM-DD HH:mm:ss`.
- Sort posts descending by `pubDate`, with explicit deterministic tie-breakers such as `guid` ascending.
- Blog CSS should follow Warm Precision:
  - Cards use `--surface` and `--border`.
  - Card hover/focus backgrounds use neutral `--surface-muted`, never a blue-tinted surface.
  - Blog preview card background hover/focus timing should use the same `--link-transition-duration` and `--link-transition-easing` tokens as shared link hover transitions.
  - Linked blog card titles and linked post titles should keep a subtle `--blue-border` underline at rest and promote to `--blue-hover` on hover/focus.
  - Blockquotes use neutral `--surface`, normal `--border`, a `4px` `--blockquote-accent` left border, and `--text`; this is the only orange UI usage.
  - Code uses `--surface-muted`, `--text`, and `--border`.
  - Metadata uses `--muted`.
  - Article byline authors should use normal text weight, not bold.
  - Long-form writing body text should use `--muted`, while article headings and strong text should use `--text`.
  - Article bottom CTAs such as `Read on Substack` should use normal text weight, not bold.
  - Writing previews on `/writing` and the home page should share the same Substack-style article row layout: title, short description, and date metadata with normal month capitalization; omit the author name and omit preview thumbnails.
  - `src/components/Blog/BlogFeed.tsx` should rely on normalized post data and avoid defensive existence/error guards in preview rendering.
  - Writing preview titles should promote to the shared hover state when any part of the preview card is hovered or keyboard-focused, not only when the title text itself is hovered.
  - The home page writing section should render only the two most recent posts from the shared preview component and link to `/writing` for the full archive.
  - `src/components/Blog/BlogFeed.css` should keep only blog-specific typography rules that are not already covered by shared utilities in `src/index.css`; handle BlogFeed spacing, margins, padding, sizing, and shared link underline behavior inline or via existing shared classes.

## React Conventions

- Components: PascalCase.
- Functions and variables: camelCase.
- Routes and URL paths: kebab-case.
- Keep modules focused; extract helpers before files become hard to scan.
- Use stable keys such as `guid`, `link`, or slug.
- Use `useMemo` for reusable derived lists when helpful.
- Avoid side effects during render.
- External links leaving the site must include `target="_blank"` and `rel="noopener noreferrer"`.

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Update Substack cache: `npm run update:substack`

## Validation Workflow

- For code changes, run `npm run build` and `npm run lint` unless the change is documentation-only.
- For changes to repo skills, run:
  - `py C:\Users\jacob\.codex\skills\.system\skill-creator\scripts\quick_validate.py .codex\skills\<skill-name>`
- Do not run broad formatting unless requested or necessary.
- If validation cannot be run, state that clearly in the final response.

## CI/CD

- Deploy workflow: `.github/workflows/deploy.yml`.
- Cache updater workflow: `.github/workflows/update-substack-cache.yml`.
- Keep deterministic outputs to avoid noisy diffs.

## Git Hygiene

- Do not revert user changes you did not make.
- Keep edits scoped and reviewable.
- Work with dirty files when needed; do not discard unrelated changes.
- Do not use destructive git commands unless explicitly requested.
