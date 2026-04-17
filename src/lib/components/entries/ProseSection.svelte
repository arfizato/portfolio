<script>
	export let title = '';
	export let tags = [];
</script>

<section class="bg-surface px-4 py-20 md:px-12 md:py-32">
	<div class="mx-auto max-w-3xl">
		{#if title}
			<h2 class="mb-12 text-center font-headline text-3xl text-on-surface italic sm:text-5xl">
				{title}
			</h2>
		{/if}
		<div class="prose-body">
			<slot />
		</div>
		{#if tags.length > 0}
			<div class="mt-20 flex flex-wrap justify-center gap-3">
				{#each tags as tag}
					<span
						class="rounded-md bg-secondary-container px-4 py-1.5 font-label text-sm text-on-secondary-container"
						>#{tag}</span
					>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.prose-body {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.prose-body :global(p) {
		font-family: var(--font-body);
		font-size: 1.25rem;
		line-height: 1.8;
		color: var(--color-on-surface-variant);
	}

	.prose-body :global(blockquote) {
		border-left: 2px solid var(--color-primary-fixed);
		padding: 1rem 0 1rem 2rem;
		font-family: var(--font-headline);
		font-size: 1.5rem;
		font-style: italic;
		color: var(--color-on-surface);
	}
</style>
