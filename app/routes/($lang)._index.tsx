import { defaultLanguage, isSupportedLanguage } from '~/services/i18n';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export default function Index() {
	return <p>Index page</p>
}

export const loader = ({ params }: LoaderFunctionArgs) => {
	const { lang } = params;

	if (lang && (lang === defaultLanguage || !isSupportedLanguage(lang))) {
		throw new Response('Not found', { status: 404 });
	}

	return null;
};
