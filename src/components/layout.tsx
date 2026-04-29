import type { FC, PropsWithChildren } from 'hono/jsx'
import { categories } from '../data/products'

interface LayoutProps {
  title?: string
  description?: string
  currentPage?: string
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  title = 'متجر نوڤا - تسوّق بأناقة استثنائية',
  description = 'متجر نوڤا الإلكتروني — تشكيلة فاخرة من المنتجات المختارة بعناية: إلكترونيات، أزياء، منزل، جمال، رياضة وكتب. شحن سريع، دفع آمن، إرجاع مجاني.',
  currentPage = ''
}) => {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#0f172a" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />

        <script src="https://cdn.tailwindcss.com"></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />

        <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

        <link rel="stylesheet" href="/static/style.css" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Cairo','Tajawal','system-ui','sans-serif'],
                  display: ['Cairo','sans-serif']
                },
                colors: {
                  brand: { 50:'#f0f9ff',100:'#e0f2fe',200:'#bae6fd',300:'#7dd3fc',400:'#38bdf8',500:'#0ea5e9',600:'#0284c7',700:'#0369a1',800:'#075985',900:'#0c4a6e',950:'#082f49' },
                  accent: { 50:'#fdf4ff',100:'#fae8ff',200:'#f5d0fe',300:'#f0abfc',400:'#e879f9',500:'#d946ef',600:'#c026d3',700:'#a21caf',800:'#86198f',900:'#701a75' },
                  ink:    { 50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',950:'#020617' }
                },
                boxShadow: {
                  soft: '0 2px 15px -3px rgba(0,0,0,.07), 0 10px 20px -2px rgba(0,0,0,.04)',
                  card: '0 1px 3px rgba(0,0,0,.05), 0 4px 12px rgba(0,0,0,.05)',
                  cardHover: '0 24px 60px -16px rgba(15,23,42,.18), 0 8px 20px -10px rgba(14,165,233,.15)',
                  glow: '0 0 30px rgba(14,165,233,.3)',
                  glowAccent: '0 0 30px rgba(217,70,239,.3)'
                }
              }
            }
          }
        `
          }}
        ></script>
      </head>
      <body class="font-sans bg-ink-50 text-ink-900 antialiased">
        {/* === Top Bar === */}
        <div class="hidden md:block bg-ink-950 text-white text-xs">
          <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div class="flex items-center gap-5 text-ink-300">
              <span class="flex items-center gap-1.5">
                <i data-lucide="phone" class="w-3.5 h-3.5"></i>
                <span dir="ltr">+966 11 234 5678</span>
              </span>
              <span class="flex items-center gap-1.5">
                <i data-lucide="mail" class="w-3.5 h-3.5"></i>
                <span>support@nova.store</span>
              </span>
              <span class="flex items-center gap-1.5">
                <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                <span>دعم 24/7</span>
              </span>
            </div>
            <div class="flex items-center gap-5">
              <span class="flex items-center gap-1.5 text-emerald-300">
                <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                <span>شحن مجاني للطلبات +500 ر.س</span>
              </span>
              <a href="/admin" class="text-ink-300 hover:text-white transition-colors flex items-center gap-1.5">
                <i data-lucide="shield" class="w-3.5 h-3.5"></i>
                <span>لوحة الإدارة</span>
              </a>
            </div>
          </div>
        </div>

        {/* === Header === */}
        <header class="sticky top-0 z-50 glass border-b border-ink-200/60">
          <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between h-16 md:h-[72px] gap-4">
              {/* Logo */}
              <a href="/" class="flex items-center gap-2.5 group flex-shrink-0">
                <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 flex items-center justify-center text-white font-black text-xl shadow-glow group-hover:shadow-glowAccent transition-all">
                  N
                  <span class="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white"></span>
                </div>
                <div>
                  <div class="font-display font-black text-xl text-ink-900 leading-none">نوڤا</div>
                  <div class="text-[10px] text-ink-500 font-medium tracking-[0.2em]">NOVA STORE</div>
                </div>
              </a>

              {/* Search Bar - Desktop */}
              <div class="hidden lg:flex flex-1 max-w-2xl">
                <form action="/search" method="get" class="w-full relative" autocomplete="off">
                  <input
                    type="text"
                    name="q"
                    data-search-input
                    placeholder="ابحث عن منتجك المفضل…"
                    class="form-input h-11 pr-12 pl-4 rounded-xl text-sm"
                    aria-label="البحث"
                    maxlength="100"
                  />
                  <button
                    type="submit"
                    class="absolute top-1/2 -translate-y-1/2 right-2 w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center hover:shadow-glow transition-all"
                    aria-label="بحث"
                  >
                    <i data-lucide="search" class="w-4 h-4"></i>
                  </button>
                  <div data-search-dropdown class="search-dropdown"></div>
                </form>
              </div>

              {/* Nav Links - Desktop */}
              <nav class="hidden xl:flex items-center gap-1">
                <a
                  href="/"
                  class={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${currentPage === 'home' ? 'text-brand-600 bg-brand-50' : 'text-ink-700 hover:text-brand-600 hover:bg-ink-50'}`}
                >
                  الرئيسية
                </a>

                {/* Mega Menu - Categories */}
                <div class="relative has-mega-menu">
                  <button
                    type="button"
                    class={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${currentPage === 'categories' ? 'text-brand-600 bg-brand-50' : 'text-ink-700 hover:text-brand-600 hover:bg-ink-50'}`}
                  >
                    <span>التصنيفات</span>
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                  </button>
                  <div class="mega-menu">
                    <div class="grid grid-cols-2 gap-2 mb-4">
                      {categories.map((cat) => (
                        <a href={`/products?category=${cat.id}`} class="mega-cat-link">
                          <div class={`icon-wrap bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                            <i data-lucide={cat.icon} class="w-4 h-4"></i>
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="font-semibold text-sm text-ink-900">{cat.name}</div>
                            <div class="text-[11px] text-ink-500">{cat.count} منتج</div>
                          </div>
                          <i data-lucide="chevron-left" class="w-4 h-4 text-ink-400"></i>
                        </a>
                      ))}
                    </div>
                    <div class="rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 p-4 text-white flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                        <i data-lucide="zap" class="w-5 h-5"></i>
                      </div>
                      <div class="flex-1">
                        <div class="font-bold text-sm">عروض اليوم</div>
                        <div class="text-xs text-white/80">خصومات حتى 50%</div>
                      </div>
                      <a href="/products?onsale=1" class="px-3 py-1.5 rounded-lg bg-white text-brand-700 text-xs font-bold hover:bg-ink-100 transition">
                        تسوّق الآن
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href="/products"
                  class={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${currentPage === 'products' ? 'text-brand-600 bg-brand-50' : 'text-ink-700 hover:text-brand-600 hover:bg-ink-50'}`}
                >
                  جميع المنتجات
                </a>
                <a
                  href="/products?onsale=1"
                  class="px-3 py-2 rounded-lg text-sm font-semibold text-ink-700 hover:text-brand-600 hover:bg-ink-50 transition-colors flex items-center gap-1"
                >
                  <span>العروض</span>
                  <span class="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">HOT</span>
                </a>
                <a
                  href="/categories"
                  class="px-3 py-2 rounded-lg text-sm font-semibold text-ink-700 hover:text-brand-600 hover:bg-ink-50 transition-colors"
                >
                  الأقسام
                </a>
              </nav>

              {/* Actions */}
              <div class="flex items-center gap-1 flex-shrink-0">
                {/* Search btn (mobile) */}
                <button
                  class="lg:hidden btn btn-icon btn-ghost"
                  aria-label="بحث"
                  onclick="document.getElementById('mobile-search').classList.toggle('hidden'); setTimeout(()=>document.querySelector('#mobile-search input')?.focus(),50)"
                >
                  <i data-lucide="search" class="w-5 h-5"></i>
                </button>

                {/* Wishlist */}
                <a href="/wishlist" class="hidden md:flex btn btn-icon btn-ghost relative" aria-label="المفضلة">
                  <i data-lucide="heart" class="w-5 h-5"></i>
                  <span data-wishlist-badge class="hidden absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white text-[10px] font-bold flex items-center justify-center shadow ring-2 ring-white"></span>
                </a>

                {/* Account */}
                <a href="/login" class="hidden md:flex btn btn-icon btn-ghost" aria-label="حسابي">
                  <i data-lucide="user" class="w-5 h-5"></i>
                </a>

                {/* Cart */}
                <a href="/cart" class="btn btn-icon btn-ghost relative" aria-label="سلة التسوق">
                  <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                  <span data-cart-badge class="hidden absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-accent-500 to-pink-600 text-white text-[10px] font-bold flex items-center justify-center shadow ring-2 ring-white"></span>
                </a>

                {/* Mobile Menu */}
                <button
                  class="xl:hidden btn btn-icon btn-ghost"
                  aria-label="القائمة"
                  onclick="toggleDrawer(true)"
                >
                  <i data-lucide="menu" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div id="mobile-search" class="hidden lg:hidden pb-3">
              <form action="/search" method="get" class="relative" autocomplete="off">
                <input
                  type="text"
                  name="q"
                  data-search-input
                  placeholder="ابحث عن منتج…"
                  class="form-input h-11 pr-11 pl-4 text-sm"
                  maxlength="100"
                />
                <i data-lucide="search" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-4 text-ink-500 pointer-events-none"></i>
                <div data-search-dropdown class="search-dropdown"></div>
              </form>
            </div>
          </div>
        </header>

        {/* === Mobile Drawer === */}
        <div id="drawer-backdrop" class="drawer-backdrop" onclick="toggleDrawer(false)"></div>
        <aside id="mobile-drawer" class="drawer">
          <div class="p-5 border-b border-ink-100 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-black">N</div>
              <span class="font-display font-black text-lg text-ink-900">نوڤا</span>
            </div>
            <button class="btn btn-icon btn-ghost" aria-label="إغلاق" onclick="toggleDrawer(false)">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <nav class="p-3">
            <a href="/" class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-ink-50">
              <i data-lucide="home" class="w-4 h-4 text-brand-500"></i>
              <span>الرئيسية</span>
            </a>
            <a href="/products" class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-ink-50">
              <i data-lucide="package" class="w-4 h-4 text-brand-500"></i>
              <span>جميع المنتجات</span>
            </a>
            <a href="/categories" class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-ink-50">
              <i data-lucide="layout-grid" class="w-4 h-4 text-brand-500"></i>
              <span>الأقسام</span>
            </a>
            <a href="/products?onsale=1" class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-ink-50">
              <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i>
              <span>العروض</span>
              <span class="ml-auto text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">HOT</span>
            </a>
            <a href="/wishlist" class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-ink-50">
              <i data-lucide="heart" class="w-4 h-4 text-rose-500"></i>
              <span>المفضلة</span>
            </a>
            <a href="/cart" class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-ink-50">
              <i data-lucide="shopping-bag" class="w-4 h-4 text-brand-500"></i>
              <span>سلتي</span>
            </a>
            <a href="/login" class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-ink-50">
              <i data-lucide="user" class="w-4 h-4 text-brand-500"></i>
              <span>حسابي</span>
            </a>

            <div class="mt-4 mb-2 px-3 text-[11px] font-bold text-ink-400 uppercase tracking-widest">التصنيفات</div>
            {categories.map((cat) => (
              <a href={`/products?category=${cat.id}`} class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-700 hover:bg-ink-50">
                <div class={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} text-white flex items-center justify-center`}>
                  <i data-lucide={cat.icon} class="w-3.5 h-3.5"></i>
                </div>
                <span class="flex-1">{cat.name}</span>
                <span class="text-xs text-ink-400">{cat.count}</span>
              </a>
            ))}

            <div class="mt-4 pt-4 border-t border-ink-100">
              <a href="/admin" class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-ink-700 hover:bg-ink-50">
                <i data-lucide="shield" class="w-4 h-4 text-violet-500"></i>
                <span>لوحة الإدارة</span>
              </a>
            </div>
          </nav>

          <div class="mt-auto p-5 border-t border-ink-100 bg-ink-50">
            <div class="text-xs font-bold text-ink-700 mb-2">تواصل معنا</div>
            <div class="space-y-1.5 text-xs text-ink-600">
              <div class="flex items-center gap-2"><i data-lucide="phone" class="w-3.5 h-3.5"></i><span dir="ltr">+966 11 234 5678</span></div>
              <div class="flex items-center gap-2"><i data-lucide="mail" class="w-3.5 h-3.5"></i><span>support@nova.store</span></div>
            </div>
          </div>
        </aside>

        {/* === Main === */}
        <main>{children}</main>

        {/* === Footer === */}
        <footer class="mt-20 bg-ink-950 text-ink-300 relative overflow-hidden">
          <div class="absolute inset-0 bg-mesh opacity-50 pointer-events-none"></div>
          <div class="relative max-w-7xl mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              {/* Brand */}
              <div class="md:col-span-1">
                <div class="flex items-center gap-2.5 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-black text-xl shadow-glow">N</div>
                  <div>
                    <div class="font-display font-black text-xl text-white leading-none">نوڤا</div>
                    <div class="text-[10px] text-ink-500 font-medium tracking-[0.2em]">NOVA STORE</div>
                  </div>
                </div>
                <p class="text-sm leading-relaxed text-ink-400 mb-5">
                  وجهتك الأولى للتسوّق الإلكتروني الفاخر. منتجات مختارة بعناية وتجربة استثنائية.
                </p>
                <div class="flex items-center gap-2">
                  {[
                    { name: 'twitter', icon: 'send' },
                    { name: 'instagram', icon: 'camera' },
                    { name: 'facebook', icon: 'thumbs-up' },
                    { name: 'youtube', icon: 'play' }
                  ].map((s) => (
                    <a href="#" aria-label={s.name} class="w-10 h-10 rounded-xl bg-ink-800 hover:bg-brand-600 flex items-center justify-center transition-colors">
                      <i data-lucide={s.icon} class="w-4 h-4"></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 class="font-bold text-white mb-4">روابط سريعة</h4>
                <ul class="space-y-2.5 text-sm">
                  <li><a href="/" class="hover:text-brand-400 transition-colors">الرئيسية</a></li>
                  <li><a href="/products" class="hover:text-brand-400 transition-colors">جميع المنتجات</a></li>
                  <li><a href="/products?onsale=1" class="hover:text-brand-400 transition-colors">العروض الحصرية</a></li>
                  <li><a href="/categories" class="hover:text-brand-400 transition-colors">التصنيفات</a></li>
                  <li><a href="/wishlist" class="hover:text-brand-400 transition-colors">المفضلة</a></li>
                  <li><a href="/admin" class="hover:text-brand-400 transition-colors">لوحة الإدارة</a></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h4 class="font-bold text-white mb-4">خدمة العملاء</h4>
                <ul class="space-y-2.5 text-sm">
                  <li><a href="#" class="hover:text-brand-400 transition-colors">الأسئلة الشائعة</a></li>
                  <li><a href="#" class="hover:text-brand-400 transition-colors">سياسة الإرجاع</a></li>
                  <li><a href="#" class="hover:text-brand-400 transition-colors">الشحن والتوصيل</a></li>
                  <li><a href="#" class="hover:text-brand-400 transition-colors">طرق الدفع</a></li>
                  <li><a href="#" class="hover:text-brand-400 transition-colors">تواصل معنا</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 class="font-bold text-white mb-4">اشترك في النشرة</h4>
                <p class="text-sm text-ink-400 mb-4">احصل على عروضنا الحصرية وخصم 10% على طلبك الأول.</p>
                <form
                  class="flex gap-2 mb-4"
                  onsubmit="event.preventDefault(); showToast('شكراً لاشتراكك في نشرة نوڤا!', 'success'); this.reset();"
                >
                  <input
                    type="email"
                    required
                    placeholder="بريدك الإلكتروني"
                    class="flex-1 h-11 px-3 rounded-xl bg-ink-800 border border-ink-700 text-white placeholder:text-ink-500 outline-none focus:border-brand-500 text-sm transition-colors"
                  />
                  <button type="submit" class="h-11 px-4 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-semibold hover:shadow-glow transition-shadow text-sm">
                    اشتراك
                  </button>
                </form>
                <div class="flex items-center gap-3 text-ink-400">
                  <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
                  <span class="text-xs">دفع آمن 100% • تشفير SSL 256-bit</span>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div class="pt-8 border-t border-ink-800/70 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-500">
              <p>© 2025 متجر نوڤا. جميع الحقوق محفوظة.</p>
              <div class="flex items-center gap-6">
                <a href="#" class="hover:text-brand-400 transition-colors">الخصوصية</a>
                <a href="#" class="hover:text-brand-400 transition-colors">الشروط</a>
                <a href="#" class="hover:text-brand-400 transition-colors">ملفات الارتباط</a>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs">طرق الدفع:</span>
                <div class="flex gap-1.5">
                  {['VISA', 'MC', 'MADA', 'APPLE'].map((m) => (
                    <span class="px-2 py-1 rounded bg-ink-800 text-[10px] font-bold text-ink-300">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Toast Container */}
        <div id="toast-container"></div>

        {/* Scripts */}
        <script src="/static/cart.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
}
