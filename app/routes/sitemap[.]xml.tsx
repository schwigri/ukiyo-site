import { isSupportedLanguage, languages, translate } from '~/services/i18n';
import { XMLBuilder } from 'fast-xml-parser';

export const loader = () => {
	const builder = new XMLBuilder({
		format: false,
		ignoreAttributes: false,
		suppressEmptyNode: true,
	});

	const sitemap = builder.build({
		'?xml': {
			'@_version': '1.0',
			'@_encoding': 'UTF-8',
		},
		urlset: {
			'@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
			'@_xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
			url: [
				// Home pages
				...Object.keys(languages).map((language) => {
					if (!isSupportedLanguage(language)) {
						throw new Error('Unknown language processing error');
					}

					return {
						loc: translate(language, 'https://www.schwigri.com/'),
						lastmod: '2024-02-04',
						'xhtml:link': Object.keys(languages).map((subLanguage) => {
							if (!isSupportedLanguage(subLanguage)) {
								throw new Error('Unknown language processing error');
							}

							return {
								'@_href': translate(subLanguage, 'https://www.schwigri.com/'),
								'@_hreflang': subLanguage,
								'@_rel': 'alternate',
							};
						}),
					};
				}),
				...Object.keys(languages).map((language) => {
					if (!isSupportedLanguage(language)) {
						throw new Error('Unknown language processing error');
					}

					return {
						loc: translate(language, 'https://www.schwigri.com/about-me/'),
						lastmod: '2024-02-24',
						'xhtml:link': Object.keys(languages).map((subLanguage) => {
							if (!isSupportedLanguage(subLanguage)) {
								throw new Error('Unknown language processing error');
							}

							return {
								'@_href': translate(subLanguage, 'https://www.schwigri.com/about-me/'),
								'@_hreflang': subLanguage,
								'@_rel': 'alternate',
							};
						}),
					};
				}),
			],
		},
	});

	return new Response(sitemap, {
		headers: {
			'cache-control': 'public, s-maxage=300',
			'content-type': 'application/xml',
		},
		status: 200,
	});
};
