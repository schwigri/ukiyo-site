import type { LoaderFunction, LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { useLoaderData, useLocation, useParams, useRevalidator } from '@remix-run/react';
import de from './translations/de.json';
import en from './translations/en.json';
import ja from './translations/ja.json';
import { useEffect } from 'react';

export enum Lang {
	German = 'de',
	Japanese = 'ja',
	English = 'en',
}

export const defaultLang: Lang = Lang.English;

export const langNames: Record<Lang, string> = {
	[Lang.English]: 'English',
	[Lang.German]: 'Deutsch',
	[Lang.Japanese]: '日本語',
};

export const langCodes = Object.values(Lang);

export function isLang(str: string): str is Lang {
	const lc: string[] = langCodes;
	return lc.includes(str);
}

export function getLangFromPathname(pathname: string): Lang {
	for (const lang of Object.values(Lang)) {
		if (lang !== defaultLang && (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`))) {
			return lang;
		}
	}

	return defaultLang;
}

export function getLangFromLocation<T extends ReturnType<typeof useLocation>>(location: T): Lang {
	for (const lang of Object.values(Lang)) {
		if (lang !== defaultLang && (location.pathname === `/${lang}` || location.pathname.startsWith(`/${lang}/`))) {
			return lang;
		}
	}

	return defaultLang;
}

export function getSlug(lang: Lang, pathname: string): string {
	if (lang === defaultLang) {
		return pathname.slice(1);
	} else {
		return pathname.slice(4);
	}
}

export function createPath(lang: Lang, pathname = ''): string {
	if (lang === defaultLang) {
		return `/${pathname}`;
	}

	return `/${lang}/${pathname}`;
}

export function watchLang(lang: Lang, options?: {
	location?: ReturnType<typeof useLocation>;
	revalidator?: ReturnType<typeof useRevalidator>;
}): void {
	const location = options?.location ?? useLocation();
	const revalidator = options?.revalidator ?? useRevalidator();

	useEffect(() => {
		if (lang !== getLangFromLocation(location) && revalidator.state === 'idle') {
			revalidator.revalidate();
		}
	}, [lang, location, revalidator.state]);
}

export function getMsgidFromStr(lang: Lang, context = '') {
	return function actualGetMsgidFromStr(str: string): string | null {
		const map = getTranslations(lang);

		const match = Object.entries(map).find(([key, val]) => {
			const keyHasContext = context ? key.startsWith(`${context}\x04`) : true;
			const valueMatches = val === str;

			return keyHasContext && valueMatches;
		});

		console.log('match', match);

		if (!match) {
			return null;
		}

		const key = match[0];
		return key.includes('\x04') ? key.split('\x04')[1] : key;
	}
}

function getTranslations(lang: Lang = Lang.English): Record<string, string> {
	let translations = en;

	switch (lang) {
		case Lang.German:
			translations = de;
			break;

		case Lang.Japanese:
			translations = ja;
			break;
	}

	return (translations as unknown) as Record<string, string>;
}

export function t(lang: Lang, context = '') {
	const translations = getTranslations(lang);

	return function actualT(str: TemplateStringsArray, ...exprs: string[]): string {
		const strIdPieces: string[] = [];
		for (let i = 0; i < str.length; i++) {
			const expr = i < exprs.length ? `%s` : '';
			strIdPieces.push(str[i] + expr);
		}
		const strId = `${context ? `${context}\x04` : ''}${strIdPieces.join('')}`;
		let translatedStr = translations[strId] ?? strId;

		for (const expr of exprs) {
			translatedStr = translatedStr.replace('%s', expr);
		}

		return translatedStr;
	}
}

export function jt(lang: Lang, context = '') {
	const translations = getTranslations(lang);

	return function actualJt(str: TemplateStringsArray, ...exprs: React.ReactNode[]): React.ReactNode {
		const strIdPieces: string[] = [];
		for (let i = 0; i < str.length; i++) {
			const expr = i < exprs.length ? `%s` : '';
			strIdPieces.push(str[i] + expr);
		}
		const strId = `${context ? `${context}\x04` : ''}${strIdPieces.join('')}`;
		const translatedStr = translations[strId] ?? strId;

		const strPieces = translatedStr.split('%s');

		const result = Array.from(
			Array(Math.max(strPieces.length, exprs.length)),
			(_, i) => [strPieces[i], exprs[i]]
		).flat().filter((value) => !!value);

		return result;
	}
}

export function c(lang: Lang, context: string): {
	getMsgidFromStr: (str: string) => string | null;
	jt: (str: TemplateStringsArray, ...exprs: React.ReactNode[]) => React.ReactNode;
	t: (str: TemplateStringsArray, ...exprs: string[]) => string;
} {
	return {
		getMsgidFromStr: getMsgidFromStr(lang, context),
		jt: jt(lang, context),
		t: t(lang, context),
	};
}

export function withLang(): Lang {
	const location = useLocation();
	return getLangFromLocation(location);
}
