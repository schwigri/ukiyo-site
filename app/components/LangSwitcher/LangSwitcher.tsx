import { NavLink, useParams } from '@remix-run/react';
import { getLanguageFromParams, languages } from '~/services/i18n';

export function LangSwitcher() {
	const lang = getLanguageFromParams(useParams());

	return (
		<ul className="lang-switcher wrapper font--2 text-align-right">
			{Object.entries(languages).sort().map(([langCode, langName], index, array) => (
				<li
					className="lang-switcher__item inline-row align-center"
					key={langCode}
				>
					<NavLink
						aria-current={langCode === lang ? 'true' : undefined}
						className="lang-switcher__link region-2xs"
						hrefLang={langCode}
						lang={langCode}
						to={langCode === 'en' ? '/' : `/${langCode}/`}
					>
						{langName}
					</NavLink>

					{index !== array.length - 1 ? (
						<span aria-hidden="true" className="lang-switcher__spacer"> / </span>
					) : null}
				</li>
			))}
		</ul>
	);
}
