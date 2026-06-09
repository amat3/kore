import React                         from 'react'
import { View, Switch, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import Animated, { FadeInDown }     from 'react-native-reanimated'
import { useSafeAreaInsets }        from 'react-native-safe-area-context'
import { useTranslation }           from 'react-i18next'
import AsyncStorage                 from '@react-native-async-storage/async-storage'
import * as LucideIcons             from 'lucide-react-native'
import styled                       from '@emotion/native'
import { colors, spacing, corners, typeScale, lightTheme } from '@kore/tokens'
import { Fonts }                    from '@/constants/fonts'
import { useThemeColors }           from '@/hooks/useThemeColors'
import { useTheme }                 from '@/providers/ThemeProvider'
import { useAuth }                  from '@/providers/AuthProvider'
import { Text }                     from '@/components/atoms'
import { useActivity }              from '@/services/useActivity'

const LANG_KEY = '@kore/language'

export default function ProfileScreen() {
  const { user, logout }  = useAuth()
  const theme             = useThemeColors()
  const { isDark, toggle: toggleTheme } = useTheme()
  const insets            = useSafeAreaInsets()
  const { t, i18n }       = useTranslation()

  const { stats, loading } = useActivity(user?.uid)

  const initial = (user?.displayName?.charAt(0) ?? user?.email?.charAt(0) ?? 'K').toUpperCase()
  const name    = user?.displayName ?? user?.email?.split('@')[0] ?? 'atleta'

  const switchLang = async (lang: 'es' | 'en') => {
    await i18n.changeLanguage(lang)
    await AsyncStorage.setItem(LANG_KEY, lang)
  }

  const currentLang = (i18n.language?.slice(0, 2) ?? 'es') as 'es' | 'en'

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
      {/* Avatar + nombre */}
      <Animated.View entering={FadeInDown.duration(350).delay(0)}>
        <Pad style={{ alignItems: 'center', gap: spacing.m }}>
          <AvatarCircle $accent={colors.accent}>
            <AvatarText>{initial}</AvatarText>
          </AvatarCircle>
          <View style={{ alignItems: 'center', gap: spacing['2xs'] }}>
            <Text variant="h2">{name}</Text>
            {user?.email && (
              <Text variant="caption" color={theme.foregroundSecondary}>{user.email}</Text>
            )}
          </View>
        </Pad>
      </Animated.View>

      {/* Stats */}
      <Animated.View entering={FadeInDown.duration(350).delay(60)}>
        <Pad>
          <SectionLabel $color={theme.foregroundTertiary}>{t('profile.stats')}</SectionLabel>
          <StatsRow>
            <StatBox $border={theme.border}>
              {loading
                ? <ActivityIndicator size="small" color={colors.accent} />
                : <StatValue $color={colors.accent}>{stats.totalSessions}</StatValue>
              }
              <StatLabel $color={theme.foregroundSecondary}>{t('profile.sessions')}</StatLabel>
            </StatBox>
            <StatBox $border={theme.border}>
              {loading
                ? <ActivityIndicator size="small" color={colors.accent} />
                : <StatValue $color={colors.accent}>{stats.totalMinutes}</StatValue>
              }
              <StatLabel $color={theme.foregroundSecondary}>{t('profile.minutes')}</StatLabel>
            </StatBox>
            <StatBox $border={theme.border}>
              {loading
                ? <ActivityIndicator size="small" color={colors.accent} />
                : <StatValue $color={colors.accent}>{stats.streak}</StatValue>
              }
              <StatLabel $color={theme.foregroundSecondary}>{t('profile.streak')}</StatLabel>
            </StatBox>
          </StatsRow>
        </Pad>
      </Animated.View>

      {/* Preferencias */}
      <Animated.View entering={FadeInDown.duration(350).delay(120)}>
        <Pad>
          <SectionLabel $color={theme.foregroundTertiary}>{t('profile.preferences')}</SectionLabel>
          <SettingsCard $border={theme.border} $bg={theme.backgroundCard}>
            {/* Tema oscuro */}
            <SettingRow $border={theme.border}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s }}>
                <LucideIcons.Moon size={18} color={theme.foregroundSecondary} />
                <SettingLabel $color={theme.foreground}>{t('profile.darkMode')}</SettingLabel>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.border, true: theme.accent }}
                thumbColor="#FFFFFF"
              />
            </SettingRow>

            {/* Idioma */}
            <SettingRow $border="transparent">
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s }}>
                <LucideIcons.Globe size={18} color={theme.foregroundSecondary} />
                <SettingLabel $color={theme.foreground}>{t('profile.language')}</SettingLabel>
              </View>
              <LangToggle>
                <LangBtn
                  onPress={() => switchLang('es')}
                  $active={currentLang === 'es'}
                  $accent={colors.accent}
                  $border={theme.border}
                  accessibilityRole="button"
                  accessibilityLabel="Español"
                >
                  <LangText $active={currentLang === 'es'} $accent={colors.accent} $fg={theme.foreground}>
                    ES
                  </LangText>
                </LangBtn>
                <LangBtn
                  onPress={() => switchLang('en')}
                  $active={currentLang === 'en'}
                  $accent={colors.accent}
                  $border={theme.border}
                  accessibilityRole="button"
                  accessibilityLabel="English"
                >
                  <LangText $active={currentLang === 'en'} $accent={colors.accent} $fg={theme.foreground}>
                    EN
                  </LangText>
                </LangBtn>
              </LangToggle>
            </SettingRow>
          </SettingsCard>
        </Pad>
      </Animated.View>

      {/* Cerrar sesión */}
      <Animated.View entering={FadeInDown.duration(350).delay(180)}>
        <Pad>
          <LogoutBtn
            onPress={logout}
            $border={theme.border}
            accessibilityRole="button"
            accessibilityLabel={t('profile.logout')}
          >
            <LucideIcons.LogOut size={16} color="${lightTheme.stroke.error}" />
            <LogoutText>{t('profile.logout')}</LogoutText>
          </LogoutBtn>
        </Pad>
      </Animated.View>
    </ScrollView>
  )
}

