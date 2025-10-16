module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['boundaries'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Usage of relative parent imports is not allowed.',
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['app/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['screens/*/*/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['entities/*/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['shared/*/*/**'],
          },
        ],
      },
    ],
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: 'app',
            allow: ['pages', 'entities', 'shared'],
          },
          {from: 'pages', allow: ['entities', 'shared']},
          {from: 'entities', allow: ['shared']},
          {from: 'shared', allow: ['shared']},
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {typescript: {}},
    'boundaries/elements': [
      {type: 'app', pattern: 'app/*'},
      {type: 'pages', pattern: 'screens/*'},
      {type: 'entities', pattern: 'entities/*'},
      {type: 'shared', pattern: 'shared/*'},
    ],
  },
};
