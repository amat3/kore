'use client'

import { css } from '@emotion/react'

// ── Estados del input ─────────────────────────────────────────────────────
export const stateStyles = {

  default: css`
    border-color: var(--stroke-secondary-on-surface);

    &:hover {
      border-color: var(--stroke-primary-on-surface);
    }
    &:focus-within {
      border-color:  var(--stroke-accent);
      box-shadow:    0 0 0 3px var(--stroke-accent-dim);
    }
  `,

  error: css`
    border-color: var(--stroke-error);
    background-color: color-mix(in srgb, var(--background-input-default), var(--background-error-dim) 30%);

    &:hover {
      border-color: var(--foreground-error-on-surface);
    }
    &:focus-within {
      border-color: var(--stroke-error);
      box-shadow:   0 0 0 3px var(--background-error-dim);
    }
  `,

  success: css`
    border-color: var(--stroke-success);
    background-color: color-mix(in srgb, var(--background-input-default), var(--background-success-dim) 30%);

    &:focus-within {
      border-color: var(--stroke-success);
      box-shadow:   0 0 0 3px var(--background-success-dim);
    }
  `,

  disabled: css`
    opacity:        0.5;
    cursor:         not-allowed;
    pointer-events: none;
    border-color:   var(--stroke-secondary-on-surface);
  `,

} as const

// ── Tamaños ───────────────────────────────────────────────────────────────
export const sizeStyles = {

  sm: css`
    height:     var(--sizing-xl);     /* 32px */
    padding-inline: var(--spacing-s);
    font-size:  var(--scale-s);
    gap:        var(--spacing-2xs);

    .kore-input-label {
      font-size: var(--scale-xs);
    }
  `,

  md: css`
    height:     var(--sizing-2xl);    /* 40px */
    padding-inline: var(--spacing-m);
    font-size:  var(--scale-m);
    gap:        var(--spacing-xs);

    .kore-input-label {
      font-size: var(--scale-s);
    }
  `,

  lg: css`
    height:     var(--sizing-3xl);    /* 48px */
    padding-inline: var(--spacing-l);
    font-size:  var(--scale-m);
    gap:        var(--spacing-xs);

    .kore-input-label {
      font-size: var(--scale-m);
    }
  `,

} as const

// ── Wrapper base ──────────────────────────────────────────────────────────
export const baseWrapperStyles = css`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-2xs);
  width:          100%;
`

// ── Field (el input visual) ───────────────────────────────────────────────
export const baseFieldStyles = css`
  display:          flex;
  align-items:      center;
  width:            100%;
  background-color: var(--background-input-default);
  border:           1.5px solid transparent;
  border-radius:    var(--corners-default-field);
  transition:       border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
  overflow:         hidden;

  /* El input nativo dentro */
  input {
    flex:             1;
    min-width:        0;
    background:       transparent;
    border:           none;
    outline:          none;
    color:            var(--foreground-primary-on-surface);
    font-family:      var(--font-family-ui);
    font-weight:      var(--font-weight-regular);
    letter-spacing:   var(--letter-spacing-moderate);
    caret-color:      var(--foreground-accent-on-surface);

    &::placeholder {
      color:   var(--foreground-tertiary-on-surface);
      opacity: 1;
    }

    &:disabled {
      cursor: not-allowed;
    }

    /* Ocultar controles nativos de number */
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      appearance: none;
    }

    /* Estilo del texto seleccionado */
    &::selection {
      background-color: var(--background-accent-dim);
    }
  }

  /* Iconos dentro del field */
  .kore-input-icon {
    display:     flex;
    align-items: center;
    flex-shrink: 0;
    color:       var(--foreground-secondary-on-surface);
    transition:  color 150ms ease;
  }

  &:focus-within .kore-input-icon {
    color: var(--foreground-accent-on-surface);
  }

  /* Botón de limpiar */
  .kore-input-clear {
    display:          flex;
    align-items:      center;
    flex-shrink:      0;
    cursor:           pointer;
    color:            var(--foreground-secondary-on-surface);
    background:       none;
    border:           none;
    padding:          0;
    border-radius:    50%;
    transition:       color 150ms ease, opacity 150ms ease;
    opacity:          0;
    pointer-events:   none;

    &:hover { color: var(--foreground-primary-on-surface); }
  }

  /* Mostrar clear solo cuando hay contenido */
  &:has(input:not(:placeholder-shown)) .kore-input-clear {
    opacity:        1;
    pointer-events: auto;
  }
`

// ── Label ─────────────────────────────────────────────────────────────────
export const labelStyles = css`
  font-family:    var(--font-family-ui);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  color:          var(--foreground-secondary-on-surface);
  transition:     color 150ms ease;
  line-height:    1;
`

// ── Helper / Error text ───────────────────────────────────────────────────
export const helperStyles = css`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-moderate);
  color:       var(--foreground-secondary-on-surface);
`

export const errorTextStyles = css`
  ${helperStyles}
  color: var(--foreground-error-on-surface);
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
`

export const successTextStyles = css`
  ${helperStyles}
  color: var(--foreground-success-on-surface);
`

// ── Glass field overlay ───────────────────────────────────────────────────
// Se aplica sobre cualquier state — modifica background y borde sin romper
// los estados de error/success/disabled.
export const glassFieldStyles = css`
  background-color:        var(--background-glass-surface);
  backdrop-filter:         blur(var(--blur-soft));
  -webkit-backdrop-filter: blur(var(--blur-soft));
  border-color:            var(--stroke-glass-subtle);

  &:hover {
    border-color: var(--stroke-glass);
  }
  &:focus-within {
    border-color: var(--stroke-glass);
    box-shadow:   0 0 0 3px var(--stroke-glass-glow);
  }

  @supports not (backdrop-filter: blur(1px)) {
    background: color-mix(in srgb, var(--background-glass-surface), var(--background-glass-warm) 40%);
  }
`

export type InputState = keyof typeof stateStyles
export type InputSize  = keyof typeof sizeStyles
