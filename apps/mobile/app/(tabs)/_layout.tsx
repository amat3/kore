import { Tabs }              from 'expo-router'
import { useTranslation }   from 'react-i18next'
import { useThemeColors }   from '@/hooks/useThemeColors'
import { colors }           from '@kore/tokens'
import * as LucideIcons     from 'lucide-react-native'
import type { ColorValue }  from 'react-native'

type TabIconProps = { color: ColorValue; size: number }

const HomeIcon     = ({ color, size }: TabIconProps) => <LucideIcons.House     size={size} color={color as string} />
const DumbbellIcon = ({ color, size }: TabIconProps) => <LucideIcons.Dumbbell  size={size} color={color as string} />
const ActivityIcon = ({ color, size }: TabIconProps) => <LucideIcons.Activity  size={size} color={color as string} />
const UserIcon     = ({ color, size }: TabIconProps) => <LucideIcons.User      size={size} color={color as string} />

export default function TabsLayout() {
  const { t } = useTranslation()
  const theme  = useThemeColors()

  return (
    <Tabs
      screenOptions={{
        headerShown:             false,
        tabBarActiveTintColor:   colors.accent,
        tabBarInactiveTintColor: theme.foregroundTertiary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor:  theme.border,
          borderTopWidth:  0.5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: t('nav.home'),     tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="workouts"
        options={{ title: t('nav.workouts'), tabBarIcon: DumbbellIcon }}
      />
      <Tabs.Screen
        name="activity"
        options={{ title: t('nav.activity'), tabBarIcon: ActivityIcon }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: t('nav.profile'),  tabBarIcon: UserIcon }}
      />
    </Tabs>
  )
}
