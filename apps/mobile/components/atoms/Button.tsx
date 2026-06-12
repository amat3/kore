import { Pressable, ActivityIndicator, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Text }         from './Text'
import { colors, spacing, corners, typeScale, letterSpacing, lightTheme } from '@kore/tokens'
import { Fonts } from '@/constants/fonts'
import type { ReactNode } from 'react'

export type ButtonVariant = 'solid' | 'outlined' | 'ghost'
export type ButtonSize    = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps {
  variant?:   ButtonVariant
  size?:      ButtonSize
  loading?:   boolean
  disabled?:  boolean
  uppercase?: boolean
  leftIcon?:  ReactNode
  rightIcon?: ReactNode
  onPress?:   () => void
  children:   ReactNode
  accessibilityLabel?: string
}

const sizeStyles = {
  sm: { paddingVertical: spacing.xs,  paddingHorizontal: spacing.m,   fontSize: typeScale.mobile.s,  minHeight: 36 },
  md: { paddingVertical: spacing.s,   paddingHorizontal: spacing.l,   fontSize: typeScale.mobile.m,  minHeight: 44 },
  lg: { paddingVertical: spacing.m,   paddingHorizontal: spacing.xl,  fontSize: typeScale.mobile.l,  minHeight: 52 },
  xl: { paddingVertical: spacing.m,   paddingHorizontal: spacing['2xl'], fontSize: typeScale.mobile.s, minHeight: 52 },
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const Button = ({
  variant   = 'solid',
  size      = 'md',
  loading   = false,
  disabled  = false,
  uppercase = false,
  leftIcon,
  rightIcon,
  onPress,
  children,
  accessibilityLabel,
}: ButtonProps) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const bg = variant === 'solid'
    ? colors.accent
    : 'transparent'

  const borderColor = variant === 'outlined'
    ? colors.accent
    : 'transparent'

  const textColor = variant === 'solid'
    ? lightTheme.foreground.primaryOnAccent
    : colors.accent

  const sz = sizeStyles[size]

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.97, { damping: 15 }) }}
      onPressOut={() => { scale.value = withSpring(1,    { damping: 15 }) }}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? (typeof children === 'string' ? children : undefined)}
      style={[
        animatedStyle,
        {
          flexDirection:    'row',
          alignItems:       'center',
          justifyContent:   'center',
          gap:              spacing.xs,
          backgroundColor:  bg,
          borderRadius:     corners.full,
          borderWidth:      variant === 'outlined' ? 1 : 0,
          borderColor,
          paddingVertical:  sz.paddingVertical,
          paddingHorizontal: sz.paddingHorizontal,
          minHeight:        sz.minHeight,
          opacity:          disabled ? 0.4 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {leftIcon && <View>{leftIcon}</View>}
          <Text
            variant="body"
            color={textColor}
            style={{
              fontFamily: Fonts.uiSemiBold,
              fontSize:   sz.fontSize,
              ...(uppercase && {
                textTransform: 'uppercase' as const,
                letterSpacing: sz.fontSize * letterSpacing.spacious,
              }),
            }}
          >
            {children}
          </Text>
          {rightIcon && <View>{rightIcon}</View>}
        </>
      )}
    </AnimatedPressable>
  )
}
