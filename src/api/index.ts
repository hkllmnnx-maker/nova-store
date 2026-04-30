/**
 * Backend APIs - آمنة، تحقق كامل من المدخلات، لا تكشف أخطاء داخلية
 * =============================================================
 * تستخدم طبقة البيانات الموحدة store. تم تقسيم الـ routes إلى عامة وإدارية.
 */
import { Hono } from 'hono'
import { store, statusAr, type OrderStatus, ORDER_STATUSES } from '../data/store'
import { calcCouponDiscount } from '../lib/coupons'
import { calcShipping, FREE_SHIPPING_THRESHOLD } from '../lib/format'
import { safeId, safeNumber, clean, safeEnum, isValidEmail, isValidPhone, isValidUrl } from '../lib/security'
import {
  isAdminRequest,
  setAdminCookie,
  clearAdminCookie,
  getAdminToken,
  getAdminCredentials,
  isValidDemoCredentials
} from '../lib/auth'

const api = new Hono()

// === أمان عام لكل /api/* ===
api.use('*', async (c, next) => {
  c.header('Cache-Control', 'no-store')
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  await next()
})

// =====================================================
// ========== Public APIs (دون مصادقة) ===============
// =====================================================

// 1) /api/products — قائمة المنتجات مع الفلترة
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

  let result = store.listProducts()
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

// 2) /api/products/:id — تفاصيل منتج
api.get('/products/:id', (c) => {
  const id = safeId(c.req.param('id'))
  if (!id) return c.json({ ok: false, error: 'invalid_id' }, 400)
  const p = store.getProduct(id)
  if (!p) return c.json({ ok: false, error: 'not_found' }, 404)
  return c.json({ ok: true, product: p })
})

// 3) /api/categories — قائمة التصنيفات (count حقيقي)
api.get('/categories', (c) => {
  return c.json({ ok: true, items: store.listCategories() })
})

// 4) /api/coupons — قائمة الكوبونات النشطة (للعرض فقط، بدون usedCount)
api.get('/coupons', (c) => {
  const active = store
    .listCoupons()
    .filter((cp) => cp.active && new Date(cp.expiresAt).getTime() > Date.now())
    .map((cp) => ({
      code: cp.code,
      type: cp.type,
      value: cp.value,
      minSubtotal: cp.minSubtotal,
      description: cp.description,
      expiresAt: cp.expiresAt
    }))
  return c.json({ ok: true, items: active })
})

// 5) /api/coupons/apply — تحقق من كوبون
api.post('/coupons/apply', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const code = clean(body?.code, 32)
  const subtotal = safeNumber(body?.subtotal, 0, 0, 9999999)
  const coupon = store.findCoupon(code)
  if (!coupon) return c.json({ ok: false, error: 'invalid_coupon' }, 404)
  if (coupon.usageLimit && coupon.usedCount && coupon.usedCount >= coupon.usageLimit) {
    return c.json({ ok: false, error: 'usage_exceeded', message: 'تم استنفاد حد استخدام هذا الكوبون' }, 400)
  }
  if (subtotal < coupon.minSubtotal) {
    return c.json(
      {
        ok: false,
        error: 'min_not_met',
        minSubtotal: coupon.minSubtotal,
        message: `الحد الأدنى للطلب ${coupon.minSubtotal} ر.س`
      },
      400
    )
  }
  const calc = calcCouponDiscount(coupon, subtotal)
  return c.json({
    ok: true,
    coupon: {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      description: coupon.description
    },
    discount: calc.discount,
    freeShipping: calc.freeShipping
  })
})

