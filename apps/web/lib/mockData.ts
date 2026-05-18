export interface MockProduct {
  id: string
  nameAr: string
  nameEn: string
  price: number
  salePrice?: number
  category: string
  brand: string
  colors: string[]
  isNew: boolean
  isFeatured: boolean
  gradient: string
  emoji: string
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "p1", nameAr: "جاكيت رجالي كلاسيكي", nameEn: "Classic Men Jacket",
    price: 89000, salePrice: 65000, category: "men", brand: "Euro Classic",
    colors: ["#1a1a1a", "#8B4513", "#2F4F4F"], isNew: false, isFeatured: true,
    gradient: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 100%)", emoji: "🧥",
  },
  {
    id: "p2", nameAr: "فستان نسائي أنيق", nameEn: "Elegant Women Dress",
    price: 75000, category: "women", brand: "Euro Femme",
    colors: ["#8B0000", "#000080", "#4a4a4a"], isNew: true, isFeatured: true,
    gradient: "linear-gradient(135deg, #1a0a1a 0%, #2d1030 100%)", emoji: "👗",
  },
  {
    id: "p3", nameAr: "حذاء رياضي فاخر", nameEn: "Luxury Sneaker",
    price: 120000, salePrice: 95000, category: "shoes", brand: "Euro Sport",
    colors: ["#ffffff", "#1a1a1a", "#d4a017"], isNew: true, isFeatured: true,
    gradient: "linear-gradient(135deg, #0a1208 0%, #182815 100%)", emoji: "👟",
  },
  {
    id: "p4", nameAr: "شنطة جلد أصلي", nameEn: "Genuine Leather Bag",
    price: 145000, category: "bags", brand: "Euro Leather",
    colors: ["#8B4513", "#1a1a1a", "#d4a017"], isNew: false, isFeatured: true,
    gradient: "linear-gradient(135deg, #150800 0%, #2e1200 100%)", emoji: "👜",
  },
  {
    id: "p5", nameAr: "طقم ولادي كاجوال", nameEn: "Kids Casual Set",
    price: 45000, category: "kids", brand: "Euro Kids",
    colors: ["#4169E1", "#DC143C", "#228B22"], isNew: true, isFeatured: false,
    gradient: "linear-gradient(135deg, #081020 0%, #102040 100%)", emoji: "🧒",
  },
  {
    id: "p6", nameAr: "قميص رجالي قطني", nameEn: "Cotton Men Shirt",
    price: 35000, category: "men", brand: "Euro Classic",
    colors: ["#ffffff", "#87CEEB", "#d4a017"], isNew: false, isFeatured: false,
    gradient: "linear-gradient(135deg, #0f0f1e 0%, #1e1e2e 100%)", emoji: "👕",
  },
  {
    id: "p7", nameAr: "تنورة نسائية شيك", nameEn: "Chic Women Skirt",
    price: 55000, salePrice: 42000, category: "women", brand: "Euro Femme",
    colors: ["#1a1a1a", "#8B0000"], isNew: false, isFeatured: false,
    gradient: "linear-gradient(135deg, #1a0010 0%, #2e0028 100%)", emoji: "👗",
  },
  {
    id: "p8", nameAr: "حقيبة ظهر عصرية", nameEn: "Modern Backpack",
    price: 68000, category: "bags", brand: "Euro Sport",
    colors: ["#1a1a1a", "#d4a017", "#4169E1"], isNew: true, isFeatured: false,
    gradient: "linear-gradient(135deg, #100e00 0%, #201c00 100%)", emoji: "🎒",
  },
]

export const formatPrice = (p: number) => p.toLocaleString("ar-SY") + " ل.س"