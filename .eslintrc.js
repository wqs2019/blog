module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      // '@vue/standard',//这行注释就可以
    //   '@vue/typescript'
    ],
    rules: {
      'no-console': 'off'
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  }