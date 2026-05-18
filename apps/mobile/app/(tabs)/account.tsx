import { View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const menuItems = [
  { icon:'📦', label:'طلباتي',       href:'/orders'    },
  { icon:'❤️', label:'المفضلة',      href:'/wishlist'  },
  { icon:'📍', label:'عناويني',      href:'/addresses' },
  { icon:'🔔', label:'الإشعارات',    href:'/notifs'    },
  { icon:'⚙️', label:'الإعدادات',    href:'/settings'  },
  { icon:'❓', label:'المساعدة',     href:'/support'   },
]

export default function AccountScreen() {
  return (
    <SafeAreaView className="flex-1 bg-dark-base">
      <ScrollView>
        {/* Profile */}
        <View className="items-center py-8">
          <View className="w-20 h-20 rounded-full bg-dark-elevated border-2 border-gold items-center justify-center mb-3">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="text-dark-text font-bold text-lg">مرحباً!</Text>
          <Text className="text-dark-muted text-sm">سجل دخولك للوصول لحسابك</Text>
          <Pressable className="mt-4 px-8 py-2.5 rounded-lg" style={{ backgroundColor:'#d4a017' }}>
            <Text className="text-white font-bold">تسجيل الدخول</Text>
          </Pressable>
        </View>

        {/* Menu */}
        <View className="mx-4 bg-dark-surface rounded-2xl border border-dark-border overflow-hidden">
          {menuItems.map((item, i) => (
            <Pressable key={item.label}
              className={`flex-row items-center gap-4 px-5 py-4 ${i < menuItems.length - 1 ? 'border-b border-dark-border' : ''}`}>
              <Text className="text-xl">{item.icon}</Text>
              <Text className="flex-1 text-dark-text font-medium text-sm">{item.label}</Text>
              <Text className="text-dark-muted text-sm">←</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
