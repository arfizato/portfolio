# mdsvex Entry System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the static `/routes/technical/+page.svelte` into an mdsvex-powered markdown entry at `/entries/technical`, extracting reusable Svelte components for code blocks, math blocks, diagrams, stat cards, etc.

**Architecture:** Named mdsvex layout (`technical`) provides the hero/footer shell and exports custom element replacements (h2, p, a). The markdown file imports standalone Svelte components (MathBlock, CodeEditor, PipelineDiagram, etc.) directly for complex visual blocks. Each entry is a static `+page.md` file at its own route.

**Tech Stack:** SvelteKit, mdsvex 0.12.6, Svelte 5 (runes mode), Tailwind CSS 4, Material Symbols icons

**Important notes:**
- A dev server is already running at localhost:5173 — do NOT start another one
- Do NOT commit unless explicitly asked
- `.md` files must be excluded from Svelte 5 runes mode so mdsvex-generated code (`export let`) works correctly

---

## File Map

```
Create: src/lib/layouts/technical.svelte           — mdsvex named layout (hero, footer, scoped element styles)
Create: src/lib/components/entries/ContentCard.svelte    — white card section wrapper
Create: src/lib/components/entries/SectionHeader.svelte  — numbered section header with optional button
Create: src/lib/components/entries/MathBlock.svelte      — equation display with tags
Create: src/lib/components/entries/PipelineDiagram.svelte — icon flow in a card
Create: src/lib/components/entries/StatCard.svelte       — large number highlight
Create: src/lib/components/entries/LatencyCard.svelte    — progress bars with labels
Create: src/lib/components/entries/FeaturePoint.svelte   — colored bar + title + desc
Create: src/lib/components/entries/CodeEditor.svelte     — dark themed code display
Create: src/routes/entries/technical/+page.md            — the markdown entry
Modify: svelte.config.js                                — add named layout, exclude .md from runes
Modify: src/routes/+layout.svelte                       — fix nav route matching for /entries/*
```

---

### Task 1: Configuration and Directory Setup

**Files:**
- Modify: `svelte.config.js`

- [ ] **Step 1: Update svelte.config.js — add named layout and exclude .md/.svx from runes**

Replace the entire file with:

```javascript
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import { relative, sep } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes('node_modules');

			if (isExternalLibrary) return undefined;
			if (filename.endsWith('.md') || filename.endsWith('.svx')) return false;
			return true;
		}
	},
	kit: { adapter: adapter() },
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			layout: {
				technical: './src/lib/layouts/technical.svelte'
			}
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
```

Key changes from current file:
- Added `filename.endsWith('.md') || filename.endsWith('.svx')` check to return `false` (legacy mode) for mdsvex files — mdsvex generates `export let` code incompatible with runes
- Added `layout` object to mdsvex config with `technical` named layout

- [ ] **Step 2: Create directory structure**

```bash
mkdir -p src/lib/layouts
mkdir -p src/lib/components/entries
mkdir -p src/routes/entries/technical
```

- [ ] **Step 3: Verify dev server accepts config change**

Check localhost:5173 — the dev server should hot-reload the config. If it crashes, restart it and check for syntax errors.

---

### Task 2: ContentCard Component

**Files:**
- Create: `src/lib/components/entries/ContentCard.svelte`

- [ ] **Step 1: Create ContentCard.svelte**

```svelte
<script>
	let { flush = false, spacing = 'mb-40', children } = $props();
</script>

<section class="mx-auto max-w-[1440px] px-8 {spacing}">
	{#if flush}
		<div
			class="overflow-hidden rounded-[2.5rem] border border-outline-variant/10 bg-white shadow-lg"
		>
			{@render children()}
		</div>
	{:else}
		<div
			class="rounded-[2.5rem] border border-outline-variant/10 bg-white p-12 shadow-sm md:p-24"
		>
			{@render children()}
		</div>
	{/if}
</section>
```

