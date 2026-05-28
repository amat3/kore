'use client'

/**
 * @kore/ui-web — Tag
 *
 * Chip interactivo para filtros, selección múltiple y etiquetas dismissibles.
 * Soporta selección controlada y no controlada.
 *
 * @example
 * // Filtro seleccionable
 * <Tag variant={selected ? 'selected' : 'default'} onClick={toggle}>
 *   Fuerza
 * </Tag>
 *
 * // Tag dismissible
 * <Tag dismissible onDismiss={() => removeTag('yoga')}>
 *   Yoga
 * </Tag>
 *
 * // Grupo de filtros
 * <TagGroup tags={filters} onToggle={handleToggle} />
 */

import styled from '@emotion/styled'
import {
  baseTagStyles,
  variantStyles,
  sizeStyles,
  TagVariant,
  TagSize,
} from './Tag.styles'

// ── Icono X para dismiss ──────────────────────────────────────────────────
const DismissIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="18" y1="6" x2="6"  y2="18" />
    <line x1="6"  y1="6" x2="18" y2="18" />
  </svg>
)

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface TagProps {
  variant?:     TagVariant
  size?:        TagSize
  /** Icono a la izquierda */
  icon?:        React.ReactNode
  children:     React.ReactNode
  /** Muestra botón para eliminar el tag */
  dismissible?: boolean
  /** Callback al pulsar el dismiss */
  onDismiss?:   (e: React.MouseEvent) => void
  /** Callback al pulsar el tag */
  onClick?:     (e: React.MouseEvent) => void
  disabled?:    boolean
  className?:   string
  /** Para accesibilidad — describe la acción del tag */
  'aria-label'?: string
}

// ── TagGroup — utilidad para grupos de filtros ────────────────────────────
export interface TagGroupProps {
  tags:       { id: string; label: string; selected?: boolean; icon?: React.ReactNode }[]
  onToggle?:  (id: string) => void
  size?:      TagSize
  className?: string
}

// ── Componente Tag ────────────────────────────────────────────────────────
const Tag = ({
  variant    = 'default',
  size       = 'md',
  icon,
  children,
  dismissible = false,
  onDismiss,
  onClick,
  disabled   = false,
  className,
  'aria-label': ariaLabel,
}: TagProps) => {
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation() // no activa onClick del tag padre
    onDismiss?.(e)
  }

  return (
    <TagStyled
      $variant={variant}
      $size={size}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      aria-pressed={variant === 'selected' ? true : undefined}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      className={className}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick(e as unknown as React.MouseEvent)
        }
      }}
    >
      {/* Icono izquierdo */}
      {icon && <span aria-hidden="true">{icon}</span>}

      {/* Texto */}
      <span>{children}</span>

      {/* Botón dismiss */}
      {dismissible && (
        <button
          type="button"
          className="kore-tag-dismiss"
          onClick={handleDismiss}
          aria-label={`Eliminar ${typeof children === 'string' ? children : ''}`}
          disabled={disabled}
        >
          <DismissIcon />
        </button>
      )}
    </TagStyled>
  )
}

// ── Componente TagGroup ───────────────────────────────────────────────────
export const TagGroup = ({ tags, onToggle, size = 'md', className }: TagGroupProps) => (
  <TagGroupStyled className={className}>
    {tags.map(tag => (
      <Tag
        key={tag.id}
        variant={tag.selected ? 'selected' : 'default'}
        size={size}
        icon={tag.icon}
        onClick={() => onToggle?.(tag.id)}
        aria-label={`${tag.selected ? 'Quitar filtro' : 'Aplicar filtro'}: ${tag.label}`}
      >
        {tag.label}
      </Tag>
    ))}
  </TagGroupStyled>
)

// ── Styled components ─────────────────────────────────────────────────────
const TagStyled = styled.span<{
  $variant: TagVariant
  $size:    TagSize
}>`
  ${baseTagStyles}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size    }) => sizeStyles[$size]}
`

const TagGroupStyled = styled.div`
  display:   flex;
  flex-wrap: wrap;
  gap:       var(--spacing-xs);
`

export default Tag
