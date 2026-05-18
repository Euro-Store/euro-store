import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams()
  return (
    <SafeAreaView className="flex-1 bg-dark-base">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => router.back()} className="p-2">
          <Text className="text-dark-text text-2xl">→</Text>
        </Pressable>
        <Text className="text-dark-text font-bold">تفاصيل المنتج</Text>
        <Pressable className="p-2"><Text className="text-2xl">❤️</Text></Pressable>
      </View>

      <ScrollView>
        <View className="mx-4 aspect-[3/4] bg-dark-elevated rounded-2xl items-center justify-center mb-6">
          <Text className="text-6xl">👕</Text>
          <Text className="text-dark-muted mt-2 text-sm">صورة المنتج #{id}</Text>
        </View>

        <View className="px-4">
          <Text className="text-gold text-xs font-bold uppercase tracking-widest mb-1">ZARA</Text>
          <Text className="text-dark-text font-black text-xl mb-2">اسم المنتج</Text>
          <Text className="text-dark-text font-black text-2xl mb-6">85,000 ل.س</Text>

          <Text className="text-dark-muted text-xs font-bold mb-3 uppercase tracking-widest">اختر المقاس</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {['S','M','L','XL','XXL'].map((s) => (
              <Pressable key={s} className="w-12 h-12 rounded-lg bg-dark-elevated border border-dark-border items-center justify-center">
                <Text className="text-dark-text font-semibold text-sm">{s}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable className="w-full py-4 rounded-xl items-center mb-3" style={{ backgroundColor:'#d4a017' }}>
            <Text className="text-white font-black text-base">أضف للسلة</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
