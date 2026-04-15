<script>
	export let icon = 'hub';
	export let title;
	export let description;
	export let steps = [];

	const textColorMap = {
		primary: 'text-primary',
		secondary: 'text-secondary',
		tertiary: 'text-tertiary'
	};
</script>

<div
	class="flex flex-col justify-between gap-8 rounded-2xl md:rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:min-h-[500px] md:p-12"
>
	<div class="max-w-xl">
		<div class="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
			<span class="material-symbols-outlined text-primary">{icon}</span>
		</div>
		<h4 class="mb-4 text-2xl font-bold italic">{title}</h4>
		<p class="mb-12 leading-relaxed text-on-surface-variant">{description}</p>
	</div>
	<div
		class="w-full rounded-2xl border border-dashed border-outline-variant/30 bg-surface-container-low/50 p-4 md:p-8"
	>
		<div class="flex flex-col items-center gap-4 opacity-70 sm:flex-row sm:justify-around">
			{#each steps as step, i}
				{#if i > 0}
					<div class="hidden h-px flex-1 bg-outline-variant/20 sm:block sm:mx-4"></div>
					<div class="h-6 w-px bg-outline-variant/20 sm:hidden"></div>
				{/if}
				<div class="flex flex-col items-center gap-4">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm sm:h-16 sm:w-16"
					>
						<span
							class="material-symbols-outlined text-2xl sm:text-3xl {textColorMap[step.color] ||
								'text-primary'}">{step.icon}</span
						>
					</div>
					<span class="text-[10px] font-bold tracking-widest uppercase">{step.label}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
