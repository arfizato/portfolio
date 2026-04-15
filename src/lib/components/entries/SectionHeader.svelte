<script>
	export let number;
	export let section;
	export let title;
	export let buttonLabel = '';
	export let buttonIcon = '';
	export let buttonHref = '#';
</script>

<section class="mx-auto mb-40 max-w-[1440px] px-4 md:px-8">
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
	{#if $$slots.main && $$slots.side}
		<div class="section-grid">
			<div class="main-col"><slot name="main" /></div>
			<div class="side-col"><slot name="side" /></div>
		</div>
	{:else}
		<slot />
	{/if}
</section>

<style>
	.section-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.section-grid {
			grid-template-columns: 2fr 1fr;
		}
	}

	.side-col {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
