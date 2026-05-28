'use client'

// ── Tamaños → tokens de dimensión ─────────────────────────────────────────
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const

// ── Colores → CSS vars de @kore/tokens ────────────────────────────────────
export const iconColors = {
  default: 'var(--foreground-primary-on-surface)',
  muted:   'var(--foreground-secondary-on-surface)',
  accent:  'var(--foreground-accent-on-surface)',
  success: 'var(--foreground-success-on-surface)',
  error:   'var(--foreground-error-on-surface)',
  inherit: 'currentColor',
} as const

export type IconSize  = keyof typeof iconSizes
export type IconColor = keyof typeof iconColors
