<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { projects } from '$lib/data/projects';
</script>

<svelte:head>
	<title>Emna | Data Analyst — Amsterdam</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="atmospheric-hero relative overflow-hidden px-12 pt-48 pb-32">
		<div class="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6">
			<span class="font-label text-sm tracking-widest text-on-primary-container/80 uppercase"
				>Analytical Explorer</span
			>
			<h1
				class="max-w-4xl font-serif text-6xl leading-tight text-on-primary-container italic md:text-8xl"
			>
				Emna — <span class="font-normal opacity-80">Data Analyst in Amsterdam.</span>
			</h1>
			<p class="mt-4 max-w-xl font-body text-xl leading-relaxed text-on-primary-container/70">
				Bridging the gap between complex algorithms and human intuition. Combining a
				<strong>Bachelor in Computer Science</strong> with a
				<strong>Master's in Big Data Analytics</strong> to uncover the narratives hidden in numbers.
			</p>
			<div class="mt-8 flex gap-4">
				<div
					class="journal-shadow flex items-center gap-4 rounded-xl bg-white/20 px-6 py-4 backdrop-blur-md"
				>
					<span class="material-symbols-outlined text-primary">school</span>
					<div>
						<p class="font-serif text-2xl leading-none text-on-primary-container">BSc</p>
						<p
							class="font-label text-[10px] tracking-tighter text-on-primary-container/60 uppercase"
						>
							Computer Science
						</p>
					</div>
				</div>
				<div
					class="journal-shadow flex items-center gap-4 rounded-xl bg-white/20 px-6 py-4 backdrop-blur-md"
				>
					<span class="material-symbols-outlined text-secondary">workspace_premium</span>
					<div>
						<p class="font-serif text-2xl leading-none text-on-primary-container">MSc</p>
						<p
							class="font-label text-[10px] tracking-tighter text-on-primary-container/60 uppercase"
						>
							Big Data Analytics
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- Cloud Decorations -->
		<div
			class="absolute top-1/4 right-[-10%] h-[600px] w-[600px] rounded-full bg-white/30 blur-[100px]"
		></div>
		<div
			class="absolute bottom-[-20%] left-[10%] h-[500px] w-[500px] rounded-full bg-secondary-container/40 blur-[120px]"
		></div>
	</section>

	<!-- Projects Grid -->
	<section class="bg-surface px-12 py-24">
		<div class="mx-auto max-w-7xl">
			<div
				class="mb-16 flex flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-end"
			>
				<div class="max-w-md">
					<h2 class="mb-4 font-serif text-4xl text-on-surface">Latest Inquiries</h2>
					<div class="h-[1px] w-24 bg-primary-fixed-dim"></div>
				</div>
				<div class="flex flex-wrap gap-4">
					<span
						class="rounded-md bg-secondary-container px-4 py-2 font-label text-xs tracking-widest text-on-secondary-container uppercase"
						>All Projects</span
					>
					<span
						class="cursor-pointer rounded-md px-4 py-2 font-label text-xs tracking-widest uppercase transition-colors hover:bg-surface-container"
						>ML Research</span
					>
					<span
						class="cursor-pointer rounded-md px-4 py-2 font-label text-xs tracking-widest uppercase transition-colors hover:bg-surface-container"
						>Visualizations</span
					>
				</div>
			</div>
			<!-- Project Cards Grid -->
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each projects as project}
					<article
						class="journal-shadow group flex flex-col overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest"
					>
						<div class="relative aspect-[4/3] overflow-hidden bg-surface-variant">
							<img
								class="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
								alt={project.image.alt}
								src={project.image.src}
							/>
							<div class="absolute top-4 left-4">
								<span
									class="rounded-full bg-white/90 px-3 py-1 font-label text-[10px] tracking-widest text-on-surface uppercase backdrop-blur-sm"
									>{project.date}</span
								>
							</div>
						</div>
						<div class="flex flex-grow flex-col p-8">
							<div class="mb-4 flex items-center gap-4">
								<span
									class="font-label text-[10px] font-bold tracking-widest text-primary uppercase"
									>{project.tags[0]}</span
								>
								<span class="flex items-center gap-1 text-[10px] text-outline">
									<span class="material-symbols-outlined text-[14px]">schedule</span>
									{project.readTime}
								</span>
							</div>
							<h3
								class="mb-4 font-serif text-2xl leading-snug text-on-surface transition-colors group-hover:text-primary"
							>
								{project.title}
							</h3>
							<p class="mb-8 font-body text-sm leading-relaxed text-on-surface-variant">
								{project.description}
							</p>
							<div class="mt-auto border-t border-outline-variant/10 pt-6">
								<a
									class="flex items-center justify-between font-label text-xs font-bold tracking-widest text-primary uppercase transition-transform hover:translate-x-2"
									href="/entries/{project.slug}"
								>
									{project.cta}
									<span class="material-symbols-outlined text-sm">arrow_forward</span>
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<div class="mt-24 flex justify-center">
				<button
					class="group flex items-center gap-4 font-serif text-2xl text-on-surface italic transition-colors hover:text-primary"
				>
					Enter the Archives
					<span class="material-symbols-outlined transition-transform group-hover:translate-x-2"
						>east</span
					>
				</button>
			</div>
		</div>
	</section>

	<!-- Signature Quote -->
	<section class="relative overflow-hidden bg-surface-container-low py-40 text-center">
		<div class="relative z-10 mx-auto max-w-3xl px-12">
			<span class="material-symbols-outlined mb-8 text-6xl text-primary-fixed opacity-30"
				>format_quote</span
			>
			<blockquote class="mb-12 font-serif text-4xl leading-relaxed text-on-surface italic">
				"Data is not just information; it is the visible ripple on the surface of an invisible sea
				of causality."
			</blockquote>
			<cite class="font-label text-xs tracking-[0.2em] text-outline uppercase"
				>Editorial Note &#8470; 001</cite
			>
		</div>
		<div
			class="absolute bottom-0 left-1/2 h-[1px] w-[100px] -translate-x-1/2 bg-primary-fixed-dim"
		></div>
	</section>
</main>

<Footer variant="simple" />
