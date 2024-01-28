import { Params } from '@remix-run/react';

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

export const getLanguageFromParams = (params: Params): keyof typeof languages => {
	if (params.lang && isSupportedLanguage(params.lang)) {
		return params.lang;
	}

	return defaultLanguage;
};

export const translations: Record<keyof typeof languages, Record<string, string>> = {
	de: {
		'Skip to content': '',
	},
	en: {},
	ja: {
		'Skip to content': '内容へ',
	},
};
