<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { timeline } from '$lib/data/timeline';

	const colorClasses: Record<
		'primary' | 'secondary' | 'tertiary',
		{ text: string; bg: string; container: string; overlay: string }
	> = {
		primary: {
			text: 'text-primary',
			bg: 'bg-primary',
			container: 'bg-surface-container',
			overlay: 'bg-primary/10'
		},
		secondary: {
			text: 'text-secondary',
			bg: 'bg-secondary',
			container: 'bg-secondary-container/30',
			overlay: 'bg-secondary/10'
		},
		tertiary: {
			text: 'text-tertiary',
			bg: 'bg-tertiary',
			container: 'bg-tertiary-container/30',
			overlay: 'bg-tertiary/10'
		}
	};

	const aspectClasses: Record<'4/3' | '3/4' | '1/1', string> = {
		'4/3': 'aspect-[4/3]',
		'3/4': 'aspect-[3/4]',
		'1/1': 'aspect-square'
	};
</script>

<svelte:head>
	<title>About | Emna — Data Analyst</title>
</svelte:head>

<main class="overflow-hidden pt-32">
	<!-- Story Hero -->
	<section class="mx-auto mb-32 max-w-[1440px] px-12">
		<div class="max-w-4xl">
			<span class="mb-4 block font-label text-xs font-bold tracking-widest text-primary uppercase"
				>The Narrative</span
			>
			<h1
				class="mb-12 font-headline text-7xl leading-none tracking-tighter text-on-surface md:text-9xl"
			>
				A Story of <br /><span class="serif-italic text-primary">Structure &amp; Soul</span>.
			</h1>
			<p class="max-w-2xl font-body text-2xl leading-relaxed text-on-surface-variant">
				Beyond the spreadsheets and algorithms, my journey is one of constant curiosity—from the
				logic of code to the vibrant pulse of Amsterdam's streets.
			</p>
		</div>
	</section>
	<!-- Visual Timeline -->
	<section class="relative mx-auto max-w-[1440px] px-12">
		<!-- Continuous Timeline Line -->
		<div
			class="timeline-line absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 opacity-20 lg:block"
		></div>
		{#each timeline as chapter, i}
			{@const colors = colorClasses[chapter.color]}
			{@const aspect = aspectClasses[chapter.image.aspect]}
			{@const imageLeft = i % 2 === 0}
			<div class="relative mb-40 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-32">
				<!-- Image -->
				<div class={imageLeft ? 'order-2 lg:order-1' : ''}>
					<div class="group relative {aspect} overflow-hidden rounded-2xl shadow-2xl">
						<img
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							alt={chapter.image.alt}
							src={chapter.image.src}
						/>
						<div class="absolute inset-0 {colors.overlay} mix-blend-multiply"></div>
					</div>
				</div>
				<!-- Text -->
				<div
					class="relative {imageLeft ? 'order-1 lg:order-2 lg:pl-12' : 'text-right lg:pr-12'}"
				>
					<div
						class="absolute top-8 {imageLeft
							? '-left-[calc(16rem+1px)]'
							: '-right-[calc(16rem+1px)]'} z-10 hidden h-8 w-8 rounded-full border-4 border-white {colors.bg} lg:block"
					></div>
					<span
						class="mb-4 block font-label text-sm font-bold tracking-widest {colors.text} uppercase"
						>{chapter.dateRange}</span
					>
					<h2 class="mb-6 font-headline text-5xl">
						{chapter.title.prefix} <span class="serif-italic">{chapter.title.italic}</span>
					</h2>
					<p class="mb-6 text-lg leading-relaxed text-on-surface-variant">
						{chapter.description}
					</p>
					<div class="flex {imageLeft ? '' : 'justify-end'} gap-4">
						{#if imageLeft}
							<div class="rounded-lg {colors.container} p-3">
								<span class="material-symbols-outlined {colors.text}"
									>{chapter.detail.icon}</span
								>
							</div>
							<div>
								<p class="text-sm font-bold">{chapter.detail.label}</p>
								<p class="text-xs tracking-wide text-on-surface-variant uppercase">
									{chapter.detail.sub}
								</p>
							</div>
						{:else}
							<div class="text-right">
								<p class="text-sm font-bold">{chapter.detail.label}</p>
								<p class="text-xs tracking-wide text-on-surface-variant uppercase">
									{chapter.detail.sub}
								</p>
							</div>
							<div class="rounded-lg {colors.container} p-3">
								<span class="material-symbols-outlined {colors.text}"
									>{chapter.detail.icon}</span
								>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</section>
	<!-- Personal Passions Section -->
	<section class="bg-surface-container-low px-12 py-32">
		<div class="mx-auto max-w-[1440px]">
			<div class="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
				<div class="max-w-xl">
					<span class="font-label text-xs font-bold tracking-widest text-primary uppercase"
						>Human Elements</span
					>
					<h2 class="mt-4 font-headline text-6xl">
						Beyond the <span class="serif-italic">Data</span>
					</h2>
					<p class="mt-6 text-lg text-on-surface-variant">
						When the screens turn off, I find inspiration in the analog world. These moments fuel
						the creativity I bring back to my work.
					</p>
				</div>
			</div>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div class="space-y-6">
					<div class="aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
						<img
							class="h-full w-full object-cover"
							alt="A close up of a vintage camera on a wooden table"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg9C_wZtBYsFT1F1r3EyXLICoHfyVDj0RUx319WfLVUHiuq34MoQNVq6c6rIHWRYKpQuAb7mpIw53APrlmcCuF8Hgy8lftrZbY8gcmKd9-KVc5aA23rtKWMqXJ_m61zeUP1O5AKIxzTgJLWsUiF7GRpB6ROKR_Hjvu6KjivPay9dvva0O4dUHmi_xjRt75ynKWEB48OW7f4SSJ3emfzLJ3zX6G0XE6yaKe1MmtZ3SBwp2WhYLEDaem8P5cJSVK8z_-CYrLOW7ARjA"
						/>
					</div>
					<div>
						<h3 class="mb-2 font-headline text-3xl">Street Photography</h3>
						<p class="leading-relaxed text-on-surface-variant">
							Capturing the fleeting geometry of urban life. It's my way of collecting data points
							without the numbers.
						</p>
					</div>
				</div>
				<div class="space-y-6 pt-12 md:pt-24">
					<div class="aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
						<img
							class="h-full w-full object-cover"
							alt="A collection of diverse books on a shelf with a small plant"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNHqg8YKdD0YPhos8xSZwF14veHqAeQ4qp0QyqstgEIWexZquPrchuaa0bXDeEHh-8lTsY2HcHYzjC7Vcswwd_bzDwV_ZgbRH_e_wF6l4ofWkL6PIS3xnrPcMvz6JlfEsP69qLbWdokMPag40yoKbkCgNHR2ojyKpBQP6U8V8bJaf8eoCPwQtz3LzIK-RcmVW40mzGBgWJxdC5Ldl_AeIet4CcH_GTzkSex_Zi9PJu7AQ-6mNmdp_t4DonFx4qpi0-iY8UKBbs8ZU"
						/>
					</div>
					<div>
						<h3 class="mb-2 font-headline text-3xl">Contemporary Fiction</h3>
						<p class="leading-relaxed text-on-surface-variant">
							Exploring human narratives through literature. I believe empathy is the most important
							skill for an analyst.
						</p>
					</div>
				</div>
				<div class="space-y-6 pt-12 md:pt-0">
					<div class="aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
						<img
							class="h-full w-full object-cover"
							alt="Hands holding a bicycle handlebar riding through a park"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGJdaJVIDyEeQnqQkYBVx4em5c725mMcAZaaBomhahSnV2pUw_MKX3EA_KjSw2ySoVnAebp1CSZsabEyydfOeHOu6_3BALE6AGqTXi2ZOBB_UALvOHRkq5vNE_7yTujfbbQJ7OYp0b_UDK114htHbPeSrqBg8hOfiH3YXYWnaMmU-ACvLP8LFSthun64OGziLkvY_3QxdhYuomJsey4d3GpYDozsM4Jf1vTN9NyMCmlotki2CjPyBj8VwDkpY_7oR9jnYsqFhX0_w"
						/>
					</div>
					<div>
						<h3 class="mb-2 font-headline text-3xl">Canal Cycling</h3>
						<p class="leading-relaxed text-on-surface-variant">
							My daily meditation. Navigating the veins of Amsterdam keeps my thoughts moving and my
							perspective fresh.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Final CTA -->
	<section class="relative px-12 py-40 text-center">
		<!-- Decorative atmospheric image backdrop -->
		<div class="absolute inset-0 -z-10 opacity-5">
			<img
				class="h-full w-full object-cover grayscale"
				alt="Soft atmospheric texture"
				src="https://lh3.googleusercontent.com/aida-public/AB6AXuBanjwMDo-H8K25oBdMNwZeS3N09O9Vvv6WLEFIr4iawFGSnFoRkaQEsYPtrIrwYCkwHLIA6tTzL37AdPcCUCXK8BDqCGN4kKAPC2DXzDj27kWHxK5Vd24UZqWA2oDEzRri6cvl5NQukWvUphdoiFIUj1O9Wbuvw1olpgyveITbUpjxhUUBNBmicfi2Pzru8BthZtchX396cNAmUspN6InAXqIbPPTNDaM6sIEPauDluOkDI9bZyzDAGyWpMIAEWNrsDppNZb9e8IM"
			/>
		</div>
		<h2 class="mb-8 font-headline text-6xl md:text-8xl">
			Ready to write <br /><span class="serif-italic">the next chapter?</span>
		</h2>
		<p class="mx-auto mb-12 max-w-xl text-xl leading-relaxed text-on-surface-variant">
			Whether it's a complex data challenge or a creative collaboration, I'm always looking for the
			next meaningful project.
		</p>
		<div class="flex flex-col items-center justify-center gap-6 sm:flex-row">
			<button
				class="rounded-full bg-primary px-12 py-5 font-label text-sm font-bold tracking-widest text-on-primary uppercase shadow-xl transition-all hover:bg-primary-dim hover:shadow-primary/20"
			>
				Hire Me
			</button>
			<button
				class="rounded-full border border-outline px-12 py-5 font-label text-sm font-bold tracking-widest text-on-surface uppercase transition-all hover:bg-surface-container"
			>
				View Portfolio
			</button>
		</div>
	</section>
</main>

<Footer variant="simple" />
