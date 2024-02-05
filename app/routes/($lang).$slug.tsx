import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { AboutPage } from '~/components/AboutPage';
import { getPosts } from '~/models/post.server';
import { getWorks } from '~/models/work.server';
import { isAboutSlug } from '~/services/about.server';
import { isBlogSlug } from '~/services/blog.server';
import { isSupportedLanguage } from '~/services/i18n';
import { isWorkSlug } from '~/services/work.server';

export default function Slug() {
	const { pageType } = useLoaderData<typeof loader>();

	console.log('pageType', pageType);

	switch (pageType) {
		case 'about':
			return <AboutPage />;

		default:
			return <p>Slug page</p>;
	}
}

export const loader = ({ params }: LoaderFunctionArgs) => {
	const { lang, slug } = params;

	if (!slug) {
		throw new Response('Missing slug', { status: 404 });
	}

	if (!lang || !isSupportedLanguage(lang)) {
		throw new Response('Unsupported language', { status: 404 });
	}

	// Validate slug

	if (isAboutSlug(lang, slug)) {
		return {
			pageType: 'about',
		};
	}

	if (isBlogSlug(lang, slug) && getPosts(lang).length) {
		return {
			pageType: 'blog',
		};
	}

	if (isWorkSlug(lang, slug) && getWorks(lang).length) {
		return {
			pageType: 'work',
		};
	}

	throw new Response('Unknown page', { status: 404 });
};
