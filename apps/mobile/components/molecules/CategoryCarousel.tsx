import { useEffect, useRef, useState } from 'react'
import { Pressable, View, useWindowDimensions, AccessibilityInfo } from 'react-native'
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import Animated, {
  useAnimatedRef, useSharedValue, useAnimatedScrollHandler,
  useAnimatedStyle, interpolate, Extrapolation,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import * as LucideIcons      from 'lucide-react-native'
import styled                from '@emotion/native'
import { useTranslation }    from 'react-i18next'
import { spacing, corners, typeScale, colors } from '@kore/tokens'
import { Fonts }             from '@/constants/fonts'
import { useThemeColors }    from '@/hooks/useThemeColors'

const CATEGORY_ICONS: Record<string, keyof typeof LucideIcons> = {
  Fuerza:    'Dumbbell',
  Cardio:    'HeartPulse',
  Yoga:      'Sparkles',
  Pilates:   'PersonStanding',
  Movilidad: 'Move',
}

const getCategoryIcon = (category: string) => CATEGORY_ICONS[category] ?? 'Dumbbell'

const AUTOPLAY_INTERVAL = 4000

export interface CategoryItem {
  name:  string
  count: number
}

export interface CategoryCarouselProps {
  categories:       CategoryItem[]
  onSelectCategory: (category: string) => void
}

const CategoryCarousel = ({ categories, onSelectCategory }: CategoryCarouselProps) => {
  const theme  = useThemeColors()
  const { t }  = useTranslation()
  const { width: screenWidth } = useWindowDimensions()

  const cardWidth = screenWidth - spacing.l * 2
  const cardGap   = spacing.m
  const itemWidth = cardWidth + cardGap

  const scrollRef    = useAnimatedRef<Animated.ScrollView>()
  const scrollX      = useSharedValue(0)
  const indexRef     = useRef(0)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion)
  }, [])

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startAutoplay = () => {
    if (reduceMotion || categories.length <= 1) return
    stopAutoplay()
    intervalRef.current = setInterval(() => {
      const next = (indexRef.current + 1) % categories.length
      indexRef.current = next
      scrollRef.current?.scrollTo({ x: next * itemWidth, animated: true })
    }, AUTOPLAY_INTERVAL)
  }

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, categories.length, itemWidth])

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => { scrollX.value = e.contentOffset.x },
  })

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    indexRef.current = Math.round(e.nativeEvent.contentOffset.x / itemWidth)
    startAutoplay()
  }

  return (
    <View>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        disableIntervalMomentum
        contentContainerStyle={{ paddingRight: cardGap }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={stopAutoplay}
        onMomentumScrollEnd={handleMomentumEnd}
      >
        {categories.map(item => {
          const Icon = LucideIcons[getCategoryIcon(item.name)] as React.ComponentType<{ size: number; color: string }>
          return (
            <Pressable
              key={item.name}
              onPress={() => onSelectCategory(item.name)}
              style={{ width: cardWidth, marginRight: cardGap }}
              accessibilityRole="button"
              accessibilityLabel={`${item.name} — ${t('workouts.resultsCount', { count: item.count })}`}
            >
              <CategoryCard $bg={theme.accentLight} $border={theme.border}>
                <IconBadge $bg={theme.backgroundCard}>
                  <Icon size={28} color={colors.accent} />
                </IconBadge>
                <CardBody>
                  <CategoryTitle $color={theme.foreground}>{item.name}</CategoryTitle>
                  <CategoryMeta $color={theme.foregroundSecondary}>
                    {t('workouts.resultsCount', { count: item.count })}
                  </CategoryMeta>
                </CardBody>
                <ExploreRow>
                  <ExploreText>{t('categories.explore')}</ExploreText>
                  <LucideIcons.ArrowRight size={14} color={colors.accent} />
                </ExploreRow>
              </CategoryCard>
            </Pressable>
          )
        })}
      </Animated.ScrollView>

      {categories.length > 1 && (
        <DotsRow>
          {categories.map((item, index) => (
            <Dot key={item.name} index={index} itemWidth={itemWidth} scrollX={scrollX} />
          ))}
        </DotsRow>
      )}
    </View>
  )
}

// ── Pagination dot ───────────────────────────────────────────────────────
const Dot = ({ index, itemWidth, scrollX }: {
  index:     number
  itemWidth: number
  scrollX:   SharedValue<number>
}) => {
  const style = useAnimatedStyle(() => {
    const input = [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth]
    return {
      width:   interpolate(scrollX.value, input, [6, 20, 6], Extrapolation.CLAMP),
      opacity: interpolate(scrollX.value, input, [0.3, 1, 0.3], Extrapolation.CLAMP),
    }
  })

  return <AnimatedDot style={style} />
}

// ── Styled ───────────────────────────────────────────────────────────────
const CategoryCard = styled.View<{ $bg: string; $border: string }>`
  flex-direction:   row;
  align-items:      center;
  gap:              ${`${spacing.m}px`};
  padding:          ${`${spacing.m}px`};
  border-radius:    ${`${corners.m}px`};
  background-color: ${({ $bg }) => $bg};
  border-width:     0.5px;
  border-color:     ${({ $border }) => $border};
  min-height:       96px;
`

const IconBadge = styled.View<{ $bg: string }>`
  width:            48px;
  height:           48px;
  border-radius:    ${`${corners.m}px`};
  align-items:      center;
  justify-content:  center;
  background-color: ${({ $bg }) => $bg};
`

const CardBody = styled.View`
  flex: 1;
  gap:  ${`${spacing['2xs']}px`};
`

const CategoryTitle = styled.Text<{ $color: string }>`
  font-family: ${Fonts.displaySemiBold};
  font-size:   ${`${typeScale.mobile.xl}px`};
  line-height: ${`${typeScale.mobile.xl * 1.2}px`};
  color:       ${({ $color }) => $color};
`

const CategoryMeta = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiRegular};
  font-size:   ${`${typeScale.mobile.s}px`};
  color:       ${({ $color }) => $color};
`

const ExploreRow = styled.View`
  flex-direction: row;
  align-items:    center;
  gap:            ${`${spacing['2xs']}px`};
`

const ExploreText = styled.Text`
  font-family:    ${Fonts.uiSemiBold};
  font-size:      ${`${typeScale.mobile.xs}px`};
  letter-spacing: ${`${typeScale.mobile.xs * 0.04}px`};
  text-transform: uppercase;
  color:          ${colors.accent};
`

const DotsRow = styled.View`
  flex-direction:  row;
  justify-content: center;
  align-items:     center;
  gap:             ${`${spacing['2xs']}px`};
  margin-top:      ${`${spacing.m}px`};
`

const AnimatedDot = styled(Animated.View)`
  height:           6px;
  border-radius:    3px;
  background-color: ${colors.accent};
`

export default CategoryCarousel
