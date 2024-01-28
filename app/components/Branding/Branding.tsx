import { Link, useParams } from '@remix-run/react';
import { defaultLanguage, getLanguageFromParams, translate } from '~/services/i18n';
import icon from '../../graphics/icon.png';

export function Branding() {
	const lang = getLanguageFromParams(useParams());

	return (
		<Link
			className="font-branding branding__link inline-row align-center gap-3xs"
			to={lang === defaultLanguage ? '/' : `/${lang}/`}
		>
			<img alt="" src={icon} style={{ height: '40px' }} />
			{/* <span>{translate(lang, 'Griffen')}</span> */}
			<span>{translate(lang, 'Griffen Schwiesow')}</span>
		</Link>
	);
}
