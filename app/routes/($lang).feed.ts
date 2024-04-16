import { Lang, defaultLang } from '~/lib/i18n';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { XMLBuilder } from 'fast-xml-parser';
import { v5 } from 'uuid';

export const loader = ({ params, request }: LoaderFunctionArgs) => {
	const { lang = defaultLang } = params;
	const langs = Object.values<string>(Lang);

	if (!lang || !langs.includes(lang)) {
		throw new Response('', { status: 404 });
	}

	const builder = new XMLBuilder({
		format: false,
		ignoreAttributes: false,
		suppressEmptyNode: true,
	});

	const prefix = lang === defaultLang ? '/' : `/${lang}/`;
	const url = new URL(process.env.CANONICAL_URL ?? request.url);
	url.pathname = prefix;
	const home = url.href;
	url.pathname = `${prefix}feed`;
	const namespace = v5(url.host, v5.URL);
	const id = v5(url.pathname, namespace);

	const feed = builder.build({
		'?xml': {
			'@_version': '1.0',
			'@_encoding': 'UTF-8',
		},
		feed: {
			'@_xmlns': 'http://www.w3.org/2005/Atom',
			title: 'Feed title',
			subtitle: 'Feed subtitle',
			link: [
				{
					'@_href': url.href,
					'@_rel': 'self',
				},
				{
					'@_href': home,
				},
			],
			id: `urn:uuid:${id}`,
			updated: process.env.FEED_UPDATED ?? (new Date()).toISOString(),
			entry: [],
		},
	});

	return new Response(feed, {
		headers: {
			'Cache-Control': 'public, s-maxage=300',
			'Content-Type': 'application/atom+xml',
		},
		status: 200,
	});
};
