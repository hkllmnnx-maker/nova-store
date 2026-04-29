/**
 * أدوات التنسيق للأسعار والتواريخ
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 0 }).format(Math.round(price))
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function calcDiscount(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

// حساب الشحن
export const SHIPPING_FEE = 25
export const FREE_SHIPPING_THRESHOLD = 500

export function calcShipping(subtotal: number, freeShippingApplied = false): number {
  if (freeShippingApplied || subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return SHIPPING_FEE
}
