import { View }          from 'react-native'
import { Text }          from './Text'
import { lightTheme, darkTheme, spacing, corners, typeScale } from '@kore/tokens'
import { useTheme }      from '@/providers/ThemeProvider'
import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'accent' | 'success' | 'error' | 'warning' | 'solid'
export type BadgeSize    = 'sm' | 'md'

export interface BadgeProps {
  variant?:  BadgeVariant
  size?:     BadgeSize
  icon?:     ReactNode
  children:  ReactNode
}

const variants = (isDark: boolean) => {
  const t = isDark ? darkTheme : lightTheme
  return {
    default: { bg: t.background.surfaceSolid, text: t.foreground.secondaryOnSurface,  border: t.stroke.secondaryOnSurface },
    accent:  { bg: t.background.accentLight,  text: t.foreground.accentDarkOnSurface, border: t.stroke.accentDim },
    success: { bg: t.background.successDim,   text: t.foreground.successOnSurface,    border: 'transparent' },
    error:   { bg: t.background.errorDim,     text: t.foreground.errorOnSurface,      border: 'transparent' },
    // color-mix(in srgb, surfaceSolid, orange 15%) — replica del cálculo de Badge.styles.ts en web
    warning: { bg: isDark ? '#5A4A30' : '#F0DFC2', text: '#92400E', border: 'transparent' },
    solid:   { bg: t.background.accentSolid,  text: t.foreground.primaryOnAccent,     border: 'transparent' },
  } satisfies Record<BadgeVariant, { bg: string; text: string; border: string }>
}

const sizes: Record<BadgeSize, { height: number; paddingHorizontal: number; fontSize: number; gap: number }> = {
  sm: { height: 20, paddingHorizontal: spacing.xs, fontSize: typeScale.mobile['2xs'], gap: spacing['2xs'] },
  md: { height: 24, paddingHorizontal: spacing.s,  fontSize: typeScale.mobile.xs,     gap: spacing['2xs'] },
}

export const Badge = ({ variant = 'default', size = 'md', icon, children }: BadgeProps) => {
  const { isDark } = useTheme()
  const { bg, text, border } = variants(isDark)[variant]
  const { height, paddingHorizontal, fontSize, gap } = sizes[size]

  return (
    <View style={{
      flexDirection:     'row',
      alignSelf:         'flex-start',
      alignItems:        'center',
      justifyContent:    'center',
      gap,
      height,
      paddingHorizontal,
      borderRadius:      corners.full,
      borderWidth:       1,
      borderColor:       border,
      backgroundColor:   bg,
    }}>
      {icon}
      <Text variant="overline" color={text} style={{ fontSize }}>
        {children}
      </Text>
    </View>
  )
}
