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

- Home route renders hero copy plus a concise expandable experience list.
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
- `docs/design-references/matthew-trent.md` - durable memory of Matthew’s icon inventory, local assets, and accordion motion reference.
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
- Content photography should use the shared `InteractiveImage` treatment and `ImageLightbox`; decorative icons and company logos are excluded.
- Use the reusable `SectionRail` for fixed desktop section navigation. Home entries map to its three major sections. Article rails begin with the article title, followed by entries derived from stable H2-H4 ids. Article marker length and indentation must show heading depth (title/H2 full, H3 nested, H4 nested further). Markers progressively fill blue through each section, completed sections remain blue, and a section starts at 1% fill. Markers expand only while hovered or keyboard-focused, never merely because they are active. Rail hit areas must fill the visual gaps between markers. Hover labels use `--bg` behind the text for legibility. Section targets must clear the `6rem` sticky header with a `7rem` scroll margin. Hide the rail below `900px`.
- Reused timeline-style sections should share the same line/marker CSS rather than duplicating timeline visuals.
- Home experience uses the page-local `ExperienceList` accordion; Signals keeps `LabeledTimeline`. Keep their responsive layouts separate.
- Timeline row spacing should be configurable on timeline components via a single prop rather than hardcoded per page or repeated per item.
- Home experience uses five initially collapsed accordion rows: AT&T, Auburn University, Adtran, IS4S, Epic Games. Only one row may be open; opening another closes the previous one, and clicking the open row closes it. Summaries show company, muted role, year, and a neutral plus that rotates to a cross when open. Draw the toggle with two centered bars inside a fixed 12px square; rotate around its exact center and extend the arms to 115% during rotation for a restrained cross size. Desktop uses dotted leaders (2px dots at 8px intervals) and right-aligned dates; at widths up to `760px`, stack company, role, and date on separate left-aligned rows, with the plus/cross in a fixed far-right column aligned with the company title. Use whitespace rather than solid row dividers, compact row spacing, and a 450ms height/reveal transition with smooth acceleration and deceleration with immediate reduced-motion behavior. Every experience requires a concise, factual description sentence in its data; expanded content contains only that sentence and the company link; omit secondary notes such as employment type, month ranges, and previous-intern labels; do not invent missing skills or achievements. Combine AT&T employment/internship as `2025–present`. Keep surfaces neutral and hover/focus blue; render a local 20px company logo beside each company name, with empty alt text because the name is adjacent. Company marks may retain original brand colors. Do not render technology icons or lists in experience dropdowns. Expanded company links use `0.8125rem` text. Keep internal spacing compact: `0.5rem` between summary elements, `0.2rem` between mobile company/role/date rows, retain `1rem` top/bottom summary padding when collapsed; animate summary bottom padding to `0.25rem` when expanded, keep no extra top padding on expanded details, and use `0.25rem` between description and company link.
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
  - Scoped content exceptions: `--blockquote-accent`, `--blockquote-bg`, `--image-corner-accent`.
