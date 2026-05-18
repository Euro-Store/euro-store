import { ScrollView, View, Text, Pressable, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const categories = [
  { key:'men',   label:'رجالي', icon:'👔' },
  { key:'women', label:'نسائي', icon:'👗' },
  { key:'kids',  label:'أطفال', icon:'🧒' },
  { key:'shoes', label:'أحذية', icon:'👟' },
  { key:'bags',  label:'شنط',   icon:'👜' },
]

const products = [
  { id:'1', name:'قميص كلاسيك', brand:'Zara', price:85000, discount:29,
    image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
  { id:'2', name:'فستان أنيق',  brand:'H&M',  price:145000, discount:0,
    image:'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80' },
  { id:'3', name:'حذاء رياضي', brand:'Nike', price:220000, discount:21,
    image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { id:'4', name:'حقيبة جلد',  brand:'Mango',price:195000, discount:0,
    image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80' },
]

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-dark-base">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <View>
            <Text className="text-dark-muted text-xs font-medium">مرحباً بك في</Text>
            <Text className="text-dark-text font-black text-2xl">
              <Text className="text-gold">EURO </Text>STORE
            </Text>
          </View>
          <Pressable className="w-10 h-10 rounded-full bg-dark-elevated items-center justify-center">
            <Text className="text-xl">🔔</Text>
          </Pressable>
        </View>

        {/* Hero Banner */}
        <View className="mx-4 my-2 rounded-2xl overflow-hidden bg-dark-elevated min-h-[160px] justify-end p-5"
              style={{ backgroundColor:'#0f0d08' }}>
          <View className="absolute inset-0 opacity-20" />
          <Text className="text-gold text-xs font-bold mb-1 uppercase tracking-widest">مجموعة جديدة</Text>
          <Text className="text-white font-black text-3xl leading-tight mb-3">
            اكتشف{'\n'}
            <Text className="text-gold">أناقتك</Text>
          </Text>
          <Pressable onPress={() => router.push('/ar/women')}
            className="self-start px-5 py-2.5 rounded-lg"
            style={{ backgroundColor:'#d4a017' }}>
            <Text className="text-white font-bold text-sm">تسوقي الآن</Text>
          </Pressable>
        </View>

        {/* Categories */}
        <View className="px-4 mt-5">
          <Text className="text-dark-text font-bold text-base mb-4">الأقسام</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
            {categories.map((cat) => (
              <Pressable key={cat.key}
                className="items-center mx-2 w-16"
                onPress={() => router.push(`/ar/${cat.key}` as any)}>
                <View className="w-14 h-14 rounded-full bg-dark-elevated items-center justify-center mb-2
                                border border-dark-border">
                  <Text className="text-2xl">{cat.icon}</Text>
                </View>
                <Text className="text-dark-muted text-xs text-center">{cat.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View className="px-4 mt-6 pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-dark-text font-bold text-base">الأكثر طلباً</Text>
            <Text className="text-gold text-sm font-semibold">الكل</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {products.map((p) => (
              <Pressable key={p.id}
                className="w-[47%] bg-dark-surface rounded-xl overflow-hidden border border-dark-border"
                onPress={() => router.push(`/product/${p.id}` as any)}>
                <Image source={{ uri: p.image }} className="w-full aspect-[3/4]" resizeMode="cover" />
                {p.discount > 0 && (
                  <View className="absolute top-2 right-2 bg-gold px-2 py-0.5 rounded-full">
                    <Text className="text-white text-[10px] font-bold">-{p.discount}٪</Text>
                  </View>
                )}
                <View className="p-3">
                  <Text className="text-dark-muted text-[10px] font-semibold uppercase tracking-wider">{p.brand}</Text>
                  <Text className="text-dark-text text-sm font-semibold mt-0.5 leading-snug" numberOfLines={2}>{p.name}</Text>
                  <Text className="text-dark-text font-black mt-1">{p.price.toLocaleString()} ل.س</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
