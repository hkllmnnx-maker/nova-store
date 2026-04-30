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
import { AdminLoginPage } from './pages/admin-login'
import { TrackPage } from './pages/track'
import { getProductById } from './data/products'
import { isAdminRequest, clearAdminCookie } from './lib/auth'
import api from './api/index'

const app = new Hono()

// === Security headers (global) ===
app.use('*', async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'SAMEORIGIN')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=(self), interest-cohort=()')
  c.header('X-XSS-Protection', '1; mode=block')
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  // Content-Security-Policy: allow our own origin + the trusted CDNs we use (fonts, icons, alpine, unsplash images).
  // Note: 'unsafe-eval' is required by Alpine.js runtime expression evaluation (x-data, x-show, x-bind, etc.).
  // This is a deliberate trade-off: we accept the relaxed script-src to keep Alpine working, while still
  // restricting all other directives (img/font/connect/frame-ancestors/object) tightly.
  c.header(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.unsplash.com",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; ')
  )
})

// === Cache headers for static-like API responses (catalog data) ===
app.use('/api/products*', async (c, next) => {
  await next()
  if (c.req.method === 'GET') {
    c.header('Cache-Control', 'public, max-age=60, s-maxage=300')
  }
})
app.use('/api/categories*', async (c, next) => {
  await next()
  if (c.req.method === 'GET') {
    c.header('Cache-Control', 'public, max-age=300, s-maxage=600')
  }
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

// تتبع الطلب (للعميل)
app.get('/track', (c) => {
  const id = c.req.query('id') || ''
  return c.html('<!DOCTYPE html>' + (TrackPage({ id }) as any).toString())
})

// تسجيل دخول الإدارة
app.get('/admin/login', (c) => {
  // Already logged-in? redirect to /admin
  if (isAdminRequest(c)) return c.redirect('/admin', 302)
  const next = c.req.query('next') || '/admin'
  return c.html('<!DOCTYPE html>' + (AdminLoginPage({ next }) as any).toString())
})

// تسجيل خروج الإدارة (مسح الكوكي ثم إعادة توجيه)
app.get('/admin/logout', (c) => {
  clearAdminCookie(c)
  return c.redirect('/admin/login', 302)
})

// لوحة الإدارة (محمية على مستوى الـ route)
app.get('/admin', (c) => {
  if (!isAdminRequest(c)) {
    return c.redirect('/admin/login?next=' + encodeURIComponent('/admin'), 302)
  }
  return c.html('<!DOCTYPE html>' + (AdminPage({}) as any).toString())
})

// 404
app.notFound((c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - الصفحة غير موجودة | متجر نوڤا</title>
  <link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/style.css">
  <style>body{font-family:'Cairo','Tajawal',system-ui,sans-serif}</style>
</head>
<body class="min-h-screen flex items-center justify-center p-4" style="background:linear-gradient(135deg,#f8fafc 0%,#ffffff 50%,#f0f9ff 100%)">
  <main class="text-center max-w-md" role="main">
    <div class="font-black text-9xl gradient-text mb-4" aria-hidden="true">404</div>
    <h1 class="text-3xl font-black text-slate-900 mb-3">الصفحة غير موجودة</h1>
    <p class="text-slate-600 mb-6">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
    <nav class="flex items-center justify-center gap-3" aria-label="روابط بديلة">
      <a href="/" class="btn btn-dark">العودة للرئيسية</a>
      <a href="/products" class="btn btn-secondary">تصفّح المنتجات</a>
    </nav>
  </main>
</body>
</html>`, 404)
})

export default app
