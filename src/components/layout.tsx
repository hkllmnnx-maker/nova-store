import type { FC, PropsWithChildren } from 'hono/jsx'

interface LayoutProps {
  title?: string
  description?: string
  currentPage?: string
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, title = 'متجر نوڤا - تسوق بأناقة', description = 'متجر إلكتروني احترافي للمنتجات الفاخرة والعصرية', currentPage = '' }) => {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />

        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* Google Fonts - Arabic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet" />

        {/* Lucide Icons */}
        <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

        {/* Alpine.js */}
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

        {/* Custom Styles */}
        <link rel="stylesheet" href="/static/style.css" />

        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
                  display: ['Cairo', 'sans-serif']
                },
                colors: {
                  brand: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49'
                  },
                  accent: {
                    50: '#fdf4ff',
                    100: '#fae8ff',
                    200: '#f5d0fe',
                    300: '#f0abfc',
                    400: '#e879f9',
                    500: '#d946ef',
                    600: '#c026d3',
                    700: '#a21caf',
                    800: '#86198f',
                    900: '#701a75'
                  },
                  ink: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617'
                  }
                },
                animation: {
                  'fade-in': 'fadeIn 0.5s ease-out',
                  'slide-up': 'slideUp 0.5s ease-out',
                  'slide-down': 'slideDown 0.3s ease-out',
                  'scale-in': 'scaleIn 0.3s ease-out',
                  'shimmer': 'shimmer 2s linear infinite',
                  'float': 'float 3s ease-in-out infinite',
                  'pulse-slow': 'pulse 3s ease-in-out infinite'
                },
                keyframes: {
                  fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                  slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                  slideDown: { '0%': { transform: 'translateY(-10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                  scaleIn: { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
                  shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
                  float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } }
                },
                boxShadow: {
                  'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
                  'card': '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.05)',
                  'card-hover': '0 10px 40px -10px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.05)',
                  'glow': '0 0 30px rgba(14, 165, 233, 0.3)',
                  'glow-accent': '0 0 30px rgba(217, 70, 239, 0.3)'
                }
              }
            }
          }
        `}}></script>
      </head>
      <body class="font-sans bg-ink-50 text-ink-900 antialiased">
        {/* Top Bar */}
        <div class="bg-ink-900 text-white text-sm">
          <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <span class="hidden md:flex items-center gap-2">
                <i data-lucide="phone" class="w-3.5 h-3.5"></i>
                <span>+966 11 234 5678</span>
              </span>
              <span class="hidden md:flex items-center gap-2">
                <i data-lucide="mail" class="w-3.5 h-3.5"></i>
                <span>support@nova.store</span>
              </span>
            </div>
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5 text-emerald-300">
                <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                <span>شحن مجاني للطلبات فوق 500 ر.س</span>
              </span>
            </div>
          </div>
        </div>

        {/* Header */}
        <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-ink-200/80 transition-all">
          <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <a href="/" class="flex items-center gap-2.5 group">
                <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-black text-xl shadow-glow group-hover:shadow-glow-accent transition-all">
                  N
                </div>
                <div>
                  <div class="font-display font-black text-xl text-ink-900 leading-none">نوڤا</div>
                  <div class="text-[10px] text-ink-500 font-medium tracking-wider">NOVA STORE</div>
                </div>
              </a>

              {/* Search Bar - Desktop */}
              <div class="hidden lg:flex flex-1 max-w-xl mx-8">
                <form action="/products" method="get" class="w-full relative group">
                  <input
                    type="text"
                    name="q"
                    placeholder="ابحث عن منتجك المفضل..."
                    class="w-full h-11 pr-12 pl-4 rounded-xl border border-ink-200 bg-ink-50/50 focus:bg-white focus:border-brand-400 focus:ring-4 focus:ring-brand-100 outline-none transition-all text-sm"
                  />
                  <button type="submit" class="absolute top-1/2 -translate-y-1/2 right-3 w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center hover:scale-105 transition-transform">
                    <i data-lucide="search" class="w-4 h-4"></i>
                  </button>
                </form>
              </div>

              {/* Nav Links */}
              <nav class="hidden md:flex items-center gap-1">
                <a href="/" class={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-brand-600 bg-brand-50' : 'text-ink-700 hover:text-brand-600 hover:bg-ink-50'}`}>الرئيسية</a>
                <a href="/products" class={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'products' ? 'text-brand-600 bg-brand-50' : 'text-ink-700 hover:text-brand-600 hover:bg-ink-50'}`}>المنتجات</a>
                <a href="/products?category=electronics" class="px-3 py-2 rounded-lg text-sm font-medium text-ink-700 hover:text-brand-600 hover:bg-ink-50 transition-colors">الإلكترونيات</a>
                <a href="/products?onsale=1" class="px-3 py-2 rounded-lg text-sm font-medium text-ink-700 hover:text-brand-600 hover:bg-ink-50 transition-colors">العروض</a>
                <a href="/admin" class={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'admin' ? 'text-brand-600 bg-brand-50' : 'text-ink-500 hover:text-brand-600 hover:bg-ink-50'}`}>الإدارة</a>
              </nav>

              {/* Actions */}
              <div class="flex items-center gap-1.5">
                <button class="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-ink-700 hover:bg-ink-100 transition" aria-label="بحث" onclick="document.getElementById('mobile-search').classList.toggle('hidden')">
                  <i data-lucide="search" class="w-5 h-5"></i>
                </button>
                <button class="hidden md:flex w-10 h-10 rounded-lg items-center justify-center text-ink-700 hover:bg-ink-100 transition relative" aria-label="المفضلة">
                  <i data-lucide="heart" class="w-5 h-5"></i>
                </button>
                <a href="/cart" class="relative w-10 h-10 rounded-lg flex items-center justify-center text-ink-700 hover:bg-ink-100 transition" aria-label="سلة التسوق">
                  <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                  <span id="cart-badge" class="hidden absolute -top-1 -left-1 w-5 h-5 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white text-[10px] font-bold flex items-center justify-center shadow-lg ring-2 ring-white">0</span>
                </a>
                <button class="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-ink-700 hover:bg-ink-100 transition" aria-label="القائمة" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
                  <i data-lucide="menu" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div id="mobile-search" class="hidden lg:hidden pb-4">
              <form action="/products" method="get" class="relative">
                <input
                  type="text"
                  name="q"
                  placeholder="ابحث عن منتج..."
                  class="w-full h-11 pr-11 pl-4 rounded-xl border border-ink-200 bg-ink-50 outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 text-sm"
                />
                <i data-lucide="search" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-4 text-ink-500"></i>
              </form>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" class="hidden md:hidden border-t border-ink-100 py-3">
              <nav class="flex flex-col gap-1">
                <a href="/" class="px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-50">الرئيسية</a>
                <a href="/products" class="px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-50">المنتجات</a>
                <a href="/products?category=electronics" class="px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-50">الإلكترونيات</a>
                <a href="/products?category=fashion" class="px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-50">الأزياء</a>
                <a href="/products?onsale=1" class="px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-50">العروض</a>
                <a href="/admin" class="px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-50">لوحة الإدارة</a>
              </nav>
            </div>
          </div>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer class="mt-20 bg-ink-950 text-ink-300">
          <div class="max-w-7xl mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              {/* Brand */}
              <div class="md:col-span-1">
                <div class="flex items-center gap-2.5 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-black text-xl">N</div>
                  <div>
                    <div class="font-display font-black text-xl text-white leading-none">نوڤا</div>
                    <div class="text-[10px] text-ink-500 font-medium tracking-wider">NOVA STORE</div>
                  </div>
                </div>
                <p class="text-sm leading-relaxed text-ink-400 mb-5">
                  وجهتك الأولى للتسوق الإلكتروني الفاخر، نقدم لك أفضل المنتجات بأسعار تنافسية وتجربة استثنائية.
                </p>
                <div class="flex items-center gap-2">
                  {[
                    { name: 'twitter', icon: 'send' },
                    { name: 'instagram', icon: 'camera' },
                    { name: 'facebook', icon: 'thumbs-up' },
                    { name: 'youtube', icon: 'play' }
                  ].map(social => (
                    <a href="#" aria-label={social.name} class="w-9 h-9 rounded-lg bg-ink-800 hover:bg-brand-600 flex items-center justify-center transition-colors">
                      <i data-lucide={social.icon} class="w-4 h-4"></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 class="font-bold text-white mb-4">روابط سريعة</h4>
                <ul class="space-y-2.5 text-sm">
                  <li><a href="/" class="hover:text-brand-400 transition-colors">الرئيسية</a></li>
                  <li><a href="/products" class="hover:text-brand-400 transition-colors">جميع المنتجات</a></li>
                  <li><a href="/products?onsale=1" class="hover:text-brand-400 transition-colors">العروض الحصرية</a></li>
                  <li><a href="#" class="hover:text-brand-400 transition-colors">الجديد</a></li>
                  <li><a href="#" class="hover:text-brand-400 transition-colors">الأكثر مبيعاً</a></li>
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
                <p class="text-sm text-ink-400 mb-4">احصل على عروضنا الحصرية وأحدث المنتجات.</p>
                <form class="flex gap-2 mb-4">
                  <input type="email" placeholder="بريدك الإلكتروني" class="flex-1 h-11 px-3 rounded-lg bg-ink-800 border border-ink-700 text-white placeholder:text-ink-500 outline-none focus:border-brand-500 text-sm" />
                  <button type="submit" class="h-11 px-4 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white font-medium hover:shadow-glow transition-shadow text-sm">
                    اشترك
                  </button>
                </form>
                <div class="flex items-center gap-3 text-ink-400">
                  <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
                  <span class="text-xs">دفع آمن 100%</span>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div class="pt-8 border-t border-ink-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-500">
              <p>© 2025 متجر نوڤا. جميع الحقوق محفوظة.</p>
              <div class="flex items-center gap-6">
                <a href="#" class="hover:text-brand-400 transition-colors">الخصوصية</a>
                <a href="#" class="hover:text-brand-400 transition-colors">الشروط</a>
                <a href="#" class="hover:text-brand-400 transition-colors">ملفات الارتباط</a>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs">طرق الدفع:</span>
                <div class="flex gap-1.5">
                  {['VISA', 'MC', 'MADA', 'APPLE'].map(method => (
                    <span class="px-2 py-1 rounded bg-ink-800 text-[10px] font-bold text-ink-300">{method}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Toast Container */}
        <div id="toast-container" class="fixed top-24 left-4 z-[100] flex flex-col gap-2 pointer-events-none"></div>

        {/* Scripts */}
        <script src="/static/cart.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
}
