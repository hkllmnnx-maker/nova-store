import { Hono } from 'hono'
import { HomePage } from './pages/home'
import { ProductsPage } from './pages/products'
import { ProductDetailPage } from './pages/product-detail'
import { CartPage } from './pages/cart'
import { CheckoutPage } from './pages/checkout'
import { OrderSuccessPage } from './pages/order-success'
import { AdminPage } from './pages/admin'
import { CategoriesPage } from './pages/categories'
import { SearchPage } from './pages/search'
import { WishlistPage } from './pages/wishlist'
import { LoginPage } from './pages/login'
import { getProductById } from './data/products'
import api from './api/index'

const app = new Hono()

// === Security headers (global) ===
app.use('*', async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'SAMEORIGIN')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
})

// === API Routes ===
app.route('/api', api)

// === Pages ===

// الصفحة الرئيسية
app.get('/', (c) => c.html('<!DOCTYPE html>' + (HomePage({}) as any).toString()))

// صفحة المنتجات مع الفلترة
app.get('/products', (c) => {
  const q = c.req.query('q')
  const category = c.req.query('category')
  const sort = c.req.query('sort')
  const minPrice = c.req.query('minPrice')
  const maxPrice = c.req.query('maxPrice')
  const rating = c.req.query('rating')
  const onsale = c.req.query('onsale')

  return c.html('<!DOCTYPE html>' + (ProductsPage({
    q,
    category,
    sort,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    rating: rating ? Number(rating) : undefined,
    onsale: onsale === '1' || onsale === 'true'
  }) as any).toString())
})

// صفحة تفاصيل المنتج
app.get('/product/:id', (c) => {
  const id = Number(c.req.param('id'))
  const product = getProductById(id)
  if (!product) {
    return c.html('<!DOCTYPE html>' + (ProductsPage({ q: 'منتج غير موجود' }) as any).toString(), 404)
  }
  return c.html('<!DOCTYPE html>' + (ProductDetailPage({ product }) as any).toString())
})

// التصنيفات
app.get('/categories', (c) => c.html('<!DOCTYPE html>' + (CategoriesPage({}) as any).toString()))

// البحث
app.get('/search', (c) => {
  const q = c.req.query('q') || ''
  return c.html('<!DOCTYPE html>' + (SearchPage({ q }) as any).toString())
})

// المفضلة
app.get('/wishlist', (c) => c.html('<!DOCTYPE html>' + (WishlistPage({}) as any).toString()))

// تسجيل الدخول / حسابي
app.get('/login', (c) => c.html('<!DOCTYPE html>' + (LoginPage({}) as any).toString()))
app.get('/account', (c) => c.html('<!DOCTYPE html>' + (LoginPage({}) as any).toString()))

// السلة
app.get('/cart', (c) => c.html('<!DOCTYPE html>' + (CartPage({}) as any).toString()))

// الدفع
app.get('/checkout', (c) => c.html('<!DOCTYPE html>' + (CheckoutPage({}) as any).toString()))

// نجاح الطلب
app.get('/order-success', (c) => {
  const id = c.req.query('id')
  return c.html('<!DOCTYPE html>' + (OrderSuccessPage({ orderId: id }) as any).toString())
})

// لوحة الإدارة
app.get('/admin', (c) => c.html('<!DOCTYPE html>' + (AdminPage({}) as any).toString()))

// 404
app.notFound((c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>404 - الصفحة غير موجودة | متجر نوڤا</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <style>body{font-family:'Cairo',sans-serif}</style>
</head>
<body class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 p-4">
  <div class="text-center max-w-md">
    <div class="font-black text-9xl bg-gradient-to-br from-sky-500 to-fuchsia-500 bg-clip-text text-transparent mb-4">404</div>
    <h1 class="text-3xl font-black text-slate-900 mb-3">الصفحة غير موجودة</h1>
    <p class="text-slate-600 mb-6">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
    <div class="flex items-center justify-center gap-3">
      <a href="/" class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">العودة للرئيسية</a>
      <a href="/products" class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">تصفّح المنتجات</a>
    </div>
  </div>
</body>
</html>`, 404)
})

export default app
