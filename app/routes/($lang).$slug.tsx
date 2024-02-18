import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { isSupportedLanguage, languages, translate } from '~/services/i18n';
import { AboutPage } from '~/components/AboutPage';
import { BlogPage } from '~/components/BlogPage';
import { getPosts } from '~/models/post.server';
import { getWorks } from '~/models/work.server';
import { isAboutSlug } from '~/services/about';
import { isBlogSlug } from '~/services/blog';
import { isWorkSlug } from '~/services/work';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

export default function Slug() {
	const { pageType } = useLoaderData<typeof loader>();

	switch (pageType) {
		case 'about':
			return <AboutPage />;

		case 'work':
			return <p>Work page</p>;

		case 'blog':
			return <BlogPage />;

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
		return json({
			pageType: 'about',
		});
	}

	if (isBlogSlug(lang, slug) && getPosts(lang).length) {
		return json({
			pageType: 'blog',
		});
	}

	if (isWorkSlug(lang, slug) && getWorks(lang).length) {
		return json({
			pageType: 'work',
		});
	}

	throw new Response('Unknown page', { status: 404 });
};

export const meta: MetaFunction = ({ params }) => {
	const { lang, slug } = params;

	if (!lang || !slug || !isSupportedLanguage(lang)) {
		return [];
	}

	if (isAboutSlug(lang, slug)) {
		return [
			{ title: translate(lang, 'About me — Griffen Schwiesow') },
			{
				href: translate(lang, 'https://www.schwigri.com/about-me/'),
				rel: 'canonical',
				tagName: 'link',
			},
			...Object.keys(languages).map((language) => {
				if (!isSupportedLanguage(language)) {
					throw new Error('Unknown language parsing error');
				}

				return {
					href: translate(language, 'https://www.schwigri.com/about-me/'),
					hrefLang: language,
					rel: 'alternate',
					tagName: 'link',
				};
			}),
		];
	}

	if (isBlogSlug(lang, slug)) {
		return [
			{ title: translate(lang, 'Blog — Griffen Schwiesow') },
			{
				href: translate(lang, 'https://www.schwigri.com/blog/'),
				rel: 'canonical',
				tagName: 'link',
			},
			...Object.keys(languages).map((language) => {
				if (!isSupportedLanguage(language)) {
					throw new Error('Unknown language parsing error');
				}

				return {
					href: translate(language, 'https://www.schwigri.com/blog/'),
					hrefLang: language,
					rel: 'alternate',
					tagName: 'link',
				};
			}),
		];
	}

	if (isWorkSlug(lang, slug)) {
		return [
			{ title: translate(lang, 'Work — Griffen Schwiesow') },
			{
				href: translate(lang, 'https://www.schwigri.com/work/'),
				rel: 'canonical',
				tagName: 'link',
			},
			...Object.keys(languages).map((language) => {
				if (!isSupportedLanguage(language)) {
					throw new Error('Unknown language parsing error');
				}

				return {
					href: translate(language, 'https://www.schwigri.com/work/'),
					hrefLang: language,
					rel: 'alternate',
					tagName: 'link',
				};
			}),
		];
	}

	return [];
};
