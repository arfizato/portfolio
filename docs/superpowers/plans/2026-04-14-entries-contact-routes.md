# Entries & Contact Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/entries` catalog page and `/contact` page, extend `Project` with a `category` enum, create reusable `ContactItem` and `SocialLink` components, and update navigation.

**Architecture:** Entries page reuses `projects.ts` data with a new `category` field, displayed in a vertical card list. Contact page is a static form with reusable sidebar components. Both follow existing patterns: MD3 color tokens, Tailwind-safe lookup maps, `{#each}` loops, Svelte 5 runes.

**Tech Stack:** SvelteKit 2 (Svelte 5 runes), Tailwind CSS v4 (MD3 tokens), Material Symbols Outlined

**Spec:** `docs/superpowers/specs/2026-04-14-entries-contact-routes-design.md`

---

### File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/lib/data/types.ts` | Add `category` to `Project` interface |
| Modify | `src/lib/data/projects.ts` | Add `category` value to each project entry |
| Create | `src/lib/components/ContactItem.svelte` | Reusable contact info row component |
| Create | `src/lib/components/SocialLink.svelte` | Reusable external link row component |
| Create | `src/routes/entries/+page.svelte` | Entries catalog page |
| Create | `src/routes/contact/+page.svelte` | Contact page |
| Modify | `src/lib/components/Nav.svelte` | Update Entries and Contact hrefs |
| Modify | `src/routes/+layout.svelte` | Add `/entries` and `/contact` to route map |

---

### Task 1: Extend Project type with category

**Files:**
- Modify: `src/lib/data/types.ts:6-15`
- Modify: `src/lib/data/projects.ts:3-46`

- [ ] **Step 1: Add `category` field to the `Project` interface**

In `src/lib/data/types.ts`, add `category` after `readTime`:

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

- [ ] **Step 2: Add `category` to each project entry**

In `src/lib/data/projects.ts`, add the `category` field to each project object:

- First project ("Geometry of Silence"): add `category: 'scholarly',` after the `readTime` line
- Second project ("Linguistic Drift"): add `category: 'scholarly',` after the `readTime` line
- Third project ("Fractal Patterns"): add `category: 'technical',` after the `readTime` line

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: 0 errors

---

### Task 2: Create ContactItem component

**Files:**
- Create: `src/lib/components/ContactItem.svelte`

- [ ] **Step 1: Create `src/lib/components/ContactItem.svelte`**

```svelte
<script lang="ts">
	interface Props {
		icon: string;
		label: string;
		value: string;
		color: 'primary' | 'secondary';
	}

	let { icon, label, value, color }: Props = $props();

	const colorClasses: Record<'primary' | 'secondary', { bg: string; text: string }> = {
		primary: { bg: 'bg-primary-container', text: 'text-on-primary-container' },
		secondary: { bg: 'bg-secondary-container', text: 'text-on-secondary-container' }
	};

	const colors = $derived(colorClasses[color]);
</script>

<div
	class="group flex items-center gap-6 rounded-xl p-4 transition-all duration-300 hover:bg-surface-container-low"
>
	<div
		class="flex h-12 w-12 items-center justify-center rounded-full {colors.bg} {colors.text}"
	>
		<span class="material-symbols-outlined">{icon}</span>
	</div>
	<div>
		<p class="font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase">
			{label}
		</p>
		<p class="font-body text-lg text-on-surface">{value}</p>
	</div>
</div>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: 0 errors

---

### Task 3: Create SocialLink component

**Files:**
- Create: `src/lib/components/SocialLink.svelte`

- [ ] **Step 1: Create `src/lib/components/SocialLink.svelte`**

```svelte
<script lang="ts">
	interface Props {
		name: string;
		href?: string;
	}

	let { name, href = '#' }: Props = $props();
</script>

<a
	class="group flex items-center justify-between rounded-xl bg-surface-container-low p-4 transition-all duration-300 hover:bg-primary-container/20"
	{href}
>
	<span class="font-body font-medium text-on-surface group-hover:text-primary">{name}</span>
	<span
		class="material-symbols-outlined text-outline-variant group-hover:text-primary"
		>north_east</span
	>
</a>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: 0 errors

---

### Task 4: Create entries catalog page

**Files:**
- Create: `src/routes/entries/+page.svelte`

