import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'
import { ProductCard } from '../components/product-card'
import { products, categories, type Product } from '../data/products'

interface ProductsPageProps {
  category?: string
  q?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  onsale?: boolean
}

export const ProductsPage: FC<ProductsPageProps> = ({ category, q, sort = 'newest', minPrice, maxPrice, rating, onsale }) => {
  // Filter
  let filtered: Product[] = [...products]

  if (category) filtered = filtered.filter(p => p.category === category)
  if (q) {
    const query = q.trim().toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.nameEn.toLowerCase().includes(query) ||
      p.categoryAr.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }
  if (minPrice !== undefined) filtered = filtered.filter(p => p.price >= minPrice)
  if (maxPrice !== undefined) filtered = filtered.filter(p => p.price <= maxPrice)
  if (rating !== undefined) filtered = filtered.filter(p => p.rating >= rating)
  if (onsale) filtered = filtered.filter(p => p.oldPrice)

  // Sort
  switch (sort) {
    case 'price-asc': filtered.sort((a,b) => a.price - b.price); break
    case 'price-desc': filtered.sort((a,b) => b.price - a.price); break
    case 'rating': filtered.sort((a,b) => b.rating - a.rating); break
    case 'bestseller': filtered.sort((a,b) => b.sold - a.sold); break
    case 'newest':
    default:
      filtered.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const currentCategory = categories.find(c => c.id === category)
  const pageTitle = currentCategory ? currentCategory.name : (onsale ? 'العروض الحصرية' : (q ? `نتائج "${q}"` : 'جميع المنتجات'))

  return (
    <Layout currentPage="products" title={`${pageTitle} - متجر نوڤا`}>
      {/* Hero / Page Header */}
      <section class="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-800 to-brand-900 text-white">
        <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(circle at 30% 50%, rgba(14,165,233,0.4) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(217,70,239,0.3) 0%, transparent 40%);"></div>
        <div class="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav class="flex items-center gap-1.5 text-sm text-ink-300 mb-4">
            <a href="/" class="hover:text-white transition-colors">الرئيسية</a>
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <span class="text-white font-medium">{pageTitle}</span>
          </nav>
          <h1 class="font-display font-black text-3xl md:text-5xl mb-3">{pageTitle}</h1>
          <p class="text-ink-300 max-w-xl">
            {q ? `وجدنا ${filtered.length} منتج يطابق بحثك` : `استعرض ${filtered.length} منتج بأفضل الأسعار والجودة`}
          </p>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 py-8" x-data="productsFilter">
        <div class="grid lg:grid-cols-[280px,1fr] gap-6">
          {/* === Sidebar Filters === */}
          <aside class={`${''}`}>
            <div class="lg:sticky lg:top-24 space-y-4">
              {/* Mobile Filter Toggle */}
              <button class="lg:hidden w-full h-12 px-4 rounded-xl border border-ink-200 bg-white flex items-center justify-between font-semibold text-sm" {...{ '@click': 'mobileOpen = !mobileOpen' }}>
                <span class="flex items-center gap-2">
                  <i data-lucide="sliders-horizontal" class="w-4 h-4"></i>
                  <span>الفلاتر والترتيب</span>
                </span>
                <i data-lucide="chevron-down" class="w-4 h-4" x-bind:class="mobileOpen ? 'rotate-180' : ''" style="transition: transform 0.2s"></i>
              </button>

              <div class="lg:!block" x-show="mobileOpen || isLargeScreen" x-transition>
                {/* Search */}
                <div class="bg-white rounded-2xl border border-ink-100 p-5 mb-4">
                  <h3 class="font-bold text-sm text-ink-900 mb-3 flex items-center gap-2">
                    <i data-lucide="search" class="w-4 h-4 text-brand-500"></i>
                    <span>البحث</span>
                  </h3>
                  <form action="/products" method="get">
                    {category && <input type="hidden" name="category" value={category} />}
                    <div class="relative">
                      <input type="text" name="q" value={q || ''} placeholder="ابحث في المنتجات..." class="form-input pr-10 h-10 text-sm" />
                      <i data-lucide="search" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-ink-400"></i>
                    </div>
                  </form>
                </div>

                {/* Categories */}
                <div class="bg-white rounded-2xl border border-ink-100 p-5 mb-4">
                  <h3 class="font-bold text-sm text-ink-900 mb-3 flex items-center gap-2">
                    <i data-lucide="layers" class="w-4 h-4 text-brand-500"></i>
                    <span>التصنيف</span>
                  </h3>
                  <div class="space-y-1">
                    <a href="/products" class={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!category ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-50'}`}>
                      <span>كل التصنيفات</span>
                      <span class="text-xs text-ink-500">{products.length}</span>
                    </a>
                    {categories.map(cat => (
                      <a href={`/products?category=${cat.id}`} class={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat.id ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-50'}`}>
                        <span class="flex items-center gap-2">
                          <i data-lucide={cat.icon} class="w-3.5 h-3.5"></i>
                          {cat.name}
                        </span>
                        <span class="text-xs text-ink-500">{cat.count}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div class="bg-white rounded-2xl border border-ink-100 p-5 mb-4">
                  <h3 class="font-bold text-sm text-ink-900 mb-3 flex items-center gap-2">
                    <i data-lucide="dollar-sign" class="w-4 h-4 text-brand-500"></i>
                    <span>السعر</span>
                  </h3>
                  <form action="/products" method="get" class="space-y-3">
                    {category && <input type="hidden" name="category" value={category} />}
                    {q && <input type="hidden" name="q" value={q} />}
                    {sort && <input type="hidden" name="sort" value={sort} />}
                    <div class="grid grid-cols-2 gap-2">
                      <div>
                        <label class="text-xs text-ink-500 mb-1 block">من</label>
                        <input type="number" name="minPrice" value={minPrice ?? ''} placeholder="0" class="form-input h-9 text-sm" min="0" />
                      </div>
                      <div>
                        <label class="text-xs text-ink-500 mb-1 block">إلى</label>
                        <input type="number" name="maxPrice" value={maxPrice ?? ''} placeholder="∞" class="form-input h-9 text-sm" min="0" />
                      </div>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      {[
                        { label: 'أقل من 200', max: 200 },
                        { label: '200-500', min: 200, max: 500 },
                        { label: '500-1500', min: 500, max: 1500 },
                        { label: '+1500', min: 1500 }
                      ].map(p => {
                        const params = new URLSearchParams()
                        if (category) params.set('category', category)
                        if (q) params.set('q', q)
                        if (sort) params.set('sort', sort)
                        if (p.min !== undefined) params.set('minPrice', String(p.min))
                        if (p.max !== undefined) params.set('maxPrice', String(p.max))
                        return (
                          <a href={`/products?${params.toString()}`} class="px-2.5 py-1 rounded-lg bg-ink-50 hover:bg-brand-50 hover:text-brand-700 text-ink-700 text-xs font-medium transition-colors">{p.label}</a>
                        )
                      })}
                    </div>
                    <button type="submit" class="w-full h-9 rounded-lg bg-ink-900 hover:bg-ink-800 text-white text-sm font-semibold transition-colors">
                      تطبيق
                    </button>
                  </form>
                </div>

                {/* Rating Filter */}
                <div class="bg-white rounded-2xl border border-ink-100 p-5 mb-4">
                  <h3 class="font-bold text-sm text-ink-900 mb-3 flex items-center gap-2">
                    <i data-lucide="star" class="w-4 h-4 text-brand-500"></i>
                    <span>التقييم</span>
                  </h3>
                  <div class="space-y-1">
                    {[5, 4, 3, 2].map(r => {
                      const params = new URLSearchParams()
                      if (category) params.set('category', category)
                      if (q) params.set('q', q)
                      if (sort) params.set('sort', sort)
                      params.set('rating', String(r))
                      return (
                        <a href={`/products?${params.toString()}`} class={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${rating === r ? 'bg-amber-50' : 'hover:bg-ink-50'}`}>
                          <div class="stars">
                            {[1,2,3,4,5].map(i => (
                              <i data-lucide="star" class={`w-3.5 h-3.5 ${i <= r ? 'text-amber-400 fill-amber-400' : 'text-ink-200'}`}></i>
                            ))}
                          </div>
                          <span class="text-ink-700 text-xs">فما فوق</span>
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Special */}
                <div class="bg-white rounded-2xl border border-ink-100 p-5">
                  <h3 class="font-bold text-sm text-ink-900 mb-3 flex items-center gap-2">
                    <i data-lucide="sparkles" class="w-4 h-4 text-brand-500"></i>
                    <span>عروض خاصة</span>
                  </h3>
                  <a href="/products?onsale=1" class={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${onsale ? 'bg-red-50 text-red-700' : 'hover:bg-ink-50 text-ink-700'} transition-colors`}>
                    <i data-lucide="tag" class="w-4 h-4"></i>
                    <span>المنتجات المخفّضة</span>
                  </a>
                </div>

                {/* Reset */}
                {(category || q || minPrice !== undefined || maxPrice !== undefined || rating || onsale) && (
                  <a href="/products" class="mt-3 w-full h-10 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center gap-2 text-sm font-semibold transition-colors">
                    <i data-lucide="x" class="w-4 h-4"></i>
                    <span>مسح كل الفلاتر</span>
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* === Main Products === */}
          <div>
            {/* Toolbar */}
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 bg-white rounded-2xl border border-ink-100 p-4">
              <div class="text-sm text-ink-700">
                <span class="font-bold text-ink-900">{filtered.length}</span> منتج
                {q && <span> لـ "<span class="font-semibold text-brand-600">{q}</span>"</span>}
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-ink-500 font-medium">ترتيب:</span>
                <select onchange="window.location.href = updateUrlParam('sort', this.value)" class="form-input h-9 px-3 text-sm w-auto pr-8">
                  <option value="newest" selected={sort === 'newest'}>الأحدث</option>
                  <option value="price-asc" selected={sort === 'price-asc'}>السعر: الأقل أولاً</option>
                  <option value="price-desc" selected={sort === 'price-desc'}>السعر: الأعلى أولاً</option>
                  <option value="rating" selected={sort === 'rating'}>الأعلى تقييماً</option>
                  <option value="bestseller" selected={sort === 'bestseller'}>الأكثر مبيعاً</option>
                </select>
              </div>
            </div>

            {/* Products Grid / Empty State */}
            {filtered.length === 0 ? (
              <div class="bg-white rounded-2xl border border-ink-100 p-12 text-center">
                <div class="inline-flex w-20 h-20 rounded-2xl bg-ink-50 items-center justify-center mb-4">
                  <i data-lucide="search-x" class="w-10 h-10 text-ink-400"></i>
                </div>
                <h3 class="font-display font-bold text-2xl text-ink-900 mb-2">لم نجد أي منتج</h3>
                <p class="text-ink-500 max-w-md mx-auto mb-6">
                  لم نعثر على منتجات تطابق معايير البحث. جرّب تعديل الفلاتر أو البحث بكلمات مختلفة.
                </p>
                <a href="/products" class="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-ink-900 hover:bg-ink-800 text-white font-semibold transition-colors">
                  <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
                  <span>إعادة الفلاتر</span>
                </a>
              </div>
            ) : (
              <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
                {filtered.map(p => <ProductCard product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Alpine helper */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('alpine:init', () => {
          Alpine.data('productsFilter', () => ({
            mobileOpen: false,
            isLargeScreen: window.matchMedia('(min-width: 1024px)').matches,
            init() {
              window.addEventListener('resize', () => {
                this.isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
              });
            }
          }))
        });

        function updateUrlParam(key, value) {
          const url = new URL(window.location.href);
          if (value) url.searchParams.set(key, value);
          else url.searchParams.delete(key);
          return url.toString();
        }
      `}}></script>
    </Layout>
  )
}
