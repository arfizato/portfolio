<script lang="ts">
	interface Props {
		icon: string;
		label: string;
		value: string;
		color: 'primary' | 'secondary';
	}

	let { icon, label, value, color }: Props = $props();

	const colorClasses: Record<'primary' | 'secondary', { bg: string; text: string }> = {
		primary: { bg: 'bg-primary-container', text: 'text-on-primary-container' },
		secondary: { bg: 'bg-secondary-container', text: 'text-on-secondary-container' }
	};

	const colors = $derived(colorClasses[color]);
</script>

<div
	class="group flex items-center gap-6 rounded-xl p-4 transition-all duration-300 hover:bg-surface-container-low"
>
	<div
		class="flex h-12 w-12 items-center justify-center rounded-full {colors.bg} {colors.text}"
	>
		<span class="material-symbols-outlined">{icon}</span>
	</div>
	<div>
		<p class="font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase">
			{label}
		</p>
		<p class="font-body text-lg text-on-surface">{value}</p>
	</div>
</div>