- [ ] **Step 1: Create `src/routes/entries/+page.svelte`**

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { projects } from '$lib/data/projects';

	const categoryClasses: Record<
		'scholarly' | 'technical',
		{ bg: string; text: string; icon: string; label: string }
	> = {
		scholarly: {
			bg: 'bg-secondary-container',
			text: 'text-on-secondary-container',
			icon: 'auto_stories',
			label: 'Scholarly Study'
		},
		technical: {
			bg: 'bg-primary-container',
			text: 'text-on-primary-container',
			icon: 'terminal',
			label: 'Technical Deep Dive'
		}
	};
</script>

<svelte:head>
	<title>Entries | Emna — Data Analyst</title>
</svelte:head>

<main class="px-6 pt-32 pb-20 lg:px-24">
	<!-- Hero -->
	<div class="mb-16 max-w-4xl">
		<h1
			class="mb-8 font-headline text-6xl font-light tracking-tight text-on-surface md:text-8xl"
		>
			The Archives
		</h1>
		<div class="flex flex-col gap-8 md:flex-row md:items-end">
			<p
				class="max-w-2xl font-body text-lg font-light leading-relaxed text-on-surface-variant md:text-xl"
			>
				A collection of intellectual pursuits categorized by their methodology. Here, data is
				more than a metric; it is a narrative woven through scholarly inquiry and technical
				rigor.
			</p>
			<div class="flex gap-4">
				<div class="h-px w-24 self-center bg-primary-fixed-dim opacity-40"></div>
			</div>
		</div>
	</div>

	<!-- Filter Tabs -->
	<div class="mx-auto mb-12 flex max-w-4xl flex-wrap gap-3">
		<button
			class="flex items-center space-x-2 rounded-full border border-pink-100 bg-white px-6 py-2.5 text-pink-700 shadow-sm transition-all duration-300 hover:shadow-md"
		>
			<span class="material-symbols-outlined text-sm">auto_stories</span>
			<span class="font-label text-[11px] font-bold tracking-widest uppercase"
				>Analytical Studies</span
			>
		</button>
		<button
			class="flex items-center space-x-2 rounded-full border border-slate-100 bg-white px-6 py-2.5 text-slate-500 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
		>
			<span class="material-symbols-outlined text-sm">terminal</span>
			<span class="font-label text-[11px] font-bold tracking-widest uppercase"
				>Technical Deep Dives</span
			>
		</button>
		<button
			class="flex items-center space-x-2 rounded-full border border-slate-100 bg-white px-6 py-2.5 transition-all duration-300 hover:bg-slate-50"
		>
			<span class="font-label text-[11px] font-bold tracking-widest text-slate-400 uppercase"
				>View All</span
			>
		</button>
	</div>

	<!-- Entry List -->
	<div class="mx-auto max-w-4xl">
		<div class="flex flex-col gap-12">
			{#each projects as project}
				{@const cat = categoryClasses[project.category]}
				<article
					class="journal-shadow group grid grid-cols-1 gap-0 overflow-hidden rounded-2xl bg-surface-container-lowest transition-all duration-300 hover:shadow-[0_20px_60px_rgba(46,51,55,0.1)] md:grid-cols-12 md:gap-8"
				>
					<div class="aspect-[16/10] overflow-hidden md:col-span-5 md:aspect-auto">
						<img
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							alt={project.image.alt}
							src={project.image.src}
						/>
					</div>
					<div
						class="flex flex-col justify-center p-8 md:col-span-7 md:p-10"
					>
						<div class="mb-4 flex items-center gap-2">
							<div
								class="{cat.bg} {cat.text} flex items-center gap-1.5 rounded-md px-3 py-1"
							>
								<span class="material-symbols-outlined text-sm">{cat.icon}</span>
								<span class="font-label text-[11px] font-bold tracking-widest uppercase"
									>{cat.label}</span
								>
							</div>
							<span class="font-body text-xs text-on-surface-variant italic"
								>{project.readTime}</span
							>
						</div>
						<h2
							class="mb-4 font-headline text-3xl font-medium text-on-surface md:text-4xl"
						>
							{project.title}
						</h2>
						<p
							class="mb-8 max-w-xl font-body text-sm font-light leading-relaxed text-on-surface-variant"
						>
							{project.description}
						</p>
						<a
							class="group/link mt-auto inline-flex items-center text-sm font-semibold text-primary"
							href="#"
						>
							{project.cta}
							<span
								class="material-symbols-outlined ml-1 transition-transform group-hover/link:translate-x-1"
								>arrow_forward</span
							>
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</main>

<Footer variant="simple" />
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: 0 errors

---

### Task 5: Create contact page

**Files:**
- Create: `src/routes/contact/+page.svelte`

- [ ] **Step 1: Create `src/routes/contact/+page.svelte`**

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import ContactItem from '$lib/components/ContactItem.svelte';
	import SocialLink from '$lib/components/SocialLink.svelte';
</script>

<svelte:head>
	<title>Contact | Emna — Data Analyst</title>
</svelte:head>

<main class="relative min-h-screen overflow-hidden">
	<!-- Atmospheric Background -->
	<div class="sky-gradient absolute top-0 left-0 -z-10 h-[614px] w-full opacity-20 blur-3xl">
	</div>
	<div
		class="absolute -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-secondary-container opacity-30 blur-3xl"
	></div>

	<div class="mx-auto max-w-6xl px-6 py-20 pt-32 lg:py-32 lg:pt-40">
		<!-- Header -->
		<header class="mb-20 max-w-2xl text-center md:text-left">
			<h1
				class="mb-6 font-headline text-6xl tracking-tight text-on-surface md:text-7xl lg:text-8xl"
			>
				Reach Out
			</h1>
			<p class="font-body text-lg leading-relaxed text-on-surface-variant md:text-xl">
				A collaborative space where inquiry meets data. Whether you have a scholarly inquiry
				or a creative vision, I invite you to share your thoughts.
			</p>
		</header>

		<div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
			<!-- Contact Form -->
			<div class="lg:col-span-7">
				<div
					class="journal-shadow relative overflow-hidden rounded-xl bg-surface-container-lowest p-8 md:p-12"
				>
					<!-- Decorative corner gradient -->
					<div
						class="sky-gradient absolute top-0 right-0 h-32 w-32 rounded-bl-full opacity-5"
					></div>
					<form class="relative z-10 space-y-8">
						<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
							<div class="space-y-2">
								<label
									class="font-body text-sm font-semibold tracking-widest text-on-surface opacity-70 uppercase"
									for="name">Name</label
								>
								<input
									class="w-full rounded-lg border-none bg-surface-container-low p-4 text-on-surface outline-none transition-all duration-300 placeholder:opacity-30 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
									id="name"
									type="text"
									placeholder="Emilia Noels"
								/>
							</div>
							<div class="space-y-2">
								<label
									class="font-body text-sm font-semibold tracking-widest text-on-surface opacity-70 uppercase"
									for="email">Email</label
								>
								<input
									class="w-full rounded-lg border-none bg-surface-container-low p-4 text-on-surface outline-none transition-all duration-300 placeholder:opacity-30 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
									id="email"
									type="email"
									placeholder="hello@dataartistry.edu"
								/>
							</div>
						</div>
						<div class="space-y-2">
							<label
								class="font-body text-sm font-semibold tracking-widest text-on-surface opacity-70 uppercase"
								for="message">Message</label
							>
							<textarea
								class="w-full resize-none rounded-lg border-none bg-surface-container-low p-4 text-on-surface outline-none transition-all duration-300 placeholder:opacity-30 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
								id="message"
								rows="6"
								placeholder="Share your inquiry or data narrative..."
							></textarea>
						</div>
						<button
							class="w-full rounded-full bg-gradient-to-r from-primary to-primary-dim px-10 py-4 font-body text-sm font-bold tracking-widest text-on-primary uppercase transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 active:scale-95 md:w-auto"
							type="submit"
						>
							Send Inquiry
						</button>
					</form>
				</div>
			</div>

			<!-- Sidebar -->
			<aside class="space-y-12 lg:col-span-5 lg:pl-12">
				<section>
					<h3 class="mb-8 font-headline text-3xl text-on-surface">
						Other Ways to Connect
					</h3>
					<div class="space-y-6">
						<ContactItem
							icon="mail"
							label="Inquiries"
							value="emna@datajournal.io"
							color="secondary"
						/>
						<ContactItem
							icon="location_on"
							label="Studio"
							value="Amsterdam, Netherlands"
							color="primary"
						/>
					</div>
				</section>

				<section class="space-y-6">
					<h4
						class="px-4 font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase"
					>
						Scholarly Networks
					</h4>
					<div class="grid grid-cols-1 gap-4">
						<SocialLink name="LinkedIn" />
						<SocialLink name="GitHub" />
						<SocialLink name="ResearchGate" />
					</div>
				</section>

				<!-- Decorative Image -->
				<div class="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
					<img
						class="h-full w-full object-cover grayscale-[20%] sepia-[10%] brightness-105"
						alt="Minimal aesthetic workspace with soft morning light, a delicate vase of flowers, and a notebook on a white marble desk"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPjlCN42nSp8Ksy7ceBNFdBHt1eASoWSroeFbjPan2HM6y_b9uNLOFrVCwdovjsKRYMRqVKsVZm15zQt-RfAKJU7b85B4EM6ZStsCyc-SdK0oTeS1WVw7L2vmQEHXi-gNZ-v9PkuiqKIhzXoU4kUWgvhZWNh88a8IHKFLN9JIgTUlwlHirMpJSne-dCGkoEZ2lCRvxLvYnV3-bZGNP-8r9y4LMXIiB8UooBPFRPBeTPnCO1859TJEjRY0UqcfckzrOjEMA7Uv4wHw"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
					></div>
				</div>
			</aside>
		</div>
	</div>
</main>

<Footer variant="simple" />
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: 0 errors

---

### Task 6: Update navigation and layout

**Files:**
- Modify: `src/lib/components/Nav.svelte:14`
- Modify: `src/lib/components/Nav.svelte:15`
- Modify: `src/routes/+layout.svelte:9-14`

- [ ] **Step 1: Update Nav links**

In `src/lib/components/Nav.svelte`, change the `links` array entries:

Replace:
```ts
	const links: NavLink[] = [
		{ label: 'Home', href: '/', key: 'home' },
		{ label: 'Entries', href: '/journal', key: 'entries' },
		{ label: 'About', href: '/about', key: 'about' },
		{ label: 'Contact', href: '#', key: 'contact' }
	];
```

With:
```ts
	const links: NavLink[] = [
		{ label: 'Home', href: '/', key: 'home' },
		{ label: 'Entries', href: '/entries', key: 'entries' },
		{ label: 'About', href: '/about', key: 'about' },
		{ label: 'Contact', href: '/contact', key: 'contact' }
	];
```

- [ ] **Step 2: Update layout route map**

In `src/routes/+layout.svelte`, replace the `routeToPage` object:

Replace:
```ts
	const routeToPage: Record<string, 'home' | 'entries' | 'about' | 'contact'> = {
		'/': 'home',
		'/journal': 'entries',
		'/technical': 'entries',
		'/about': 'about'
	};
```

With:
```ts
	const routeToPage: Record<string, 'home' | 'entries' | 'about' | 'contact'> = {
		'/': 'home',
		'/journal': 'entries',
		'/technical': 'entries',
		'/entries': 'entries',
		'/about': 'about',
		'/contact': 'contact'
	};
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx svelte-check --threshold error`
Expected: 0 errors

---

### Task 7: Visual verification

- [ ] **Step 1: Check entries page**

Open `http://localhost:5174/entries` in the browser. Confirm:
- "The Archives" hero with headline and descriptive text
- Three filter tab pills (non-functional)
- Three entry cards in a vertical list — each with image left, content right on desktop
- Category badges colored correctly: "Scholarly Study" (pink/secondary) for first two, "Technical Deep Dive" (blue/primary) for the third
- Read time displayed next to each badge
- Cards have journal-shadow and hover shadow escalation
- Responsive: stacks to single column on mobile

- [ ] **Step 2: Check contact page**

Open `http://localhost:5174/contact` in the browser. Confirm:
- Atmospheric gradient background visible
- "Reach Out" hero headline
- Form card with Name, Email, Message fields and "Send Inquiry" button
- Sidebar with "Other Ways to Connect" (email + location using ContactItem)
- "Scholarly Networks" section with LinkedIn, GitHub, ResearchGate using SocialLink
- Decorative image with grayscale/sepia/gradient treatment
- Responsive: form stacks above sidebar on mobile

- [ ] **Step 3: Check navigation**

- Click "Entries" in the nav → navigates to `/entries`, "Entries" link is active
- Click "Contact" in the nav → navigates to `/contact`, "Contact" link is active
- Click "Home" → returns to `/`, "Home" link is active
- Existing "About" link still works

- [ ] **Step 4: Check home page still works**

Open `http://localhost:5174`. Confirm:
- Project cards still render (the `category` field addition didn't break anything)
- All 3 cards visible with correct data
