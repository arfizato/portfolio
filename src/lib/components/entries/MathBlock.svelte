<script>
	export let equation;
	export let tags = [];
	export let label = '';
</script>

<div class="relative rounded-2xl md:rounded-3xl bg-surface-container-low p-6 md:p-12">
	<div
		class="math-block overflow-x-auto py-8 md:py-16 text-center font-headline text-xl text-primary-dim italic sm:text-3xl md:text-4xl"
	>
		{@html equation}
	</div>
	{#if tags.length > 0 || label}
		<div
			class="mt-12 flex items-center justify-between border-t border-outline-variant/20 pt-8"
		>
			<div class="flex gap-3">
				{#each tags as tag}
					{@const colorMap = {
						secondary: 'bg-secondary-container/50 text-on-secondary-container',
						primary: 'bg-primary-container/50 text-on-primary-container'
					}}
					<span
						class="rounded-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase {colorMap[tag.color] || colorMap.primary}"
						>{tag.label}</span
					>
				{/each}
			</div>
			{#if label}
				<span class="text-[10px] font-bold tracking-[0.2em] text-outline uppercase"
					>{label}</span
				>
			{/if}
		</div>
	{/if}
</div>
