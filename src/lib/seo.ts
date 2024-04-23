import { defaultLang, getT, isLang } from './i18n';
import dayjs from 'dayjs';
import { getEntry, type getCollection } from 'astro:content';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/de-ch';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';

import astroConfig from '../../astro.config';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

/**
 * Returns a root-level slug without initial forward slash
 * For example, given id 'en/about-me' return 'about-me/'.
 * @param id The entry ID as returned from astro:collection functions
 * @returns A pathname string
 */
export async function getPathnameFromEntry<
	Entry extends Awaited<ReturnType<typeof getCollection<'posts' | 'pages'>>>[number]
>({ collection, id, slug }: Entry): Promise<string> {
	const postsData = await getEntry('data', 'posts');

	let result: string;

	// Handling depends on collection
	switch (collection) {
		case 'pages':
			result = slug.startsWith(`${defaultLang}/`) ? slug.slice(3) : slug;
			break;

		case 'posts':
			const postData = postsData.data.posts[id];

			if (!postData) {
				throw new Error(`post timestamps are missing for ${id}`);
			}

			const resultPieces: string[] = [];

			// Prefix with lang
			const lang = slug.slice(0, 2);
			if (!isLang(lang)) {
				throw new Error(`unspported langCode ${lang}`);
			}
			if (lang !== defaultLang) {
				resultPieces.push(lang);
			}

			// Prefix with blog page
			const slugT = getT(lang, 'Slug');
			resultPieces.push(slugT`blog`);

			// Prefix with date
			const date = dayjs(postData.published)
				.tz('America/Los_Angeles')
				.locale(lang === 'de' ? 'de-ch' : lang)
				.format('YYYY/MM/DD');
			resultPieces.push(date);

			// Add actual slug
			const postSlugPieces = slug.split('-');
			postSlugPieces.shift();
			const postSlug = postSlugPieces.join('-');
			resultPieces.push(postSlug);

			result = resultPieces.join('/');
	}

	// Add trailing slash
	return `${result}/`;
}

/**
 *
 * @param pathname
 * @returns
 */
export function getCanonicalUrlFromPathname(pathname: string): string {
	const site = astroConfig.site;

	if (!site) {
		throw new Error('site required to get canonical urls');
	}

	if (!pathname.endsWith('/')) {
		pathname = `${pathname}/`;
	}

	const url = new URL(pathname, site);
	return decodeURI(url.toString());
}
