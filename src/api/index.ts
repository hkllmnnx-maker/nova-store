/**
 * Backend APIs - آمنة، تحقق كامل من المدخلات، لا تكشف أخطاء داخلية
 */
import { Hono } from 'hono'
import { products, getProductById, categories } from '../data/products'
import { findCoupon, calcCouponDiscount, coupons } from '../lib/coupons'
import { calcShipping, FREE_SHIPPING_THRESHOLD } from '../lib/format'
import { safeId, safeNumber, clean, safeEnum, isValidEmail, isValidPhone } from '../lib/security'

const api = new Hono()

// CORS لـ /api/* فقط (داخلي)
api.use('*', async (c, next) => {
  c.header('Cache-Control', 'no-store')
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  await next()
})

// ============================
// 1. /api/products — قائمة المنتجات مع الفلترة
// ============================
api.get('/products', (c) => {
  const q = clean(c.req.query('q'), 100).toLowerCase()
  const category = clean(c.req.query('category'), 50)
  const sort = safeEnum(
    c.req.query('sort'),
    ['newest', 'price-asc', 'price-desc', 'rating', 'bestseller'] as const,
    'newest'
  )
  const minPrice = safeNumber(c.req.query('minPrice'), 0, 0, 999999)
  const maxPrice = safeNumber(c.req.query('maxPrice'), 999999, 0, 999999)
  const ratingMin = safeNumber(c.req.query('rating'), 0, 0, 5)
  const onsale = c.req.query('onsale') === '1' || c.req.query('onsale') === 'true'
  const limit = safeNumber(c.req.query('limit'), 60, 1, 60)

  let result = products.slice()
  if (category) result = result.filter((p) => p.category === category)
  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.categoryAr.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }
  result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice && p.rating >= ratingMin)
  if (onsale) result = result.filter((p) => p.oldPrice && p.oldPrice > p.price)

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'bestseller':
      result.sort((a, b) => b.sold - a.sold)
      break
    default:
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  // إرجاع الحد الأدنى من البيانات اللازمة
  const trimmed = result.slice(0, limit).map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    categoryAr: p.categoryAr,
    price: p.price,
    oldPrice: p.oldPrice,
    image: p.image,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    sold: p.sold,
    stock: p.stock,
    isNew: p.isNew,
    isBestSeller: p.isBestSeller
  }))

  return c.json({ ok: true, total: result.length, items: trimmed })
})

// ============================
// 2. /api/products/:id — تفاصيل منتج
// ============================
api.get('/products/:id', (c) => {
  const id = safeId(c.req.param('id'))
  if (!id) return c.json({ ok: false, error: 'invalid_id' }, 400)
  const p = getProductById(id)
  if (!p) return c.json({ ok: false, error: 'not_found' }, 404)
  return c.json({ ok: true, product: p })
})

// ============================
// 3. /api/categories — قائمة التصنيفات
// ============================
api.get('/categories', (c) => {
  return c.json({ ok: true, items: categories })
})

// ============================
// 4. /api/coupons — قائمة الكوبونات النشطة (للعرض)
// ============================
api.get('/coupons', (c) => {
  const active = coupons.filter(
    (c0) => c0.active && new Date(c0.expiresAt).getTime() > Date.now()
  )
  return c.json({ ok: true, items: active })
})

// ============================
// 5. /api/coupons/apply — تحقق من كوبون
// ============================
api.post('/coupons/apply', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const code = clean(body?.code, 32)
  const subtotal = safeNumber(body?.subtotal, 0, 0, 9999999)
  const coupon = findCoupon(code)
  if (!coupon) return c.json({ ok: false, error: 'invalid_coupon' }, 404)
  if (subtotal < coupon.minSubtotal) {
    return c.json({
      ok: false,
      error: 'min_not_met',
      minSubtotal: coupon.minSubtotal,
      message: `الحد الأدنى للطلب ${coupon.minSubtotal} ر.س`
    }, 400)
  }
  const calc = calcCouponDiscount(coupon, subtotal)
  return c.json({
    ok: true,
    coupon: { code: coupon.code, type: coupon.type, value: coupon.value, description: coupon.description },
    discount: calc.discount,
    freeShipping: calc.freeShipping
  })
})

