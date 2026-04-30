/**
 * نظام المصادقة (وضع تجريبي/عرض توضيحي)
 * ===================================================
 * - يعتمد على ملف بيئة لا يُرفع لـ Git: ADMIN_TOKEN.
 * - في حال عدم تعيينه، يُستخدم رمز تجريبي معروف للجميع وتُعرض رسالة واضحة.
 * - لا تعتمد على هذا النظام لأي بيانات حساسة في إنتاج حقيقي.
 * - يستخدم Cookie HttpOnly + Bearer كذلك للسماح بالـ fetch من JS.
 */
import type { Context } from 'hono'

// رمز افتراضي تجريبي. في الإنتاج: عيّن ADMIN_TOKEN في wrangler vars / secrets.
export const DEMO_ADMIN_TOKEN = 'nova-demo-admin-2026'
export const DEMO_ADMIN_EMAIL = 'admin@nova.store'
export const DEMO_ADMIN_PASSWORD = 'NovaAdmin@2026' // فقط للعرض. لا يُستخدم للإنتاج.

export const ADMIN_COOKIE = 'nova_admin_session'
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8 // 8 ساعات

// قراءة Cookie
function getCookie(c: Context, name: string): string | undefined {
  const header = c.req.header('cookie') || ''
  const match = header.split(/;\s*/).find((s) => s.startsWith(name + '='))
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : undefined
}

// قراءة Bearer token
function getBearer(c: Context): string | undefined {
  const auth = c.req.header('authorization') || ''
  if (auth.startsWith('Bearer ')) return auth.slice(7).trim()
  return undefined
}

// مقارنة آمنة بطول ثابت لمنع timing attacks (مبسط)
function safeEqual(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  if (a.length !== b.length) return false
  let r = 0
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return r === 0
}

export function getAdminToken(env: any): string {
  const fromEnv = env?.ADMIN_TOKEN
  if (fromEnv && typeof fromEnv === 'string' && fromEnv.length >= 8) return fromEnv
  return DEMO_ADMIN_TOKEN
}

export function getAdminCredentials(env: any): { email: string; password: string } {
  const email = (env?.ADMIN_EMAIL && typeof env.ADMIN_EMAIL === 'string') ? env.ADMIN_EMAIL : DEMO_ADMIN_EMAIL
  const password = (env?.ADMIN_PASSWORD && typeof env.ADMIN_PASSWORD === 'string') ? env.ADMIN_PASSWORD : DEMO_ADMIN_PASSWORD
  return { email, password }
}

export function isAdminRequest(c: Context): boolean {
  const expected = getAdminToken((c.env as any) || {})
  const cookie = getCookie(c, ADMIN_COOKIE)
  if (cookie && safeEqual(cookie, expected)) return true
  const bearer = getBearer(c)
  if (bearer && safeEqual(bearer, expected)) return true
  return false
}

export function setAdminCookie(c: Context, token: string) {
  c.header(
    'Set-Cookie',
    `${ADMIN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${ADMIN_COOKIE_MAX_AGE}; SameSite=Lax; HttpOnly; Secure`
  )
}

export function clearAdminCookie(c: Context) {
  c.header('Set-Cookie', `${ADMIN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly; Secure`)
}

// مصادقة عميل غير-أدمن (تجريبية بالكامل)
// نستخدم أي بريد + كلمة مرور بطول 6+ كاعتماد محلي. ليس بديلاً لمصادقة حقيقية.
export function isValidDemoCredentials(email: string, password: string): boolean {
  if (!email || !password) return false
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false
  if (password.length < 6) return false
  return true
}
