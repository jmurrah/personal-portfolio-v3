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
- Reused timeline-style sections should live in a shared component with shared CSS rather than duplicating page-local timeline markup.
- Timeline row spacing should be configurable on the shared `Timeline` component via a single prop rather than hardcoded per page or repeated per item.
- The home experience timeline should show role, company, location, right-aligned dates on the same row, and summary only; keep nothing to the left of the timeline line, and do not reintroduce company logos or technology tag pills there.
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
  - Technical interaction: `--blue`, `--blue-hover`, `--blue-soft`, `--blue-border`.
  - Human/status emphasis: `--orange`, `--orange-hover`, `--orange-soft`, `--orange-border`.
  - Rare operational success: `--green`, `--green-soft`, `--green-border`.
  - Code: `--code-bg`, `--code-text`.
- Preserve compatibility aliases in `src/palette.css` when older call sites still need them, but prefer canonical tokens in touched CSS.
- Use the repo skill `.codex/skills/warm-precision-color-system` for color decisions.
- Color should be sparse: cool-gray neutrals dominate the canvas, warm text/orange provide human contrast, blue signals technical interaction, and green is rare and operational.
- Reusable styles belong in CSS files imported by components.
- Inline Tailwind classes are fine for local layout and one-off spacing.
- Preserve accessibility: focus states, aria labels, descriptive alt text, and readable contrast.
- Do not use one global link style for every surface. Keep separate treatments for nav links, clustered/meta links, inline sentence links, and long-form prose links.
- Meta, inline, and prose text links should use `--blue-border` for the resting underline and transition both label and underline together to `--blue-hover` with a fast `100ms` color-only transition and fixed underline thickness. Keep `--blue-hover` dark enough to reach roughly `10:1` contrast on the light site surfaces while preserving the existing blue family.
- Header nav links should stay neutral and undecorated at rest; use color change for hover/focus and reserve underlines there for active route indication only.
- Terminal breadcrumb hover/focus states should use `--blue-hover` for the full interactive token, including the `~` home marker and segment labels.
- Keep non-link controls such as the hamburger/menu toggle and close button on separate classes so link underline styling only applies to actual links; their hover/focus state should use `--blue-hover` and show a pointer cursor.

## Typography

- Inter is the main prose/body font.
- Geist Mono is the engineering signal font.
- Use Geist Mono for high-signal identity/display elements: nav, terminal breadcrumb, tags, code/pre, route/page `h1` headers, identity/tagline elements, top-level post titles, and blog article `h2` section headings.
- Global typography should assign Geist Mono to semantic `h1` and `h2` elements by default; do not rely on per-element utility classes just to correct their font family.
- Do not use Geist Mono for every heading. Smaller blog headings such as `h3`/`h4`, post card titles, metadata, bylines, action labels, and article bodies should stay in Inter unless the user explicitly asks for a terminal/README feel.
- Geist Mono labels and headings should use natural capitalization such as `Writing`, not forced lowercase, unless the text is intentionally code-like or URL-like.
- Use the global tokens:
  - `--font-family`
  - `--font-family-mono`
- Reusable mono classes exist in `src/index.css`:
  - `.mono-heading`
  - `.mono-label`
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
  - Card interaction can use `--blue-soft` and `--blue-border`.
  - Linked blog card titles and linked post titles should keep a subtle `--blue-border` underline at rest and promote to `--blue-hover` on hover/focus.
  - Blockquotes should carry a subtly warm surface derived from `--surface-muted` and `--orange-soft`, not neutral gray alone.
  - Code uses `--code-bg`, `--code-text`, and `--border`.
  - Metadata uses `--muted`.

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
