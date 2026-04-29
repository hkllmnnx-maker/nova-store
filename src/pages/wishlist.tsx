import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'

export const WishlistPage: FC = () => {
  return (
    <Layout title="المفضلة - متجر نوڤا" currentPage="wishlist">
      <section class="bg-gradient-to-br from-rose-50 to-pink-50 border-b border-ink-200">
        <div class="max-w-7xl mx-auto px-4 py-10">
          <nav class="flex items-center gap-2 text-sm text-ink-500 mb-3">
            <a href="/" class="hover:text-brand-600">الرئيسية</a>
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <span class="text-ink-900 font-semibold">المفضلة</span>
          </nav>
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
              <i data-lucide="heart" class="w-7 h-7"></i>
            </div>
            <div>
              <h1 class="text-3xl font-black text-ink-900">قائمة المفضلة</h1>
              <p class="text-sm text-ink-600 mt-1">احفظ المنتجات المفضلة لديك للعودة إليها لاحقاً</p>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 py-10" x-data="wishlistData()" x-init="load()">
        {/* Empty state */}
        <template x-if="items.length === 0">
          <div class="text-center py-20">
            <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-rose-50 text-rose-500 mb-5">
              <i data-lucide="heart-off" class="w-12 h-12"></i>
            </div>
            <h2 class="text-2xl font-black text-ink-900 mb-2">قائمة المفضلة فارغة</h2>
            <p class="text-ink-500 mb-6 max-w-md mx-auto">لم تقم بإضافة أي منتج للمفضلة بعد. تصفّح المنتجات وأضف ما يعجبك!</p>
            <a href="/products" class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-bold hover:shadow-glow transition-shadow">
              <i data-lucide="package" class="w-4 h-4"></i>
              <span>تصفّح المنتجات</span>
            </a>
          </div>
        </template>

        {/* Items grid */}
        <template x-if="items.length > 0">
          <div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <p class="text-sm text-ink-700">
                <span x-text="items.length" class="font-bold text-ink-900"></span>
                <span> منتج في قائمة المفضلة</span>
              </p>
              <button
                type="button"
                class="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-sm font-semibold transition-colors"
                x-on:click="clearAll()"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
                <span>إفراغ القائمة</span>
              </button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <template x-for="item in items" x-bind:key="item.id">
                <div class="product-card group relative">
                  <button
                    type="button"
                    class="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl bg-white shadow-md flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
                    aria-label="إزالة من المفضلة"
                    x-on:click="remove(item.id)"
                  >
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                  <a x-bind:href="'/product/' + item.id" class="block product-image">
                    <img x-bind:src="item.image" x-bind:alt="item.name" loading="lazy" />
                  </a>
                  <div class="p-4">
                    <div class="text-xs text-ink-500 mb-1.5 font-medium" x-text="item.categoryAr"></div>
                    <a x-bind:href="'/product/' + item.id" class="block">
                      <h3 class="font-semibold text-ink-900 leading-snug line-clamp-2 mb-3 hover:text-brand-600 transition-colors min-h-[2.6rem]" x-text="item.name"></h3>
                    </a>
                    <div class="flex items-baseline gap-2 mb-3">
                      <span class="text-lg font-black text-ink-900" x-text="item.price.toLocaleString('ar-SA')"></span>
                      <span class="text-xs font-medium text-ink-600">ر.س</span>
                    </div>
                    <button
                      type="button"
                      class="w-full h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-500/30 transition-all active:scale-95"
                      x-on:click="moveToCart(item)"
                    >
                      <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                      <span>إضافة للسلة</span>
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        function wishlistData() {
          return {
            items: [],
            load() {
              this.items = (window.Wishlist && window.Wishlist.read()) || [];
              setTimeout(() => window.refreshIcons && window.refreshIcons(), 50);
            },
            remove(id) {
              window.Wishlist.remove(id);
              this.load();
              window.showToast && window.showToast('تمت الإزالة من المفضلة', 'info');
            },
            clearAll() {
              if (!confirm('هل تريد فعلاً إفراغ قائمة المفضلة؟')) return;
              window.Wishlist.clear();
              this.load();
              window.showToast && window.showToast('تم إفراغ القائمة', 'info');
            },
            moveToCart(item) {
              window.Cart.add({
                id: item.id, name: item.name, price: item.price,
                oldPrice: item.oldPrice, image: item.image,
                categoryAr: item.categoryAr, stock: item.stock || 99
              }, 1);
              window.showToast && window.showToast('تمت الإضافة للسلة', 'success');
            }
          }
        }
        window.addEventListener('wishlist:changed', () => {
          const ev = new CustomEvent('refresh-wishlist');
          document.dispatchEvent(ev);
        });
      ` }}
      ></script>
    </Layout>
  )
}
