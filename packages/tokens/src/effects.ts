/**
 * @kore/tokens — Effects Tokens
 *
 * Blur scale y glass shadow scale. Invariantes (no dependen del tema).
 * Consumir via CSS vars: var(--blur-medium), var(--shadow-glass-md)
 */

import { colorPrimitives as c, tints as t } from './primitives'

// ── Blur ──────────────────────────────────────────────────────────────────
export const blur = {
  soft:   '4px',
  medium: '12px',
  heavy:  '16px',
  ultra:  '24px',
} as const

// ── Shadows ───────────────────────────────────────────────────────────────
// Glow terracota + borde luminoso marfil para superficies glass
export const shadow = {
  glassSm:    `0 2px 12px ${t.terracota[8]}`,
  glassMd:    `0 4px 24px ${t.terracota[12]}`,
  glassLg:    `0 8px 48px ${t.terracota[18]}`,
  glassInset: `inset 0 1px 0 ${t.ivory[10]}`,
} as const

// ── Brand invariants ─────────────────────────────────────────────────────
// Colores de marca fijos, no dependen del tema. Para componentes de identidad
// (GlassScene, backgrounds de marca) que deben ser consistentes en light/dark.
export const brand = {
  terracota:      c.terracota[500],  // #B05E3A — acento principal
  terracotaLight: c.terracota[300],  // #D99A7E — variante clara
  terracotaDark:  c.terracota[800],  // #7A3D22 — variante oscura
  obsidian:       c.neutral[900],    // #1A1A1A — fondo oscuro
  ivory:          c.neutral[50],     // #F7F4F1 — fondo claro
} as const

export type Blur   = typeof blur
export type Shadow = typeof shadow
export type Brand  = typeof brand
