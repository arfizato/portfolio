<script lang="ts">
	type NavLink = { label: string; href: string; key: string };

	interface Props {
		activePage?: 'home' | 'entries' | 'about' | 'contact';
	}

	let { activePage = 'home' }: Props = $props();

	const links: NavLink[] = [
		{ label: 'Home', href: '/', key: 'home' },
		{ label: 'Entries', href: '/entries', key: 'entries' },
		{ label: 'About', href: '/about', key: 'about' },
		{ label: 'Contact', href: '/contact', key: 'contact' }
	];
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
		href="#"
		class="rounded-full bg-gradient-to-r from-primary to-primary-dim px-8 py-2.5 font-label text-sm tracking-widest text-on-primary uppercase transition-all hover:opacity-90 active:scale-95"
	>
		Hire Me
	</a>
</nav>
