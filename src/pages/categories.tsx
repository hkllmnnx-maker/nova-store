import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'
import { categories, products } from '../data/products'

export const CategoriesPage: FC = () => {
  // عدد المنتجات الفعلي لكل تصنيف
  const enriched = categories.map((c) => ({
    ...c,
    realCount: products.filter((p) => p.category === c.id).length,
    sample: products.filter((p) => p.category === c.id).slice(0, 3)
  }))

  return (
    <Layout title="التصنيفات - متجر نوڤا" currentPage="categories">
      {/* Hero */}
      <section class="relative overflow-hidden bg-gradient-to-br from-ink-950 via-brand-900 to-accent-900 text-white">
        <div class="absolute inset-0 bg-mesh opacity-30"></div>
        <div class="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <nav class="flex items-center gap-2 text-sm text-white/70 mb-4">
            <a href="/" class="hover:text-white">الرئيسية</a>
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <span class="text-white">التصنيفات</span>
          </nav>
          <h1 class="text-4xl md:text-5xl font-black mb-3">تسوّق حسب التصنيف</h1>
          <p class="text-white/80 max-w-2xl text-lg">اختر القسم الذي يناسبك واستكشف منتجاتنا المختارة بعناية فائقة.</p>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enriched.map((cat) => (
            <a
              href={`/products?category=${cat.id}`}
              class="group relative overflow-hidden rounded-3xl bg-white border border-ink-200 hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1"
            >
              <div class={`h-32 bg-gradient-to-br ${cat.color} relative overflow-hidden`}>
                <div class="absolute inset-0 bg-mesh opacity-30"></div>
                <div class="absolute top-4 right-4 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                  <i data-lucide={cat.icon} class="w-7 h-7"></i>
                </div>
                <div class="absolute bottom-3 left-4 right-4 text-white">
                  <div class="text-2xl font-black">{cat.name}</div>
                  <div class="text-xs text-white/80 tracking-wider">{cat.nameEn}</div>
                </div>
              </div>
              <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm font-semibold text-ink-700">{cat.realCount} منتج متوفر</span>
                  <span class="inline-flex items-center gap-1 text-brand-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    تسوّق الآن
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  {cat.sample.map((p) => (
                    <div class="w-14 h-14 rounded-xl overflow-hidden bg-ink-100 ring-1 ring-ink-200">
                      <img src={p.image} alt={p.name} loading="lazy" class="w-full h-full object-cover" />
                    </div>
                  ))}
                  {cat.realCount > 3 && (
                    <div class="w-14 h-14 rounded-xl bg-ink-100 flex items-center justify-center text-ink-600 font-bold text-sm">
                      +{cat.realCount - 3}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Promo */}
        <div class="mt-12 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-accent-600 p-8 md:p-12 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-mesh opacity-30"></div>
          <div class="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-xs font-bold mb-4">
                <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                <span>عروض حصرية</span>
              </div>
              <h2 class="text-3xl md:text-4xl font-black mb-3">خصومات تصل حتى 50%</h2>
              <p class="text-white/85 mb-6 max-w-md">على مجموعة مختارة من جميع التصنيفات لفترة محدودة.</p>
              <a href="/products?onsale=1" class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white text-brand-700 font-bold hover:scale-105 transition-transform">
                <span>تسوّق العروض</span>
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
              </a>
            </div>
            <div class="grid grid-cols-3 gap-3">
              {products.filter((p) => p.oldPrice).slice(0, 6).map((p) => (
                <a href={`/product/${p.id}`} class="aspect-square rounded-2xl overflow-hidden ring-2 ring-white/30 hover:ring-white transition-all">
                  <img src={p.image} alt={p.name} class="w-full h-full object-cover" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
