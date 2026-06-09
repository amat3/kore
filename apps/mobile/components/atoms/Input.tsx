import { View, TextInput, Pressable } from 'react-native'
import { useState }    from 'react'
import { Text }        from './Text'
import { useThemeColors } from '@/hooks/useThemeColors'
import { colors, spacing, corners, typeScale, fontFamily } from '@kore/tokens'
import type { ComponentProps } from 'react'

export interface InputProps extends ComponentProps<typeof TextInput> {
  label?:       string
  helper?:      string
  error?:       string
  clearable?:   boolean
  onClear?:     () => void
}

export const Input = ({
  label,
  helper,
  error,
  clearable,
  onClear,
  value,
  style,
  ...props
}: InputProps) => {
  const theme    = useThemeColors()
  const [focused, setFocused] = useState(false)

  const borderColor = error
    ? colors.error
    : focused
      ? colors.accent
      : theme.border

  return (
    <View style={{ gap: spacing['2xs'] }}>
      {label && (
        <Text variant="caption" color={theme.foregroundSecondary} style={{ fontFamily: fontFamily.ui }}>
          {label}
        </Text>
      )}

      <View style={{
        flexDirection:   'row',
        alignItems:      'center',
        backgroundColor: theme.surfaceLow,
        borderRadius:    corners.m,
        borderWidth:     1,
        borderColor,
        paddingHorizontal: spacing.m,
        minHeight:       48,
      }}>
        <TextInput
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={theme.foregroundTertiary}
          style={[
            {
              flex:        1,
              fontFamily:  fontFamily.ui,
              fontSize:    typeScale.mobile.m,
              color:       theme.foreground,
              paddingVertical: spacing.s,
            },
            style,
          ]}
          aria-invalid={!!error}
          {...props}
        />
        {clearable && value && (
          <Pressable
            onPress={onClear}
            accessibilityRole="button"
            accessibilityLabel="Limpiar campo"
            style={{ padding: spacing.xs, minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text variant="body" color={theme.foregroundTertiary}>✕</Text>
          </Pressable>
        )}
      </View>

      {(error || helper) && (
        <Text
          variant="caption"
          color={error ? colors.error : theme.foregroundTertiary}
        >
          {error ?? helper}
        </Text>
      )}
    </View>
  )
}
