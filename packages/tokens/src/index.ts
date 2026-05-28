/**
 * @kore/tokens — Main Export
 *
 * Web:    import '@kore/tokens/css'          → CSS custom properties
 * Native: import { lightTheme } from '@kore/tokens'  → JS objects
 */

// Primitivos (solo para referencia, no usar en componentes)
export { colorPrimitives, tints } from './primitives'

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
} from './dimension'

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
