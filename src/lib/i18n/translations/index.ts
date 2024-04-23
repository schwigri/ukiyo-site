import { Lang, defaultLang } from '../config';
import type { GetTextTranslations } from 'gettext-parser';
import gettextParser from 'gettext-parser';
import { readFileSync } from 'fs';

export const langNames: Record<Lang, string> = {
	[Lang.English]: 'English',
	[Lang.German]: 'Deutsch',
	[Lang.Japanese]: '日本語',
};

export const langCodes = Object.values(Lang);

export function isLang(lang: string): lang is Lang {
	return (langCodes as string[]).includes(lang);
}

const translations = langCodes.reduce<{ [key in Lang]?: GetTextTranslations }>((map, lang) => {
	const input = readFileSync(`./src/lib/i18n/translations/${lang}.po`, { encoding: 'utf-8' });
	const po = gettextParser.po.parse(input);

	map[lang] = po;

	return map;
}, {});

export function getT(lang: Lang, context?: string) {
	const translationMap = (translations[lang] ?? translations[Lang.English])?.translations[context ?? ''];
	if (!translationMap) {
		throw new Error(`unable to get translation map for lang ${lang}`);
	}

	return function t(str: TemplateStringsArray, ...exprs: string[]): string {
		const strIdPieces: string[] = [];

		for (let i = 0; i < str.length; i++) {
			const expr = i < exprs.length ? `%s` : '';
			strIdPieces.push(`${str[i]}${expr}`);
		}

		const strId = strIdPieces.join('');
		let translatedStr = translationMap[strId]?.msgstr[0] ?? strId;

		for (const expr of exprs) {
			translatedStr = translatedStr.replace('%s', expr);
		}

		return translatedStr;
	}
}

export function getLangFromUrl(url: URL): Lang {
	for (const lang of langCodes) {
		if ((lang !== defaultLang && url.pathname.startsWith(slug(lang))) || url.pathname === `/${lang}.xml` || url.pathname === `/${lang}`) {
			return lang;
		}
	}

	return Lang.English;
}

export function slug(lang: Lang, path = ''): string {
	if (lang === defaultLang) {
		return `/${path}`;
	}

	return `/${lang}/${path}`;
}

// @TODO make this better
const japaneseNumbers = [
	'元',
	'一',
	'二',
	'三',
	'四',
	'五',
	'六',
	'七',
	'八',
	'九',
	'十',
	'十一',
	'十二',
	'十三',
	'十四',
	'十五',
	'十六',
	'十七',
	'十八',
	'十九',
	'二十',
	'二十一',
	'二十二',
	'二十三',
	'二十四',
	'二十五',
	'二十六',
	'二十七',
	'二十八',
	'二十九',
	'三十',
	'三十一',
] as const;

export function getJapaneseNumber(num: number | string): string {
	if (typeof num === 'string') {
		num = parseInt(num);
	}

	const result = japaneseNumbers[num];

	if (!result) {
		throw new Error(`number is not translatable to japanese: ${num}`);
	}

	return result;
}

export function getJapaneseYear(year: number | string): string {
	if (typeof year === 'string') {
		year = parseInt(year);
	}

	const yearsPastReiwa = year - 2018;
	const japaneseNumber = getJapaneseNumber(yearsPastReiwa);

	return `令和${japaneseNumber}`;
}
