import { View, Image, ScrollView, Pressable, Linking, ActivityIndicator } from 'react-native'
import Animated, { FadeInDown }           from 'react-native-reanimated'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets }               from 'react-native-safe-area-context'
import * as LucideIcons                    from 'lucide-react-native'
import styled                              from '@emotion/native'
import { colors, spacing, corners, sizing, layout, typeScale, letterSpacing, lightTheme, colorPrimitives } from '@kore/tokens'
import { Fonts }                           from '@/constants/fonts'
import { useThemeColors }                  from '@/hooks/useThemeColors'
import { useFavorites }                    from '@/hooks/useFavorites'
import { Text, Badge }                     from '@/components/atoms'
import type { BadgeVariant }               from '@/components/atoms'
import { useWorkoutDetail }                from '@/services/useWorkouts'

const levelLabel: Record<string, string> = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
}

const levelVariant: Record<string, BadgeVariant> = {
  beginner:     'default',
  intermediate: 'accent',
  advanced:     'error',
}

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router  = useRouter()
  const insets  = useSafeAreaInsets()
  const theme   = useThemeColors()

  const { favorites, toggleFavorite } = useFavorites()
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

  const isFavorite = favorites.includes(workout.id)
  const handleVideo = () => {
    if (workout.videoUrl) Linking.openURL(workout.videoUrl)
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingTop:        insets.top + spacing.l,
        paddingBottom:     insets.bottom + spacing['3xl'],
        paddingHorizontal: layout.mobile.gutter,
      }}
      showsVerticalScrollIndicator={false}
    >
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

      {/* Imagen — 16:9 */}
      <Animated.View entering={FadeInDown.duration(300).delay(60)}>
        <View style={{
          width:           '100%',
          aspectRatio:     16 / 9,
          borderRadius:    corners.xl,
          overflow:        'hidden',
          marginBottom:    spacing.xl,
          backgroundColor: theme.surfaceLow,
        }}>
          {workout.imageSrc ? (
            <Image
              source={{ uri: workout.imageSrc }}
              style={{ width: '100%', height: '100%', borderRadius: corners.xl }}
              resizeMode="cover"
              accessibilityLabel={workout.title}
            />
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <LucideIcons.Dumbbell size={40} color={theme.foregroundTertiary} />
            </View>
          )}
        </View>
      </Animated.View>

      {/* Meta */}
      <Animated.View entering={FadeInDown.duration(300).delay(120)}>
        <MetaRow>
          <Badge variant="accent">{workout.category}</Badge>
          <Badge variant={levelVariant[workout.level] ?? 'default'}>
            {levelLabel[workout.level] ?? workout.level}
          </Badge>
          <MetaChip>
            <LucideIcons.Clock size={12} color={theme.foregroundSecondary} />
            <ChipText $color={theme.foregroundSecondary}>{workout.duration} min</ChipText>
          </MetaChip>
        </MetaRow>
      </Animated.View>

      {/* Título + favorito */}
      <Animated.View entering={FadeInDown.duration(300).delay(180)}>
        <TitleRow>
          <Text variant="h1" style={{ flex: 1 }}>{workout.title}</Text>
          <FavoriteBtn
            onPress={() => toggleFavorite(workout.id)}
            $bg={isFavorite ? colors.accent : theme.backgroundSolid}
            $border={isFavorite ? lightTheme.stroke.accent : theme.border}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            hitSlop={8}
          >
            <LucideIcons.Heart
              size={20}
              color={isFavorite ? lightTheme.foreground.primaryOnAccent : theme.foregroundSecondary}
              fill={isFavorite ? lightTheme.foreground.primaryOnAccent : 'none'}
            />
          </FavoriteBtn>
        </TitleRow>
      </Animated.View>

      {/* Descripción */}
      {workout.description && (
        <Animated.View entering={FadeInDown.duration(300).delay(240)}>
          <Text variant="body-light" color={theme.foregroundSecondary} style={{ marginBottom: spacing['2xl'], lineHeight: typeScale.mobile.m * 1.5 }}>
            {workout.description}
          </Text>
        </Animated.View>
      )}

      {/* CTA */}
      <Animated.View entering={FadeInDown.duration(300).delay(300)}>
        <CTAButton
          onPress={handleVideo}
          disabled={!workout.videoUrl}
          $accent={colors.accent}
          $disabled={!workout.videoUrl}
          accessibilityRole="button"
          accessibilityLabel="Empezar entrenamiento"
        >
          <LucideIcons.Play size={16} color={lightTheme.foreground.primaryOnAccent} fill={lightTheme.foreground.primaryOnAccent} />
          <CTAText>Empezar entrenamiento</CTAText>
        </CTAButton>
      </Animated.View>
    </ScrollView>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
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

const MetaChip = styled.View`
  flex-direction: row;
  align-items:    center;
  gap:            ${spacing['2xs']}px;
`

const ChipText = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiSemiBold};
  font-size:   ${typeScale.mobile.xs}px;
  color:       ${({ $color }) => $color};
`

const TitleRow = styled.View`
  flex-direction: row;
  align-items:    flex-start;
  justify-content: space-between;
  gap:            ${spacing.m}px;
  margin-bottom:  ${spacing.l}px;
`

const FavoriteBtn = styled.Pressable<{ $bg: string; $border: string }>`
  width:            ${sizing['3xl']}px;
  height:           ${sizing['3xl']}px;
  border-radius:    ${sizing['3xl'] / 2}px;
  align-items:      center;
  justify-content:  center;
  background-color: ${({ $bg }) => $bg};
  border-width:     0.5px;
  border-color:     ${({ $border }) => $border};
`

const CTAButton = styled.Pressable<{ $accent: string; $disabled: boolean }>`
  flex-direction:     row;
  align-items:        center;
  justify-content:    center;
  gap:                ${spacing.s}px;
  padding-vertical:   ${spacing.m}px;
  padding-horizontal: ${spacing['2xl']}px;
  border-radius:      ${corners.full}px;
  background-color:   ${({ $accent, $disabled }) => $disabled ? colorPrimitives.neutral[400] : $accent};
  min-height:         52px;
`

const CTAText = styled.Text`
  font-family:    ${Fonts.uiSemiBold};
  font-size:      ${typeScale.mobile.s}px;
  color:          ${lightTheme.foreground.primaryOnAccent};
  letter-spacing: ${typeScale.mobile.s * letterSpacing.spacious}px;
  text-transform: uppercase;
`
