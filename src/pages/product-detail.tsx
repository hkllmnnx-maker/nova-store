import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'
import { ProductCard } from '../components/product-card'
import { type Product, getRelatedProducts } from '../data/products'

export const ProductDetailPage: FC<{ product: Product }> = ({ product }) => {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0
  const related = getRelatedProducts(product.id, product.category, 4)
  const productData = JSON.stringify({
    id: product.id,
    name: product.name,
    price: product.price,
    oldPrice: product.oldPrice,
    image: product.image,
    categoryAr: product.categoryAr,
    stock: product.stock
  }).replace(/"/g, '&quot;')

  // مراجعات تجريبية
  const reviews = [
    { name: 'أحمد محمد', rating: 5, date: '2025-04-20', comment: 'منتج رائع وجودة ممتازة، يستحق كل ريال!', verified: true },
    { name: 'فاطمة علي', rating: 5, date: '2025-04-15', comment: 'أكثر من رائع، التغليف ممتاز والشحن سريع جداً.', verified: true },
    { name: 'خالد العمري', rating: 4, date: '2025-04-10', comment: 'منتج جيد جداً، التجربة ممتازة بشكل عام.', verified: false }
  ]

  return (
    <Layout title={`${product.name} - متجر نوڤا`}>
      <section class="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav class="flex items-center gap-1.5 text-sm text-ink-500 mb-6 flex-wrap">
          <a href="/" class="hover:text-brand-600 transition-colors">الرئيسية</a>
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
          <a href="/products" class="hover:text-brand-600 transition-colors">المنتجات</a>
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
          <a href={`/products?category=${product.category}`} class="hover:text-brand-600 transition-colors">{product.categoryAr}</a>
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
          <span class="text-ink-900 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12" x-data={`{ activeImage: 0, qty: 1, images: ${JSON.stringify(product.images)}, maxStock: ${product.stock} }`}>
          {/* Images */}
          <div>
            <div class="bg-white rounded-2xl border border-ink-100 overflow-hidden mb-4 relative aspect-square">
              {/* Badges on Image */}
              <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
                {discount > 0 && (
                  <span class="badge badge-discount">
                    <i data-lucide="tag" class="w-3 h-3"></i>
                    خصم {discount}%
                  </span>
                )}
                {product.isNew && <span class="badge badge-new">جديد</span>}
                {product.isBestSeller && <span class="badge badge-best">الأكثر مبيعاً</span>}
              </div>

              <template x-for="(img, idx) in images" {...{ ':key': 'idx' }}>
                <img {...{ ':src': 'img' }} {...{ ':alt': '\'صورة \' + (idx + 1)' }} class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" {...{ ':class': 'activeImage === idx ? \'opacity-100\' : \'opacity-0\'' }} />
              </template>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div class="grid grid-cols-4 gap-3">
                <template x-for="(img, idx) in images" {...{ ':key': 'idx' }}>
                  <button {...{ '@click': 'activeImage = idx' }} class="aspect-square rounded-xl overflow-hidden border-2 transition-all" {...{ ':class': 'activeImage === idx ? \'border-brand-500 shadow-glow\' : \'border-ink-100 hover:border-ink-300\'' }}>
                    <img {...{ ':src': 'img' }} class="w-full h-full object-cover" />
                  </button>
                </template>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div class="flex items-center gap-2 mb-3">
              <a href={`/products?category=${product.category}`} class="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold hover:bg-brand-100 transition-colors">{product.categoryAr}</a>
              <span class="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
                <span>{product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'غير متوفر'}</span>
              </span>
            </div>

            <h1 class="font-display font-black text-2xl md:text-3xl lg:text-4xl text-ink-900 leading-tight mb-3">{product.name}</h1>
            <p class="text-sm text-ink-500 mb-4">{product.nameEn}</p>

            {/* Rating */}
            <div class="flex items-center gap-4 mb-6 pb-6 border-b border-ink-100">
              <div class="flex items-center gap-2">
                <div class="stars">
                  {[1,2,3,4,5].map(i => (
                    <i data-lucide="star" class={`w-4 h-4 ${i <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-ink-300'}`}></i>
                  ))}
                </div>
                <span class="font-bold text-ink-900">{product.rating}</span>
                <span class="text-sm text-ink-500">({product.reviewsCount} تقييم)</span>
              </div>
              <span class="text-ink-300">|</span>
              <span class="text-sm text-ink-500">
                <i data-lucide="package" class="w-4 h-4 inline-block ml-1"></i>
                <span class="font-semibold text-ink-700">{product.sold.toLocaleString('ar-SA')}+</span> مبيعة
              </span>
            </div>

            {/* Price */}
            <div class="bg-gradient-to-br from-brand-50 to-accent-50 rounded-2xl p-5 mb-6">
              <div class="flex items-end gap-3 flex-wrap">
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-black text-4xl text-ink-900">{product.price.toLocaleString('ar-SA')}</span>
                  <span class="text-lg font-semibold text-ink-700">ر.س</span>
                </div>
                {product.oldPrice && (
                  <>
                    <span class="text-lg text-ink-400 line-through">{product.oldPrice.toLocaleString('ar-SA')} ر.س</span>
                    <span class="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold">
                      وفّر {(product.oldPrice - product.price).toLocaleString('ar-SA')} ر.س
                    </span>
                  </>
                )}
              </div>
              <div class="flex items-center gap-2 mt-3 text-xs text-ink-600">
                <i data-lucide="info" class="w-3.5 h-3.5"></i>
                <span>السعر شامل ضريبة القيمة المضافة</span>
              </div>
            </div>

            {/* Description */}
            <div class="mb-6">
              <h3 class="font-bold text-ink-900 mb-2">عن المنتج</h3>
              <p class="text-ink-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div class="mb-6">
              <h3 class="font-bold text-ink-900 mb-3">المميزات الرئيسية</h3>
              <ul class="grid sm:grid-cols-2 gap-2">
                {product.features.map(f => (
                  <li class="flex items-start gap-2 text-sm text-ink-700">
                    <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i data-lucide="check" class="w-3 h-3"></i>
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div class="bg-white rounded-2xl border border-ink-100 p-5 mb-4">
              <div class="flex items-center gap-4 mb-4">
                <span class="font-semibold text-sm text-ink-900">الكمية:</span>
                <div class="qty-control">
                  <button type="button" {...{ '@click': 'qty > 1 && qty--' }} {...{ ':disabled': 'qty <= 1' }} aria-label="ناقص">
                    <i data-lucide="minus" class="w-4 h-4"></i>
                  </button>
                  <input type="number" {...{ 'x-model.number': 'qty' }} {...{ ':max': 'maxStock' }} min="1" />
                  <button type="button" {...{ '@click': 'qty < maxStock && qty++' }} {...{ ':disabled': 'qty >= maxStock' }} aria-label="زيادة">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                  </button>
                </div>
                <span class="text-xs text-ink-500" x-show="qty >= maxStock">أقصى كمية متاحة</span>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  class="flex-1 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-brand-500/30 transition-all active:scale-[0.98]"
                  onclick={`Cart.add(${productData.replace(/&quot;/g, '"')}, document.querySelector('[x-data]').__x.$data.qty)`}
                  disabled={product.stock === 0}
                >
                  <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                  <span>إضافة إلى السلة</span>
                </button>
                <button
                  type="button"
                  class="h-12 px-6 rounded-xl border border-ink-200 bg-white hover:border-ink-900 hover:bg-ink-900 hover:text-white text-ink-900 font-semibold flex items-center justify-center gap-2 transition-all"
                  onclick={`Cart.add(${productData.replace(/&quot;/g, '"')}, document.querySelector('[x-data]').__x.$data.qty); window.location.href='/cart'`}
                >
                  <i data-lucide="zap" class="w-5 h-5"></i>
                  <span>اشترِ الآن</span>
                </button>
                <button class="w-12 h-12 rounded-xl border border-ink-200 bg-white hover:border-red-300 hover:text-red-500 text-ink-700 flex items-center justify-center transition-all" aria-label="مفضلة">
                  <i data-lucide="heart" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div class="grid grid-cols-3 gap-3">
              {[
                { icon: 'truck', label: 'شحن سريع', sub: '24-72 ساعة' },
                { icon: 'shield-check', label: 'دفع آمن', sub: 'SSL مشفر' },
                { icon: 'rotate-ccw', label: 'إرجاع 14 يوم', sub: 'سهل ومجاني' }
              ].map(b => (
                <div class="bg-white rounded-xl border border-ink-100 p-3 text-center">
                  <div class="w-9 h-9 mx-auto rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-2">
                    <i data-lucide={b.icon} class="w-4 h-4"></i>
                  </div>
                  <div class="text-xs font-bold text-ink-900">{b.label}</div>
                  <div class="text-[10px] text-ink-500">{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Specs + Reviews */}
        <div class="bg-white rounded-2xl border border-ink-100 p-6 md:p-8 mb-12" x-data="{ tab: 'specs' }">
          <div class="flex items-center gap-2 border-b border-ink-100 -mx-6 md:-mx-8 px-6 md:px-8 mb-6 overflow-x-auto no-scrollbar">
            <button {...{ '@click': 'tab = \'specs\'' }} class="px-4 py-3 text-sm font-semibold transition-colors relative" {...{ ':class': 'tab === \'specs\' ? \'text-brand-600\' : \'text-ink-500 hover:text-ink-900\'' }}>
              <span>المواصفات</span>
              <span x-show="tab === 'specs'" class="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-500"></span>
            </button>
            <button {...{ '@click': 'tab = \'reviews\'' }} class="px-4 py-3 text-sm font-semibold transition-colors relative" {...{ ':class': 'tab === \'reviews\' ? \'text-brand-600\' : \'text-ink-500 hover:text-ink-900\'' }}>
              <span>المراجعات ({product.reviewsCount})</span>
              <span x-show="tab === 'reviews'" class="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-500"></span>
            </button>
            <button {...{ '@click': 'tab = \'shipping\'' }} class="px-4 py-3 text-sm font-semibold transition-colors relative" {...{ ':class': 'tab === \'shipping\' ? \'text-brand-600\' : \'text-ink-500 hover:text-ink-900\'' }}>
              <span>الشحن والإرجاع</span>
              <span x-show="tab === 'shipping'" class="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-500"></span>
            </button>
          </div>

          {/* Specs Tab */}
          <div x-show="tab === 'specs'" {...{ "x-transition": "" }}>
            <div class="grid md:grid-cols-2 gap-3">
              {product.specs.map(s => (
                <div class="flex items-center justify-between p-3 rounded-xl bg-ink-50">
                  <span class="text-sm text-ink-600 font-medium">{s.key}</span>
                  <span class="text-sm font-bold text-ink-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Tab */}
          <div x-show="tab === 'reviews'" {...{ "x-transition": "" }} {...{ "x-cloak": "" }}>
            <div class="grid md:grid-cols-[280px,1fr] gap-8">
              {/* Rating Summary */}
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center">
                <div class="font-display font-black text-5xl text-ink-900 mb-2">{product.rating}</div>
                <div class="flex justify-center mb-2">
                  {[1,2,3,4,5].map(i => (
                    <i data-lucide="star" class={`w-5 h-5 ${i <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-ink-300'}`}></i>
                  ))}
                </div>
                <div class="text-sm text-ink-600">بناءً على {product.reviewsCount} تقييم</div>
              </div>

              {/* Reviews List */}
              <div class="space-y-4">
                {reviews.map(r => (
                  <div class="bg-ink-50 rounded-xl p-5">
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 text-white font-bold flex items-center justify-center">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div class="font-bold text-sm text-ink-900 flex items-center gap-1.5">
                            {r.name}
                            {r.verified && (
                              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                <i data-lucide="badge-check" class="w-3 h-3"></i>
                                موثّق
                              </span>
                            )}
                          </div>
                          <div class="flex items-center gap-2 mt-0.5">
                            <div class="stars">
                              {[1,2,3,4,5].map(i => (
                                <i data-lucide="star" class={`w-3 h-3 ${i <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-ink-300'}`}></i>
                              ))}
                            </div>
                            <span class="text-xs text-ink-500">{r.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="text-sm text-ink-700 leading-relaxed mt-2">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping Tab */}
          <div x-show="tab === 'shipping'" {...{ "x-transition": "" }} {...{ "x-cloak": "" }}>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-ink-50 rounded-xl p-5">
                <div class="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-3">
                  <i data-lucide="truck" class="w-5 h-5"></i>
                </div>
                <h4 class="font-bold text-ink-900 mb-2">الشحن السريع</h4>
                <p class="text-sm text-ink-600 leading-relaxed">نوصل طلبك خلال 24-72 ساعة لجميع مناطق المملكة. الشحن مجاني للطلبات فوق 500 ر.س.</p>
              </div>
              <div class="bg-ink-50 rounded-xl p-5">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <i data-lucide="rotate-ccw" class="w-5 h-5"></i>
                </div>
                <h4 class="font-bold text-ink-900 mb-2">سياسة الإرجاع</h4>
                <p class="text-sm text-ink-600 leading-relaxed">إرجاع مجاني خلال 14 يوماً من تاريخ الاستلام، بدون أسئلة. المنتج يجب أن يكون بحالته الأصلية.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div class="flex items-end justify-between mb-6">
              <h2 class="font-display font-black text-2xl md:text-3xl text-ink-900">منتجات مشابهة</h2>
              <a href={`/products?category=${product.category}`} class="text-sm font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
                <span>عرض الكل</span>
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
              </a>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {related.map(p => <ProductCard product={p} />)}
            </div>
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{ __html: `[x-cloak]{display:none!important}` }}></style>
    </Layout>
  )
}
