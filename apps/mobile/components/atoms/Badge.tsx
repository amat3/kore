import { View }          from 'react-native'
import { Text }          from './Text'
import { lightTheme, darkTheme, spacing, corners, typeScale } from '@kore/tokens'
import { useTheme }      from '@/providers/ThemeProvider'
import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'accent' | 'success' | 'error' | 'warning'

export interface BadgeProps {
  variant?:  BadgeVariant
  children:  ReactNode
}

const variants = (isDark: boolean) => {
  const t = isDark ? darkTheme : lightTheme
  return {
    default: { bg: t.background.surfaceGlass,  text: t.foreground.secondaryOnSurface },
    accent:  { bg: t.background.accentDim,     text: t.foreground.accentOnSurface    },
    success: { bg: t.background.successDim,    text: t.foreground.successOnSurface   },
    error:   { bg: t.background.errorDim,      text: t.foreground.errorOnSurface     },
    warning: { bg: t.background.controlDefault, text: t.foreground.secondaryOnSurface },
  } satisfies Record<BadgeVariant, { bg: string; text: string }>
}

export const Badge = ({ variant = 'default', children }: BadgeProps) => {
  const { isDark } = useTheme()
  const { bg, text } = variants(isDark)[variant]

  return (
    <View style={{
      alignSelf:         'flex-start',
      backgroundColor:   bg,
      borderRadius:      corners.full,
      paddingVertical:   spacing['2xs'],
      paddingHorizontal: spacing.s,
    }}>
      <Text
        variant="overline"
        color={text}
        style={{ fontSize: typeScale.mobile['2xs'] }}
      >
        {children}
      </Text>
    </View>
  )
}
