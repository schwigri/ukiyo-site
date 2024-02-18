import { Location, Params } from '@remix-run/react';

export const languages = {
	de: 'Deutsch',
	en: 'English',
	ja: '日本語',
};

export const defaultLanguage: keyof typeof languages = 'en';

export const isSupportedLanguage = (str: string): str is keyof typeof languages => {
	return Object.keys(languages).includes(str);
};

export const translate = (lang: keyof typeof languages = defaultLanguage, str: string): string => {
	const fallback = translations[defaultLanguage][str] ?? str;
	return translations[lang][str] ?? fallback;
};

export const getLanguage = (params: Params, location?: Location): keyof typeof languages => {
	if (params.lang && isSupportedLanguage(params.lang)) {
		return params.lang;
	}

	if (location) {
		for (const language in languages) {
			if (location.pathname.startsWith(`/${language}`)) {
				return isSupportedLanguage(language) ? language : defaultLanguage;
			}
		}
	}

	return defaultLanguage;
};

export const getPageType = (params: Params, location: Location): string | null => {
	const lang = getLanguage(params, location);

	switch (decodeURIComponent(location.pathname)) {
		case translate(lang, '/'):
			return 'home';

		case translate(lang, '/about-me'):
			return 'about';

		case translate(lang, '/work'):
			return 'work';

		case translate(lang, '/blog'):
			return 'blog';

		default:
			return null;
	}
};

export const translations: Record<keyof typeof languages, Record<string, string>> = {
	de: {
		'/about-me': '/de/ueber-mich',
		'/blog': '/de/blog',
		'/work': '/de/werken',
		'About me': 'Über mich',
		'https://www.schwigri.com/': 'https://www.schwigri.com/de/',
		'https://www.schwigri.com/about-me/': 'https://www.schwigri.com/de/ueber-mich/',
		'https://www.schwigri.com/blog/': 'https://www.schwigri.com/de/blog/',
		'https://www.schwigri.com/work/': 'https://www.schwigri.com/de/werken/',
		'Language options': 'Sprachoptionen',
		'Made with 🎔': 'Mit 🎔 gemacht',
		'Not Found': 'Seite nicht gefunden',
		'Skip to content': 'Zum Hauptinhalt wechseln',
		'Work': 'Werken',
		'love': 'Liebe',
	},
	en: {
		'Not Found': 'Page not found',
	},
	ja: {
		'/about-me': '/ja/プロフィール',
		'/blog': '/ja/ブログ',
		'/work': '/ja/作品集',
		'About me': 'プロフィール',
		'Copyright © Griffen Schwiesow': '令和六年 © グリフィン・シュヴィーゾー',
		'https://www.schwigri.com/': 'https://www.schwigri.com/ja/',
		'https://www.schwigri.com/about-me/': 'https://www.schwigri.com/ja/プロフィール/',
		'https://www.schwigri.com/blog/': 'https://www.schwigri.com/ja/ブログ/',
		'https://www.schwigri.com/work/': 'https://www.schwigri.com/ja/作品集/',
		'Blog': 'ブログ',
		'Griffen': 'グリフィン',
		'Griffen Schwiesow': 'グリフィン・シュヴィーゾー',
		'Language options': '言語',
		'Made with 🎔': '🎔を込めてプログラミングを',
		'Main': 'メイン',
		'Not Found': 'お探しのページは見つからない',
		'Skip to content': '内容へ',
		'Work': '作品集',
		'love': '愛',
	},
};
