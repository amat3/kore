'use client'

/**
 * @kore/ui-web — Card
 *
 * Átomo base para todas las cards del sistema.
 * Proporciona el contenedor, bordes, hover y tap feedback.
 * Consumido por WorkoutCard, RecipeCard, HabitCard...
 *
 * @example
 * // Card estática (solo contenedor)
 * <Card>
 *   <p>Contenido</p>
 * </Card>
 *
 * // Card interactiva (clickable)
 * <Card interactive onClick={() => router.push('/detail')}>
 *   <p>Contenido</p>
 * </Card>
 */

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
  transition:       border-color 200ms ease, transform 200ms ease;
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

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface CardProps {
  children:     React.ReactNode
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
  interactive = false,
  onClick,
  className,
  ...ariaProps
}: CardProps) => (
  <CardStyled
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
const CardStyled = styled.article<{ $interactive: boolean }>`
  ${baseStyles}
  ${({ $interactive }) => $interactive && interactiveStyles}
`

export default Card
