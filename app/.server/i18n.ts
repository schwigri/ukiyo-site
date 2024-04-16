import { Lang, defaultLang } from '~/lib/i18n';
import Gettext from 'gettext.js';
import { readFile } from 'node:fs';

// @ts-expect-error	external module is improperly typed
export const i18nServer = new Gettext();

for (const lang of Object.values(Lang)) {
	readFile(`./app/lib/i18n/translations/${lang}.json`,{ encoding: 'utf-8' }, (err, data) => {
		if (err) {
			throw err;
		} else {
			i18nServer.loadJSON(JSON.parse(data));
		}
	});

}

export function getLangFromUrl(url: URL): Lang {
	for (const lang of Object.values(Lang)) {
		if (lang !== defaultLang && (url.pathname === `/${lang}` || url.pathname.startsWith(`/${lang}/`))) {
			return lang;
		}
	}

	return defaultLang;
}
