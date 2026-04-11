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
				class="bg-secondary-container text-on-secondary-container mb-8 inline-flex items-center gap-2 rounded-md px-4 py-1"
			>
				<span class="material-symbols-outlined text-sm">science</span>
				<span class="font-label text-xs font-semibold uppercase tracking-[0.2em]"
					>Scholarly Inquiry &bull; Vol. 04</span
				>
			</div>
			<h1 class="font-headline text-on-surface mb-8 text-6xl leading-[1.1] italic md:text-8xl">
				The Spectral Rhythm of Global Trade
			</h1>
			<p
				class="font-body text-on-surface-variant mx-auto max-w-2xl text-xl leading-relaxed md:text-2xl"
			>
				A deep-layered decomposition of seasonal maritime data, exploring the unseen frequencies
				that drive our interconnected markets.
			</p>
			<div class="mt-12 flex items-center justify-center gap-6">
				<div class="flex items-center gap-3">
					<img
						class="border-surface-container-lowest h-12 w-12 rounded-full border-2 object-cover"
						alt="Portrait of Dr. Julian Vane"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3S7PjefllO57kV8BdcRk2wHRu1Fmmr9JYDFfC0tb15SHFhaZUDVBOHnatyCLohaOF-R0J2om-WUUybpvh1KrwJL4mzxLn4vFTypuajSrfbRvAQqmr08bGDw24-acNKveB4PMhzq0ig0VLE-Aymia79lC90AbuCtzGePuCUorUfG_9ajHHVjWqIojre1B99DWJx2LL7PBWO1KvMDvD0qaJLIr14IhDLGb_P18e4H1WophXWcwcAUzkgrCOL8UDD4T_abfFKp7EGg"
					/>
					<div class="text-left">
						<span class="font-label text-on-surface block text-sm font-bold">Dr. Julian Vane</span
						>
						<span class="font-label text-on-surface-variant block text-xs">Lead Researcher</span>
					</div>
				</div>
				<div class="bg-outline-variant/30 h-8 w-px"></div>
				<div class="text-left">
					<span class="font-label text-on-surface-variant block text-xs uppercase tracking-widest"
						>Published</span
					>
					<span class="font-label text-on-surface block text-sm font-bold">Oct 14, 2024</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Project Introduction Section -->
	<section class="bg-surface px-12 py-24">
		<div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12">
			<div class="md:col-start-2 md:col-span-5">
				<h2 class="font-headline text-on-surface mb-8 text-4xl">The Premise of Complexity</h2>
				<div class="font-body text-on-surface-variant space-y-6 text-lg leading-relaxed">
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
				<div class="bg-surface-container-low border-primary mt-12 rounded-xl border-l-4 p-8">
					<span
						class="material-symbols-outlined text-primary mb-4"
						style="font-variation-settings: 'FILL' 1;">terminal</span
					>
					<code class="font-body text-on-surface-variant block text-sm leading-loose">
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
					<div class="bg-primary/10 absolute inset-0 backdrop-blur-[2px]"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Data Exploration (Bento Grid) -->
	<section class="bg-surface-container-low px-12 py-24">
		<div class="mx-auto max-w-[1440px]">
			<div class="mb-16 text-center">
				<h2 class="font-headline text-on-surface mb-4 text-4xl italic">Observation Layers</h2>
				<div class="bg-primary-fixed-dim mx-auto h-px w-24"></div>
			</div>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-4">
				<!-- Chart A-1 -->
				<div
					class="bg-surface-container-lowest flex min-h-[400px] flex-col justify-between rounded-xl p-10 md:col-span-2"
				>
					<div>
						<span class="font-label text-primary text-xs font-bold uppercase tracking-widest"
							>Chart A-1</span
						>
						<h3 class="font-headline text-on-surface mt-2 mb-6 text-2xl">
							Seasonal Variance Density
						</h3>
					</div>
					<div class="flex h-48 flex-grow items-end justify-between gap-2">
						<div class="bg-primary-container h-[40%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[65%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[90%] w-full rounded-t-lg"></div>
						<div class="bg-secondary-container h-[75%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[45%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[30%] w-full rounded-t-lg"></div>
						<div class="bg-primary-container h-[55%] w-full rounded-t-lg"></div>
					</div>
					<p class="font-body text-on-surface-variant mt-6 text-sm italic">
						Visualizing the relative weight of seasonal adjustments over a 10-year horizon.
					</p>
				</div>
				<!-- Highlight Card -->
				<div
					class="bg-primary text-on-primary flex flex-col justify-center rounded-xl p-10 text-center"
				>
					<span class="font-headline mb-2 text-6xl italic">98.2%</span>
					<span class="font-label text-sm uppercase tracking-widest opacity-80"
						>Correlation Index</span
					>
				</div>
				<!-- Technical Detail -->
				<div class="bg-surface-container-lowest rounded-xl p-10">
					<span class="material-symbols-outlined text-secondary mb-4 text-3xl">analytics</span>
					<h4 class="font-label text-on-surface mb-2 font-bold">Stochastic Modeling</h4>
					<p class="font-body text-on-surface-variant text-sm leading-relaxed">
						Applying Monte Carlo simulations to predict maritime route deviations under extreme
						climatic stressors.
					</p>
				</div>
				<!-- Route Efficiency -->
				<div
					class="bg-surface-container-lowest border-secondary-fixed rounded-xl border-t-4 p-8 md:col-span-1"
				>
					<div class="mb-4 flex items-center justify-between">
						<span class="font-label text-on-surface text-xs font-bold">Route Efficiency</span>
						<span class="text-secondary material-symbols-outlined">trending_up</span>
					</div>
					<div class="space-y-3">
						<div class="bg-surface-container h-1.5 w-full overflow-hidden rounded-full">
							<div class="bg-secondary h-full w-[88%]"></div>
						</div>
						<div class="bg-surface-container h-1.5 w-full overflow-hidden rounded-full">
							<div class="bg-primary h-full w-[62%]"></div>
						</div>
						<div class="bg-surface-container h-1.5 w-full overflow-hidden rounded-full">
							<div class="bg-outline-variant h-full w-[45%]"></div>
						</div>
					</div>
				</div>
				<!-- Wide Abstract Content -->
				<div
					class="bg-surface-container-lowest flex flex-col items-center gap-12 rounded-xl p-12 md:col-span-3 md:flex-row"
				>
					<div class="flex-1">
						<h3 class="font-headline text-on-surface mb-4 text-3xl italic">
							The Geometry of Trade
						</h3>
						<p class="font-body text-on-surface-variant leading-relaxed">
							Our exploration uncovered that trade hubs act as gravitational centers within a larger
							multi-dimensional space. By mapping these hubs as vertices in a dynamic graph, we can
							visualize the "stress" placed on specific maritime corridors.
						</p>
					</div>
					<div
						class="bg-surface-container-low relative h-48 w-full flex-1 overflow-hidden rounded-lg"
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
			<h2 class="font-headline text-on-surface mb-12 text-center text-5xl italic">
				Synthesizing the Narrative
			</h2>
			<div class="font-body text-on-surface-variant space-y-10 text-xl leading-[1.8]">
				<p>
					The conclusion of our scholarly journey into trade rhythms is not found in a single chart,
					but in the realization of
					<span class="text-primary font-semibold italic">emergent stability</span>. While
					individual ships face chaotic weather and fluctuating demand, the system as a whole
					exhibits a remarkable, self-correcting poise.
				</p>
				<blockquote
					class="font-headline text-on-surface border-primary-fixed border-l-2 py-4 pl-8 text-2xl italic"
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
					class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-1.5 text-sm"
					>#Logistics</span
				>
				<span
					class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-1.5 text-sm"
					>#DataArt</span
				>
				<span
					class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-1.5 text-sm"
					>#SpectralAnalysis</span
				>
				<span
					class="bg-secondary-container text-on-secondary-container font-label rounded-md px-4 py-1.5 text-sm"
					>#AcademicJournal</span
				>
			</div>
		</div>
	</section>

	<!-- Atmospheric Divider -->
	<div class="flex justify-center py-20">
		<div class="bg-primary-fixed-dim h-px w-[100px]"></div>
	</div>
</main>

<Footer variant="simple" />
