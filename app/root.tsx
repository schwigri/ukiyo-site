import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useParams,
} from '@remix-run/react';
import { getLanguageFromParams, translate } from '~/services/i18n';
import { Branding } from '~/components/Branding';
import { LangSwitcher } from '~/components/LangSwitcher';
import type { LinksFunction } from '@remix-run/cloudflare';
import { Menu } from '~/components/Menu';
import { cssBundleHref } from '@remix-run/css-bundle';
import '~/styles/styles.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/prompt/600.css';
import '@fontsource/m-plus-1/400.css';
import '@fontsource/m-plus-1/600.css';

export default function App() {
	const params = useParams();
	const lang = getLanguageFromParams(params);

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
						className="upon-md"
					>
						<LangSwitcher />
					</nav>

					<div className="header region-xs-m">
						<nav
							aria-label={translate(lang, 'Main')}
							className="wrapper row align-center justify-between"
						>
							<Branding />

							<Menu />
						</nav>
					</div>
				</header>

				<main className="main bg-background region-xl">
					<Outlet />
				</main>

				<footer>
					footer
				</footer>

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ href: cssBundleHref, rel: 'stylesheet' }] : []),
];
