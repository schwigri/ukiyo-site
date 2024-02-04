import { Link, useLocation, useParams } from '@remix-run/react';
import { defaultLanguage, getLanguage, languages, translate } from '~/services/i18n';
import icon from '../../graphics/icon.png';

export function Branding() {
	const params = useParams();
	const location = useLocation();
	const lang = getLanguage(params, location);

	const content = (
		<>
			<img alt="" src={icon} style={{ height: '40px' }} />
			<span className="until-sm">{translate(lang, 'Griffen')}</span>
			<span className="upon-sm">{translate(lang, 'Griffen Schwiesow')}</span>
		</>
	);

	const classNames = [
		'font-branding',
		'branding__link',
		'inline-row',
		'align-center',
		'gap-3xs',
		'font--0',
	];

	const indexPaths = Object.keys(languages).map((language) => language === defaultLanguage ? '/' : [`/${language}/`, `/${language}`]).flat();

	return indexPaths.includes(location.pathname) ? (
		<h1 className={classNames.join(' ')}>
			{content}
		</h1>
	) : (
		<Link
			className={classNames.join(' ')}
			to={lang === defaultLanguage ? '/' : `/${lang}/`}
		>
			{content}
		</Link>
	);
}
