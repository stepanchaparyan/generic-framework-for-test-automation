module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jquery': true,
        "mocha": true
    },
    'extends': ['eslint:recommended'],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 7,
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
    'plugins': [
        'promise',
        "mocha"
    ],
    'rules': {
        "no-trailing-spaces": 2,
		'no-duplicate-imports': 2,
        'require-await': 2,
        'no-dupe-keys': 2,
        'keyword-spacing': [2, { "overrides": { "if": { "after": true }}}],
        'linebreak-style': [2, 'unix'],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'no-var': 2,
        'no-throw-literal': 1,
        'no-case-declarations': 0,
        'comma-dangle': [2, 'never'],
        'no-console': 1,
        'block-scoped-var': 2,
        'consistent-return': 0,
        'curly': [1, 'all'],
        'default-case': 1,
        'dot-location': [1, 'property'],
        'dot-notation': [1, {'allowKeywords': true}],
        'eqeqeq': 2,
        'no-alert': 1,
        'no-empty-function': 1,
        'no-extend-native': 2,
        'no-iterator': 2,
        'no-labels': 2,
        'no-lone-blocks': 1,
        'no-loop-func': 2,
        'no-magic-numbers': 0,
        'no-multi-spaces': 2,
        'no-param-reassign': 1,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-return-assign': 2,
        'no-sequences': 2,
        'no-unmodified-loop-condition': 1,
        'no-unused-expressions': 1,
        'no-unsafe-finally': 1,
        'no-useless-call': 2,
        'no-self-compare': 2,

        /* Stylistic
        -------------------------------------------------------------*/
        'prefer-template': 1,
        'arrow-spacing': ['error', { 'before': true, 'after': true }],
        'template-curly-spacing': [2, 'never'],

        /* Promises plugin
        -------------------------------------------------------------*/
        'promise/always-return': 0,
        'promise/no-return-wrap': 2,
        'promise/param-names': 2,
        'promise/catch-or-return': 0,
        'promise/no-native': 0,
        'promise/no-nesting': 1,
        'promise/no-promise-in-callback': 1,
        'promise/no-callback-in-promise': 1,
        'promise/avoid-new': 0,
        
        /* Mocha
        -------------------------------------------------------------*/
        "mocha/no-exclusive-tests": 1
    }
};