import { ScrollView, View, FlatList }  from 'react-native'
import Animated, { FadeInDown }        from 'react-native-reanimated'
import Svg, { Rect, Text as SvgText }  from 'react-native-svg'
import { useSafeAreaInsets }            from 'react-native-safe-area-context'
import { useTranslation }               from 'react-i18next'
import dayjs                            from 'dayjs'
import 'dayjs/locale/es'
import styled                           from '@emotion/native'
import { colors, spacing, corners, typeScale } from '@kore/tokens'
import { Fonts }                        from '@/constants/fonts'
import { useThemeColors }               from '@/hooks/useThemeColors'
import { useAuth }                      from '@/providers/AuthProvider'
import { Text }                         from '@/components/atoms'
import { StreakBadge }                  from '@/components/molecules'
import { useActivity }                  from '@/services/useActivity'
import type { Session }                 from '@/services/useActivity'

dayjs.locale('es')

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

// ── Gráfica semanal ────────────────────────────────────────────────────────
const WeeklyChart = ({ data, accent, fg, border }: {
  data:   number[]
  accent: string
  fg:     string
  border: string
}) => {
  const BAR_W  = 28
  const GAP    = 10
  const HEIGHT = 80
  const max    = Math.max(...data, 1)

  return (
    <Svg width={(BAR_W + GAP) * 7 - GAP} height={HEIGHT + 24}>
      {data.map((val, i) => {
        const barH = Math.max((val / max) * HEIGHT, val > 0 ? 4 : 2)
        const x    = i * (BAR_W + GAP)
        const y    = HEIGHT - barH
        return (
          <React.Fragment key={i}>
            <Rect
              x={x} y={y} width={BAR_W} height={barH}
              rx={4} fill={val > 0 ? accent : border}
              opacity={val > 0 ? 1 : 0.4}
            />
            <SvgText
              x={x + BAR_W / 2} y={HEIGHT + 16}
              textAnchor="middle"
              fontSize={10}
              fontFamily={Fonts.uiRegular}
              fill={fg}
            >
              {DAYS[i]}
            </SvgText>
          </React.Fragment>
        )
      })}
    </Svg>
  )
}

// ── Tarjeta de stat ────────────────────────────────────────────────────────
const StatCard = ({ value, label, accent, fg, secondary, border }: {
  value: string; label: string
  accent: string; fg: string; secondary: string; border: string
}) => (
  <StatBox $border={border}>
    <StatValue $color={accent}>{value}</StatValue>
    <StatLabel $color={secondary}>{label}</StatLabel>
  </StatBox>
)

// ── Item de sesión ─────────────────────────────────────────────────────────
const SessionItem = ({ item, border, fg, secondary }: {
  item: Session; border: string; fg: string; secondary: string
}) => (
  <SessionRow $border={border}>
    <View style={{ flex: 1, gap: 2 }}>
      <SessionTitle $color={fg} numberOfLines={1}>{item.workoutTitle}</SessionTitle>
      <SessionMeta $color={secondary}>
        {item.category} · {item.duration} min · {dayjs(item.date).format('D MMM')}
      </SessionMeta>
    </View>
  </SessionRow>
)

// ── Componente principal ───────────────────────────────────────────────────
import React from 'react'

