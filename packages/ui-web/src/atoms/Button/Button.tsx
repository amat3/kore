'use client'

import styled       from '@emotion/styled'
import { Spinner } from '../Spinner/Spinner'
import {
  baseButtonStyles,
  variantStyles,
  sizeStyles,
  ButtonVariant,
  ButtonSize,
} from './Button.styles'

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant
  size?:      ButtonSize
  width?:     'hug' | 'full'
  isLoading?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  /** Solo icono — requiere aria-label obligatorio */
  iconOnly?:  boolean
  /** Renderizar como <a> para links */
  as?:        'button' | 'a'
  href?:      string
}

// ── Componente ────────────────────────────────────────────────────────────
const Button = ({
  variant   = 'solid',
  size      = 'md',
  width     = 'hug',
  isLoading = false,
  leftIcon,
  rightIcon,
  iconOnly  = false,
  disabled,
  children,
  type      = 'button',
  ...props
}: ButtonProps) => {

  const isDisabled = disabled || isLoading

  return (
    <ButtonStyled
      $variant={variant}
      $size={size}
      $width={width}
      $iconOnly={iconOnly}
      disabled={isDisabled}
      type={type}
      aria-busy={isLoading}
      {...props}
    >
      {/* Icono izquierdo — oculto durante loading */}
      {leftIcon && !isLoading && (
        <span aria-hidden="true">{leftIcon}</span>
      )}

      {/* Spinner — reemplaza el contenido durante loading */}
      {isLoading
        ? <Spinner size={size === 'sm' ? 'sm' : 'md'} />
        : !iconOnly && children
      }

      {/* Icono derecho */}
      {rightIcon && !isLoading && (
        <span aria-hidden="true">{rightIcon}</span>
      )}
    </ButtonStyled>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const ButtonStyled = styled.button<{
  $variant:   ButtonVariant
  $size:      ButtonSize
  $width:     'hug' | 'full'
  $iconOnly:  boolean
}>`
  ${baseButtonStyles}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size    }) => sizeStyles[$size]}

  /* Ancho */
  width: ${({ $width }) => $width === 'full' ? '100%' : 'auto'};

  /* Icon only — ratio 1:1, sin padding inline */
  ${({ $iconOnly, $size }) => $iconOnly && `
    padding-inline: 0;
    width: ${
      $size === 'sm' ? 'var(--sizing-xl)'  :
      $size === 'lg' ? 'var(--sizing-3xl)' :
                       'var(--sizing-2xl)'
    };
  `}
`

export default Button