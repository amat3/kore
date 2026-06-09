import { View, Text, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter }    from 'expo-router'
import { useSafeAreaInsets }                  from 'react-native-safe-area-context'
import { useThemeColors }                     from '@/hooks/useThemeColors'
import { colors, spacing, typeScale }         from '@kore/tokens'

export default function WorkoutDetailScreen() {
  const { id }  = useLocalSearchParams<{ id: string }>()
  const router  = useRouter()
  const insets  = useSafeAreaInsets()
  const theme   = useThemeColors()

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}>
        <View style={{ paddingTop: insets.top + spacing.l, paddingHorizontal: spacing.l }}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Volver"
            style={{ marginBottom: spacing.l, minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
          >
            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: typeScale.mobile.m, color: colors.accent }}>
              ← Volver
            </Text>
          </Pressable>
          <Text style={{ fontFamily: 'CormorantGaramond-SemiBold', fontSize: 36, color: theme.foreground }}>
            Detalle workout
          </Text>
          <Text style={{ fontFamily: 'DMSans-Regular', fontSize: typeScale.mobile.s, color: theme.foregroundSecondary, marginTop: spacing.s }}>
            ID: {id} · JUA-70 — en construcción
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
