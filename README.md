# 🛍️ متجر نوڤا (Nova Store) — متجر إلكتروني احترافي

> متجر إلكتروني احترافي عربي مبني بمستوى بصري ينافس Apple, Shopify, Stripe, Vercel — مع دعم RTL كامل، تصميم حديث، وتجربة مستخدم استثنائية.

---

## 📋 نظرة عامة على المشروع

- **الاسم**: متجر نوڤا (Nova Store)
- **الهدف**: بناء متجر إلكتروني عربي كامل بواجهة احترافية، تجربة مستخدم سلسة، وأداء سريع على البنية التحتية لـ Cloudflare Edge.
- **التقنيات**: Hono + JSX SSR + TailwindCSS + Alpine.js + Lucide Icons
- **المنصة**: Cloudflare Pages (Edge Runtime)
- **اللغة**: العربية بالكامل مع دعم RTL

---

## 🌐 الروابط

- **معاينة مباشرة (Live preview)**: https://3000-i3bv5693uae7ad343d67s-c81df28e.sandbox.novita.ai
- **لوحة الإدارة**: https://3000-i3bv5693uae7ad343d67s-c81df28e.sandbox.novita.ai/admin/login
  - بيانات الدخول التجريبية: `admin@nova.store` / `NovaAdmin@2026`
- **تتبع الطلب (للعميل)**: https://3000-i3bv5693uae7ad343d67s-c81df28e.sandbox.novita.ai/track
- **GitHub Repository**: https://github.com/hkllmnnx-maker/nova-store
- **حالة النشر**: ✅ يعمل بالكامل بدون أخطاء (build size ~278 kB)

---

## 🆕 ما الجديد في هذه الجولة (Pro Upgrades)

| # | الترقية | الحالة |
|---|---------|--------|
| 1 | طبقة بيانات موحّدة `src/data/store.ts` (in-memory singleton + state machine لحالات الطلب) | ✅ |
| 2 | إضافة/تعديل/حذف المنتجات عبر API محمي مع تحقّق كامل ومربعات تأكيد | ✅ |
| 3 | إدارة الطلبات: تخزين كامل + سير حالات (pending → processing → shipped → completed/cancelled) + سجل تاريخ | ✅ |
| 4 | مصادقة الأدمن (Cookie HttpOnly + Bearer) + حماية `/admin` + خروج | ✅ |
| 5 | تجربة دفع آمنة: إعادة حساب التوتالات server-side + تحقّق صارم + منع إرسال متكرر (`loading`) | ✅ |
| 6 | السلة/المفضلة/الكوبونات: تفاعل مع API الكوبون + تحقق من المخزون + معالجة فشل localStorage | ✅ |
| 7 | تصميم احترافي عربي RTL مع تحسينات a11y وكيبورد | ✅ |
| 8 | لوحة إدارة بإحصائيات حيّة + أحدث الطلبات + المخزون المنخفض + الأكثر مبيعاً + بحث وفلترة | ✅ |
| 9 | بحث/فلترة/تصنيفات + meta tags + Open Graph + HTML دلالي | ✅ |
| 10 | مراجعة أمان: CSP صارم، sanitization، منع XSS/IDOR، constant-time compare | ✅ |
| 11 | الأداء/A11y: lazy images، ARIA، تركيز كيبوردي، تباين ألوان | ✅ |
| 12 | اختبارات يدوية E2E + اختبار build + smoke tests لكل المسارات | ✅ |
| 13 | Git workflow: commits واضحة بعد كل sub-task، push فوري | ✅ |
| 14 | صفحة تتبع طلب جديدة `/track` للعميل (مع منع IDOR عبر مطابقة contact) | ✅ |

---

## ✅ الميزات المنجزة

### 🎨 نظام تصميم متكامل (Design System)
- **لوحة ألوان متناسقة**: brand (أزرق سماوي)، accent (وردي/فوشيا)، ink (رمادي متدرج)، success/warning/danger
- **خطوط عربية احترافية**: Cairo (للنصوص) و Tajawal (للعناوين)
- **نظام تباعد موحد**: padding, margins, gap-spacing
- **مكونات مكررة**: أزرار، بطاقات، نماذج، badges، stars، toolbars
- **حالات تفاعلية**: hover, focus, active, disabled, loading, empty, error, success
- **حواف وظلال متدرجة**: shadow-card, shadow-glow, shadow-glow-accent
- **دعم RTL كامل**: تخطيط مرآة + اتجاهات صحيحة لجميع المكونات
- **استجابة كاملة**: موبايل، تابلت، ديسكتوب
- **أيقونات Lucide**: مجموعة احترافية كاملة من الأيقونات

