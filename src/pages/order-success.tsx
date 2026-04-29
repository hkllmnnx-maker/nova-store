import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'

export const OrderSuccessPage: FC<{ orderId?: string }> = ({ orderId }) => {
  return (
    <Layout title="تم استلام طلبك - متجر نوڤا">
      <section class="max-w-3xl mx-auto px-4 py-10 md:py-16" x-data="orderSuccess" x-init="init()">
        {/* Success Animation */}
        <div class="text-center mb-10">
          <div class="inline-flex relative mb-6">
            <div class="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping"></div>
            <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
              <i data-lucide="check" class="w-12 h-12 text-white" stroke-width="3"></i>
            </div>
          </div>

          <h1 class="font-display font-black text-3xl md:text-5xl text-ink-900 mb-3 animate-slide-up">
            شكراً لطلبك!
          </h1>
          <p class="text-ink-600 text-lg max-w-md mx-auto animate-slide-up delay-100">
            تم استلام طلبك بنجاح وسيتم معالجته قريباً. تابع حالة طلبك من خلال البريد الإلكتروني.
          </p>
        </div>

        {/* Order Card */}
        <div class="bg-white rounded-3xl border border-ink-100 shadow-card p-6 md:p-8 mb-6">
          <div class="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-ink-100 mb-5">
            <div>
              <div class="text-xs text-ink-500 font-medium mb-1">رقم الطلب</div>
              <div class="font-display font-black text-2xl text-ink-900" x-text={`order ? order.id : '${orderId || 'NV-XXXXXX'}'`}>{orderId || 'NV-XXXXXX'}</div>
            </div>
            <div class="text-left">
              <div class="text-xs text-ink-500 font-medium mb-1">تاريخ الطلب</div>
              <div class="font-bold text-ink-900" x-text="orderDate"></div>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span x-text="order ? order.status : 'قيد المعالجة'">قيد المعالجة</span>
            </div>
          </div>

          {/* Status Tracker */}
          <div class="mb-6">
            <div class="flex items-center justify-between max-w-2xl mx-auto relative">
              <div class="absolute top-4 left-0 right-0 h-1 bg-ink-100 rounded-full mx-12">
                <div class="h-full bg-gradient-to-r from-emerald-500 to-brand-500 rounded-full" style="width: 25%"></div>
              </div>
              {[
                { label: 'تم الطلب', icon: 'check-circle-2', active: true },
                { label: 'قيد التحضير', icon: 'package', active: false },
                { label: 'في الطريق', icon: 'truck', active: false },
                { label: 'تم التوصيل', icon: 'home', active: false }
              ].map(s => (
                <div class="flex flex-col items-center gap-2 relative z-10">
                  <div class={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg ${s.active ? 'bg-emerald-500' : 'bg-ink-200'}`}>
                    <i data-lucide={s.icon} class="w-4 h-4"></i>
                  </div>
                  <span class={`text-[11px] font-semibold ${s.active ? 'text-ink-900' : 'text-ink-400'}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div x-show="order" class="grid md:grid-cols-2 gap-5 mb-5">
            <div class="bg-ink-50 rounded-2xl p-4">
              <div class="flex items-center gap-2 mb-3 text-sm font-bold text-ink-900">
                <i data-lucide="user" class="w-4 h-4 text-brand-500"></i>
                <span>بيانات المستلم</span>
              </div>
              <div class="space-y-1.5 text-sm text-ink-700">
                <div x-show="order"><strong x-text="order?.customer?.fullName"></strong></div>
                <div x-show="order" x-text="order?.customer?.phone"></div>
                <div x-show="order" x-text="order?.customer?.email"></div>
              </div>
            </div>
            <div class="bg-ink-50 rounded-2xl p-4">
              <div class="flex items-center gap-2 mb-3 text-sm font-bold text-ink-900">
                <i data-lucide="map-pin" class="w-4 h-4 text-emerald-500"></i>
                <span>عنوان التوصيل</span>
              </div>
              <div class="space-y-1.5 text-sm text-ink-700">
                <div x-show="order"><span x-text="order?.customer?.city"></span><span x-show="order?.customer?.district"> - </span><span x-text="order?.customer?.district"></span></div>
                <div x-show="order" x-text="order?.customer?.address"></div>
                <div x-show="order && order.customer.postal" x-text="'الرمز البريدي: ' + order?.customer?.postal"></div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div x-show="order">
            <div class="text-sm font-bold text-ink-900 mb-3 flex items-center gap-2">
              <i data-lucide="shopping-bag" class="w-4 h-4 text-brand-500"></i>
              <span>المنتجات (<span x-text="order?.items?.length || 0"></span>)</span>
            </div>
            <div class="space-y-2 mb-4">
              <template x-for="item in order?.items || []" {...{ ':key': 'item.id' }}>
                <div class="flex items-center gap-3 p-3 rounded-xl bg-ink-50">
                  <img {...{ ':src': 'item.image' }} class="w-12 h-12 rounded-lg object-cover" />
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-sm text-ink-900 line-clamp-1" x-text="item.name"></div>
                    <div class="text-xs text-ink-500" x-text="item.price.toLocaleString('ar-SA') + ' ر.س × ' + item.quantity"></div>
                  </div>
                  <div class="font-bold text-sm text-ink-900" x-text="(item.price * item.quantity).toLocaleString('ar-SA') + ' ر.س'"></div>
                </div>
              </template>
            </div>

            {/* Totals */}
            <div class="bg-gradient-to-br from-brand-50 to-accent-50 rounded-2xl p-5 space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-ink-600">المجموع الفرعي</span>
                <span class="font-bold text-ink-900"><span x-text="order?.subtotal?.toLocaleString('ar-SA')"></span> ر.س</span>
              </div>
              <div class="flex items-center justify-between text-sm" x-show="order?.savings > 0">
                <span class="text-emerald-600">الخصم</span>
                <span class="font-bold text-emerald-600">-<span x-text="order?.savings?.toLocaleString('ar-SA')"></span> ر.س</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-ink-600">الشحن</span>
                <span class="font-bold text-ink-900">
                  <span x-show="order?.shipping === 0" class="text-emerald-600">مجاني</span>
                  <span x-show="order?.shipping > 0"><span x-text="order?.shipping?.toLocaleString('ar-SA')"></span> ر.س</span>
                </span>
              </div>
              <div class="pt-2 border-t border-brand-200 flex items-end justify-between">
                <span class="font-bold text-ink-900">الإجمالي المدفوع</span>
                <div class="flex items-baseline gap-1">
                  <span class="font-display font-black text-2xl text-ink-900" x-text="order?.total?.toLocaleString('ar-SA')"></span>
                  <span class="text-sm font-bold text-ink-700">ر.س</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div class="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
              <i data-lucide="calendar-check" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="font-bold text-sm text-emerald-900">موعد التوصيل المتوقع</div>
              <div class="text-sm text-emerald-700 mt-0.5" x-text="estimatedDelivery"></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <a href="/products" class="flex-1 h-12 rounded-xl bg-gradient-to-br from-ink-900 to-ink-800 hover:from-ink-800 hover:to-ink-700 text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            <span>متابعة التسوق</span>
          </a>
          <button onclick="window.print()" class="h-12 px-5 rounded-xl border border-ink-200 bg-white hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 text-ink-900 font-semibold flex items-center justify-center gap-2 transition-all">
            <i data-lucide="printer" class="w-4 h-4"></i>
            <span>طباعة الفاتورة</span>
          </button>
          <a href="/" class="h-12 px-5 rounded-xl border border-ink-200 bg-white hover:border-ink-400 text-ink-700 font-semibold flex items-center justify-center gap-2 transition-all">
            <i data-lucide="home" class="w-4 h-4"></i>
            <span>الرئيسية</span>
          </a>
        </div>

        {/* Help Box */}
        <div class="bg-white rounded-2xl border border-ink-100 p-5 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
            <i data-lucide="headphones" class="w-6 h-6"></i>
          </div>
          <div class="flex-1">
            <div class="font-bold text-sm text-ink-900">هل تحتاج مساعدة؟</div>
            <div class="text-xs text-ink-500 mt-0.5">فريق دعم العملاء جاهز لخدمتك على مدار الساعة</div>
          </div>
          <a href="#" class="h-10 px-4 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 text-sm font-semibold inline-flex items-center gap-1.5 transition-colors">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>تواصل</span>
          </a>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('alpine:init', () => {
            Alpine.data('orderSuccess', () => ({
              order: null,
              orderDate: '',
              estimatedDelivery: '',
              init() {
                const params = new URLSearchParams(window.location.search);
                const id = params.get('id');
                if (id) {
                  this.order = Orders.getById(id);
                  if (this.order) {
                    const d = new Date(this.order.date);
                    this.orderDate = d.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                    const eta = new Date(d.getTime() + 3 * 24 * 60 * 60 * 1000);
                    this.estimatedDelivery = eta.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                  }
                }
                if (!this.order) {
                  this.orderDate = new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                  const eta = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
                  this.estimatedDelivery = eta.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                }
              }
            }))
          });
        `}}></script>
      </section>
    </Layout>
  )
}
