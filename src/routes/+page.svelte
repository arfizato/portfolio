<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Emna | Data Analyst — Amsterdam</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="atmospheric-hero relative overflow-hidden px-12 pt-48 pb-32">
		<div class="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6">
			<span class="font-label text-on-primary-container/80 text-sm uppercase tracking-widest"
				>Analytical Explorer</span
			>
			<h1
				class="max-w-4xl font-serif text-6xl leading-tight text-on-primary-container italic md:text-8xl"
			>
				Emna — <span class="font-normal opacity-80">Data Analyst in Amsterdam.</span>
			</h1>
			<p class="font-body text-on-primary-container/70 mt-4 max-w-xl text-xl leading-relaxed">
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
							class="font-label text-on-primary-container/60 text-[10px] uppercase tracking-tighter"
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
							class="font-label text-on-primary-container/60 text-[10px] uppercase tracking-tighter"
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
					<h2 class="text-on-surface mb-4 font-serif text-4xl">Latest Inquiries</h2>
					<div class="bg-primary-fixed-dim h-[1px] w-24"></div>
				</div>
				<div class="flex flex-wrap gap-4">
					<span
						class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-2 text-xs uppercase tracking-widest"
						>All Projects</span
					>
					<span
						class="hover:bg-surface-container font-label cursor-pointer rounded-md px-4 py-2 text-xs uppercase tracking-widest transition-colors"
						>ML Research</span
					>
					<span
						class="hover:bg-surface-container font-label cursor-pointer rounded-md px-4 py-2 text-xs uppercase tracking-widest transition-colors"
						>Visualizations</span
					>
				</div>
			</div>
			<!-- Project Cards Grid -->
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Project 1 -->
				<article
					class="journal-shadow bg-surface-container-lowest group flex flex-col overflow-hidden rounded-xl border border-outline-variant/10"
				>
					<div class="bg-surface-variant relative aspect-[4/3] overflow-hidden">
						<img
							class="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
							alt="Minimalist abstract data visualization with soft pink and blue nodes"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9tAIep-xRYYA0q8UW_NVV-lvhFA41expkHmrrvQ63iX7ytYqQ_zsQt5mjGpv3qVkO1cOL9Wk3gq9XpbyKRlcJwQzmOXiuAnyxkDqC0Zm75cPQRLVkXaUqnwJIk18w3kPA97uaNYnfmk4WahOFVVxmvmWKtdudOdHcWbhwlwwiM1kqxCyk5Ybd-VHygQgQtgh2KMBbvt0J-H6FyGMyjN7-4nNHAhROBMsR3KS9dWfyW1ECVm7QX2X2xFUJja-7u6KyWlvjP0ZhAnk"
						/>
						<div class="absolute top-4 left-4">
							<span
								class="text-on-surface font-label rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm"
								>March 14, 2024</span
							>
						</div>
					</div>
					<div class="flex flex-grow flex-col p-8">
						<div class="mb-4 flex items-center gap-4">
							<span class="text-primary font-label text-[10px] font-bold uppercase tracking-widest"
								>Acoustic Ecology</span
							>
							<span class="text-outline flex items-center gap-1 text-[10px]">
								<span class="material-symbols-outlined text-[14px]">schedule</span> 12 min
							</span>
						</div>
						<h3
							class="text-on-surface group-hover:text-primary mb-4 font-serif text-2xl leading-snug transition-colors"
						>
							The Geometry of Silence: Analysis of Ambient Noise
						</h3>
						<p class="font-body text-on-surface-variant mb-8 text-sm leading-relaxed">
							A longitudinal study exploring frequency correlations with local biodiversity patterns
							in metropolitan hubs.
						</p>
						<div class="mt-auto border-t border-outline-variant/10 pt-6">
							<a
								class="font-label text-primary flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-transform hover:translate-x-2"
								href="#"
							>
								Read Analysis
								<span class="material-symbols-outlined text-sm">arrow_forward</span>
							</a>
						</div>
					</div>
				</article>

				<!-- Project 2 -->
				<article
					class="journal-shadow bg-surface-container-lowest group flex flex-col overflow-hidden rounded-xl border border-outline-variant/10"
				>
					<div class="bg-surface-variant relative aspect-[4/3] overflow-hidden">
						<img
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							alt="Scholarly journal with elegant typography next to a prism reflecting light"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkdTJy6JJxIYLF_SEoVJg24958yWijgYep9fp1fSfyChiVIkchDK3G8w4qGSQ-ipT4dUXUWeKbKCziABT5E_rhUtkaDzvnPAhylASkTqPaXwYrzwJleBTSAJ-RAsmf5taRVv2rklERJPrlnwSxcTzPvHnJ-pc0xYlsaH9bP-zOjlug0NRAwEiqmwVAh1b_yL4nHxf3LNjV1lMUHZtzhbUQD0SkgFfO2mOg87BbUnMxgHkWyBwjfJ6Me7nUQl4i-IQKTdFO40yzIXw"
						/>
						<div class="absolute top-4 left-4">
							<span
								class="text-on-surface font-label rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm"
								>Feb 28, 2024</span
							>
						</div>
					</div>
					<div class="flex flex-grow flex-col p-8">
						<div class="mb-4 flex items-center gap-4">
							<span class="text-primary font-label text-[10px] font-bold uppercase tracking-widest"
								>NLP</span
							>
							<span class="text-outline flex items-center gap-1 text-[10px]">
								<span class="material-symbols-outlined text-[14px]">schedule</span> 8 min
							</span>
						</div>
						<h3
							class="text-on-surface group-hover:text-primary mb-4 font-serif text-2xl leading-snug transition-colors"
						>
							Linguistic Drift in Digital Correspondence
						</h3>
						<p class="font-body text-on-surface-variant mb-8 text-sm leading-relaxed">
							Tracking the evolution of semantic meaning through five years of personal email archives
							using NLP and LDA.
						</p>
						<div class="mt-auto border-t border-outline-variant/10 pt-6">
							<a
								class="font-label text-primary flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-transform hover:translate-x-2"
								href="#"
							>
								View Repository
								<span class="material-symbols-outlined text-sm">arrow_forward</span>
							</a>
						</div>
					</div>
				</article>

				<!-- Project 3 -->
				<article
					class="journal-shadow bg-surface-container-lowest group flex flex-col overflow-hidden rounded-xl border border-outline-variant/10"
				>
					<div class="bg-surface-variant relative aspect-[4/3] overflow-hidden">
						<img
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							alt="Delicate watercolor style scatter plot with soft pastel points"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwfDv92j92Ll_Xkrhs-6neckDVzBGytjDFLX3PBOch1Rj5a0Lt1MxtKhcKVT3xOb1ZAzsSdEMyrh6FaNd2tAjcIZcqZXww8BwUbv0I0QN0ZbOWUXEeWZzHhVXhh7ig96tu8NBkJhtPxA30V6u44Tx2_W29y0dT7p3a5_e1Xr545871yhH6ciS7AOSJEBRc5QEoHFDHWJgmn8C_aYRzKOHSU1S_1dWbDwX5IOuwG7AbI40Hky_blvZlr9e5Z2H0W63KJsRAjPhFE0U"
						/>
						<div class="absolute top-4 left-4">
							<span
								class="text-on-surface font-label rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm"
								>Jan 12, 2024</span
							>
						</div>
					</div>
					<div class="flex flex-grow flex-col p-8">
						<div class="mb-4 flex items-center gap-4">
							<span class="text-primary font-label text-[10px] font-bold uppercase tracking-widest"
								>Complexity Theory</span
							>
							<span class="text-outline flex items-center gap-1 text-[10px]">
								<span class="material-symbols-outlined text-[14px]">schedule</span> 15 min
							</span>
						</div>
						<h3
							class="text-on-surface group-hover:text-primary mb-4 font-serif text-2xl leading-snug transition-colors"
						>
							Fractal Patterns in Financial Volatility
						</h3>
						<p class="font-body text-on-surface-variant mb-8 text-sm leading-relaxed">
							Exploring why market movements mimic the branching of trees more than the rolling of
							dice in chaotic systems.
						</p>
						<div class="mt-auto border-t border-outline-variant/10 pt-6">
							<a
								class="font-label text-primary flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-transform hover:translate-x-2"
								href="#"
							>
								Full Dataset
								<span class="material-symbols-outlined text-sm">arrow_forward</span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<div class="mt-24 flex justify-center">
				<button
					class="text-on-surface hover:text-primary group flex items-center gap-4 font-serif text-2xl italic transition-colors"
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
	<section class="bg-surface-container-low relative overflow-hidden py-40 text-center">
		<div class="relative z-10 mx-auto max-w-3xl px-12">
			<span class="material-symbols-outlined text-primary-fixed mb-8 text-6xl opacity-30"
				>format_quote</span
			>
			<blockquote class="text-on-surface mb-12 font-serif text-4xl leading-relaxed italic">
				"Data is not just information; it is the visible ripple on the surface of an invisible sea
				of causality."
			</blockquote>
			<cite class="font-label text-outline text-xs uppercase tracking-[0.2em]"
				>Editorial Note &#8470; 001</cite
			>
		</div>
		<div
			class="bg-primary-fixed-dim absolute bottom-0 left-1/2 h-[1px] w-[100px] -translate-x-1/2"
		></div>
	</section>
</main>

<Footer variant="simple" />
