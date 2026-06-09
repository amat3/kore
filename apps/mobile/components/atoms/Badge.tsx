import { View }        from 'react-native'
import { Text }        from './Text'
import { colors, spacing, corners, typeScale, colorPrimitives } from '@kore/tokens'
import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'accent' | 'success' | 'error' | 'warning'

export interface BadgeProps {
  variant?:  BadgeVariant
  children:  ReactNode
}

const variantMap: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: 'rgba(26,26,26,0.08)',          text: colorPrimitives.neutral[600]   },
  accent:  { bg: `${colors.accent}20`,           text: colors.accent                  },
  success: { bg: `${colors.success}20`,          text: colors.success                 },
  error:   { bg: `${colors.error}20`,            text: colors.error                   },
  warning: { bg: `${colorPrimitives.neutral[400]}30`, text: colorPrimitives.neutral[700] },
}

export const Badge = ({ variant = 'default', children }: BadgeProps) => {
  const { bg, text } = variantMap[variant]
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
