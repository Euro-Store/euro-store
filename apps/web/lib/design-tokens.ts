// Euro Store — Design Tokens (Single Source of Truth)

export const colors = {
  gold:    '#d4a017',
  goldLight: '#f2c94c',
  goldDeep:  '#a87400',
  dark: { base:'#0a0a0a', surface:'#121212', elevated:'#1a1a1a', border:'#2a2a2a', text:'#f5f5f5', muted:'#a0a0a0' },
  light:{ base:'#f7f5ef', surface:'#ffffff',  elevated:'#f0ede4', border:'#e5e7eb', text:'#111111', muted:'#6b7280' },
  success:'#16a34a', warning:'#f59e0b', error:'#dc2626', info:'#0284c7',
} as const

export const radius = { card:'12px', btn:'8px', pill:'9999px' } as const

export const shadow = {
  card:     '0 2px 12px rgba(0,0,0,0.06)',
  cardHover:'0 8px 28px rgba(0,0,0,0.11)',
  gold:     '0 0 0 2px rgba(212,160,23,0.40)',
} as const

export const categories = [
  { key:'men',         label:'رجالي',   icon:'👔', href:'/ar/men'         },
  { key:'women',       label:'نسائي',   icon:'👗', href:'/ar/women'       },
  { key:'kids',        label:'أطفال',   icon:'🧒', href:'/ar/kids'        },
  { key:'shoes',       label:'أحذية',   icon:'👟', href:'/ar/shoes'       },
  { key:'bags',        label:'شنط',     icon:'👜', href:'/ar/bags'        },
  { key:'accessories', label:'إكسسوار', icon:'⌚', href:'/ar/accessories' },
] as const

export const navLinks = [
  { label:'رجالي',   href:'/ar/men'   },
  { label:'نسائي',   href:'/ar/women' },
  { label:'أطفال',   href:'/ar/kids'  },
  { label:'أحذية',   href:'/ar/shoes' },
  { label:'شنط',     href:'/ar/bags'  },
  { label:'إكسسوار', href:'/ar/accessories' },
] as const

export const trustItems = [
  { icon:'🚚', title:'شحن سريع',     desc:'التوصيل خلال 2–4 أيام عمل' },
  { icon:'↩️', title:'إرجاع مجاني',  desc:'إرجاع سهل خلال 14 يوم'    },
  { icon:'🔒', title:'دفع آمن',      desc:'كاش عند الاستلام'           },
  { icon:'💬', title:'دعم 7/24',     desc:'فريقنا دائماً معك'          },
] as const

export const mockProducts = [
  { id:'1', name:'قميص كلاسيك قطن', brand:'Zara', price:85000, originalPrice:120000, image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80', category:'men',   isNew:true,  discount:29 },
  { id:'2', name:'فستان سهرة أنيق', brand:'H&M',  price:145000,originalPrice:0,      image:'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80', category:'women', isNew:true,  discount:0  },
  { id:'3', name:'حذاء رياضي نايك', brand:'Nike', price:220000,originalPrice:280000, image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', category:'shoes', isNew:false, discount:21 },
  { id:'4', name:'حقيبة يد جلد',    brand:'Mango',price:195000,originalPrice:0,      image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', category:'bags',  isNew:false, discount:0  },
  { id:'5', name:'جاكيت شتوي دافئ', brand:'Zara', price:310000,originalPrice:420000, image:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80', category:'men',  isNew:true,  discount:26 },
  { id:'6', name:'بلوزة كاجوال',     brand:'H&M',  price:55000, originalPrice:75000,  image:'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80', category:'women',isNew:false, discount:27 },
  { id:'7', name:'حذاء رسمي كلاسيك', brand:'Boss', price:380000,originalPrice:0,      image:'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80', category:'shoes',isNew:true,  discount:0  },
  { id:'8', name:'ساعة أنيقة',       brand:'Fossil',price:425000,originalPrice:550000,image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', category:'accessories',isNew:false,discount:23 },
] as const

export type Product = {
  id: string; name: string; brand: string; price: number
  originalPrice: number; image: string; category: string
  isNew: boolean; discount: number
}
