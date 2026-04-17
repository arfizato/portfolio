<script>
	export let image = '';
	export let imageAlt = '';
</script>

<section class="bg-surface px-4 py-16 md:px-12 md:py-24">
	<div class="intro-grid mx-auto max-w-[1440px]">
		<div class="prose-col">
			<slot name="prose" />
		</div>
		{#if image}
			<div class="flex items-center">
				<div class="relative aspect-square w-full overflow-hidden rounded-xl shadow-sm">
					<img class="h-full w-full object-cover" alt={imageAlt} src={image} />
					<div class="absolute inset-0 bg-primary/10 backdrop-blur-[2px]"></div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.intro-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media (min-width: 768px) {
		.intro-grid {
			grid-template-columns: 5fr 5fr;
			gap: 4rem;
		}
	}

	.prose-col {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
