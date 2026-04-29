import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'

export const LoginPage: FC = () => {
  return (
    <Layout title="تسجيل الدخول - متجر نوڤا" currentPage="login">
      <section class="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-ink-50 via-white to-brand-50/50">
        <div class="w-full max-w-md">
          <div class="text-center mb-8">
            <a href="/" class="inline-flex items-center gap-2.5 mb-6">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 flex items-center justify-center text-white font-black text-2xl shadow-glow">N</div>
              <div class="text-right">
                <div class="font-display font-black text-2xl text-ink-900 leading-none">نوڤا</div>
                <div class="text-[10px] text-ink-500 font-medium tracking-[0.2em]">NOVA STORE</div>
              </div>
            </a>
            <h1 class="text-3xl font-black text-ink-900 mb-2">أهلاً بعودتك!</h1>
            <p class="text-ink-600">سجّل دخولك للوصول إلى حسابك ومتابعة طلباتك.</p>
          </div>

          <div class="bg-white rounded-3xl shadow-card border border-ink-200 p-7" x-data="loginForm()">
            {/* Tabs */}
            <div class="flex bg-ink-100 rounded-xl p-1 mb-6">
              <button type="button" class="flex-1 h-10 rounded-lg text-sm font-bold transition-all" x-bind:class="mode==='login' ? 'bg-white text-ink-900 shadow' : 'text-ink-600'" x-on:click="mode='login'">
                تسجيل الدخول
              </button>
              <button type="button" class="flex-1 h-10 rounded-lg text-sm font-bold transition-all" x-bind:class="mode==='register' ? 'bg-white text-ink-900 shadow' : 'text-ink-600'" x-on:click="mode='register'">
                إنشاء حساب
              </button>
            </div>

            <form x-on:submit="event.preventDefault(); submit()" class="space-y-4">
              <template x-if="mode==='register'">
                <div>
                  <label class="block text-sm font-semibold text-ink-700 mb-1.5">الاسم الكامل</label>
                  <div class="relative">
                    <i data-lucide="user" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-ink-400"></i>
                    <input type="text" x-model="form.name" required minlength="3" class="form-input h-11 pr-10 pl-3 text-sm" placeholder="اسمك الكريم" />
                  </div>
                </div>
              </template>

              <div>
                <label class="block text-sm font-semibold text-ink-700 mb-1.5">البريد الإلكتروني</label>
                <div class="relative">
                  <i data-lucide="mail" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-ink-400"></i>
                  <input type="email" x-model="form.email" required class="form-input h-11 pr-10 pl-3 text-sm" placeholder="example@nova.store" maxlength="254" autocomplete="email" />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-sm font-semibold text-ink-700">كلمة المرور</label>
                  <template x-if="mode==='login'">
                    <a href="#" class="text-xs text-brand-600 hover:underline" x-on:click="event.preventDefault(); forgot()">نسيت كلمة المرور؟</a>
                  </template>
                </div>
                <div class="relative">
                  <i data-lucide="lock" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-ink-400"></i>
                  <input x-bind:type="showPwd ? 'text' : 'password'" x-model="form.password" required minlength="6" maxlength="64" class="form-input h-11 pr-10 pl-10 text-sm" placeholder="••••••••" autocomplete="current-password" />
                  <button type="button" class="absolute top-1/2 -translate-y-1/2 left-3 text-ink-400 hover:text-ink-600" x-on:click="showPwd = !showPwd" aria-label="إظهار كلمة المرور">
                    <i x-bind:data-lucide="showPwd ? 'eye-off' : 'eye'" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>

              <template x-if="mode==='login'">
                <label class="flex items-center gap-2 text-sm text-ink-700 cursor-pointer">
                  <input type="checkbox" x-model="form.remember" class="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
                  <span>تذكّرني على هذا الجهاز</span>
                </label>
              </template>

              <template x-if="mode==='register'">
                <label class="flex items-start gap-2 text-sm text-ink-700 cursor-pointer">
                  <input type="checkbox" required class="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500 mt-0.5" />
                  <span>أوافق على <a href="#" class="text-brand-600 hover:underline">الشروط والأحكام</a> و<a href="#" class="text-brand-600 hover:underline">سياسة الخصوصية</a></span>
                </label>
              </template>

              <button type="submit" class="btn btn-primary w-full h-12 text-base" x-bind:disabled="loading" x-bind:class="loading ? 'opacity-60 cursor-not-allowed' : ''">
                <template x-if="!loading">
                  <span class="flex items-center gap-2">
                    <i x-bind:data-lucide="mode==='login' ? 'log-in' : 'user-plus'" class="w-4 h-4"></i>
                    <span x-text="mode==='login' ? 'تسجيل الدخول' : 'إنشاء الحساب'"></span>
                  </span>
                </template>
                <template x-if="loading"><span class="spinner"></span></template>
              </button>
            </form>

            <div class="my-6 flex items-center gap-3 text-xs text-ink-400">
              <div class="flex-1 h-px bg-ink-200"></div>
              <span>أو</span>
              <div class="flex-1 h-px bg-ink-200"></div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <button type="button" class="h-11 rounded-xl border border-ink-200 hover:bg-ink-50 text-sm font-semibold flex items-center justify-center gap-2 transition-colors" x-on:click="oauth('Google')">
                <span class="text-base">G</span><span>Google</span>
              </button>
              <button type="button" class="h-11 rounded-xl border border-ink-200 hover:bg-ink-50 text-sm font-semibold flex items-center justify-center gap-2 transition-colors" x-on:click="oauth('Apple')">
                <i data-lucide="apple" class="w-4 h-4"></i><span>Apple</span>
              </button>
            </div>
          </div>

          <p class="text-center text-xs text-ink-500 mt-6 flex items-center justify-center gap-1.5">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i>
            <span>بياناتك محمية بتشفير 256-bit SSL</span>
          </p>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        function loginForm() {
          return {
            mode: 'login',
            showPwd: false,
            loading: false,
            form: { name: '', email: '', password: '', remember: true },
            submit() {
              if (this.loading) return;
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                window.showToast && window.showToast(
                  this.mode === 'login' ? 'هذا عرض توضيحي فقط — تسجيل الدخول غير مفعّل بعد' : 'هذا عرض توضيحي فقط — التسجيل غير مفعّل بعد',
                  'info'
                );
              }, 800);
            },
            forgot() {
              window.showToast && window.showToast('سيتم إرسال رابط الاسترجاع قريباً (عرض توضيحي)', 'info');
            },
            oauth(provider) {
              window.showToast && window.showToast('OAuth ' + provider + ' غير مفعّل في هذا العرض', 'info');
            }
          }
        }
      ` }}
      ></script>
    </Layout>
  )
}
