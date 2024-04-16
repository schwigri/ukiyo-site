/** @type {import('eslint').Linter.Config} */

module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	extends: ['eslint:recommended'],
	ignorePatterns: ['!**/.server', '!**/.client'],
	overrides: [
		// react
		{
			files: ['**/*.{jsx,tsx}'],
			plugins: [
				'plugin:react/recommended',
				'plugin:react/jsx-runtime',
				'plugin:react-hooks/recommended',
				'plugin:jsx-a11y/recommended',
			],
			settings: {
				formComponents: ['Form'],
				'import/resolver': {
					typescript: {},
				},
				linkComponents: [
					{ name: 'Link', linkAttribute: 'to' },
					{ name: 'NavLink', linkAttribute: 'to' },
				],
				react: {
					version: 'detect',
				},
			},
		},

		// typescript
		{
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:import/recommended',
				'plugin:import/typescript',
			],
			files: ['**/*.{ts,tsx}'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint', 'import'],
			settings: {
				'import/internal-regex': '^~/',
				'import/resolver': {
					node: {
						extensions: ['.ts', '.tsx'],
					},
					typescript: {
						alwaysTryTypes: true,
					},
				},
			},
		},

		// node
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.cjs', 'server.js'],
		},
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	root: true,
};
