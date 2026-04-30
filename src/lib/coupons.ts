/**
 * نظام الكوبونات - واجهة موحدة تستخدم طبقة البيانات
 * تم الإبقاء على الواجهة القديمة (coupons, findCoupon, calcCouponDiscount)
 * من أجل التوافق مع الكود السابق.
 */
import { store, type Coupon } from '../data/store'

export type { Coupon }

// إعادة تصدير قائمة الكوبونات (للتوافق مع الكود القديم)
export const coupons = store.listCoupons()

export function findCoupon(code: string): Coupon | undefined {
  return store.findCoupon(code)
}

export function calcCouponDiscount(
  coupon: Coupon,
  subtotal: number
): { discount: number; freeShipping: boolean } {
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
