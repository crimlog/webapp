import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { resolve } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$stores: resolve(process.cwd(), './src/stores'),
		},
	},
	preprocess: vitePreprocess(),
};

export default config;
