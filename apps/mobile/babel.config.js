module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root:       ['.'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
        alias:      { '@': '.' },
      },
    ],
    'react-native-reanimated/plugin', // debe ir siempre el último
  ],
}