Two variants:
- Default: padded white card with subtle shadow (used for Mathematical Foundations section)
- `flush`: no padding, overflow hidden, stronger shadow (used for Code & Logic section where content bleeds to card edges)

---

### Task 3: SectionHeader Component

**Files:**
- Create: `src/lib/components/entries/SectionHeader.svelte`

- [ ] **Step 1: Create SectionHeader.svelte**

```svelte
<script>
	let { number, section, title, buttonLabel, buttonIcon, buttonHref = '#', children } = $props();
</script>

<section class="mx-auto mb-40 max-w-[1440px] px-8">
	<div
		class="mb-16 flex flex-col items-end justify-between gap-6 border-b border-outline-variant/10 pb-8 md:flex-row"
	>
		<div class="space-y-2">
			<span class="text-xs font-bold tracking-widest text-primary uppercase"
				>Section {number} // {section}</span
			>
			<h3 class="font-headline text-5xl">{title}</h3>
		</div>
		{#if buttonLabel}
			<a
				class="flex items-center gap-2 rounded-xl bg-inverse-surface px-6 py-3 text-xs font-bold tracking-widest text-inverse-on-surface uppercase transition-opacity hover:opacity-90"
				href={buttonHref}
			>
				{#if buttonIcon}
					<span class="material-symbols-outlined text-lg">{buttonIcon}</span>
				{/if}
				{buttonLabel}
			</a>
		{/if}
	</div>
	{@render children?.()}
</section>
```

Renders the section label ("Section 02 // Architecture"), the large title, optional action button, and a slot for content below the header (typically a grid).

---

### Task 4: MathBlock Component

**Files:**
- Create: `src/lib/components/entries/MathBlock.svelte`

- [ ] **Step 1: Create MathBlock.svelte**

```svelte
<script>
	let { equation, tags = [], label = '' } = $props();
</script>

<div class="relative rounded-3xl bg-surface-container-low p-12">
	<div
		class="math-block py-16 text-center font-headline text-3xl text-primary-dim italic md:text-4xl"
	>
		{@html equation}
	</div>
	{#if tags.length > 0 || label}
		<div
			class="mt-12 flex items-center justify-between border-t border-outline-variant/20 pt-8"
		>
			<div class="flex gap-3">
				{#each tags as tag}
					{@const colorMap = {
						secondary: 'bg-secondary-container/50 text-on-secondary-container',
						primary: 'bg-primary-container/50 text-on-primary-container'
					}}
					<span
						class="rounded-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase {colorMap[tag.color] || colorMap.primary}"
						>{tag.label}</span
					>
				{/each}
			</div>
			{#if label}
				<span class="text-[10px] font-bold tracking-[0.2em] text-outline uppercase"
					>{label}</span
				>
			{/if}
		</div>
	{/if}
</div>
```

The `equation` prop uses `{@html}` so it can contain HTML entities (`&theta;`, `<sub>`, `<sup>`, etc.) matching the original page's equation rendering.

---

### Task 5: PipelineDiagram Component

**Files:**
- Create: `src/lib/components/entries/PipelineDiagram.svelte`

- [ ] **Step 1: Create PipelineDiagram.svelte**

```svelte
<script>
	let { icon = 'hub', title, description, steps = [] } = $props();

	const textColorMap = {
		primary: 'text-primary',
		secondary: 'text-secondary',
		tertiary: 'text-tertiary'
	};
</script>

<div
	class="flex min-h-[500px] flex-col justify-between rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-12 shadow-sm"
>
	<div class="max-w-xl">
		<div class="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
			<span class="material-symbols-outlined text-primary">{icon}</span>
		</div>
		<h4 class="mb-4 text-2xl font-bold italic">{title}</h4>
		<p class="mb-12 leading-relaxed text-on-surface-variant">{description}</p>
	</div>
	<div
		class="w-full rounded-2xl border border-dashed border-outline-variant/30 bg-surface-container-low/50 p-8"
	>
		<div class="flex items-center justify-around opacity-70">
			{#each steps as step, i}
				{#if i > 0}
					<div class="mx-4 h-px flex-1 bg-outline-variant/20"></div>
				{/if}
				<div class="flex flex-col items-center gap-4">
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm"
					>
						<span class="material-symbols-outlined text-3xl {textColorMap[step.color] || 'text-primary'}"
							>{step.icon}</span
						>
					</div>
					<span class="text-[10px] font-bold tracking-widest uppercase">{step.label}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
```

