import { View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets }     from 'react-native-safe-area-context'
import { useThemeColors }        from '@/hooks/useThemeColors'
import { useAuth }               from '@/providers/AuthProvider'
import { spacing }               from '@kore/tokens'

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const theme  = useThemeColors()
  const { user, logout } = useAuth()

  return (
    <View style={{
      flex:              1,
      paddingTop:        insets.top + spacing.l,
      paddingHorizontal: spacing.l,
      backgroundColor:   theme.background,
    }}>
      <Text style={{ fontFamily: 'CormorantGaramond-SemiBold', fontSize: 32, color: theme.foreground }}>
        Perfil
      </Text>
      <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14, color: theme.foregroundSecondary, marginTop: spacing.s }}>
        {user?.email ?? '—'}
      </Text>
      <Pressable
        onPress={logout}
        accessibilityRole="button"
        accessibilityLabel="Cerrar sesión"
        style={{ marginTop: spacing.xl }}
      >
        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14, color: theme.accent }}>
          Cerrar sesión
        </Text>
      </Pressable>
    </View>
  )
}
