# Data-Driven Components: Projects & Timeline

**Date:** 2026-04-13
**Scope:** Extract hardcoded project cards (home page) and timeline chapters (about page) into typed TypeScript data files under `$lib/data/`.

## Context

The portfolio currently hardcodes all repeatable content directly in Svelte page markup. Navigation (`Nav.svelte`) is the only data-driven component, using a typed array with `{#each}`. This spec extends that pattern to the two highest-value repeatable sections: project cards and timeline chapters.

Out of scope: mdsvex article content, footer links, personal passions, and any route generation. The mdsvex workflow will be handled separately.

## Approach

TypeScript data files (`.ts`) exporting typed arrays, chosen over plain JSON for:
- Autocomplete and inline type errors at the definition site
- Ability to add computed fields or helpers later
- Familiar editing experience for a technical user

## Files to Create

### `src/lib/data/types.ts`

Shared type definitions for all data-driven content.

```ts
/**
 * Icons use Material Symbols Outlined:
 * https://fonts.google.com/icons?icon.set=Material+Symbols
 */

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  image: { src: string; alt: string };
  cta: string;
}

export interface TimelineChapter {
  dateRange: string;
  color: 'primary' | 'secondary' | 'tertiary';
  title: { prefix: string; italic: string };
  description: string;
  detail: {
    icon: string;
    label: string;
    sub: string;
  };
  image: {
    src: string;
    alt: string;
    aspect: '4/3' | '3/4' | '1/1';
  };
}
```

### `src/lib/data/projects.ts`

Exports `projects: Project[]` with the 3 current entries extracted verbatim from the home page.

Fields per entry:
- `slug` — URL-friendly identifier, ready for future `/entries/{slug}` routes
- `tags` — array of topic labels; cards render `tags[0]` as the category badge
- `image.src` / `image.alt` — current Google Photos URLs and descriptive alt text
- `cta` — the call-to-action link text (e.g. "Read Analysis")

### `src/lib/data/timeline.ts`

Exports `timeline: TimelineChapter[]` with the 3 current chapters extracted verbatim from the about page.

Fields per entry:
- `color` — drives the MD3 color token used for the timeline dot, date label, icon container, and image overlay (`bg-{color}`, `text-{color}`, `bg-{color}-container/30`, `bg-{color}/10`)
- `title.prefix` / `title.italic` — the two parts of the headline (e.g. "The Binary" + "Origins")
- `detail.icon` — Material Symbol name rendered inside a colored container
- `image.aspect` — controls the `aspect-[...]` class on the image container

## Files to Modify

### `src/routes/+page.svelte`

1. Add import: `import { projects } from '$lib/data/projects';`
2. Replace the 3 hardcoded `<article>` blocks (lines ~91-230) with a single `{#each projects as project}` loop
3. Inside the loop body, substitute hardcoded values with `project.title`, `project.tags[0]`, `project.date`, `project.readTime`, `project.description`, `project.image.src`, `project.image.alt`, `project.cta`
4. Link `href` uses `project.slug` (e.g. `href="/entries/{project.slug}"`)

### `src/routes/about/+page.svelte`

1. Add import: `import { timeline } from '$lib/data/timeline';`
2. Replace the 3 hardcoded chapter `<div>` blocks (lines ~34-154) with a single `{#each timeline as chapter, i}` loop
3. Layout alternation: `i % 2 === 0` renders image-left/text-right, odd renders text-left/image-right
4. Color tokens resolved via a lookup map (not string interpolation — Tailwind purges dynamic class names). A `colorClasses` record maps each `color` value to its full class strings for text, background, container, and overlay.
5. Timeline dot position adjusts based on alternation (left offset vs right offset)
6. Image aspect ratio set via a similar lookup or inline style (`aspect-ratio: ${chapter.image.aspect}`)

## Design Decisions

| Decision | Rationale |
|---|---|
| `.ts` files over `.json` | Type checking at definition site, autocomplete, room for helpers |
| `tags: string[]` over `category: string` | Flexible; cards show `tags[0]`, future views can show all |
| `slug` included now | Cards are ready to link when mdsvex routing lands |
| No `layout` field on timeline | Alternation is a rendering concern, derived from index |
| `aspect` as union enum | Constrains to the 3 ratios used in the design, prevents typos |
| No new components | Loop body uses existing markup; avoids premature abstraction |
| Color as string union | Maps directly to Tailwind MD3 token classes |

## Verification

- Home page renders identically before and after (same cards, same order, same styles)
- About page renders identically before and after (same chapters, same alternation, same colors)
- TypeScript compiles with no errors
- Adding/removing an entry in the `.ts` file adds/removes the corresponding card or chapter
