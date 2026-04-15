<script>
	export let filename;
	export let notes = '';
</script>

<div class="relative overflow-hidden bg-[#0c1117] p-12 lg:p-20">
	<div class="absolute top-8 left-12 flex gap-2">
		<div class="h-3 w-3 rounded-full bg-red-500/30"></div>
		<div class="h-3 w-3 rounded-full bg-amber-500/30"></div>
		<div class="h-3 w-3 rounded-full bg-emerald-500/30"></div>
	</div>
	<div class="mb-12 flex items-center justify-between border-b border-white/5 pb-6">
		<span class="font-mono text-xs tracking-widest text-white/40 uppercase">{filename}</span>
		<div class="flex gap-4">
			<span
				class="material-symbols-outlined cursor-pointer text-lg text-white/30 transition-colors hover:text-white"
				>content_copy</span
			>
			<span
				class="material-symbols-outlined cursor-pointer text-lg text-white/30 transition-colors hover:text-white"
				>settings</span
			>
		</div>
	</div>
	<div class="code-body">
		<slot />
	</div>
	{#if notes}
		<div class="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
			<p class="font-mono text-xs text-white/50 italic">{notes}</p>
		</div>
	{/if}
</div>

<style>
	.code-body :global(pre) {
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.8;
		color: #cbd5e1;
	}

	@media (min-width: 768px) {
		.code-body :global(pre) {
			font-size: 1rem;
		}
	}
</style>
