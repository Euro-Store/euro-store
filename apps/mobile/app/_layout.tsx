import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import "@/global.css"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    'Tajawal-Regular': require('@/assets/fonts/Tajawal-Regular.ttf'),
    'Tajawal-Bold':    require('@/assets/fonts/Tajawal-Bold.ttf'),
    'Tajawal-Black':   require('@/assets/fonts/Tajawal-ExtraBold.ttf'),
  })

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="product/[id]" options={{ presentation: 'card' }} />
      </Stack>
    </SafeAreaProvider>
  )
}
