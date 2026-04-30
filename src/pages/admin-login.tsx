import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'

export const AdminLoginPage: FC<{ next?: string }> = ({ next }) => {
  const safeNext = next && /^\/[a-zA-Z0-9_\-/]{0,100}$/.test(next) ? next : '/admin'
  return (
    <Layout title="تسجيل دخول الإدارة - متجر نوڤا" currentPage="admin">
      <section class="max-w-md mx-auto px-4 py-12" x-data="adminLogin" x-init="init()">
        <div class="text-center mb-8">
          <div class="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 items-center justify-center text-white shadow-lg shadow-brand-500/30 mb-4">
            <i data-lucide="shield-check" class="w-7 h-7"></i>
          </div>
          <h1 class="font-display font-black text-3xl text-ink-900 mb-2">دخول لوحة الإدارة</h1>
          <p class="text-ink-500 text-sm">يجب تسجيل الدخول لعرض هذه الصفحة</p>
        </div>

        <form {...{ '@submit.prevent': 'submit()' }} class="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm space-y-5">
          <div>
            <label class="form-label" for="admin-email">البريد الإلكتروني</label>
            <input id="admin-email" type="email" x-model="form.email" autocomplete="username" required class="form-input" placeholder="admin@nova.store" />
          </div>
          <div>
            <label class="form-label" for="admin-pass">كلمة المرور</label>
            <input id="admin-pass" type="password" x-model="form.password" autocomplete="current-password" required class="form-input" minlength="6" />
          </div>

          <div x-show="error" {...{ 'x-cloak': '' }} class="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-3 flex items-start gap-2">
            <i data-lucide="alert-triangle" class="w-4 h-4 flex-shrink-0 mt-0.5"></i>
            <span x-text="error"></span>
          </div>

          <button type="submit" {...{ ':disabled': 'loading' }} class="w-full h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-brand-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
            <span x-show="!loading" class="flex items-center gap-2">
              <i data-lucide="log-in" class="w-4 h-4"></i>
              <span>تسجيل الدخول</span>
            </span>
            <span x-show="loading" {...{ 'x-cloak': '' }} class="flex items-center gap-2">
              <span class="spinner" style="border-top-color: white"></span>
              <span>جاري التحقق...</span>
            </span>
          </button>

          <div class="text-center">
            <a href="/" class="text-sm text-ink-500 hover:text-brand-600">العودة للرئيسية</a>
          </div>
        </form>

        <div class="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
          <div class="flex items-center gap-2 font-bold mb-2">
            <i data-lucide="info" class="w-4 h-4"></i>
            <span>بيانات الدخول التجريبية</span>
          </div>
          <div class="space-y-1 font-mono text-[11px]">
            <div>البريد: <span class="select-all">admin@nova.store</span></div>
            <div>كلمة المرور: <span class="select-all">NovaAdmin@2026</span></div>
          </div>
          <div class="mt-2 text-amber-800">⚠️ هذه بيانات للعرض التوضيحي فقط — استبدلها في الإنتاج عبر متغيرات البيئة <code class="bg-amber-100 px-1 rounded">ADMIN_EMAIL</code> و <code class="bg-amber-100 px-1 rounded">ADMIN_PASSWORD</code>.</div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('alpine:init', () => {
            Alpine.data('adminLogin', () => ({
              form: { email: '', password: '' },
              loading: false,
              error: '',
              init() {},
              async submit() {
                if (this.loading) return;
                this.error = '';
                this.loading = true;
                try {
                  const r = await fetch('/api/auth/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: this.form.email.trim(), password: this.form.password })
                  });
                  const data = await r.json();
                  if (!data.ok) {
                    this.error = data.error === 'invalid_credentials'
                      ? 'بريد إلكتروني أو كلمة مرور غير صحيحة'
                      : 'تعذّر تسجيل الدخول';
                    this.loading = false;
                    return;
                  }
                  if (window.showToast) showToast('مرحباً! تم تسجيل الدخول', 'success');
                  window.location.href = ${JSON.stringify(safeNext)};
                } catch (e) {
                  this.error = 'تعذّر الاتصال بالخادم';
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
