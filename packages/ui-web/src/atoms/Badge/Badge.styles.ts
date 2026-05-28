'use client'

import { css } from '@emotion/react'

// ── Variantes ─────────────────────────────────────────────────────────────
export const variantStyles = {

  default: css`
    background-color: var(--background-surface-solid);
    color:            var(--foreground-secondary-on-surface);
    border:           1px solid var(--stroke-secondary-on-surface);
  `,

  accent: css`
    background-color: var(--background-accent-light);
    color:            var(--foreground-accent-dark-on-surface);
    border:           1px solid var(--stroke-accent-dim);
  `,

  success: css`
    background-color: var(--background-success-dim);
    color:            var(--foreground-success-on-surface);
    border:           1px solid transparent;
  `,

  error: css`
    background-color: var(--background-error-dim);
    color:            var(--foreground-error-on-surface);
    border:           1px solid transparent;
  `,

  warning: css`
    background-color: color-mix(in srgb, var(--background-surface-solid), orange 15%);
    color:            #92400E;
    border:           1px solid transparent;
  `,

  solid: css`
    background-color: var(--background-accent-solid);
    color:            var(--foreground-primary-on-accent);
    border:           1px solid transparent;
  `,

} as const

// ── Tamaños ───────────────────────────────────────────────────────────────
export const sizeStyles = {

  sm: css`
    height:         20px;
    padding-inline: var(--spacing-xs);
    font-size:      var(--scale-2xs);
    gap:            var(--spacing-2xs);

    svg {
      width:  10px;
      height: 10px;
    }
  `,

  md: css`
    height:         24px;
    padding-inline: var(--spacing-s);
    font-size:      var(--scale-xs);
    gap:            var(--spacing-2xs);

    svg {
      width:  12px;
      height: 12px;
    }
  `,

} as const

// ── Base ──────────────────────────────────────────────────────────────────
export const baseBadgeStyles = css`
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  white-space:     nowrap;
  border-radius:   var(--radius-full);
  font-family:     var(--font-family-ui);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-spacious);
  text-transform:  uppercase;
  line-height:     1;
  flex-shrink:     0;
`

export type BadgeVariant = keyof typeof variantStyles
export type BadgeSize    = keyof typeof sizeStyles
