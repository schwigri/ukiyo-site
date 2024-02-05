import { Layout } from './components/Layout';
import type { LinksFunction } from '@remix-run/cloudflare';
import { Outlet, isRouteErrorResponse, useLocation, useParams, useRouteError } from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import '~/styles/styles.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/prompt/600.css';
import '@fontsource/m-plus-1/400.css';
import '@fontsource/m-plus-1/600.css';
import { getLanguage, translate } from './services/i18n';

export default function App() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ href: cssBundleHref, rel: 'stylesheet' }] : []),
];

export function ErrorBoundary() {
	const error = useRouteError();

	const params = useParams();
	const location = useLocation();
	const lang = getLanguage(params, location);

	console.log('isRouteErrorResponse', isRouteErrorResponse(error));
	console.log('error', error);

	return (
		<Layout>
			{isRouteErrorResponse(error) ? (
				<h1 className="wrapper text-align-center">{error.status} {translate(lang, error.statusText)}</h1>
			) : error instanceof Error ? (
				<div>
					<h1>Error</h1>
					<p>{error.message}</p>
					<pre>{error.stack}</pre>
				</div>
			) : (
				<div>
					<h1>Unknown error</h1>
				</div>
			)}
		</Layout>
	);
}
