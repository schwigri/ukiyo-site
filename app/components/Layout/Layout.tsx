import {
	Links,
	Meta,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import { Lang, jt, t, withLang } from "~/lib/i18n";
import { Branding } from '../Branding';
import { LangSwitcher } from '../LangSwitcher';
import { Menu } from '../Menu';

interface LayoutProps extends React.PropsWithChildren {
}

export function Layout({ children }: LayoutProps) {
	const lang = withLang();

	return (
		<html lang={lang}>
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>
			<body className="bg-theme color-foreground">
				<a
					className="skip-link font--2 visually-hidden focus-visible"
					href="#main"
				>
					{t(lang)`Skip to content`}
				</a>

				<header className="bg-background">
					<nav
						aria-label={t(lang)`Languages`}
						className="top-nav upon-md font--2 text-align-right wrapper"
					>
						<LangSwitcher />
					</nav>

					<div className="header region-xs-m">
						<nav
							aria-label={t(lang)`Main`}
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

				<footer className="footer gap-3xs wrapper align-baseline region-xs-m row justify-between color-accent-foreground font--2">
					<p>
						<span>{t(lang)`Copyright © Griffen Schwiesow`}</span>
						<span className="spacing-3xs">
							/&nbsp;
							<a className="link" href="https://github.com/schwigri/ukiyo-site" rel="noopener noreferrer">{jt(lang)`Made with ${
								<span aria-label={t(lang)`love`} className="font-symbols" key="love">🎔</span>
							}`}</a>
						</span>
					</p>

					<LangSwitcher />
				</footer>

				<Scripts />
				<ScrollRestoration />
			</body>
		</html>
	);
}
