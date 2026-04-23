<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Technical Deep Dive | Data Artistry</title>
</svelte:head>

<main class="pt-40 pb-20">
	<!-- Hero Section -->
	<header class="mx-auto mb-32 max-w-5xl px-8">
		<div class="space-y-8">
			<div class="flex items-center gap-4">
				<span class="text-xs font-bold tracking-[0.3em] text-primary uppercase"
					>Technical Deep Dive // ARCH-012</span
				>
				<div class="h-px w-12 bg-primary/30"></div>
			</div>
			<h1
				class="font-headline text-7xl leading-[1.05] font-light tracking-tight text-on-surface md:text-8xl"
			>
				The Geometry of <br /> <span class="italic">Latent Spaces</span>
			</h1>
			<p class="max-w-3xl text-xl leading-relaxed font-light text-on-surface-variant">
				An exploration of high-dimensional manifold alignment and the underlying data orchestration
				required to sustain real-time inference at scale. This journal entry dissects the
				mathematical foundations of our recent generative architecture.
			</p>
			<div class="flex items-center gap-6 pt-4">
				<div class="flex -space-x-2">
					<div class="h-10 w-10 rounded-full border-2 border-surface bg-slate-200"></div>
					<div class="h-10 w-10 rounded-full border-2 border-surface bg-slate-300"></div>
				</div>
				<div class="text-sm">
					<p class="font-bold">Published by Research Team</p>
					<p class="text-on-surface-variant italic">June 14, 2024 &bull; 12 min read</p>
				</div>
			</div>
		</div>
	</header>

	<!-- Mathematical Foundations -->
	<section class="mx-auto mb-40 max-w-[1440px] px-8">
		<div class="rounded-[2.5rem] border border-outline-variant/10 bg-white p-12 shadow-sm md:p-24">
			<div class="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
				<div class="space-y-10">
					<div class="space-y-4">
						<h2 class="font-headline text-5xl leading-tight italic">
							Structural Minimization <br />&amp; Loss Convergence
						</h2>
						<div class="h-1 w-24 bg-primary/20"></div>
					</div>
					<div class="space-y-6 text-lg leading-relaxed text-on-surface-variant">
						<p>
							To ensure global stability within the latent space, we introduce a regularization term
							focused on the Jacobian norm. This prevents the manifold from collapsing during
							high-velocity training phases.
						</p>
						<p>
							The optimization objective is defined by the balance between the reconstruction
							fidelity and the structural entropy of the hidden representations.
						</p>
					</div>
					<a
						class="group inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase"
						href="#"
					>
						<span>View Implementation on GitHub</span>
						<span
							class="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1"
							>arrow_forward</span
						>
					</a>
				</div>
				<div class="relative rounded-3xl bg-surface-container-low p-12">
					<div
						class="math-block py-16 text-center font-headline text-3xl text-primary-dim italic md:text-4xl"
					>
						L(&theta;) = E<sub>z~q</sub>[log p(x|z)] - &beta; &middot; D<sub>KL</sub>(q(z|x) ||
						p(z)) + &lambda; ||&nabla;<sub>z</sub> f(z)||<sup>2</sup>
					</div>
					<div
						class="mt-12 flex items-center justify-between border-t border-outline-variant/20 pt-8"
					>
						<div class="flex gap-3">
							<span
								class="rounded-md bg-secondary-container/50 px-3 py-1 text-[10px] font-bold tracking-widest text-on-secondary-container uppercase"
								>KL Divergence</span
							>
							<span
								class="rounded-md bg-primary-container/50 px-3 py-1 text-[10px] font-bold tracking-widest text-on-primary-container uppercase"
								>Jacobian Norm</span
							>
						</div>
						<span class="text-[10px] font-bold tracking-[0.2em] text-outline uppercase"
							>Equation 4.2b</span
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Architecture Section -->
	<section class="mx-auto mb-40 max-w-[1440px] px-8">
		<div
			class="mb-16 flex flex-col items-end justify-between gap-6 border-b border-outline-variant/10 pb-8 md:flex-row"
		>
			<div class="space-y-2">
				<span class="text-xs font-bold tracking-widest text-primary uppercase"
					>Section 02 // Architecture</span
				>
				<h3 class="font-headline text-5xl">Pipeline Orchestration</h3>
			</div>
			<a
				class="flex items-center gap-2 rounded-xl bg-inverse-surface px-6 py-3 text-xs font-bold tracking-widest text-inverse-on-surface uppercase transition-opacity hover:opacity-90"
				href="#"
			>
				<span class="material-symbols-outlined text-lg">terminal</span>
				Explore Architecture Repo
			</a>
		</div>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-12">
			<!-- Main Flow -->
			<div
				class="flex min-h-[500px] flex-col justify-between rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-12 shadow-sm md:col-span-8"
			>
				<div class="max-w-xl">
					<div class="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
						<span class="material-symbols-outlined text-primary">hub</span>
					</div>
					<h4 class="mb-4 text-2xl font-bold italic">The Distributed Ingestion Layer</h4>
					<p class="mb-12 leading-relaxed text-on-surface-variant">
						Multi-source streaming with Kafka-backed persistence and schema validation via Protobuf.
						Our architecture ensures exactly-once semantics across four distinct geographic regions
						with automated failover handling.
					</p>
				</div>
				<div
					class="w-full rounded-2xl border border-dashed border-outline-variant/30 bg-surface-container-low/50 p-8"
				>
					<div class="flex items-center justify-around opacity-70">
						<div class="flex flex-col items-center gap-4">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm"
							>
								<span class="material-symbols-outlined text-3xl text-primary">database</span>
							</div>
							<span class="text-[10px] font-bold tracking-widest uppercase">Source Data</span>
						</div>
						<div class="mx-4 h-px flex-1 bg-outline-variant/20"></div>
						<div class="flex flex-col items-center gap-4">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm"
							>
								<span class="material-symbols-outlined text-3xl text-secondary">sync_alt</span>
							</div>
							<span class="text-[10px] font-bold tracking-widest uppercase">Kafka Broker</span>
						</div>
						<div class="mx-4 h-px flex-1 bg-outline-variant/20"></div>
						<div class="flex flex-col items-center gap-4">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm"
							>
								<span class="material-symbols-outlined text-3xl text-tertiary">architecture</span>
							</div>
							<span class="text-[10px] font-bold tracking-widest uppercase">Spark Worker</span>
						</div>
					</div>
				</div>
			</div>
			<!-- Stats & Details -->
			<div class="space-y-8 md:col-span-4">
				<div
					class="flex h-[240px] flex-col justify-between rounded-[2rem] bg-primary p-10 text-on-primary"
				>
					<div class="flex items-start justify-between">
						<span class="material-symbols-outlined text-4xl">bolt</span>
						<span class="text-[10px] font-bold tracking-widest uppercase opacity-70"
							>Live Benchmarks</span
						>
					</div>
					<div>
						<h5 class="mb-1 font-headline text-5xl font-light">99.4%</h5>
						<p class="text-xs font-bold tracking-widest uppercase opacity-70">
							Operational Reliability Score
						</p>
					</div>
				</div>
				<div
					class="flex-1 rounded-[2rem] border border-outline-variant/10 bg-surface-container-high p-10"
				>
					<h4 class="mb-4 text-lg font-bold">Inference Latency</h4>
					<p class="mb-6 text-sm leading-relaxed text-on-surface-variant">
						Sub-15ms latency benchmarks maintained across 2.4B production requests per day.
					</p>
					<div class="space-y-4">
						<div class="h-1.5 w-full overflow-hidden rounded-full bg-white/50">
							<div class="h-full w-4/5 bg-primary"></div>
						</div>
						<div
							class="flex justify-between text-[10px] font-bold tracking-tighter uppercase opacity-60"
						>
							<span>P50: 8ms</span>
							<span>P99: 14.2ms</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Code & Logic Section -->
	<section class="mx-auto mb-20 max-w-[1440px] px-8">
		<div
			class="overflow-hidden rounded-[2.5rem] border border-outline-variant/10 bg-white shadow-lg"
		>
			<div class="grid grid-cols-1 lg:grid-cols-12">
				<!-- Sidebar Context -->
				<div class="flex flex-col bg-surface-container-lowest p-12 lg:col-span-4 lg:p-20">
					<div class="flex-1 space-y-10">
						<div class="space-y-4">
							<span class="text-xs font-bold tracking-widest text-secondary uppercase"
								>Section 03 // Logic</span
							>
							<h2 class="font-headline text-5xl leading-tight italic">
								Algorithm <br />Refinement
							</h2>
						</div>
						<p class="text-lg leading-relaxed text-on-surface-variant">
							Moving beyond standard stochastic gradient descent, we utilize an adaptive momentum
							scheduler that penalizes curvature spikes in the loss landscape.
						</p>
						<div class="space-y-8 pt-4">
							<div class="flex items-start gap-4">
								<div class="h-12 w-1 bg-primary-fixed-dim"></div>
								<div class="space-y-2">
									<h5 class="font-headline text-xl font-bold italic">Linear Complexity</h5>
									<p class="text-xs leading-relaxed text-on-surface-variant">
										Achieves O(N) scaling through sparse neighborhood approximations for
										billion-scale datasets.
									</p>
								</div>
							</div>
							<div class="flex items-start gap-4">
								<div class="h-12 w-1 bg-secondary-fixed-dim"></div>
								<div class="space-y-2">
									<h5 class="font-headline text-xl font-bold italic">Memory Efficiency</h5>
									<p class="text-xs leading-relaxed text-on-surface-variant">
										Reduces weight footprint per thread by 40% via static weight offloading.
									</p>
								</div>
							</div>
						</div>
					</div>
					<a
						class="group mt-12 flex items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-sm font-bold tracking-widest text-on-secondary uppercase transition-colors hover:bg-secondary-dim"
						href="#"
					>
						<span class="material-symbols-outlined text-xl">code_blocks</span>
						View Pseudocode Repo
						<span class="material-symbols-outlined transition-transform group-hover:translate-x-1"
							>arrow_outward</span
						>
					</a>
				</div>
				<!-- Code Editor -->
				<div class="relative overflow-hidden bg-[#0c1117] p-12 lg:col-span-8 lg:p-20">
					<div class="absolute top-8 left-12 flex gap-2">
						<div class="h-3 w-3 rounded-full bg-red-500/30"></div>
						<div class="h-3 w-3 rounded-full bg-amber-500/30"></div>
						<div class="h-3 w-3 rounded-full bg-emerald-500/30"></div>
					</div>
					<div class="mb-12 flex items-center justify-between border-b border-white/5 pb-6">
						<span class="font-mono text-xs tracking-widest text-white/40 uppercase"
							>module_alpha.py</span
						>
						<div class="flex gap-4">
							<span
								class="material-symbols-outlined cursor-pointer text-lg text-white/30 transition-colors hover:text-white"
								>content_copy</span
							>
							<span
								class="material-symbols-outlined cursor-pointer text-lg text-white/30 transition-colors hover:text-white"
								>settings</span
							>
						</div>
					</div>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<pre
						class="overflow-x-auto text-sm leading-[1.8] text-slate-300 selection:bg-primary/30 md:text-base"><span
							class="font-bold text-blue-400">def</span
						> <span class="text-emerald-400">align_manifold</span>(z_space, target_distribution):
    <span class="text-slate-500 italic"># Compute the pairwise distance matrix</span>
    distances = compute_l2_norm(z_space)

    <span class="text-slate-500 italic"># Apply Gaussian kernel for local connectivity</span>
    affinity = np.exp(-distances / (2 * sigma**2))

    <span class="text-slate-500 italic"># Normalize and iterate convergence</span>
    <span class="font-bold text-blue-400">for</span> epoch <span class="font-bold text-blue-400"
							>in</span
						> range(MAX_ITER):
        gradient = compute_divergence(affinity, target_distribution)
        z_space -= learning_rate * gradient

    <span class="font-bold text-blue-400">return</span> z_space</pre>
					<div class="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
						<p class="font-mono text-xs text-white/50 italic">
							Notes: This implementation leverages vectorized operations in PyTorch for GPU
							acceleration. Convergence is typically achieved within 200 epochs for latent
							dimensions &lt; 512.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer variant="expanded" />
