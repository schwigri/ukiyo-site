import { AboutPage } from '~/components/AboutPage';
import { HomePage } from '~/components/HomePage';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getPosts } from '~/models/post.server';
import { getWorks } from '~/models/work.server';
import { isSupportedLanguage, languages, translate } from '~/services/i18n';
import { isAboutSlug } from '~/services/about.server';
import { isBlogSlug } from '~/services/blog.server';
import { isWorkSlug } from '~/services/work.server';

export default function Index() {
	const { pageType } = useLoaderData<typeof loader>();

	switch (pageType) {
		case 'about':
			return <AboutPage />;

		case 'work':
			return <p>Work page</p>;

		case 'blog':
			return <p>Blog page</p>;

		default:
			return <HomePage />;
	}
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { lang } = params;

	if (lang && (lang === 'en' || !isSupportedLanguage(lang))) {
		// If `lang` is a page for default lang, we should render that

		if (isAboutSlug('en', lang)) {
			return {
				pageType: 'about',
			};
		}

		if (isBlogSlug('en', lang) && getPosts('en').length) {
			return {
				pageType: 'blog',
			};
		}

		if (isWorkSlug('en', lang) && getWorks('en').length) {
			return {
				pageType: 'work',
			};
		}

		throw new Response('Page not found index!!!', { status: 404 });
	}

	return {
		pageType: 'home',
	};
};

export const meta: MetaFunction = ({ params }) => {
	const { lang = 'en' } = params;

	if (!isSupportedLanguage(lang)) {
		if (lang === 'about') {
			return [
				{ title: translate('en', 'About — Griffen Schwiesow') },
				{
					href: translate('en', 'https://www.schwigri.com/about/'),
					rel: 'canonical',
					tagName: 'link',
				},
				...Object.keys(languages).map((language) => {
					if (!isSupportedLanguage(language)) {
						throw new Error('Unknown language parsing error');
					}

					return {
						href: translate(language, 'https://www.schwigri.com/about/'),
						hrefLang: language,
						rel: 'alternate',
						tagName: 'link',
					};
				}),
			];
		}

		if (lang === 'blog') {
			return [
				{ title: translate('en', 'Blog — Griffen Schwiesow') },
				{
					href: translate('en', 'https://www.schwigri.com/blog/'),
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

		if (lang === 'work') {
			return [
				{ title: translate('en', 'Work — Griffen Schwiesow') },
				{
					href: translate('en', 'https://www.schwigri.com/work/'),
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
	}

	return [
		{ title: translate(lang, 'Griffen Schwiesow — Designer, front-end developer and language enthusiast') },
		{
			href: translate(lang, 'https://www.schwigri.com/'),
			rel: 'canonical',
			tagName: 'link',
		},
		...Object.keys(languages).map((language) => {
			if (!isSupportedLanguage(language)) {
				throw new Error('Unknown language parsing error');
			}

			return {
				href: translate(language, 'https://www.schwigri.com/'),
				hrefLang: language,
				rel: 'alternate',
				tagName: 'link',
			};
		}),
	];
};
