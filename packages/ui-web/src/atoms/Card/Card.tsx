'use client'

import styled from '@emotion/styled'
import { css } from '@emotion/react'

// ── Estilos base ──────────────────────────────────────────────────────────
const baseStyles = css`
  display:          flex;
  flex-direction:   column;
  border-radius:    var(--corners-default-card);
  overflow:         hidden;
  border:           0.5px solid var(--stroke-secondary-on-surface);
  background:       var(--background-surface-low);
  width:            100%;
  transition:       border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
`

const interactiveStyles = css`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      border-color: var(--stroke-accent);
      transform:    translateY(-2px);
    }
  }

  &:active {
    transform:    scale(0.99);
    border-color: var(--stroke-accent-dim);
  }

  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: 2px;
  }
`

// ── Estilos glass ─────────────────────────────────────────────────────────
const glassStyles = css`
  background:               var(--background-glass-surface);
  backdrop-filter:          blur(var(--blur-medium));
  -webkit-backdrop-filter:  blur(var(--blur-medium));
  border:                   1px solid var(--stroke-glass);
  box-shadow:               var(--shadow-glass-md), var(--shadow-glass-inset);

  @supports not (backdrop-filter: blur(1px)) {
    background: color-mix(in srgb, var(--background-glass-surface), var(--background-glass-warm) 40%);
  }
`

const glassInteractiveStyles = css`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      border-color: var(--stroke-glass-glow);
      box-shadow:   var(--shadow-glass-lg), var(--shadow-glass-inset);
      transform:    translateY(-2px);
    }
  }

  &:active {
    transform:    scale(0.99);
    border-color: var(--stroke-glass);
    box-shadow:   var(--shadow-glass-sm), var(--shadow-glass-inset);
  }

  &:focus-visible {
    outline:        2px solid var(--stroke-glass-glow);
    outline-offset: 2px;
  }
`

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface CardProps {
  children:     React.ReactNode
  /** 'default' sólido · 'glass' blur translúcido con tinte terracota */
  variant?:     'default' | 'glass'
  /** Activa hover, tap feedback y cursor pointer */
  interactive?: boolean
  onClick?:     () => void
  className?:   string
  /** Para accesibilidad — describe el contenido */
  'aria-label'?: string
  role?:         string
}

// ── Componente ────────────────────────────────────────────────────────────
const Card = ({
  children,
  variant = 'default',
  interactive = false,
  onClick,
  className,
  ...ariaProps
}: CardProps) => (
  <CardStyled
    $variant={variant}
    $interactive={interactive || !!onClick}
    onClick={onClick}
    className={className}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={e => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        onClick()
      }
    }}
    {...ariaProps}
  >
    {children}
  </CardStyled>
)

// ── Styled ────────────────────────────────────────────────────────────────
const CardStyled = styled.article<{ $interactive: boolean; $variant: 'default' | 'glass' }>`
  ${baseStyles}
  ${({ $variant }) => $variant === 'glass' && glassStyles}
  ${({ $interactive, $variant }) => $interactive && $variant !== 'glass' && interactiveStyles}
  ${({ $interactive, $variant }) => $interactive && $variant === 'glass' && glassInteractiveStyles}
`

export default Card
