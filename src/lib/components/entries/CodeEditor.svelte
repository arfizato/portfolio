<script>
	export let filename;
	export let notes = '';
</script>

<div class="relative h-full bg-[#0c1117] p-6 pt-14 md:p-12 md:pt-14 lg:p-20 lg:pt-14">
	<div class="absolute top-6 left-6 flex gap-2 md:top-8 md:left-12">
		<div class="h-3 w-3 rounded-full bg-red-500/30"></div>
		<div class="h-3 w-3 rounded-full bg-amber-500/30"></div>
		<div class="h-3 w-3 rounded-full bg-emerald-500/30"></div>
	</div>
	<div class="mb-8 flex items-center justify-between border-b border-white/5 pb-6 md:mb-12">
		<span class="font-mono text-xs tracking-widest text-white/40 uppercase">{filename}</span>
		<!-- <div class="flex gap-4">
			<span
				class="material-symbols-outlined cursor-pointer text-lg text-white/30 transition-colors hover:text-white"
				>content_copy</span
			>
			<span
				class="material-symbols-outlined cursor-pointer text-lg text-white/30 transition-colors hover:text-white"
				>settings</span
			>
		</div> -->
	</div>
	<div class="code-body">
		<slot />
	</div>
	{#if notes}
		<div class="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 md:mt-12 md:p-6">
			<p class="font-mono text-xs text-white/50 italic">{notes}</p>
		</div>
	{/if}
</div>

<style>
	.code-body :global(pre) {
		overflow-x: auto;
		font-size: 0.75rem;
		line-height: 1.8;
		color: #cbd5e1;
	}

	@media (min-width: 768px) {
		.code-body :global(pre) {
			font-size: 1rem;
		}
	}
</style>
