import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { isSupportedLanguage, languages, translate } from '~/services/i18n';
import { AboutPage } from '~/components/AboutPage';
import { BlogPage } from '~/components/BlogPage';
import { HomePage } from '~/components/HomePage';
import { getPosts } from '~/models/post';
import { getWorks } from '~/models/work';
import { isAboutSlug } from '~/services/about';
import { isBlogSlug } from '~/services/blog';
import { isWorkSlug } from '~/services/work';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

export default function Index() {
	const { pageType } = useLoaderData<typeof loader>();

	switch (pageType) {
		case 'about':
			return <AboutPage />;

		case 'work':
			return <p>Work page</p>;

		case 'blog':
			return <BlogPage />;

		default:
			return <HomePage />;
	}
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { lang } = params;

	if (lang && (lang === 'en' || !isSupportedLanguage(lang))) {
		// If `lang` is a page for default lang, we should render that

		if (isAboutSlug('en', lang)) {
			return json({
				pageType: 'about',
			});
		}

		if (isBlogSlug('en', lang) && getPosts('en').length) {
			return json({
				pageType: 'blog',
			});
		}

		if (isWorkSlug('en', lang) && getWorks('en').length) {
			return json({
				pageType: 'work',
			});
		}

		throw new Response('Page not found index!!!', { status: 404 });
	}

	return json({
		pageType: 'home',
	});
};

export const meta: MetaFunction = ({ params }) => {
	const { lang = 'en' } = params;

	if (!isSupportedLanguage(lang)) {
		if (lang === 'about-me') {
			return [
				{ title: translate('en', 'About me — Griffen Schwiesow') },
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
