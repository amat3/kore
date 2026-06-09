import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeColors }    from '@/hooks/useThemeColors'
import { spacing }           from '@kore/tokens'

export default function WorkoutsScreen() {
  const insets = useSafeAreaInsets()
  const theme  = useThemeColors()

  return (
    <View style={{
      flex:              1,
      paddingTop:        insets.top + spacing.l,
      paddingHorizontal: spacing.l,
      backgroundColor:   theme.background,
    }}>
      <Text style={{ fontFamily: 'CormorantGaramond-SemiBold', fontSize: 32, color: theme.foreground }}>
        Entrenamientos
      </Text>
      <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14, color: theme.foregroundSecondary, marginTop: spacing.s }}>
        JUA-69 — en construcción
      </Text>
    </View>
  )
}
