import { languages } from './i18n';

export const isWorkSlug = (lang: keyof typeof languages, slug: string): boolean => {
	switch (lang) {
		case 'de':
			return slug === 'arbeiten';

		case 'en':
			return slug === 'work';

		case 'ja':
			return slug === '作品集';

		default:
			return false;
	}
};
