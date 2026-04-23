<script>
	export let icon = 'terminal';
</script>

<div class="mt-12 rounded-xl border-l-4 border-primary bg-surface-container-low p-6 md:p-8">
	<span
		class="material-symbols-outlined mb-4 text-primary"
		style="font-variation-settings: 'FILL' 1;">{icon}</span
	>
	<code class="block font-body text-sm leading-loose text-on-surface-variant">
		<slot />
	</code>
</div>
