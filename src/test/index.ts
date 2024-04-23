describe('Astro testing with Nightwatch', () => {
	it('should render the page in english', (browser) => {
		browser.navigateTo('/');
		browser.assert.titleEquals('Griffen Schwiesow — Designer, front-end developer and language enthusiast');
		browser.assert.attributeEquals('html', 'lang', 'en');
	});

	it('should render the page in german', (browser) => {
		browser.navigateTo('/de/');
		browser.assert.titleEquals('Griffen Schwiesow – Designer, Front-End-Entwickler, Sprachbegeisterter');
		browser.assert.attributeEquals('html', 'lang', 'de');
	});

	it('should render the page in japanese', (browser) => {
		browser.navigateTo('/ja/');
		browser.assert.titleEquals('グリフィン・シュヴィーゾー｜デザイナー・デベロッパー・語学愛好家');
		browser.assert.attributeEquals('html', 'lang', 'ja');
	});

	after((browser) => browser.end());
});
