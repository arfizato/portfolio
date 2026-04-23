<script>
	import Footer from '$lib/components/Footer.svelte';

	export let title;
	export let titleItalic = '';
	export let subtitle;
	export let label;
	export let authors = [];
	export let date;
	export let readTime;
	export let footer = 'expanded';
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
		<slot />
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

	.entry-content :global(p:not([class])) {
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