Self-contained card with icon header, title, description, and the horizontal step flow diagram.

---

### Task 6: StatCard and LatencyCard Components

**Files:**
- Create: `src/lib/components/entries/StatCard.svelte`
- Create: `src/lib/components/entries/LatencyCard.svelte`

- [ ] **Step 1: Create StatCard.svelte**

```svelte
<script>
	let { icon, value, label, sublabel = '' } = $props();
</script>

<div class="flex h-[240px] flex-col justify-between rounded-[2rem] bg-primary p-10 text-on-primary">
	<div class="flex items-start justify-between">
		<span class="material-symbols-outlined text-4xl">{icon}</span>
		{#if sublabel}
			<span class="text-[10px] font-bold tracking-widest uppercase opacity-70">{sublabel}</span>
		{/if}
	</div>
	<div>
		<h5 class="mb-1 font-headline text-5xl font-light">{value}</h5>
		<p class="text-xs font-bold tracking-widest uppercase opacity-70">{label}</p>
	</div>
</div>
```

- [ ] **Step 2: Create LatencyCard.svelte**

```svelte
<script>
	let { title, description, bars = [], labels = [] } = $props();

	const bgColorMap = {
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		tertiary: 'bg-tertiary',
		'outline-variant': 'bg-outline-variant'
	};
</script>

<div class="flex-1 rounded-[2rem] border border-outline-variant/10 bg-surface-container-high p-10">
	<h4 class="mb-4 text-lg font-bold">{title}</h4>
	<p class="mb-6 text-sm leading-relaxed text-on-surface-variant">{description}</p>
	<div class="space-y-4">
		{#each bars as bar}
			<div class="h-1.5 w-full overflow-hidden rounded-full bg-white/50">
				<div class="h-full {bgColorMap[bar.color] || 'bg-primary'}" style="width: {bar.pct}%"></div>
			</div>
		{/each}
		{#if labels.length > 0}
			<div
				class="flex justify-between text-[10px] font-bold tracking-tighter uppercase opacity-60"
			>
				{#each labels as lbl}
					<span>{lbl}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
```

---

### Task 7: FeaturePoint and CodeEditor Components

**Files:**
- Create: `src/lib/components/entries/FeaturePoint.svelte`
- Create: `src/lib/components/entries/CodeEditor.svelte`

- [ ] **Step 1: Create FeaturePoint.svelte**

```svelte
<script>
	let { color = 'primary', title, description } = $props();

	const colorMap = {
		primary: 'bg-primary-fixed-dim',
		secondary: 'bg-secondary-fixed-dim'
	};
</script>

<div class="flex items-start gap-4">
	<div class="h-12 w-1 {colorMap[color] || colorMap.primary}"></div>
	<div class="space-y-2">
		<h5 class="font-headline text-xl font-bold italic">{title}</h5>
		<p class="text-xs leading-relaxed text-on-surface-variant">{description}</p>
	</div>
</div>
```

- [ ] **Step 2: Create CodeEditor.svelte**

```svelte
<script>
	let { filename, notes, children } = $props();
</script>

<div class="relative overflow-hidden bg-[#0c1117] p-12 lg:p-20">
	<div class="absolute top-8 left-12 flex gap-2">
		<div class="h-3 w-3 rounded-full bg-red-500/30"></div>
		<div class="h-3 w-3 rounded-full bg-amber-500/30"></div>
		<div class="h-3 w-3 rounded-full bg-emerald-500/30"></div>
	</div>
	<div class="mb-12 flex items-center justify-between border-b border-white/5 pb-6">
		<span class="font-mono text-xs tracking-widest text-white/40 uppercase">{filename}</span>
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
	{@render children()}
	{#if notes}
		<div class="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
			<p class="font-mono text-xs text-white/50 italic">{notes}</p>
		</div>
	{/if}
</div>
```

