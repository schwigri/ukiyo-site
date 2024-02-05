import { languages } from './i18n';

export const isAboutSlug = (lang: keyof typeof languages, slug: string): boolean => {
	switch (lang) {
		case 'de':
			return slug === 'ueber-mich';

		case 'en':
			return slug === 'about';

		case 'ja':
			return slug === 'プロフィール';

		default:
			return false;
	}
};