### 🏠 الصفحة الرئيسية (`/`)
- **Hero Section** بصري جذاب مع تدرجات لونية وتأثيرات
- **شريط الثقة**: شحن سريع، دفع آمن، ضمان الجودة، دعم عملاء 24/7
- **منتجات مميزة**: أبرز المنتجات بتصميم بطاقة احترافية
- **العروض الخاصة**: قسم مخصص للمنتجات المخفّضة
- **الفئات**: عرض جميع التصنيفات الرئيسية
- **CTA sections**: دعوات إجراء واضحة طوال الصفحة

### 🛒 صفحة عرض المنتجات (`/products`)
- **شبكة منتجات استجابيّة**: 2/3/3 أعمدة (موبايل/تابلت/ديسكتوب)
- **فلترة متقدمة**:
  - حسب التصنيف (إلكترونيات، أزياء، منزل، جمال، رياضة، كتب)
  - حسب نطاق السعر (مع خيارات سريعة)
  - حسب التقييم (نجمتان فما فوق، حتى 5 نجوم)
  - عرض المنتجات المخفّضة فقط
- **بحث مباشر** عبر URL params
- **ترتيب**: الأحدث، السعر تصاعدي/تنازلي، الأعلى تقييماً، الأكثر مبيعاً
- **بطاقات منتجات**: صورة، اسم، تصنيف، تقييم نجمي، سعر/خصم، زر إضافة للسلة، زر تفاصيل
- **Empty State** أنيق عند عدم وجود نتائج
- **فلاتر جانبية مع toggle للموبايل**

### 📦 صفحة تفاصيل المنتج (`/product/:id`)
- **معرض صور متعدد** مع thumbnail navigation
- **شارات المنتج**: جديد، الأكثر مبيعاً، خصم، حصري
- **تقييم تفصيلي** مع عدد المراجعات
- **سعر مع خصم** (الجديد + المشطوب)
- **اختيار كمية** (+/-) مع حد أقصى للمخزون
- **زر إضافة للسلة** + زر شراء فوري
- **تبويبات**: المواصفات، التقييمات، الشحن والإرجاع
- **منتجات مشابهة** من نفس التصنيف
- **معلومات الشحن**: تاريخ التسليم المتوقع
- **حالة المخزون**: متوفر / متبقي عدد قليل

### 🛍️ سلة التسوق (`/cart`)
- **عرض المنتجات** مع صور، اسم، تصنيف، سعر
- **تعديل الكمية** (+/-)
- **حذف المنتجات**
- **حساب فوري**: subtotal، خصم، شحن، إجمالي
- **Persistent storage** عبر localStorage
- **Empty State** بتصميم جذاب
- **زر الانتقال للدفع**

### 💳 صفحة الدفع (`/checkout`)
- **نموذج بيانات العميل**: الاسم، البريد، الهاتف
- **عنوان الشحن**: المدينة، العنوان، الرمز البريدي
- **طرق الدفع**: بطاقة ائتمان/مدى، Apple Pay، الدفع عند الاستلام
- **حقول البطاقة** تظهر شرطياً (عند اختيار البطاقة)
- **تحقق من صحة الحقول** (validation)
- **ملخص الطلب** مع حساب نهائي
- **رسائل نجاح/خطأ**
- **تنسيق رقم البطاقة تلقائياً** (مجاميع من 4 أرقام)

### ✅ صفحة نجاح الطلب (`/order-success`)
- **رسالة جذابة** مع animation
- **رقم طلب تجريبي** (NV-XXXXXX)
- **متتبع حالة الطلب** (Order Status Tracker) بأربع مراحل
- **ملخص الطلب** كامل
- **أزرار**: العودة للمتجر، متابعة الطلب
- **معلومات تواصل** للدعم

### 🔧 لوحة الإدارة (`/admin`)
- **إحصائيات أساسية**: عدد المنتجات، عدد الطلبات، الإيرادات، عدد العملاء
- **إدارة المنتجات**: عرض، إضافة، تعديل، حذف
- **إدارة الطلبات**: عرض الطلبات مع الحالة
- **Modal** للإضافة/التعديل
- **واجهة إدارية نظيفة** مع navigation tabs
- **جداول قابلة للفرز**

