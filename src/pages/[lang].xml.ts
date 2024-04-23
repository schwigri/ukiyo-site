import { getLangFromUrl, getT, langCodes, slug } from '~/lib/i18n';
import type { APIRoute } from 'astro';
import { XMLBuilder } from 'fast-xml-parser';
import { getCollection, getEntry } from 'astro:content';
import { getPathnameFromEntry } from '~/lib/seo';
import markdownit from 'markdown-it';
import { v5 } from 'uuid';

const md = markdownit({
	html: true,
});

const builder = new XMLBuilder({
	cdataPropName: 'cdata',
	format: false,
	ignoreAttributes: false,
	suppressEmptyNode: true,
	textNodeName: 'textNode',
});

export const GET: APIRoute = async ({ site, url }) => {
	if (!site) {
		throw new Error('site variable must be set to generate feed');
	}

	const lang = getLangFromUrl(url);
	const seoT = getT(lang, 'SEO');
	const t = getT(lang);

	const baseUrl = new URL(site);

	const getUrl = (path: string): string => {
		baseUrl.pathname = path;
		return decodeURI(baseUrl.toString());
	}

	const namespace = v5(baseUrl.host, v5.URL);

	const rawPosts = await getCollection('posts', (post) => post.slug.startsWith(lang));
	const renderedPosts = await Promise.all(rawPosts.map(async (post) => {
		return {
			...post,
			renderContent: await post.render(),
			canonicalSlug: await getPathnameFromEntry(post),
		};
	}));

	const postsData = await getEntry('data', 'posts');

	const getId = (slug: string): string => {
		return `urn:uuid:${v5(slug, namespace)}`;
	};


	renderedPosts.sort((postA, postB) => {
		const postAData = postsData.data.posts[postA.id];
		const postBData = postsData.data.posts[postB.id];

		if (!postAData || !postBData) {
			throw new Error(`missing post timestamps for ${postA.id} or ${postB.id}`);
		}

		const dateA = new Date(postAData.published);
		const dateB = new Date(postBData.published);

		return dateB.getUTCMilliseconds() - dateA.getUTCMilliseconds();
	});

	const feed = builder.build({
		'?xml': {
			'@_version': '1.0',
			'@_encoding': 'UTF-8',
		},
		feed: {
			'@_xmlns': 'http://www.w3.org/2005/Atom',
			link: [
				{
					'@_href': getUrl(`/${lang}.xml`),
					'@_rel': 'self',
				},
				...langCodes.map((langCode) => ({
					'@_href': getUrl(`/${langCode}.xml`),
					'@_hreflang': langCode,
					'@_rel': 'alternate',
					'@_type': 'application/atom+xml',
				})),
				...langCodes.map((langCode) => ({
					'@_href': getUrl(slug(langCode)),
					'@_hreflang': langCode,
					'@_rel': 'alternate',
					'@_type': 'text/html',
				})),
			],
			id: getId(`${lang}.xml`),
			updated: renderedPosts[0]?.renderContent.remarkPluginFrontmatter.lastModified,
			title: seoT`Griffen Schwiesow — Designer, front-end developer and accessibility specialist`,
			subtitle: seoT`I am a designer, front-end developer and PNW native. As an accessibility specialist, I strive to make the web a more beautiful and inclusive space.`,
			author: {
				name: t`Griffen Schwiesow`,
			},
			entry: [
				...renderedPosts.map((post) => {
					const postData = postsData.data.posts[post.id];

					if (!postData) {
						throw new Error(`missing post timestamps for ${post.id}`);
					}

					const canonicalUrl = getUrl(post.canonicalSlug);
					return {
						link: {
							'@_href': canonicalUrl,
							'@_rel': 'alternate',
						},
						id: getId(post.canonicalSlug),
						published: postData.published,
						updated: postData.lastModified,
						title: post.data.title,
						content: {
							'@_type': 'html',
							'@_xml:base': canonicalUrl,
							cdata: md.render(post.body),
						},
					};
				}),
			],
		},
	});

	return new Response(feed, {
		headers: {
			'Cache-Control': 'public, s-maxage=300',
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};

export function getStaticPaths() {
	const result = langCodes.map((langCode) => ({
		params: { lang: langCode },
	}));

	return result;
}
