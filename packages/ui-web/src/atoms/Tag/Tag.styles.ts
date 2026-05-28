'use client'

import { css } from '@emotion/react'

// ── Variantes ─────────────────────────────────────────────────────────────
export const variantStyles = {

  default: css`
    background-color: var(--background-surface-solid);
    color:            var(--foreground-secondary-on-surface);
    border:           1.5px solid var(--stroke-secondary-on-surface);

    &:hover:not([aria-disabled="true"]) {
      border-color:     var(--stroke-primary-on-surface);
      color:            var(--foreground-primary-on-surface);
    }
    &:active:not([aria-disabled="true"]) {
      background-color: var(--background-action-push);
    }
  `,

  selected: css`
    background-color: var(--background-accent-light);
    color:            var(--foreground-accent-dark-on-surface);
    border:           1.5px solid var(--stroke-accent);

    &:hover:not([aria-disabled="true"]) {
      background-color: color-mix(in srgb, var(--background-accent-light), var(--background-accent-solid) 10%);
    }
    &:active:not([aria-disabled="true"]) {
      background-color: color-mix(in srgb, var(--background-accent-light), var(--background-accent-solid) 20%);
    }
  `,

  solid: css`
    background-color: var(--background-accent-solid);
    color:            var(--foreground-primary-on-accent);
    border:           1.5px solid transparent;

    &:hover:not([aria-disabled="true"]) {
      background-color: color-mix(in srgb, var(--background-accent-solid), black 10%);
    }
    &:active:not([aria-disabled="true"]) {
      background-color: color-mix(in srgb, var(--background-accent-solid), black 20%);
    }
  `,

} as const

// ── Tamaños ───────────────────────────────────────────────────────────────
export const sizeStyles = {

  sm: css`
    height:         24px;
    padding-inline: var(--spacing-xs);
    font-size:      var(--scale-xs);
    gap:            var(--spacing-2xs);
    border-radius:  var(--radius-xs);

    .kore-tag-dismiss {
      width:  14px;
      height: 14px;
    }
  `,

  md: css`
    height:         32px;
    padding-inline: var(--spacing-s);
    font-size:      var(--scale-s);
    gap:            var(--spacing-xs);
    border-radius:  var(--radius-s);

    .kore-tag-dismiss {
      width:  16px;
      height: 16px;
    }
  `,

  lg: css`
    height:         40px;
    padding-inline: var(--spacing-m);
    font-size:      var(--scale-m);
    gap:            var(--spacing-xs);
    border-radius:  var(--radius-m);

    .kore-tag-dismiss {
      width:  18px;
      height: 18px;
    }
  `,

} as const

// ── Base ──────────────────────────────────────────────────────────────────
export const baseTagStyles = css`
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  white-space:     nowrap;
  cursor:          pointer;
  user-select:     none;
  font-family:     var(--font-family-ui);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-spacious);
  text-transform:  uppercase;
  line-height:     1;
  flex-shrink:     0;
  transition:      background-color 150ms ease, border-color 150ms ease,
                   color 150ms ease, opacity 150ms ease;

  /* Focus accesible */
  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: 2px;
  }

  /* Disabled */
  &[aria-disabled="true"] {
    opacity: 0.4;
    cursor:  not-allowed;
  }

  /* Botón de dismiss */
  .kore-tag-dismiss {
    display:         flex;
    align-items:     center;
    justify-content: center;
    flex-shrink:     0;
    border-radius:   50%;
    color:           currentColor;
    opacity:         0.6;
    transition:      opacity 150ms ease, background-color 150ms ease;

    &:hover {
      opacity:          1;
      background-color: color-mix(in srgb, currentColor, transparent 80%);
    }
  }
`

export type TagVariant = keyof typeof variantStyles
export type TagSize    = keyof typeof sizeStyles