// ============================
// 6. /api/cart/calculate — حساب التوتالات server-side
// ============================
api.post('/cart/calculate', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const items = Array.isArray(body?.items) ? body.items.slice(0, 50) : []
  const couponCode = clean(body?.coupon, 32)

  // إعادة بناء السلة من بيانات السيرفر فقط (لا نثق في أسعار العميل)
  const validated = []
  for (const it of items) {
    const id = safeId(it?.id)
    const qty = safeNumber(it?.quantity, 1, 1, 99)
    if (!id) continue
    const p = getProductById(id)
    if (!p) continue
    const realQty = Math.min(qty, p.stock)
    if (realQty <= 0) continue
    validated.push({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      oldPrice: p.oldPrice,
      categoryAr: p.categoryAr,
      stock: p.stock,
      quantity: realQty,
      lineTotal: p.price * realQty
    })
  }

  const subtotal = validated.reduce((s, i) => s + i.lineTotal, 0)
  const savings = validated.reduce(
    (s, i) => s + (i.oldPrice ? (i.oldPrice - i.price) * i.quantity : 0),
    0
  )

  let couponDiscount = 0
  let freeShippingFromCoupon = false
  let appliedCoupon: { code: string; description: string } | null = null
  if (couponCode) {
    const coupon = findCoupon(couponCode)
    if (coupon && subtotal >= coupon.minSubtotal) {
      const r = calcCouponDiscount(coupon, subtotal)
      couponDiscount = r.discount
      freeShippingFromCoupon = r.freeShipping
      appliedCoupon = { code: coupon.code, description: coupon.description }
    }
  }

  const shipping = calcShipping(subtotal, freeShippingFromCoupon)
  const total = Math.max(0, subtotal - couponDiscount + shipping)

  return c.json({
    ok: true,
    items: validated,
    subtotal,
    savings,
    couponDiscount,
    coupon: appliedCoupon,
    shipping,
    total,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD
  })
})

// ============================
// 7. /api/orders — إنشاء طلب
// ============================
api.post('/orders', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }

  const customer = body?.customer ?? {}
  const fullName = clean(customer.fullName, 100)
  const phone = clean(customer.phone, 20)
  const email = clean(customer.email, 254)
  const city = clean(customer.city, 50)
  const district = clean(customer.district, 100)
  const address = clean(customer.address, 200)
  const postal = clean(customer.postal, 10)
  const notes = clean(customer.notes, 500)
  const payment = safeEnum(body?.payment, ['card', 'apple', 'cod'] as const, 'card')

  if (fullName.length < 3) return c.json({ ok: false, error: 'invalid_name' }, 400)
  if (!isValidPhone(phone)) return c.json({ ok: false, error: 'invalid_phone' }, 400)
  if (!isValidEmail(email)) return c.json({ ok: false, error: 'invalid_email' }, 400)
  if (!city) return c.json({ ok: false, error: 'invalid_city' }, 400)
  if (address.length < 10) return c.json({ ok: false, error: 'invalid_address' }, 400)

  // إعادة حساب التوتالات على السيرفر
  const calcReq = await fetch('http://localhost' /* dummy */).catch(() => null)
  // نستخدم الدالة مباشرة بدلاً من fetch لتجنّب CF Workers limitations
  const items = Array.isArray(body?.items) ? body.items.slice(0, 50) : []
  const validated = []
  for (const it of items) {
    const id = safeId(it?.id)
    const qty = safeNumber(it?.quantity, 1, 1, 99)
    if (!id) continue
    const p = getProductById(id)
    if (!p) continue
    const realQty = Math.min(qty, p.stock)
    if (realQty <= 0) continue
    validated.push({ id: p.id, name: p.name, image: p.image, price: p.price, quantity: realQty })
  }
  if (validated.length === 0) return c.json({ ok: false, error: 'empty_cart' }, 400)

  const subtotal = validated.reduce((s, i) => s + i.price * i.quantity, 0)
  const couponCode = clean(body?.coupon, 32)
  let couponDiscount = 0
  let freeShippingFromCoupon = false
  if (couponCode) {
    const coupon = findCoupon(couponCode)
    if (coupon && subtotal >= coupon.minSubtotal) {
      const r = calcCouponDiscount(coupon, subtotal)
      couponDiscount = r.discount
      freeShippingFromCoupon = r.freeShipping
    }
  }
  const shipping = calcShipping(subtotal, freeShippingFromCoupon)
  const total = Math.max(0, subtotal - couponDiscount + shipping)

  // إنشاء معرّف طلب آمن
  const now = new Date()
  const stamp =
    String(now.getFullYear()).slice(2) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  const orderId = `NV-${stamp}-${rand}`

  return c.json({
    ok: true,
    order: {
      id: orderId,
      date: now.toISOString(),
      status: 'قيد المعالجة',
      customer: { fullName, phone, email, city, district, address, postal, notes },
      payment,
      items: validated,
      subtotal,
      couponDiscount,
      shipping,
      total
    }
  })
})

// 404 default
api.all('*', (c) => c.json({ ok: false, error: 'not_found' }, 404))

export default api
