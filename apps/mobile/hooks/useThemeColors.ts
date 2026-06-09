import { lightTheme, darkTheme } from '@kore/tokens'
import { useTheme }              from '@/providers/ThemeProvider'

const light = {
  background:          lightTheme.background.surfaceLow,
  backgroundCard:      lightTheme.background.surfaceBright,
  backgroundInput:     lightTheme.background.inputDefault,
  foreground:          lightTheme.foreground.primaryOnSurface,
  foregroundSecondary: lightTheme.foreground.secondaryOnSurface,
  foregroundTertiary:  lightTheme.foreground.tertiaryOnSurface,
  accent:              lightTheme.foreground.accentOnSurface,
  accentDim:           lightTheme.stroke.accentDim,
  border:              lightTheme.stroke.secondaryOnSurface,
  borderStrong:        lightTheme.stroke.primaryOnSurface,
  surfaceLow:          lightTheme.background.surfaceGlass,
  errorBorder:         lightTheme.stroke.error,
  errorFg:             lightTheme.foreground.errorOnSurface,
  errorDim:            lightTheme.background.errorDim,
  successBorder:       lightTheme.stroke.success,
  successFg:           lightTheme.foreground.successOnSurface,
  successDim:          lightTheme.background.successDim,
} as const

const dark = {
  background:          darkTheme.background.surfaceLow,
  backgroundCard:      darkTheme.background.surfaceSolid,
  backgroundInput:     darkTheme.background.inputDefault,
  foreground:          darkTheme.foreground.primaryOnSurface,
  foregroundSecondary: darkTheme.foreground.secondaryOnSurface,
  foregroundTertiary:  darkTheme.foreground.tertiaryOnSurface,
  accent:              darkTheme.foreground.accentOnSurface,
  accentDim:           darkTheme.stroke.accentDim,
  border:              darkTheme.stroke.secondaryOnSurface,
  borderStrong:        darkTheme.stroke.primaryOnSurface,
  surfaceLow:          darkTheme.background.surfaceGlass,
  errorBorder:         darkTheme.stroke.error,
  errorFg:             darkTheme.foreground.errorOnSurface,
  errorDim:            darkTheme.background.errorDim,
  successBorder:       darkTheme.stroke.success,
  successFg:           darkTheme.foreground.successOnSurface,
  successDim:          darkTheme.background.successDim,
} as const

export const useThemeColors = () => {
  const { isDark } = useTheme()
  return isDark ? dark : light
}
