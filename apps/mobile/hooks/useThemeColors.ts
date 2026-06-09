import { colorPrimitives } from '@kore/tokens'
import { useTheme }        from '@/providers/ThemeProvider'

const light = {
  background:          colorPrimitives.neutral[50],
  backgroundCard:      '#FFFFFF',
  backgroundInput:     'rgba(255, 255, 255, 0.8)',
  foreground:          colorPrimitives.neutral[900],
  foregroundSecondary: colorPrimitives.neutral[600],
  foregroundTertiary:  colorPrimitives.neutral[400],
  accent:              colorPrimitives.terracota[500],
  accentDim:           'rgba(176, 94, 58, 0.2)',
  border:              'rgba(26,26,26,0.12)',
  borderStrong:        'rgba(26,26,26,0.5)',
  surfaceLow:          'rgba(26,26,26,0.04)',
  errorDim:            'rgba(217, 95, 95, 0.15)',
  successDim:          'rgba(76, 175, 125, 0.15)',
} as const

const dark = {
  background:          colorPrimitives.neutral[900],
  backgroundCard:      colorPrimitives.neutral[800],
  backgroundInput:     'rgba(255, 255, 255, 0.05)',
  foreground:          colorPrimitives.neutral[50],
  foregroundSecondary: colorPrimitives.neutral[200],
  foregroundTertiary:  colorPrimitives.neutral[400],
  accent:              colorPrimitives.terracota[400],
  accentDim:           'rgba(176, 94, 58, 0.2)',
  border:              'rgba(247,244,241,0.12)',
  borderStrong:        'rgba(247,244,241,0.5)',
  surfaceLow:          'rgba(247,244,241,0.04)',
  errorDim:            'rgba(217, 95, 95, 0.15)',
  successDim:          'rgba(76, 175, 125, 0.15)',
} as const

export const useThemeColors = () => {
  const { isDark } = useTheme()
  return isDark ? dark : light
}
