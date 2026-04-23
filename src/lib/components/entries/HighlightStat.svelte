<script>
	export let value;
	export let label;
</script>

<div class="flex flex-col justify-center rounded-xl bg-primary p-10 text-center text-on-primary">
	<span class="mb-2 font-headline text-4xl italic md:text-6xl">{value}</span>
	<span class="font-label text-sm tracking-widest uppercase opacity-80">{label}</span>
</div>