---

## 🔌 واجهات API (REST)

### عامة (بدون مصادقة)
| Method | Path | الوصف |
|--------|------|-------|
| GET | `/api/products?q=&category=&sort=&minPrice=&maxPrice=&rating=&onsale=&limit=` | قائمة المنتجات مع فلترة وفرز |
| GET | `/api/products/:id` | تفاصيل منتج |
| GET | `/api/categories` | التصنيفات (بأعداد حقيقية) |
| GET | `/api/coupons` | الكوبونات النشطة |
| POST | `/api/coupons/apply` `{code, subtotal}` | تحقق من كوبون |
| POST | `/api/cart/calculate` `{items[], coupon?}` | حساب التوتالات server-side |
| POST | `/api/orders` `{customer, payment, items[], coupon?}` | إنشاء طلب |
| GET | `/api/orders/track/:id?contact=` | تتبع طلب (مع مطابقة contact) |

### مصادقة
| Method | Path | الوصف |
|--------|------|-------|
| POST | `/api/auth/admin/login` `{email, password}` | دخول الأدمن (يضع Cookie HttpOnly) |
| POST | `/api/auth/admin/logout` | خروج الأدمن |
| GET | `/api/auth/admin/me` | حالة جلسة الأدمن |
| POST | `/api/auth/login` `{email, password}` | دخول عميل تجريبي |

### إدارية (محمية بـ Cookie أو `Authorization: Bearer`)
| Method | Path | الوصف |
|--------|------|-------|
| GET | `/api/admin/overview` | إحصائيات + أحدث الطلبات + الأكثر مبيعاً + المخزون المنخفض |
| GET | `/api/admin/products` | كل المنتجات |
| POST | `/api/admin/products` | إضافة منتج (مع validation) |
| PUT | `/api/admin/products/:id` | تعديل |
| DELETE | `/api/admin/products/:id` | حذف |
| GET | `/api/admin/orders` | كل الطلبات |
| GET | `/api/admin/orders/:id` | تفاصيل طلب |
| PUT | `/api/admin/orders/:id/status` `{status}` | تغيير حالة (state machine) |
| DELETE | `/api/admin/orders/:id` | حذف |
| GET | `/api/admin/coupons` | كل الكوبونات (بدون تنقية) |
| GET | `/api/admin/order-statuses` | مرجع الحالات |
| GET | `/api/admin/settings` | إعدادات المتجر |

### بيانات الدخول التجريبية للأدمن
- البريد: `admin@nova.store`
- كلمة المرور: `NovaAdmin@2026`
- ⚠️ **في الإنتاج** عيّن `ADMIN_EMAIL` و `ADMIN_PASSWORD` و `ADMIN_TOKEN` عبر `wrangler secret put`.

---

## 🗂️ الصفحات والمسارات (URI Map)

| المسار | الوصف | المعاملات |
|---|---|---|
| `GET /` | الصفحة الرئيسية | — |
| `GET /products` | عرض جميع المنتجات | `?category=`، `?q=`، `?sort=`، `?minPrice=`، `?maxPrice=`، `?rating=`، `?onsale=1` |
| `GET /product/:id` | تفاصيل منتج محدد | `:id` (1-30+) |
| `GET /categories` | قائمة التصنيفات | — |
| `GET /search` | صفحة البحث | `?q=` |
| `GET /wishlist` | المفضلة | — |
| `GET /cart` | سلة التسوق | — |
| `GET /checkout` | صفحة الدفع | — |
| `GET /order-success` | صفحة نجاح الطلب | `?id=` (اختياري) |
| `GET /track` | تتبع طلب (للعميل) | `?id=` (اختياري للملء التلقائي) |
| `GET /login` و `/account` | دخول العميل التجريبي | — |
| `GET /admin/login` | دخول الأدمن | `?next=` |
| `GET /admin/logout` | خروج الأدمن (يمسح الكوكي) | — |
| `GET /admin` | لوحة الإدارة (محمية، 302 إلى /admin/login إذا لم يُسجَّل) | — |
| `GET /static/*` | الملفات الثابتة | — |

---

## 🏗️ بنية المشروع

