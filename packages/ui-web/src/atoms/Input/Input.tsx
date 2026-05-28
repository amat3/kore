'use client'

/**
 * @kore/ui-web — Input
 *
 * Campo de texto completo con label, helper, error, iconos y estado de limpieza.
 *
 * @example
 * <Input
 *   label="Email"
 *   placeholder="tu@email.com"
 *   type="email"
 *   leftIcon={<Icon name="Mail" size="sm" />}
 * />
 *
 * <Input
 *   label="Contraseña"
 *   state="error"
 *   errorText="Contraseña incorrecta"
 *   type="password"
 * />
 */

import { useRef, useState, useId }          from 'react'
import styled                                from '@emotion/styled'
import {
  baseWrapperStyles,
  baseFieldStyles,
  labelStyles,
  helperStyles,
  errorTextStyles,
  successTextStyles,
  stateStyles,
  sizeStyles,
  InputState,
  InputSize,
} from './Input.styles'

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Estado visual del input */
  state?:        InputState
  /** Tamaño del input */
  size?:         InputSize
  /** Label accesible sobre el campo */
  label?:        string
  /** Texto de ayuda bajo el campo */
  helperText?:   string
  /** Mensaje de error (activa state="error" automáticamente) */
  errorText?:    string
  /** Mensaje de éxito (activa state="success" automáticamente) */
  successText?:  string
  /** Icono a la izquierda del texto */
  leftIcon?:     React.ReactNode
  /** Icono a la derecha del texto */
  rightIcon?:    React.ReactNode
  /** Botón para limpiar el campo */
  clearable?:    boolean
  /** Callback al limpiar */
  onClear?:      () => void
  /** Ocupa el ancho disponible */
  fullWidth?:    boolean
}

// ── Icono de limpiar ──────────────────────────────────────────────────────
const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Icono de error ────────────────────────────────────────────────────────
const ErrorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

// ── Icono de éxito ────────────────────────────────────────────────────────
const SuccessIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

// ── Componente ────────────────────────────────────────────────────────────
const Input = ({
  state,
  size       = 'md',
  label,
  helperText,
  errorText,
  successText,
  leftIcon,
  rightIcon,
  clearable  = false,
  onClear,
  fullWidth  = true,
  disabled,
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: InputProps) => {
  const autoId       = useId()
  const inputId      = id ?? autoId
  const inputRef     = useRef<HTMLInputElement>(null)

  // Estado derivado — errorText y successText sobrescriben state
  const resolvedState: InputState =
    errorText   ? 'error'   :
    successText ? 'success' :
    disabled    ? 'disabled':
    state       ?? 'default'

  const handleClear = () => {
    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 'value'
      )?.set
      nativeInputValueSetter?.call(inputRef.current, '')
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
      inputRef.current.focus()
    }
    onClear?.()
  }

  return (
    <WrapperStyled $fullWidth={fullWidth}>

      {/* Label ─────────────────────────────────────────────────────── */}
      {label && (
        <LabelStyled
          htmlFor={inputId}
          className="kore-input-label"
          $size={size}
          $state={resolvedState}
        >
          {label}
        </LabelStyled>
      )}

      {/* Field ─────────────────────────────────────────────────────── */}
      <FieldStyled $state={resolvedState} $size={size}>

        {/* Icono izquierdo */}
        {leftIcon && (
          <span className="kore-input-icon" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Input nativo */}
        <input
          ref={inputRef}
          id={inputId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-invalid={resolvedState === 'error'}
          aria-describedby={
            errorText   ? `${inputId}-error`   :
            successText ? `${inputId}-success`  :
            helperText  ? `${inputId}-helper`   :
            undefined
          }
          {...props}
        />

        {/* Botón limpiar */}
        {clearable && (
          <button
            type="button"
            className="kore-input-clear"
            onClick={handleClear}
            aria-label="Limpiar campo"
            tabIndex={-1}
          >
            <ClearIcon />
          </button>
        )}

        {/* Icono derecho — oculto si hay clearable y hay contenido */}
        {rightIcon && !clearable && (
          <span className="kore-input-icon" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Icono de estado inline (error/success en el campo) */}
        {resolvedState === 'error' && !rightIcon && !clearable && (
          <span className="kore-input-icon" aria-hidden="true" style={{ color: 'var(--foreground-error-on-surface)' }}>
            <ErrorIcon />
          </span>
        )}
        {resolvedState === 'success' && !rightIcon && !clearable && (
          <span className="kore-input-icon" aria-hidden="true" style={{ color: 'var(--foreground-success-on-surface)' }}>
            <SuccessIcon />
          </span>
        )}

      </FieldStyled>

      {/* Textos de feedback ─────────────────────────────────────────── */}
      {errorText && (
        <ErrorTextStyled id={`${inputId}-error`} role="alert">
          <ErrorIcon /> {errorText}
        </ErrorTextStyled>
      )}
      {successText && !errorText && (
        <SuccessTextStyled id={`${inputId}-success`}>
          <SuccessIcon /> {successText}
        </SuccessTextStyled>
      )}
      {helperText && !errorText && !successText && (
        <HelperTextStyled id={`${inputId}-helper`}>
          {helperText}
        </HelperTextStyled>
      )}

    </WrapperStyled>
  )
}

// ── Styled components ─────────────────────────────────────────────────────
const WrapperStyled = styled.div<{ $fullWidth: boolean }>`
  ${baseWrapperStyles}
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
`

const LabelStyled = styled.label<{ $size: InputSize; $state: InputState }>`
  ${labelStyles}
  font-size: ${({ $size }) =>
    $size === 'sm' ? 'var(--scale-xs)' :
    $size === 'lg' ? 'var(--scale-m)'  :
                     'var(--scale-s)'
  };
  color: ${({ $state }) =>
    $state === 'error'   ? 'var(--foreground-error-on-surface)'   :
    $state === 'success' ? 'var(--foreground-success-on-surface)'  :
                           'var(--foreground-secondary-on-surface)'
  };
`

const FieldStyled = styled.div<{ $state: InputState; $size: InputSize }>`
  ${baseFieldStyles}
  ${({ $state }) => stateStyles[$state]}
  ${({ $size  }) => sizeStyles[$size]}
`

const HelperTextStyled  = styled.p`${helperStyles}`
const ErrorTextStyled   = styled.p`${errorTextStyles}`
const SuccessTextStyled = styled.p`${successTextStyles}`

export default Input