Slot receives pre-formatted code content (including `<pre>` tags with manual syntax highlighting spans).

---

### Task 8: Technical Layout

**Files:**
- Create: `src/lib/layouts/technical.svelte`

- [ ] **Step 1: Create technical.svelte**

```svelte
<script>
	import Footer from '$lib/components/Footer.svelte';

	let { title, titleItalic, subtitle, label, authors = [], date, readTime, footer = 'expanded', children } = $props();
</script>

<main class="pt-40 pb-20">
	<header class="mx-auto mb-32 max-w-5xl px-8">
		<div class="space-y-8">
			<div class="flex items-center gap-4">
				<span class="text-xs font-bold tracking-[0.3em] text-primary uppercase">{label}</span>
				<div class="h-px w-12 bg-primary/30"></div>
			</div>
			<h1
				class="font-headline text-7xl leading-[1.05] font-light tracking-tight text-on-surface md:text-8xl"
			>
				{title}
				{#if titleItalic}
					<br /><span class="italic">{titleItalic}</span>
				{/if}
			</h1>
			<p class="max-w-3xl text-xl leading-relaxed font-light text-on-surface-variant">
				{subtitle}
			</p>
			<div class="flex items-center gap-6 pt-4">
				{#if authors.length > 0}
					<div class="flex -space-x-2">
						{#each authors as _, i}
							<div
								class="h-10 w-10 rounded-full border-2 border-surface"
								style="background-color: {i % 2 === 0 ? '#cbd5e1' : '#94a3b8'}"
							></div>
						{/each}
					</div>
					<div class="text-sm">
						<p class="font-bold">
							Published by {authors.map((a) => a.name).join(', ')}
						</p>
						<p class="text-on-surface-variant italic">
							{date} &bull; {readTime} read
						</p>
					</div>
				{/if}
			</div>
		</div>
	</header>

	<div class="entry-content">
		{@render children()}
	</div>
</main>

<Footer variant={footer} />

<style>
	.entry-content :global(h2) {
		font-family: var(--font-headline);
		font-size: 3rem;
		line-height: 1.1;
		font-style: italic;
		color: var(--color-on-surface);
	}

	.entry-content :global(p) {
		font-size: 1.125rem;
		line-height: 1.75;
		color: var(--color-on-surface-variant);
	}

	.entry-content :global(a:not([class])) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-primary);
	}

	.entry-content :global(a:not([class]):hover) {
		opacity: 0.8;
	}
</style>
```

Key points:
- No module script or separate element components — styling handled via scoped `:global()` CSS on `.entry-content` wrapper
- `a:not([class])` selector only styles markdown-generated links, not links inside components that have their own classes
- Receives all frontmatter values as props via `$props()`
- `title` + `titleItalic` split allows the hero to render "The Geometry of / *Latent Spaces*" pattern
- Renders `{@render children()}` wrapped in `.entry-content` for scoped styling
- Footer variant driven by frontmatter

---

### Task 9: The Markdown Entry

**Files:**
- Create: `src/routes/entries/technical/+page.md`

- [ ] **Step 1: Create +page.md with frontmatter and imports**

Create `src/routes/entries/technical/+page.md` with the full content below. This is the complete file:

````md
---
layout: technical
title: "The Geometry of"
titleItalic: "Latent Spaces"
subtitle: "An exploration of high-dimensional manifold alignment and the underlying data orchestration required to sustain real-time inference at scale. This journal entry dissects the mathematical foundations of our recent generative architecture."
label: "Technical Deep Dive // ARCH-012"
authors:
  - name: Research Team
date: "June 14, 2024"
readTime: "12 min"
footer: expanded
---

