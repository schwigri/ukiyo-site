import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getPosts } from '~/models/post.server';
import { isSupportedLanguage } from '~/services/i18n';

export default function Post() {
	return <p>Post</p>;
}

export const loader = ({ params }: LoaderFunctionArgs) => {
	const { day, lang, month, slug, year } = params;

	console.log(lang, year, month, day, slug);

	if ((lang === 'en') || !year || !month || !day || !slug) {
		throw new Response('Not found post lol', { status: 404 });
	}

	const language = lang ?? 'en';
	if (!isSupportedLanguage(language)) {
		throw new Response('Unspported language', { status: 404 });
	}

	const posts = getPosts(language);

	const post = posts.find((x) => (
		x.slug === slug &&
		`${x.year}` === year &&
		`${x.month < 10 ? '0' + x.month : x.month}` === month &&
		`${x.day < 10 ? '0' + x.day : x.day}` === day
	));

	if (!post) {
		throw new Response('Not found', { status: 404 });
	}

	return null;
};
