module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin', // only include this if you're using react-native-reanimated
  ],
};
