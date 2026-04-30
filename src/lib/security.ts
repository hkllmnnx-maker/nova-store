/**
 * أدوات الأمان - تنظيف المدخلات ومنع XSS
 */

// تنظيف HTML من أي علامات أو تعابير خطرة
export function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) return ''
  const str = String(input)
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;')
}

// تنظيف JSON قبل embedding داخل <script>
// منع كسر السكربت أو حقن HTML
export function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

// تنظيف نص بسيط (للاستخدام في attributes أو text)
export function clean(input: unknown, maxLen = 1000): string {
  if (input === null || input === undefined) return ''
  return String(input).slice(0, maxLen).trim()
}

// التحقق من رقم آمن
export function safeNumber(input: unknown, def = 0, min = -Infinity, max = Infinity): number {
  const n = Number(input)
  if (!Number.isFinite(n)) return def
  return Math.min(Math.max(n, min), max)
}

// التحقق من ID صالح
export function safeId(input: unknown): number | null {
  const n = Number(input)
  if (!Number.isInteger(n) || n < 1 || n > 999999) return null
  return n
}

// التحقق من البريد الإلكتروني
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

// التحقق من رقم الجوال السعودي
export function isValidPhone(phone: string): boolean {
  return /^(05)[0-9]{8}$/.test(phone.replace(/\s/g, ''))
}

// التحقق من قيم enum مسموحة
export function safeEnum<T extends string>(input: unknown, allowed: readonly T[], def: T): T {
  const v = String(input ?? '')
  return (allowed as readonly string[]).includes(v) ? (v as T) : def
}

// التحقق من URL آمن (https/http فقط)
export function isValidUrl(input: string): boolean {
  if (typeof input !== 'string' || input.length > 2000) return false
  try {
    const u = new URL(input)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}
