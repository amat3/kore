import { Text as RNText }      from 'react-native'
import type { ComponentProps } from 'react'
import { typeScale, letterSpacing } from '@kore/tokens'
import { useThemeColors }           from '@/hooks/useThemeColors'
import { Fonts }                    from '@/constants/fonts'

export type TextVariant =
  | 'display'
  | 'h1' | 'h2' | 'h3'
  | 'overline'
  | 'body' | 'body-light' | 'body-sm'
  | 'caption'

export interface TextProps extends ComponentProps<typeof RNText> {
  variant?: TextVariant
  color?:   string
}

// En RN fontFamily incluye el peso — no se usa fontWeight por separado
const variantStyles: Record<TextVariant, object> = {
  display: {
    fontFamily: Fonts.displaySemiBold,
    fontSize:   typeScale.mobile['3xl'],
    lineHeight: typeScale.mobile['3xl'] * 1.1,
  },
  h1: {
    fontFamily: Fonts.displaySemiBold,
    fontSize:   typeScale.mobile['2xl'],
    lineHeight: typeScale.mobile['2xl'] * 1.15,
  },
  h2: {
    fontFamily: Fonts.displaySemiBold,
    fontSize:   typeScale.mobile.xl,
    lineHeight: typeScale.mobile.xl * 1.2,
  },
  h3: {
    fontFamily: Fonts.displaySemiBold,
    fontSize:   typeScale.mobile.l,
    lineHeight: typeScale.mobile.l * 1.3,
  },
  overline: {
    fontFamily:    Fonts.uiSemiBold,
    fontSize:      typeScale.mobile.xs,
    letterSpacing: typeScale.mobile.xs * letterSpacing.spacious,
    lineHeight:    typeScale.mobile.xs * 1.4,
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: Fonts.uiRegular,
    fontSize:   typeScale.mobile.m,
    lineHeight: typeScale.mobile.m * 1.6,
  },
  'body-light': {
    fontFamily: Fonts.uiLight,
    fontSize:   typeScale.mobile.m,
    lineHeight: typeScale.mobile.m * 1.6,
  },
  'body-sm': {
    fontFamily: Fonts.uiRegular,
    fontSize:   typeScale.mobile.s,
    lineHeight: typeScale.mobile.s * 1.5,
  },
  caption: {
    fontFamily: Fonts.uiRegular,
    fontSize:   typeScale.mobile.xs,
    lineHeight: typeScale.mobile.xs * 1.4,
  },
}

export const Text = ({ variant = 'body', color, style, ...props }: TextProps) => {
  const theme = useThemeColors()
  return (
    <RNText
      style={[
        { color: color ?? theme.foreground },
        variantStyles[variant],
        style,
      ]}
      {...props}
    />
  )
}
