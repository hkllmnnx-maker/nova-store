import type { FC } from 'hono/jsx'
import type { Product } from '../data/products'

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0
  const productData = JSON.stringify({
    id: product.id,
    name: product.name,
    price: product.price,
    oldPrice: product.oldPrice,
    image: product.image,
    categoryAr: product.categoryAr,
    stock: product.stock
  }).replace(/"/g, '&quot;')

  return (
    <div class="product-card group">
      {/* Badges */}
      <div class="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        {discount > 0 && (
          <span class="badge badge-discount">
            <i data-lucide="tag" class="w-3 h-3"></i>
            {discount}%-
          </span>
        )}
        {product.isNew && <span class="badge badge-new">جديد</span>}
        {product.isBestSeller && !product.isNew && <span class="badge badge-best">الأكثر مبيعاً</span>}
      </div>

      {/* Quick Actions */}
      <div class="quick-actions">
        <button class="quick-action-btn" aria-label="إضافة للمفضلة" title="المفضلة">
          <i data-lucide="heart" class="w-4 h-4"></i>
        </button>
        <a href={`/product/${product.id}`} class="quick-action-btn" aria-label="عرض المنتج" title="عرض سريع">
          <i data-lucide="eye" class="w-4 h-4"></i>
        </a>
      </div>

      {/* Image */}
      <a href={`/product/${product.id}`} class="block product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </a>

      {/* Content */}
      <div class="p-4">
        <div class="text-xs text-ink-500 mb-1.5 font-medium">{product.categoryAr}</div>
        <a href={`/product/${product.id}`} class="block">
          <h3 class="font-semibold text-ink-900 leading-snug line-clamp-2 mb-2 hover:text-brand-600 transition-colors min-h-[2.6rem]">
            {product.name}
          </h3>
        </a>

        {/* Rating */}
        <div class="flex items-center gap-1.5 mb-3">
          <div class="stars">
            {[1,2,3,4,5].map(i => (
              <i data-lucide="star" class={`w-3.5 h-3.5 ${i <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-ink-300'}`}></i>
            ))}
          </div>
          <span class="text-xs font-semibold text-ink-700">{product.rating}</span>
          <span class="text-xs text-ink-500">({product.reviewsCount})</span>
        </div>

        {/* Price */}
        <div class="flex items-end justify-between gap-2 mb-3">
          <div class="flex flex-col">
            <div class="flex items-baseline gap-2 flex-wrap">
              <span class="text-lg font-black text-ink-900">{product.price.toLocaleString('ar-SA')}</span>
              <span class="text-xs font-medium text-ink-600">ر.س</span>
            </div>
            {product.oldPrice && (
              <span class="text-xs text-ink-400 line-through">{product.oldPrice.toLocaleString('ar-SA')} ر.س</span>
            )}
          </div>
          {product.stock < 20 && product.stock > 0 && (
            <span class="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
              متبقي {product.stock}
            </span>
          )}
        </div>

        {/* Actions */}
        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-500/30 transition-all active:scale-95"
            onclick={`addToCartFromCard('${productData}')`}
          >
            <i data-lucide="shopping-cart" class="w-4 h-4"></i>
            <span>إضافة</span>
          </button>
          <a
            href={`/product/${product.id}`}
            class="h-10 px-3 rounded-xl border border-ink-200 text-ink-700 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 flex items-center justify-center transition-all"
            aria-label="التفاصيل"
          >
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
