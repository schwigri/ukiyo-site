import { languages } from '~/services/i18n';

interface Post {
	readonly day: number;
	readonly month: number;
	readonly slug: string;
	readonly year: number;
}

export function getPosts(lang: keyof typeof languages): ReadonlyArray<Post> {
	switch (lang) {
		default:
			return [
				{
					year: 2024,
					month: 2,
					day: 3,
					slug: 'sdf',
				}
			];
	}
}
