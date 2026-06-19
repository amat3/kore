/**
 * @kore/tokens — Main Export
 *
 * Web:    import '@kore/tokens/css'          → CSS custom properties
 * Native: import { lightTheme } from '@kore/tokens'  → JS objects
 */

// Primitivos (solo para referencia, no usar en componentes)
export { colorPrimitives, tints } from './primitives'

// Convenience aliases para mobile (objetos JS planos)
import { colorPrimitives as _cp } from './primitives'
import { radius as _radius }      from './dimension'

export const colors = {
  accent:     _cp.terracota[500],
  accentDark: _cp.terracota[600],
  accentLight: _cp.terracota[100],
  dark:       _cp.neutral[900],
  light:      _cp.neutral[50],
  error:      _cp.error.main,
  errorDark:  _cp.error.dark,
  success:    _cp.success.main,
} as const

export const corners = _radius

export type Colors  = typeof colors
export type Corners = typeof corners

// Temas semánticos (usar estos en componentes)
export { lightTheme } from './themes/light'
export { darkTheme }  from './themes/dark'

// Dimension
export {
  spacing,
  sizing,
  radius,
  borders,
  breakpoints,
  zIndex,
  containers,
  layout,
} from './dimension'

// Effects (blur scale + glass shadows) — invariantes, no dependen del tema
export { blur, shadow, brand } from './effects'
export type { Blur, Shadow, Brand } from './effects'

// Typography
export {
  fontFamily,
  fontWeight,
  letterSpacing,
  lineHeight,
  typeScale,
  typeRoles,
} from './typography'

// Types
export type { ColorPrimitives, Tints }  from './primitives'
export type { LightTheme }              from './themes/light'
export type { DarkTheme }               from './themes/dark'
export type {
  Spacing,
  Sizing,
  Radius,
  Borders,
  Breakpoints,
}                                       from './dimension'
export type {
  FontFamily,
  FontWeight,
  TypeScale,
  TypeRoles,
}                                       from './typography'

// Tipo unificado de tema (útil para ThemeContext en native)
export type Theme = typeof import('./themes/light').lightTheme
