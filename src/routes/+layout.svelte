<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	function getActivePage(pathname: string): 'home' | 'entries' | 'about' | 'contact' {
		if (pathname === '/') return 'home';
		if (pathname === '/about') return 'about';
		if (pathname === '/contact') return 'contact';
		if (pathname.startsWith('/entries') || pathname === '/journal' || pathname === '/technical')
			return 'entries';
		return 'home';
	}

	let activePage = $derived(getActivePage(page.url.pathname));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Emna | Data Analyst</title>
</svelte:head>

<Nav {activePage} />
{@render children()}
