import Link from 'next/link'

const cols = [
  {
    title: 'الأقسام',
    links: [
      { label:'رجالي',   href:'/ar/men'         },
      { label:'نسائي',   href:'/ar/women'       },
      { label:'أطفال',   href:'/ar/kids'        },
      { label:'أحذية',   href:'/ar/shoes'       },
      { label:'شنط',     href:'/ar/bags'        },
      { label:'إكسسوار', href:'/ar/accessories' },
    ],
  },
  {
    title: 'حسابي',
    links: [
      { label:'تسجيل الدخول', href:'/ar/auth/login'      },
      { label:'إنشاء حساب',   href:'/ar/auth/register'   },
      { label:'طلباتي',       href:'/ar/account/orders'  },
      { label:'المفضلة',      href:'/ar/account/wishlist'},
      { label:'عناويني',      href:'/ar/account/addresses'},
    ],
  },
  {
    title: 'مساعدة',
    links: [
      { label:'الأسئلة الشائعة', href:'/ar/support/faq'    },
      { label:'تواصل معنا',      href:'/ar/support/contact' },
      { label:'سياسة الإرجاع',   href:'/ar/support/returns' },
      { label:'سياسة الخصوصية',  href:'/ar/privacy'         },
      { label:'الشروط والأحكام', href:'/ar/terms'           },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark-base text-dark-text mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-black text-gold tracking-widest">EURO</span>
              <span className="text-2xl font-black text-dark-text tracking-widest"> STORE</span>
            </div>
            <p className="text-dark-muted text-sm leading-relaxed mb-6">
              منصة أزياء رقمية متكاملة. الأناقة والجودة في متناول يدك.
            </p>
            <div className="flex gap-3">
              {['📘','📸','🎵'].map((icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-pill bg-dark-elevated flex items-center justify-center
                             hover:bg-gold transition-colors text-sm">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-dark-text font-bold mb-4 text-sm uppercase tracking-widest">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-sm text-dark-muted hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-muted text-xs">
            © {new Date().getFullYear()} Euro Store — جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-2">
            <span className="text-dark-muted text-xs ml-2">الدفع:</span>
            {['💳','🏧','💵'].map((icon, i) => (
              <span key={i} className="w-9 h-6 bg-dark-elevated rounded flex items-center justify-center text-xs">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
