'use client'

import styled from '@emotion/styled'
import {
  baseBadgeStyles,
  variantStyles,
  sizeStyles,
  BadgeVariant,
  BadgeSize,
} from './Badge.styles'

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface BadgeProps {
  variant?:   BadgeVariant
  size?:      BadgeSize
  /** Icono a la izquierda del texto */
  icon?:      React.ReactNode
  children:   React.ReactNode
  className?: string
}

// ── Componente ────────────────────────────────────────────────────────────
const Badge = ({
  variant   = 'default',
  size      = 'md',
  icon,
  children,
  className,
}: BadgeProps) => (
  <BadgeStyled
    $variant={variant}
    $size={size}
    className={className}
  >
    {icon && <span aria-hidden="true">{icon}</span>}
    {children}
  </BadgeStyled>
)

// ── Styled ────────────────────────────────────────────────────────────────
const BadgeStyled = styled.span<{
  $variant: BadgeVariant
  $size:    BadgeSize
}>`
  ${baseBadgeStyles}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size    }) => sizeStyles[$size]}
`

export default Badge
