import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getPosts } from '~/models/post';
import { isBlogSlug } from '~/services/blog';
import { isSupportedLanguage } from '~/services/i18n';

export default function Post() {
	return <p>Post</p>;
}

export const loader = ({ params }: LoaderFunctionArgs) => {
	const { blog, day, lang, month, slug, year } = params;

	if ((lang === 'en') || !blog || !year || !month || !day || !slug) {
		throw new Response('Not found post lol', { status: 404 });
	}

	const language = lang ?? 'en';

	if (!isSupportedLanguage(language)) {
		throw new Response('Unspported language', { status: 404 });
	}

	if (!isBlogSlug(language, blog)) {
		throw new Response('Unsupported blog slug', { status: 404 });
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

	return json({
		posts: [],
	});
};
