import { Link, useParams, useLocation } from '@remix-run/react';
import { getLanguage, languages } from '~/services/i18n';

interface LangSwitcherProps {
	readonly className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
	const params = useParams();
	const location = useLocation();

	const lang = getLanguage(params, location);

	const classNames = (className ? [className] : []).concat([
		'lang-switcher',
		'wrapper',
		'font--2',
		'text-align-right',
	]);

	return (
		<ul className={classNames.join(' ')}>
			{Object.entries(languages).sort().map(([langCode, langName], index, array) => (
				<li
					className="lang-switcher__item inline-row align-center"
					key={langCode}
				>
					<Link
						aria-current={langCode === lang ? 'true' : undefined}
						className="lang-switcher__link region-2xs"
						hrefLang={langCode}
						lang={langCode}
						to={langCode === 'en' ? '/' : `/${langCode}/`}
					>
						{langName}
					</Link>

					{index !== array.length - 1 ? (
						<span aria-hidden="true" className="lang-switcher__spacer"> / </span>
					) : null}
				</li>
			))}
		</ul>
	);
}
