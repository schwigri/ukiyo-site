import { Lang, defaultLang } from '~/lib/i18n';
import { XMLBuilder } from 'fast-xml-parser';

export const loader = () => {
	const builder = new XMLBuilder({
		format: false,
		ignoreAttributes: false,
		suppressEmptyNode: true,
	});

	const langCodes = Object.values(Lang);

	const sitemap = builder.build({
		'?xml': {
			'@_version': '1.0',
			'@_encoding': 'UTF-8',
		},
		urlset: {
			'@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
			'@_xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
			url: [
				// home pages
				...langCodes.map((lang) => ({
					loc: `https://www.schwigri.com${lang === defaultLang ? '/' : `/${lang}/`}`,
					lastmod: '2024-04-13',
					'xhtml:xlink': langCodes.map((subLang) => ({
						'@_href': `https://www.schwigri.com${subLang === defaultLang ? '/' : `/${subLang}/`}`,
						'@_hreflang': subLang,
						'@_rel': 'alternat',
					})),
				})),
			],
		},
	});

	return new Response(sitemap, {
		headers: {
			'Cache-Control': 'public, s-maxage=300',
			'Content-Type': 'application/xml',
		},
		status: 200,
	});
};
