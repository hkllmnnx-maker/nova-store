import { Hono } from 'hono'
import { HomePage } from './pages/home'
import { ProductsPage } from './pages/products'
import { ProductDetailPage } from './pages/product-detail'
import { CartPage } from './pages/cart'
import { CheckoutPage } from './pages/checkout'
import { OrderSuccessPage } from './pages/order-success'
import { AdminPage } from './pages/admin'
import { getProductById } from './data/products'

const app = new Hono()

// === الصفحات ===

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
  <title>404 - الصفحة غير موجودة</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <style>body{font-family:'Cairo',sans-serif}</style>
</head>
<body class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
  <div class="text-center max-w-md">
    <div class="font-black text-9xl bg-gradient-to-br from-sky-500 to-fuchsia-500 bg-clip-text text-transparent mb-4">404</div>
    <h1 class="text-3xl font-black text-slate-900 mb-3">الصفحة غير موجودة</h1>
    <p class="text-slate-600 mb-6">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
    <a href="/" class="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">العودة للرئيسية</a>
  </div>
</body>
</html>`, 404)
})

export default app
