import { Link, json, useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Lang, c, defaultLang, isLang, t } from '~/lib/i18n';
import { AboutPage } from '~/components/AboutPage';
import { atomFeedLinks } from '~/lib/meta';
import { PageType } from '~/lib/pages';

export const loader = ({ params, request }: LoaderFunctionArgs) => {
	const { lang } = params;

	let result: { lang: Lang, pageType: PageType };

	let pageType: PageType = PageType.Index;

	if (lang && (lang === 'en' || !isLang(lang))) {

		if (lang === 'about-me') {
			result = { lang: defaultLang, pageType: PageType.About };
			return json(result);
		}

		throw new Response('Not Found', { status: 404, statusText: c(isLang(lang) ? lang : defaultLang, 'Remix').t`Not Found` });
	}

	result = { lang: lang && isLang(lang) ? lang : defaultLang, pageType: PageType.Index };

	return json(result);
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		...atomFeedLinks,
		{ title: c(data?.lang ?? defaultLang, 'SEO').t`Griffen Schwiesow — Designer, front-end developer and language enthusiast` },
	];
};

export default function Index() {
	const data = useLoaderData<typeof loader>();
	const { lang } = data;

	switch (data.pageType) {
		case PageType.About:
			return <AboutPage />;
	}

	return (
		<div className="wrapper region-xl">
			{t(lang)`Coming soon`}
		</div>
	);
}