<script>
	import ContentCard from '$lib/components/entries/ContentCard.svelte';
	import SectionHeader from '$lib/components/entries/SectionHeader.svelte';
	import MathBlock from '$lib/components/entries/MathBlock.svelte';
	import PipelineDiagram from '$lib/components/entries/PipelineDiagram.svelte';
	import StatCard from '$lib/components/entries/StatCard.svelte';
	import LatencyCard from '$lib/components/entries/LatencyCard.svelte';
	import FeaturePoint from '$lib/components/entries/FeaturePoint.svelte';
	import CodeEditor from '$lib/components/entries/CodeEditor.svelte';
</script>

<!-- Section 01: Mathematical Foundations -->

<ContentCard>
<div class="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
<div class="space-y-10">
<div class="space-y-6">

## Structural Minimization & Loss Convergence

To ensure global stability within the latent space, we introduce a regularization term focused on the Jacobian norm. This prevents the manifold from collapsing during high-velocity training phases.

The optimization objective is defined by the balance between the reconstruction fidelity and the structural entropy of the hidden representations.

</div>

[View Implementation on GitHub](#)

</div>
<div>

<MathBlock
	equation="L(&theta;) = E<sub>z~q</sub>[log p(x|z)] - &beta; &middot; D<sub>KL</sub>(q(z|x) || p(z)) + &lambda; ||&nabla;<sub>z</sub> f(z)||<sup>2</sup>"
	tags={[
		{ label: 'KL Divergence', color: 'secondary' },
		{ label: 'Jacobian Norm', color: 'primary' }
	]}
	label="Equation 4.2b"
/>

</div>
</div>
</ContentCard>

<!-- Section 02: Architecture -->

<SectionHeader number="02" section="Architecture" title="Pipeline Orchestration" buttonLabel="Explore Architecture Repo" buttonIcon="terminal" buttonHref="#">

<div class="grid grid-cols-1 gap-8 md:grid-cols-12">
<div class="md:col-span-8">

<PipelineDiagram
	icon="hub"
	title="The Distributed Ingestion Layer"
	description="Multi-source streaming with Kafka-backed persistence and schema validation via Protobuf. Our architecture ensures exactly-once semantics across four distinct geographic regions with automated failover handling."
	steps={[
		{ icon: 'database', label: 'Source Data', color: 'primary' },
		{ icon: 'sync_alt', label: 'Kafka Broker', color: 'secondary' },
		{ icon: 'architecture', label: 'Spark Worker', color: 'tertiary' }
	]}
/>

</div>
<div class="space-y-8 md:col-span-4">

<StatCard icon="bolt" value="99.4%" label="Operational Reliability Score" sublabel="Live Benchmarks" />

<LatencyCard
	title="Inference Latency"
	description="Sub-15ms latency benchmarks maintained across 2.4B production requests per day."
	bars={[{ pct: 80, color: 'primary' }]}
	labels={['P50: 8ms', 'P99: 14.2ms']}
/>

</div>
</div>

</SectionHeader>

<!-- Section 03: Code & Logic -->

<ContentCard flush spacing="mb-20">
<div class="grid grid-cols-1 lg:grid-cols-12">
<div class="flex flex-col bg-surface-container-lowest p-12 lg:col-span-4 lg:p-20">
<div class="flex-1 space-y-10">
<div class="space-y-4">
<span class="text-xs font-bold tracking-widest text-secondary uppercase">Section 03 // Logic</span>
<div class="font-headline text-5xl leading-tight italic">Algorithm<br/>Refinement</div>
</div>
<div class="space-y-6">

Moving beyond standard stochastic gradient descent, we utilize an adaptive momentum scheduler that penalizes curvature spikes in the loss landscape.

</div>
<div class="space-y-8 pt-4">

<FeaturePoint color="primary" title="Linear Complexity" description="Achieves O(N) scaling through sparse neighborhood approximations for billion-scale datasets." />

<FeaturePoint color="secondary" title="Memory Efficiency" description="Reduces weight footprint per thread by 40% via static weight offloading." />

</div>
</div>

<a class="group mt-12 flex items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-sm font-bold tracking-widest text-on-secondary uppercase transition-colors hover:bg-secondary-dim" href="#">
<span class="material-symbols-outlined text-xl">code_blocks</span>
View Pseudocode Repo
<span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_outward</span>
</a>

</div>
<div class="lg:col-span-8">

<CodeEditor filename="module_alpha.py" notes="Notes: This implementation leverages vectorized operations in PyTorch for GPU acceleration. Convergence is typically achieved within 200 epochs for latent dimensions &lt; 512.">
<pre class="overflow-x-auto text-sm leading-[1.8] text-slate-300 selection:bg-primary/30 md:text-base"><span class="font-bold text-blue-400">def</span> <span class="text-emerald-400">align_manifold</span>(z_space, target_distribution):
    <span class="text-slate-500 italic"># Compute the pairwise distance matrix</span>
    distances = compute_l2_norm(z_space)

    <span class="text-slate-500 italic"># Apply Gaussian kernel for local connectivity</span>
    affinity = np.exp(-distances / (2 * sigma**2))

    <span class="text-slate-500 italic"># Normalize and iterate convergence</span>
    <span class="font-bold text-blue-400">for</span> epoch <span class="font-bold text-blue-400">in</span> range(MAX_ITER):
        gradient = compute_divergence(affinity, target_distribution)
        z_space -= learning_rate * gradient

    <span class="font-bold text-blue-400">return</span> z_space</pre>
</CodeEditor>

</div>
</div>
</ContentCard>
````

- [ ] **Step 2: Verify the page compiles**

Check localhost:5173/entries/technical — the page should render. If there are compilation errors, check the terminal output and fix.

---

### Task 10: Route Update and Verification

**Files:**
- Modify: `src/routes/+layout.svelte`

- [ ] **Step 1: Update route-to-page mapping for /entries/* paths**

In `src/routes/+layout.svelte`, change the `activePage` logic from exact-match to prefix-match for entries routes:

Current code:
```javascript
const routeToPage: Record<string, 'home' | 'entries' | 'about' | 'contact'> = {
	'/': 'home',
	'/journal': 'entries',
	'/technical': 'entries',
	'/entries': 'entries',
	'/about': 'about',
	'/contact': 'contact'
};

let activePage = $derived(routeToPage[page.url.pathname] ?? 'home');
```

Replace with:
```javascript
function getActivePage(pathname: string): 'home' | 'entries' | 'about' | 'contact' {
	if (pathname === '/') return 'home';
	if (pathname === '/about') return 'about';
	if (pathname === '/contact') return 'contact';
	if (pathname.startsWith('/entries') || pathname === '/journal' || pathname === '/technical') return 'entries';
	return 'home';
}

let activePage = $derived(getActivePage(page.url.pathname));
```

This handles all `/entries/*` sub-paths (like `/entries/technical`) plus the legacy static page routes.

- [ ] **Step 2: Full visual verification**

Open localhost:5173/entries/technical and compare against localhost:5173/technical. Check:

1. Hero renders with correct title, subtitle, label, author avatars, date
2. Mathematical Foundations section: two-column layout, h2 styled with italic + underline, prose paragraphs styled, link has arrow, MathBlock equation renders with tags
3. Architecture section: SectionHeader with "Section 02 // Architecture", button, PipelineDiagram card with icon flow, StatCard "99.4%", LatencyCard with bars
4. Code & Logic section: flush card, sidebar with section label + heading + prose + FeaturePoints + button, CodeEditor with traffic lights + filename + code + notes
5. Footer renders as "expanded" variant
6. Nav highlights "entries" as active page

- [ ] **Step 3: Fix any visual discrepancies**

Compare the two pages side-by-side. Common issues to watch for:
- Markdown processing inside `<div>` wrappers — if paragraphs appear unstyled, check blank lines around markdown content
- Tailwind dynamic classes like `text-{step.color}` or `bg-{bar.color}` may not work because Tailwind purges classes it doesn't see statically — replace with explicit class maps if needed
- `{@html equation}` should render HTML entities correctly in MathBlock