// 6) /api/cart/calculate — حساب التوتالات server-side (لا نثق بأسعار العميل)
api.post('/cart/calculate', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const items = Array.isArray(body?.items) ? body.items.slice(0, 50) : []
  const couponCode = clean(body?.coupon, 32)

  const validated: any[] = []
  for (const it of items) {
    const id = safeId(it?.id)
    const qty = safeNumber(it?.quantity, 1, 1, 99)
    if (!id) continue
    const p = store.getProduct(id)
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
    const coupon = store.findCoupon(couponCode)
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

// 7) /api/orders — إنشاء طلب جديد
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

  // إعادة حساب التوتالات على السيرفر مباشرة
  const items = Array.isArray(body?.items) ? body.items.slice(0, 50) : []
  const validated: any[] = []
  for (const it of items) {
    const id = safeId(it?.id)
    const qty = safeNumber(it?.quantity, 1, 1, 99)
    if (!id) continue
    const p = store.getProduct(id)
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
  let appliedCouponCode: string | undefined
  if (couponCode) {
    const coupon = store.findCoupon(couponCode)
    if (coupon && subtotal >= coupon.minSubtotal) {
      const r = calcCouponDiscount(coupon, subtotal)
      couponDiscount = r.discount
      freeShippingFromCoupon = r.freeShipping
      appliedCouponCode = coupon.code
    }
  }
  const shipping = calcShipping(subtotal, freeShippingFromCoupon)
  const total = Math.max(0, subtotal - couponDiscount + shipping)

  const orderId = store.generateOrderId()
  const now = new Date()
  const created = store.createOrder({
    id: orderId,
    date: now.toISOString(),
    status: 'pending',
    statusAr: statusAr('pending'),
    customer: { fullName, phone, email, city, district, address, postal, notes },
    payment,
    items: validated,
    itemsCount: validated.reduce((s, i) => s + i.quantity, 0),
    subtotal,
    couponCode: appliedCouponCode,
    couponDiscount,
    shipping,
    total
  })

  return c.json({ ok: true, order: created })
})

// 8) /api/orders/track — تتبع الطلب (بحث عام برقم الطلب + جزء من بيانات الاتصال)
api.get('/orders/track/:id', (c) => {
  const id = clean(c.req.param('id'), 32).toUpperCase()
  const phoneOrEmail = clean(c.req.query('contact'), 100).toLowerCase()
  if (!id || !/^NV-\d{6}-\d{3,5}$/i.test(id)) {
    return c.json({ ok: false, error: 'invalid_id' }, 400)
  }
  const order = store.getOrder(id)
  // لا نكشف وجود الطلب أو لا (منع IDOR/enum)
  if (!order) return c.json({ ok: false, error: 'not_found' }, 404)
  // مطابقة contact مع الجوال أو البريد إن قُدّم (حماية إضافية)
  if (phoneOrEmail) {
    const ph = (order.customer.phone || '').toLowerCase()
    const em = (order.customer.email || '').toLowerCase()
    if (ph !== phoneOrEmail && em !== phoneOrEmail) {
      return c.json({ ok: false, error: 'not_found' }, 404)
    }
  }
  // إرجاع نسخة مخفّفة (لا تكشف بيانات حساسة كاملة لمن لا يعرف الـ contact)
  const safe = {
    id: order.id,
    date: order.date,
    status: order.status,
    statusAr: order.statusAr,
    itemsCount: order.itemsCount,
    total: order.total,
    history: order.history,
    customerHint: {
      fullName: order.customer.fullName.split(' ')[0] + ' ***',
      city: order.customer.city
    },
    items: order.items
  }
  return c.json({ ok: true, order: safe })
})

// =====================================================
// ============== Auth ================================
// =====================================================

// تسجيل دخول الأدمن (Cookie-based)
api.post('/auth/admin/login', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const email = clean(body?.email, 254)
  const password = clean(body?.password, 128)
  const env = (c.env as any) || {}
  const creds = getAdminCredentials(env)
  if (!email || !password) {
    return c.json({ ok: false, error: 'invalid_credentials' }, 400)
  }
  if (email.toLowerCase() !== creds.email.toLowerCase() || password !== creds.password) {
    return c.json({ ok: false, error: 'invalid_credentials' }, 401)
  }
  const token = getAdminToken(env)
  setAdminCookie(c, token)
  return c.json({ ok: true, role: 'admin' })
})

api.post('/auth/admin/logout', (c) => {
  clearAdminCookie(c)
  return c.json({ ok: true })
})

api.get('/auth/admin/me', (c) => {
  return c.json({ ok: true, isAdmin: isAdminRequest(c) })
})

