import { languages } from '~/services/i18n';

interface Post {
	readonly day: number;
	readonly month: number;
	readonly slug: string;
	readonly year: number;
}

export function getPosts(lang: keyof typeof languages): ReadonlyArray<Post> {
	switch (lang) {
		case 'de':
			return [];

		case 'ja':
			return [];

		case 'en':
			return [];

		default:
			return [];
	}
}
