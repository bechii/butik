module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs', 'dist/'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
    'arrow-parens': [
      'error'
    ],
    'arrow-spacing': [
      'error'
    ],
		'@typescript-eslint/comma-dangle': [
			'error',
			'never'
		],
		'@typescript-eslint/comma-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'@typescript-eslint/explicit-function-return-type': [
			'error', {
				allowExpressions: true
			}
		],
		'@typescript-eslint/explicit-member-accessibility': [
			'error',
			{
				accessibility: 'explicit',
				overrides: {
					constructors: 'off'
				}
			}
		],
		'@typescript-eslint/func-call-spacing': [
			'error',
			'never'
		],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/object-curly-spacing': [
			'error',
			'always'
		],
		'@typescript-eslint/semi': [
			'error'
		],
		'@typescript-eslint/type-annotation-spacing': [
			'error'
		],
		'@typescript-eslint/quotes': [
			'error',
			'single',
			{
				allowTemplateLiterals: true
			}
		]
	}
};
