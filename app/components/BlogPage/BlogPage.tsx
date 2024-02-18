import { getLanguage, translate } from '~/services/i18n';
import { useLocation, useParams } from "@remix-run/react";
import { Page } from "../Page";

export function BlogPage() {
	const lang = getLanguage(useParams(), useLocation());

	return (
		<Page>
			<p>{translate(lang, 'blog papapa page')}</p>
		</Page>
	);
}
