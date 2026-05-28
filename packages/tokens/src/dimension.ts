/**
 * @kore/tokens — Dimension Tokens
 *
 * Spacing, sizing, corners y breakpoints.
 * En RN usar directamente como números, en web el script genera CSS vars.
 */

// ── Spacing ───────────────────────────────────────────────────────────────
export const spacing = {
  '3xs':  2,
  '2xs':  4,
  xs:     8,
  s:      12,
  m:      16,
  l:      24,
  xl:     32,
  '2xl':  40,
  '3xl':  56,
  '4xl':  64,
  '5xl':  72,
  '6xl':  80,
} as const

// ── Sizing (alturas de controles, avatares, iconos) ───────────────────────
export const sizing = {
  s:    12,
  m:    16,
  l:    20,   // control xsmall
  xl:   32,   // control small
  '2xl': 40,  // control mid
  '3xl': 48,  // control big
  '4xl': 56,
  '5xl': 72,
  '6xl': 96,
  '7xl': 120,
} as const

// ── Border radius ─────────────────────────────────────────────────────────
export const radius = {
  none:     0,
  xs:       4,   // default, borders sutiles
  s:        8,
  m:        12,  // inputs, campos
  l:        16,
  xl:       20,  // cards
  '2xl':    24,
  full:     9999, // pill, circular
} as const

// ── Borders ───────────────────────────────────────────────────────────────
export const borders = {
  thin:  1,
  thick: 2,
  block: 4,
} as const

// ── Breakpoints (en px) ───────────────────────────────────────────────────
export const breakpoints = {
  mobile:  0,
  tablet:  600,
  desktop: 1200,
  wide:    1800,
} as const

// ── Z-index ───────────────────────────────────────────────────────────────
export const zIndex = {
  base:    0,
  raised:  10,
  overlay: 100,
  modal:   200,
  toast:   300,
  tooltip: 400,
} as const

// ── Layout containers (max-width por contexto) ────────────────────────────
export const containers = {
  s:   480,
  m:   640,
  l:   960,
  xl:  1200,
  '2xl': 1400,
} as const

export type Spacing   = typeof spacing
export type Sizing    = typeof sizing
export type Radius    = typeof radius
export type Borders   = typeof borders
export type Breakpoints = typeof breakpoints
