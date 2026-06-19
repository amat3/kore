/**
 * @kore/tokens — Dark Theme
 *
 * Tokens semánticos para modo oscuro.
 * Misma estructura que lightTheme para intercambiabilidad.
 */

import { colorPrimitives as c, tints as t } from '../primitives'

// Alias locales para legibilidad
const ivory = t.ivory

export const darkTheme = {

  // ── Backgrounds ─────────────────────────────────────────────
  background: {
    surfaceLow:          c.neutral[900],      // página principal
    surfaceGlass:        t.white[5],
    surfaceSolid:        c.neutral[700],      // cards, secciones
    surfaceBright:       t.white[10],
    surfaceDim:          t.black[20],

    inverseSurface:      c.neutral[500],
    inverseSurfaceAlt:   c.neutral[50],

    accentSolid:         c.terracota[500],
    accentDim:           t.terracota[10],
    accentLight:         t.terracota[20],

    errorSolid:          c.error.main,
    errorDim:            t.error[20],
    successSolid:        c.success.main,
    successDim:          t.success[20],

    scrimHeavy:          t.black[80],
    scrimMid:            t.black[60],
    scrimSoft:           t.black[30],

    headerDefault:       t.black[20],
    barsSolid:           c.neutral[700],
    barsGlass:           t.black[10],

    controlDefault:      t.white[10],
    inputDefault:        t.white[5],

    actionHover:         t.white[10],
    actionPush:          t.white[20],
    actionSelected:      t.terracota[10],

    // ── Glass identity ────────────────────────────────────────
    glassSurface:        t.black[50],        // obsidiana translúcida — superficie principal
    glassWarm:           t.terracota[10],    // tinte terracota sobre glass oscuro
  },

  // ── Foregrounds ──────────────────────────────────────────────
  foreground: {
    primaryOnSurface:    c.neutral[50],
    secondaryOnSurface:  c.neutral[300],
    tertiaryOnSurface:   c.neutral[500],

    primaryOnInverse:    c.neutral[900],
    secondaryOnInverse:  t.black[70],

    primaryOnAccent:     c.neutral[50],
    accentOnSurface:     c.terracota[100],
    accentDarkOnSurface: c.terracota[500],

    errorOnSurface:      c.error.light,
    successOnSurface:    c.success.light,
  },

  // ── Strokes ──────────────────────────────────────────────────
  stroke: {
    primaryOnSurface:    t.white[70],
    secondaryOnSurface:  t.white[10],
    tertiaryOnSurface:   t.white[5],

    accent:              c.terracota[500],
    accentDim:           t.terracota[20],
    focus:               c.terracota[100],

    error:               c.error.main,
    success:             c.success.main,

    // ── Glass identity ────────────────────────────────────────
    glass:               t.terracota[25],   // borde glass principal (más visible en dark)
    glassSubtle:         ivory[10],         // borde glass secundario
    glassGlow:           t.terracota[20],   // glow terracota para focus/hover
  },

  // ── Gradients ────────────────────────────────────────────────
  gradient: {
    surfaceStart:  'rgba(26, 26, 26, 0)',
    surfaceEnd:    'rgba(26, 26, 26, 0.8)',
    accentStart:   t.terracota[10],
    accentEnd:     t.terracota[40],
  },

} as const

export type DarkTheme = typeof darkTheme
