export const categories = [
  { key: 'men',       label: 'رجالي' },
  { key: 'women',     label: 'نسائي' },
  { key: 'kids',      label: 'ولادي' },
  { key: 'shoes',     label: 'أحذية' },
  { key: 'bags',      label: 'شنط' },
  { key: 'accessories', label: 'إكسسوار' },
] as const

export const mockProducts = [
  { id:'1', name:'قميص كلاسيك قطن', brand:'Zara', price:85000, originalPrice:120000, image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80', category:'men', isNew:true, discount:29 },
  { id:'2', name:'بنطلون جينز سليم', brand:'H&M', price:95000, originalPrice:130000, image:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', category:'men', isNew:false, discount:27 },
  { id:'3', name:'فستان صيفي منقوش', brand:'Mango', price:110000, originalPrice:150000, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80', category:'women', isNew:true, discount:27 },
  { id:'4', name:'حذاء رياضي أبيض', brand:'Nike', price:180000, originalPrice:220000, image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', category:'shoes', isNew:true, discount:18 },
  { id:'5', name:'حقيبة يد جلدية', brand:'Guess', price:250000, originalPrice:320000, image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', category:'bags', isNew:false, discount:22 },
  { id:'6', name:'تيشيرت أساسي', brand:'Bershka', price:45000, originalPrice:60000, image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', category:'men', isNew:false, discount:25 },
  { id:'7', name:'بلوزة كاجوال', brand:'Zara', price:75000, originalPrice:95000, image:'https://images.unsplash.com/photo-1485462537746-965f33f4f55d?w=400&q=80', category:'women', isNew:true, discount:21 },
] as const
