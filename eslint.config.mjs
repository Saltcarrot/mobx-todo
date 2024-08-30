import ESLint from '@eslint/js'
import TSLint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import globals from 'globals'

export default TSLint.config({
	ignores: [
		"**/node_modules",
		"**/build",
		"webpack.config.js",
		"babel.config.js"
	],
	extends: [
		ESLint.configs.recommended,
		...TSLint.configs.recommended,
	],
	plugins: {
		'@typescript-eslint': TSLint.plugin,
		react
	},
	languageOptions: {
		globals: {
			...globals.browser,
		},
		parserOptions: {
			...react.configs.flat.recommended.languageOptions.parserOptions,
			tsconfigRootDir: import.meta.dirname,
			parser: TSLint.parser
		},
	},
	rules: {
		...ESLint.configs.recommended.rules,
		...react.configs.flat.recommended.rules,
		"no-undef": [ 0 ],
		"max-len": [ "warn", { "code": 120 } ],
		"no-unused-vars": [ "error", {
			"args": "none",
			"varsIgnorePattern": "^_",
			"destructuredArrayIgnorePattern": "^_",
			"ignoreRestSiblings": true
		} ],
		"no-console": [ "error", { "allow": [ "debug" ] } ],
		"indent": [
			"warn", "tab", {
				"SwitchCase": 1,
				"ObjectExpression": 1,
				"CallExpression": { "arguments": 1 }
			}
		],
		"switch-colon-spacing": [ "warn", { "before": false, "after": true } ],
		"quotes": [ "warn", "single" ],
		"jsx-quotes": [ "warn", "prefer-single" ],
		"semi": [ "warn", "never" ],
		"comma-dangle": [ "warn", "never" ],
		"comma-spacing": [ "warn", { "before": false, "after": true } ],
		"array-bracket-spacing": [ "warn", "always" ],
		"object-curly-spacing": [ "warn", "always" ],
		"key-spacing": [
			"warn",
			{ "beforeColon": false, "afterColon": true }
		],
		"object-curly-newline": [
			"warn", {
				"ObjectPattern": { "multiline": true, "consistent": true },
				"ObjectExpression": { "multiline": true, "consistent": true }
			}
		],
		"react/jsx-curly-spacing": [ 2, {
			when: "always",
			"spacing": { "objectLiterals": "never" },
			children: true
		} ],
		"react/jsx-curly-brace-presence": [ 2, {
			props: "never"
		} ],
		"newline-per-chained-call": [
			"warn", { "ignoreChainWithDepth": 2 }
		],
		"padding-line-between-statements": [
			"warn",
			{ "blankLine": "never", "prev": "empty", "next": "*" },
			// const, let
			{ "blankLine": "always", "prev": "*", "next": "const" },
			{ "blankLine": "always", "prev": "const", "next": "*" },
			{ "blankLine": "any", "prev": "const", "next": "const" },
			{ "blankLine": "always", "prev": "*", "next": "let" },
			{ "blankLine": "always", "prev": "let", "next": "*" },
			{ "blankLine": "any", "prev": "let", "next": "let" },
			// if, while, do, for, try, switch, throw
			{ "blankLine": "always", "prev": "*", "next": "if" },
			{ "blankLine": "always", "prev": "*", "next": "while" },
			{ "blankLine": "always", "prev": "*", "next": "do" },
			{ "blankLine": "always", "prev": "*", "next": "for" },
			{ "blankLine": "always", "prev": "*", "next": "try" },
			{ "blankLine": "always", "prev": "*", "next": "switch" },
			{ "blankLine": "always", "prev": "*", "next": "throw" },
			// function, class, return
			{ "blankLine": "always", "prev": "*", "next": "function" },
			{ "blankLine": "always", "prev": "*", "next": "class" },
			{ "blankLine": "always", "prev": "*", "next": "return" }
		],
		"no-multiple-empty-lines": [
			"warn",
			{ "max": 1, "maxBOF": 0,
				"maxEOF": 0
			}
		],
		"prefer-destructuring": [
			"error", {
				"array": true,
				"object": false
			}, {
				"enforceForRenamedProperties": true
			}
		],
		"react/react-in-jsx-scope": "off"
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
})

// export default [
// 	{
// 		ignores: [
// 			"**/node_modules",
// 			"**/build",
// 			"webpack.config.js",
// 			"babel.config.js"
// 		],
// 	},
// 	...TSLint.configs.recommended,
// 	{
// 		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
// 		languageOptions: {
// 			globals: {
// 				...globals.browser,
// 			},
// 			parserOptions: {
// 				...react.configs.flat.recommended.languageOptions.parserOptions,
// 			},
// 		},
// 		plugins: {
// 			react
// 		},
// 		rules: {
// 			...ESLint.configs.recommended.rules,
// 			...react.configs.flat.recommended.rules,
// 			"max-len": [ "warn", { "code": 120 } ],
// 			"no-unused-vars": [ "error", {
// 				"args": "none",
// 				"varsIgnorePattern": "^_",
// 				"destructuredArrayIgnorePattern": "^_",
// 				"ignoreRestSiblings": true
// 			} ],
// 			"no-console": [ "error", { "allow": [ "debug" ] } ],
// 			"indent": [
// 				"warn", "tab", {
// 					"SwitchCase": 1,
// 					"ObjectExpression": 1,
// 					"CallExpression": { "arguments": 1 }
// 				}
// 			],
// 			"switch-colon-spacing": [ "warn", { "before": false, "after": true } ],
// 			"quotes": [ "warn", "single" ],
// 			"jsx-quotes": [ "warn", "prefer-single" ],
// 			"semi": [ "warn", "never" ],
// 			"comma-dangle": [ "warn", "never" ],
// 			"comma-spacing": [ "warn", { "before": false, "after": true } ],
// 			"array-bracket-spacing": [ "warn", "always" ],
// 			"object-curly-spacing": [ "warn", "always" ],
// 			"key-spacing": [
// 				"warn",
// 				{ "beforeColon": false, "afterColon": true }
// 			],
// 			"object-curly-newline": [
// 				"warn", {
// 					"ObjectPattern": { "multiline": true, "consistent": true },
// 					"ObjectExpression": { "multiline": true, "consistent": true }
// 				}
// 			],
// 			"react/jsx-curly-spacing": [ 2, {
// 				when: "always",
// 				"spacing": { "objectLiterals": "never" },
// 				children: true
// 			} ],
// 			"react/jsx-curly-brace-presence": [ 2, {
// 				props: "never"
// 			} ],
// 			"newline-per-chained-call": [
// 				"warn", { "ignoreChainWithDepth": 2 }
// 			],
// 			"padding-line-between-statements": [
// 				"warn",
// 				{ "blankLine": "never", "prev": "empty", "next": "*" },
// 				// const, let
// 				{ "blankLine": "always", "prev": "*", "next": "const" },
// 				{ "blankLine": "always", "prev": "const", "next": "*" },
// 				{ "blankLine": "any", "prev": "const", "next": "const" },
// 				{ "blankLine": "always", "prev": "*", "next": "let" },
// 				{ "blankLine": "always", "prev": "let", "next": "*" },
// 				{ "blankLine": "any", "prev": "let", "next": "let" },
// 				// if, while, do, for, try, switch, throw
// 				{ "blankLine": "always", "prev": "*", "next": "if" },
// 				{ "blankLine": "always", "prev": "*", "next": "while" },
// 				{ "blankLine": "always", "prev": "*", "next": "do" },
// 				{ "blankLine": "always", "prev": "*", "next": "for" },
// 				{ "blankLine": "always", "prev": "*", "next": "try" },
// 				{ "blankLine": "always", "prev": "*", "next": "switch" },
// 				{ "blankLine": "always", "prev": "*", "next": "throw" },
// 				// function, class, return
// 				{ "blankLine": "always", "prev": "*", "next": "function" },
// 				{ "blankLine": "always", "prev": "*", "next": "class" },
// 				{ "blankLine": "always", "prev": "*", "next": "return" }
// 			],
// 			"no-multiple-empty-lines": [
// 				"warn",
// 				{ "max": 1, "maxBOF": 0,
// 					"maxEOF": 0
// 				}
// 			],
// 			"prefer-destructuring": [
// 				"error", {
// 					"array": true,
// 					"object": false
// 				}, {
// 					"enforceForRenamedProperties": true
// 				}
// 			],
// 			"react/react-in-jsx-scope": "off"
// 		},
// 		settings: {
// 			react: {
// 				version: 'detect'
// 			}
// 		}
// 	}
// ]