export default function ActivityScreen() {
  const { user }  = useAuth()
  const theme     = useThemeColors()
  const insets    = useSafeAreaInsets()
  const { t }     = useTranslation()

  const { stats, grouped, loading } = useActivity(user?.uid)

  // Mock data — se sustituye por datos reales cuando el usuario registre sesiones
  const weeklyData  = stats.totalSessions > 0 ? stats.weeklyMinutes : [0, 45, 20, 0, 30, 45, 0]
  const streak      = stats.totalSessions > 0 ? stats.streak        : 7
  const totalSes    = stats.totalSessions > 0 ? stats.totalSessions : 12
  const totalMin    = stats.totalMinutes  > 0 ? stats.totalMinutes  : 340

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingTop:    insets.top + spacing.l,
        paddingBottom: insets.bottom + spacing['3xl'],
        gap:           spacing.xl,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabecera */}
      <Animated.View entering={FadeInDown.duration(350).delay(0)}>
        <Pad>
          <Text variant="h1">{t('activity.title')}</Text>
        </Pad>
      </Animated.View>

      {/* Stats */}
      <Animated.View entering={FadeInDown.duration(350).delay(60)}>
        <Pad>
          <StatsRow>
            <StatCard
              value={String(totalSes)}    label="sesiones"
              accent={colors.accent}      fg={theme.foreground}
              secondary={theme.foregroundSecondary} border={theme.border}
            />
            <StatCard
              value={String(totalMin)}    label="minutos"
              accent={colors.accent}      fg={theme.foreground}
              secondary={theme.foregroundSecondary} border={theme.border}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <StreakBadge count={streak} variant={streak > 0 ? 'active' : 'inactive'} size="sm" />
            </View>
          </StatsRow>
        </Pad>
      </Animated.View>

      {/* Gráfica semanal */}
      <Animated.View entering={FadeInDown.duration(350).delay(120)}>
        <Pad>
          <SectionTitle $color={theme.foreground}>Esta semana</SectionTitle>
          <ChartCard $border={theme.border} $bg={theme.backgroundCard}>
            <WeeklyChart
              data={weeklyData}
              accent={colors.accent}
              fg={theme.foregroundSecondary}
              border={theme.border}
            />
          </ChartCard>
        </Pad>
      </Animated.View>

      {/* Historial */}
      <Animated.View entering={FadeInDown.duration(350).delay(180)}>
        <Pad>
          <SectionTitle $color={theme.foreground}>Historial</SectionTitle>
          {grouped.length === 0 && !loading ? (
            <Text variant="body" color={theme.foregroundSecondary}>
              Aún no hay sesiones registradas.
            </Text>
          ) : (
            grouped.map(group => (
              <View key={group.month} style={{ marginBottom: spacing.m }}>
                <MonthLabel $color={theme.foregroundTertiary}>
                  {group.month.charAt(0).toUpperCase() + group.month.slice(1)}
                </MonthLabel>
                <FlatList
                  data={group.items}
                  keyExtractor={s => s.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <SessionItem
                      item={item}
                      border={theme.border}
                      fg={theme.foreground}
                      secondary={theme.foregroundSecondary}
                    />
                  )}
                />
              </View>
            ))
          )}
        </Pad>
      </Animated.View>
    </ScrollView>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const Pad = styled.View`
  padding-horizontal: ${spacing.l}px;
`

const StatsRow = styled.View`
  flex-direction: row;
  gap:            ${spacing.m}px;
  align-items:    center;
`

const StatBox = styled.View<{ $border: string }>`
  flex:               1;
  padding:            ${spacing.m}px;
  border-radius:      ${corners.m}px;
  border-width:       0.5px;
  border-color:       ${({ $border }) => $border};
  gap:                ${spacing['2xs']}px;
`

const StatValue = styled.Text<{ $color: string }>`
  font-family: ${Fonts.displaySemiBold};
  font-size:   ${typeScale.mobile['2xl']}px;
  line-height: ${typeScale.mobile['2xl'] * 1.1}px;
  color:       ${({ $color }) => $color};
`

const StatLabel = styled.Text<{ $color: string }>`
  font-family:    ${Fonts.uiRegular};
  font-size:      ${typeScale.mobile.xs}px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
`

const SectionTitle = styled.Text<{ $color: string }>`
  font-family:   ${Fonts.displaySemiBold};
  font-size:     ${typeScale.mobile.xl}px;
  color:         ${({ $color }) => $color};
  margin-bottom: ${spacing.m}px;
`

const ChartCard = styled.View<{ $border: string; $bg: string }>`
  border-radius:  ${corners.m}px;
  border-width:   0.5px;
  border-color:   ${({ $border }) => $border};
  background-color: ${({ $bg }) => $bg};
  padding:        ${spacing.l}px;
  align-items:    center;
`

const MonthLabel = styled.Text<{ $color: string }>`
  font-family:    ${Fonts.uiSemiBold};
  font-size:      ${typeScale.mobile.xs}px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
  margin-bottom:  ${spacing.s}px;
`

const SessionRow = styled.View<{ $border: string }>`
  flex-direction: row;
  align-items:    center;
  padding-vertical: ${spacing.m}px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${({ $border }) => $border};
`

const SessionTitle = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiRegular};
  font-size:   ${typeScale.mobile.m}px;
  color:       ${({ $color }) => $color};
`

const SessionMeta = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiLight};
  font-size:   ${typeScale.mobile.xs}px;
  color:       ${({ $color }) => $color};
`
