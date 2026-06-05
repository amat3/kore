/**
 * @kore/tokens — Typography Tokens
 *
 * Escala tipográfica, familias, pesos y roles semánticos.
 * La escala de tamaños varía por plataforma — el script genera los CSS vars
 * con media queries; en RN se usa la escala mobile directamente.
 */

// ── Familias ──────────────────────────────────────────────────────────────
export const fontFamily = {
  display: '"Cormorant Garamond", Georgia, serif',
  ui:      '"DM Sans", system-ui, sans-serif',
} as const

// ── Pesos ─────────────────────────────────────────────────────────────────
export const fontWeight = {
  light:    300,
  regular:  400,
  semibold: 600,
  bold:     700,
} as const

// ── Espaciado de letras (em) ──────────────────────────────────────────────
export const letterSpacing = {
  veryDense: -0.04, // em
  dense:     -0.02,
  moderate:  0,
  spacious:  0.08,
  wide:      0.14,
} as const

// ── Alturas de línea ──────────────────────────────────────────────────────
export const lineHeight = {
  veryDense: 1,
  dense:     1.2,
  moderate:  1.25,
  spacious:  1.5,
  loose:     1.7,
} as const

// ── Escala de tamaños por plataforma (px) ─────────────────────────────────
export const typeScale = {
  mobile: {
    '2xs': 9,
    xs:    11,
    s:     13,
    m:     16,
    l:     18,
    xl:    20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 36,
    '5xl': 44,
  },
  tablet: {
    '2xs': 10,
    xs:    12,
    s:     14,
    m:     16,
    l:     20,
    xl:    24,
    '2xl': 32,
    '3xl': 44,
    '4xl': 56,
    '5xl': 72,
  },
  desktop: {
    '2xs': 10,
    xs:    12,
    s:     14,
    m:     16,
    l:     20,
    xl:    24,
    '2xl': 32,
    '3xl': 44,
    '4xl': 56,
    '5xl': 72,
  },
  wide: {
    '2xs': 14,
    xs:    16,
    s:     20,
    m:     24,
    l:     32,
    xl:    44,
    '2xl': 40,
    '3xl': 52,
    '4xl': 64,
    '5xl': 80,
  },
} as const

// ── Roles semánticos ──────────────────────────────────────────────────────
// Mapean escala + familia + peso → rol de texto en la UI

export const typeRoles = {
  display: {
    family:        fontFamily.display,
    weight:        fontWeight.light,
    scale:         '5xl' as const,
    lineHeight:    lineHeight.veryDense,
    letterSpacing: letterSpacing.veryDense,
    transform:     'none' as const,
  },
  h1: {
    family:        fontFamily.display,
    weight:        fontWeight.light,
    scale:         '4xl' as const,
    lineHeight:    lineHeight.dense,
    letterSpacing: letterSpacing.dense,
    transform:     'none' as const,
  },
  h2: {
    family:        fontFamily.display,
    weight:        fontWeight.semibold,
    scale:         '3xl' as const,
    lineHeight:    lineHeight.dense,
    letterSpacing: letterSpacing.dense,
    transform:     'none' as const,
  },
  h3: {
    family:        fontFamily.display,
    weight:        fontWeight.semibold,
    scale:         '2xl' as const,
    lineHeight:    lineHeight.moderate,
    letterSpacing: letterSpacing.moderate,
    transform:     'none' as const,
  },
  overline: {
    family:        fontFamily.ui,
    weight:        fontWeight.semibold,
    scale:         'xs' as const,
    lineHeight:    lineHeight.moderate,
    letterSpacing: letterSpacing.wide,
    transform:     'uppercase' as const,
  },
  body: {
    family:        fontFamily.ui,
    weight:        fontWeight.regular,
    scale:         'm' as const,
    lineHeight:    lineHeight.spacious,
    letterSpacing: letterSpacing.moderate,
    transform:     'none' as const,
  },
  bodySmall: {
    family:        fontFamily.ui,
    weight:        fontWeight.regular,
    scale:         's' as const,
    lineHeight:    lineHeight.spacious,
    letterSpacing: letterSpacing.moderate,
    transform:     'none' as const,
  },
  caption: {
    family:        fontFamily.ui,
    weight:        fontWeight.light,
    scale:         'xs' as const,
    lineHeight:    lineHeight.moderate,
    letterSpacing: letterSpacing.moderate,
    transform:     'none' as const,
  },
  button: {
    family:        fontFamily.ui,
    weight:        fontWeight.semibold,
    scale:         's' as const,
    lineHeight:    lineHeight.moderate,
    letterSpacing: letterSpacing.spacious,
    transform:     'uppercase' as const,
  },
} as const

export type FontFamily    = typeof fontFamily
export type FontWeight    = typeof fontWeight
export type TypeScale     = typeof typeScale
export type TypeRoles     = typeof typeRoles
