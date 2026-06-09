import styled          from '@emotion/native'
import { typeScale, fontFamily, fontWeight, letterSpacing, lineHeight } from '@kore/tokens'
import { useThemeColors } from '@/hooks/useThemeColors'
import type { ComponentProps } from 'react'
import { Text as RNText }      from 'react-native'

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

const variantStyles: Record<TextVariant, object> = {
  display: {
    fontFamily:    fontFamily.display,
    fontSize:      typeScale.mobile['3xl'],
    fontWeight:    fontWeight.semibold,
    lineHeight:    typeScale.mobile['3xl'] * 1.1,
  },
  h1: {
    fontFamily:    fontFamily.display,
    fontSize:      typeScale.mobile['2xl'],
    fontWeight:    fontWeight.semibold,
    lineHeight:    typeScale.mobile['2xl'] * 1.15,
  },
  h2: {
    fontFamily:    fontFamily.display,
    fontSize:      typeScale.mobile.xl,
    fontWeight:    fontWeight.semibold,
    lineHeight:    typeScale.mobile.xl * 1.2,
  },
  h3: {
    fontFamily:    fontFamily.display,
    fontSize:      typeScale.mobile.l,
    fontWeight:    fontWeight.semibold,
    lineHeight:    typeScale.mobile.l * 1.3,
  },
  overline: {
    fontFamily:    fontFamily.ui,
    fontSize:      typeScale.mobile.xs,
    fontWeight:    fontWeight.semibold,
    letterSpacing: letterSpacing.spacious,
    lineHeight:    typeScale.mobile.xs * 1.4,
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily:  fontFamily.ui,
    fontSize:    typeScale.mobile.m,
    fontWeight:  fontWeight.regular,
    lineHeight:  typeScale.mobile.m * 1.6,
  },
  'body-light': {
    fontFamily:  fontFamily.ui,
    fontSize:    typeScale.mobile.m,
    fontWeight:  fontWeight.light,
    lineHeight:  typeScale.mobile.m * 1.6,
  },
  'body-sm': {
    fontFamily:  fontFamily.ui,
    fontSize:    typeScale.mobile.s,
    fontWeight:  fontWeight.regular,
    lineHeight:  typeScale.mobile.s * 1.5,
  },
  caption: {
    fontFamily:  fontFamily.ui,
    fontSize:    typeScale.mobile.xs,
    fontWeight:  fontWeight.regular,
    lineHeight:  typeScale.mobile.xs * 1.4,
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
