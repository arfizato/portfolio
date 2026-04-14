<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import Footer from '$lib/components/Footer.svelte';
	import { projects } from '$lib/data/projects';

	type Filter = 'all' | 'scholarly' | 'technical';
	let activeFilter = $state<Filter>('all');
	let displayedProjects = $state(projects);
	let pendingTimeout: ReturnType<typeof setTimeout> | undefined;
	let heightTimeout: ReturnType<typeof setTimeout> | undefined;
	let listEl: HTMLDivElement;

	function setFilter(filter: Filter) {
		clearTimeout(pendingTimeout);
		clearTimeout(heightTimeout);
		activeFilter = filter;

		if (listEl) listEl.style.minHeight = `${listEl.offsetHeight}px`;

		const target = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
		const targetSlugs = new Set(target.map((p) => p.slug));
		const currentSlugs = new Set(displayedProjects.map((p) => p.slug));

		const hasRemovals = displayedProjects.some((p) => !targetSlugs.has(p.slug));
		const hasAdditions = target.some((p) => !currentSlugs.has(p.slug));

		if (hasRemovals && hasAdditions) {
			displayedProjects = displayedProjects.filter((p) => targetSlugs.has(p.slug));
			pendingTimeout = setTimeout(() => {
				displayedProjects = target;
			}, 250);
			heightTimeout = setTimeout(() => {
				if (listEl) listEl.style.minHeight = '';
			}, 600);
		} else {
			displayedProjects = target;
			heightTimeout = setTimeout(() => {
				if (listEl) listEl.style.minHeight = '';
			}, 350);
		}
	}

	const filters: { key: Filter; icon: string; label: string }[] = [
		{ key: 'all', icon: '', label: 'View All' },
		{ key: 'scholarly', icon: 'auto_stories', label: 'Analytical Studies' },
		{ key: 'technical', icon: 'terminal', label: 'Technical Deep Dives' }
	];

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

<main class="px-12 pt-32 pb-20">
	<!-- Hero -->
	<div class="mb-16 max-w-4xl">
		<h1 class="mb-8 font-headline text-6xl font-light tracking-tight text-on-surface md:text-8xl">
			The Archives
		</h1>
		<div class="flex flex-col gap-8 md:flex-row md:items-end">
			<p
				class="max-w-2xl font-body text-lg leading-relaxed font-light text-on-surface-variant md:text-xl"
			>
				A collection of intellectual pursuits categorized by their methodology. Here, data is more
				than a metric; it is a narrative woven through scholarly inquiry and technical rigor.
			</p>
			<div class="flex gap-4">
				<div class="h-px w-24 self-center bg-primary-fixed-dim opacity-40"></div>
			</div>
		</div>
	</div>

	<!-- Filter Tabs -->
	<div class="mx-auto mb-12 flex max-w-4xl flex-wrap gap-3">
		{#each filters as filter}
			{@const isActive = activeFilter === filter.key}
			<button
				class="flex items-center space-x-2 rounded-full border px-6 py-2.5 transition-all duration-300 {isActive
					? 'border-primary/20 bg-primary-container text-on-primary-container shadow-sm'
					: 'border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'}"
				onclick={() => setFilter(filter.key)}
			>
				{#if filter.icon}
					<span class="material-symbols-outlined text-sm">{filter.icon}</span>
				{/if}
				<span class="font-label text-[11px] font-bold tracking-widest uppercase"
					>{filter.label}</span
				>
			</button>
		{/each}
	</div>

	<!-- Entry List -->
	<div class="mx-auto max-w-5xl">
		<div bind:this={listEl} class="flex flex-col gap-12">
			{#each displayedProjects as project (project.slug)}
				{@const cat = categoryClasses[project.category]}
				<article
					class="journal-shadow group grid grid-cols-1 gap-0 overflow-hidden rounded-2xl bg-surface-container-lowest transition-all duration-300 hover:shadow-[0_20px_60px_rgba(46,51,55,0.1)] md:grid-cols-12 md:gap-8"
					in:fly={{ y: 30, duration: 300 }}
					out:fade={{ duration: 200 }}
				>
					<div class="aspect-[16/10] overflow-hidden md:col-span-5 md:aspect-auto">
						<img
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							alt={project.image.alt}
							src={project.image.src}
						/>
					</div>
					<div class="flex flex-col justify-center p-8 md:col-span-7 md:p-10">
						<div class="mb-4 flex items-center gap-2">
							<div class="{cat.bg} {cat.text} flex items-center gap-1.5 rounded-md px-3 py-1">
								<span class="material-symbols-outlined text-sm">{cat.icon}</span>
								<span class="font-label text-[11px] font-bold tracking-widest uppercase"
									>{cat.label}</span
								>
							</div>
							<span class="font-body text-xs text-on-surface-variant italic"
								>{project.readTime}</span
							>
						</div>
						<h2 class="mb-4 font-headline text-3xl font-medium text-on-surface md:text-4xl">
							{project.title}
						</h2>
						<p
							class="mb-8 max-w-xl font-body text-sm leading-relaxed font-light text-on-surface-variant"
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