```
webapp/
├── src/
│   ├── index.tsx              # نقطة الدخول (Hono routes)
│   ├── renderer.tsx           # JSX renderer
│   ├── components/
│   │   ├── layout.tsx         # Layout مشترك (header, footer, nav, design system, RTL)
│   │   └── product-card.tsx   # مكون بطاقة المنتج
│   ├── data/
│   │   └── products.ts        # 30 منتج تجريبي + 6 تصنيفات
│   └── pages/
│       ├── home.tsx           # الصفحة الرئيسية
│       ├── products.tsx       # قائمة المنتجات + الفلاتر
│       ├── product-detail.tsx # تفاصيل المنتج
│       ├── cart.tsx           # سلة التسوق
│       ├── checkout.tsx       # صفحة الدفع
│       ├── order-success.tsx  # صفحة نجاح الطلب
│       └── admin.tsx          # لوحة الإدارة
├── public/
│   └── static/
│       ├── style.css          # CSS مخصصة (Design System)
│       ├── app.js             # JavaScript عام (cart badge, mobile menu)
│       ├── cart.js            # منطق السلة (Alpine.js + localStorage)
│       └── favicon.svg        # أيقونة الموقع
├── ecosystem.config.cjs       # إعدادات PM2
├── wrangler.jsonc             # إعدادات Cloudflare Pages
├── vite.config.ts             # إعدادات البناء
├── tsconfig.json              # إعدادات TypeScript
└── package.json
```

---

## 🧱 بنية البيانات (Data Models)

### Product
```typescript
{
  id: number
  name: string                  // اسم المنتج بالعربي
  category: string              // المعرف (electronics, fashion, ...)
  categoryAr: string            // الاسم العربي للتصنيف
  price: number
  oldPrice?: number             // السعر قبل الخصم (للعروض)
  rating: number                // 1-5
  reviews: number               // عدد المراجعات
  stock: number                 // المخزون
  image: string                 // الصورة الرئيسية
  images: string[]              // معرض الصور
  description: string           // الوصف الكامل
  features: string[]            // الميزات
  specs: { [key: string]: string }  // المواصفات الفنية
  isNew?: boolean
  isBestseller?: boolean
  isExclusive?: boolean
  createdAt: string
}
```

### Cart Item (localStorage)
```typescript
{
  id: number
  name: string
  price: number
  image: string
  categoryAr: string
  quantity: number
}
```

### Categories
6 فئات: electronics, fashion, home, beauty, sports, books

### التخزين
- **سلة التسوق**: localStorage (مفتاح: `nova_cart`)
- **بيانات المنتجات**: ملف ثابت في `src/data/products.ts` (30 منتج)
- **الطلبات**: محاكاة في الذاكرة (تجريبي)

---

## 🚀 طريقة التشغيل المحلية

### المتطلبات
- Node.js 18+
- npm

### الخطوات
```bash
# 1. تثبيت الاعتماديات
cd /home/user/webapp
npm install

# 2. بناء المشروع
npm run build

# 3. تشغيل عبر PM2 (موصى به في sandbox)
pm2 start ecosystem.config.cjs

# 4. أو تشغيل مباشر عبر Vite (للتطوير)
npm run dev

# 5. اختبار الموقع
curl http://localhost:3000

# 6. عرض السجلات
pm2 logs webapp --nostream
```

### إعادة التشغيل
```bash
fuser -k 3000/tcp 2>/dev/null || true
pm2 restart webapp
```

---

## 🧪 الاختبارات التي تم إجراؤها

### اختبار HTTP لجميع الصفحات (آخر تشغيل)
| الصفحة | الحالة |
|---|---|
| `/` | ✅ 200 |
| `/products` | ✅ 200 |
| `/product/1` | ✅ 200 |
| `/categories` | ✅ 200 |
| `/search?q=ساعة` | ✅ 200 |
| `/wishlist` | ✅ 200 |
| `/cart` | ✅ 200 |
| `/checkout` | ✅ 200 |
| `/login` | ✅ 200 |
| `/track` | ✅ 200 |
| `/admin/login` | ✅ 200 |
| `/admin` (بدون مصادقة) | ✅ 302 → `/admin/login?next=/admin` |
| `/does-not-exist` | ✅ 404 |

