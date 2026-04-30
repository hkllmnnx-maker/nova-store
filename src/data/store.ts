/**
 * طبقة البيانات الموحدة (In-Memory Data Store)
 * ============================================
 * هذه الطبقة تعمل كمصدر وحيد للبيانات في النسخة الحالية. يمكن استبدالها مستقبلاً
 * بـ Cloudflare D1 أو KV دون تغيير منطق الأعمال (تم فصل العقود/الواجهات).
 *
 * ⚠️  ملاحظة: في بيئة Cloudflare Workers، كل isolate لديه ذاكرة منفصلة، لذا التغييرات
 * (مثل إضافة منتج/طلب) قد لا تستمر بعد إعادة التشغيل أو بين الـ isolates المختلفة.
 * لكنها مناسبة جداً للعرض التوضيحي ومعالجة طلبات متعددة في نفس الـ isolate.
 */
import { products as initialProducts, categories as initialCategories, type Product, type Category } from './products'

// ===================== Coupons =====================
export interface Coupon {
  code: string
  type: 'percent' | 'fixed' | 'shipping'
  value: number
  minSubtotal: number
  description: string
  expiresAt: string
  active: boolean
  usageLimit?: number
  usedCount?: number
}

const initialCoupons: Coupon[] = [
  {
    code: 'NOVA10',
    type: 'percent',
    value: 10,
    minSubtotal: 0,
    description: 'خصم 10% على إجمالي الطلب',
    expiresAt: '2026-12-31',
    active: true,
    usageLimit: 1000,
    usedCount: 0
  },
  {
    code: 'WELCOME20',
    type: 'percent',
    value: 20,
    minSubtotal: 300,
    description: 'خصم 20% للطلبات فوق 300 ر.س',
    expiresAt: '2026-12-31',
    active: true,
    usageLimit: 500,
    usedCount: 0
  },
  {
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    minSubtotal: 200,
    description: 'خصم ثابت 50 ر.س على الطلبات فوق 200 ر.س',
    expiresAt: '2026-12-31',
    active: true,
    usageLimit: 1000,
    usedCount: 0
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

// ===================== Orders =====================
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled'

export interface OrderItem {
  id: number
  name: string
  image: string
  price: number
  quantity: number
}

export interface OrderCustomer {
  fullName: string
  phone: string
  email: string
  city: string
  district?: string
  address: string
  postal?: string
  notes?: string
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  statusAr: string
  customer: OrderCustomer
  payment: 'card' | 'apple' | 'cod'
  items: OrderItem[]
  itemsCount: number
  subtotal: number
  couponCode?: string
  couponDiscount: number
  shipping: number
  total: number
  history: { at: string; status: OrderStatus; statusAr: string; note?: string }[]
}

// خريطة الحالات بين الإنجليزية والعربية
export const ORDER_STATUSES: { id: OrderStatus; ar: string; color: string }[] = [
  { id: 'pending', ar: 'قيد المعالجة', color: 'amber' },
  { id: 'processing', ar: 'قيد التحضير', color: 'blue' },
  { id: 'shipped', ar: 'قيد الشحن', color: 'indigo' },
  { id: 'completed', ar: 'مكتمل', color: 'emerald' },
  { id: 'cancelled', ar: 'ملغي', color: 'red' }
]

export function statusAr(s: OrderStatus): string {
  return ORDER_STATUSES.find((x) => x.id === s)?.ar || s
}

// انتقالات الحالة المسموحة (state machine آمن)
const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['completed', 'cancelled'],
  completed: [], // طلب مكتمل لا يتغيّر
  cancelled: [] // طلب ملغي لا يتغيّر
}

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  if (from === to) return true
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false
}

// طلبات تجريبية واقعية بصياغة موحّدة
function buildSeedOrder(
  id: string,
  daysAgo: number,
  customer: OrderCustomer,
  productIds: number[],
  status: OrderStatus,
  payment: 'card' | 'apple' | 'cod' = 'card'
): Order {
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString()
  const items: OrderItem[] = productIds
    .map((pid) => initialProducts.find((p) => p.id === pid))
    .filter(Boolean)
    .map((p) => ({ id: p!.id, name: p!.name, image: p!.image, price: p!.price, quantity: 1 }))
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const shipping = subtotal >= 500 ? 0 : 25
  const total = subtotal + shipping
  return {
    id,
    date,
    status,
    statusAr: statusAr(status),
    customer,
    payment,
    items,
    itemsCount: items.reduce((s, i) => s + i.quantity, 0),
    subtotal,
    couponDiscount: 0,
    shipping,
    total,
    history: [{ at: date, status, statusAr: statusAr(status) }]
  }
}

