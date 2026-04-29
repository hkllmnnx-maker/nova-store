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

- **معاينة محلية (Sandbox)**: https://3000-i1zjyyj4wc1zpzd0z5pc0-8f57ffe2.sandbox.novita.ai
- **GitHub Repository**: https://github.com/hkllmnnx-maker/nova-store
- **حالة النشر**: ✅ يعمل بالكامل بدون أخطاء

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

## 🗂️ الصفحات والمسارات (URI Map)

| المسار | الوصف | المعاملات |
|---|---|---|
| `GET /` | الصفحة الرئيسية | — |
| `GET /products` | عرض جميع المنتجات | `?category=`، `?q=`، `?sort=`، `?minPrice=`، `?maxPrice=`، `?rating=`، `?onsale=1` |
| `GET /product/:id` | تفاصيل منتج محدد | `:id` (1-30) |
| `GET /cart` | سلة التسوق | — |
| `GET /checkout` | صفحة الدفع | — |
| `GET /order-success` | صفحة نجاح الطلب | `?id=` (اختياري) |
| `GET /admin` | لوحة الإدارة | — |
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

### اختبار HTTP لجميع الصفحات
| الصفحة | الحالة | الحجم |
|---|---|---|
| `/` | ✅ 200 | 79 KB |
| `/products` | ✅ 200 | 116 KB |
| `/products?category=electronics` | ✅ 200 | 50 KB |
| `/products?onsale=1` | ✅ 200 | 114 KB |
| `/product/1` | ✅ 200 | 44 KB |
| `/product/9` | ✅ 200 | 44 KB |
| `/cart` | ✅ 200 | 24 KB |
| `/checkout` | ✅ 200 | 33 KB |
| `/order-success` | ✅ 200 | 25 KB |
| `/admin` | ✅ 200 | 71 KB |

### اختبار JavaScript Console (Playwright)
- ✅ الصفحة الرئيسية: لا أخطاء
- ✅ صفحة المنتجات: لا أخطاء (تم إصلاح خطأ x-transition)
- ✅ تفاصيل المنتج: لا أخطاء
- ✅ السلة: لا أخطاء
- ✅ الدفع: لا أخطاء (تم إصلاح خطأ template literals)
- ✅ نجاح الطلب: لا أخطاء (تم إصلاح خطأ x-text)
- ✅ لوحة الإدارة: لا أخطاء

### الاختبارات الوظيفية
- ✅ التنقل بين الصفحات
- ✅ الفلترة والبحث والترتيب
- ✅ إضافة/حذف/تعديل في السلة
- ✅ ملء نموذج الدفع
- ✅ الاستجابة على هواتف/تابلات/ديسكتوب
- ✅ حالات Loading/Empty/Error

---

## 🐛 الأخطاء التي تم إصلاحها

1. **خطأ `@click` في JSX**: تم تحويل جميع Alpine directives إلى spread syntax (`{...{ '@click': '...' }}`)
2. **خطأ `x-model.number`**: تم استخدام spread syntax للـ modifiers
3. **خطأ `x-transition.opacity`**: تم تحويلها إلى spread syntax
4. **خطأ `x-transition` بدون قيمة**: عندما يصبح `x-transition="true"` يفشل Alpine في تنفيذه. تم استبداله بـ `{...{ "x-transition": "" }}`
5. **خطأ `x-cloak` بدون قيمة**: نفس المعالجة
6. **خطأ Template literals في checkout**: استخدام `${method.id}` كنص حرفي بدلاً من JSX expression — تم تحويله إلى `{method.id}` و JSX expressions صحيحة
7. **خطأ `x-text` في order-success**: التعبير `'{orderId || 'NV-XXXXXX'}'` كان يفسره Alpine كـ JS — تم تحويله إلى template literal صحيح
8. **أيقونات Lucide مفقودة**: تم استبدال `twitter`, `instagram`, `facebook`, `youtube` بأيقونات متوفرة
9. **404 favicon**: تم إنشاء `favicon.svg` احترافي
10. **بطء التحميل بسبب CDN**: تم اختصار وتحسين تحميل المكتبات

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

## 🔐 الأمان والجودة

- ✅ **التحقق من المدخلات**: validation على جميع نماذج الدفع
- ✅ **عدم كشف بيانات حساسة**: لا توكنات أو أسرار في الكود
- ✅ **فصل المنطق عن الواجهة**: مكونات معزولة، بيانات منفصلة
- ✅ **HTML escaping**: تلقائي عبر JSX
- ✅ **CORS**: مفعّل بشكل صحيح
- ✅ **كود قابل للصيانة**: أسماء وصفية، تعليقات عربية، بنية منظمة

---

## ⚠️ الافتراضات

- المنتجات بيانات تجريبية (30 منتج موزعة على 6 فئات)
- الدفع محاكاة فقط (لا اتصال بـ payment gateway حقيقي)
- لا يوجد تسجيل دخول/إنشاء حساب (نطاق المهمة)
- الإدارة مفتوحة بدون تصديق (نموذج demo)
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

- **التاريخ**: 2026-04-29
- **آخر commit**: إصلاح أخطاء Alpine.js في جميع الصفحات
- **الحالة**: ✅ نظام مستقر، جميع الصفحات تعمل بدون أخطاء
- **الفرع**: `main`

---

## 🎯 ملخص التنفيذ

تم بناء متجر إلكتروني عربي كامل باحترافية عالية، يضم 7 صفحات رئيسية + لوحة إدارة، مع نظام تصميم متكامل، 30 منتجاً تجريبياً، فلترة وبحث متقدم، سلة تسوق فعّالة بـ localStorage، وعملية دفع كاملة. تم اختبار جميع الصفحات والوظائف، وإصلاح جميع الأخطاء المكتشفة، ورفع الكود إلى GitHub بعد كل مرحلة إصلاح.
