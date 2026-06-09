import { Tabs }              from 'expo-router'
import { useTranslation }   from 'react-i18next'
import { useThemeColors }   from '@/hooks/useThemeColors'
import { colors }           from '@kore/tokens'

export default function TabsLayout() {
  const { t }     = useTranslation()
  const theme     = useThemeColors()

  return (
    <Tabs
      screenOptions={{
        headerShown:            false,
        tabBarActiveTintColor:  colors.accent,
        tabBarInactiveTintColor: theme.foregroundTertiary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor:  theme.border,
          borderTopWidth:  0.5,
        },
        tabBarLabelStyle: {
          fontFamily: 'DMSans-Regular',
          fontSize:   10,
        },
      }}
    >
      <Tabs.Screen name="index"    options={{ title: t('nav.home') }} />
      <Tabs.Screen name="workouts" options={{ title: t('nav.workouts') }} />
      <Tabs.Screen name="activity" options={{ title: t('nav.activity') }} />
      <Tabs.Screen name="profile"  options={{ title: t('nav.profile') }} />
    </Tabs>
  )
}
