'use client'
import Link from 'next/link'

const menuData: Record<string, { title: string; links: { label: string; href: string }[] }[]> = {
  men: [
    { title: 'ملابس علوية', links: [{ label: 'قمصان', href: '/ar/men/shirts' },{ label: 'بلوزات', href: '/ar/men/tshirts' },{ label: 'جاكيتات', href: '/ar/men/jackets' }] },
    { title: 'ملابس سفلية', links: [{ label: 'بناطيل', href: '/ar/men/pants' },{ label: 'جينز', href: '/ar/men/jeans' },{ label: 'شورتات', href: '/ar/men/shorts' }] },
    { title: 'رياضي',       links: [{ label: 'ملابس رياضية', href: '/ar/men/sport' },{ label: 'أحذية رياضية', href: '/ar/men/sport-shoes' }] },
  ],
  women: [
    { title: 'ملابس',    links: [{ label: 'فساتين', href: '/ar/women/dresses' },{ label: 'بلوزات', href: '/ar/women/tops' },{ label: 'جاكيتات', href: '/ar/women/jackets' }] },
    { title: 'أساسيات', links: [{ label: 'جينز', href: '/ar/women/jeans' },{ label: 'تنانير', href: '/ar/women/skirts' }] },
    { title: 'مجموعات', links: [{ label: 'سهرة', href: '/ar/women/evening' },{ label: 'كاجوال', href: '/ar/women/casual' }] },
  ],
  kids: [
    { title: 'أولاد', links: [{ label: 'قمصان', href: '/ar/kids/boys-shirts' },{ label: 'بناطيل', href: '/ar/kids/boys-pants' }] },
    { title: 'بنات', links: [{ label: 'فساتين', href: '/ar/kids/girls-dresses' },{ label: 'بلوزات', href: '/ar/kids/girls-tops' }] },
  ],
  shoes:       [{ title: 'أحذية', links: [{ label: 'رياضية', href: '/ar/shoes/sport' },{ label: 'رسمية', href: '/ar/shoes/formal' },{ label: 'كاجوال', href: '/ar/shoes/casual' },{ label: 'صنادل', href: '/ar/shoes/sandals' }] }],
  bags:        [{ title: 'شنط',  links: [{ label: 'حقائب يد', href: '/ar/bags/handbags' },{ label: 'حقائب ظهر', href: '/ar/bags/backpacks' },{ label: 'حقائب سفر', href: '/ar/bags/travel' }] }],
  accessories: [{ title: 'إكسسوار', links: [{ label: 'ساعات', href: '/ar/accessories/watches' },{ label: 'نظارات', href: '/ar/accessories/glasses' },{ label: 'حزام', href: '/ar/accessories/belts' }] }],
}

interface Props { category: string }

export default function MegaMenu({ category }: Props) {
  const sections = menuData[category]
  if (!sections) return null
  return (
    <div className="absolute top-full right-0 z-50 mt-1 min-w-[480px] rounded-card
                    bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border
                    shadow-card-hover animate-slideDown">
      <div className="p-6 grid gap-6" style={{ gridTemplateColumns: `repeat(${sections.length}, 1fr)` }}>
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-widest mb-3">
              {section.title}
            </p>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-sm text-light-text dark:text-dark-text hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-light-border dark:border-dark-border px-6 py-3">
        <Link href={`/ar/${category}`}
          className="text-sm font-semibold text-gold hover:text-gold-deep transition-colors">
          عرض كل المنتجات ←
        </Link>
      </div>
    </div>
  )
}
