# Data-Driven Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract hardcoded project cards and timeline chapters into typed TypeScript data files so content can be added/removed by editing a single `.ts` file.

**Architecture:** Three new files under `src/lib/data/` (types, projects, timeline). Two existing page files modified to import data and loop with `{#each}`. No new components — loop body reuses existing markup.

**Tech Stack:** SvelteKit, TypeScript, Tailwind CSS (MD3 tokens)

**Spec:** `docs/superpowers/specs/2026-04-13-json-data-driven-components-design.md`

---

### File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/lib/data/types.ts` | `Project` and `TimelineChapter` interfaces |
| Create | `src/lib/data/projects.ts` | Typed array of project card entries |
| Create | `src/lib/data/timeline.ts` | Typed array of timeline chapter entries |
| Modify | `src/routes/+page.svelte` | Replace hardcoded project cards with `{#each}` loop |
| Modify | `src/routes/about/+page.svelte` | Replace hardcoded timeline chapters with `{#each}` loop |

---

### Task 1: Create type definitions

**Files:**
- Create: `src/lib/data/types.ts`

- [ ] **Step 1: Create `src/lib/data/types.ts`**

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

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: no errors related to `types.ts`

---

### Task 2: Create projects data file

**Files:**
- Create: `src/lib/data/projects.ts`

- [ ] **Step 1: Create `src/lib/data/projects.ts`**

```ts
import type { Project } from './types';

export const projects: Project[] = [
	{
		slug: 'geometry-of-silence',
		title: 'The Geometry of Silence: Analysis of Ambient Noise',
		description:
			'A longitudinal study exploring frequency correlations with local biodiversity patterns in metropolitan hubs.',
		date: 'March 14, 2024',
		tags: ['Acoustic Ecology', 'Signal Processing'],
		readTime: '12 min',
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9tAIep-xRYYA0q8UW_NVV-lvhFA41expkHmrrvQ63iX7ytYqQ_zsQt5mjGpv3qVkO1cOL9Wk3gq9XpbyKRlcJwQzmOXiuAnyxkDqC0Zm75cPQRLVkXaUqnwJIk18w3kPA97uaNYnfmk4WahOFVVxmvmWKtdudOdHcWbhwlwwiM1kqxCyk5Ybd-VHygQgQtgh2KMBbvt0J-H6FyGMyjN7-4nNHAhROBMsR3KS9dWfyW1ECVm7QX2X2xFUJja-7u6KyWlvjP0ZhAnk',
			alt: 'Minimalist abstract data visualization with soft pink and blue nodes'
		},
		cta: 'Read Analysis'
	},
	{
		slug: 'linguistic-drift',
		title: 'Linguistic Drift in Digital Correspondence',
		description:
			'Tracking the evolution of semantic meaning through five years of personal email archives using NLP and LDA.',
		date: 'Feb 28, 2024',
		tags: ['NLP', 'Topic Modeling'],
		readTime: '8 min',
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkdTJy6JJxIYLF_SEoVJg24958yWijgYep9fp1fSfyChiVIkchDK3G8w4qGSQ-ipT4dUXUWeKbKCziABT5E_rhUtkaDzvnPAhylASkTqPaXwYrzwJleBTSAJ-RAsmf5taRVv2rklERJPrlnwSxcTzPvHnJ-pc0xYlsaH9bP-zOjlug0NRAwEiqmwVAh1b_yL4nHxf3LNjV1lMUHZtzhbUQD0SkgFfO2mOg87BbUnMxgHkWyBwjfJ6Me7nUQl4i-IQKTdFO40yzIXw',
			alt: 'Scholarly journal with elegant typography next to a prism reflecting light'
		},
		cta: 'View Repository'
	},
	{
		slug: 'fractal-patterns',
		title: 'Fractal Patterns in Financial Volatility',
		description:
			'Exploring why market movements mimic the branching of trees more than the rolling of dice in chaotic systems.',
		date: 'Jan 12, 2024',
		tags: ['Complexity Theory', 'Financial Modeling'],
		readTime: '15 min',
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwfDv92j92Ll_Xkrhs-6neckDVzBGytjDFLX3PBOch1Rj5a0Lt1MxtKhcKVT3xOb1ZAzsSdEMyrh6FaNd2tAjcIZcqZXww8BwUbv0I0QN0ZbOWUXEeWZzHhVXhh7ig96tu8NBkJhtPxA30V6u44Tx2_W29y0dT7p3a5_e1Xr545871yhH6ciS7AOSJEBRc5QEoHFDHWJgmn8C_aYRzKOHSU1S_1dWbDwX5IOuwG7AbI40Hky_blvZlr9e5Z2H0W63KJsRAjPhFE0U',
			alt: 'Delicate watercolor style scatter plot with soft pastel points'
		},
		cta: 'Full Dataset'
	}
];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: no errors related to `projects.ts`

---

### Task 3: Create timeline data file

**Files:**
- Create: `src/lib/data/timeline.ts`

- [ ] **Step 1: Create `src/lib/data/timeline.ts`**

```ts
import type { TimelineChapter } from './types';

