<script lang="ts">
	interface Props {
		variant?: 'simple' | 'expanded';
	}

	let { variant = 'simple' }: Props = $props();
</script>

{#if variant === 'expanded'}
	<!-- Technical Deep Dive style footer -->
	<footer class="bg-surface-container-highest w-full border-t border-outline-variant/10 px-8 py-24">
		<div class="mx-auto w-full max-w-[1440px]">
			<div class="mb-20 flex flex-col items-start justify-between gap-16 md:flex-row">
				<div class="space-y-6">
					<span class="font-headline text-on-surface text-3xl italic"
						>Editorial Data Artistry</span
					>
					<p
						class="text-on-surface-variant max-w-xs text-sm uppercase leading-loose tracking-tighter"
					>
						Advancing the intersection of high-fidelity aesthetics and rigorous technical
						computation.
					</p>
				</div>
				<div class="grid grid-cols-2 gap-12 md:grid-cols-4">
					<div class="space-y-6">
						<h6 class="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
							Resources
						</h6>
						<ul class="text-on-surface-variant space-y-4 text-sm">
							<li>
								<a class="hover:text-primary transition-colors" href="#">Documentation</a>
							</li>
							<li>
								<a class="hover:text-primary transition-colors" href="#">API Reference</a>
							</li>
							<li>
								<a class="hover:text-primary transition-colors" href="#">Case Studies</a>
							</li>
						</ul>
					</div>
					<div class="space-y-6">
						<h6 class="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Social</h6>
						<ul class="text-on-surface-variant space-y-4 text-sm">
							<li><a class="hover:text-primary transition-colors" href="#">LinkedIn</a></li>
							<li><a class="hover:text-primary transition-colors" href="#">GitHub</a></li>
							<li>
								<a class="hover:text-primary transition-colors" href="#">ResearchGate</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div
				class="flex flex-col items-center justify-between gap-6 border-t border-outline-variant/10 pt-12 md:flex-row"
			>
				<span class="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
					&copy; 2024 Editorial Data Artistry. Built with scholarly rigor.
				</span>
				<div class="flex gap-4">
					<div
						class="bg-surface-container hover:bg-primary/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
					>
						<span class="material-symbols-outlined text-sm">mail</span>
					</div>
					<div
						class="bg-surface-container hover:bg-primary/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
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
		<div
			class="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row"
		>
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
