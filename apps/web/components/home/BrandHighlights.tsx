const brands = [
  { name:'Zara',  tag:'أحدث الموديلات' },
  { name:'H&M',   tag:'أزياء يومية'    },
  { name:'Nike',  tag:'رياضة وكاجوال'  },
  { name:'Mango', tag:'أناقة عصرية'    },
  { name:'Boss',  tag:'رسمي فاخر'      },
  { name:'Levi\'s', tag:'جينز أصيل'   },
]

export default function BrandHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h2 className="text-2xl font-black text-light-text dark:text-dark-text mb-8 text-center">براندات مميزة</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <div key={brand.name}
            className="group flex flex-col items-center gap-2 p-5 rounded-card
                       bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border
                       hover:border-gold hover:shadow-gold transition-all duration-200 cursor-pointer">
            <div className="w-12 h-12 rounded-pill bg-light-elevated dark:bg-dark-elevated flex items-center justify-center
                            group-hover:bg-gold/10 transition-colors">
              <span className="text-xs font-black text-light-text dark:text-dark-text group-hover:text-gold transition-colors">
                {brand.name.slice(0,2).toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text group-hover:text-gold transition-colors text-center">
              {brand.name}
            </p>
            <p className="text-[10px] text-light-muted dark:text-dark-muted text-center">{brand.tag}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
