<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	type NavLink = { label: string; href: string; key: string };

	interface Props {
		activePage?: 'home' | 'entries' | 'about' | 'contact';
	}

	let { activePage = 'home' }: Props = $props();
	let menuOpen = $state(false);

	const links: NavLink[] = [
		{ label: 'Home', href: '/', key: 'home' },
		{ label: 'Entries', href: '/entries', key: 'entries' },
		{ label: 'About', href: '/about', key: 'about' },
		{ label: 'Contact', href: '/contact', key: 'contact' }
	];

	$effect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
	});
</script>

<nav
	class="fixed top-0 left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-between bg-white/40 px-12 py-6 backdrop-blur-xl"
>
	<a href="/" class="font-headline text-2xl tracking-tight text-slate-800 italic">Data Artistry</a>
	<div class="hidden items-center gap-12 md:flex">
		{#each links as link}
			{@const isActive = link.key === activePage}
			<a
				class={isActive
					? 'border-b-2 border-blue-600/30 font-headline text-lg font-bold text-blue-700 italic'
					: 'font-headline text-lg text-slate-600 italic transition-opacity duration-300 hover:text-blue-500 hover:opacity-80'}
				href={link.href}
			>
				{link.label}
			</a>
		{/each}
	</div>
	<a
		href="/contact"
		class="hidden rounded-full bg-linear-to-r from-primary to-primary-dim px-8 py-2.5 font-label text-sm tracking-widest text-on-primary uppercase transition-all hover:opacity-90 active:scale-95 md:block"
	>
		Hire Me
	</a>

	<!-- Mobile Hamburger -->
	<button
		class="flex flex-col gap-[5px] md:hidden"
		onclick={() => (menuOpen = true)}
		aria-label="Open menu"
	>
		<span class="block h-[1.5px] w-6 bg-on-surface transition-all"></span>
		<span class="block h-[1.5px] w-6 bg-on-surface transition-all"></span>
	</button>
</nav>

<!-- Mobile Full-Screen Menu -->
{#if menuOpen}
	<div class="fixed inset-0 z-[60] flex flex-col" transition:fade={{ duration: 250 }}>
		<!-- Atmospheric Background Layers -->
		<div class="atmospheric-hero absolute inset-0 opacity-90"></div>
		<div class="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

		<!-- Cloud decorations -->
		<div
			class="absolute top-[15%] right-[-15%] h-[400px] w-[400px] rounded-full bg-white/25 blur-[80px]"
		></div>
		<div
			class="absolute bottom-[10%] left-[-10%] h-[350px] w-[350px] rounded-full bg-secondary-container/30 blur-[100px]"
		></div>

		<!-- Header -->
		<div class="relative z-10 flex items-center justify-between px-12 py-6">
			<a
				href="/"
				class="font-headline text-2xl tracking-tight text-on-primary-container italic"
				onclick={() => (menuOpen = false)}
			>
				Data Artistry
			</a>
			<button
				class="flex items-center justify-center"
				onclick={() => (menuOpen = false)}
				aria-label="Close menu"
			>
				<span class="material-symbols-outlined text-2xl text-on-primary-container">close</span>
			</button>
		</div>

		<!-- Nav Links -->
		<div class="relative z-10 flex flex-1 flex-col items-center justify-center gap-2">
			{#each links as link, i}
				{@const isActive = link.key === activePage}
				<a
					class="group relative px-8 py-4"
					href={link.href}
					onclick={() => (menuOpen = false)}
					in:fly={{ y: 40, duration: 400, delay: 80 + i * 70 }}
				>
					<span
						class="font-label text-[10px] tracking-[0.3em] text-on-primary-container/40 uppercase"
						>{String(i + 1).padStart(2, '0')}</span
					>
					<span
						class="ml-3 font-headline text-4xl tracking-tight text-on-primary-container italic transition-opacity duration-300 {isActive
							? 'opacity-100'
							: 'opacity-50 group-hover:opacity-80'}"
					>
						{link.label}
					</span>
					{#if isActive}
						<span
							class="absolute bottom-2 left-1/2 h-[1.5px] w-12 -translate-x-1/2 bg-on-primary-container/30"
						></span>
					{/if}
				</a>
			{/each}
		</div>

		<!-- Decorative Line + CTA -->
		<div class="relative z-10 flex flex-col items-center gap-8 px-12 pb-16">
			<div class="h-px w-16 bg-on-primary-container/20"></div>
			<a
				href="/contact"
				class="rounded-full bg-linear-to-r from-primary to-primary-dim px-10 py-4 font-label text-sm tracking-widest text-on-primary uppercase transition-all hover:opacity-90 active:scale-95"
				onclick={() => (menuOpen = false)}
				in:fly={{ y: 20, duration: 400, delay: 450 }}
			>
				Hire Me
			</a>
		</div>
	</div>
{/if}
