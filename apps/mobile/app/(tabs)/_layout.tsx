import { Tabs } from 'expo-router'
import { colors } from '@/theme/colors'

function Icon({ name, color, size }: { name: string; color: string; size: number }) {
  const icons: Record<string, string> = {
    home: '🏠', search: '🔍', cart: '🛍️', heart: '❤️', user: '👤'
  }
  return null // replace with actual icon component
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark.surface,
          borderTopColor: colors.dark.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor:   colors.gold,
        tabBarInactiveTintColor: colors.dark.muted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Tajawal-Regular',
          marginTop: -4,
        },
      }}
    >
      <Tabs.Screen name="index"   options={{ title: 'الرئيسية', tabBarIcon: ({ color }) => null }} />
      <Tabs.Screen name="search"  options={{ title: 'بحث',      tabBarIcon: ({ color }) => null }} />
      <Tabs.Screen name="cart"    options={{ title: 'سلة',      tabBarIcon: ({ color }) => null }} />
      <Tabs.Screen name="wishlist" options={{ title: 'مفضلة',   tabBarIcon: ({ color }) => null }} />
      <Tabs.Screen name="account" options={{ title: 'حسابي',    tabBarIcon: ({ color }) => null }} />
    </Tabs>
  )
}
