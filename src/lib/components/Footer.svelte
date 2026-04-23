<script lang="ts">
	interface Props {
		variant?: 'simple' | 'expanded';
	}

	let { variant = 'simple' }: Props = $props();
</script>

{#if variant === 'expanded'}
	<!-- Technical Deep Dive style footer -->
	<footer class="w-full border-t border-outline-variant/10 bg-surface-container-highest px-8 py-24">
		<div class="mx-auto w-full">
			<div class="mb-20 flex flex-col items-start justify-between gap-16 md:flex-row">
				<div class="space-y-6">
					<span class="font-headline text-3xl text-on-surface italic">Editorial Data Artistry</span>
					<p
						class="max-w-xs text-sm leading-loose tracking-tighter text-on-surface-variant uppercase"
					>
						Advancing the intersection of high-fidelity aesthetics and rigorous technical
						computation.
					</p>
				</div>
				<div class="grid grid-cols-2 gap-12 md:grid-cols-4">
					<div class="space-y-6">
						<h6 class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Resources</h6>
						<ul class="space-y-4 text-sm text-on-surface-variant">
							<li>
								<a class="transition-colors hover:text-primary" href="#">Documentation</a>
							</li>
							<li>
								<a class="transition-colors hover:text-primary" href="#">API Reference</a>
							</li>
							<li>
								<a class="transition-colors hover:text-primary" href="#">Case Studies</a>
							</li>
						</ul>
					</div>
					<div class="space-y-6">
						<h6 class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Social</h6>
						<ul class="space-y-4 text-sm text-on-surface-variant">
							<li><a class="transition-colors hover:text-primary" href="#">LinkedIn</a></li>
							<li><a class="transition-colors hover:text-primary" href="#">GitHub</a></li>
							<li>
								<a class="transition-colors hover:text-primary" href="#">ResearchGate</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div
				class="flex flex-col items-center justify-between gap-6 border-t border-outline-variant/10 pt-12 md:flex-row"
			>
				<span class="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
					&copy; 2024 Editorial Data Artistry. Built with scholarly rigor.
				</span>
				<div class="flex gap-4">
					<div
						class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-surface-container transition-colors hover:bg-primary/10"
					>
						<span class="material-symbols-outlined text-sm">mail</span>
					</div>
					<div
						class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-surface-container transition-colors hover:bg-primary/10"
					>
						<span class="material-symbols-outlined text-sm">share</span>
					</div>
				</div>
			</div>
		</div>
	</footer>
{:else}
	<!-- Simple footer (Home, About, Journal) -->
	<footer class="w-full border-t border-slate-100 bg-slate-50 px-12 py-20">
		<div class="mx-auto flex w-full flex-col items-center justify-between gap-8 md:flex-row">
			<div class="font-headline text-lg text-slate-700 italic">Data Artistry</div>
			<div class="text-sm tracking-wide text-slate-500 uppercase">
				&copy; 2024 Emna | Amsterdam-based Data Analytics.
			</div>
			<div class="flex gap-8">
				<a
					class="text-sm tracking-wide text-slate-500 uppercase transition-colors duration-500 hover:text-blue-500"
					href="#">LinkedIn</a
				>
				<a
					class="text-sm tracking-wide text-slate-500 uppercase transition-colors duration-500 hover:text-blue-500"
					href="#">GitHub</a
				>
				<a
					class="text-sm tracking-wide text-slate-500 uppercase transition-colors duration-500 hover:text-blue-500"
					href="#">Medium</a
				>
				<a
					class="text-sm tracking-wide text-slate-500 uppercase transition-colors duration-500 hover:text-blue-500"
					href="#">Kaggle</a
				>
			</div>
		</div>
	</footer>
{/if}
