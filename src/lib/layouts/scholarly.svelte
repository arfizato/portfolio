<script>
	import Footer from '$lib/components/Footer.svelte';

	export let title;
	export let subtitle;
	export let badge = '';
	export let badgeIcon = 'science';
	export let author = {};
	export let date = '';
	export let footer = 'simple';
</script>

<main class="pt-24">
	<header class="relative flex min-h-[716px] items-center justify-center overflow-hidden px-6">
		<div class="sky-gradient absolute inset-0 z-0 opacity-60"></div>
		<div
			class="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20"
		></div>
		<div class="relative z-10 max-w-4xl text-center">
			{#if badge}
				<div
					class="mb-8 inline-flex items-center gap-2 rounded-md bg-secondary-container px-4 py-1 text-on-secondary-container"
				>
					<span class="material-symbols-outlined text-sm">{badgeIcon}</span>
					<span class="font-label text-xs font-semibold tracking-[0.2em] uppercase"
						>{badge}</span
					>
				</div>
			{/if}
			<h1 class="mb-8 font-headline text-4xl leading-[1.1] text-on-surface italic sm:text-6xl md:text-8xl">
				{title}
			</h1>
			<p
				class="mx-auto max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant sm:text-xl md:text-2xl"
			>
				{subtitle}
			</p>
			{#if author.name}
				<div class="mt-12 flex items-center justify-center gap-6">
					<div class="flex items-center gap-3">
						{#if author.image}
							<img
								class="h-12 w-12 rounded-full border-2 border-surface-container-lowest object-cover"
								alt="Portrait of {author.name}"
								src={author.image}
							/>
						{/if}
						<div class="text-left">
							<span class="block font-label text-sm font-bold text-on-surface"
								>{author.name}</span
							>
							{#if author.role}
								<span class="block font-label text-xs text-on-surface-variant"
									>{author.role}</span
								>
							{/if}
						</div>
					</div>
					{#if date}
						<div class="h-8 w-px bg-outline-variant/30"></div>
						<div class="text-left">
							<span
								class="block font-label text-xs tracking-widest text-on-surface-variant uppercase"
								>Published</span
							>
							<span class="block font-label text-sm font-bold text-on-surface">{date}</span
							>
						</div>
					{/if}
				</div>
			{/if}
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
		font-size: 2.25rem;
		color: var(--color-on-surface);
	}

	.entry-content :global(p:not([class])) {
		font-family: var(--font-body);
		font-size: 1.125rem;
		line-height: 1.75;
		color: var(--color-on-surface-variant);
	}

	.entry-content :global(a:not([class])) {
		color: var(--color-primary);
		font-weight: 600;
	}

	.entry-content :global(a:not([class]):hover) {
		opacity: 0.8;
	}
</style>
