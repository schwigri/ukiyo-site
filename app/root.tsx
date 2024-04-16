import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import {
	Outlet,
	isRouteErrorResponse,
	useLoaderData,
	useLocation,
	useRouteError,
} from '@remix-run/react';
import { c, defaultLang, getLangFromPathname, t, watchLang } from '~/lib/i18n';
import { Layout } from '~/components/Layout';
import { atomFeedLinks } from '~/lib/meta';
import { cssBundleHref } from '@remix-run/css-bundle';
import { getLangFromUrl, i18nServer } from '~/.server/i18n';
import { json } from '@remix-run/node';
import '~/styles/styles.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/prompt/600.css';
import '@fontsource/m-plus-1/400.css';
import '@fontsource/m-plus-1/600.css';
import '@fontsource/noto-sans-symbols-2/symbols-400.css';

export const loader = (args: LoaderFunctionArgs) => {
	const url = new URL(args.request.url);
	const lang = getLangFromUrl(url);

	return json({
		lang: getLangFromUrl(url),
	});
};

export const meta: MetaFunction<typeof loader> = ({ data, error }) => {
	const lang = data?.lang ?? defaultLang;
	let errorTitle = t(lang)`Error`;

	if (isRouteErrorResponse(error)) {
		const title = c(lang, 'Remix').t`${error.statusText}` || t(lang)`Error`;
		console.log(title, error);
		errorTitle = c(lang, 'SEO').t`${title} — Griffen Schwiesow`;
	} else if (error instanceof Error) {
		errorTitle = error.name;
	}

	const result: ReturnType<MetaFunction> = [
		...atomFeedLinks,
	];

	if (error) {
		console.log('is error');
		result.push({ title: errorTitle });
	}

	if (cssBundleHref) {
		result.push({ href: cssBundleHref, rel: 'stylesheet' });
	}

	return result;
};

export default function App() {
	const { lang } = useLoaderData<typeof loader>();
	watchLang(lang);

	return (
		<Layout lang={lang}>
			<Outlet />
		</Layout>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	const location = useLocation();
	const lang = getLangFromPathname(location.pathname);

	let pageTitle = t(lang)`Error`;

	console.log('here');

	if (isRouteErrorResponse(error)) {
		pageTitle = c(lang, 'Remix').t`${error.statusText}`;
	} else if (error instanceof Error) {
		pageTitle = error.name;
	}


	return (
		<Layout>

			{isRouteErrorResponse(error) ? (<p>Route error</p>) : error instanceof Error ? (<p>Loader error</p>) : (<p>Unknown error</p>)}
		</Layout>
	);
}
