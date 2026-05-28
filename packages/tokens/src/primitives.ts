/**
 * @kore/tokens — Color Primitives
 *
 * Valores raw de color. NO usar directamente en componentes.
 * Consumir siempre los tokens semánticos (themes/light | themes/dark).
 *
 * Escala: 50 (más claro) → 900 (más oscuro)
 */

export const colorPrimitives = {

  // ── Terracota — acento primario KORE ─────────────────────
  terracota: {
    900: '#4A1E0A',
    800: '#7A3D22',
    700: '#8F4A2A',
    600: '#A05232',
    500: '#B05E3A', // main
    400: '#C47B5A',
    300: '#D99A7E',
    200: '#E8C4AA',
    100: '#F0D9C8', // light
    50:  '#F5EAE0', // xlight
  },

  // ── Neutros cálidos ───────────────────────────────────────
  neutral: {
    950: '#0D0D0D',
    900: '#1A1A1A', // obsidian
    800: '#2D2A28',
    700: '#3D3A38', // grey-dark
    600: '#4F4B48',
    500: '#6B6560', // grey-warm
    400: '#8A8480',
    300: '#C4BDB9', // grey-light
    200: '#D8D3CF',
    100: '#EDE9E4', // grey-ultralight
    50:  '#F7F4F1', // ivory / white
  },

  // ── Auxiliares — Error ────────────────────────────────────
  error: {
    main:  '#D95F5F',
    dark:  '#B02020',
    light: '#F7BEBE',
  },

  // ── Auxiliares — Success ──────────────────────────────────
  success: {
    main:  '#4CAF7D',
    dark:  '#2E7D52',
    light: '#AADFC2',
  },

} as const

// ── Tints (con opacidad) ──────────────────────────────────────────────────
// Usados para overlays, scrims y fondos semitransparentes

export const tints = {

  terracota: {
    80: 'rgba(176, 94, 58, 0.8)',
    40: 'rgba(176, 94, 58, 0.4)',
    20: 'rgba(176, 94, 58, 0.2)',
    10: 'rgba(176, 94, 58, 0.1)',
  },

  black: {
    90: 'rgba(0, 0, 0, 0.9)',
    80: 'rgba(0, 0, 0, 0.8)',
    70: 'rgba(0, 0, 0, 0.7)',
    60: 'rgba(0, 0, 0, 0.6)',
    50: 'rgba(0, 0, 0, 0.5)',
    40: 'rgba(0, 0, 0, 0.4)',
    30: 'rgba(0, 0, 0, 0.3)',
    20: 'rgba(0, 0, 0, 0.2)',
    10: 'rgba(0, 0, 0, 0.1)',
    5:  'rgba(0, 0, 0, 0.05)',
  },

  white: {
    90: 'rgba(255, 255, 255, 0.9)',
    80: 'rgba(255, 255, 255, 0.8)',
    70: 'rgba(255, 255, 255, 0.7)',
    60: 'rgba(255, 255, 255, 0.6)',
    50: 'rgba(255, 255, 255, 0.5)',
    40: 'rgba(255, 255, 255, 0.4)',
    30: 'rgba(255, 255, 255, 0.3)',
    20: 'rgba(255, 255, 255, 0.2)',
    10: 'rgba(255, 255, 255, 0.1)',
    5:  'rgba(255, 255, 255, 0.05)',
  },

  error:   { 20: 'rgba(217, 95, 95, 0.2)' },
  success: { 20: 'rgba(76, 175, 125, 0.2)' },

} as const

export type ColorPrimitives = typeof colorPrimitives
export type Tints = typeof tints
