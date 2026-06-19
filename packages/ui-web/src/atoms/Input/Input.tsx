'use client'

import { useId }   from 'react'
import styled      from '@emotion/styled'
import Icon        from '../Icon/Icon'
import {
  baseWrapperStyles,
  baseFieldStyles,
  labelStyles,
  helperStyles,
  errorTextStyles,
  successTextStyles,
  stateStyles,
  sizeStyles,
  glassFieldStyles,
  InputState,
  InputSize,
} from './Input.styles'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  state?:        InputState
  size?:         InputSize
  label?:        string
  helperText?:   string
  errorText?:    string
  successText?:  string
  leftIcon?:     React.ReactNode
  rightIcon?:    React.ReactNode
  clearable?:    boolean
  onClear?:      () => void
  fullWidth?:    boolean
  /** Activa superficie glass (backdrop-filter + bordes terracota) */
  glass?:        boolean
}

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
  glass      = false,
  disabled,
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: InputProps) => {
  const autoId      = useId()
  const inputId     = id ?? autoId

  const resolvedState: InputState =
    errorText   ? 'error'   :
    successText ? 'success' :
    disabled    ? 'disabled':
    state       ?? 'default'

  const handleClear = () => {
    const input = document.getElementById(inputId) as HTMLInputElement
    if (input) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 'value'
      )?.set
      nativeInputValueSetter?.call(input, '')
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.focus()
    }
    onClear?.()
  }

  return (
    <WrapperStyled $fullWidth={fullWidth}>

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

      <FieldStyled $state={resolvedState} $size={size} $glass={glass}>

        {leftIcon && (
          <span className="kore-input-icon" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <input
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

        {clearable && (
          <button
            type="button"
            className="kore-input-clear"
            onClick={handleClear}
            aria-label="Limpiar campo"
            tabIndex={-1}
          >
            <Icon name="X" size="xs" color="inherit" />
          </button>
        )}

        {rightIcon && !clearable && (
          <span className="kore-input-icon" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {resolvedState === 'error' && !rightIcon && !clearable && (
          <span className="kore-input-icon" aria-hidden="true"
            style={{ color: 'var(--foreground-error-on-surface)' }}>
            <Icon name="CircleAlert" size="sm" color="inherit" />
          </span>
        )}

        {resolvedState === 'success' && !rightIcon && !clearable && (
          <span className="kore-input-icon" aria-hidden="true"
            style={{ color: 'var(--foreground-success-on-surface)' }}>
            <Icon name="CircleCheck" size="sm" color="inherit" />
          </span>
        )}

      </FieldStyled>

      {errorText && (
        <ErrorTextStyled id={`${inputId}-error`} role="alert">
          <Icon name="CircleAlert" size="xs" color="inherit" />
          {errorText}
        </ErrorTextStyled>
      )}
      {successText && !errorText && (
        <SuccessTextStyled id={`${inputId}-success`}>
          <Icon name="CircleCheck" size="xs" color="inherit" />
          {successText}
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

const FieldStyled = styled.div<{ $state: InputState; $size: InputSize; $glass: boolean }>`
  ${baseFieldStyles}
  ${({ $state }) => stateStyles[$state]}
  ${({ $size  }) => sizeStyles[$size]}
  ${({ $glass }) => $glass && glassFieldStyles}
`

const HelperTextStyled  = styled.p`${helperStyles}`
const ErrorTextStyled   = styled.p`${errorTextStyles}`
const SuccessTextStyled = styled.p`${successTextStyles}`

export default Input
