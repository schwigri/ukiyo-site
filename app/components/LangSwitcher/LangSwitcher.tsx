import { Link, useParams, useLocation } from '@remix-run/react';
import { getLanguage, getPageType, languages, translate } from '~/services/i18n';

interface LangSwitcherProps {
	readonly className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
	const params = useParams();
	const location = useLocation();

	const lang = getLanguage(params, location);
	const pageType = getPageType(params, location);

	const classNames = (className ? [className] : []).concat([
		'lang-switcher',
	]);

	return (
		<ul className={classNames.join(' ')}>
			{Object.entries(languages).sort().map(([langCode, langName], index, array) => {
				let destination = langCode === 'en' ? '/' : `/${langCode}/`;

				switch (pageType) {
					case 'about':
						destination = translate(langCode, '/about-me');
						break;

					case 'work':
						destination = translate(langCode, '/work');
						break;

					case 'blog':
						destination = translate(langCode, '/blog');
						break;
				}

				return (
					<li
						className="lang-switcher__item inline-row align-center"
						key={langCode}
					>
						<Link
							aria-current={langCode === lang ? 'true' : undefined}
							className="lang-switcher__link"
							hrefLang={langCode}
							lang={langCode}
							to={destination}
						>
							{langName}
						</Link>

						{index !== array.length - 1 ? (
							<span aria-hidden="true" className="lang-switcher__spacer"> / </span>
						) : null}
					</li>
				);
			})}
		</ul>
	);
}
