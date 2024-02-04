import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { isSupportedLanguage } from '~/services/i18n';

export default function Index() {
	return <p>Index page</p>
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { lang } = params;

	if (lang && (lang === 'en' || !isSupportedLanguage(lang))) {
		throw new Response('Page not found index!!!', { status: 404 });
	}

	return null;
};
