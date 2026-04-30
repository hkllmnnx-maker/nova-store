import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'

export const CartPage: FC = () => {
  return (
    <Layout title="سلة التسوق - متجر نوڤا" currentPage="cart">
      <section class="max-w-7xl mx-auto px-4 py-8" x-data="cartPage" x-init="init()">
        {/* Header */}
        <div class="mb-8">
          <nav class="flex items-center gap-1.5 text-sm text-ink-500 mb-3" aria-label="مسار التنقل">
            <a href="/" class="hover:text-brand-600 transition-colors">الرئيسية</a>
            <i data-lucide="chevron-left" class="w-4 h-4" aria-hidden="true"></i>
            <span class="text-ink-900 font-medium">سلة التسوق</span>
          </nav>
          <h1 class="font-display font-black text-3xl md:text-4xl text-ink-900 flex items-center gap-3">
            <i data-lucide="shopping-bag" class="w-8 h-8 text-brand-500" aria-hidden="true"></i>
            <span>سلة التسوق</span>
            <span class="text-base font-medium text-ink-500" x-show="items.length > 0" x-text="`(${items.length} منتج)`"></span>
          </h1>
        </div>

        {/* Empty Cart */}
        <div x-show="items.length === 0" x-cloak class="bg-white rounded-3xl border border-ink-100 p-12 text-center">
          <div class="inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-50 to-accent-50 items-center justify-center mb-6">
            <i data-lucide="shopping-cart" class="w-12 h-12 text-brand-500" aria-hidden="true"></i>
          </div>
          <h2 class="font-display font-black text-2xl md:text-3xl text-ink-900 mb-3">سلتك فارغة</h2>
          <p class="text-ink-500 max-w-md mx-auto mb-8">
            لم تقم بإضافة أي منتج بعد. اكتشف مجموعتنا الواسعة من المنتجات المميزة.
          </p>
          <a href="/products" class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-semibold hover:shadow-xl hover:shadow-brand-500/30 transition-all">
            <i data-lucide="sparkles" class="w-4 h-4" aria-hidden="true"></i>
            <span>تسوّق الآن</span>
          </a>
        </div>

        {/* Cart Content */}
        <div x-show="items.length > 0" x-cloak class="grid lg:grid-cols-[1fr,380px] gap-6">
          {/* Items List */}
          <div class="space-y-3">
            <template x-for="item in items" {...{ ':key': 'item.id' }}>
              <div class="bg-white rounded-2xl border border-ink-100 p-4 flex gap-4 hover:shadow-card transition-shadow">
                <a {...{ ':href': '\'/product/\' + item.id' }} class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-ink-50">
                  <img {...{ ':src': 'item.image', ':alt': 'item.name' }} loading="lazy" class="w-full h-full object-cover hover:scale-105 transition-transform" />
                </a>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2 mb-1.5">
                    <a {...{ ':href': '\'/product/\' + item.id' }} class="font-bold text-sm md:text-base text-ink-900 line-clamp-2 hover:text-brand-600 transition-colors" x-text="item.name"></a>
                    <button {...{ '@click': 'removeItem(item.id)' }} type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-400 hover:bg-red-50 hover:text-red-500 transition-colors flex-shrink-0" aria-label="حذف من السلة">
                      <i data-lucide="trash-2" class="w-4 h-4" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div class="text-xs text-ink-500 mb-3" x-text="item.category"></div>

                  {/* Stock indicator */}
                  <div class="text-[11px] text-ink-500 mb-2" x-show="item.stock <= 10">
                    <span class="text-amber-600 font-semibold">
                      <i data-lucide="alert-triangle" class="inline w-3 h-3" aria-hidden="true"></i>
                      <span>متبقي </span><span x-text="item.stock"></span> فقط
                    </span>
                  </div>

                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <div class="qty-control" role="group" aria-label="تعديل الكمية">
                      <button type="button" {...{ '@click': 'updateQty(item.id, item.quantity - 1)', ':disabled': 'item.quantity <= 1' }} aria-label="إنقاص الكمية">
                        <i data-lucide="minus" class="w-3.5 h-3.5" aria-hidden="true"></i>
                      </button>
                      <input
                        type="number"
                        {...{ ':value': 'item.quantity', '@change': 'updateQty(item.id, parseInt($event.target.value) || 1)', ':max': 'item.stock' }}
                        min="1"
                        aria-label="الكمية"
                      />
                      <button type="button" {...{ '@click': 'updateQty(item.id, item.quantity + 1)', ':disabled': 'item.quantity >= item.stock' }} aria-label="زيادة الكمية">
                        <i data-lucide="plus" class="w-3.5 h-3.5" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div class="text-left">
                      <div class="flex items-baseline gap-1.5">
                        <span class="font-display font-black text-lg text-ink-900" x-text="(item.price * item.quantity).toLocaleString('ar-SA')"></span>
                        <span class="text-xs font-medium text-ink-600">ر.س</span>
                      </div>
                      <div class="text-xs text-ink-500" x-show="item.quantity > 1" x-text="`${item.price.toLocaleString('ar-SA')} ر.س × ${item.quantity}`"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            {/* Continue Shopping */}
            <div class="flex items-center justify-between pt-4">
              <a href="/products" class="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
                <i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i>
                <span>متابعة التسوق</span>
              </a>
              <button type="button" {...{ '@click': 'clearCart()' }} class="text-sm font-semibold text-red-500 hover:text-red-600 inline-flex items-center gap-1.5">
                <i data-lucide="trash" class="w-4 h-4" aria-hidden="true"></i>
                <span>مسح السلة</span>
              </button>
            </div>
          </div>

          {/* Order Summary - Sticky */}
          <aside aria-label="ملخص الطلب">
            <div class="lg:sticky lg:top-24 bg-white rounded-2xl border border-ink-100 p-6 shadow-card">
              <h3 class="font-display font-black text-xl text-ink-900 mb-5 pb-4 border-b border-ink-100 flex items-center gap-2">
                <i data-lucide="receipt" class="w-5 h-5 text-brand-500" aria-hidden="true"></i>
                <span>ملخص الطلب</span>
              </h3>

              <div class="space-y-3 mb-5">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-ink-600">المجموع الفرعي</span>
                  <span class="font-bold text-ink-900"><span x-text="subtotal.toLocaleString('ar-SA')"></span> ر.س</span>
                </div>
                <div class="flex items-center justify-between text-sm" x-show="savings > 0">
                  <span class="text-emerald-600 flex items-center gap-1">
                    <i data-lucide="tag" class="w-3.5 h-3.5" aria-hidden="true"></i>
                    <span>وفّرت</span>
                  </span>
                  <span class="font-bold text-emerald-600">-<span x-text="savings.toLocaleString('ar-SA')"></span> ر.س</span>
                </div>

                {/* Coupon line */}
                <div class="flex items-center justify-between text-sm" x-show="couponDiscount > 0">
                  <span class="text-violet-600 flex items-center gap-1.5">
                    <i data-lucide="ticket" class="w-3.5 h-3.5" aria-hidden="true"></i>
                    <span>كوبون <span class="font-bold" x-text="couponCode"></span></span>
                  </span>
                  <span class="font-bold text-violet-600">-<span x-text="couponDiscount.toLocaleString('ar-SA')"></span> ر.س</span>
                </div>

                <div class="flex items-center justify-between text-sm">
                  <span class="text-ink-600 flex items-center gap-1">
                    <i data-lucide="truck" class="w-3.5 h-3.5" aria-hidden="true"></i>
                    <span>الشحن</span>
                  </span>
                  <span class="font-bold" {...{ ':class': 'shipping === 0 ? \'text-emerald-600\' : \'text-ink-900\'' }}>
                    <span x-show="shipping === 0">مجاني</span>
                    <span x-show="shipping > 0"><span x-text="shipping.toLocaleString('ar-SA')"></span> ر.س</span>
                  </span>
                </div>

                <div x-show="shipping > 0 && subtotal < 500" class="bg-amber-50 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
                  <i data-lucide="info" class="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true"></i>
                  <span>أضف <span class="font-bold" x-text="(500 - subtotal).toLocaleString('ar-SA')"></span> ر.س للحصول على شحن مجاني</span>
                </div>
                <div x-show="shipping === 0 && subtotal > 0" class="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2">
                  <i data-lucide="check-circle-2" class="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true"></i>
                  <span>تم تطبيق الشحن المجاني!</span>
                </div>
              </div>

              <div class="pt-4 border-t border-ink-100 mb-5">
                <div class="flex items-end justify-between">
                  <span class="font-bold text-ink-900">الإجمالي</span>
                  <div class="text-left">
                    <div class="flex items-baseline gap-1">
                      <span class="font-display font-black text-2xl text-ink-900" x-text="total.toLocaleString('ar-SA')"></span>
                      <span class="text-sm font-semibold text-ink-700">ر.س</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code (real backend) */}
              <div class="mb-5">
                <div x-show="!appliedCoupon" x-cloak>
                  <label class="form-label text-xs">كود الخصم</label>
                  <div class="flex gap-2">
                    <input
                      type="text"
                      x-model="codeInput"
                      placeholder="مثال: NOVA10"
                      class="form-input h-11 text-sm uppercase"
                      maxlength="32"
                      autocomplete="off"
                      {...{ '@keyup.enter': 'applyCoupon()' }}
                    />
                    <button
                      type="button"
                      {...{ '@click': 'applyCoupon()', ':disabled': 'couponLoading || !codeInput.trim()' }}
                      class="h-11 px-4 rounded-xl border border-ink-200 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 text-ink-700 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span x-show="!couponLoading">تطبيق</span>
                      <span x-show="couponLoading" class="inline-flex items-center gap-1">
                        <span class="spinner w-3 h-3"></span>
                        <span>...</span>
                      </span>
                    </button>
                  </div>
                  <div class="text-[11px] text-ink-500 mt-1.5">
                    أكواد متاحة: <span class="font-bold">NOVA10</span>, <span class="font-bold">WELCOME20</span>, <span class="font-bold">SAVE50</span>, <span class="font-bold">FREESHIP</span>
                  </div>
                </div>

                <div x-show="appliedCoupon" x-cloak class="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2">
                  <i data-lucide="badge-check" class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true"></i>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-bold text-emerald-800">
                      تم تطبيق كوبون <span x-text="couponCode"></span>
                    </div>
                    <div class="text-xs text-emerald-700 mt-0.5" x-text="couponDescription"></div>
                  </div>
                  <button type="button" {...{ '@click': 'removeCoupon()' }} class="text-emerald-700 hover:text-emerald-900" aria-label="إزالة الكوبون">
                    <i data-lucide="x" class="w-4 h-4" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <a href="/checkout" class="w-full h-12 rounded-xl bg-gradient-to-br from-ink-900 to-ink-800 hover:from-ink-800 hover:to-ink-700 text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all mb-3">
                <i data-lucide="credit-card" class="w-5 h-5" aria-hidden="true"></i>
                <span>إتمام الطلب</span>
                <i data-lucide="arrow-left" class="w-4 h-4" aria-hidden="true"></i>
              </a>

              {/* Security Note */}
              <div class="flex items-center justify-center gap-1.5 text-xs text-ink-500">
                <i data-lucide="lock" class="w-3.5 h-3.5 text-emerald-500" aria-hidden="true"></i>
                <span>دفع آمن بتشفير SSL</span>
              </div>

              {/* Payment Methods */}
              <div class="mt-4 pt-4 border-t border-ink-100">
                <div class="text-xs text-ink-500 mb-2 text-center">طرق الدفع المقبولة</div>
                <div class="flex justify-center gap-1.5 flex-wrap">
                  {['VISA', 'Mastercard', 'mada', 'Apple Pay', 'STC Pay'].map(m => (
                    <span class="px-2 py-1 rounded bg-ink-50 text-[10px] font-bold text-ink-600">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('alpine:init', () => {
            Alpine.data('cartPage', () => ({
              items: [],
              subtotal: 0,
              savings: 0,
              shipping: 0,
              total: 0,
              couponDiscount: 0,
              couponCode: '',
              couponDescription: '',
              appliedCoupon: false,
              codeInput: '',
              couponLoading: false,
              init() {
                this.refresh();
                document.addEventListener('cart:updated', () => this.refresh());
              },
              refresh() {
                this.items = Cart.getItems();
                this.subtotal = Cart.subtotal();
                this.savings = Cart.savings();
                this.shipping = Cart.shipping();
                this.couponDiscount = Cart.couponDiscount();
                this.total = Cart.total();
                const coupon = Coupon.get();
                if (coupon && this.items.length > 0) {
                  this.appliedCoupon = true;
                  this.couponCode = coupon.code;
                  this.couponDescription = coupon.description || '';
                } else {
                  this.appliedCoupon = false;
                  this.couponCode = '';
                  this.couponDescription = '';
                  if (coupon && this.items.length === 0) Coupon.clear();
                }
                setTimeout(() => refreshIcons(), 50);
              },
              updateQty(id, qty) {
                const safeQty = Math.max(1, Math.min(99, parseInt(qty) || 1));
                Cart.updateQty(id, safeQty);
              },
              removeItem(id) {
                Cart.remove(id);
              },
              clearCart() {
                openConfirmDialog({
                  title: 'مسح السلة',
                  message: 'هل أنت متأكد من مسح جميع المنتجات من السلة؟ لا يمكن التراجع عن هذا الإجراء.',
                  confirmText: 'نعم، امسح السلة',
                  cancelText: 'إلغاء',
                  destructive: true,
                  onConfirm: () => {
                    Cart.clear();
                    showToast('تم مسح السلة', 'info');
                  }
                });
              },
              async applyCoupon() {
                const code = (this.codeInput || '').trim();
                if (!code) return;
                this.couponLoading = true;
                const ok = await Coupon.apply(code);
                this.couponLoading = false;
                if (ok) {
                  this.codeInput = '';
                  this.refresh();
                }
              },
              removeCoupon() {
                Coupon.clear();
                showToast('تمت إزالة الكوبون', 'info');
                this.refresh();
              }
            }))
          });
        `}}></script>
        <style dangerouslySetInnerHTML={{ __html: `[x-cloak]{display:none!important}` }}></style>
      </section>
    </Layout>
  )
}
