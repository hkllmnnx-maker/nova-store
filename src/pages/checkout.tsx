import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'

export const CheckoutPage: FC = () => {
  return (
    <Layout title="إتمام الطلب - متجر نوڤا">
      <section class="max-w-7xl mx-auto px-4 py-8" x-data="checkoutPage" x-init="init()">
        {/* Header */}
        <div class="mb-8">
          <nav class="flex items-center gap-1.5 text-sm text-ink-500 mb-3">
            <a href="/" class="hover:text-brand-600 transition-colors">الرئيسية</a>
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <a href="/cart" class="hover:text-brand-600 transition-colors">السلة</a>
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <span class="text-ink-900 font-medium">إتمام الطلب</span>
          </nav>
          <h1 class="font-display font-black text-3xl md:text-4xl text-ink-900">إتمام الطلب</h1>
        </div>

        {/* Progress Steps */}
        <div class="bg-white rounded-2xl border border-ink-100 p-4 mb-6">
          <div class="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'السلة', icon: 'shopping-bag', done: true },
              { num: 2, label: 'البيانات', icon: 'user', done: true },
              { num: 3, label: 'الدفع', icon: 'credit-card', done: false }
            ].map((step, idx, arr) => (
              <>
                <div class="flex flex-col items-center gap-2 relative z-10">
                  <div class={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${step.done || step.num === 2 ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white' : 'bg-white border-2 border-ink-200 text-ink-500'}`}>
                    {step.done ? <i data-lucide="check" class="w-4 h-4"></i> : step.num}
                  </div>
                  <span class="text-xs font-semibold text-ink-700">{step.label}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div class={`flex-1 h-0.5 mx-2 ${arr[idx + 1].done || step.done ? 'bg-brand-500' : 'bg-ink-200'}`}></div>
                )}
              </>
            ))}
          </div>
        </div>

        {/* Empty Cart State */}
        <div x-show="items.length === 0" {...{ "x-cloak": "" }} class="bg-white rounded-2xl border border-ink-100 p-12 text-center">
          <div class="inline-flex w-20 h-20 rounded-2xl bg-amber-50 items-center justify-center mb-4">
            <i data-lucide="alert-triangle" class="w-10 h-10 text-amber-500"></i>
          </div>
          <h2 class="font-display font-bold text-2xl text-ink-900 mb-2">سلتك فارغة</h2>
          <p class="text-ink-500 mb-6">لا يمكنك إتمام الطلب بدون منتجات. أضف بعض المنتجات أولاً.</p>
          <a href="/products" class="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-ink-900 hover:bg-ink-800 text-white font-semibold transition-colors">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            <span>تصفّح المنتجات</span>
          </a>
        </div>

        <form x-show="items.length > 0" {...{ "x-cloak": "" }} {...{ '@submit.prevent': 'placeOrder()' }} class="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* Forms Column */}
          <div class="space-y-5">
            {/* Customer Info */}
            <div class="bg-white rounded-2xl border border-ink-100 p-6">
              <div class="flex items-center gap-3 mb-5 pb-4 border-b border-ink-100">
                <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <i data-lucide="user" class="w-5 h-5"></i>
                </div>
                <h2 class="font-display font-bold text-lg text-ink-900">بيانات العميل</h2>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">الاسم الكامل <span class="text-red-500">*</span></label>
                  <input type="text" x-model="form.fullName" required minlength="3" placeholder="مثال: أحمد محمد العلي" class="form-input" {...{ ':class': 'errors.fullName && \'error\'' }} />
                  <span x-show="errors.fullName" x-text="errors.fullName" class="text-xs text-red-500 mt-1 block"></span>
                </div>
                <div>
                  <label class="form-label">رقم الجوال <span class="text-red-500">*</span></label>
                  <input type="tel" x-model="form.phone" required pattern="^(05)[0-9]{8}$" placeholder="05xxxxxxxx" class="form-input" {...{ ':class': 'errors.phone && \'error\'' }} />
                  <span x-show="errors.phone" x-text="errors.phone" class="text-xs text-red-500 mt-1 block"></span>
                </div>
                <div class="sm:col-span-2">
                  <label class="form-label">البريد الإلكتروني <span class="text-red-500">*</span></label>
                  <input type="email" x-model="form.email" required placeholder="email@example.com" class="form-input" {...{ ':class': 'errors.email && \'error\'' }} />
                  <span x-show="errors.email" x-text="errors.email" class="text-xs text-red-500 mt-1 block"></span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div class="bg-white rounded-2xl border border-ink-100 p-6">
              <div class="flex items-center gap-3 mb-5 pb-4 border-b border-ink-100">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <i data-lucide="map-pin" class="w-5 h-5"></i>
                </div>
                <h2 class="font-display font-bold text-lg text-ink-900">عنوان الشحن</h2>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">المدينة <span class="text-red-500">*</span></label>
                  <select x-model="form.city" required class="form-input">
                    <option value="">اختر المدينة</option>
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="الخبر">الخبر</option>
                    <option value="الطائف">الطائف</option>
                    <option value="تبوك">تبوك</option>
                    <option value="أبها">أبها</option>
                    <option value="حائل">حائل</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">الحي</label>
                  <input type="text" x-model="form.district" placeholder="مثال: العليا" class="form-input" />
                </div>
                <div class="sm:col-span-2">
                  <label class="form-label">العنوان التفصيلي <span class="text-red-500">*</span></label>
                  <input type="text" x-model="form.address" required minlength="10" placeholder="الشارع، رقم المبنى، رقم الشقة..." class="form-input" {...{ ':class': 'errors.address && \'error\'' }} />
                  <span x-show="errors.address" x-text="errors.address" class="text-xs text-red-500 mt-1 block"></span>
                </div>
                <div>
                  <label class="form-label">الرمز البريدي</label>
                  <input type="text" x-model="form.postal" pattern="[0-9]{5}" placeholder="12345" class="form-input" />
                </div>
                <div>
                  <label class="form-label">ملاحظات (اختياري)</label>
                  <input type="text" x-model="form.notes" placeholder="أي ملاحظات للتوصيل..." class="form-input" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div class="bg-white rounded-2xl border border-ink-100 p-6">
              <div class="flex items-center gap-3 mb-5 pb-4 border-b border-ink-100">
                <div class="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <i data-lucide="credit-card" class="w-5 h-5"></i>
                </div>
                <h2 class="font-display font-bold text-lg text-ink-900">طريقة الدفع</h2>
              </div>

              <div class="space-y-3">
                {[
                  { id: 'card', label: 'بطاقة ائتمان/مدى', icon: 'credit-card', desc: 'فيزا، ماستركارد، مدى' },
                  { id: 'apple', label: 'Apple Pay', icon: 'smartphone', desc: 'دفع سريع وآمن' },
                  { id: 'cod', label: 'الدفع عند الاستلام', icon: 'banknote', desc: 'ادفع نقداً عند التوصيل' }
                ].map(method => (
                  <label class="block cursor-pointer">
                    <input type="radio" name="payment" value={method.id} x-model="form.payment" class="peer sr-only" />
                    <div class="flex items-center gap-3 p-4 rounded-xl border-2 border-ink-200 peer-checked:border-brand-500 peer-checked:bg-brand-50 transition-all" {...{ 'x-bind:class': `form.payment === '${method.id}' ? 'border-brand-500 bg-brand-50' : ''` }}>
                      <div class="w-10 h-10 rounded-lg bg-white border border-ink-200 flex items-center justify-center text-ink-700">
                        <i data-lucide={method.icon} class="w-5 h-5"></i>
                      </div>
                      <div class="flex-1">
                        <div class="font-bold text-sm text-ink-900">{method.label}</div>
                        <div class="text-xs text-ink-500">{method.desc}</div>
                      </div>
                      <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors" {...{ 'x-bind:class': `form.payment === '${method.id}' ? 'border-brand-500 bg-brand-500' : 'border-ink-300'` }}>
                        <span {...{ 'x-show': `form.payment === '${method.id}'` }} class="w-2 h-2 rounded-full bg-white"></span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card Details (shown only if card payment selected) */}
              <div x-show="form.payment === 'card'" {...{ "x-transition": "" }} class="mt-5 pt-5 border-t border-ink-100 grid sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="form-label">رقم البطاقة</label>
                  <div class="relative">
                    <input type="text" maxlength="19" placeholder="0000 0000 0000 0000" class="form-input pr-12" {...{ '@input': '$event.target.value = $event.target.value.replace(/\\D/g,\'\').replace(/(\\d{4})(?=\\d)/g,\'$1 \')' }} />
                    <i data-lucide="credit-card" class="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3 text-ink-400"></i>
                  </div>
                </div>
                <div>
                  <label class="form-label">تاريخ الانتهاء</label>
                  <input type="text" maxlength="5" placeholder="MM/YY" class="form-input" />
                </div>
                <div>
                  <label class="form-label">CVV</label>
                  <input type="text" maxlength="4" placeholder="123" class="form-input" />
                </div>
                <div class="sm:col-span-2 flex items-center gap-2 text-xs text-ink-500">
                  <i data-lucide="lock" class="w-3.5 h-3.5 text-emerald-500"></i>
                  <span>بياناتك محمية بتشفير SSL 256-bit</span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <label class="flex items-start gap-3 cursor-pointer p-4 bg-white rounded-2xl border border-ink-100">
              <input type="checkbox" x-model="form.terms" required class="mt-1 w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
              <span class="text-sm text-ink-700">
                أوافق على <a href="#" class="text-brand-600 font-semibold hover:underline">الشروط والأحكام</a> و
                <a href="#" class="text-brand-600 font-semibold hover:underline">سياسة الخصوصية</a>
              </span>
            </label>
          </div>

          {/* Order Summary */}
          <div>
            <div class="lg:sticky lg:top-24 bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden">
              <div class="p-6 border-b border-ink-100">
                <h3 class="font-display font-bold text-xl text-ink-900 flex items-center gap-2">
                  <i data-lucide="receipt" class="w-5 h-5 text-brand-500"></i>
                  <span>ملخص الطلب</span>
                </h3>
                <p class="text-xs text-ink-500 mt-1"><span x-text="items.length"></span> منتج في السلة</p>
              </div>

              {/* Items */}
              <div class="px-6 py-4 max-h-72 overflow-y-auto border-b border-ink-100 space-y-3">
                <template x-for="item in items" {...{ ':key': 'item.id' }}>
                  <div class="flex items-center gap-3">
                    <div class="relative w-14 h-14 rounded-xl overflow-hidden bg-ink-50 flex-shrink-0">
                      <img {...{ ':src': 'item.image' }} class="w-full h-full object-cover" />
                      <span class="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-ink-900 text-white text-[10px] font-bold flex items-center justify-center" x-text="item.quantity"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-semibold text-ink-900 line-clamp-1" x-text="item.name"></div>
                      <div class="text-xs text-ink-500" x-text="`${item.price.toLocaleString('ar-SA')} ر.س × ${item.quantity}`"></div>
                    </div>
                    <div class="text-sm font-bold text-ink-900" x-text="(item.price * item.quantity).toLocaleString('ar-SA') + ' ر.س'"></div>
                  </div>
                </template>
              </div>

              {/* Totals */}
              <div class="p-6 space-y-2.5">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-ink-600">المجموع الفرعي</span>
                  <span class="font-bold text-ink-900"><span x-text="subtotal.toLocaleString('ar-SA')"></span> ر.س</span>
                </div>
                <div class="flex items-center justify-between text-sm" x-show="savings > 0">
                  <span class="text-emerald-600">الخصم</span>
                  <span class="font-bold text-emerald-600">-<span x-text="savings.toLocaleString('ar-SA')"></span> ر.س</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-ink-600">الشحن</span>
                  <span class="font-bold" {...{ ':class': 'shipping === 0 ? \'text-emerald-600\' : \'text-ink-900\'' }}>
                    <span x-show="shipping === 0">مجاني</span>
                    <span x-show="shipping > 0"><span x-text="shipping.toLocaleString('ar-SA')"></span> ر.س</span>
                  </span>
                </div>

                <div class="pt-3 border-t border-ink-100 flex items-end justify-between">
                  <span class="font-bold text-ink-900">الإجمالي</span>
                  <div class="text-left">
                    <div class="flex items-baseline gap-1">
                      <span class="font-display font-black text-2xl text-ink-900" x-text="total.toLocaleString('ar-SA')"></span>
                      <span class="text-sm font-semibold text-ink-700">ر.س</span>
                    </div>
                  </div>
                </div>

                <button type="submit" {...{ ':disabled': 'loading' }} class="w-full h-12 rounded-xl bg-gradient-to-br from-ink-900 to-ink-800 hover:from-ink-800 hover:to-ink-700 text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-3">
                  <span x-show="!loading" class="inline-flex items-center gap-2">
                    <i data-lucide="lock" class="w-4 h-4"></i>
                    <span>تأكيد الطلب الآن</span>
                  </span>
                  <span x-show="loading" class="inline-flex items-center gap-2">
                    <span class="spinner" style="border-top-color: white"></span>
                    <span>جاري المعالجة...</span>
                  </span>
                </button>

                <div class="flex items-center justify-center gap-2 text-xs text-ink-500 mt-2">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i>
                  <span>عملية دفع آمنة 100%</span>
                </div>
              </div>
            </div>
          </div>
        </form>

        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('alpine:init', () => {
            Alpine.data('checkoutPage', () => ({
              items: [],
              subtotal: 0, savings: 0, shipping: 0, total: 0,
              loading: false,
              errors: {},
              form: {
                fullName: '', phone: '', email: '',
                city: '', district: '', address: '', postal: '', notes: '',
                payment: 'card',
                terms: false
              },
              init() {
                this.refresh();
                document.addEventListener('cart:updated', () => this.refresh());
              },
              refresh() {
                this.items = Cart.getItems();
                this.subtotal = Cart.subtotal();
                this.savings = Cart.savings();
                this.shipping = Cart.shipping();
                this.total = Cart.total();
              },
              validate() {
                this.errors = {};
                if (!this.form.fullName || this.form.fullName.trim().length < 3) this.errors.fullName = 'الاسم الكامل مطلوب (3 أحرف على الأقل)';
                if (!/^(05)[0-9]{8}$/.test(this.form.phone)) this.errors.phone = 'رقم الجوال يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام';
                if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.form.email)) this.errors.email = 'بريد إلكتروني غير صالح';
                if (!this.form.address || this.form.address.trim().length < 10) this.errors.address = 'العنوان التفصيلي مطلوب (10 أحرف على الأقل)';
                if (!this.form.city) { showToast('الرجاء اختيار المدينة','error'); return false; }
                if (!this.form.terms) { showToast('يجب الموافقة على الشروط والأحكام','error'); return false; }
                if (Object.keys(this.errors).length > 0) { showToast('الرجاء تصحيح الأخطاء في النموذج', 'error'); return false; }
                return true;
              },
              placeOrder() {
                if (!this.validate()) return;
                this.loading = true;

                // Simulate processing
                setTimeout(() => {
                  const order = {
                    id: Orders.generateId(),
                    date: new Date().toISOString(),
                    customer: { ...this.form },
                    items: this.items,
                    subtotal: this.subtotal,
                    savings: this.savings,
                    shipping: this.shipping,
                    total: this.total,
                    status: 'قيد المعالجة'
                  };
                  Orders.save(order);
                  Cart.clear();
                  window.location.href = '/order-success?id=' + order.id;
                }, 1500);
              }
            }))
          });
        `}}></script>
        <style dangerouslySetInnerHTML={{ __html: `[x-cloak]{display:none!important}` }}></style>
      </section>
    </Layout>
  )
}
