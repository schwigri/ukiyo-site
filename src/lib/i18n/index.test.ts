import { describe, expect, it } from 'vitest';
import { getLangFromUrl } from './';

describe('getLangFromUrl()', () => {
	it('should get the language from the url', () => {
		const url = new URL('http://localhost/');
		expect(getLangFromUrl(url)).toBe('en');
		url.pathname = '/de/';
		expect(getLangFromUrl(url)).toBe('de');
		url.pathname = '/ja/';
		expect(getLangFromUrl(url)).toBe('ja');
		url.pathname = '/en/';
		expect(getLangFromUrl(url)).toBe('en');
		url.pathname = '/deasdfasdf';
		expect(getLangFromUrl(url)).toBe('en');
		url.pathname = '/jasdfasdf';
		expect(getLangFromUrl(url)).toBe('en');
	});
});
