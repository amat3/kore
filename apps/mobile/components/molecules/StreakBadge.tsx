import { useEffect, useRef, useState }  from 'react'
import { View }                          from 'react-native'
import Animated, {
  useSharedValue, withRepeat, withSequence, withTiming, useAnimatedStyle,
}                                        from 'react-native-reanimated'
import styled                            from '@emotion/native'
import * as LucideIcons                  from 'lucide-react-native'
import { typeScale, fontFamily, fontWeight, spacing, corners } from '@kore/tokens'

export type StreakVariant = 'active' | 'inactive' | 'record'

export interface StreakBadgeProps {
  count:    number
  variant?: StreakVariant
  label?:   string
  size?:    'sm' | 'md' | 'lg'
}

const variantConfig: Record<StreakVariant, {
  iconColor: string
  bgColor:   string
  textColor: string
  animated:  boolean
  icon:      'Flame' | 'Trophy'
}> = {
  active: {
    iconColor: '#F97316',
    bgColor:   'rgba(249,115,22,0.15)',
    textColor: '#1A1A1A',
    animated:  true,
    icon:      'Flame',
  },
  inactive: {
    iconColor: '#9CA3AF',
    bgColor:   'rgba(156,163,175,0.12)',
    textColor: '#9CA3AF',
    animated:  false,
    icon:      'Flame',
  },
  record: {
    iconColor: '#F59E0B',
    bgColor:   'rgba(245,158,11,0.15)',
    textColor: '#1A1A1A',
    animated:  true,
    icon:      'Trophy',
  },
}

const sizeConfig = {
  sm: { iconSize: 16, countSize: 18, labelSize: 9  },
  md: { iconSize: 20, countSize: 28, labelSize: 10 },
  lg: { iconSize: 24, countSize: 36, labelSize: 11 },
}

const useAnimatedCount = (target: number, active: boolean) => {
  const [display, setDisplay] = useState(target)
  const prevRef               = useRef(target)

  useEffect(() => {
    if (!active || prevRef.current === target) {
      setDisplay(target)
      return
    }
    const start     = prevRef.current
    const diff      = target - start
    const duration  = Math.min(Math.abs(diff) * 40, 800)
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + diff * eased))
      if (progress < 1) requestAnimationFrame(tick)
      else prevRef.current = target
    }
    requestAnimationFrame(tick)
  }, [target, active])

  return display
}

const StreakBadge = ({
  count,
  variant = 'active',
  label   = 'días',
  size    = 'md',
}: StreakBadgeProps) => {
  const config      = variantConfig[variant]
  const sizeConf    = sizeConfig[size]
  const display     = useAnimatedCount(count, config.animated)
  const scaleAnim   = useSharedValue(1)

  useEffect(() => {
    if (config.animated) {
      scaleAnim.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 1000 }),
          withTiming(1,    { duration: 1000 }),
        ),
        -1,
      )
    } else {
      scaleAnim.value = 1
    }
  }, [config.animated, scaleAnim])

  const iconAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }))

  const IconComponent = LucideIcons[config.icon] as React.ComponentType<{ size: number; color: string }>

  return (
    <Wrapper
      $bgColor={config.bgColor}
      accessibilityRole="text"
      accessibilityLabel={`Racha de ${count} ${label}`}
    >
      <Animated.View style={iconAnimStyle}>
        <IconComponent size={sizeConf.iconSize} color={config.iconColor} />
      </Animated.View>

      <View style={{ alignItems: 'center', gap: 2 }}>
        <CountText $size={sizeConf.countSize} $color={config.textColor}>
          {display}
        </CountText>
        <LabelText $size={sizeConf.labelSize} $color={config.textColor}>
          {label}
        </LabelText>
      </View>
    </Wrapper>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const Wrapper = styled.View<{ $bgColor: string }>`
  flex-direction: row;
  align-items:    center;
  gap:            ${spacing.xs}px;
  padding-vertical: ${spacing.xs}px;
  padding-horizontal: ${spacing.m}px;
  border-radius:  ${corners.xl}px;
  background-color: ${({ $bgColor }) => $bgColor};
`

const CountText = styled.Text<{ $size: number; $color: string }>`
  font-family: ${fontFamily.display};
  font-size:   ${({ $size }) => $size}px;
  font-weight: ${fontWeight.semibold};
  color:       ${({ $color }) => $color};
  line-height: ${({ $size }) => $size * 1.1}px;
`

const LabelText = styled.Text<{ $size: number; $color: string }>`
  font-family:    ${fontFamily.ui};
  font-size:      ${({ $size }) => $size}px;
  font-weight:    ${fontWeight.regular};
  letter-spacing: 1px;
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
  opacity:        0.7;
`

export default StreakBadge
