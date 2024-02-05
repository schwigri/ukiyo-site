import {
	Links,
	Meta,
	useLocation,
	useParams,
} from '@remix-run/react';
import { getLanguage, translate } from '~/services/i18n';
import type { PropsWithChildren } from 'react';
import { Branding } from '../Branding';
import { LangSwitcher } from '../LangSwitcher';
import { Menu } from '../Menu';

export function Layout({ children }: PropsWithChildren) {
	const params = useParams();
	const location = useLocation();
	const lang = getLanguage(params, location);

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

				<main className="main bg-background" id="main">
					{children}
				</main>

				<footer className="footer">
					Footer
				</footer>
			</body>
		</html>
	);
}
