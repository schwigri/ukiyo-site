import { Lang, defaultLang, t, withLang } from '~/lib/i18n';
import { Link, useLoaderData, useLocation } from '@remix-run/react';

function Content() {
	const lang = withLang();
	console.log('lol branding content lang', lang);
	return (
		<>
			<img
				alt=""
				height="40px"
				src="/logo.png"
				srcSet="/logo.png, /logo@2x.png 2x, /logo@3x.png 3x"
				width="40px"
			/>
			<span className="until-sm">{t(lang)`Griffen`}</span>
			<span className="upon-sm">{t(lang)`Griffen Schwiesow`}</span>
		</>
	);
}

export function Branding() {
	const lang = withLang();
	const location = useLocation();
	const classNames = [
		'font-branding',
		'branding__link',
		'inline-row',
		'align-center',
		'gap-3xs',
		'font--0',
	];

	const indexPaths = Object.values(Lang)
		.map((lang) => lang === defaultLang ? '/' : [`/${lang}`, `/${lang}/`])
		.flat();

	return indexPaths.includes(location.pathname) ? (
		<h1 className={classNames.join(' ')}>
			<Content />
		</h1>
	) : (
		<Link
			className={classNames.join(' ')}
			to={lang === defaultLang ? '/' : `/${lang}/`}
		>
			<Content />
		</Link>
	);
}
