/**
 * نظام الكوبونات - بيانات تجريبية وتحقق آمن
 */
export interface Coupon {
  code: string
  type: 'percent' | 'fixed' | 'shipping'
  value: number
  minSubtotal: number
  description: string
  expiresAt: string
  active: boolean
}

export const coupons: Coupon[] = [
  {
    code: 'NOVA10',
    type: 'percent',
    value: 10,
    minSubtotal: 0,
    description: 'خصم 10% على إجمالي الطلب',
    expiresAt: '2026-12-31',
    active: true
  },
  {
    code: 'WELCOME20',
    type: 'percent',
    value: 20,
    minSubtotal: 300,
    description: 'خصم 20% للطلبات فوق 300 ر.س',
    expiresAt: '2026-12-31',
    active: true
  },
  {
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    minSubtotal: 200,
    description: 'خصم ثابت 50 ر.س على الطلبات فوق 200 ر.س',
    expiresAt: '2026-12-31',
    active: true
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 0,
    minSubtotal: 0,
    description: 'شحن مجاني بدون حد أدنى',
    expiresAt: '2026-12-31',
    active: true
  }
]

export function findCoupon(code: string): Coupon | undefined {
  if (!code || typeof code !== 'string') return undefined
  const normalized = code.trim().toUpperCase().slice(0, 32)
  return coupons.find(
    (c) => c.code === normalized && c.active && new Date(c.expiresAt).getTime() > Date.now()
  )
}

export function calcCouponDiscount(coupon: Coupon, subtotal: number): { discount: number; freeShipping: boolean } {
  if (subtotal < coupon.minSubtotal) return { discount: 0, freeShipping: false }
  if (coupon.type === 'percent') {
    return { discount: Math.round((subtotal * coupon.value) / 100), freeShipping: false }
  }
  if (coupon.type === 'fixed') {
    return { discount: Math.min(coupon.value, subtotal), freeShipping: false }
  }
  if (coupon.type === 'shipping') {
    return { discount: 0, freeShipping: true }
  }
  return { discount: 0, freeShipping: false }
}
