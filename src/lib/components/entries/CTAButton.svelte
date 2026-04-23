<script>
	export let href = '#';
	export let icon = '';
	export let variant = 'link';
</script>

{#if variant === 'link'}
	<a
		class="group inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase"
		{href}
	>
		<span><slot /></span>
		<span
			class="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1"
			>arrow_forward</span
		>
	</a>
{:else}
	<a
		class="group mt-12 flex items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-sm font-bold tracking-widest text-on-secondary uppercase transition-colors hover:bg-secondary-dim"
		{href}
	>
		{#if icon}
			<span class="material-symbols-outlined text-xl">{icon}</span>
		{/if}
		<slot />
		<span
			class="material-symbols-outlined transition-transform group-hover:translate-x-1"
			>arrow_outward</span
		>
	</a>
{/if}