- Use the repo skill `.codex/skills/warm-precision-color-system` for color decisions.
- Color is limited to neutral graphite/paper, off-white/dark text, and one muted-blue interaction family. Photography supplies warmth.
- Light is the default theme. `:root[data-theme='dark']` provides the optional dark alternate.
- Keep every general UI surface neutral (`--bg`, `--surface`, or `--surface-muted`). Never add colored card, code, or badge fills; article blockquotes are the sole colored-surface exception.
- Blue is interaction-only: links, active navigation, hover/focus, selected states, interactive controls, and the scrollbar. Non-interactive decoration must use neutral tokens.
- Orange exists only as `--blockquote-accent`/`--blockquote-bg` on article blockquotes and the slightly brighter `--image-corner-accent` on interactive content-image corner marks. Do not use orange elsewhere. Do not introduce green UI tokens or states.
- Do not add decorative gradients, glassmorphism, pure black, or new accent colors.
- Reusable styles belong in CSS files imported by components.
- Inline Tailwind classes are fine for local layout and one-off spacing.
- Preserve accessibility: focus states, aria labels, descriptive alt text, and readable contrast.
- Do not use one global link style for every surface. Keep separate treatments for nav links, clustered/meta links, inline sentence links, and long-form prose links.
- Meta, inline, prose, and shared underlined text links use a dotted `--text` underline at rest and remain dotted while label and underline transition together over `100ms` to `--blue-hover`. Give smaller `.meta-link` text a slightly thicker dotted decoration for legibility.
- Content text links to external destinations use an inline `↗`; links to another site page use `→`. External markers use the Matthew Trent SVG geometry (16px viewBox, 1.25px stroke) at `1em` with `0.08em` gap and `-0.125em` vertical alignment; internal right-arrow markers use SVG outlines extracted from Matthew Trent’s header Inter weight-500 arrow glyph at `0.75em`. Keep markers aligned with text, inheriting link color through hover/focus. Header links, desktop/mobile navigation, the left section rail, icon-only links, same-page anchors, current-page navigation, and external article-title links have no marker. Article previews use a muted, always-visible 16px right arrow beside the title; the entire row is clickable, with no background wash and a visible keyboard focus outline. The arrow stays stationary and becomes opaque on hover/focus. Preview titles and arrows transition together to `--blue-hover` when the row is hovered or keyboard-focused; back navigation retains a leading left-arrow SVG extracted from the same Inter font and no trailing marker. Home résumé text uses the external `↗` treatment via `.external-text-link`, even though its PDF URL is local. Suppress navigation markers directly on `::after` to avoid selector-specificity overrides.
- Reuse shared link underline utilities from `src/index.css` such as `.meta-link`, `.inline-link`, and `.link-underline`; do not redefine the same underline token logic in component-local CSS when an existing shared class fits.
- Header nav links should stay neutral and undecorated at rest; hover/focus may turn blue. Active nav keeps neutral text with a blue underline.
- Terminal breadcrumb hover/focus states should use `--blue-hover` for the full interactive token, including the `~` home marker and segment labels.
- Keep `GraduationHeadshot` available as a photo asset, but do not render a headshot in the Home hero unless explicitly requested.
- The Home hero places weight-400 `Jacob Murrah` beside one quieter, nonbreaking `/ Software Engineer / Atlanta` group. The full role/location group wraps beneath the name as one unit when needed. Follow it with one concise AT&T/Georgia Tech introduction, one compact wrapping credential row (AT&T Software Engineer, Georgia Tech M.S. CS, Auburn B.E. Software Engineering), icon-only social links, and the `sunset` photo through `InteractiveImage` at full available width with fixed height, `object-cover`, and centered cropping. Do not restore the former proof bullets, multi-paragraph lifestyle copy, or Signals promo in the hero.
- Use the shared centered `✦ ✦ ✦` `SectionDivider` between major Home sections. Normalize intentional article `<hr>` elements to the same ornament with tighter article spacing.
- Keep the mobile navigation overlay and drawer above the sticky header so the header cannot obscure its first item or controls.
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
  - Writing preview rows have no card background, border, or shadow at rest or on hover; keyboard focus uses a `--blue-border` outline. Preview titles match Experience company text: 16px Inter at weight 500, use `--text` at rest and `--blue-hover` on row hover/focus, and have no underline.
  - Linked post titles keep their existing underline and promote to `--blue-hover` on hover/focus.
  - Blockquotes stay within the normal article text width and use light `--blockquote-bg`, a single `4px` `--blockquote-accent` left border, no top/right/bottom borders, and `--text`.
  - Interactive content-image hover/focus uses a subtle neutral outline, restrained scale-up, and four small `--image-corner-accent` L-shaped corner marks. Clicking or pressing Enter/Space opens the shared animated lightbox; any subsequent screen click or Escape closes it. Keep the header above the lightbox, but apply the same tint and slight blur to it while the viewer is open so it recedes with the page. Preserve reduced-motion behavior and apply the same interaction to article media and the Home sunset.
  - Code uses `--surface-muted`, `--text`, and `--border`.
  - Metadata uses `--muted`.
  - Article byline authors should use normal text weight, not bold.
  - Long-form writing body text and strong text should use `--muted`; bold emphasis comes from weight, not a darker color. Article headings use `--text`.
  - Article bottom CTAs such as `Read on Substack` should use normal text weight, not bold.
  - Writing previews on `/writing` and Home share a three-line publication layout: 12px date above a 16px title with an always-visible 16px right arrow, then a 14px muted description. Keep Experience title sizing while making metadata quieter: 16px date line height, 1.375 title/description line height, 4px between date and title, 2px between title and description, and 12px top/bottom row padding without extra list gaps. Keep 12px horizontal hit-area padding extending beyond the text edge so text aligns with the section heading. Keep 16px between the writing introduction and list. Titles wrap naturally on all screens. Dotted leaders belong only to Experience. Keep normal month capitalization; omit author names and preview thumbnails.
  - `src/components/Blog/BlogFeed.tsx` should rely on normalized post data and avoid defensive existence/error guards in preview rendering.
  - Writing row hover/focus turns the title and arrow blue together and increases arrow opacity; do not add a background wash or move the arrow. Keep date and description colors muted; do not scale rows or add shadows.
  - The home page writing section should render only the two most recent posts from the shared preview component and link to `/writing` for the full archive.
  - `src/components/Blog/BlogFeed.css` should keep blog-specific typography and row hover/focus rules that are not already covered by shared utilities in `src/index.css`; handle BlogFeed spacing, margins, padding, sizing, and shared link underline behavior inline or via existing shared classes.

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