const initialOrders: Order[] = [
  buildSeedOrder(
    'NV-250425-1001',
    5,
    { fullName: 'أحمد محمد العلي', phone: '0501234567', email: 'ahmed@example.com', city: 'الرياض', district: 'العليا', address: 'شارع الملك فهد، حي العليا، مبنى 42' },
    [1, 8, 14],
    'completed'
  ),
  buildSeedOrder(
    'NV-250426-1002',
    4,
    { fullName: 'فاطمة علي الزهراني', phone: '0509876543', email: 'fatima@example.com', city: 'جدة', district: 'الروضة', address: 'شارع التحلية، حي الروضة، فيلا 15' },
    [1, 11],
    'shipped'
  ),
  buildSeedOrder(
    'NV-250427-1003',
    3,
    { fullName: 'خالد عبدالله السبيعي', phone: '0551122334', email: 'khalid@example.com', city: 'الدمام', district: 'الفيصلية', address: 'شارع الأمير محمد بن فهد، عمارة 7' },
    [4],
    'processing',
    'apple'
  ),
  buildSeedOrder(
    'NV-250428-1004',
    2,
    { fullName: 'مريم حسن القرني', phone: '0567788990', email: 'maryam@example.com', city: 'مكة المكرمة', district: 'العزيزية', address: 'شارع المدينة المنورة، شقة 8' },
    [9, 14, 18, 27],
    'completed'
  ),
  buildSeedOrder(
    'NV-250428-1005',
    2,
    { fullName: 'يوسف إبراهيم الحربي', phone: '0533445566', email: 'yousef@example.com', city: 'المدينة المنورة', district: 'قباء', address: 'شارع قباء، بناية الأمل، الدور الثالث' },
    [16, 18],
    'shipped',
    'cod'
  ),
  buildSeedOrder(
    'NV-250429-1006',
    1,
    { fullName: 'نورا سعيد الغامدي', phone: '0577889900', email: 'nora@example.com', city: 'الخبر', district: 'الراكة', address: 'شارع الكورنيش، فيلا 22' },
    [10, 14, 28],
    'completed'
  ),
  buildSeedOrder(
    'NV-250429-1007',
    1,
    { fullName: 'سلمى أحمد الدوسري', phone: '0544556677', email: 'salma@example.com', city: 'الرياض', district: 'النخيل', address: 'حي النخيل، شارع 30، عمارة 12' },
    [21],
    'pending'
  )
]

// ===================== Settings =====================
export interface StoreSettings {
  storeName: string
  storeNameEn: string
  currency: 'SAR'
  shippingFee: number
  freeShippingThreshold: number
  supportEmail: string
  supportPhone: string
}

const initialSettings: StoreSettings = {
  storeName: 'متجر نوڤا',
  storeNameEn: 'Nova Store',
  currency: 'SAR',
  shippingFee: 25,
  freeShippingThreshold: 500,
  supportEmail: 'support@nova.store',
  supportPhone: '+966112345678'
}

// ===================== Data Store (Singleton) =====================
class DataStore {
  private _products: Product[]
  private _categories: Category[]
  private _coupons: Coupon[]
  private _orders: Order[]
  private _settings: StoreSettings

  constructor() {
    this._products = initialProducts.map((p) => ({ ...p }))
    this._categories = initialCategories.map((c) => ({ ...c }))
    this._coupons = initialCoupons.map((c) => ({ ...c }))
    this._orders = initialOrders.map((o) => ({ ...o }))
    this._settings = { ...initialSettings }
  }

  // ---------- Products ----------
  listProducts(): Product[] {
    return this._products.slice()
  }

  getProduct(id: number): Product | undefined {
    return this._products.find((p) => p.id === id)
  }

  createProduct(input: Partial<Product>): Product {
    const id = Math.max(0, ...this._products.map((p) => p.id)) + 1
    const cat = this._categories.find((c) => c.id === input.category)
    const product: Product = {
      id,
      name: String(input.name || '').slice(0, 200),
      nameEn: String(input.nameEn || input.name || '').slice(0, 200),
      category: String(input.category || 'electronics'),
      categoryAr: cat?.name || String(input.categoryAr || ''),
      price: Math.max(0, Number(input.price) || 0),
      oldPrice: input.oldPrice ? Math.max(0, Number(input.oldPrice)) : undefined,
      rating: Math.min(5, Math.max(0, Number(input.rating) || 5)),
      reviewsCount: Math.max(0, Number(input.reviewsCount) || 0),
      sold: Math.max(0, Number(input.sold) || 0),
      stock: Math.max(0, Number(input.stock) || 0),
      image: String(input.image || ''),
      images: Array.isArray(input.images) && input.images.length > 0 ? input.images.slice(0, 8) : [String(input.image || '')],
      description: String(input.description || '').slice(0, 2000),
      features: Array.isArray(input.features) ? input.features.slice(0, 10) : [],
      specs: Array.isArray(input.specs) ? input.specs.slice(0, 12) : [],
      isNew: !!input.isNew,
      isFeatured: !!input.isFeatured,
      isBestSeller: !!input.isBestSeller,
      createdAt: input.createdAt || new Date().toISOString().slice(0, 10)
    }
    this._products.push(product)
    return product
  }

