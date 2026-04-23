<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>The Spectral Rhythm of Global Trade | Data Artistry</title>
</svelte:head>

<main class="pt-24">
	<!-- Hero Header -->
	<header class="relative flex min-h-[716px] items-center justify-center overflow-hidden px-6">
		<div class="sky-gradient absolute inset-0 z-0 opacity-60"></div>
		<div
			class="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20"
		></div>
		<div class="relative z-10 max-w-4xl text-center">
			<div
				class="mb-8 inline-flex items-center gap-2 rounded-md bg-secondary-container px-4 py-1 text-on-secondary-container"
			>
				<span class="material-symbols-outlined text-sm">science</span>
				<span class="font-label text-xs font-semibold tracking-[0.2em] uppercase"
					>Scholarly Inquiry &bull; Vol. 04</span
				>
			</div>
			<h1 class="mb-8 font-headline text-6xl leading-[1.1] text-on-surface italic md:text-8xl">
				The Spectral Rhythm of Global Trade
			</h1>
			<p
				class="mx-auto max-w-2xl font-body text-xl leading-relaxed text-on-surface-variant md:text-2xl"
			>
				A deep-layered decomposition of seasonal maritime data, exploring the unseen frequencies
				that drive our interconnected markets.
			</p>
			<div class="mt-12 flex items-center justify-center gap-6">
				<div class="flex items-center gap-3">
					<img
						class="h-12 w-12 rounded-full border-2 border-surface-container-lowest object-cover"
						alt="Portrait of Dr. Julian Vane"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3S7PjefllO57kV8BdcRk2wHRu1Fmmr9JYDFfC0tb15SHFhaZUDVBOHnatyCLohaOF-R0J2om-WUUybpvh1KrwJL4mzxLn4vFTypuajSrfbRvAQqmr08bGDw24-acNKveB4PMhzq0ig0VLE-Aymia79lC90AbuCtzGePuCUorUfG_9ajHHVjWqIojre1B99DWJx2LL7PBWO1KvMDvD0qaJLIr14IhDLGb_P18e4H1WophXWcwcAUzkgrCOL8UDD4T_abfFKp7EGg"
					/>
					<div class="text-left">
						<span class="block font-label text-sm font-bold text-on-surface">Dr. Julian Vane</span>
						<span class="block font-label text-xs text-on-surface-variant">Lead Researcher</span>
					</div>
				</div>
				<div class="h-8 w-px bg-outline-variant/30"></div>
				<div class="text-left">
					<span class="block font-label text-xs tracking-widest text-on-surface-variant uppercase"
						>Published</span
					>
					<span class="block font-label text-sm font-bold text-on-surface">Oct 14, 2024</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Project Introduction Section -->
	<section class="bg-surface px-12 py-24">
		<div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12">
			<div class="md:col-span-5 md:col-start-2">
				<h2 class="mb-8 font-headline text-4xl text-on-surface">The Premise of Complexity</h2>
				<div class="space-y-6 font-body text-lg leading-relaxed text-on-surface-variant">
					<p>
						In the grand tapestry of global logistics, every vessel leaving port is a data point in
						a much larger, harmonic oscillation. This entry examines the hypothesis that maritime
						traffic follows a fractal pattern, echoing the turbulent dynamics of fluid mechanics
						rather than simple linear economics.
					</p>
					<p>
						Our analysis utilizes a combination of Fourier transformations and PCA (Principal
						Component Analysis) to strip away the "noise" of short-term volatility, revealing the
						underlying structural skeleton of global movement.
					</p>
				</div>
				<div class="mt-12 rounded-xl border-l-4 border-primary bg-surface-container-low p-8">
					<span
						class="material-symbols-outlined mb-4 text-primary"
						style="font-variation-settings: 'FILL' 1;">terminal</span
					>
					<code class="block font-body text-sm leading-loose text-on-surface-variant">
						df.decompose(period=365, model='multiplicative')<br />
						result.plot().show()
					</code>
				</div>
			</div>
			<div class="flex items-center md:col-span-5">
				<div class="relative aspect-square w-full overflow-hidden rounded-xl shadow-sm">
					<img
						class="h-full w-full object-cover"
						alt="Abstract architectural photograph of modern glass buildings"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdaOjoLoiZYgr3_RVbqP4qvCAIMi2v1P0ChO_pUEZAXVpnvLQ8HKAUn88fwWo4ZPBhR93ARs9hQdbrNTdKDOir0mRc2eVp4goYMmIBzwlZSQCw0qFXe5bS_cpx1lctB0_UDFaTbNIlmbNkIQVNEcUWEo0uCuG2eTvkET1ikfKlshVA6vAVa4rM7ses_P-tbLoRaU1RZ3JsnF97Jo0tLmgX2i9otP1KUFiqWRlzy0KEX2v0J45rVObx7EKwu5yYlnrYksdzzwwl62g"
					/>
					<div class="absolute inset-0 bg-primary/10 backdrop-blur-[2px]"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Data Exploration (Bento Grid) -->
	<section class="bg-surface-container-low px-12 py-24">
		<div class="mx-auto max-w-[1440px]">
			<div class="mb-16 text-center">
				<h2 class="mb-4 font-headline text-4xl text-on-surface italic">Observation Layers</h2>
				<div class="mx-auto h-px w-24 bg-primary-fixed-dim"></div>
			</div>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-4">
				<!-- Chart A-1 -->
				<div
					class="flex min-h-[400px] flex-col justify-between rounded-xl bg-surface-container-lowest p-10 md:col-span-2"
				>
					<div>
						<span class="font-label text-xs font-bold tracking-widest text-primary uppercase"
							>Chart A-1</span
						>
						<h3 class="mt-2 mb-6 font-headline text-2xl text-on-surface">
							Seasonal Variance Density
						</h3>
					</div>
					<div class="flex h-48 flex-grow items-end justify-between gap-2">
						<div class="h-[40%] w-full rounded-t-lg bg-primary-container"></div>
						<div class="h-[65%] w-full rounded-t-lg bg-primary-container"></div>
						<div class="h-[90%] w-full rounded-t-lg bg-primary-container"></div>
						<div class="h-[75%] w-full rounded-t-lg bg-secondary-container"></div>
						<div class="h-[45%] w-full rounded-t-lg bg-primary-container"></div>
						<div class="h-[30%] w-full rounded-t-lg bg-primary-container"></div>
						<div class="h-[55%] w-full rounded-t-lg bg-primary-container"></div>
					</div>
					<p class="mt-6 font-body text-sm text-on-surface-variant italic">
						Visualizing the relative weight of seasonal adjustments over a 10-year horizon.
					</p>
				</div>
				<!-- Highlight Card -->
				<div
					class="flex flex-col justify-center rounded-xl bg-primary p-10 text-center text-on-primary"
				>
					<span class="mb-2 font-headline text-6xl italic">98.2%</span>
					<span class="font-label text-sm tracking-widest uppercase opacity-80"
						>Correlation Index</span
					>
				</div>
				<!-- Technical Detail -->
				<div class="rounded-xl bg-surface-container-lowest p-10">
					<span class="material-symbols-outlined mb-4 text-3xl text-secondary">analytics</span>
					<h4 class="mb-2 font-label font-bold text-on-surface">Stochastic Modeling</h4>
					<p class="font-body text-sm leading-relaxed text-on-surface-variant">
						Applying Monte Carlo simulations to predict maritime route deviations under extreme
						climatic stressors.
					</p>
				</div>
				<!-- Route Efficiency -->
				<div
					class="rounded-xl border-t-4 border-secondary-fixed bg-surface-container-lowest p-8 md:col-span-1"
				>
					<div class="mb-4 flex items-center justify-between">
						<span class="font-label text-xs font-bold text-on-surface">Route Efficiency</span>
						<span class="material-symbols-outlined text-secondary">trending_up</span>
					</div>
					<div class="space-y-3">
						<div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
							<div class="h-full w-[88%] bg-secondary"></div>
						</div>
						<div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
							<div class="h-full w-[62%] bg-primary"></div>
						</div>
						<div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
							<div class="h-full w-[45%] bg-outline-variant"></div>
						</div>
					</div>
				</div>
				<!-- Wide Abstract Content -->
				<div
					class="flex flex-col items-center gap-12 rounded-xl bg-surface-container-lowest p-12 md:col-span-3 md:flex-row"
				>
					<div class="flex-1">
						<h3 class="mb-4 font-headline text-3xl text-on-surface italic">
							The Geometry of Trade
						</h3>
						<p class="font-body leading-relaxed text-on-surface-variant">
							Our exploration uncovered that trade hubs act as gravitational centers within a larger
							multi-dimensional space. By mapping these hubs as vertices in a dynamic graph, we can
							visualize the "stress" placed on specific maritime corridors.
						</p>
					</div>
					<div
						class="relative h-48 w-full flex-1 overflow-hidden rounded-lg bg-surface-container-low"
					>
						<div
							class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent opacity-20"
						></div>
						<img
							class="h-full w-full object-cover opacity-40 mix-blend-multiply"
							alt="Minimalist topographical map lines"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQj_0nt9lybyvuYI5l9fteT8d8mttAzNjHQ_p5RRnzjlRPSy4-dB-wiK_2oywFmLrRK36hYnDvLgEMdr-iTeGuSBYIWh8iquBOOpKTArLgACRgQwToim8G8ucLv96qiesDqV_PAwaHfug1m3fnWhFAFlQYH2YAz2toJM2BHlJLm97HJcb_bhhdxV8ADee7BySmhRmuTvYfi0k3NqJRr7GLyG0AyLtQ0SHMHSNEmgBmgMjRDsmNTjQ8McEfM4IuFUf0l2HlT1KrdPU"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Key Insights Narrative -->
	<section class="bg-surface px-12 py-32">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-12 text-center font-headline text-5xl text-on-surface italic">
				Synthesizing the Narrative
			</h2>
			<div class="space-y-10 font-body text-xl leading-[1.8] text-on-surface-variant">
				<p>
					The conclusion of our scholarly journey into trade rhythms is not found in a single chart,
					but in the realization of
					<span class="font-semibold text-primary italic">emergent stability</span>. While
					individual ships face chaotic weather and fluctuating demand, the system as a whole
					exhibits a remarkable, self-correcting poise.
				</p>
				<blockquote
					class="border-l-2 border-primary-fixed py-4 pl-8 font-headline text-2xl text-on-surface italic"
				>
					"Data is the ink with which we write the history of the present; the art lies in making
					the ink legible to the soul."
				</blockquote>
				<p>
					We find that by prioritizing the long-term harmonic wave over the short-term noise,
					logistics providers can reduce energy expenditure by up to 14%. This isn't just about
					economic efficiency; it is about aligning human industry with the natural cadences of the
					earth.
				</p>
			</div>
			<div class="mt-20 flex flex-wrap justify-center gap-3">
				<span
					class="rounded-md bg-secondary-container px-4 py-1.5 font-label text-sm text-on-secondary-container"
					>#Logistics</span
				>
				<span
					class="rounded-md bg-secondary-container px-4 py-1.5 font-label text-sm text-on-secondary-container"
					>#DataArt</span
				>
				<span
					class="rounded-md bg-secondary-container px-4 py-1.5 font-label text-sm text-on-secondary-container"
					>#SpectralAnalysis</span
				>
				<span
					class="rounded-md bg-secondary-container px-4 py-1.5 font-label text-sm text-on-secondary-container"
					>#AcademicJournal</span
				>
			</div>
		</div>
	</section>

	<!-- Atmospheric Divider -->
	<div class="flex justify-center py-20">
		<div class="h-px w-[100px] bg-primary-fixed-dim"></div>
	</div>
</main>

<Footer variant="simple" />
