<script>
	export let title;
	export let icon = 'trending_up';
	export let bars = [];
</script>

<div class="rounded-xl border-t-4 border-secondary-fixed bg-surface-container-lowest p-6 md:p-8">
	<div class="mb-4 flex items-center justify-between">
		<span class="font-label text-xs font-bold text-on-surface">{title}</span>
		<span class="material-symbols-outlined text-secondary">{icon}</span>
	</div>
	<div class="space-y-3">
		{#each bars as bar}
			<div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
				<div class="h-full {bar.color || 'bg-primary'}" style="width: {bar.pct}%"></div>
			</div>
		{/each}
	</div>
</div>
