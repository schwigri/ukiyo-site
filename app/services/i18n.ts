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

export const translations: Record<keyof typeof languages, Record<string, string>> = {
	de: {
		'/about': '/de/ueber-mich',
		'About': 'Über mich',
		'Language options': 'Sprachoptionen',
		'Skip to content': 'Zum Hauptinhalt wechseln',
		'Work': 'Werk',
	},
	en: {},
	ja: {
		'/about': '/ja/自己紹介',
		'About': 'プロフィール',
		'Blog': 'ブログ',
		'Griffen': 'グリフィン',
		'Griffen Schwiesow': 'グリフィン・シュヴィーゾー',
		'Language options': '言語',
		'Main': 'メイン',
		'Skip to content': '内容へ',
		'Work': '作品集',
	},
};
