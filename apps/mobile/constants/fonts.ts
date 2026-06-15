/**
 * Nombres de fuente para React Native.
 *
 * En RN cada peso es una familia separada — no se puede combinar
 * fontFamily + fontWeight como en CSS. Los valores de @kore/tokens
 * son CSS stacks (web-only); aquí se definen los equivalentes nativos.
 */
export const Fonts = {
  // Cormorant Garamond — display serif
  displayLight:          'CormorantGaramond_300Light',
  displayRegular:        'CormorantGaramond_400Regular',
  displaySemiBold:       'CormorantGaramond_600SemiBold',
  displaySemiBoldItalic: 'CormorantGaramond_600SemiBold_Italic',

  // DM Sans — UI sans-serif
  uiLight:         'DMSans_300Light',
  uiRegular:       'DMSans_400Regular',
  uiSemiBold:      'DMSans_600SemiBold',
} as const

export type FontKey = keyof typeof Fonts
