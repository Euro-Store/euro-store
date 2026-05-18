import { useState } from 'react'
import { View, Text, TextInput, Pressable, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const suggestions = ['قميص رجالي','فستان سهرة','حذاء رياضي','حقيبة جلد','جاكيت شتوي']

export default function SearchScreen() {
  const [query, setQuery] = useState('')
  return (
    <SafeAreaView className="flex-1 bg-dark-base px-4">
      {/* Search Input */}
      <View className="mt-4 mb-6 flex-row items-center bg-dark-elevated rounded-xl px-4 border border-dark-border gap-3">
        <Text className="text-xl">🔍</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="ابحث عن منتجات..."
          placeholderTextColor="#a0a0a0"
          className="flex-1 py-3.5 text-dark-text text-base"
          style={{ textAlign:'right', fontFamily:'Tajawal-Regular' }}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <Text className="text-dark-muted text-xl">✕</Text>
          </Pressable>
        )}
      </View>

      {/* Suggestions */}
      {query.length === 0 && (
        <View>
          <Text className="text-dark-muted text-xs font-bold uppercase tracking-widest mb-3">عمليات بحث شائعة</Text>
          <View className="flex-row flex-wrap gap-2">
            {suggestions.map((s) => (
              <Pressable key={s} onPress={() => setQuery(s)}
                className="px-4 py-2 rounded-full bg-dark-elevated border border-dark-border">
                <Text className="text-dark-text text-sm">{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Results placeholder */}
      {query.length > 0 && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-5xl mb-4">🔍</Text>
          <Text className="text-dark-text font-semibold">البحث عن: {query}</Text>
          <Text className="text-dark-muted text-sm mt-2">سيتم ربطه بـ API لاحقاً</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
