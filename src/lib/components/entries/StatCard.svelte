<script>
	export let icon;
	export let value;
	export let label;
	export let sublabel = '';
</script>

<div class="flex h-[240px] flex-col justify-between rounded-[2rem] bg-primary p-10 text-on-primary">
	<div class="flex items-start justify-between">
		<span class="material-symbols-outlined text-4xl">{icon}</span>
		{#if sublabel}
			<span class="text-[10px] font-bold tracking-widest uppercase opacity-70">{sublabel}</span>
		{/if}
	</div>
	<div>
		<h5 class="mb-1 font-headline text-5xl font-light">{value}</h5>
		<p class="text-xs font-bold tracking-widest uppercase opacity-70">{label}</p>
	</div>
</div>
