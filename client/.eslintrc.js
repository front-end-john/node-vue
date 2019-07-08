module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        'eol-last': 0,
        'no-console': 'off',
        'no-debugger': 'off',
        'no-tabs': 'off',
        'space-before-function-paren': ['error', 'never'],
        'no-unused-vars': 0,
        indent: ['off', 2],
        'no-multiple-empty-lines': [1, { max: 2 }], //空行最多不能超过2行,
        'no-spaced-func': 0
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}