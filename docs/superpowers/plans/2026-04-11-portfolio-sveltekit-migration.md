# Portfolio SvelteKit Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate 4 raw HTML portfolio pages (Home, About, Journal Entry, Technical Deep Dive) into a proper SvelteKit app with shared components, routing, and the full Material Design 3 color system — keeping the design pixel-perfect.

**Architecture:** The app uses SvelteKit with file-based routing. Shared UI (nav, footer) lives in `$lib/components/`. The Tailwind v4 theme is configured in `layout.css` using `@theme` with all 40+ custom color tokens from the raw HTML. Each page becomes its own route. Content is static HTML — no CMS, no API.

**Tech Stack:** SvelteKit 2 (Svelte 5 runes), Tailwind CSS v4, Google Fonts (Newsreader + Manrope), Material Symbols Outlined, Netlify adapter.

---

## File Structure

```
src/
├── app.html                          # MODIFY — add Google Fonts + Material Symbols links
├── routes/
│   ├── +layout.svelte                # MODIFY — wrap children with Nav + Footer
│   ├── layout.css                    # MODIFY — add @theme with full color palette + custom utilities
│   ├── +page.svelte                  # MODIFY — replace current About content with Home page
│   ├── about/
│   │   └── +page.svelte              # CREATE — About/Journey page (current +page.svelte content moves here)
│   ├── journal/
│   │   └── +page.svelte              # CREATE — Journal Entry page
│   └── technical/
│       └── +page.svelte              # CREATE — Technical Deep Dive page
└── lib/
    └── components/
        ├── Nav.svelte                # CREATE — shared glass navigation bar
        └── Footer.svelte             # CREATE — shared footer
```

**Key decisions:**
- Nav and Footer are extracted as shared components since they repeat across all 4 pages with minor variations (active link, footer style)
- The About page content currently in `+page.svelte` moves to `/about/+page.svelte`
- The home page (`+page.svelte`) gets the `home_standard_grid_feed` content
- Each page variant (nav active state, footer style) is handled via props
- All 40+ color tokens go into Tailwind v4's `@theme` block as CSS custom properties
- Google Fonts and Material Symbols load from `app.html` `<head>` (not per-component)

---

## Task 1: Configure Tailwind v4 Theme & Global Styles

**Files:**
- Modify: `src/routes/layout.css`
- Modify: `src/app.html`

This task wires up the entire design system: colors, fonts, custom utilities. Everything else depends on this.

- [ ] **Step 1: Add Google Fonts and Material Symbols to `app.html`**

Add font preconnects and stylesheet links inside `<head>`, before `%sveltekit.head%`:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="text-scale" content="scale" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
			rel="stylesheet"
		/>
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

- [ ] **Step 2: Replace `layout.css` with full theme configuration**

Replace the entire contents of `src/routes/layout.css` with:

```css
@import 'tailwindcss';
@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';

@theme {
	/* === Color Palette (Material Design 3 tokens) === */
	--color-primary: #3c5f99;
	--color-primary-dim: #2f538c;
	--color-primary-container: #a1c2ff;
	--color-primary-fixed: #a1c2ff;
	--color-primary-fixed-dim: #92b4f4;
	--color-on-primary: #f8f8ff;
	--color-on-primary-container: #123c74;
	--color-on-primary-fixed: #002755;
	--color-on-primary-fixed-variant: #1e457d;
	--color-inverse-primary: #94b7f7;

	--color-secondary: #993d75;
	--color-secondary-dim: #8b3168;
	--color-secondary-container: #ffd8e9;
	--color-secondary-fixed: #ffd8e9;
	--color-secondary-fixed-dim: #ffc4e0;
	--color-on-secondary: #fff7f8;
	--color-on-secondary-container: #892f67;
	--color-on-secondary-fixed: #721b53;
	--color-on-secondary-fixed-variant: #953971;

	--color-tertiary: #006b66;
	--color-tertiary-dim: #005e59;
	--color-tertiary-container: #55f3e9;
	--color-tertiary-fixed: #55f3e9;
	--color-tertiary-fixed-dim: #41e5db;
	--color-on-tertiary: #e1fffb;
	--color-on-tertiary-container: #005854;
	--color-on-tertiary-fixed: #004440;
	--color-on-tertiary-fixed-variant: #00635e;

	--color-error: #ac3434;
	--color-error-dim: #70030f;
	--color-error-container: #f56965;
	--color-on-error: #fff7f6;
	--color-on-error-container: #65000b;

	--color-surface: #f8f9fc;
	--color-surface-bright: #f8f9fc;
	--color-surface-dim: #d5dbe1;
	--color-surface-variant: #dee3e8;
	--color-surface-tint: #3c5f99;
	--color-surface-container: #ebeef2;
	--color-surface-container-low: #f2f4f7;
	--color-surface-container-lowest: #ffffff;
	--color-surface-container-high: #e5e8ed;
	--color-surface-container-highest: #dee3e8;

	--color-on-surface: #2e3337;
	--color-on-surface-variant: #5a6064;
	--color-on-background: #2e3337;
	--color-background: #f8f9fc;
	--color-outline: #767b80;
	--color-outline-variant: #adb2b8;
	--color-inverse-surface: #0c0f11;
	--color-inverse-on-surface: #9b9da0;

	/* === Typography === */
	--font-headline: 'Newsreader', serif;
	--font-body: 'Manrope', sans-serif;
	--font-label: 'Manrope', sans-serif;

	/* === Border Radius === */
	--radius: 0.25rem;
	--radius-lg: 0.5rem;
	--radius-xl: 1.5rem;
}

/* === Base Styles === */
body {
	font-family: 'Manrope', sans-serif;
	background-color: #f8f9fc;
	color: #2e3337;
	-webkit-font-smoothing: antialiased;
}

/* === Material Symbols === */
.material-symbols-outlined {
	font-variation-settings:
		'FILL' 0,
		'wght' 400,
		'GRAD' 0,
		'opsz' 24;
}

/* === Serif Italic Helper === */
.serif-italic {
	font-family: 'Newsreader', serif;
	font-style: italic;
}

/* === Custom Utilities === */
.glass-nav {
	backdrop-filter: blur(24px);
}

.atmospheric-hero {
	background: linear-gradient(135deg, #a1c2ff 0%, #ffd8e9 100%);
}

.sky-gradient {
	background: linear-gradient(135deg, #a1c2ff 0%, #ffd8e9 100%);
}

.journal-shadow {
	box-shadow: 0 12px 40px rgba(46, 51, 55, 0.06);
}

.timeline-line {
	background: linear-gradient(to bottom, transparent, #3c5f99, #3c5f99, transparent);
}

.divider-fade {
	background: linear-gradient(90deg, transparent, #adb2b8, transparent);
}

.math-block {
	line-height: 1.8;
	letter-spacing: 0.02em;
}
```

- [ ] **Step 3: Verify the dev server starts with the new theme**

Run: `npm run dev`

Expected: Server starts without errors. Visit `http://localhost:5173` — the page should render with the correct color tokens (custom classes like `bg-primary`, `text-on-surface`, `font-headline` should all resolve).

- [ ] **Step 4: Commit**

