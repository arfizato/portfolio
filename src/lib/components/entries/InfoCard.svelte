<script>
	export let icon = '';
	export let iconColor = 'text-secondary';
	export let title;
	export let description;
</script>

<div class="rounded-xl bg-surface-container-lowest p-6 md:p-10">
	{#if icon}
		<span class="material-symbols-outlined mb-4 text-3xl {iconColor}">{icon}</span>
	{/if}
	<h4 class="mb-2 font-label font-bold text-on-surface">{title}</h4>
	<p class="font-body text-sm leading-relaxed text-on-surface-variant">{description}</p>
</div>
