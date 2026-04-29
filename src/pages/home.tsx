import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'
import { ProductCard } from '../components/product-card'
import { products, categories } from '../data/products'

export const HomePage: FC = () => {
  const featured = products.filter(p => p.isFeatured).slice(0, 8)
  const onSale = products.filter(p => p.oldPrice).sort((a, b) => {
    const da = ((a.oldPrice! - a.price) / a.oldPrice!) * 100
    const db = ((b.oldPrice! - b.price) / b.oldPrice!) * 100
    return db - da
  }).slice(0, 4)
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4)

  return (
    <Layout currentPage="home">
      {/* === Hero Section === */}
      <section class="relative overflow-hidden bg-gradient-to-br from-ink-50 via-white to-brand-50">
        {/* Decorative blobs */}
        <div class="hero-blob bg-brand-300 w-[400px] h-[400px] -top-20 -right-20"></div>
        <div class="hero-blob bg-accent-300 w-[400px] h-[400px] bottom-0 -left-20" style="animation-delay: 2s"></div>

        <div class="relative max-w-7xl mx-auto px-4 py-12 md:py-20 lg:py-28">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            {/* Right Content */}
            <div class="animate-slide-up">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-ink-200 shadow-soft mb-5">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span class="text-xs font-semibold text-ink-700">عرض الافتتاح • خصم يصل 50%</span>
              </div>

              <h1 class="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-tight text-ink-900 mb-5">
                تسوّق ما يُلهمك
                <br />
                <span class="gradient-text">بأناقة لا تُضاهى</span>
              </h1>

              <p class="text-base md:text-lg text-ink-600 leading-relaxed mb-8 max-w-xl">
                اكتشف مجموعة فريدة من المنتجات الفاخرة المختارة بعناية لتقديم تجربة تسوّق استثنائية. جودة عالية، شحن سريع، ودفع آمن.
              </p>

              {/* CTAs */}
              <div class="flex flex-wrap gap-3 mb-10">
                <a href="/products" class="group inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-ink-900 hover:bg-ink-800 text-white font-semibold shadow-xl hover:shadow-2xl transition-all">
                  <span>تسوّق الآن</span>
                  <i data-lucide="arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform"></i>
                </a>
                <a href="/products?onsale=1" class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white border border-ink-200 hover:border-brand-400 hover:bg-brand-50 text-ink-900 font-semibold transition-all">
                  <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i>
                  <span>العروض الحصرية</span>
                </a>
              </div>

              {/* Trust Stats */}
              <div class="grid grid-cols-3 gap-4 max-w-md">
                <div>
                  <div class="font-display font-black text-2xl text-ink-900">+10K</div>
                  <div class="text-xs text-ink-500 mt-1">عميل سعيد</div>
                </div>
                <div>
                  <div class="font-display font-black text-2xl text-ink-900">+500</div>
                  <div class="text-xs text-ink-500 mt-1">منتج فاخر</div>
                </div>
                <div>
                  <div class="font-display font-black text-2xl text-ink-900">4.9★</div>
                  <div class="text-xs text-ink-500 mt-1">تقييم العملاء</div>
                </div>
              </div>
            </div>

            {/* Left Visual */}
            <div class="relative animate-fade-in">
              <div class="relative">
                {/* Main Product Card */}
                <div class="relative bg-white rounded-3xl shadow-2xl p-6 hover-lift z-20">
                  <div class="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-ink-100 to-ink-50 mb-4">
                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" alt="منتج مميز" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-xs text-ink-500">الإلكترونيات</div>
                      <div class="font-bold text-ink-900">سماعات Pro Max</div>
                      <div class="flex items-baseline gap-2 mt-1">
                        <span class="text-xl font-black text-brand-600">899</span>
                        <span class="text-xs text-ink-400 line-through">1,299</span>
                        <span class="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">-31%</span>
                      </div>
                    </div>
                    <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white shadow-glow">
                      <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                    </div>
                  </div>
                </div>

                {/* Floating Badge - Top */}
                <div class="absolute -top-4 -right-4 z-30 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 animate-float">
                  <div class="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <i data-lucide="truck" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <div class="text-[10px] text-ink-500">شحن مجاني</div>
                    <div class="text-sm font-bold text-ink-900">للطلبات +500</div>
                  </div>
                </div>

                {/* Floating Badge - Bottom */}
                <div class="absolute -bottom-4 -left-4 z-30 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 animate-float" style="animation-delay: 1s">
                  <div class="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                    <i data-lucide="shield-check" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <div class="text-[10px] text-ink-500">دفع آمن</div>
                    <div class="text-sm font-bold text-ink-900">بضمان %100</div>
                  </div>
                </div>

                {/* Background Card */}
                <div class="absolute top-8 -left-8 right-8 bottom-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-3xl -z-10 opacity-30 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Trust Bar === */}
      <section class="bg-white border-y border-ink-100">
        <div class="max-w-7xl mx-auto px-4 py-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'truck', title: 'شحن سريع', desc: 'توصيل خلال 24-72 ساعة', color: 'from-blue-500 to-cyan-500' },
              { icon: 'shield-check', title: 'دفع آمن', desc: 'حماية بمستوى البنوك', color: 'from-emerald-500 to-teal-500' },
              { icon: 'badge-check', title: 'ضمان الجودة', desc: 'منتجات أصلية 100%', color: 'from-violet-500 to-purple-500' },
              { icon: 'headphones', title: 'دعم العملاء', desc: 'فريق دعم 24/7', color: 'from-amber-500 to-orange-500' }
            ].map(item => (
              <div class="flex items-center gap-3 group">
                <div class={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                  <i data-lucide={item.icon} class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="font-bold text-sm text-ink-900">{item.title}</div>
                  <div class="text-xs text-ink-500 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Categories === */}
      <section class="max-w-7xl mx-auto px-4 py-16">
        <div class="flex items-end justify-between mb-8">
          <div>
            <div class="text-sm text-brand-600 font-bold mb-2">تصفّح بسهولة</div>
            <h2 class="font-display font-black text-3xl md:text-4xl text-ink-900">تسوّق حسب التصنيف</h2>
          </div>
          <a href="/products" class="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
            <span>الكل</span>
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </a>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map(cat => (
            <a href={`/products?category=${cat.id}`} class="group relative rounded-2xl bg-white border border-ink-100 p-5 text-center hover:shadow-card-hover hover:border-transparent transition-all">
              <div class={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform mb-3`}>
                <i data-lucide={cat.icon} class="w-6 h-6"></i>
              </div>
              <div class="font-bold text-sm text-ink-900 mb-0.5">{cat.name}</div>
              <div class="text-xs text-ink-500">{cat.count} منتج</div>
            </a>
          ))}
        </div>
      </section>

      {/* === Featured Products === */}
      <section class="max-w-7xl mx-auto px-4 py-12">
        <div class="flex items-end justify-between mb-8">
          <div>
            <div class="text-sm text-accent-600 font-bold mb-2">مختارة بعناية</div>
            <h2 class="font-display font-black text-3xl md:text-4xl text-ink-900">المنتجات المميّزة</h2>
            <p class="text-ink-500 mt-2 max-w-lg">أفضل المنتجات التي اخترناها لك بناءً على الجودة والأداء.</p>
          </div>
          <a href="/products" class="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
            <span>عرض الكل</span>
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </a>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map(p => <ProductCard product={p} />)}
        </div>
      </section>

      {/* === Promo Banner === */}
      <section class="max-w-7xl mx-auto px-4 py-12">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-ink-700 p-8 md:p-10 text-white">
            <div class="absolute top-0 left-0 w-40 h-40 bg-brand-500 rounded-full filter blur-3xl opacity-30"></div>
            <div class="relative z-10">
              <span class="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-bold mb-4">عرض محدود</span>
              <h3 class="font-display font-black text-3xl md:text-4xl leading-tight mb-3">
                خصم 50% على<br />الإلكترونيات
              </h3>
              <p class="text-ink-300 mb-6 max-w-xs">اكتشف أحدث الأجهزة بأسعار لا تقاوم. عرض ينتهي قريباً.</p>
              <a href="/products?category=electronics" class="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-ink-900 font-semibold hover:bg-ink-100 transition-colors">
                <span>تسوّق الآن</span>
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
              </a>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-500 to-pink-600 p-8 md:p-10 text-white">
            <div class="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full filter blur-3xl opacity-20"></div>
            <div class="relative z-10">
              <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold mb-4">جديدنا</span>
              <h3 class="font-display font-black text-3xl md:text-4xl leading-tight mb-3">
                مجموعة الأزياء<br />الجديدة
              </h3>
              <p class="text-pink-100 mb-6 max-w-xs">إطلالات عصرية وفاخرة لشتاء استثنائي.</p>
              <a href="/products?category=fashion" class="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-accent-700 font-semibold hover:bg-pink-50 transition-colors">
                <span>اكتشف الجديد</span>
                <i data-lucide="sparkles" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === Best Sellers === */}
      <section class="max-w-7xl mx-auto px-4 py-12">
        <div class="flex items-end justify-between mb-8">
          <div>
            <div class="text-sm text-amber-600 font-bold mb-2 flex items-center gap-1.5">
              <i data-lucide="flame" class="w-4 h-4"></i>
              <span>الأكثر طلباً</span>
            </div>
            <h2 class="font-display font-black text-3xl md:text-4xl text-ink-900">الأكثر مبيعاً</h2>
          </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map(p => <ProductCard product={p} />)}
        </div>
      </section>

      {/* === Sale Section === */}
      <section class="max-w-7xl mx-auto px-4 py-12">
        <div class="rounded-3xl bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-6 md:p-10 border border-red-100">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-3">
                <i data-lucide="tag" class="w-3.5 h-3.5"></i>
                <span>عروض حصرية</span>
              </div>
              <h2 class="font-display font-black text-3xl md:text-4xl text-ink-900">خصومات تصل إلى 50%</h2>
              <p class="text-ink-600 mt-2">منتجات رائعة بأسعار أروع - الكمية محدودة</p>
            </div>
            <a href="/products?onsale=1" class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-ink-900 text-white font-semibold hover:bg-ink-800 transition-colors">
              <span>كل العروض</span>
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {onSale.map(p => <ProductCard product={p} />)}
          </div>
        </div>
      </section>

      {/* === Newsletter === */}
      <section class="max-w-7xl mx-auto px-4 py-16">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 p-8 md:p-14 text-center text-white">
          <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 50%, white 0%, transparent 40%), radial-gradient(circle at 80% 50%, white 0%, transparent 40%);"></div>
          <div class="relative z-10 max-w-xl mx-auto">
            <div class="inline-flex w-14 h-14 rounded-2xl bg-white/20 backdrop-blur items-center justify-center mb-5">
              <i data-lucide="mail" class="w-6 h-6"></i>
            </div>
            <h2 class="font-display font-black text-3xl md:text-4xl mb-3">انضم لقائمتنا البريدية</h2>
            <p class="text-white/90 mb-7 leading-relaxed">احصل على خصم 10% على طلبك الأول، وكن أول من يعرف بأحدث المنتجات والعروض الحصرية.</p>
            <form class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onsubmit="event.preventDefault(); showToast('شكراً لاشتراكك! تحقق من بريدك للحصول على الخصم.', 'success'); this.reset();">
              <input type="email" required placeholder="بريدك الإلكتروني" class="flex-1 h-12 px-4 rounded-xl bg-white/95 backdrop-blur text-ink-900 placeholder:text-ink-500 outline-none focus:ring-4 focus:ring-white/30" />
              <button type="submit" class="h-12 px-6 rounded-xl bg-ink-900 text-white font-semibold hover:bg-ink-800 transition-colors">
                اشتراك
              </button>
            </form>
            <p class="text-xs text-white/70 mt-4">لن نشارك بريدك مع أي طرف ثالث.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