### اختبار API E2E
| السيناريو | النتيجة |
|---|---|
| `GET /api/products?limit=2` | ✅ يرجع `{ok:true, total, items}` (حقول مختصرة) |
| `GET /api/products/1` | ✅ 200 |
| `GET /api/products/9999` | ✅ 404 (`not_found`) |
| `POST /api/coupons/apply` `NOVA10` | ✅ خصم 100 على 1000 |
| `POST /api/coupons/apply` `BAD` | ✅ `invalid_coupon` |
| `POST /api/cart/calculate` بكوبون NOVA10 | ✅ subtotal 1798، خصم 180، إجمالي صحيح، توفيرات 800 من oldPrice |
| `POST /api/orders` (طلب صحيح) | ✅ يُنشئ طلب بمعرّف `NV-YYMMDD-XXXX` |
| `POST /api/orders` (سلة فارغة) | ✅ `empty_cart` |
| `POST /api/orders` (هاتف 123) | ✅ `invalid_phone` |
| `GET /api/orders/track/:id` بدون contact | ✅ يُرجع `customerHint` فقط |
| `GET /api/orders/track/:id?contact=wrong` | ✅ `not_found` (منع IDOR) |
| `GET /api/orders/track/:id?contact=correct` | ✅ يُعيد الطلب الكامل |
| `GET /api/orders/track/HACK-1234` | ✅ `invalid_id` |
| `GET /api/admin/overview` بدون مصادقة | ✅ 401 |
| `POST /api/auth/admin/login` ببيانات صحيحة | ✅ يضع Cookie HttpOnly |
| `POST /api/auth/admin/login` ببيانات خاطئة | ✅ 401 `invalid_credentials` |
| `GET /api/admin/overview` مع Bearer | ✅ يُرجع stats حيّة + recentOrders + topSelling + lowStock |
| `POST /api/admin/products` (منتج صحيح) | ✅ يُنشئ ID جديد |
| `POST /api/admin/products` (oldPrice ≤ price) | ✅ `invalid_fields: ["oldPrice"]` |
| `POST /api/admin/products` (اسم بحرف واحد) | ✅ `invalid_fields: ["name"]` |
| `PUT /api/admin/orders/:id/status` `pending → shipped` | ✅ `invalid_transition` (يحترم state machine) |
| `PUT /api/admin/orders/:id/status` `pending → processing` | ✅ ينجح + يضيف `history` |
| `DELETE /api/admin/products/:id` | ✅ `{ok:true}` |

### اختبار رؤوس الأمان (Security Headers)
- ✅ `Content-Security-Policy` (default-src 'self' + سياسات صارمة)
- ✅ `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(self)`
- ✅ `/api/*` يضع `Cache-Control: no-store` (منع تسريب الردود الإدارية)

### الاختبارات الوظيفية اليدوية
- ✅ التنقل بين الصفحات
- ✅ الفلترة والبحث والترتيب
- ✅ إضافة/حذف/تعديل في السلة
- ✅ تطبيق وإلغاء الكوبون عبر API
- ✅ ملء نموذج الدفع وتقديمه (مع server-side recalculation)
- ✅ تتبع الطلب من صفحة `/track`
- ✅ دخول وخروج الأدمن + CRUD المنتجات + تغيير حالة الطلبات
- ✅ الاستجابة على هواتف/تابلات/ديسكتوب
- ✅ حالات Loading/Empty/Error
- ✅ build عبر `npm run build` ينجح (~278 kB)

---

## 🐛 الأخطاء التي تم إصلاحها

### الجولة الحالية (Pro Upgrades)
1. **`isValidUrl` مفقود في security.ts** كسر البناء — تمت إضافة الدالة (تتحقق من بروتوكول http/https فقط).
2. **بيانات الأدمن في localStorage** عرضة للتلاعب — تم استبدالها بـ `/api/admin/*` المحمية.
3. **حالات الطلب كنصوص عربية** كانت تخلط لغة الـ UI بمنطق الأعمال — أُعيد بناؤها كـ enum إنجليزي مع state machine يمنع الانتقالات غير الشرعية.
4. **`/admin` كانت متاحة للجميع** — حُمِّيَت عبر `isAdminRequest()` (Cookie HttpOnly + Bearer + constant-time compare) مع 302 إلى `/admin/login?next=...`.
5. **تتبع الطلب لم يكن متاحاً للعميل** — أُضيفت صفحة `/track` + endpoint `/api/orders/track/:id?contact=` مع منع IDOR (مطابقة contact + إخفاء جزء من الاسم).
6. **عدم تحقق المنتج من جانب الخادم** — أُضيفت `validateProductInput` (الاسم، التصنيف، السعر، oldPrice > price، رابط الصورة).
7. **حسابات الإجمالي تُؤخذ من العميل** — `/api/cart/calculate` و `/api/orders` تُعيد حسابها من قاعدة البيانات (re-fetch product, cap quantity to stock).
8. **عدم منع الإرسال المتكرر** في checkout — `loading=true` يُعطّل الزر طوال المعالجة.
9. **الأيقونات لا تتحدث بعد إنشاء عناصر ديناميكية** — استدعاءات `lucide.createIcons()` بعد كل تحديث.

