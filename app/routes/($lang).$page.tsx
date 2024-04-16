import { AboutPage } from '~/components/AboutPage';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { PageType } from '~/lib/pages';
import { c, isLang, t } from '~/lib/i18n';
import { useLoaderData } from '@remix-run/react';

export const loader = ({ params }: LoaderFunctionArgs) => {
	const { lang = '', page } = params;
	let pageType: PageType = PageType.Index;

	if (!isLang(lang)) {
		throw new Response('', { status: 404, statusText: 'Not Found' });
	}

	if (page === t(lang, 'Slug')`about-me`) {
		pageType = PageType.About;
		return json({ pageType });
	}

	throw new Response('', { status: 404, statusText: 'Not Found' });
};

export default function Page() {
	const data = useLoaderData<typeof loader>();

	switch (data.pageType) {
		case PageType.About:
			return <AboutPage />;
	}

	return <p>Page</p>;
}