// تسجيل دخول العميل (تجريبي محلي بالكامل — لا يُحفظ في السيرفر)
api.post('/auth/login', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const email = clean(body?.email, 254)
  const password = clean(body?.password, 128)
  if (!isValidDemoCredentials(email, password)) {
    return c.json({ ok: false, error: 'invalid_credentials' }, 400)
  }
  // لا نخزّن جلسات حقيقية للعميل في الخادم. هذا تأكيد فقط.
  return c.json({
    ok: true,
    user: { email, name: email.split('@')[0] },
    note: 'demo_only'
  })
})

// =====================================================
// ============== Admin APIs (محمية) =================
// =====================================================

// Middleware: حماية كل /admin/*
api.use('/admin/*', async (c, next) => {
  if (!isAdminRequest(c)) {
    return c.json({ ok: false, error: 'unauthorized' }, 401)
  }
  await next()
})

// نظرة عامة (إحصائيات + قوائم مختصرة)
api.get('/admin/overview', (c) => {
  return c.json({
    ok: true,
    stats: store.getStats(),
    recentOrders: store.recentOrders(8),
    topSelling: store.topSelling(5),
    lowStock: store.lowStockProducts(20, 5)
  })
})

// إدارة المنتجات
api.get('/admin/products', (c) => {
  return c.json({ ok: true, items: store.listProducts() })
})

api.post('/admin/products', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const errors = validateProductInput(body)
  if (errors.length > 0) return c.json({ ok: false, error: 'invalid_fields', fields: errors }, 400)

  const created = store.createProduct({
    name: clean(body.name, 200),
    nameEn: clean(body.nameEn || body.name, 200),
    category: clean(body.category, 50),
    price: safeNumber(body.price, 0, 0, 9999999),
    oldPrice: body.oldPrice ? safeNumber(body.oldPrice, 0, 0, 9999999) : undefined,
    stock: safeNumber(body.stock, 0, 0, 999999),
    rating: safeNumber(body.rating, 5, 0, 5),
    reviewsCount: safeNumber(body.reviewsCount, 0, 0, 999999),
    sold: safeNumber(body.sold, 0, 0, 999999),
    image: clean(body.image, 500),
    images: Array.isArray(body.images) ? body.images.map((u: any) => clean(u, 500)).filter(Boolean) : [],
    description: clean(body.description, 2000),
    features: Array.isArray(body.features) ? body.features.map((f: any) => clean(f, 200)).filter(Boolean) : [],
    specs: Array.isArray(body.specs) ? body.specs : [],
    isNew: !!body.isNew,
    isFeatured: !!body.isFeatured,
    isBestSeller: !!body.isBestSeller
  })
  return c.json({ ok: true, product: created })
})

api.put('/admin/products/:id', async (c) => {
  const id = safeId(c.req.param('id'))
  if (!id) return c.json({ ok: false, error: 'invalid_id' }, 400)
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const errors = validateProductInput(body, true)
  if (errors.length > 0) return c.json({ ok: false, error: 'invalid_fields', fields: errors }, 400)

  const updated = store.updateProduct(id, {
    name: body.name !== undefined ? clean(body.name, 200) : undefined,
    nameEn: body.nameEn !== undefined ? clean(body.nameEn, 200) : undefined,
    category: body.category !== undefined ? clean(body.category, 50) : undefined,
    price: body.price !== undefined ? safeNumber(body.price, 0, 0, 9999999) : undefined,
    oldPrice: body.oldPrice !== undefined ? (body.oldPrice ? safeNumber(body.oldPrice, 0, 0, 9999999) : undefined) : undefined,
    stock: body.stock !== undefined ? safeNumber(body.stock, 0, 0, 999999) : undefined,
    rating: body.rating !== undefined ? safeNumber(body.rating, 0, 0, 5) : undefined,
    image: body.image !== undefined ? clean(body.image, 500) : undefined,
    images: Array.isArray(body.images) ? body.images.map((u: any) => clean(u, 500)).filter(Boolean) : undefined,
    description: body.description !== undefined ? clean(body.description, 2000) : undefined,
    features: Array.isArray(body.features) ? body.features.map((f: any) => clean(f, 200)).filter(Boolean) : undefined,
    isNew: body.isNew !== undefined ? !!body.isNew : undefined,
    isFeatured: body.isFeatured !== undefined ? !!body.isFeatured : undefined,
    isBestSeller: body.isBestSeller !== undefined ? !!body.isBestSeller : undefined
  })
  if (!updated) return c.json({ ok: false, error: 'not_found' }, 404)
  return c.json({ ok: true, product: updated })
})

