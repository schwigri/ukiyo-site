import { getLanguage, translate } from '~/services/i18n';
import { useLocation, useParams } from '@remix-run/react';
import { Page } from '../Page';

export function AboutPage() {
	const lang = getLanguage(useParams(), useLocation());

	return (
		<Page>
			<p>{translate(lang, 'About')}</p>
		</Page>
	);
}