```bash
git add src/app.html src/routes/layout.css
git commit -m "feat: configure Tailwind v4 theme with full MD3 color palette and fonts"
```

---

## Task 2: Create Shared Nav Component

**Files:**
- Create: `src/lib/components/Nav.svelte`

The nav is nearly identical across all 4 pages. Differences: active link, and the technical deep dive page uses a slightly different style (border-bottom, `uppercase tracking-wider` links vs serif italic links). We'll use props to handle this.

- [ ] **Step 1: Create `src/lib/components/Nav.svelte`**

```svelte
<script lang="ts">
	type NavLink = { label: string; href: string };

	interface Props {
		activePage?: 'home' | 'entries' | 'about' | 'contact';
	}

	let { activePage = 'home' }: Props = $props();

	const links: NavLink[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Entries', href: '/journal' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '#' }
	];
</script>

<nav
	class="fixed top-0 left-1/2 z-50 flex w-full max-w-[1440px] -translate-x-1/2 items-center justify-between bg-white/40 px-12 py-6 backdrop-blur-xl"
>
	<a href="/" class="font-headline text-2xl tracking-tight text-slate-800 italic">Data Artistry</a>
	<div class="hidden items-center gap-12 md:flex">
		{#each links as link}
			{@const isActive = link.label.toLowerCase() === activePage}
			<a
				class={isActive
					? 'border-b-2 border-blue-600/30 font-headline text-lg font-bold text-blue-700 italic'
					: 'font-headline text-lg text-slate-600 italic transition-opacity duration-300 hover:text-blue-500 hover:opacity-80'}
				href={link.href}
			>
				{link.label}
			</a>
		{/each}
	</div>
	<a
		href="#"
		class="from-primary to-primary-dim text-on-primary font-label rounded-full bg-gradient-to-r px-8 py-2.5 text-sm tracking-widest uppercase transition-all hover:opacity-90 active:scale-95"
	>
		Hire Me
	</a>
</nav>
```

- [ ] **Step 2: Verify the component has no TypeScript errors**

Run: `npm run check`

Expected: No errors related to `Nav.svelte`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/Nav.svelte
git commit -m "feat: create shared Nav component with active page support"
```

---

## Task 3: Create Shared Footer Component

**Files:**
- Create: `src/lib/components/Footer.svelte`

The footer varies more across pages. The home page footer is simpler (single row), while the technical deep dive has a multi-column footer. We'll use a `variant` prop.

- [ ] **Step 1: Create `src/lib/components/Footer.svelte`**

```svelte
<script lang="ts">
	interface Props {
		variant?: 'simple' | 'expanded';
	}

	let { variant = 'simple' }: Props = $props();
</script>