api.delete('/admin/products/:id', (c) => {
  const id = safeId(c.req.param('id'))
  if (!id) return c.json({ ok: false, error: 'invalid_id' }, 400)
  const ok = store.deleteProduct(id)
  if (!ok) return c.json({ ok: false, error: 'not_found' }, 404)
  return c.json({ ok: true })
})

// إدارة الطلبات
api.get('/admin/orders', (c) => {
  return c.json({ ok: true, items: store.listOrders() })
})

api.get('/admin/orders/:id', (c) => {
  const id = clean(c.req.param('id'), 32).toUpperCase()
  const order = store.getOrder(id)
  if (!order) return c.json({ ok: false, error: 'not_found' }, 404)
  return c.json({ ok: true, order })
})

api.put('/admin/orders/:id/status', async (c) => {
  const id = clean(c.req.param('id'), 32).toUpperCase()
  let body: any = {}
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_body' }, 400)
  }
  const status = safeEnum(
    body?.status,
    ['pending', 'processing', 'shipped', 'completed', 'cancelled'] as const,
    'pending'
  ) as OrderStatus
  const note = clean(body?.note, 200)
  const result = store.updateOrderStatus(id, status, note)
  if (!result.ok) {
    return c.json({ ok: false, error: result.error || 'failed' }, result.error === 'not_found' ? 404 : 400)
  }
  return c.json({ ok: true, order: result.order })
})

api.delete('/admin/orders/:id', (c) => {
  const id = clean(c.req.param('id'), 32).toUpperCase()
  const ok = store.deleteOrder(id)
  if (!ok) return c.json({ ok: false, error: 'not_found' }, 404)
  return c.json({ ok: true })
})

// قائمة الكوبونات الكاملة (للأدمن)
api.get('/admin/coupons', (c) => {
  return c.json({ ok: true, items: store.listCoupons() })
})

// قائمة حالات الطلبات (مرجع للأدمن)
api.get('/admin/order-statuses', (c) => {
  return c.json({ ok: true, items: ORDER_STATUSES })
})

// Settings
api.get('/admin/settings', (c) => {
  return c.json({ ok: true, settings: store.getSettings() })
})

// =====================================================
// ============= Helpers ============================
// =====================================================
function validateProductInput(body: any, isUpdate = false): string[] {
  const errors: string[] = []
  if (!isUpdate || body.name !== undefined) {
    const name = clean(body.name, 200)
    if (!name || name.length < 3) errors.push('name')
  }
  if (!isUpdate || body.category !== undefined) {
    const cat = clean(body.category, 50)
    if (!cat) errors.push('category')
  }
  if (!isUpdate || body.price !== undefined) {
    const price = Number(body.price)
    if (!Number.isFinite(price) || price < 0 || price > 9999999) errors.push('price')
  }
  if (body.oldPrice !== undefined && body.oldPrice !== null && body.oldPrice !== '') {
    const op = Number(body.oldPrice)
    const p = Number(body.price)
    if (!Number.isFinite(op) || op < 0) errors.push('oldPrice')
    else if (Number.isFinite(p) && op <= p) errors.push('oldPrice')
  }
  if (body.stock !== undefined) {
    const s = Number(body.stock)
    if (!Number.isFinite(s) || s < 0) errors.push('stock')
  }
  if (body.image !== undefined && body.image) {
    if (!isValidUrl(String(body.image))) errors.push('image')
  }
  return errors
}

// 404 default
api.all('*', (c) => c.json({ ok: false, error: 'not_found' }, 404))

export default api
