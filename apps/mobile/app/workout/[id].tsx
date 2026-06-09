import { View, Image, ScrollView, Pressable, Linking, ActivityIndicator } from 'react-native'
import Animated, { FadeInDown }           from 'react-native-reanimated'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets }               from 'react-native-safe-area-context'
import * as LucideIcons                    from 'lucide-react-native'
import styled                              from '@emotion/native'
import { colors, spacing, corners, typeScale } from '@kore/tokens'
import { Fonts }                           from '@/constants/fonts'
import { useThemeColors }                  from '@/hooks/useThemeColors'
import { Text }                            from '@/components/atoms'
import { useWorkoutDetail }                from '@/services/useWorkouts'

const levelLabel: Record<string, string> = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
}

const levelColor: Record<string, string> = {
  beginner:     '#22C55E',
  intermediate: colors.accent,
  advanced:     '#EF4444',
}

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router  = useRouter()
  const insets  = useSafeAreaInsets()
  const theme   = useThemeColors()

  const { workout, loading, notFound } = useWorkoutDetail(id ?? '')

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  if (notFound || !workout) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.background }}>
        <Text variant="body" color={theme.foregroundSecondary}>Entrenamiento no encontrado.</Text>
      </View>
    )
  }

  const handleVideo = () => {
    if (workout.videoUrl) Linking.openURL(workout.videoUrl)
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing['3xl'] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Imagen — 16:9 */}
      <View style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: theme.surfaceLow }}>
        {workout.imageSrc ? (
          <Image
            source={{ uri: workout.imageSrc }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            accessibilityLabel={workout.title}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LucideIcons.Dumbbell size={40} color={theme.foregroundTertiary} />
          </View>
        )}
      </View>

      <ContentPad>
        {/* Volver */}
        <Animated.View entering={FadeInDown.duration(300).delay(0)}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Volver al catálogo"
            style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xl, minHeight: 44 }}
          >
            <LucideIcons.ArrowLeft size={16} color={theme.foregroundSecondary} />
            <BackText $color={theme.foregroundSecondary}>Volver al catálogo</BackText>
          </Pressable>
        </Animated.View>

        {/* Meta chips */}
        <Animated.View entering={FadeInDown.duration(300).delay(60)}>
          <MetaRow>
            <Chip $bg={`${colors.accent}1A`} $border={`${colors.accent}40`}>
              <ChipText $color={colors.accent}>{workout.category}</ChipText>
            </Chip>
            <Chip
              $bg={`${levelColor[workout.level] ?? colors.accent}1A`}
              $border={`${levelColor[workout.level] ?? colors.accent}40`}
            >
              <ChipText $color={levelColor[workout.level] ?? colors.accent}>
                {levelLabel[workout.level] ?? workout.level}
              </ChipText>
            </Chip>
            <Chip $bg={theme.surfaceLow} $border={theme.border}>
              <LucideIcons.Clock size={12} color={theme.foregroundSecondary} />
              <ChipText $color={theme.foregroundSecondary}>{workout.duration} min</ChipText>
            </Chip>
          </MetaRow>
        </Animated.View>

        {/* Título */}
        <Animated.View entering={FadeInDown.duration(300).delay(120)}>
          <Text variant="h1" style={{ marginBottom: spacing.l }}>{workout.title}</Text>
        </Animated.View>

        {/* Descripción */}
        {workout.description && (
          <Animated.View entering={FadeInDown.duration(300).delay(180)}>
            <Text variant="body-light" color={theme.foregroundSecondary} style={{ marginBottom: spacing['2xl'] }}>
              {workout.description}
            </Text>
          </Animated.View>
        )}

        {/* CTA */}
        <Animated.View entering={FadeInDown.duration(300).delay(240)}>
          <CTAButton
            onPress={handleVideo}
            disabled={!workout.videoUrl}
            $accent={colors.accent}
            $disabled={!workout.videoUrl}
            accessibilityRole="button"
            accessibilityLabel="Empezar entrenamiento"
          >
            <LucideIcons.Play size={16} color="#F7F4F1" fill="#F7F4F1" />
            <CTAText>Empezar entrenamiento</CTAText>
          </CTAButton>
        </Animated.View>
      </ContentPad>
    </ScrollView>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const ContentPad = styled.View`
  padding-horizontal: ${spacing.l}px;
  padding-top:        ${spacing.l}px;
`

const BackText = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiSemiBold};
  font-size:   ${typeScale.mobile.s}px;
  color:       ${({ $color }) => $color};
`

const MetaRow = styled.View`
  flex-direction: row;
  align-items:    center;
  flex-wrap:      wrap;
  gap:            ${spacing.s}px;
  margin-bottom:  ${spacing.m}px;
`

const Chip = styled.View<{ $bg: string; $border: string }>`
  flex-direction:     row;
  align-items:        center;
  gap:                ${spacing['2xs']}px;
  padding-vertical:   ${spacing['2xs']}px;
  padding-horizontal: ${spacing.s}px;
  border-radius:      ${corners.xl}px;
  background-color:   ${({ $bg }) => $bg};
  border-width:       0.5px;
  border-color:       ${({ $border }) => $border};
`

const ChipText = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiSemiBold};
  font-size:   ${typeScale.mobile.xs}px;
  color:       ${({ $color }) => $color};
`

const CTAButton = styled.Pressable<{ $accent: string; $disabled: boolean }>`
  flex-direction:   row;
  align-items:      center;
  justify-content:  center;
  gap:              ${spacing.s}px;
  padding-vertical: ${spacing.m}px;
  border-radius:    ${corners.xl}px;
  background-color: ${({ $accent, $disabled }) => $disabled ? '#9CA3AF' : $accent};
  min-height:       52px;
`

const CTAText = styled.Text`
  font-family:    ${Fonts.uiSemiBold};
  font-size:      ${typeScale.mobile.m}px;
  color:          #F7F4F1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`