// ── Styled ──────────────────────────────────────────────────────────────────
const Pad = styled.View`
  padding-horizontal: ${spacing.l}px;
`

const AvatarCircle = styled.View<{ $accent: string }>`
  width:            80px;
  height:           80px;
  border-radius:    40px;
  background-color: ${({ $accent }) => $accent};
  align-items:      center;
  justify-content:  center;
`

const AvatarText = styled.Text`
  font-family: ${Fonts.displaySemiBold};
  font-size:   ${typeScale.mobile['2xl']}px;
  color:       ${lightTheme.foreground.primaryOnAccent};
`

const SectionLabel = styled.Text<{ $color: string }>`
  font-family:    ${Fonts.uiSemiBold};
  font-size:      ${typeScale.mobile.xs}px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
  margin-bottom:  ${spacing.s}px;
`

const StatsRow = styled.View`
  flex-direction: row;
  gap:            ${spacing.m}px;
`

const StatBox = styled.View<{ $border: string }>`
  flex:             1;
  padding:          ${spacing.m}px;
  border-radius:    ${corners.m}px;
  border-width:     0.5px;
  border-color:     ${({ $border }) => $border};
  align-items:      center;
  gap:              ${spacing['2xs']}px;
`

const StatValue = styled.Text<{ $color: string }>`
  font-family: ${Fonts.displaySemiBold};
  font-size:   ${typeScale.mobile['2xl']}px;
  color:       ${({ $color }) => $color};
`

const StatLabel = styled.Text<{ $color: string }>`
  font-family:    ${Fonts.uiRegular};
  font-size:      ${typeScale.mobile.xs}px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
`

const SettingsCard = styled.View<{ $border: string; $bg: string }>`
  border-radius:    ${corners.m}px;
  border-width:     0.5px;
  border-color:     ${({ $border }) => $border};
  background-color: ${({ $bg }) => $bg};
  overflow:         hidden;
`

const SettingRow = styled.View<{ $border: string }>`
  flex-direction:      row;
  align-items:         center;
  justify-content:     space-between;
  padding:             ${spacing.m}px ${spacing.l}px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${({ $border }) => $border};
  min-height:          52px;
`

const SettingLabel = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiRegular};
  font-size:   ${typeScale.mobile.m}px;
  color:       ${({ $color }) => $color};
`

const LangToggle = styled.View`
  flex-direction: row;
  gap:            ${spacing.xs}px;
`

const LangBtn = styled.Pressable<{ $active: boolean; $accent: string; $border: string }>`
  padding-vertical:   ${spacing.xs}px;
  padding-horizontal: ${spacing.m}px;
  border-radius:      ${corners.s}px;
  border-width:       1px;
  border-color:       ${({ $active, $accent, $border }) => $active ? $accent : $border};
  background-color:   ${({ $active, $accent }) => $active ? `${$accent}1A` : 'transparent'};
  min-height:         36px;
  align-items:        center;
  justify-content:    center;
`

const LangText = styled.Text<{ $active: boolean; $accent: string; $fg: string }>`
  font-family: ${Fonts.uiSemiBold};
  font-size:   ${typeScale.mobile.s}px;
  color:       ${({ $active, $accent, $fg }) => $active ? $accent : $fg};
`

const LogoutBtn = styled.Pressable<{ $border: string }>`
  flex-direction:   row;
  align-items:      center;
  justify-content:  center;
  gap:              ${spacing.s}px;
  padding-vertical: ${spacing.m}px;
  border-radius:    ${corners.xl}px;
  border-width:     1px;
  border-color:     ${lightTheme.stroke.error};
  min-height:       52px;
`

const LogoutText = styled.Text`
  font-family:    ${Fonts.uiSemiBold};
  font-size:      ${typeScale.mobile.m}px;
  color:          ${lightTheme.stroke.error};
  letter-spacing: 0.5px;
`
