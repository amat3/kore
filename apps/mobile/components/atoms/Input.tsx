import { View, TextInput, Pressable } from 'react-native'
import { useState }                   from 'react'
import { Text }                        from './Text'
import { useThemeColors }              from '@/hooks/useThemeColors'
import { colors, spacing, corners, typeScale } from '@kore/tokens'
import { Fonts }                       from '@/constants/fonts'
import * as LucideIcons                from 'lucide-react-native'
import type { ComponentProps, ReactNode } from 'react'

type InputState = 'default' | 'error' | 'success' | 'disabled'

export interface InputProps extends Omit<ComponentProps<typeof TextInput>, 'style'> {
  label?:      string
  helper?:     string
  error?:      string
  success?:    string
  clearable?:  boolean
  onClear?:    () => void
  leftIcon?:   ReactNode
  rightIcon?:  ReactNode
  disabled?:   boolean
}

export const Input = ({
  label,
  helper,
  error,
  success,
  clearable,
  onClear,
  leftIcon,
  rightIcon,
  disabled,
  value,
  ...props
}: InputProps) => {
  const theme    = useThemeColors()
  const [focused, setFocused] = useState(false)

  const state: InputState =
    error    ? 'error'    :
    success  ? 'success'  :
    disabled ? 'disabled' :
               'default'

  const borderColor =
    state === 'error'   ? colors.error    :
    state === 'success' ? colors.success  :
    focused             ? theme.accent    :
                          theme.border

  const ringColor =
    state === 'error'   ? theme.errorDim   :
    state === 'success' ? theme.successDim :
    focused             ? theme.accentDim  :
                          'transparent'

  const bgColor =
    state === 'error'   ? theme.errorDim   :
    state === 'success' ? theme.successDim :
                          theme.backgroundInput

  const showClear = clearable && !!value && state !== 'disabled'

  const iconColor =
    state === 'error'   ? colors.error   :
    state === 'success' ? colors.success :
    focused             ? theme.accent   :
                          theme.foregroundSecondary

  return (
    <View style={{ gap: spacing['2xs'] }}>

      {label && (
        <Text
          variant="caption"
          style={{
            fontFamily:    Fonts.uiSemiBold,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            color:
              state === 'error'   ? colors.error   :
              state === 'success' ? colors.success  :
                                    theme.foregroundSecondary,
          }}
        >
          {label}
        </Text>
      )}

      {/* Glow ring exterior — simula box-shadow de web */}
      <View style={{
        borderRadius: corners.s + 3,
        borderWidth:  3,
        borderColor:  ringColor,
      }}>
        <View style={{
          flexDirection:   'row',
          alignItems:      'center',
          backgroundColor: bgColor,
          borderRadius:    corners.s,
          borderWidth:     1.5,
          borderColor,
          paddingHorizontal: spacing.m,
          minHeight:       44,
          opacity:         state === 'disabled' ? 0.5 : 1,
        }}>

          {leftIcon && (
            <View style={{ marginRight: spacing.xs, opacity: 0.7 }}>
              {leftIcon}
            </View>
          )}

          <TextInput
            value={value}
            editable={state !== 'disabled'}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={theme.foregroundTertiary}
            style={{
              flex:               1,
              fontFamily:         Fonts.uiRegular,
              fontSize:           typeScale.mobile.m,
              color:              theme.foreground,
              paddingVertical:    spacing.s,
              includeFontPadding: false,
            }}
            aria-invalid={state === 'error'}
            {...props}
          />

          {/* Icono de estado en campo (error/success) */}
          {state === 'error' && !rightIcon && !showClear && (
            <LucideIcons.CircleAlert size={16} color={colors.error} style={{ marginLeft: spacing.xs }} />
          )}
          {state === 'success' && !rightIcon && !showClear && (
            <LucideIcons.CircleCheck size={16} color={colors.success} style={{ marginLeft: spacing.xs }} />
          )}

          {showClear && (
            <Pressable
              onPress={onClear}
              accessibilityRole="button"
              accessibilityLabel="Limpiar campo"
              style={{ padding: spacing.xs, minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}
            >
              <LucideIcons.X size={14} color={theme.foregroundTertiary} />
            </Pressable>
          )}

          {rightIcon && !showClear && (
            <View style={{ marginLeft: spacing.xs }}>
              {rightIcon}
            </View>
          )}

        </View>
      </View>

      {/* Texto auxiliar */}
      {error && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing['2xs'] }}>
          <LucideIcons.CircleAlert size={12} color={colors.error} />
          <Text variant="caption" style={{ color: colors.error }}>{error}</Text>
        </View>
      )}
      {success && !error && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing['2xs'] }}>
          <LucideIcons.CircleCheck size={12} color={colors.success} />
          <Text variant="caption" style={{ color: colors.success }}>{success}</Text>
        </View>
      )}
      {helper && !error && !success && (
        <Text variant="caption" color={theme.foregroundTertiary}>{helper}</Text>
      )}

    </View>
  )
}
