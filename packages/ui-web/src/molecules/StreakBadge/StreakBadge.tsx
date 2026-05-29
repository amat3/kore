'use client'

/**
 * @kore/ui-web — StreakBadge
 *
 * Widget de racha de hábitos con contador animado.
 * Variantes: active (llama), inactive (gris), record (dorado).
 *
 * @example
 * <StreakBadge count={7} variant="active" label="días seguidos" />
 * <StreakBadge count={0} variant="inactive" />
 * <StreakBadge count={30} variant="record" label="¡Récord personal!" />
 */

import { useEffect, useRef, useState } from 'react'
import styled                           from '@emotion/styled'
import { keyframes }                    from '@emotion/react'
import Icon                             from '../../atoms/Icon/Icon'

// ── Animaciones ───────────────────────────────────────────────────────────
const pulse = keyframes`
  0%, 100% { transform: scale(1);    }
  50%       { transform: scale(1.15); }
`

const countUp = keyframes`
  from { transform: translateY(6px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
`

// ── Tipos ─────────────────────────────────────────────────────────────────
export type StreakVariant = 'active' | 'inactive' | 'record'

export interface StreakBadgeProps {
  /** Número de días de racha */
  count:      number
  variant?:   StreakVariant
  /** Texto bajo el contador. Por defecto "días" */
  label?:     string
  /** Tamaño del badge */
  size?:      'sm' | 'md' | 'lg'
  className?: string
}

// ── Config por variante ───────────────────────────────────────────────────
const variantConfig: Record<StreakVariant, {
  iconName: 'Flame' | 'Flame' | 'Trophy'
  iconColor: string
  bgColor:   string
  textColor: string
  animated:  boolean
}> = {
  active: {
    iconName:  'Flame',
    iconColor: '#F97316',
    bgColor:   'color-mix(in srgb, #F97316, transparent 85%)',
    textColor: 'var(--foreground-primary-on-surface)',
    animated:  true,
  },
  inactive: {
    iconName:  'Flame',
    iconColor: 'var(--foreground-tertiary-on-surface)',
    bgColor:   'var(--background-surface-solid)',
    textColor: 'var(--foreground-tertiary-on-surface)',
    animated:  false,
  },
  record: {
    iconName:  'Trophy',
    iconColor: '#F59E0B',
    bgColor:   'color-mix(in srgb, #F59E0B, transparent 85%)',
    textColor: 'var(--foreground-primary-on-surface)',
    animated:  true,
  },
}

const sizeConfig = {
  sm: { wrapper: 56, icon: 'sm' as const, countSize: 18, labelSize: 9  },
  md: { wrapper: 72, icon: 'md' as const, countSize: 28, labelSize: 10 },
  lg: { wrapper: 88, icon: 'lg' as const, countSize: 36, labelSize: 11 },
}

// ── Hook: contador animado ────────────────────────────────────────────────
const useAnimatedCount = (target: number, active: boolean) => {
  const [display, setDisplay] = useState(target)
  const prevRef               = useRef(target)

  useEffect(() => {
    if (!active || prevRef.current === target) {
      setDisplay(target)
      return
    }

    const start    = prevRef.current
    const diff     = target - start
    const duration = Math.min(Math.abs(diff) * 40, 800)
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + diff * eased))
      if (progress < 1) requestAnimationFrame(tick)
      else prevRef.current = target
    }

    requestAnimationFrame(tick)
  }, [target, active])

  return display
}

// ── Componente ────────────────────────────────────────────────────────────
const StreakBadge = ({
  count,
  variant   = 'active',
  label     = 'días',
  size      = 'md',
  className,
}: StreakBadgeProps) => {
  const config      = variantConfig[variant]
  const sizeConf    = sizeConfig[size]
  const displayCount = useAnimatedCount(count, config.animated)

  return (
    <Wrapper
      $size={sizeConf.wrapper}
      $bgColor={config.bgColor}
      $animated={config.animated}
      className={className}
      aria-label={`Racha de ${count} ${label}`}
      role="status"
    >
      <IconWrapper $animated={config.animated} $color={config.iconColor}>
        <Icon name={config.iconName} size={sizeConf.icon} color="inherit" />
      </IconWrapper>

      <CountWrapper>
        <Count
          key={displayCount}
          $size={sizeConf.countSize}
          $color={config.textColor}
        >
          {displayCount}
        </Count>
        <Label $size={sizeConf.labelSize} $color={config.textColor}>
          {label}
        </Label>
      </CountWrapper>

    </Wrapper>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Wrapper = styled.div<{
  $size:     number
  $bgColor:  string
  $animated: boolean
}>`
  display:         inline-flex;
  align-items:     center;
  gap:             var(--spacing-xs);
  padding:         var(--spacing-xs) var(--spacing-m);
  border-radius:   var(--radius-full);
  background:      ${({ $bgColor }) => $bgColor};
  border:          1px solid color-mix(in srgb, currentColor, transparent 80%);
  user-select:     none;
`

const IconWrapper = styled.span<{ $animated: boolean; $color: string }>`
  display:    flex;
  align-items: center;
  color:      ${({ $color }) => $color};
  animation:  ${({ $animated }) => $animated
    ? `${pulse} 2s ease-in-out infinite`
    : 'none'
  };
  transform-origin: bottom center;
`

const CountWrapper = styled.div`
  display:        flex;
  flex-direction: column;
  align-items:    center;
  line-height:    1;
  gap:            2px;
`

const Count = styled.span<{ $size: number; $color: string }>`
  font-family:  var(--font-family-display);
  font-size:    ${({ $size }) => $size}px;
  font-weight:  var(--font-weight-semibold);
  color:        ${({ $color }) => $color};
  line-height:  1;
  animation:    ${countUp} 300ms ease-out;
`

const Label = styled.span<{ $size: number; $color: string }>`
  font-family:    var(--font-family-ui);
  font-size:      ${({ $size }) => $size}px;
  font-weight:    var(--font-weight-regular);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
  opacity:        0.7;
`

export default StreakBadge
