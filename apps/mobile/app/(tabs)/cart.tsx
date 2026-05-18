import { View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-dark-base">
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <View className="px-4 pt-4 pb-2">
          <Text className="text-dark-text font-black text-2xl">سلة التسوق</Text>
        </View>
        <View className="flex-1 items-center justify-center px-8 py-20">
          <Text className="text-6xl mb-5">🛍️</Text>
          <Text className="text-dark-text font-bold text-lg mb-2">السلة فارغة</Text>
          <Text className="text-dark-muted text-sm text-center mb-6">أضف منتجاتك المفضلة وابدأ التسوق</Text>
          <Pressable className="px-8 py-3 rounded-lg" style={{ backgroundColor:'#d4a017' }}>
            <Text className="text-white font-bold">تسوق الآن</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
