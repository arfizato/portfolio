<script>
	export let title = '';
</script>

<section class="bg-surface-container-low px-4 py-16 md:px-12 md:py-24">
	<div class="mx-auto max-w-[1440px]">
		{#if title}
			<div class="mb-16 text-center">
				<h2 class="mb-4 font-headline text-4xl text-on-surface italic">{title}</h2>
				<div class="mx-auto h-px w-24 bg-primary-fixed-dim"></div>
			</div>
		{/if}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
			<slot />
		</div>
	</div>
</section>
