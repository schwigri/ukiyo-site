import { languages } from '~/services/i18n';

interface Work {}

export function getWorks(lang: keyof typeof languages): ReadonlyArray<Work> {
	switch (lang) {
		case 'de':
			return [{}];

		case 'ja':
			return [{}];

		case 'en':
			return [{}];

		default:
			return [];
	}
}
