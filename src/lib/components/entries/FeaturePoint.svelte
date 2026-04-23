<script>
	export let color = 'primary';
	export let title;
	export let description;

	const colorMap = {
		primary: 'bg-primary-fixed-dim',
		secondary: 'bg-secondary-fixed-dim'
	};
</script>

<div class="flex items-start gap-4 pt-4">
	<div class="h-12 w-1 {colorMap[color] || colorMap.primary}"></div>
	<div class="space-y-2">
		<h5 class="font-headline text-xl font-bold italic">{title}</h5>
		<p class="text-xs leading-relaxed text-on-surface-variant">{description}</p>
	</div>
</div>
