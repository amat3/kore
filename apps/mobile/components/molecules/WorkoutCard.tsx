import { Pressable, View, Image }          from 'react-native'
import Animated, {
  useSharedValue, withSpring, useAnimatedStyle,
}                                           from 'react-native-reanimated'
import styled                               from '@emotion/native'
import * as LucideIcons                     from 'lucide-react-native'
import { colors, spacing, corners, typeScale, fontFamily, fontWeight } from '@kore/tokens'
import { useThemeColors }                   from '@/hooks/useThemeColors'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced'

const levelLabel: Record<WorkoutLevel, string> = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
}

export interface WorkoutCardProps {
  title:       string
  category:    string
  duration:    number
  level?:      WorkoutLevel
  imageSrc?:   string
  onPress?:    () => void
  onFavorite?: () => void
  completed?:  boolean
  favorited?:  boolean
}

const WorkoutCard = ({
  title,
  category,
  duration,
  level,
  imageSrc,
  onPress,
  onFavorite,
  completed = false,
  favorited = false,
}: WorkoutCardProps) => {
  const theme = useThemeColors()
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.97) }}
      onPressOut={() => { scale.value = withSpring(1) }}
      style={[
        {
          borderRadius:    corners.m,
          backgroundColor: theme.backgroundCard,
          borderWidth:     0.5,
          borderColor:     theme.border,
          overflow:        'hidden',
        },
        animatedStyle,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title} — ${category}, ${duration} minutos`}
    >
      {/* Imagen — ratio 4:3 */}
      <View style={{ width: '100%', aspectRatio: 4 / 3 }}>
        {imageSrc ? (
          <Image
            source={{ uri: imageSrc }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            resizeMode="cover"
            accessibilityLabel={title}
          />
        ) : (
          <View style={{
            flex:            1,
            alignItems:      'center',
            justifyContent:  'center',
            backgroundColor: theme.surfaceLow,
          }}>
            <LucideIcons.Dumbbell size={24} color={theme.foregroundTertiary} />
          </View>
        )}

        {completed && (
          <View style={{
            position:        'absolute',
            top:             spacing.xs,
            right:           spacing.xs,
            width:           24,
            height:          24,
            borderRadius:    12,
            backgroundColor: colors.success,
            alignItems:      'center',
            justifyContent:  'center',
          }}>
            <LucideIcons.Check size={12} color="#fff" />
          </View>
        )}

        {(favorited || onFavorite) && !completed && (
          <Pressable
            onPress={onFavorite}
            style={{
              position:        'absolute',
              top:             spacing.xs,
              right:           spacing.xs,
              width:           32,
              height:          32,
              borderRadius:    16,
              backgroundColor: favorited ? colors.accent : 'rgba(0,0,0,0.45)',
              alignItems:      'center',
              justifyContent:  'center',
            }}
            accessibilityRole="button"
            accessibilityLabel={favorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            hitSlop={8}
          >
            <LucideIcons.Heart size={14} color="#F7F4F1" fill={favorited ? '#F7F4F1' : 'none'} />
          </Pressable>
        )}
      </View>

      {/* Body */}
      <View style={{ padding: spacing.m, gap: spacing['2xs'], flex: 1 }}>
        <CategoryText>{category}</CategoryText>
        <TitleText $color={theme.foreground} numberOfLines={2}>{title}</TitleText>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 'auto' }}>
          <MetaText $color={theme.foregroundSecondary}>{duration} min</MetaText>
          {level && (
            <>
              <MetaText $color={theme.foregroundTertiary}>·</MetaText>
              <MetaText $color={theme.foregroundSecondary}>{levelLabel[level]}</MetaText>
            </>
          )}
        </View>
      </View>
    </AnimatedPressable>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const CategoryText = styled.Text`
  font-family:    ${fontFamily.ui};
  font-size:      ${typeScale.mobile.xs}px;
  font-weight:    ${fontWeight.semibold};
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color:          ${colors.accent};
  line-height:    ${typeScale.mobile.xs * 1.4}px;
`

const TitleText = styled.Text<{ $color: string }>`
  font-family: ${fontFamily.display};
  font-size:   ${typeScale.mobile.xl}px;
  font-weight: ${fontWeight.semibold};
  line-height: ${typeScale.mobile.xl * 1.2}px;
  color:       ${({ $color }) => $color};
`

const MetaText = styled.Text<{ $color: string }>`
  font-family: ${fontFamily.ui};
  font-size:   ${typeScale.mobile.s}px;
  font-weight: ${fontWeight.light};
  line-height: ${typeScale.mobile.s * 1.4}px;
  color:       ${({ $color }) => $color};
`

export default WorkoutCard
