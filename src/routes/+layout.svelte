<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const routeToPage: Record<string, 'home' | 'entries' | 'about' | 'contact'> = {
		'/': 'home',
		'/journal': 'entries',
		'/technical': 'entries',
		'/entries': 'entries',
		'/about': 'about',
		'/contact': 'contact'
	};

	let activePage = $derived(routeToPage[page.url.pathname] ?? 'home');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Emna | Data Analyst</title>
</svelte:head>

<Nav {activePage} />
{@render children()}
