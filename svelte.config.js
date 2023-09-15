import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: '404.html',
			pages: 'dist',
			assets: 'dist',
		}),
		paths: {
      base: dev ? '' : process.env.BASE_PATH,
  	},
		alias: {
			'@': './src',
			'@data': './src/_data',
			'@stores': './src/_stores',
		}
	}
};

export default config;
