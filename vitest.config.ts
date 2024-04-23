/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

const config = getViteConfig({
	test: {
		globals: false,
	},
});

export default config;
