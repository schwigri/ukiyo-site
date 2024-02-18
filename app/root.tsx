import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useLocation,
	useParams,
	useRouteError,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getLanguage, isSupportedLanguage, translate } from '~/services/i18n';
import { Branding } from '~/components/Branding';
import { LangSwitcher } from '~/components/LangSwitcher';
import { Menu } from '~/components/Menu';
import type { PropsWithChildren } from 'react';
import { cssBundleHref } from '@remix-run/css-bundle';
import { getPosts } from '~/models/post.server';
import { getWorks } from '~/models/work.server';
import { json } from '@remix-run/cloudflare';
import '~/styles/styles.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/prompt/600.css';
import '@fontsource/m-plus-1/400.css';
import '@fontsource/m-plus-1/600.css';

export default function App() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

export const loader = ({ params }: LoaderFunctionArgs) => {
	const { lang = 'en' } = params;

	if (!isSupportedLanguage(lang)) {
		console.log('hmm weird situation', lang);
	}

	const parsedLang = isSupportedLanguage(lang) ? lang : 'en';

	const posts = getPosts(parsedLang);
	const works = getWorks(parsedLang);

	return json({
		posts,
		works,
	});
};

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ href: cssBundleHref, rel: 'stylesheet' }] : []),
	{
		href: '/apple-touch-icon.png',
		rel: 'apple-touch-icon',
		sizes: '180x180',
	},
	{
		href: '/favicon-32x32.png',
		rel: 'icon',
		type: 'icon/png',
		sizes: '32x32',
	},
	{
		href: '/favicon-16x16.png',
		rel: 'icon',
		type: 'icon/png',
		sizes: '16x16',
	},
	{
		href: '/site.webmanifest',
		rel: 'manifest',
	},
];

export function ErrorBoundary() {
	const error = useRouteError();

	const params = useParams();
	const location = useLocation();
	const lang = getLanguage(params, location);

	return (
		<Layout>
			{isRouteErrorResponse(error) ? (
				<h1 className="wrapper text-align-center">{error.status} {translate(lang, error.statusText)}</h1>
			) : error instanceof Error ? (
				<div>
					<h1>Error</h1>
					<p>{error.message}</p>
					<pre>{error.stack}</pre>
				</div>
			) : (
				<div>
					<h1>Unknown error</h1>
				</div>
			)}
		</Layout>
	);
}

function Layout({ children }: PropsWithChildren) {
	const params = useParams();
	const location = useLocation();
	const lang = getLanguage(params, location);
	const { posts, works } = useLoaderData<typeof loader>();

	return (
		<html lang={lang}>
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>
			<body className="bg-theme color-foreground">
				<a className="skip-link font--2 visually-hidden focus-visible" href="#main">
					{translate(lang, 'Skip to content')}
				</a>

				<header className="bg-background">
					<nav
						aria-label={translate(lang, 'Language options')}
						className="top-nav upon-md font--2 text-align-right wrapper"
					>
						<LangSwitcher />
					</nav>

					<div className="header region-xs-m">
						<nav
							aria-label={translate(lang, 'Main')}
							className="wrapper row align-center justify-between"
						>
							<Branding />

							<Menu
								hasBlog={!!posts.length}
								hasWork={!!works.length}
								key={`root-menu--${lang}`}
							/>
						</nav>
					</div>
				</header>

				<main className="main bg-background" id="main">
					{children}
				</main>

				<footer className="footer wrapper align-center region-xs-m row justify-between color-accent-foreground font--2">
					<p>
						<span>{translate(lang, 'Copyright © Griffen Schwiesow')}</span>
						<span className="spacing-3xs"> / </span>
						<a
							className="link"
							href="https://github.com/schwigri/ukiyo-site"
							rel="noopener nofollow"
						>
							{translate(lang, 'Made with 🎔').split('🎔').map((item, i, arr) => {
								if (i === arr.length - 1) {
									return item;
								}

								return [item, <span aria-label={translate(lang, 'love')} className="font-symbols">🎔</span>];
							})}
						</a>
					</p>

					<LangSwitcher />
				</footer>

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
