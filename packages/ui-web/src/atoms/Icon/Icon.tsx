'use client'

/**
 * @kore/ui-web — Icon
 *
 * Wrapper sobre Lucide React con sizing y colores de @kore/tokens.
 * Misma API que el futuro Icon nativo — solo cambia el import de Lucide.
 *
 * @example
 * // Decorativo (oculto para screen readers)
 * <Icon name="Dumbbell" size="md" aria-hidden />
 *
 * // Semántico (necesita aria-label)
 * <Icon name="Search" size="sm" aria-label="Buscar entrenamientos" />
 *
 * // Heredar color del padre (ideal dentro de Button)
 * <Icon name="ChevronRight" color="inherit" />
 */

import { icons, LucideProps } from 'lucide-react'
import { iconSizes, iconColors, IconSize, IconColor } from './Icon.styles'

// ── Tipos ─────────────────────────────────────────────────────────────────

// Tipo inferido de todos los nombres de Lucide — autocompletado en VS Code
export type IconName = keyof typeof icons

export interface IconProps {
  /** Nombre del icono de Lucide (PascalCase). Ej: "Dumbbell", "ChevronRight" */
  name:          IconName
  size?:         IconSize
  color?:        IconColor
  className?:    string
  /** Requerido si el icono NO es decorativo */
  'aria-label'?: string
  /** Usar cuando el icono es puramente decorativo */
  'aria-hidden'?: boolean | 'true' | 'false'
  strokeWidth?:   number
}

// ── Componente ────────────────────────────────────────────────────────────
const Icon = ({
  name,
  size      = 'md',
  color     = 'inherit',
  className,
  strokeWidth = 1.5,
  ...ariaProps
}: IconProps) => {
  const LucideIcon = icons[name] as React.ComponentType<LucideProps>

  if (!LucideIcon) {
    console.warn(`@kore/ui-web Icon: "${name}" no existe en Lucide.`)
    return null
  }

  const px = iconSizes[size]

  return (
    <LucideIcon
      width={px}
      height={px}
      color={iconColors[color]}
      strokeWidth={strokeWidth}
      className={className}
      style={{ flexShrink: 0, display: 'inline-block' }}
      {...ariaProps}
    />
  )
}

export default Icon
