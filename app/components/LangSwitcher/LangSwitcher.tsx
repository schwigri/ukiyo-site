import { Lang, defaultLang, c, createPath, langNames, getSlug, withLang } from '~/lib/i18n';
import { Link, useLoaderData, useLocation } from '@remix-run/react';

interface LangSwitcherProps {
	readonly className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
	const location = useLocation();
	const currentLang = withLang();
	console.log('currentLang', currentLang);

	const slug = getSlug(currentLang, decodeURIComponent(location.pathname));
	const sourceSlug = slug === '' ? slug : c(currentLang, 'Slug').getMsgidFromStr(slug);
	console.log('sourceSlug', sourceSlug);
	const classNames = (className ? [className] : []).concat('lang-switcher');

	return (
		<ul className={classNames.join(' ')}>
			{Object.values(Lang).sort().map((lang, index, array) => {
				const result = (
					<li
						className="lang-switcher__item inline-row align-center"
						key={lang}
					>
						<Link
							aria-current={lang === currentLang ? 'true' : undefined}
							className="lang-switcher__link"
							hrefLang={lang}
							lang={lang}
							to={createPath(lang, sourceSlug ? c(lang, 'Slug').t([sourceSlug]) : '')}
						>
							{langNames[lang]}
						</Link>

						{index !== array.length - 1 ? (
							<span aria-hidden="true" className="lang-switcher__spacer"> / </span>
						) : null}
					</li>
				);
				return result;
			})}
		</ul>
	);
}
