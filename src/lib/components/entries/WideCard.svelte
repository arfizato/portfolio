<script>
	export let title;
	export let description;
	export let image = '';
	export let imageAlt = '';
</script>

<div class="flex flex-col items-center gap-8 rounded-xl bg-surface-container-lowest p-8 sm:col-span-2 md:col-span-3 md:flex-row md:gap-12 md:p-12">
	<div class="flex-1">
		<h3 class="mb-4 font-headline text-2xl text-on-surface italic md:text-3xl">{title}</h3>
		<p class="font-body leading-relaxed text-on-surface-variant">{description}</p>
	</div>
	{#if image}
		<div class="relative h-48 w-full flex-1 overflow-hidden rounded-lg bg-surface-container-low">
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent opacity-20"
			></div>
			<img
				class="h-full w-full object-cover opacity-40 mix-blend-multiply"
				alt={imageAlt}
				src={image}
			/>
		</div>
	{/if}
</div>
