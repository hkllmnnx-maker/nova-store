import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'

export const TrackPage: FC<{ id?: string }> = ({ id }) => {
  const initialId = (id || '').replace(/[^A-Za-z0-9-]/g, '').slice(0, 32).toUpperCase()
  return (
    <Layout title="تتبع الطلب - متجر نوڤا" currentPage="track">
      <section class="max-w-3xl mx-auto px-4 py-10" x-data="trackPage" x-init="init()">
        <nav class="flex items-center gap-1.5 text-sm text-ink-500 mb-3" aria-label="مسار التنقل">
          <a href="/" class="hover:text-brand-600 transition-colors">الرئيسية</a>
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
          <span class="text-ink-900 font-medium">تتبع الطلب</span>
        </nav>

        <header class="mb-8">
          <h1 class="font-display font-black text-3xl md:text-4xl text-ink-900 flex items-center gap-3">
            <i data-lucide="package-search" class="w-8 h-8 text-brand-500"></i>
            <span>تتبع الطلب</span>
          </h1>
          <p class="text-ink-500 mt-1.5">أدخل رقم طلبك ورقم الجوال أو البريد الإلكتروني لمعرفة حالته الحالية.</p>
        </header>

        <form {...{ '@submit.prevent': 'lookup()' }} class="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 shadow-sm space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label" for="track-id">رقم الطلب <span class="text-red-500">*</span></label>
              <input id="track-id" type="text" x-model="form.id" required pattern="^NV-[0-9]{6}-[0-9]{3,5}$" placeholder="مثال: NV-260430-1234" class="form-input font-mono uppercase" />
              <span class="text-xs text-ink-500 mt-1 block">يبدأ بـ <span class="font-mono">NV-</span> ثم 6 أرقام للتاريخ ثم 4 أرقام.</span>
            </div>
            <div>
              <label class="form-label" for="track-contact">رقم الجوال أو البريد</label>
              <input id="track-contact" type="text" x-model="form.contact" placeholder="05xxxxxxxx أو email@example.com" class="form-input" />
              <span class="text-xs text-ink-500 mt-1 block">للحماية من الوصول غير المصرّح به.</span>
            </div>
          </div>

          <div x-show="error" {...{ 'x-cloak': '' }} class="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-3 flex items-start gap-2">
            <i data-lucide="alert-triangle" class="w-4 h-4 flex-shrink-0 mt-0.5"></i>
            <span x-text="error"></span>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <button type="submit" {...{ ':disabled': 'loading' }} class="h-11 px-6 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
              <span x-show="!loading" class="flex items-center gap-2">
                <i data-lucide="search" class="w-4 h-4"></i>
                <span>عرض حالة الطلب</span>
              </span>
              <span x-show="loading" {...{ 'x-cloak': '' }} class="flex items-center gap-2">
                <span class="spinner" style="border-top-color: white"></span>
                <span>جاري البحث...</span>
              </span>
            </button>
            <a href="/products" class="text-sm text-ink-500 hover:text-brand-600">متابعة التسوق</a>
          </div>
        </form>

        {/* Result */}
        <div x-show="order" {...{ 'x-cloak': '' }} class="mt-8 bg-white rounded-2xl border border-ink-100 p-5 md:p-6 shadow-sm">
          <div class="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div>
              <div class="text-xs text-ink-500 mb-1">رقم الطلب</div>
              <div class="font-display font-black text-xl text-ink-900 font-mono" x-text="order && order.id"></div>
            </div>
            <span class="px-3 py-1.5 rounded-full text-xs font-bold" {...{ ':class': 'order && getStatusClass(order.status)' }} x-text="order && order.statusAr"></span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <template x-for="step in steps" {...{ ':key': 'step.id' }}>
              <div class="bg-ink-50 rounded-xl p-3 text-center" {...{ ':class': 'order && stepReached(step.id) ? \'ring-1 ring-brand-200 bg-brand-50\' : \'opacity-60\'' }}>
                <div class="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2" {...{ ':class': 'order && stepReached(step.id) ? \'bg-brand-500 text-white\' : \'bg-ink-200 text-ink-500\'' }}>
                  <i {...{ ':data-lucide': 'step.icon' }} class="w-4 h-4"></i>
                </div>
                <div class="text-xs font-bold text-ink-900" x-text="step.label"></div>
              </div>
            </template>
          </div>

          <div class="grid sm:grid-cols-3 gap-3 mb-5 text-sm">
            <div class="bg-ink-50 rounded-xl p-3">
              <div class="text-[11px] font-bold text-ink-500 uppercase mb-1">العميل</div>
              <div class="font-bold text-ink-900" x-text="order && order.customerHint && order.customerHint.fullName"></div>
            </div>
            <div class="bg-ink-50 rounded-xl p-3">
              <div class="text-[11px] font-bold text-ink-500 uppercase mb-1">المدينة</div>
              <div class="font-bold text-ink-900" x-text="order && order.customerHint && order.customerHint.city"></div>
            </div>
            <div class="bg-ink-50 rounded-xl p-3">
              <div class="text-[11px] font-bold text-ink-500 uppercase mb-1">الإجمالي</div>
              <div class="font-bold text-ink-900" x-text="order && (Number(order.total).toLocaleString('ar-SA') + ' ر.س')"></div>
            </div>
          </div>

          <div class="border-t border-ink-100 pt-4">
            <h3 class="font-bold text-ink-900 mb-3 flex items-center gap-2">
              <i data-lucide="history" class="w-4 h-4 text-brand-500"></i>
              <span>سجل الحالة</span>
            </h3>
            <ol class="space-y-3" aria-label="تاريخ الطلب">
              <template x-for="(h, idx) in (order && order.history) || []" {...{ ':key': 'idx' }}>
                <li class="flex items-start gap-3">
                  <div class="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0"></div>
                  <div class="flex-1">
                    <div class="text-sm font-bold text-ink-900" x-text="h.statusAr"></div>
                    <div class="text-xs text-ink-500" x-text="formatDateTime(h.at)"></div>
                    <div x-show="h.note" class="text-xs text-ink-700 mt-1" x-text="h.note"></div>
                  </div>
                </li>
              </template>
            </ol>
          </div>
        </div>

        <div x-show="!order && !loading && hasSearched" {...{ 'x-cloak': '' }} class="mt-8 bg-white rounded-2xl border border-ink-100 p-8 text-center">
          <div class="inline-flex w-16 h-16 rounded-2xl bg-ink-100 items-center justify-center mb-4">
            <i data-lucide="package-x" class="w-8 h-8 text-ink-400"></i>
          </div>
          <h2 class="font-bold text-xl text-ink-900 mb-2">لم نجد طلباً مطابقاً</h2>
          <p class="text-ink-500 text-sm">تحقّق من رقم الطلب وأنّ بيانات الاتصال (الجوال أو البريد) تطابق ما أُدخل أثناء الشراء.</p>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('alpine:init', () => {
            Alpine.data('trackPage', () => ({
              form: { id: ${JSON.stringify(initialId)}, contact: '' },
              order: null,
              loading: false,
              error: '',
              hasSearched: false,
              steps: [
                { id: 'pending', label: 'تم استلام الطلب', icon: 'clipboard-check' },
                { id: 'processing', label: 'قيد التحضير', icon: 'package' },
                { id: 'shipped', label: 'في الطريق', icon: 'truck' },
                { id: 'completed', label: 'تم التوصيل', icon: 'check-circle-2' }
              ],
              order_rank: { pending: 0, processing: 1, shipped: 2, completed: 3, cancelled: -1 },
              init() {
                if (this.form.id) this.lookup();
              },
              stepReached(id) {
                if (!this.order) return false;
                if (this.order.status === 'cancelled') return id === 'pending';
                return this.order_rank[this.order.status] >= this.order_rank[id];
              },
              getStatusClass(s) {
                const map = {
                  pending: 'bg-amber-100 text-amber-700',
                  processing: 'bg-blue-100 text-blue-700',
                  shipped: 'bg-indigo-100 text-indigo-700',
                  completed: 'bg-emerald-100 text-emerald-700',
                  cancelled: 'bg-red-100 text-red-700'
                };
                return map[s] || 'bg-ink-100 text-ink-700';
              },
              formatDateTime(d) {
                try {
                  return new Date(d).toLocaleString('ar-SA', { dateStyle: 'medium', timeStyle: 'short' });
                } catch(e) { return d; }
              },
              async lookup() {
                this.error = '';
                this.order = null;
                this.hasSearched = true;
                const id = (this.form.id || '').trim().toUpperCase();
                if (!/^NV-[0-9]{6}-[0-9]{3,5}$/.test(id)) {
                  this.error = 'صيغة رقم الطلب غير صحيحة. مثال: NV-260430-1234';
                  return;
                }
                this.loading = true;
                try {
                  const params = new URLSearchParams();
                  if (this.form.contact) params.set('contact', this.form.contact.trim().toLowerCase());
                  const url = '/api/orders/track/' + encodeURIComponent(id) + (params.toString() ? '?' + params.toString() : '');
                  const r = await fetch(url);
                  const data = await r.json();
                  if (!data.ok) {
                    if (window.showToast) showToast('لم يتم العثور على الطلب', 'warning');
                    this.loading = false;
                    return;
                  }
                  this.order = data.order;
                  setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
                } catch (e) {
                  this.error = 'تعذّر الاتصال بالخادم. حاول مرة أخرى.';
                } finally {
                  this.loading = false;
                }
              }
            }))
          });
        `}}></script>
        <style dangerouslySetInnerHTML={{ __html: `[x-cloak]{display:none!important}` }}></style>
      </section>
    </Layout>
  )
}
