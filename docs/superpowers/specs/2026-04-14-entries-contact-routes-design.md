# Entries & Contact Routes Design Spec

**Date:** 2026-04-14
**Goal:** Add `/entries` catalog page and `/contact` page to the portfolio, merging the migration approach (raw HTML → SvelteKit) with the data-driven approach (typed `.ts` data files + `{#each}` loops).

**Tech Stack:** SvelteKit 2 (Svelte 5 runes), Tailwind CSS v4 (MD3 tokens), Material Symbols Outlined

**Reference HTML:** `src/lib/assets/rawHTML/entries/code.html`, `src/lib/assets/rawHTML/contact/code.html`

---

## 1. Data Model Changes

### Extend `Project` interface

Add `category` field to `src/lib/data/types.ts`:

```ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  category: 'scholarly' | 'technical';
  image: { src: string; alt: string };
  cta: string;
}
```

### Category badge mapping

Used in the entries page as a Tailwind-safe lookup map (same pattern as the about page's `colorClasses`):

| Category    | Container class          | Text class                    | Icon           |
| ----------- | ------------------------ | ----------------------------- | -------------- |
| `scholarly` | `bg-secondary-container` | `text-on-secondary-container` | `auto_stories` |
| `technical` | `bg-primary-container`   | `text-on-primary-container`   | `terminal`     |

### Update existing project entries

| Project             | Category    |
| ------------------- | ----------- |
| Geometry of Silence | `scholarly` |
| Linguistic Drift    | `scholarly` |
| Fractal Patterns    | `technical` |

---

## 2. Entries Page (`/entries/+page.svelte`)

Catalog page showing all projects in a vertical list layout. Data source: `projects` from `$lib/data/projects`.

### Structure

1. **Hero** (`max-w-4xl`, left-aligned)
   - "The Archives" headline — `font-headline text-6xl md:text-8xl`, light weight, tight tracking
   - Descriptive paragraph — `text-lg md:text-xl text-on-surface-variant`
   - Decorative rule — `h-px w-24 bg-primary-fixed-dim opacity-40`

2. **Filter tabs** (`max-w-4xl mx-auto`, horizontal flex with gap)
   - "Analytical Studies" pill — `auto_stories` icon + label, active state with border + shadow
   - "Technical Deep Dives" pill — `terminal` icon + label, inactive hover state
   - "View All" pill — text only, inactive hover state
   - Non-functional for now (no filtering logic)

3. **Entry list** (`max-w-4xl mx-auto`, vertical stack, `gap-12`)
   - Each entry: `grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8`
   - Image column: `md:col-span-5`, `aspect-[16/10] md:aspect-auto`, hover scale-105
   - Content column: `md:col-span-7`, padding `p-8 md:p-10`
     - Category badge: icon + label in colored container (from lookup map)
     - Read time: italic, `text-on-surface-variant text-xs`
     - Title: `font-headline text-3xl md:text-4xl`
     - Description: `text-on-surface-variant text-sm font-light`
     - CTA link: `text-primary font-semibold text-sm`, arrow icon, `href="#"`
   - Card styling: `bg-surface-container-lowest rounded-2xl`, journal-shadow with hover escalation

4. **Footer**: `<Footer variant="simple" />`

---

## 3. Contact Page (`/contact/+page.svelte`)

Static contact form with sidebar. No backend integration.

### Structure

1. **Atmospheric background** (absolute positioned, `-z-10`)
   - Top gradient blob: `ethereal-gradient` (already defined in `layout.css` as `sky-gradient`), `opacity-20`, `blur-3xl`
   - Bottom-right circle: `bg-secondary-container opacity-30 rounded-full blur-3xl`

2. **Header** (`max-w-2xl`, left-aligned on desktop, centered on mobile)
   - "Reach Out" headline — `font-headline text-6xl md:text-7xl lg:text-8xl`
   - Descriptive paragraph — `font-body text-lg md:text-xl text-on-surface-variant`

3. **Two-column grid** (`grid grid-cols-1 lg:grid-cols-12 gap-16`, responsive — stacks on mobile)
   - **Form column** (`lg:col-span-7`)
     - Card: `bg-surface-container-lowest rounded-xl`, journal-shadow, `p-8 md:p-12`
     - Decorative corner gradient (absolute, subtle)
     - Name + Email: side-by-side on desktop (`grid grid-cols-1 md:grid-cols-2 gap-8`)
     - Message textarea: 6 rows
     - Input styling: `bg-surface-container-low border-none rounded-lg p-4`, focus: `ring-2 ring-primary-container bg-surface-container-lowest`
     - Submit button: "Send Inquiry", gradient `from-primary to-primary-dim`, `rounded-full`, `uppercase tracking-widest`
     - Form is static — `<form>` with no action attribute
   - **Sidebar** (`lg:col-span-5 lg:pl-12`)
     - "Other Ways to Connect" heading — `font-headline text-3xl`
     - `<ContactItem>` instances for email and location
     - "Scholarly Networks" heading — `font-label text-xs uppercase`
     - `<SocialLink>` instances for LinkedIn, GitHub, ResearchGate
     - Decorative image — `aspect-[4/3] rounded-2xl`, grayscale + sepia + gradient overlay

4. **Footer**: `<Footer variant="simple" />`

---

## 4. Reusable Components

### `src/lib/components/ContactItem.svelte`

**Props:**

- `icon: string` — Material Symbol name
- `label: string` — uppercase label text
- `value: string` — display value
- `color: 'primary' | 'secondary'` — icon container color

**Renders:** Horizontal row — colored icon circle (48x48, rounded-full) + label/value stack. Hover: `bg-surface-container-low` background transition. Padding `p-4 rounded-xl`.

### `src/lib/components/SocialLink.svelte`

**Props:**

- `name: string` — display name
- `href: string` — URL (default `'#'`)

**Renders:** Full-width row — name left, `north_east` arrow right. `bg-surface-container-low rounded-xl p-4`. Hover: `bg-primary-container/20`, text and icon transition to `text-primary`.

---

## 5. Navigation & Layout Updates

### `src/lib/components/Nav.svelte`

- "Entries" link: change `href` from `/journal` to `/entries`
- "Contact" link: change `href` from `#` to `/contact`

### `src/routes/+layout.svelte`

Add to `routeToPage` map:

```ts
const routeToPage: Record<string, 'home' | 'entries' | 'about' | 'contact'> = {
  '/': 'home',
  '/journal': 'entries',
  '/technical': 'entries',
  '/entries': 'entries',   // NEW
  '/about': 'about',
  '/contact': 'contact'    // NEW
};
```

---

## 6. Files Summary

| Action | File                                                                 |
| ------ | -------------------------------------------------------------------- |
| Modify | `src/lib/data/types.ts` — add `category` to `Project`                |
| Modify | `src/lib/data/projects.ts` — add `category` to each entry            |
| Create | `src/routes/entries/+page.svelte` — entries catalog page             |
| Create | `src/routes/contact/+page.svelte` — contact page                     |
| Create | `src/lib/components/ContactItem.svelte` — reusable contact item      |
| Create | `src/lib/components/SocialLink.svelte` — reusable social link        |
| Modify | `src/lib/components/Nav.svelte` — update Entries and Contact hrefs   |
| Modify | `src/routes/+layout.svelte` — add /entries and /contact to route map |