export const timeline: TimelineChapter[] = [
	{
		dateRange: '2016 — 2020',
		color: 'primary',
		title: { prefix: 'The Binary', italic: 'Origins' },
		description:
			"It began with a Bachelor's in Computer Science. My world was defined by syntax and logic. I learned that data wasn't just numbers—it was a language waiting to be translated into meaning. This academic rigor shaped my obsession with structural integrity.",
		detail: {
			icon: 'school',
			label: 'BSc Computer Science',
			sub: 'Focus: Algorithmic Efficiency'
		},
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPVWgBttZ2q2sQmAMboe_fVxM97j96o_gUSEEwhdhxNmWn2SVoWRQJfZevFiRqIPQ_mIe07rpmPjKLSnRbWSV9hgm5T6YzvtvKwjhd1bDYq0uFB9JEysOluZhDGP_Kt8pCW1gOZ1IGlbQrnFVC56XvvT0PZIj7yPCV6N1v1ygJVQzlmxPuY7oHZNhPX03pCJLnc3OioxFEaPpNTBAaEbSK1LoE7WohjT77NRPvS8z4ZKGoz2jKDTN7bcRpJethjSH4gNzQWrMJtq8',
			alt: 'Vintage university library with tall wooden shelves and a single focused student',
			aspect: '4/3'
		}
	},
	{
		dateRange: '2021 — 2022',
		color: 'secondary',
		title: { prefix: 'Scaling', italic: 'Perspectives' },
		description:
			"Transitioning to a Master's in Big Data Analytics shifted my focus from micro-logic to macro-patterns. I learned to navigate the noise of massive datasets, finding the signal that drives strategic decisions. It was here I realized that data is the ultimate storyteller.",
		detail: {
			icon: 'data_exploration',
			label: 'MSc Big Data Analytics',
			sub: 'Specialization: Machine Learning'
		},
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKWtFoEcwQwVKtXxUKzDlEG5A0ew24nTUhNc8uPHXpkWRqpNN15xwgqjFYDgJWyUuZCP2z9DX6OhAJ4dSXalf6tS6pzTuV3gkatjgXLIHJLBOw38q6zUdEu2bb5DnWgQnZ7Za3553YHO11kYmVLWNz49nLvc0ZtV-0wy8eF0ULC_wC1PUsqEK1faSTt1n3M-ySRG4S1BgfIa8WN8ovjJgVZbQrB34TU-9rUGQvv7MLEQNIqX3jKq0vmEf235cWOelsBlEgafnap4',
			alt: 'Abstract network of glowing blue nodes and connecting lines representing big data scale',
			aspect: '4/3'
		}
	},
	{
		dateRange: '2023 — Present',
		color: 'tertiary',
		title: { prefix: 'The Amsterdam', italic: 'Synthesis' },
		description:
			"Moving to Amsterdam wasn't just a change of location; it was a change of rhythm. The city's blend of historic charm and cutting-edge tech innovation became my new home. Today, I work as a Data Analyst, bridging the gap between technical complexity and business intelligence.",
		detail: {
			icon: 'location_city',
			label: 'Living & Working',
			sub: 'Amsterdam, NL'
		},
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3A67SCeaEtV8VUB7fUQ3n2-iicz2GZVONJN7mUdFg3TY_1xYH7Zg2aO_UbFgQwripPWklx5D8VO7cA9U6JzyHxpaghtRyJ8fOxF4L-G2HGKTUNfCKaEREV6vagbWmg2Q9jHh1IPxWj5CC7OIFOyThemmL8WD-wkFYwT7XS0DW1rQw6nHimfI-vNLGjtct8CfhjA4UjB5lz9d1IZt4WiGLHZC2QKdIINn80-puR2EEN0uW_OV--1wAKCK9FLYlS87eZmDvWz_5tFc',
			alt: 'A foggy morning over an Amsterdam canal with bicycles parked on a bridge',
			aspect: '1/1'
		}
	}
];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: no errors related to `timeline.ts`

