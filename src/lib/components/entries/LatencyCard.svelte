<script>
	export let title;
	export let description;
	export let bars = [];
	export let labels = [];

	const bgColorMap = {
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		tertiary: 'bg-tertiary',
		'outline-variant': 'bg-outline-variant'
	};
</script>

<div class="flex-1 rounded-[2rem] border border-outline-variant/10 bg-surface-container-high p-10">
	<h4 class="mb-4 text-lg font-bold">{title}</h4>
	<p class="mb-6 text-sm leading-relaxed text-on-surface-variant">{description}</p>
	<div class="space-y-4">
		{#each bars as bar}
			<div class="h-1.5 w-full overflow-hidden rounded-full bg-white/50">
				<div
					class="h-full {bgColorMap[bar.color] || 'bg-primary'}"
					style="width: {bar.pct}%"
				></div>
			</div>
		{/each}
		{#if labels.length > 0}
			<div
				class="flex justify-between text-[10px] font-bold tracking-tighter uppercase opacity-60"
			>
				{#each labels as lbl}
					<span>{lbl}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
