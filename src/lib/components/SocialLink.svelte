<script lang="ts">
	interface Props {
		name: string;
		href?: string;
	}

	let { name, href = '#' }: Props = $props();
</script>

<a
	class="group flex items-center justify-between rounded-xl bg-surface-container-low p-4 transition-all duration-300 hover:bg-primary-container/20"
	{href}
>
	<span class="font-body font-medium text-on-surface group-hover:text-primary">{name}</span>
	<span
		class="material-symbols-outlined text-outline-variant group-hover:text-primary"
		>north_east</span
	>
</a>
