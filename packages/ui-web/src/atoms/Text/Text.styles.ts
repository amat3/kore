/**
 * @kore/ui-web — Text.styles.ts
 *
 * Estilos tipográficos que consumen CSS vars generadas por @kore/tokens.
 * Nunca hardcodear valores aquí — todo viene de kore.css.
 */

import { css } from '@emotion/react'

// ── Estilos base compartidos ──────────────────────────────────────────────
export const baseTextStyles = css`
  margin:  0;
  padding: 0;
  color:   var(--foreground-primary-on-surface);
`

// ── Variantes semánticas → typeRoles de @kore/tokens ─────────────────────
export const variantStyles = {

  display: css`
    font-family:     var(--font-family-display);
    font-weight:     var(--font-weight-light);
    font-size:       var(--scale-5xl);
    line-height:     var(--line-height-very-dense);
    letter-spacing:  var(--letter-spacing-very-dense);
  `,

  h1: css`
    font-family:     var(--font-family-display);
    font-weight:     var(--font-weight-light);
    font-size:       var(--scale-4xl);
    line-height:     var(--line-height-dense);
    letter-spacing:  var(--letter-spacing-dense);
  `,

  h2: css`
    font-family:     var(--font-family-display);
    font-weight:     var(--font-weight-semibold);
    font-size:       var(--scale-3xl);
    line-height:     var(--line-height-dense);
    letter-spacing:  var(--letter-spacing-dense);
  `,

  h3: css`
    font-family:     var(--font-family-display);
    font-weight:     var(--font-weight-semibold);
    font-size:       var(--scale-2xl);
    line-height:     var(--line-height-moderate);
    letter-spacing:  var(--letter-spacing-moderate);
  `,

  overline: css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-semibold);
    font-size:       var(--scale-xs);
    line-height:     var(--line-height-moderate);
    letter-spacing:  var(--letter-spacing-wide);
    text-transform:  uppercase;
    color:           var(--foreground-accent-on-surface);
  `,

  body: css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-regular);
    font-size:       var(--scale-m);
    line-height:     var(--line-height-spacious);
    letter-spacing:  var(--letter-spacing-moderate);
  `,

  'body-sm': css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-regular);
    font-size:       var(--scale-s);
    line-height:     var(--line-height-spacious);
    letter-spacing:  var(--letter-spacing-moderate);
  `,

  caption: css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-light);
    font-size:       var(--scale-xs);
    line-height:     var(--line-height-moderate);
    letter-spacing:  var(--letter-spacing-moderate);
    color:           var(--foreground-secondary-on-surface);
  `,

  button: css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-semibold);
    font-size:       var(--scale-s);
    line-height:     var(--line-height-moderate);
    letter-spacing:  var(--letter-spacing-spacious);
    text-transform:  uppercase;
  `,

} as const

export type TextVariant = keyof typeof variantStyles