  updateProduct(id: number, patch: Partial<Product>): Product | null {
    const idx = this._products.findIndex((p) => p.id === id)
    if (idx === -1) return null
    const prev = this._products[idx]
    const cat = patch.category ? this._categories.find((c) => c.id === patch.category) : null
    const next: Product = {
      ...prev,
      ...patch,
      id: prev.id, // immutable
      name: patch.name !== undefined ? String(patch.name).slice(0, 200) : prev.name,
      price: patch.price !== undefined ? Math.max(0, Number(patch.price) || 0) : prev.price,
      oldPrice: patch.oldPrice !== undefined ? (patch.oldPrice ? Math.max(0, Number(patch.oldPrice)) : undefined) : prev.oldPrice,
      stock: patch.stock !== undefined ? Math.max(0, Number(patch.stock) || 0) : prev.stock,
      rating: patch.rating !== undefined ? Math.min(5, Math.max(0, Number(patch.rating) || 0)) : prev.rating,
      categoryAr: cat?.name || patch.categoryAr || prev.categoryAr,
      images:
        Array.isArray(patch.images) && patch.images.length > 0
          ? patch.images.slice(0, 8)
          : patch.image
          ? [patch.image]
          : prev.images,
      description: patch.description !== undefined ? String(patch.description).slice(0, 2000) : prev.description
    }
    this._products[idx] = next
    return next
  }

  deleteProduct(id: number): boolean {
    const before = this._products.length
    this._products = this._products.filter((p) => p.id !== id)
    return this._products.length < before
  }

  // ---------- Categories ----------
  listCategories(): Category[] {
    // إثراء العدد الحقيقي من المنتجات
    return this._categories.map((c) => ({
      ...c,
      count: this._products.filter((p) => p.category === c.id).length
    }))
  }

  // ---------- Coupons ----------
  listCoupons(): Coupon[] {
    return this._coupons.slice()
  }

  findCoupon(code: string): Coupon | undefined {
    if (!code || typeof code !== 'string') return undefined
    const normalized = code.trim().toUpperCase().slice(0, 32)
    return this._coupons.find(
      (c) => c.code === normalized && c.active && new Date(c.expiresAt).getTime() > Date.now()
    )
  }

  // ---------- Orders ----------
  listOrders(): Order[] {
    // ترتيب من الأحدث للأقدم
    return this._orders.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  getOrder(id: string): Order | undefined {
    return this._orders.find((o) => o.id === id)
  }

  createOrder(order: Omit<Order, 'history'>): Order {
    const fullOrder: Order = {
      ...order,
      history: [{ at: order.date, status: order.status, statusAr: statusAr(order.status) }]
    }
    this._orders.push(fullOrder)
    return fullOrder
  }

  updateOrderStatus(id: string, newStatus: OrderStatus, note?: string): { ok: boolean; error?: string; order?: Order } {
    const order = this._orders.find((o) => o.id === id)
    if (!order) return { ok: false, error: 'not_found' }
    if (!canTransition(order.status, newStatus)) {
      return { ok: false, error: 'invalid_transition' }
    }
    order.status = newStatus
    order.statusAr = statusAr(newStatus)
    order.history.push({ at: new Date().toISOString(), status: newStatus, statusAr: statusAr(newStatus), note })
    return { ok: true, order }
  }

  deleteOrder(id: string): boolean {
    const before = this._orders.length
    this._orders = this._orders.filter((o) => o.id !== id)
    return this._orders.length < before
  }

  // ---------- Stats ----------
  getStats() {
    const totalProducts = this._products.length
    const totalOrders = this._orders.length
    const totalRevenue = this._orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((s, o) => s + o.total, 0)
    const completedOrders = this._orders.filter((o) => o.status === 'completed').length
    const pendingOrders = this._orders.filter((o) => o.status === 'pending' || o.status === 'processing').length
    const lowStock = this._products.filter((p) => p.stock > 0 && p.stock < 20).length
    const outOfStock = this._products.filter((p) => p.stock === 0).length
    const customers = new Set(this._orders.map((o) => o.customer.email)).size
    const conversion = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0
    return {
      totalProducts,
      totalOrders,
      totalRevenue,
      completedOrders,
      pendingOrders,
      lowStock,
      outOfStock,
      customers,
      conversion
    }
  }

  topSelling(limit = 5): Product[] {
    return this._products.slice().sort((a, b) => b.sold - a.sold).slice(0, limit)
  }

  lowStockProducts(threshold = 20, limit = 5): Product[] {
    return this._products
      .filter((p) => p.stock <= threshold)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, limit)
  }

  recentOrders(limit = 5): Order[] {
    return this.listOrders().slice(0, limit)
  }

  // ---------- Settings ----------
  getSettings(): StoreSettings {
    return { ...this._settings }
  }

  // ---------- Order ID Generator ----------
  generateOrderId(): string {
    const now = new Date()
    const stamp =
      String(now.getFullYear()).slice(2) +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0')
    let attempts = 0
    while (attempts++ < 50) {
      const rand = Math.floor(1000 + Math.random() * 9000)
      const id = `NV-${stamp}-${rand}`
      if (!this._orders.find((o) => o.id === id)) return id
    }
    // fallback نهائي مع timestamp
    return `NV-${stamp}-${Date.now() % 10000}`
  }
}

// Singleton
export const store = new DataStore()
