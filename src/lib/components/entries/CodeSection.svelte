<script>
	export let label;
	export let title;
	export let titleLine2 = '';
	export let ctaHref = '#';
	export let ctaLabel = '';
	export let ctaIcon = '';
</script>

<section class="mx-auto mb-20 max-w-[1440px] px-4 md:px-8">
	<div
		class="overflow-hidden rounded-2xl border border-outline-variant/10 bg-white shadow-lg md:rounded-[2.5rem]"
	>
		<div class="code-section-grid">
			<div class="sidebar-col">
				<div class="space-y-6 md:space-y-10">
					<div class="space-y-4">
						<span class="text-xs font-bold tracking-widest text-secondary uppercase">{label}</span>
						<div class="font-headline text-3xl leading-tight italic md:text-5xl">
							{title}{#if titleLine2}<br />{titleLine2}{/if}
						</div>
					</div>
					<div class="sidebar-content">
						<slot name="sidebar" />
					</div>
				</div>
				{#if ctaLabel}
					<a
						class="group spt-8 md:spt-12 mt-4 flex items-center justify-center gap-3 rounded-2xl bg-secondary px-6 py-3 text-xs font-bold tracking-widest text-on-secondary uppercase transition-colors hover:bg-secondary-dim md:px-8 md:py-4 md:text-sm"
						href={ctaHref}
					>
						{#if ctaIcon}
							<span class="material-symbols-outlined text-xl">{ctaIcon}</span>
						{/if}
						{ctaLabel}
						<span class="material-symbols-outlined transition-transform group-hover:translate-x-1"
							>arrow_outward</span
						>
					</a>
				{/if}
			</div>
			<div class="code-col">
				<slot name="code" />
			</div>
		</div>
	</div>
</section>

<style>
	.code-section-grid {
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 1024px) {
		.code-section-grid {
			grid-template-columns: 1fr 2fr;
		}
	}

	.sidebar-col {
		display: flex;
		flex-direction: column;
		background-color: var(--color-surface-container-lowest);
		padding: 1.5rem;
	}

	@media (min-width: 768px) {
		.sidebar-col {
			padding: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.sidebar-col {
			padding: 5rem;
		}
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Prevent grid item from forcing a minimum width — lets <pre> constrain and scroll */
	.code-col {
		min-width: 0;
	}
</style>
