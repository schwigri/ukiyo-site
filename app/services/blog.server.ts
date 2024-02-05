import { languages } from './i18n';

export const isBlogSlug = (lang: keyof typeof languages, slug: string): boolean => {
	switch (lang) {
		case 'de':
		case 'en':
			return slug === 'blog';

		case 'ja':
			return slug === 'ブログ';

		default:
			return false;
	}
};
