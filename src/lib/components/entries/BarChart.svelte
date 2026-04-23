<script>
	export let label = '';
	export let title = '';
	export let caption = '';
	export let bars = [];
</script>

<div class="flex min-h-[300px] flex-col justify-between rounded-xl bg-surface-container-lowest p-6 sm:col-span-2 md:min-h-[400px] md:p-10">
	<div>
		{#if label}
			<span class="font-label text-xs font-bold tracking-widest text-primary uppercase">{label}</span>
		{/if}
		{#if title}
			<h3 class="mt-2 mb-6 font-headline text-2xl text-on-surface">{title}</h3>
		{/if}
	</div>
	<div class="flex h-48 flex-grow items-end justify-between gap-2">
		{#each bars as bar}
			<div class="w-full rounded-t-lg {bar.color || 'bg-primary-container'}" style="height: {bar.pct}%"></div>
		{/each}
	</div>
	{#if caption}
		<p class="mt-6 font-body text-sm text-on-surface-variant italic">{caption}</p>
	{/if}
</div>
