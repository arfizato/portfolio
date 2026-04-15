<script>
	export let flush = false;
	export let spacing = 'mb-40';
</script>

<section class="mx-auto max-w-[1440px] px-4 md:px-8 {spacing}">
	{#if flush}
		<div
			class="overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-outline-variant/10 bg-white shadow-lg"
		>
			<slot />
		</div>
	{:else if $$slots.left && $$slots.right}
		<div
			class="rounded-2xl md:rounded-[2.5rem] border border-outline-variant/10 bg-white p-6 shadow-sm md:p-12 lg:p-24"
		>
			<div class="two-col-grid">
				<div class="left-col"><slot name="left" /></div>
				<div><slot name="right" /></div>
			</div>
		</div>
	{:else}
		<div
			class="rounded-2xl md:rounded-[2.5rem] border border-outline-variant/10 bg-white p-6 shadow-sm md:p-12 lg:p-24"
		>
			<slot />
		</div>
	{/if}
</section>

<style>
	.two-col-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;
	}

	@media (min-width: 768px) {
		.two-col-grid {
			gap: 6rem;
		}
	}

	@media (min-width: 1024px) {
		.two-col-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.left-col {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