---

### Task 4: Replace hardcoded project cards on home page

**Files:**
- Modify: `src/routes/+page.svelte:1-3` (script block — add import)
- Modify: `src/routes/+page.svelte:90-231` (replace 3 hardcoded articles with `{#each}` loop)

- [ ] **Step 1: Update the script block to import projects**

Replace the existing `<script lang="ts">` block:

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { projects } from '$lib/data/projects';
</script>
```

- [ ] **Step 2: Replace the 3 hardcoded `<article>` blocks with a single `{#each}` loop**

Replace everything inside the `<!-- Project Cards Grid -->` div (the `<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">` on line 90) — from line 90 through line 231 — with:

```svelte
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each projects as project}
						<article
							class="journal-shadow group flex flex-col overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest"
						>
							<div class="relative aspect-[4/3] overflow-hidden bg-surface-variant">
								<img
									class="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
									alt={project.image.alt}
									src={project.image.src}
								/>
								<div class="absolute top-4 left-4">
									<span
										class="rounded-full bg-white/90 px-3 py-1 font-label text-[10px] tracking-widest text-on-surface uppercase backdrop-blur-sm"
										>{project.date}</span
									>
								</div>
							</div>
							<div class="flex flex-grow flex-col p-8">
								<div class="mb-4 flex items-center gap-4">
									<span
										class="font-label text-[10px] font-bold tracking-widest text-primary uppercase"
										>{project.tags[0]}</span
									>
									<span class="flex items-center gap-1 text-[10px] text-outline">
										<span class="material-symbols-outlined text-[14px]">schedule</span>
										{project.readTime}
									</span>
								</div>
								<h3
									class="mb-4 font-serif text-2xl leading-snug text-on-surface transition-colors group-hover:text-primary"
								>
									{project.title}
								</h3>
								<p class="mb-8 font-body text-sm leading-relaxed text-on-surface-variant">
									{project.description}
								</p>
								<div class="mt-auto border-t border-outline-variant/10 pt-6">
									<a
										class="flex items-center justify-between font-label text-xs font-bold tracking-widest text-primary uppercase transition-transform hover:translate-x-2"
										href="/entries/{project.slug}"
									>
										{project.cta}
										<span class="material-symbols-outlined text-sm">arrow_forward</span>
									</a>
								</div>
							</div>
						</article>
					{/each}
				</div>
```

Note: The first project card had `grayscale-[20%]` on its image while the other two did not. The loop normalizes to include `grayscale-[20%]` on all cards for consistency. If this is undesirable, remove it from the loop body.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: no errors

- [ ] **Step 4: Visual verification**

Open `http://localhost:5174` in the browser. The home page project cards should render identically to before — same 3 cards, same order, same images, dates, tags, descriptions, and CTAs.

---

### Task 5: Replace hardcoded timeline chapters on about page

**Files:**
- Modify: `src/routes/about/+page.svelte:1-3` (script block — add import and color map)
- Modify: `src/routes/about/+page.svelte:28-155` (replace 3 hardcoded chapters with `{#each}` loop)

- [ ] **Step 1: Update the script block**

Replace the existing `<script lang="ts">` block with:

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { timeline } from '$lib/data/timeline';

	const colorClasses: Record<
		'primary' | 'secondary' | 'tertiary',
		{ text: string; bg: string; container: string; overlay: string }
	> = {
		primary: {
			text: 'text-primary',
			bg: 'bg-primary',
			container: 'bg-surface-container',
			overlay: 'bg-primary/10'
		},
		secondary: {
			text: 'text-secondary',
			bg: 'bg-secondary',
			container: 'bg-secondary-container/30',
			overlay: 'bg-secondary/10'
		},
		tertiary: {
			text: 'text-tertiary',
			bg: 'bg-tertiary',
			container: 'bg-tertiary-container/30',
			overlay: 'bg-tertiary/10'
		}
	};

	const aspectClasses: Record<'4/3' | '3/4' | '1/1', string> = {
		'4/3': 'aspect-[4/3]',
		'3/4': 'aspect-[3/4]',
		'1/1': 'aspect-square'
	};
</script>
```

The `colorClasses` lookup maps each color value to its full Tailwind class strings — this avoids dynamic class interpolation which Tailwind would purge. The `aspectClasses` lookup does the same for aspect ratios.

- [ ] **Step 2: Replace the 3 hardcoded chapter divs with a single `{#each}` loop**

Replace the `<!-- Visual Timeline -->` section content (lines 28-155, from `<section class="relative mx-auto...">` through its closing `</section>`) with:

```svelte
	<!-- Visual Timeline -->
	<section class="relative mx-auto max-w-[1440px] px-12">
		<!-- Continuous Timeline Line -->
		<div
			class="timeline-line absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 opacity-20 lg:block"
		></div>
		{#each timeline as chapter, i}
			{@const colors = colorClasses[chapter.color]}
			{@const aspect = aspectClasses[chapter.image.aspect]}
			{@const imageLeft = i % 2 === 0}
			<div class="relative mb-40 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-32">
				<!-- Image -->
				<div class={imageLeft ? 'order-2 lg:order-1' : ''}>
					<div class="group relative {aspect} overflow-hidden rounded-2xl shadow-2xl">
						<img
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							alt={chapter.image.alt}
							src={chapter.image.src}
						/>
						<div class="absolute inset-0 {colors.overlay} mix-blend-multiply"></div>
					</div>
				</div>
				<!-- Text -->
				<div
					class="relative {imageLeft ? 'order-1 lg:order-2 lg:pl-12' : 'text-right lg:pr-12'}"
				>
					<div
						class="absolute top-8 {imageLeft
							? '-left-[calc(16rem+1px)]'
							: '-right-[calc(16rem+1px)]'} z-10 hidden h-8 w-8 rounded-full border-4 border-white {colors.bg} lg:block"
					></div>
					<span
						class="mb-4 block font-label text-sm font-bold tracking-widest {colors.text} uppercase"
						>{chapter.dateRange}</span
					>
					<h2 class="mb-6 font-headline text-5xl">
						{chapter.title.prefix} <span class="serif-italic">{chapter.title.italic}</span>
					</h2>
					<p class="mb-6 text-lg leading-relaxed text-on-surface-variant">
						{chapter.description}
					</p>
					<div class="flex {imageLeft ? '' : 'justify-end'} gap-4">
						{#if imageLeft}
							<div class="rounded-lg {colors.container} p-3">
								<span class="material-symbols-outlined {colors.text}"
									>{chapter.detail.icon}</span
								>
							</div>
							<div>
								<p class="text-sm font-bold">{chapter.detail.label}</p>
								<p class="text-xs tracking-wide text-on-surface-variant uppercase">
									{chapter.detail.sub}
								</p>
							</div>
						{:else}
							<div class="text-right">
								<p class="text-sm font-bold">{chapter.detail.label}</p>
								<p class="text-xs tracking-wide text-on-surface-variant uppercase">
									{chapter.detail.sub}
								</p>
							</div>
							<div class="rounded-lg {colors.container} p-3">
								<span class="material-symbols-outlined {colors.text}"
									>{chapter.detail.icon}</span
								>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</section>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: no errors

- [ ] **Step 4: Visual verification**

Open `http://localhost:5174/about` in the browser. The timeline should render identically:
- Chapter 1 (primary/blue): image left, text right, `aspect-[4/3]`
- Chapter 2 (secondary): text left, image right, `aspect-[4/3]`
- Chapter 3 (tertiary): image left, text right, `aspect-square`
- Timeline dots positioned correctly on the center line
- Color tokens match (dot color, text color, icon container, image overlay)

---

### Task 6: End-to-end verification

- [ ] **Step 1: TypeScript check**

Run: `npx svelte-check --threshold error`
Expected: 0 errors

- [ ] **Step 2: Visual check — home page**

Open `http://localhost:5174`. Confirm:
- 3 project cards render in the grid
- Images, dates, tags, read times, titles, descriptions, and CTAs all match the original

- [ ] **Step 3: Visual check — about page**

Open `http://localhost:5174/about`. Confirm:
- 3 timeline chapters render with alternating layout
- Colors, images, text, and detail blocks all match the original

- [ ] **Step 4: Add/remove test**

Temporarily comment out the second entry in `src/lib/data/projects.ts`. Confirm the home page now shows 2 cards. Uncomment to restore.
