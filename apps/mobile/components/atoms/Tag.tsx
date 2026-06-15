import { Pressable, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Text }          from './Text'
import { useThemeColors } from '@/hooks/useThemeColors'
import { colors, spacing, corners, typeScale } from '@kore/tokens'
import type { ReactNode } from 'react'

export interface TagProps {
  selected?:    boolean
  dismissible?: boolean
  onPress?:     () => void
  onDismiss?:   () => void
  children:     ReactNode
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const Tag = ({ selected = false, dismissible, onPress, onDismiss, children }: TagProps) => {
  const theme = useThemeColors()
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const bg          = selected ? `${colors.accent}18` : theme.surfaceLow
  const borderColor = selected ? colors.accent        : theme.border
  const textColor   = selected ? colors.accent        : theme.foregroundSecondary

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.95, { damping: 15 }) }}
      onPressOut={() => { scale.value = withSpring(1,    { damping: 15 }) }}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        animatedStyle,
        {
          flexDirection:    'row',
          alignItems:       'center',
          gap:              spacing.xs,
          backgroundColor:  bg,
          borderRadius:     corners.full,
          borderWidth:      1,
          borderColor,
          paddingVertical:  spacing.xs,
          paddingHorizontal: spacing.m,
          minHeight:        36,
        },
      ]}
    >
      <Text
        variant="body-sm"
        color={textColor}
        style={{ fontSize: typeScale.mobile.s }}
      >
        {children}
      </Text>
      {dismissible && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Eliminar"
          hitSlop={8}
        >
          <Text variant="caption" color={textColor}>✕</Text>
        </Pressable>
      )}
    </AnimatedPressable>
  )
}
