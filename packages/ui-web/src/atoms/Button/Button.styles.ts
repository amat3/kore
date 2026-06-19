'use client'

import { css } from '@emotion/react'

// ── Variantes ─────────────────────────────────────────────────────────────
export const variantStyles = {

  solid: css`
    background-color: var(--background-accent-solid);
    color:            var(--foreground-primary-on-accent);
    border:           2px solid transparent;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--background-accent-solid), black 12%);
    }
    &:active:not(:disabled) {
      background-color: color-mix(in srgb, var(--background-accent-solid), black 20%);
    }
  `,

  outlined: css`
    background-color: transparent;
    color:            var(--foreground-accent-on-surface);
    border:           2px solid var(--stroke-accent);

    &:hover:not(:disabled) {
      background-color: var(--background-accent-dim);
    }
    &:active:not(:disabled) {
      background-color: color-mix(in srgb, var(--background-accent-dim), var(--background-accent-solid) 20%);
    }
  `,

  ghost: css`
    background-color: transparent;
    color:            var(--foreground-accent-on-surface);
    border:           2px solid transparent;

    &:hover:not(:disabled) {
      background-color: var(--background-accent-dim);
    }
    &:active:not(:disabled) {
      background-color: color-mix(in srgb, var(--background-accent-dim), var(--background-accent-solid) 15%);
    }
  `,

  glass: css`
    background-color:        var(--background-glass-warm);
    backdrop-filter:         blur(var(--blur-soft));
    -webkit-backdrop-filter: blur(var(--blur-soft));
    border:                  1px solid var(--stroke-glass);
    color:                   var(--foreground-primary-on-surface);
    transition:              background-color 150ms ease, border-color 150ms ease,
                             box-shadow 150ms ease, opacity 150ms ease, transform 150ms ease;

    &:hover:not(:disabled) {
      background-color: var(--background-glass-surface);
      border-color:     var(--stroke-glass-glow);
      box-shadow:       var(--shadow-glass-sm);
    }
    &:active:not(:disabled) {
      background-color: var(--background-glass-warm);
      border-color:     var(--stroke-glass);
      box-shadow:       none;
      transform:        scale(0.98);
    }

    @supports not (backdrop-filter: blur(1px)) {
      background: color-mix(in srgb, var(--background-glass-surface), var(--background-glass-warm) 60%);
    }
  `,

} as const

// ── Tamaños ───────────────────────────────────────────────────────────────
export const sizeStyles = {

  sm: css`
    height:          var(--sizing-xl);       /* 32px */
    padding-inline:  var(--spacing-m);
    font-size:       var(--scale-xs);
    gap:             var(--spacing-2xs);
  `,

  md: css`
    height:          var(--sizing-2xl);      /* 40px */
    padding-inline:  var(--spacing-l);
    font-size:       var(--scale-s);
    gap:             var(--spacing-xs);
  `,

  lg: css`
    height:          var(--sizing-3xl);      /* 48px */
    padding-inline:  var(--spacing-xl);
    font-size:       var(--scale-m);
    gap:             var(--spacing-xs);
  `,

} as const

// ── Base ──────────────────────────────────────────────────────────────────
export const baseButtonStyles = css`
  /* Reset */
  appearance:  none;
  border:      none;
  background:  none;
  cursor:      pointer;
  text-decoration: none;

  /* Layout */
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  white-space:     nowrap;

  /* Forma */
  border-radius:   var(--radius-full);

  /* Tipografía */
  font-family:     var(--font-family-ui);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-spacious);
  text-transform:  uppercase;

  /* Transición */
  transition: background-color 150ms ease, opacity 150ms ease;

  /* Estados */
  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: 3px;
  }

  &:disabled {
    cursor:  not-allowed;
    opacity: 0.4;
  }
`

export type ButtonVariant = keyof typeof variantStyles
export type ButtonSize    = keyof typeof sizeStyles