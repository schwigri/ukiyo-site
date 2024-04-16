import { createPath, langCodes } from './i18n';

export const atomFeedLinks = langCodes.map((lang) => ({
	href: createPath(lang, 'feed'),
	rel: 'alternate',
	tagName: 'link',
	type: 'application/atom+xml',
}));
