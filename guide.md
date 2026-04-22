# Portfolio authoring guide

This repo uses **mdsvex** (markdown + Svelte) for long-form pages so the content lives in plain `.md` files with a YAML frontmatter and a handful of Svelte components — no Tailwind classes or layout divs in the markdown itself.

If you're adding a new entry (technical write-up, journal post, project case study, timeline item…), this guide is the one-stop reference. Read the [Non-negotiable rules](#non-negotiable-rules) first.

## Table of contents

- [Quick start: add a new entry](#quick-start-add-a-new-entry)
- [Folder conventions](#folder-conventions)
- [Frontmatter & layouts](#frontmatter--layouts)
- [Component reference](#component-reference)
- [Non-negotiable rules](#non-negotiable-rules)
- [Adding a new layout](#adding-a-new-layout)
- [Adding a new entry component](#adding-a-new-entry-component)
- [Planned routes (timeline, projects, …)](#planned-routes-timeline-projects-)
- [Troubleshooting](#troubleshooting)

## Quick start: add a new entry

1. Create `src/routes/entries/<slug>/+page.md`.
2. Write a YAML frontmatter block that picks one of the existing layouts (`technical`, `scholarly`) — see [Frontmatter & layouts](#frontmatter--layouts).
3. Add a `<script>` tag that imports only the components you need from `$lib/components/entries/`.
4. Compose the page using those components and plain markdown (headings, paragraphs, lists). The layout styles `h2`, `p`, `a` etc.; components own their own styling.
5. Open `http://localhost:5173/entries/<slug>` and check it on mobile width too.

Two working references to copy from:

- `src/routes/entries/technical/+page.md` — dense technical write-up, `technical` layout.
- `src/routes/entries/journal/+page.md` — editorial/journal, `scholarly` layout.

## Folder conventions

```
src/
├── lib/
│   ├── components/
│   │   ├── Nav.svelte, Footer.svelte, …      # site chrome
│   │   └── entries/                          # content building blocks for entries
│   │       ├── ContentCard.svelte            # (technical) 2-col white card
│   │       ├── SectionHeader.svelte          # (technical) numbered section
│   │       ├── CodeSection.svelte            # (technical) sidebar + code 2-col
│   │       ├── CodeEditor.svelte             # (technical) dark code pane
│   │       ├── MathBlock.svelte              # (technical) equation block
│   │       ├── PipelineDiagram.svelte        # (technical) icon flow
│   │       ├── StatCard.svelte               # (technical) stat highlight
│   │       ├── LatencyCard.svelte            # (technical) progress bars
│   │       ├── FeaturePoint.svelte           # (technical) accent bullet
│   │       ├── CTAButton.svelte              # (shared)    link / button
│   │       ├── IntroSection.svelte           # (scholarly) two-col prose + image
│   │       ├── CodeSnippet.svelte            # (scholarly) terminal-style snippet
│   │       ├── BentoGrid.svelte              # (scholarly) 4-col titled grid
│   │       ├── BarChart.svelte               # (scholarly) bar chart tile
│   │       ├── HighlightStat.svelte          # (scholarly) big-number tile
│   │       ├── InfoCard.svelte               # (scholarly) icon + copy tile
│   │       ├── EfficiencyBars.svelte         # (scholarly) progress tile
│   │       ├── WideCard.svelte               # (scholarly) spanning tile
│   │       ├── ProseSection.svelte           # (scholarly) centered prose + tags
│   │       └── Divider.svelte                # (shared)    atmospheric rule
│   └── layouts/
│       ├── technical.svelte                  # registered as layout: technical
│       └── scholarly.svelte                  # registered as layout: scholarly
└── routes/
    └── entries/
        ├── +page.svelte                      # entries index
        ├── technical/+page.md                # example technical entry
        └── journal/+page.md                  # example scholarly entry
```

- Entries always live under `src/routes/entries/<slug>/+page.md`. The URL becomes `/entries/<slug>`.
- Entry building blocks always live under `src/lib/components/entries/`.
- Layouts always live under `src/lib/layouts/` and must be registered in `svelte.config.js`.

## Frontmatter & layouts

Layouts are registered in `svelte.config.js`:

```js
mdsvex({
    extensions: ['.svx', '.md'],
    layout: {
        technical: join(import.meta.dirname, 'src/lib/layouts/technical.svelte'),
        scholarly: join(import.meta.dirname, 'src/lib/layouts/scholarly.svelte')
    }
})
```

Pick one by setting `layout:` in frontmatter; all other frontmatter keys become props on the chosen layout.

### `layout: technical`

Hero with small label, 2-line title (one plain + one italic), subtitle, author avatars, date/readTime. Meant for deep technical write-ups.

| Prop          | Type             | Required | Notes                                              |
| ------------- | ---------------- | -------- | -------------------------------------------------- |
| `title`       | string           | yes      | Plain first line.                                  |
| `titleItalic` | string           | no       | Italic second line (rendered on a new row).        |
| `subtitle`    | string           | yes      | One-paragraph lede.                                |
| `label`       | string           | yes      | Tiny uppercase kicker, e.g. `Technical // ARCH-012`. |
| `authors`     | `{name}[]`       | no       | Array of authors; shown as avatar stack + names.   |
| `date`        | string           | no       | E.g. `June 14, 2024`.                              |
| `readTime`    | string           | no       | E.g. `12 min`.                                     |
| `footer`      | `'expanded' \| 'simple'` | no | Default `expanded`.                                |

### `layout: scholarly`

Full-bleed gradient hero with badge chip, italic headline, author portrait, publish date. Meant for editorial / journal entries.

| Prop         | Type                                         | Required | Notes                             |
| ------------ | -------------------------------------------- | -------- | --------------------------------- |
| `title`      | string                                       | yes      | Rendered italic.                  |
| `subtitle`   | string                                       | yes      | Lede under the title.             |
| `badge`      | string                                       | no       | Kicker chip text. Supports HTML entities. |
| `badgeIcon`  | string                                       | no       | Material Symbols name; default `science`. |
| `author`     | `{name, role?, image?}`                      | no       | Single author block.              |
| `date`       | string                                       | no       | Publish date.                     |
| `footer`     | `'expanded' \| 'simple'`                     | no       | Default `simple`.                 |

### Example frontmatter

```md
---
layout: scholarly
title: 'The Spectral Rhythm of Global Trade'
subtitle: 'A deep-layered decomposition of seasonal maritime data.'
badge: 'Scholarly Inquiry &bull; Vol. 04'
badgeIcon: 'science'
author:
  name: 'Dr. Julian Vane'
  role: 'Lead Researcher'
  image: 'https://…'
date: 'Oct 14, 2024'
footer: simple
---
```

## Component reference

Every entry component is written in **legacy Svelte mode** (`export let`, `<slot>`, `$$slots`) — this is intentional, see [Non-negotiable rules](#non-negotiable-rules). Import only what you use.

> **Material Symbols icon names.** Every prop labelled "icon" takes a [Material Symbols](https://fonts.google.com/icons) name (e.g. `hub`, `terminal`, `bolt`, `analytics`).

### Shared

#### `CTAButton`

Inline "read more" arrow link, or a prominent filled button.

| Prop      | Type                | Default  |
| --------- | ------------------- | -------- |
| `href`    | string              | `'#'`    |
| `variant` | `'link' \| 'button'`| `'link'` |
| `icon`    | string              | `''`     |

Default slot = button label.

```md
<CTAButton href="#">View Implementation on GitHub</CTAButton>
<CTAButton variant="button" icon="rocket_launch" href="/demo">Launch Demo</CTAButton>
```

#### `Divider`

No props, no slots. Centered thin rule with generous vertical padding — a breather between sections.

```md
<Divider />
```

### Technical layout blocks

#### `ContentCard`

White rounded card. Three modes, chosen automatically:

- **One column** — default slot only.
- **Two column** (desktop) — provide `left` and `right` named slots.
- **Flush** — `flush` prop, no inner padding (use when the child is edge-to-edge).

| Prop      | Type    | Default  |
| --------- | ------- | -------- |
| `flush`   | boolean | `false`  |
| `spacing` | string  | `'mb-40'`|

```md
<ContentCard>
<div slot="left">

## Heading
Paragraph text.

</div>
<div slot="right">

<MathBlock … />

</div>
</ContentCard>
```

#### `SectionHeader`

Numbered/labelled section with optional CTA pill, then either a `main` + `side` 2-col grid or a single default slot.

| Prop          | Type   | Required |
| ------------- | ------ | -------- |
| `number`      | string | yes      |
| `section`     | string | yes      |
| `title`       | string | yes      |
| `buttonLabel` | string | no       |
| `buttonIcon`  | string | no       |
| `buttonHref`  | string | no (`'#'`)|

#### `CodeSection`

Rounded card with a sidebar (explanatory copy) and a code pane (typically a `CodeEditor`).

| Prop         | Type   | Required |
| ------------ | ------ | -------- |
| `label`      | string | yes      |
| `title`      | string | yes      |
| `titleLine2` | string | no       |
| `ctaLabel`   | string | no       |
| `ctaIcon`    | string | no       |
| `ctaHref`    | string | no (`'#'`)|

Named slots: `sidebar`, `code`.

#### `CodeEditor`

Dark terminal-style pane. Renders traffic-light dots, filename, optional notes footer. Put a `<pre>…</pre>` inside the default slot with inline spans for syntax highlighting. Horizontal scrollbar is already wired up for mobile.

| Prop       | Type   | Required |
| ---------- | ------ | -------- |
| `filename` | string | yes      |
| `notes`    | string | no       |

#### `MathBlock`

Equation display with optional tag pills and label.

| Prop       | Type                                               | Required |
| ---------- | -------------------------------------------------- | -------- |
| `equation` | string (HTML allowed — rendered via `{@html}`)     | yes      |
| `tags`     | `{label, color: 'primary' \| 'secondary'}[]`       | no       |
| `label`    | string                                             | no       |

#### `PipelineDiagram`

Icon-flow diagram with a headline, description, and `steps` pills. Responsive: stacks vertically on mobile.

| Prop          | Type                                                                    | Required |
| ------------- | ----------------------------------------------------------------------- | -------- |
| `icon`        | string (Material Symbols)                                               | no (`'hub'`) |
| `title`       | string                                                                  | yes      |
| `description` | string                                                                  | yes      |
| `steps`       | `{icon, label, color: 'primary' \| 'secondary' \| 'tertiary'}[]`        | no       |

#### `StatCard`

Solid-primary highlight card with big value, label, corner sublabel.

| Prop       | Type   | Required |
| ---------- | ------ | -------- |
| `icon`     | string | yes      |
| `value`    | string | yes      |
| `label`    | string | yes      |
| `sublabel` | string | no       |

#### `LatencyCard`

Title + description + stacked progress bars with start/end labels.

| Prop          | Type                                                                            | Required |
| ------------- | ------------------------------------------------------------------------------- | -------- |
| `title`       | string                                                                          | yes      |
| `description` | string                                                                          | yes      |
| `bars`        | `{pct, color: 'primary' \| 'secondary' \| 'tertiary' \| 'outline-variant'}[]`   | no       |
| `labels`      | string[]                                                                        | no       |

#### `FeaturePoint`

Colored accent bar + title + small description. Used inside sidebars.

| Prop          | Type                              | Required |
| ------------- | --------------------------------- | -------- |
| `color`       | `'primary' \| 'secondary'`        | no (`'primary'`) |
| `title`       | string                            | yes      |
| `description` | string                            | yes      |

### Scholarly layout blocks

#### `IntroSection`

Two-column intro: a prose column (named slot `prose`) on the left, an optional image on the right.

| Prop       | Type   | Required |
| ---------- | ------ | -------- |
| `image`    | string | no       |
| `imageAlt` | string | no       |

#### `CodeSnippet`

Terminal-ish snippet with an icon bullet in the margin. For one-liners and two-liners (not full listings — use `CodeEditor` for that).

| Prop   | Type   | Default      |
| ------ | ------ | ------------ |
| `icon` | string | `'terminal'` |

Default slot = code lines; use `<br />` between lines.

#### `BentoGrid`

Section wrapper that lays out its children in a responsive 1 → 2 → 4 column bento grid. All scholarly tile components below are designed to drop in here.

| Prop    | Type   | Required |
| ------- | ------ | -------- |
| `title` | string | no       |

#### `BarChart` (bento tile)

Spans 2 columns. Title + label + vertical bars + caption.

| Prop      | Type                       | Required |
| --------- | -------------------------- | -------- |
| `label`   | string                     | no       |
| `title`   | string                     | no       |
| `caption` | string                     | no       |
| `bars`    | `{pct, color}[]`           | no       |

`color` uses full Tailwind utility names, e.g. `'bg-primary-container'`, `'bg-secondary-container'`.

#### `HighlightStat` (bento tile)

Single square tile, primary background, huge italic number.

| Prop    | Type   | Required |
| ------- | ------ | -------- |
| `value` | string | yes      |
| `label` | string | yes      |

#### `InfoCard` (bento tile)

Icon + title + description tile.

| Prop          | Type   | Default              |
| ------------- | ------ | -------------------- |
| `icon`        | string | `''`                 |
| `iconColor`   | string | `'text-secondary'`   |
| `title`       | string | — (required)         |
| `description` | string | — (required)         |

#### `EfficiencyBars` (bento tile)

Small tile with a top accent bar, title, optional icon, and horizontal progress bars.

| Prop    | Type                  | Default              |
| ------- | --------------------- | -------------------- |
| `title` | string                | — (required)         |
| `icon`  | string                | `'trending_up'`      |
| `bars`  | `{pct, color?}[]`     | `[]`                 |

#### `WideCard` (bento tile)

Spans 3 columns on desktop. Horizontal card with copy on the left and an image on the right.

| Prop          | Type   | Required |
| ------------- | ------ | -------- |
| `title`       | string | yes      |
| `description` | string | yes      |
| `image`       | string | no       |
| `imageAlt`    | string | no       |

#### `ProseSection`

Centered max-width prose with a headline, optional hashtag pills, and a heavy blockquote style. Use it for the closing narrative of an entry.

| Prop    | Type     | Required |
| ------- | -------- | -------- |
| `title` | string   | no       |
| `tags`  | string[] | no       |

## Non-negotiable rules

These are all paper-cuts the codebase has already paid for. Don't re-learn them.

1. **Never write Tailwind classes or layout `<div>`s in `+page.md`.** If you catch yourself reaching for one, that's a signal you need a new entry component — add it to `src/lib/components/entries/` and use it from the markdown. Author experience is the whole point of this system.

2. **Legacy Svelte mode throughout the entry pipeline.** Every file under `src/lib/layouts/` and `src/lib/components/entries/` must use `export let`, `<slot>`, `<slot name="…">`, and `$$slots.name` — **not** `$props()` / `{@render children()}`. `svelte.config.js` already forces `runes: false` for `.md`, `lib/layouts/`, and `components/entries/`; match that when adding files. Svelte 5's interop does not reliably pass named slots across the legacy/runes boundary, so the whole chain must be legacy.

3. **Keep Svelte component tags on a single line in `.md` files.** A closing `>` on its own line gets parsed by markdown as the start of a blockquote and blows up the build (`</blockquote> attempted to close an element that was not open`).

4. **`*.md` is in `.prettierignore`.** Leave it there. Prettier reflows long component props across lines (see rule 3) and breaks the build. Format markdown by hand.

5. **No dynamic Tailwind class names.** Tailwind 4 only ships classes it can see as full literal strings. Things like `md:col-span-{span}` or `bg-${color}-500` silently get purged. Use a `colorMap` / `bgColorMap` object that maps a prop to a complete class name — there are examples in `PipelineDiagram.svelte`, `LatencyCard.svelte`, `MathBlock.svelte`.

6. **Design responsive from the first commit.** Start with `px-4 md:px-8`, scale padding with `p-6 md:p-12 lg:p-24`, shrink headings on mobile (`text-2xl md:text-3xl`). For anything that can overflow (math, code, wide tables) add `overflow-x-auto` on the scroll container **and** `min-width: 0` on its parent grid cell — CSS grid cells default to `min-width: auto`, which silently defeats inner scrollbars (see `CodeSection.svelte` `.code-col`).

7. **Scope layout prose styles so they don't leak into components.** Layouts style markdown paragraphs with `:global(p:not([class]))` — the `:not([class])` keeps component internals (which usually have utility classes) untouched. Follow the same pattern in any new layout.

8. **Put blank lines around Svelte tags inside named slots.** mdsvex only parses content as markdown if it's separated from surrounding tags by blank lines:

    ```md
    <ContentCard>
    <div slot="left">

    ## This heading renders

    </div>
    </ContentCard>
    ```

9. **Don't start the dev server.** One is already running on `http://localhost:5173` (Windows side). Fetch that URL to verify renders; don't spin up a new one.

10. **Don't commit unless explicitly asked.** When a change is done, suggest a commit message as a bulleted summary and wait.

## Adding a new layout

Use this when an entry type needs a genuinely different hero/footer chrome (e.g. `project`, `timeline-entry`). Reuse an existing layout when you only need different *content* — that's what components are for.

1. Create `src/lib/layouts/<name>.svelte` in **legacy Svelte mode**. Export one `export let` per frontmatter field. Render a `<slot />` where the markdown body goes. End with `<Footer variant={footer} />` if you want the shared footer.
2. Style markdown elements inside the slot with `:global(h2)`, `:global(p:not([class]))`, etc. — see `scholarly.svelte` for the pattern.
3. Register it in `svelte.config.js` under `mdsvex({ layout: { … } })` with `join(import.meta.dirname, 'src/lib/layouts/<name>.svelte')`.
4. Document its frontmatter props in this guide, under [Frontmatter & layouts](#frontmatter--layouts).

## Adding a new entry component

1. Create `src/lib/components/entries/<Name>.svelte` in **legacy Svelte mode**.
2. Accept data via `export let` props, not via children, whenever the data is just strings/numbers/arrays. Use default slots only for actual markup / nested content (like code bodies). Use named slots when you need multi-region layout.
3. Encapsulate *all* layout and styling inside the component. The markdown author should only pass content, never classes.
4. Handle responsiveness inside the component (see rule 6).
5. If you need variants (color, size), map them with a static object (see rule 5).
6. Add an entry in the [Component reference](#component-reference) with props, slots, and a one-line usage example.

## Planned routes (timeline, projects, …)

The `entries` pattern is the intended model for any future long-form route:

- **`/entries/<slug>`** — single long-form pages (already live for `technical`, `journal`). Add more by dropping a new `+page.md` under `src/routes/entries/` using one of the existing layouts.
- **`/timeline`** — will likely be an index page that lists entries chronologically. When we build it, timeline *items* should live under `src/routes/entries/` (not a separate folder) and the timeline page reads their frontmatter.
- **`/projects/<slug>`** — if these get bespoke chrome (project header, tech stack, screenshots), add a `project` layout following [Adding a new layout](#adding-a-new-layout). If they're similar to a journal entry, reuse `scholarly` and add project-specific tile components.

Rule of thumb: prefer one shared entries folder + multiple layouts over parallel content folders. It keeps navigation, chronology, and search working across everything.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Build error: `</blockquote> attempted to close an element that was not open` | Prettier or a hand-edit put a closing `>` of a component tag on its own line. | Put the full opening tag on one line; confirm `*.md` is still in `.prettierignore`. |
| Error: `ENOENT … src/lib/layouts/<name>.svelte` | Layout path is relative in `svelte.config.js`. | Use `join(import.meta.dirname, 'src/lib/layouts/<name>.svelte')`. |
| Component renders as `<!---->` (invisible) | A layout or component is in runes mode while the chain around it is legacy (or vice-versa). | Ensure `svelte.config.js` `compilerOptions.runes` returns `false` for the file, and the file uses `export let` / `<slot>`. |
| Content clipped on mobile, no scrollbar | Parent grid cell has `min-width: auto`. | Add `min-width: 0` to that cell (CSS or a utility) and `overflow-x-auto` on the scrollable child. |
| Color prop silently shows the default | Dynamic Tailwind class name. | Replace string interpolation with a map of full class names; add that class literally somewhere Tailwind can see it. |
| Markdown inside a component's named slot renders as raw HTML-ish text | No blank lines around the inner content. | Add a blank line after the opening `<div slot="…">` and before the closing `</div>`. |
| Layout paragraph styles bleed into components | Layout used `:global(p)` without an attribute filter. | Use `:global(p:not([class]))` so utility-classed paragraphs inside components are skipped. |
