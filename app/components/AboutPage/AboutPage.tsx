import { t, withLang } from '~/lib/i18n';

export function AboutPage() {
	const lang = withLang();

	return (
		<div className="wrapper region-xl">
			{t(lang)`Coming soon`}
		</div>
	);
}