{#if variant === 'expanded'}
	<!-- Technical Deep Dive style footer -->
	<footer class="bg-surface-container-highest w-full border-t border-outline-variant/10 px-8 py-24">
		<div class="mx-auto w-full max-w-[1440px]">
			<div class="mb-20 flex flex-col items-start justify-between gap-16 md:flex-row">
				<div class="space-y-6">
					<span class="font-headline text-on-surface text-3xl italic">Editorial Data Artistry</span>
					<p
						class="text-on-surface-variant max-w-xs text-sm uppercase leading-loose tracking-tighter"
					>
						Advancing the intersection of high-fidelity aesthetics and rigorous technical computation.
					</p>
				</div>
				<div class="grid grid-cols-2 gap-12 md:grid-cols-4">
					<div class="space-y-6">
						<h6 class="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Resources</h6>
						<ul class="text-on-surface-variant space-y-4 text-sm">
							<li>
								<a class="hover:text-primary transition-colors" href="#">Documentation</a>
							</li>
							<li>
								<a class="hover:text-primary transition-colors" href="#">API Reference</a>
							</li>
							<li>
								<a class="hover:text-primary transition-colors" href="#">Case Studies</a>
							</li>
						</ul>
					</div>
					<div class="space-y-6">
						<h6 class="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Social</h6>
						<ul class="text-on-surface-variant space-y-4 text-sm">
							<li><a class="hover:text-primary transition-colors" href="#">LinkedIn</a></li>
							<li><a class="hover:text-primary transition-colors" href="#">GitHub</a></li>
							<li>
								<a class="hover:text-primary transition-colors" href="#">ResearchGate</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div
				class="flex flex-col items-center justify-between gap-6 border-t border-outline-variant/10 pt-12 md:flex-row"
			>
				<span class="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
					&copy; 2024 Editorial Data Artistry. Built with scholarly rigor.
				</span>
				<div class="flex gap-4">
					<div
						class="bg-surface-container hover:bg-primary/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
					>
						<span class="material-symbols-outlined text-sm">mail</span>
					</div>
					<div
						class="bg-surface-container hover:bg-primary/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
					>
						<span class="material-symbols-outlined text-sm">share</span>
					</div>
				</div>
			</div>
		</div>
	</footer>
{:else}
	<!-- Simple footer (Home, About, Journal) -->
	<footer class="w-full border-t border-slate-100 bg-slate-50 px-12 py-20">
		<div
			class="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row"
		>
			<div class="font-headline text-lg text-slate-700 italic">Data Artistry</div>
			<div class="text-sm tracking-wide text-slate-500 uppercase">
				&copy; 2024 Emna | Amsterdam-based Data Analytics.
			</div>
			<div class="flex gap-8">
				<a
					class="text-sm tracking-wide text-slate-500 uppercase transition-colors duration-500 hover:text-blue-500"
					href="#">LinkedIn</a
				>
				<a
					class="text-sm tracking-wide text-slate-500 uppercase transition-colors duration-500 hover:text-blue-500"
					href="#">GitHub</a
				>
				<a
					class="text-sm tracking-wide text-slate-500 uppercase transition-colors duration-500 hover:text-blue-500"
					href="#">Medium</a
				>
				<a
					class="text-sm tracking-wide text-slate-500 uppercase transition-colors duration-500 hover:text-blue-500"
					href="#">Kaggle</a
				>
			</div>
		</div>
	</footer>
{/if}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run check`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/Footer.svelte
git commit -m "feat: create shared Footer component with simple and expanded variants"
```

---

## Task 4: Update Layout to Use Shared Components

**Files:**
- Modify: `src/routes/+layout.svelte`

- [ ] **Step 1: Update `+layout.svelte` to import and render Nav and Footer**

Replace the entire file with:

```svelte
<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Emna | Data Analyst</title>
</svelte:head>

<Nav />
{@render children()}
```

**Note:** The Footer is NOT placed in the layout because each page uses a different footer variant. Each page will include its own `<Footer>` at the bottom.

- [ ] **Step 2: Verify the dev server renders the nav correctly**

Run: `npm run dev`

Expected: The navigation bar appears fixed at the top with "Data Artistry" brand, nav links, and "Hire Me" button.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+layout.svelte
git commit -m "feat: integrate shared Nav into root layout"
```

---

## Task 5: Migrate About Page (Move Current Content)

**Files:**
- Create: `src/routes/about/+page.svelte`
- Modify: `src/routes/+page.svelte` (clear it — will be replaced in Task 6)

The current `+page.svelte` contains the About/Journey page. Move it to its own route.

- [ ] **Step 1: Create `src/routes/about/+page.svelte`**

Copy the current `src/routes/+page.svelte` content but:
1. Remove the `<nav>` block (lines 3-30) — Nav is now in the layout
2. Remove the `<footer>` block (lines 283-306) — add `<Footer>` component instead
3. Add the Footer import and component at the bottom
4. Add a `<svelte:head>` for the page title

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>About | Emna — Data Analyst</title>
</svelte:head>

<main class="overflow-hidden pt-32">
	<!-- Story Hero -->
	<section class="mx-auto mb-32 max-w-[1440px] px-12">
		<!-- ... exact content from current +page.svelte lines 34-48 ... -->
	</section>

	<!-- Visual Timeline -->
	<section class="relative mx-auto max-w-[1440px] px-12">
		<!-- ... exact content from current +page.svelte lines 51-181 ... -->
	</section>

	<!-- Personal Passions Section -->
	<section class="bg-surface-container-low px-12 py-32">
		<!-- ... exact content from current +page.svelte lines 183-250 ... -->
	</section>

	<!-- Final CTA -->
	<section class="relative mx-auto max-w-[1440px] px-12 py-40 text-center">
		<!-- ... exact content from current +page.svelte lines 252-280 ... -->
	</section>
</main>

<Footer variant="simple" />
```

The actual content between the section tags is an exact copy of the current `+page.svelte` — just without the nav and footer wrapper. The full content is already known from the current file (307 lines). Copy it verbatim, removing lines 3-30 (nav) and lines 282-306 (footer).

- [ ] **Step 2: Verify `/about` route renders correctly**

Run: `npm run dev`, navigate to `http://localhost:5173/about`

Expected: The About page renders with the timeline, passions section, and CTA — identical to the current homepage. The Nav from the layout shows at the top with "About" not yet highlighted (we'll wire active state in Task 8).

- [ ] **Step 3: Commit**

```bash
git add src/routes/about/+page.svelte
git commit -m "feat: create /about route from existing About page content"
```

---

## Task 6: Migrate Home Page

**Files:**
- Modify: `src/routes/+page.svelte`

Replace the current About content with the Home page from `home_standard_grid_feed/code.html`.

- [ ] **Step 1: Replace `+page.svelte` with Home page content**

Replace the entire file. The content comes from `home_standard_grid_feed/code.html` (lines 99-257), adapted for SvelteKit:
1. Remove `<nav>` (handled by layout)
2. Remove `<footer>` (use Footer component)
3. Convert `data-alt` attributes to `alt`
4. Ensure all custom classes (`atmospheric-hero`, `journal-shadow`, etc.) are used as-is (they're defined in `layout.css`)
5. HTML entities in Svelte: use `&amp;` → `&` since Svelte handles this

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Emna | Data Analyst — Amsterdam</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="atmospheric-hero relative overflow-hidden px-12 pt-48 pb-32">
		<div class="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6">
			<span class="font-label text-on-primary-container/80 text-sm uppercase tracking-widest"
				>Analytical Explorer</span
			>
			<h1
				class="max-w-4xl font-serif text-6xl leading-tight text-on-primary-container italic md:text-8xl"
			>
				Emna — <span class="font-normal opacity-80">Data Analyst in Amsterdam.</span>
			</h1>
			<p class="font-body text-on-primary-container/70 mt-4 max-w-xl text-xl leading-relaxed">
				Bridging the gap between complex algorithms and human intuition. Combining a
				<strong>Bachelor in Computer Science</strong> with a
				<strong>Master's in Big Data Analytics</strong> to uncover the narratives hidden in numbers.
			</p>
			<div class="mt-8 flex gap-4">
				<div
					class="journal-shadow flex items-center gap-4 rounded-xl bg-white/20 px-6 py-4 backdrop-blur-md"
				>
					<span class="material-symbols-outlined text-primary">school</span>
					<div>
						<p class="font-serif text-2xl leading-none text-on-primary-container">BSc</p>
						<p class="font-label text-on-primary-container/60 text-[10px] uppercase tracking-tighter">
							Computer Science
						</p>
					</div>
				</div>
				<div
					class="journal-shadow flex items-center gap-4 rounded-xl bg-white/20 px-6 py-4 backdrop-blur-md"
				>
					<span class="material-symbols-outlined text-secondary">workspace_premium</span>
					<div>
						<p class="font-serif text-2xl leading-none text-on-primary-container">MSc</p>
						<p class="font-label text-on-primary-container/60 text-[10px] uppercase tracking-tighter">
							Big Data Analytics
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- Cloud Decorations -->
		<div class="absolute top-1/4 right-[-10%] h-[600px] w-[600px] rounded-full bg-white/30 blur-[100px]"></div>
		<div class="absolute bottom-[-20%] left-[10%] h-[500px] w-[500px] rounded-full bg-secondary-container/40 blur-[120px]"></div>
	</section>

	<!-- Projects Grid -->
	<section class="bg-surface px-12 py-24">
		<div class="mx-auto max-w-7xl">
			<div class="mb-16 flex flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-end">
				<div class="max-w-md">
					<h2 class="text-on-surface mb-4 font-serif text-4xl">Latest Inquiries</h2>
					<div class="bg-primary-fixed-dim h-[1px] w-24"></div>
				</div>
				<div class="flex flex-wrap gap-4">
					<span
						class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-2 text-xs uppercase tracking-widest"
						>All Projects</span
					>
					<span
						class="hover:bg-surface-container font-label cursor-pointer rounded-md px-4 py-2 text-xs uppercase tracking-widest transition-colors"
						>ML Research</span
					>
					<span
						class="hover:bg-surface-container font-label cursor-pointer rounded-md px-4 py-2 text-xs uppercase tracking-widest transition-colors"
						>Visualizations</span
					>
				</div>
			</div>
			<!-- Project Cards Grid -->
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Project 1 -->
				<article
					class="journal-shadow bg-surface-container-lowest group flex flex-col overflow-hidden rounded-xl border border-outline-variant/10"
				>
					<div class="bg-surface-variant relative aspect-[4/3] overflow-hidden">
						<img
							class="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
							alt="minimalist abstract data visualization with soft pink and blue nodes"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9tAIep-xRYYA0q8UW_NVV-lvhFA41expkHmrrvQ63iX7ytYqQ_zsQt5mjGpv3qVkO1cOL9Wk3gq9XpbyKRlcJwQzmOXiuAnyxkDqC0Zm75cPQRLVkXaUqnwJIk18w3kPA97uaNYnfmk4WahOFVVxmvmWKtdudOdHcWbhwlwwiM1kqxCyk5Ybd-VHygQgQtgh2KMBbvt0J-H6FyGMyjN7-4nNHAhROBMsR3KS9dWfyW1ECVm7QX2X2xFUJja-7u6KyWlvjP0ZhAnk"
						/>
						<div class="absolute top-4 left-4">
							<span
								class="text-on-surface font-label rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm"
								>March 14, 2024</span
							>
						</div>
					</div>
					<div class="flex flex-grow flex-col p-8">
						<div class="mb-4 flex items-center gap-4">
							<span class="text-primary font-label text-[10px] font-bold uppercase tracking-widest"
								>Acoustic Ecology</span
							>
							<span class="text-outline flex items-center gap-1 text-[10px]">
								<span class="material-symbols-outlined text-[14px]">schedule</span> 12 min
							</span>
						</div>
						<h3
							class="text-on-surface group-hover:text-primary mb-4 font-serif text-2xl leading-snug transition-colors"
						>
							The Geometry of Silence: Analysis of Ambient Noise
						</h3>
						<p class="font-body text-on-surface-variant mb-8 text-sm leading-relaxed">
							A longitudinal study exploring frequency correlations with local biodiversity patterns in
							metropolitan hubs.
						</p>
						<div class="mt-auto border-t border-outline-variant/10 pt-6">
							<a
								class="font-label text-primary flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-transform hover:translate-x-2"
								href="#"
							>
								Read Analysis
								<span class="material-symbols-outlined text-sm">arrow_forward</span>
							</a>
						</div>
					</div>
				</article>

				<!-- Project 2 -->
				<article
					class="journal-shadow bg-surface-container-lowest group flex flex-col overflow-hidden rounded-xl border border-outline-variant/10"
				>
					<div class="bg-surface-variant relative aspect-[4/3] overflow-hidden">
						<img
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							alt="scholarly journal with elegant typography next to a prism reflecting light"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkdTJy6JJxIYLF_SEoVJg24958yWijgYep9fp1fSfyChiVIkchDK3G8w4qGSQ-ipT4dUXUWeKbKCziABT5E_rhUtkaDzvnPAhylASkTqPaXwYrzwJleBTSAJ-RAsmf5taRVv2rklERJPrlnwSxcTzPvHnJ-pc0xYlsaH9bP-zOjlug0NRAwEiqmwVAh1b_yL4nHxf3LNjV1lMUHZtzhbUQD0SkgFfO2mOg87BbUnMxgHkWyBwjfJ6Me7nUQl4i-IQKTdFO40yzIXw"
						/>
						<div class="absolute top-4 left-4">
							<span
								class="text-on-surface font-label rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm"
								>Feb 28, 2024</span
							>
						</div>
					</div>
					<div class="flex flex-grow flex-col p-8">
						<div class="mb-4 flex items-center gap-4">
							<span class="text-primary font-label text-[10px] font-bold uppercase tracking-widest"
								>NLP</span
							>
							<span class="text-outline flex items-center gap-1 text-[10px]">
								<span class="material-symbols-outlined text-[14px]">schedule</span> 8 min
							</span>
						</div>
						<h3
							class="text-on-surface group-hover:text-primary mb-4 font-serif text-2xl leading-snug transition-colors"
						>
							Linguistic Drift in Digital Correspondence
						</h3>
						<p class="font-body text-on-surface-variant mb-8 text-sm leading-relaxed">
							Tracking the evolution of semantic meaning through five years of personal email archives
							using NLP and LDA.
						</p>
						<div class="mt-auto border-t border-outline-variant/10 pt-6">
							<a
								class="font-label text-primary flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-transform hover:translate-x-2"
								href="#"
							>
								View Repository
								<span class="material-symbols-outlined text-sm">arrow_forward</span>
							</a>
						</div>
					</div>
				</article>

				<!-- Project 3 -->
				<article
					class="journal-shadow bg-surface-container-lowest group flex flex-col overflow-hidden rounded-xl border border-outline-variant/10"
				>
					<div class="bg-surface-variant relative aspect-[4/3] overflow-hidden">
						<img
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							alt="delicate watercolor style scatter plot with soft pastel points"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwfDv92j92Ll_Xkrhs-6neckDVzBGytjDFLX3PBOch1Rj5a0Lt1MxtKhcKVT3xOb1ZAzsSdEMyrh6FaNd2tAjcIZcqZXww8BwUbv0I0QN0ZbOWUXEeWZzHhVXhh7ig96tu8NBkJhtPxA30V6u44Tx2_W29y0dT7p3a5_e1Xr545871yhH6ciS7AOSJEBRc5QEoHFDHWJgmn8C_aYRzKOHSU1S_1dWbDwX5IOuwG7AbI40Hky_blvZlr9e5Z2H0W63KJsRAjPhFE0U"
						/>
						<div class="absolute top-4 left-4">
							<span
								class="text-on-surface font-label rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm"
								>Jan 12, 2024</span
							>
						</div>
					</div>
					<div class="flex flex-grow flex-col p-8">
						<div class="mb-4 flex items-center gap-4">
							<span class="text-primary font-label text-[10px] font-bold uppercase tracking-widest"
								>Complexity Theory</span
							>
							<span class="text-outline flex items-center gap-1 text-[10px]">
								<span class="material-symbols-outlined text-[14px]">schedule</span> 15 min
							</span>
						</div>
						<h3
							class="text-on-surface group-hover:text-primary mb-4 font-serif text-2xl leading-snug transition-colors"
						>
							Fractal Patterns in Financial Volatility
						</h3>
						<p class="font-body text-on-surface-variant mb-8 text-sm leading-relaxed">
							Exploring why market movements mimic the branching of trees more than the rolling of dice
							in chaotic systems.
						</p>
						<div class="mt-auto border-t border-outline-variant/10 pt-6">
							<a
								class="font-label text-primary flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-transform hover:translate-x-2"
								href="#"
							>
								Full Dataset
								<span class="material-symbols-outlined text-sm">arrow_forward</span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<div class="mt-24 flex justify-center">
				<button
					class="text-on-surface hover:text-primary group flex items-center gap-4 font-serif text-2xl italic transition-colors"
				>
					Enter the Archives
					<span
						class="material-symbols-outlined transition-transform group-hover:translate-x-2"
						>east</span
					>
				</button>
			</div>
		</div>
	</section>

	<!-- Signature Quote -->
	<section class="bg-surface-container-low relative overflow-hidden py-40 text-center">
		<div class="relative z-10 mx-auto max-w-3xl px-12">
			<span class="material-symbols-outlined text-primary-fixed mb-8 text-6xl opacity-30"
				>format_quote</span
			>
			<blockquote class="text-on-surface mb-12 font-serif text-4xl leading-relaxed italic">
				"Data is not just information; it is the visible ripple on the surface of an invisible sea
				of causality."
			</blockquote>
			<cite class="font-label text-outline text-xs uppercase tracking-[0.2em]"
				>Editorial Note &#8470; 001</cite
			>
		</div>
		<div
			class="bg-primary-fixed-dim absolute bottom-0 left-1/2 h-[1px] w-[100px] -translate-x-1/2"
		></div>
	</section>
</main>

<Footer variant="simple" />
```

- [ ] **Step 2: Verify the home page renders correctly**

Run: `npm run dev`, navigate to `http://localhost:5173/`

Expected: The home page shows the atmospheric gradient hero, 3 project cards in a grid, and the signature quote section. All colors, fonts, and shadows match the original HTML.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: migrate Home page with hero, project grid, and quote sections"
```

---

## Task 7: Migrate Journal Entry Page

**Files:**
- Create: `src/routes/journal/+page.svelte`

This is the most content-rich page with the scholarly hero, bento grid, and narrative sections.

- [ ] **Step 1: Create `src/routes/journal/+page.svelte`**

The content comes from `journal_entry_the_data_story/code.html` (lines 110-269). Key adaptations:
1. Remove nav/footer (handled by layout + component)
2. Convert `data-alt` to `alt`
3. The `bg-[url(...)]` texture pattern in the hero uses an external URL — keep as-is
4. The `var(--tw-gradient-stops)` radial gradient syntax needs to stay as-is

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>The Spectral Rhythm of Global Trade | Data Artistry</title>
</svelte:head>

<main class="pt-24">
	<!-- Hero Header -->
	<header class="relative flex min-h-[716px] items-center justify-center overflow-hidden px-6">
		<div class="sky-gradient absolute inset-0 z-0 opacity-60"></div>
		<div
			class="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20"
		></div>
		<div class="relative z-10 max-w-4xl text-center">
			<div
				class="bg-secondary-container text-on-secondary-container mb-8 inline-flex items-center gap-2 rounded-md px-4 py-1"
			>
				<span class="material-symbols-outlined text-sm">science</span>
				<span class="font-label text-xs font-semibold uppercase tracking-[0.2em]"
					>Scholarly Inquiry &bull; Vol. 04</span
				>
			</div>
			<h1 class="font-headline text-on-surface mb-8 text-6xl leading-[1.1] italic md:text-8xl">
				The Spectral Rhythm of Global Trade
			</h1>
			<p class="font-body text-on-surface-variant mx-auto max-w-2xl text-xl leading-relaxed md:text-2xl">
				A deep-layered decomposition of seasonal maritime data, exploring the unseen frequencies
				that drive our interconnected markets.
			</p>
			<div class="mt-12 flex items-center justify-center gap-6">
				<div class="flex items-center gap-3">
					<img
						class="border-surface-container-lowest h-12 w-12 rounded-full border-2 object-cover"
						alt="Portrait of Dr. Julian Vane"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3S7PjefllO57kV8BdcRk2wHRu1Fmmr9JYDFfC0tb15SHFhaZUDVBOHnatyCLohaOF-R0J2om-WUUybpvh1KrwJL4mzxLn4vFTypuajSrfbRvAQqmr08bGDw24-acNKveB4PMhzq0ig0VLE-Aymia79lC90AbuCtzGePuCUorUfG_9ajHHVjWqIojre1B99DWJx2LL7PBWO1KvMDvD0qaJLIr14IhDLGb_P18e4H1WophXWcwcAUzkgrCOL8UDD4T_abfFKp7EGg"
					/>
					<div class="text-left">
						<span class="font-label text-on-surface block text-sm font-bold">Dr. Julian Vane</span>
						<span class="font-label text-on-surface-variant block text-xs">Lead Researcher</span>
					</div>
				</div>
				<div class="bg-outline-variant/30 h-8 w-px"></div>
				<div class="text-left">
					<span class="font-label text-on-surface-variant block text-xs uppercase tracking-widest"
						>Published</span
					>
					<span class="font-label text-on-surface block text-sm font-bold">Oct 14, 2024</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Project Introduction Section -->
	<section class="bg-surface px-12 py-24">
		<div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12">
			<div class="md:col-start-2 md:col-span-5">
				<h2 class="font-headline text-on-surface mb-8 text-4xl">The Premise of Complexity</h2>
				<div class="font-body text-on-surface-variant space-y-6 text-lg leading-relaxed">
					<p>
						In the grand tapestry of global logistics, every vessel leaving port is a data point in
						a much larger, harmonic oscillation. This entry examines the hypothesis that maritime
						traffic follows a fractal pattern, echoing the turbulent dynamics of fluid mechanics
						rather than simple linear economics.
					</p>
					<p>
						Our analysis utilizes a combination of Fourier transformations and PCA (Principal
						Component Analysis) to strip away the "noise" of short-term volatility, revealing the
						underlying structural skeleton of global movement.
					</p>
				</div>
				<div class="bg-surface-container-low border-primary mt-12 rounded-xl border-l-4 p-8">
					<span
						class="material-symbols-outlined text-primary mb-4"
						style="font-variation-settings: 'FILL' 1;">terminal</span
					>
					<code class="font-body text-on-surface-variant block text-sm leading-loose">
						df.decompose(period=365, model='multiplicative')<br />
						result.plot().show()
					</code>
				</div>
			</div>
			<div class="flex items-center md:col-span-5">
				<div class="relative aspect-square w-full overflow-hidden rounded-xl shadow-sm">
					<img
						class="h-full w-full object-cover"
						alt="Abstract architectural photograph of modern glass buildings"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdaOjoLoiZYgr3_RVbqP4qvCAIMi2v1P0ChO_pUEZAXVpnvLQ8HKAUn88fwWo4ZPBhR93ARs9hQdbrNTdKDOir0mRc2eVp4goYMmIBzwlZSQCw0qFXe5bS_cpx1lctB0_UDFaTbNIlmbNkIQVNEcUWEo0uCuG2eTvkET1ikfKlshVA6vAVa4rM7ses_P-tbLoRaU1RZ3JsnF97Jo0tLmgX2i9otP1KUFiqWRlzy0KEX2v0J45rVObx7EKwu5yYlnrYksdzzwwl62g"
					/>
					<div class="bg-primary/10 absolute inset-0 backdrop-blur-[2px]"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Data Exploration (Bento Grid) -->
	<section class="bg-surface-container-low px-12 py-24">
		<div class="mx-auto max-w-[1440px]">
			<div class="mb-16 text-center">
				<h2 class="font-headline text-on-surface mb-4 text-4xl italic">Observation Layers</h2>
				<div class="bg-primary-fixed-dim mx-auto h-px w-24"></div>
			</div>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-4">
				<!-- Chart A-1 -->
				<div
					class="bg-surface-container-lowest flex min-h-[400px] flex-col justify-between rounded-xl p-10 md:col-span-2"
				>
					<div>
						<span class="font-label text-primary text-xs font-bold uppercase tracking-widest"
							>Chart A-1</span
						>
						<h3 class="font-headline text-on-surface mt-2 mb-6 text-2xl">
							Seasonal Variance Density
						</h3>
					</div>
					<div class="flex h-48 flex-grow items-end justify-between gap-2">
						<div class="bg-primary-container h-[40%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[65%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[90%] w-full rounded-t-lg"></div>
						<div class="bg-secondary-container h-[75%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[45%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[30%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[55%] w-full rounded-t-lg"></div>
					</div>
					<p class="font-body text-on-surface-variant mt-6 text-sm italic">
						Visualizing the relative weight of seasonal adjustments over a 10-year horizon.
					</p>
				</div>
				<!-- Highlight Card -->
				<div
					class="bg-primary text-on-primary flex flex-col justify-center rounded-xl p-10 text-center"
				>
					<span class="font-headline mb-2 text-6xl italic">98.2%</span>
					<span class="font-label text-sm uppercase tracking-widest opacity-80"
						>Correlation Index</span
					>
				</div>
				<!-- Technical Detail -->
				<div class="bg-surface-container-lowest rounded-xl p-10">
					<span class="material-symbols-outlined text-secondary mb-4 text-3xl">analytics</span>
					<h4 class="font-label text-on-surface mb-2 font-bold">Stochastic Modeling</h4>
					<p class="font-body text-on-surface-variant text-sm leading-relaxed">
						Applying Monte Carlo simulations to predict maritime route deviations under extreme
						climatic stressors.
					</p>
				</div>
				<!-- Route Efficiency -->
				<div
					class="bg-surface-container-lowest border-secondary-fixed rounded-xl border-t-4 p-8 md:col-span-1"
				>
					<div class="mb-4 flex items-center justify-between">
						<span class="font-label text-on-surface text-xs font-bold">Route Efficiency</span>
						<span class="text-secondary material-symbols-outlined">trending_up</span>
					</div>
					<div class="space-y-3">
						<div class="bg-surface-container h-1.5 w-full overflow-hidden rounded-full">
							<div class="bg-secondary h-full w-[88%]"></div>
						</div>
						<div class="bg-surface-container h-1.5 w-full overflow-hidden rounded-full">
							<div class="bg-primary h-full w-[62%]"></div>
						</div>
						<div class="bg-surface-container h-1.5 w-full overflow-hidden rounded-full">
							<div class="bg-outline-variant h-full w-[45%]"></div>
						</div>
					</div>
				</div>
				<!-- Wide Abstract Content -->
				<div
					class="bg-surface-container-lowest flex flex-col items-center gap-12 rounded-xl p-12 md:col-span-3 md:flex-row"
				>
					<div class="flex-1">
						<h3 class="font-headline text-on-surface mb-4 text-3xl italic">
							The Geometry of Trade
						</h3>
						<p class="font-body text-on-surface-variant leading-relaxed">
							Our exploration uncovered that trade hubs act as gravitational centers within a larger
							multi-dimensional space. By mapping these hubs as vertices in a dynamic graph, we can
							visualize the "stress" placed on specific maritime corridors.
						</p>
					</div>
					<div
						class="bg-surface-container-low relative h-48 w-full flex-1 overflow-hidden rounded-lg"
					>
						<div
							class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent opacity-20"
						></div>
						<img
							class="h-full w-full object-cover opacity-40 mix-blend-multiply"
							alt="Minimalist topographical map lines"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQj_0nt9lybyvuYI5l9fteT8d8mttAzNjHQ_p5RRnzjlRPSy4-dB-wiK_2oywFmLrRK36hYnDvLgEMdr-iTeGuSBYIWh8iquBOOpKTArLgACRgQwToim8G8ucLv96qiesDqV_PAwaHfug1m3fnWhFAFlQYH2YAz2toJM2BHlJLm97HJcb_bhhdxV8ADee7BySmhRmuTvYfi0k3NqJRr7GLyG0AyLtQ0SHMHSNEmgBmgMjRDsmNTjQ8McEfM4IuFUf0l2HlT1KrdPU"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Key Insights Narrative -->
	<section class="bg-surface px-12 py-32">
		<div class="mx-auto max-w-3xl">
			<h2 class="font-headline text-on-surface mb-12 text-center text-5xl italic">
				Synthesizing the Narrative
			</h2>
			<div class="font-body text-on-surface-variant space-y-10 text-xl leading-[1.8]">
				<p>
					The conclusion of our scholarly journey into trade rhythms is not found in a single chart,
					but in the realization of
					<span class="text-primary font-semibold italic">emergent stability</span>. While
					individual ships face chaotic weather and fluctuating demand, the system as a whole
					exhibits a remarkable, self-correcting poise.
				</p>
				<blockquote
					class="font-headline text-on-surface border-primary-fixed border-l-2 py-4 pl-8 text-2xl italic"
				>
					"Data is the ink with which we write the history of the present; the art lies in making
					the ink legible to the soul."
				</blockquote>
				<p>
					We find that by prioritizing the long-term harmonic wave over the short-term noise,
					logistics providers can reduce energy expenditure by up to 14%. This isn't just about
					economic efficiency; it is about aligning human industry with the natural cadences of the
					earth.
				</p>
			</div>
			<div class="mt-20 flex flex-wrap justify-center gap-3">
				<span
					class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-1.5 text-sm"
					>#Logistics</span
				>
				<span
					class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-1.5 text-sm"
					>#DataArt</span
				>
				<span
					class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-1.5 text-sm"
					>#SpectralAnalysis</span
				>
				<span
					class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-1.5 text-sm"
					>#AcademicJournal</span
				>
			</div>
		</div>
	</section>

	<!-- Atmospheric Divider -->
	<div class="flex justify-center py-20">
		<div class="bg-primary-fixed-dim h-px w-[100px]"></div>
	</div>
</main>

<Footer variant="simple" />
```

- [ ] **Step 2: Verify `/journal` renders correctly**

Run: `npm run dev`, navigate to `http://localhost:5173/journal`

Expected: The journal entry page renders with the sky-gradient hero, scholarly metadata, bento grid visualizations, narrative section, and hashtag chips. Compare visually to the screenshot at `src/lib/raw_html/journal_entry_the_data_story/screen.png`.

- [ ] **Step 3: Commit**

```bash
git add src/routes/journal/+page.svelte
git commit -m "feat: migrate Journal Entry page with bento grid and narrative sections"
```

---

## Task 8: Migrate Technical Deep Dive Page

**Files:**
- Create: `src/routes/technical/+page.svelte`

The most complex page — includes math equations, code editor with syntax highlighting, architecture diagrams, and a multi-column footer.

- [ ] **Step 1: Create `src/routes/technical/+page.svelte`**

Content from `technical_deep_dive_polished_systems/code.html` (lines 103-311):

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Technical Deep Dive | Data Artistry</title>
</svelte:head>

<main class="pt-40 pb-20">
	<!-- Hero Section -->
	<header class="mx-auto mb-32 max-w-5xl px-8">
		<div class="space-y-8">
			<div class="flex items-center gap-4">
				<span class="text-primary text-xs font-bold uppercase tracking-[0.3em]"
					>Technical Deep Dive // ARCH-012</span
				>
				<div class="bg-primary/30 h-px w-12"></div>
			</div>
			<h1
				class="font-headline text-on-surface text-7xl font-light leading-[1.05] tracking-tight md:text-8xl"
			>
				The Geometry of <br /> <span class="italic">Latent Spaces</span>
			</h1>
			<p class="text-on-surface-variant max-w-3xl text-xl font-light leading-relaxed">
				An exploration of high-dimensional manifold alignment and the underlying data orchestration
				required to sustain real-time inference at scale. This journal entry dissects the
				mathematical foundations of our recent generative architecture.
			</p>
			<div class="flex items-center gap-6 pt-4">
				<div class="flex -space-x-2">
					<div class="border-surface h-10 w-10 rounded-full border-2 bg-slate-200"></div>
					<div class="border-surface h-10 w-10 rounded-full border-2 bg-slate-300"></div>
				</div>
				<div class="text-sm">
					<p class="font-bold">Published by Research Team</p>
					<p class="text-on-surface-variant italic">June 14, 2024 &bull; 12 min read</p>
				</div>
			</div>
		</div>
	</header>

	<!-- Mathematical Foundations -->
	<section class="mx-auto mb-40 max-w-[1440px] px-8">
		<div class="rounded-[2.5rem] border border-outline-variant/10 bg-white p-12 shadow-sm md:p-24">
			<div class="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
				<div class="space-y-10">
					<div class="space-y-4">
						<h2 class="font-headline text-5xl leading-tight italic">
							Structural Minimization <br />&amp; Loss Convergence
						</h2>
						<div class="bg-primary/20 h-1 w-24"></div>
					</div>
					<div class="text-on-surface-variant space-y-6 text-lg leading-relaxed">
						<p>
							To ensure global stability within the latent space, we introduce a regularization term
							focused on the Jacobian norm. This prevents the manifold from collapsing during
							high-velocity training phases.
						</p>
						<p>
							The optimization objective is defined by the balance between the reconstruction
							fidelity and the structural entropy of the hidden representations.
						</p>
					</div>
					<a
						class="text-primary group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
						href="#"
					>
						<span>View Implementation on GitHub</span>
						<span
							class="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1"
							>arrow_forward</span
						>
					</a>
				</div>
				<div class="bg-surface-container-low relative rounded-3xl p-12">
					<div class="math-block font-headline text-primary-dim py-16 text-center text-3xl italic md:text-4xl">
						L(&theta;) = E<sub>z~q</sub>[log p(x|z)] - &beta; &middot; D<sub>KL</sub>(q(z|x) ||
						p(z)) + &lambda; ||&nabla;<sub>z</sub> f(z)||<sup>2</sup>
					</div>
					<div
						class="mt-12 flex items-center justify-between border-t border-outline-variant/20 pt-8"
					>
						<div class="flex gap-3">
							<span
								class="bg-secondary-container/50 text-on-secondary-container rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
								>KL Divergence</span
							>
							<span
								class="bg-primary-container/50 text-on-primary-container rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
								>Jacobian Norm</span
							>
						</div>
						<span class="text-outline text-[10px] font-bold uppercase tracking-[0.2em]"
							>Equation 4.2b</span
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Architecture Section -->
	<section class="mx-auto mb-40 max-w-[1440px] px-8">
		<div
			class="mb-16 flex flex-col items-end justify-between gap-6 border-b border-outline-variant/10 pb-8 md:flex-row"
		>
			<div class="space-y-2">
				<span class="text-primary text-xs font-bold uppercase tracking-widest"
					>Section 02 // Architecture</span
				>
				<h3 class="font-headline text-5xl">Pipeline Orchestration</h3>
			</div>
			<a
				class="bg-inverse-surface text-inverse-on-surface flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-90"
				href="#"
			>
				<span class="material-symbols-outlined text-lg">terminal</span>
				Explore Architecture Repo
			</a>
		</div>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-12">
			<!-- Main Flow -->
			<div
				class="bg-surface-container-lowest flex min-h-[500px] flex-col justify-between rounded-[2rem] border border-outline-variant/10 p-12 shadow-sm md:col-span-8"
			>
				<div class="max-w-xl">
					<div class="bg-primary/10 mb-8 flex h-12 w-12 items-center justify-center rounded-xl">
						<span class="material-symbols-outlined text-primary">hub</span>
					</div>
					<h4 class="mb-4 text-2xl font-bold italic">The Distributed Ingestion Layer</h4>
					<p class="text-on-surface-variant mb-12 leading-relaxed">
						Multi-source streaming with Kafka-backed persistence and schema validation via Protobuf.
						Our architecture ensures exactly-once semantics across four distinct geographic regions
						with automated failover handling.
					</p>
				</div>
				<div
					class="bg-surface-container-low/50 w-full rounded-2xl border border-dashed border-outline-variant/30 p-8"
				>
					<div class="flex items-center justify-around opacity-70">
						<div class="flex flex-col items-center gap-4">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm"
							>
								<span class="material-symbols-outlined text-primary text-3xl">database</span>
							</div>
							<span class="text-[10px] font-bold uppercase tracking-widest">Source Data</span>
						</div>
						<div class="bg-outline-variant/20 mx-4 h-px flex-1"></div>
						<div class="flex flex-col items-center gap-4">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm"
							>
								<span class="material-symbols-outlined text-secondary text-3xl">sync_alt</span>
							</div>
							<span class="text-[10px] font-bold uppercase tracking-widest">Kafka Broker</span>
						</div>
						<div class="bg-outline-variant/20 mx-4 h-px flex-1"></div>
						<div class="flex flex-col items-center gap-4">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm"
							>
								<span class="material-symbols-outlined text-tertiary text-3xl"
									>architecture</span
								>
							</div>
							<span class="text-[10px] font-bold uppercase tracking-widest">Spark Worker</span>
						</div>
					</div>
				</div>
			</div>
			<!-- Stats & Details -->
			<div class="space-y-8 md:col-span-4">
				<div
					class="bg-primary text-on-primary flex h-[240px] flex-col justify-between rounded-[2rem] p-10"
				>
					<div class="flex items-start justify-between">
						<span class="material-symbols-outlined text-4xl">bolt</span>
						<span class="text-[10px] font-bold uppercase tracking-widest opacity-70"
							>Live Benchmarks</span
						>
					</div>
					<div>
						<h5 class="font-headline mb-1 text-5xl font-light">99.4%</h5>
						<p class="text-xs font-bold uppercase tracking-widest opacity-70">
							Operational Reliability Score
						</p>
					</div>
				</div>
				<div
					class="bg-surface-container-high flex-1 rounded-[2rem] border border-outline-variant/10 p-10"
				>
					<h4 class="mb-4 text-lg font-bold">Inference Latency</h4>
					<p class="text-on-surface-variant mb-6 text-sm leading-relaxed">
						Sub-15ms latency benchmarks maintained across 2.4B production requests per day.
					</p>
					<div class="space-y-4">
						<div class="h-1.5 w-full overflow-hidden rounded-full bg-white/50">
							<div class="bg-primary h-full w-4/5"></div>
						</div>
						<div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-60">
							<span>P50: 8ms</span>
							<span>P99: 14.2ms</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Code & Logic Section -->
	<section class="mx-auto mb-20 max-w-[1440px] px-8">
		<div class="overflow-hidden rounded-[2.5rem] border border-outline-variant/10 bg-white shadow-lg">
			<div class="grid grid-cols-1 lg:grid-cols-12">
				<!-- Sidebar Context -->
				<div class="bg-surface-container-lowest flex flex-col p-12 lg:col-span-4 lg:p-20">
					<div class="flex-1 space-y-10">
						<div class="space-y-4">
							<span class="text-secondary text-xs font-bold uppercase tracking-widest"
								>Section 03 // Logic</span
							>
							<h2 class="font-headline text-5xl leading-tight italic">
								Algorithm <br />Refinement
							</h2>
						</div>
						<p class="text-on-surface-variant text-lg leading-relaxed">
							Moving beyond standard stochastic gradient descent, we utilize an adaptive momentum
							scheduler that penalizes curvature spikes in the loss landscape.
						</p>
						<div class="space-y-8 pt-4">
							<div class="flex items-start gap-4">
								<div class="bg-primary-fixed-dim h-12 w-1"></div>
								<div class="space-y-2">
									<h5 class="font-headline text-xl font-bold italic">Linear Complexity</h5>
									<p class="text-on-surface-variant text-xs leading-relaxed">
										Achieves O(N) scaling through sparse neighborhood approximations for
										billion-scale datasets.
									</p>
								</div>
							</div>
							<div class="flex items-start gap-4">
								<div class="bg-secondary-fixed-dim h-12 w-1"></div>
								<div class="space-y-2">
									<h5 class="font-headline text-xl font-bold italic">Memory Efficiency</h5>
									<p class="text-on-surface-variant text-xs leading-relaxed">
										Reduces weight footprint per thread by 40% via static weight offloading.
									</p>
								</div>
							</div>
						</div>
					</div>
					<a
						class="bg-secondary text-on-secondary group mt-12 flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-secondary-dim"
						href="#"
					>
						<span class="material-symbols-outlined text-xl">code_blocks</span>
						View Pseudocode Repo
						<span
							class="material-symbols-outlined transition-transform group-hover:translate-x-1"
							>arrow_outward</span
						>
					</a>
				</div>
				<!-- Code Editor -->
				<div class="relative overflow-hidden bg-[#0c1117] p-12 lg:col-span-8 lg:p-20">
					<div class="absolute top-8 left-12 flex gap-2">
						<div class="h-3 w-3 rounded-full bg-red-500/30"></div>
						<div class="h-3 w-3 rounded-full bg-amber-500/30"></div>
						<div class="h-3 w-3 rounded-full bg-emerald-500/30"></div>
					</div>
					<div class="mb-12 flex items-center justify-between border-b border-white/5 pb-6">
						<span class="font-mono text-xs uppercase tracking-widest text-white/40"
							>module_alpha.py</span
						>
						<div class="flex gap-4">
							<span
								class="material-symbols-outlined cursor-pointer text-lg text-white/30 transition-colors hover:text-white"
								>content_copy</span
							>
							<span
								class="material-symbols-outlined cursor-pointer text-lg text-white/30 transition-colors hover:text-white"
								>settings</span
							>
						</div>
					</div>
					<pre
						class="overflow-x-auto text-sm leading-[1.8] text-slate-300 selection:bg-primary/30 md:text-base"><span class="font-bold text-blue-400">def</span> <span class="text-emerald-400">align_manifold</span>(z_space, target_distribution):
    <span class="italic text-slate-500"># Compute the pairwise distance matrix</span>
    distances = compute_l2_norm(z_space)

    <span class="italic text-slate-500"># Apply Gaussian kernel for local connectivity</span>
    affinity = np.exp(-distances / (2 * sigma**2))

    <span class="italic text-slate-500"># Normalize and iterate convergence</span>
    <span class="font-bold text-blue-400">for</span> epoch <span class="font-bold text-blue-400">in</span> range(MAX_ITER):
        gradient = compute_divergence(affinity, target_distribution)
        z_space -= learning_rate * gradient

    <span class="font-bold text-blue-400">return</span> z_space</pre>
					<div class="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
						<p class="font-mono text-xs italic text-white/50">
							Notes: This implementation leverages vectorized operations in PyTorch for GPU
							acceleration. Convergence is typically achieved within 200 epochs for latent dimensions
							&lt; 512.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer variant="expanded" />
```

- [ ] **Step 2: Verify `/technical` renders correctly**

Run: `npm run dev`, navigate to `http://localhost:5173/technical`

Expected: The technical deep dive page renders with the math equation, architecture pipeline diagram, code editor with syntax highlighting, and the expanded footer. Compare to `src/lib/raw_html/technical_deep_dive_polished_systems/screen.png`.

- [ ] **Step 3: Commit**

```bash
git add src/routes/technical/+page.svelte
git commit -m "feat: migrate Technical Deep Dive page with math, code editor, and architecture sections"
```

---

## Task 9: Wire Up Active Navigation State Per Route

**Files:**
- Modify: `src/routes/+layout.svelte`
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/about/+page.svelte`
- Modify: `src/routes/journal/+page.svelte`
- Modify: `src/routes/technical/+page.svelte`

The Nav needs to know which page is active. Use SvelteKit's `$page.url.pathname` in the layout.

- [ ] **Step 1: Update `+layout.svelte` to pass active page to Nav**

```svelte
<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const routeToPage: Record<string, 'home' | 'entries' | 'about' | 'contact'> = {
		'/': 'home',
		'/journal': 'entries',
		'/technical': 'entries',
		'/about': 'about'
	};

	let activePage = $derived(routeToPage[page.url.pathname] ?? 'home');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Emna | Data Analyst</title>
</svelte:head>

<Nav {activePage} />
{@render children()}
```

- [ ] **Step 2: Verify active states work across routes**

Navigate to each route and verify the correct nav link is highlighted:
- `/` → "Home" active
- `/about` → "About" active
- `/journal` → "Entries" active
- `/technical` → "Entries" active

- [ ] **Step 3: Commit**

```bash
git add src/routes/+layout.svelte
git commit -m "feat: wire up active navigation state based on current route"
```

---

## Task 10: Visual QA & Cleanup

**Files:**
- Possibly modify any files from previous tasks

This is the final pass — compare each page against its screenshot reference and fix discrepancies.

- [ ] **Step 1: Run the dev server and compare each page**

Open in browser and compare side-by-side with screenshots:
- `src/lib/raw_html/home_standard_grid_feed/screen.png` vs `/`
- `src/lib/raw_html/about_my_visual_journey/screen.png` vs `/about`
- `src/lib/raw_html/journal_entry_the_data_story/screen.png` vs `/journal`
- `src/lib/raw_html/technical_deep_dive_polished_systems/screen.png` vs `/technical`

Check for:
- Color mismatches (custom tokens not resolving)
- Font rendering (Newsreader serif vs Manrope sans)
- Spacing/padding differences
- Missing Material Symbols icons
- Gradient rendering
- Glass-morphism blur effects
- Hover states and transitions

- [ ] **Step 2: Run type checking**

Run: `npm run check`

Expected: No TypeScript or Svelte errors.

- [ ] **Step 3: Run build to verify production readiness**

Run: `npm run build`

Expected: Build succeeds with no errors. All routes are pre-rendered or SSR-ready.

- [ ] **Step 4: Run prettier**

Run: `npm run format`

Expected: All files formatted consistently.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: visual QA fixes and formatting cleanup"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Tailwind v4 theme + fonts | `layout.css`, `app.html` |
| 2 | Nav component | `Nav.svelte` |
| 3 | Footer component | `Footer.svelte` |
| 4 | Layout integration | `+layout.svelte` |
| 5 | About page (move existing) | `about/+page.svelte` |
| 6 | Home page | `+page.svelte` |
| 7 | Journal Entry page | `journal/+page.svelte` |
| 8 | Technical Deep Dive page | `technical/+page.svelte` |
| 9 | Active nav state | `+layout.svelte` |
| 10 | Visual QA & cleanup | Any |
