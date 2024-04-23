// @TODO: use typescript when ts-node supports esm properly
// https://github.com/TypeStrong/ts-node/issues/1007

import { readFile, readdir, writeFile } from 'fs/promises';
import { series, task } from 'gulp';
import { execSync } from 'child_process';
import { join } from 'path';
import subsetFont from 'subset-font';

/**
 * Recursively walks a given directory, returning all file paths.
 * @param {string} dir The dir path
 * @returns {AsyncGenerator<string>} File paths within the dir
 */
async function* walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		if (entry.isDirectory()) {
			yield* walk(join(dir, entry.name));
		} else {
			yield join(dir, entry.name);
		}
	}
}

const symbolsList = [
	'🎔',
	'🏠',
];
const symbols = symbolsList.join('');

task('buildFont', async (done) => {
	const font = await readFile('./node_modules/@fontsource/noto-sans-symbols-2/files/noto-sans-symbols-2-symbols-400-normal.woff2');

	const woff = await subsetFont(font, symbols, {
		targetFormat: 'woff',
	});

	await writeFile('./public/symbols.woff', woff);

	const woff2 = await subsetFont(font, symbols, {
		targetFormat: 'woff2',
	});

	await writeFile('./public/symbols.woff2', woff2);

	done();
});

task('createPostTimestamps', async (done) => {
	const posts = {};

	for await (const filePath of walk('src/content/posts')) {
		if (filePath.endsWith('.md')) {
			const published = execSync(`git log --pretty="format:%cI" --diff-filter=A -- ${filePath}`).toString();
			const lastModified = execSync(`git log -1 --pretty="format:%cI" "${filePath}"`).toString();
			const fileName = filePath.split('/content/posts/')[1];
			posts[fileName] = { lastModified, published };
		}
	}

	await writeFile('src/content/data/posts.json', JSON.stringify({ posts }, null, 4));

	done();
});

export default series('buildFont');
