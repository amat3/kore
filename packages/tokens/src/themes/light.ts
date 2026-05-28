/**
 * @kore/tokens — Light Theme
 *
 * Tokens semánticos para modo claro.
 * Consumir estos en componentes, nunca los primitivos directamente.
 */

import { colorPrimitives as c, tints as t } from '../primitives'

export const lightTheme = {

  // ── Backgrounds ─────────────────────────────────────────────
  background: {
    surfaceLow:          c.neutral[50],       // página principal
    surfaceGlass:        t.black[5],
    surfaceSolid:        c.neutral[100],      // cards, secciones
    surfaceBright:       t.white[80],
    surfaceDim:          t.black[10],

    inverseSurface:      c.neutral[700],
    inverseSurfaceAlt:   c.neutral[900],

    accentSolid:         c.terracota[500],
    accentDim:           t.terracota[10],
    accentLight:         c.terracota[50],

    errorSolid:          c.error.main,
    errorDim:            t.error[20],
    successSolid:        c.success.main,
    successDim:          t.success[20],

    scrimHeavy:          t.black[70],
    scrimMid:            t.black[50],
    scrimSoft:           t.black[20],

    headerDefault:       t.white[80],
    barsSolid:           c.neutral[100],
    barsGlass:           t.white[60],

    controlDefault:      t.black[10],
    inputDefault:        t.white[80],

    actionHover:         t.black[10],
    actionPush:          t.black[20],
    actionSelected:      t.terracota[10],
  },

  // ── Foregrounds ──────────────────────────────────────────────
  foreground: {
    primaryOnSurface:    c.neutral[900],
    secondaryOnSurface:  c.neutral[500],
    tertiaryOnSurface:   c.neutral[300],

    primaryOnInverse:    c.neutral[50],
    secondaryOnInverse:  t.white[70],

    primaryOnAccent:     c.neutral[50],
    accentOnSurface:     c.terracota[500],
    accentDarkOnSurface: c.terracota[800],

    errorOnSurface:      c.error.dark,
    successOnSurface:    c.success.dark,
  },

  // ── Strokes ──────────────────────────────────────────────────
  stroke: {
    primaryOnSurface:    t.black[70],
    secondaryOnSurface:  t.black[20],
    tertiaryOnSurface:   t.black[5],

    accent:              c.terracota[500],
    accentDim:           t.terracota[20],
    focus:               c.terracota[500],

    error:               c.error.main,
    success:             c.success.main,
  },

  // ── Gradients ────────────────────────────────────────────────
  gradient: {
    surfaceStart:  'rgba(247, 244, 241, 0)',
    surfaceEnd:    'rgba(247, 244, 241, 0.8)',
    accentStart:   t.terracota[20],
    accentEnd:     t.terracota[80],
  },

} as const

export type LightTheme = typeof lightTheme