### الجولات السابقة
- إصلاح Alpine directives في JSX (`@click`, `x-model.number`, `x-transition`, `x-cloak`) عبر spread syntax.
- إصلاح Template literals في checkout / order-success.
- استبدال أيقونات Lucide غير الموجودة + إنشاء `favicon.svg`.
- نقل Tailwind إلى build محلي بدل CDN لتقليص حجم الـ bundle وحل قيود CSP.

---

## 🛠️ التقنيات المستخدمة

| التقنية | الاستخدام |
|---|---|
| **Hono** | خادم edge-first lightweight |
| **JSX (SSR)** | عرض من جانب الخادم |
| **TailwindCSS (CDN)** | تنسيق سريع |
| **Alpine.js** | تفاعلية خفيفة من جانب العميل |
| **Lucide Icons** | أيقونات احترافية |
| **Cairo + Tajawal** | خطوط عربية من Google Fonts |
| **Cloudflare Pages** | منصة النشر edge runtime |
| **Vite** | أداة البناء |
| **PM2** | إدارة العمليات |

---

## 🔐 الأمان والجودة (مراجعة كاملة)

### تحقق المدخلات
- ✅ كل endpoint يستخدم `clean()`, `safeId()`, `safeNumber()`, `safeEnum()`, `isValidEmail()`, `isValidPhone()` (5xxxxxxx السعودي)، `isValidUrl()` (http/https فقط).
- ✅ كل النصوص محدودة الطول (الاسم 200، الوصف 2000، العنوان 200، إلخ).
- ✅ JSON parsing داخل `try/catch` مع رد `invalid_body` (لا تسريب لمعلومات داخلية).

### منع XSS
- ✅ JSX يهرب HTML تلقائياً.
- ✅ `safeJson()` لتنقية أي JSON يتم embedding داخل `<script>` (يحوّل `<`, `>`, `&`, U+2028/2029).
- ✅ في الـ Toast نستخدم `textContent` (لا `innerHTML` مع بيانات المستخدم).

### منع IDOR / تسريب البيانات
- ✅ `/api/orders/track/:id` يطلب `contact` (هاتف أو بريد) قبل إرجاع التفاصيل، ويُعيد `not_found` بدلاً من تأكيد وجود الطلب.
- ✅ يُخفي اسم العميل جزئياً (`أحمد ***`) في النسخة العامة.
- ✅ كل `/api/admin/*` خلف middleware يفحص الجلسة، و 401 على الخطأ.
- ✅ مقارنة الـ token بطول ثابت (`safeEqual`) لتقليل timing attacks.
- ✅ Cookie الأدمن: `HttpOnly; Secure; SameSite=Lax; Max-Age=8h`.

### CSP / Security Headers
- ✅ `Content-Security-Policy` بـ `default-src 'self'` + قوائم بيضاء صريحة (Unsplash للصور، Google Fonts، unpkg/jsdelivr للسكربتات).
- ✅ `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'self'`.
- ✅ `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` يقفل الكاميرا/الميكروفون/الموقع.
- ✅ `Cache-Control: no-store` على كل `/api/*` لمنع تسريب الردود الإدارية عبر CDN.

### الأسرار والبيئة
- ✅ لا أسرار/توكنات في الكود.
- ✅ `ADMIN_TOKEN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` تُقرأ من `c.env` (Cloudflare bindings) وتُحلّ تلقائياً لقيم تجريبية مع تحذير صريح.
- ✅ `.gitignore` يستبعد `node_modules`, `.wrangler`, `.dev.vars`, `.env`, `dist`.

### State Machine للطلبات
- ✅ انتقالات مسموحة فقط: `pending → processing|cancelled`, `processing → shipped|cancelled`, `shipped → completed|cancelled`. الحالات النهائية (`completed`, `cancelled`) لا تتغيّر.
- ✅ تاريخ كامل (`history`) لكل تغيير حالة (لا يُمحى).

