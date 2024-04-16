import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vitePlugin } from '@remix-run/dev';

export default defineConfig({
	plugins: [vitePlugin(), tsconfigPaths()],
});
