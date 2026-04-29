import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'
import { ProductCard } from '../components/product-card'
import { products, categories } from '../data/products'
import { escapeHtml } from '../lib/security'

export const SearchPage: FC<{ q?: string }> = ({ q = '' }) => {
  const query = (q || '').trim().toLowerCase().slice(0, 100)
  let results = [] as typeof products
  if (query) {
    results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.categoryAr.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    )
  }

  const safeQ = escapeHtml(q)

  return (
    <Layout title={`نتائج البحث عن "${safeQ}" - متجر نوڤا`} currentPage="search">
      <section class="bg-gradient-to-br from-ink-50 to-white border-b border-ink-200">
        <div class="max-w-7xl mx-auto px-4 py-8">
          <nav class="flex items-center gap-2 text-sm text-ink-500 mb-3">
            <a href="/" class="hover:text-brand-600">الرئيسية</a>
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <span class="text-ink-900 font-semibold">البحث</span>
          </nav>
          <h1 class="text-2xl md:text-3xl font-black text-ink-900 mb-4">
            {query ? <>نتائج البحث عن: <span class="text-brand-600">"{q}"</span></> : 'البحث في المتجر'}
          </h1>
          <form action="/search" method="get" class="relative max-w-2xl">
            <input
              type="text"
              name="q"
              value={q}
              placeholder="ابحث عن منتج، تصنيف، أو علامة تجارية…"
              class="form-input h-12 pr-12 pl-4 rounded-xl text-sm"
              maxlength="100"
              autofocus
            />
            <button type="submit" class="absolute top-1/2 -translate-y-1/2 right-2 w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center">
              <i data-lucide="search" class="w-4 h-4"></i>
            </button>
          </form>
          {query && (
            <p class="mt-3 text-sm text-ink-600">
              <i data-lucide="check-circle" class="w-4 h-4 inline-block text-emerald-500"></i>
              {' '}عثرنا على <strong class="text-ink-900">{results.length}</strong> منتج
            </p>
          )}
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 py-10">
        {!query && (
          <div class="text-center py-20">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-50 text-brand-600 mb-4">
              <i data-lucide="search" class="w-10 h-10"></i>
            </div>
            <h2 class="text-xl font-bold text-ink-900 mb-2">ابدأ بالبحث</h2>
            <p class="text-ink-500 mb-6">اكتب ما تبحث عنه في الحقل أعلاه.</p>
            <div class="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
              <span class="text-xs text-ink-500">عمليات بحث شائعة:</span>
              {['سماعات', 'ساعة', 'لابتوب', 'حذاء', 'عطر', 'كاميرا'].map((s) => (
                <a href={`/search?q=${encodeURIComponent(s)}`} class="px-3 py-1.5 rounded-full bg-ink-100 hover:bg-brand-50 hover:text-brand-700 text-xs font-semibold text-ink-700 transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
        )}

        {query && results.length === 0 && (
          <div class="text-center py-20">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ink-100 text-ink-400 mb-4">
              <i data-lucide="search-x" class="w-10 h-10"></i>
            </div>
            <h2 class="text-xl font-bold text-ink-900 mb-2">لم نعثر على نتائج</h2>
            <p class="text-ink-500 mb-6">جرب كلمات أخرى أو تصفّح التصنيفات.</p>
            <div class="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
              {categories.map((c) => (
                <a href={`/products?category=${c.id}`} class="px-3 py-1.5 rounded-full bg-ink-100 hover:bg-brand-50 hover:text-brand-700 text-xs font-semibold text-ink-700 transition-colors">
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {query && results.length > 0 && (
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((p) => <ProductCard product={p} />)}
          </div>
        )}
      </section>
    </Layout>
  )
}
