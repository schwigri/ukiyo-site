import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const config = defineConfig({
	integrations: [mdx()],
	site: process.env.ORIGIN ?? 'https://www.schwigri.com',
});

export default config;
