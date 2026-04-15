import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import { join, relative, sep } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes('node_modules');

			if (isExternalLibrary) return undefined;
			if (filename.endsWith('.md') || filename.endsWith('.svx')) return false;
			if (filename.includes('lib/layouts/') || filename.includes('components/entries/'))
				return false;
			return true;
		}
	},
	kit: { adapter: adapter() },
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			layout: {
				technical: join(import.meta.dirname, 'src/lib/layouts/technical.svelte')
			}
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
