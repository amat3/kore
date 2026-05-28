'use client'

import { css } from '@emotion/react'

// ── Tamaños ───────────────────────────────────────────────────────────────
export const sizeStyles = {

  xs: css`
    width:     24px;
    height:    24px;
    font-size: var(--scale-2xs);

    .kore-avatar-dot {
      width:  6px;
      height: 6px;
      border-width: 1px;
    }
  `,

  sm: css`
    width:     32px;
    height:    32px;
    font-size: var(--scale-xs);

    .kore-avatar-dot {
      width:  8px;
      height: 8px;
      border-width: 1.5px;
    }
  `,

  md: css`
    width:     40px;
    height:    40px;
    font-size: var(--scale-s);

    .kore-avatar-dot {
      width:  10px;
      height: 10px;
      border-width: 2px;
    }
  `,

  lg: css`
    width:     56px;
    height:    56px;
    font-size: var(--scale-m);

    .kore-avatar-dot {
      width:  12px;
      height: 12px;
      border-width: 2px;
    }
  `,

  xl: css`
    width:     80px;
    height:    80px;
    font-size: var(--scale-l);

    .kore-avatar-dot {
      width:  14px;
      height: 14px;
      border-width: 2.5px;
    }
  `,

  '2xl': css`
    width:     112px;
    height:    112px;
    font-size: var(--scale-xl);

    .kore-avatar-dot {
      width:  16px;
      height: 16px;
      border-width: 3px;
    }
  `,

} as const

// ── Colores de fallback (iniciales) ───────────────────────────────────────
// Generados desde el nombre — siempre el mismo color para el mismo usuario
export const fallbackColors = [
  { bg: '#B05E3A', text: '#F7F4F1' }, // terracota KORE
  { bg: '#4338CA', text: '#F7F4F1' }, // índigo
  { bg: '#059669', text: '#F7F4F1' }, // esmeralda
  { bg: '#0F766E', text: '#F7F4F1' }, // teal
  { bg: '#7C3AED', text: '#F7F4F1' }, // violeta
  { bg: '#C2410C', text: '#F7F4F1' }, // naranja oscuro
  { bg: '#0369A1', text: '#F7F4F1' }, // azul
  { bg: '#9D174D', text: '#F7F4F1' }, // rosa
] as const

// ── Dot (indicador de estado) ─────────────────────────────────────────────
export const dotColorStyles = {
  online:  css`background-color: var(--background-success-solid);`,
  offline: css`background-color: var(--foreground-tertiary-on-surface);`,
  busy:    css`background-color: var(--background-error-solid);`,
  away:    css`background-color: #F59E0B;`,
} as const

// ── Base ──────────────────────────────────────────────────────────────────
export const baseAvatarStyles = css`
  position:        relative;
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  border-radius:   50%;
  flex-shrink:     0;
  overflow:        hidden;
  user-select:     none;
  font-family:     var(--font-family-ui);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-moderate);
  line-height:     1;

  img {
    width:      100%;
    height:     100%;
    object-fit: cover;
  }
`

export const baseDotStyles = css`
  position:      absolute;
  bottom:        0;
  right:         0;
  border-radius: 50%;
  border-style:  solid;
  border-color:  var(--background-surface-low);
  flex-shrink:   0;
`

export type AvatarSize   = keyof typeof sizeStyles
export type DotStatus    = keyof typeof dotColorStyles
