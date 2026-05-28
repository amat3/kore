'use client'

/**
 * @kore/ui-web — Avatar
 *
 * Foto de perfil con fallback inteligente a iniciales.
 * El color del fallback es determinista — siempre el mismo para el mismo nombre.
 *
 * @example
 * // Con imagen
 * <Avatar src="/foto.jpg" name="Juan Antonio" size="md" />
 *
 * // Sin imagen → fallback a iniciales
 * <Avatar name="Juan Antonio" size="lg" />
 *
 * // Con indicador de estado
 * <Avatar name="María García" size="md" status="online" />
 *
 * // Grupo de avatares superpuestos
 * <AvatarGroup users={users} max={3} />
 */

import { useState }  from 'react'
import styled        from '@emotion/styled'
import {
  baseAvatarStyles,
  baseDotStyles,
  sizeStyles,
  dotColorStyles,
  fallbackColors,
  AvatarSize,
  DotStatus,
} from './Avatar.styles'

// ── Helpers ───────────────────────────────────────────────────────────────

/** Extrae las iniciales del nombre (máx. 2 letras) */
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/** Genera un índice de color determinista desde el nombre */
const getColorIndex = (name: string): number => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return hash % fallbackColors.length
}

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface AvatarProps {
  /** Nombre del usuario — usado para iniciales y accesibilidad */
  name:         string
  /** URL de la imagen de perfil */
  src?:         string
  size?:        AvatarSize
  /** Indicador de estado online/offline/busy/away */
  status?:      DotStatus
  /** Borde de color alrededor (para avatar destacado) */
  ring?:        boolean
  className?:   string
}

export interface AvatarGroupProps {
  users:      { name: string; src?: string }[]
  /** Máximo de avatares visibles antes del contador */
  max?:       number
  size?:      AvatarSize
  className?: string
}

// ── Componente Avatar ─────────────────────────────────────────────────────
const Avatar = ({
  name,
  src,
  size     = 'md',
  status,
  ring     = false,
  className,
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false)
  const showImage   = src && !imgError
  const initials    = getInitials(name)
  const colorIndex  = getColorIndex(name)
  const { bg, text } = fallbackColors[colorIndex]

  return (
    <AvatarStyled
      $size={size}
      $bg={showImage ? 'transparent' : bg}
      $textColor={text}
      $ring={ring}
      className={className}
      role="img"
      aria-label={name}
      title={name}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}

      {status && (
        <DotStyled
          $status={status}
          className="kore-avatar-dot"
          aria-label={`Estado: ${status}`}
        />
      )}
    </AvatarStyled>
  )
}

// ── Componente AvatarGroup ────────────────────────────────────────────────
export const AvatarGroup = ({
  users,
  max       = 4,
  size      = 'md',
  className,
}: AvatarGroupProps) => {
  const visible  = users.slice(0, max)
  const overflow = users.length - max

  return (
    <AvatarGroupStyled className={className}>
      {visible.map((user, i) => (
        <AvatarGroupItem key={user.name + i} $index={i}>
          <Avatar name={user.name} src={user.src} size={size} />
        </AvatarGroupItem>
      ))}

      {overflow > 0 && (
        <AvatarGroupItem $index={visible.length}>
          <OverflowAvatar $size={size} aria-label={`${overflow} más`} title={`${overflow} más`}>
            <span aria-hidden="true">+{overflow}</span>
          </OverflowAvatar>
        </AvatarGroupItem>
      )}
    </AvatarGroupStyled>
  )
}

// ── Styled components ─────────────────────────────────────────────────────
const AvatarStyled = styled.div<{
  $size:      AvatarSize
  $bg:        string
  $textColor: string
  $ring:      boolean
}>`
  ${baseAvatarStyles}
  ${({ $size }) => sizeStyles[$size]}
  background-color: ${({ $bg }) => $bg};
  color:            ${({ $textColor }) => $textColor};

  ${({ $ring }) => $ring && `
    outline:        3px solid var(--stroke-accent);
    outline-offset: 2px;
  `}
`

const DotStyled = styled.span<{ $status: DotStatus }>`
  ${baseDotStyles}
  ${({ $status }) => dotColorStyles[$status]}
`

const AvatarGroupStyled = styled.div`
  display:     flex;
  align-items: center;
`

const AvatarGroupItem = styled.div<{ $index: number }>`
  margin-left: ${({ $index }) => $index === 0 ? '0' : '-10px'};
  z-index:     ${({ $index }) => 10 - $index};
  position:    relative;

  /* Borde blanco entre avatares superpuestos */
  & > * {
    outline:        2px solid var(--background-surface-low);
    outline-offset: 0;
  }
`

const OverflowAvatar = styled.div<{ $size: AvatarSize }>`
  ${baseAvatarStyles}
  ${({ $size }) => sizeStyles[$size]}
  background-color: var(--background-surface-solid);
  color:            var(--foreground-secondary-on-surface);
  font-size:        var(--scale-xs);
`

export default Avatar