---

## ♿ الأداء والوصول (A11y)

- ✅ صور `<img>` بـ `loading="lazy"` و `alt` وصفي.
- ✅ روابط `target="_blank"` تستخدم `rel="noopener"`.
- ✅ `aria-label`, `aria-modal`, `role="dialog"`, `role="tablist"` على المكونات التفاعلية.
- ✅ skip-link، focus management في الـ drawer والمودالات.
- ✅ `<table>` يستخدم `<th scope="col">` و `<label>` لكل `<input>` (مع `sr-only` عند الحاجة).
- ✅ التباين يلتزم بمعايير WCAG AA على الخلفيات الفاتحة والداكنة.

---

## ⚠️ الافتراضات والقيود (للنسخة التجريبية)

- المنتجات بيانات تجريبية (30 منتج موزعة على 6 فئات).
- الدفع **محاكاة** فقط (لا اتصال بـ payment gateway حقيقي).
- مصادقة العميل (`/login`) demo بحت — لا تنشئ جلسة حقيقية على الخادم.
- **بيانات الأدمن** الافتراضية (`admin@nova.store / NovaAdmin@2026`) مخصصة للعرض فقط — استبدلها قبل النشر.
- التخزين in-memory داخل isolate Cloudflare Workers — لا يستمر بين الـ isolates أو بعد إعادة النشر. للتخزين الدائم استبدل `DataStore` بـ Cloudflare D1 أو KV (الواجهات منفصلة، تغيير سطحي).
- لا يوجد rate-limiting على endpoints المصادقة (يفضّل إضافة Cloudflare Turnstile / Rate Limiting Rules قبل الإنتاج).
- صور المنتجات من Unsplash (مجانية الاستخدام)

---

## 📈 الملاحظات للتطوير المستقبلي

1. **استبدال TailwindCSS CDN** بإصدار محلي (PostCSS) لإنتاج فعلي
2. **إضافة Cloudflare D1 Database** للمنتجات والطلبات
3. **نظام مصادقة** (Cloudflare Access أو JWT)
4. **بوابة دفع حقيقية** (Stripe, Tap, Moyasar)
5. **API محمية** للوحة الإدارة
6. **إشعارات بالبريد الإلكتروني** عبر Cloudflare Email Workers
7. **بحث متقدم** عبر Cloudflare Vectorize
8. **CDN للصور** عبر Cloudflare Images
9. **اختبارات وحدة** (Vitest)
10. **i18n** لدعم الإنجليزية بجانب العربية
11. **PWA** مع Service Worker
12. **تحليلات** (Cloudflare Analytics)

---

## 📦 آخر تحديث

- **التاريخ**: 2026-04-30
- **آخر التحسينات**:
  - ربط صفحة السلة بـ API الكوبون الحقيقي (`POST /api/coupons/apply`) وإظهار خصم الكوبون في الملخص
  - إزالة تسمية "شامل الضريبة" المضللة من ملخّص السلة
  - تحويل صفحة الدفع لإرسال الطلب عبر `POST /api/orders` مع تمرير الكوبون والتحقق من بيانات البطاقة
  - استبدال `confirm()` و `alert()` بحوار تأكيد مخصص (`openConfirmDialog`) في لوحة الإدارة وصفحة المفضلة
  - إعادة بناء صفحة المنتج باستخدام Alpine state صحيح (`productPage`) لربط زر "اشترِ الآن"، الكمية الفعلية، وزر المفضّلة
  - إصلاح حالة زر المفضلة لتتزامن مع localStorage عبر event `wishlist:updated`
- **الحالة**: ✅ نظام مستقر، جميع الصفحات تعمل بدون أخطاء console
- **الفرع**: `main`

---

## 🎯 ملخص التنفيذ

تم بناء متجر إلكتروني عربي كامل باحترافية عالية، يضم 7 صفحات رئيسية + لوحة إدارة، مع نظام تصميم متكامل، 30 منتجاً تجريبياً، فلترة وبحث متقدم، سلة تسوق فعّالة بـ localStorage، وعملية دفع كاملة. تم اختبار جميع الصفحات والوظائف، وإصلاح جميع الأخطاء المكتشفة، ورفع الكود إلى GitHub بعد كل مرحلة إصلاح.
