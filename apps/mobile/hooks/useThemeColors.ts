import { colorPrimitives } from '@kore/tokens'
import { useTheme }        from '@/providers/ThemeProvider'

const light = {
  background:          colorPrimitives.neutral[50],
  backgroundCard:      '#FFFFFF',
  foreground:          colorPrimitives.neutral[900],
  foregroundSecondary: colorPrimitives.neutral[600],
  foregroundTertiary:  colorPrimitives.neutral[400],
  accent:              colorPrimitives.terracota[500],
  border:              'rgba(26,26,26,0.12)',
  surfaceLow:          'rgba(26,26,26,0.04)',
} as const

const dark = {
  background:          colorPrimitives.neutral[900],
  backgroundCard:      colorPrimitives.neutral[800],
  foreground:          colorPrimitives.neutral[50],
  foregroundSecondary: colorPrimitives.neutral[200],
  foregroundTertiary:  colorPrimitives.neutral[400],
  accent:              colorPrimitives.terracota[400],
  border:              'rgba(247,244,241,0.12)',
  surfaceLow:          'rgba(247,244,241,0.04)',
} as const

export const useThemeColors = () => {
  const { isDark } = useTheme()
  return isDark ? dark : light
}
