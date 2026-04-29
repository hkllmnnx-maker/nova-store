// بيانات المنتجات التجريبية الواقعية
export interface Product {
  id: number
  name: string
  nameEn: string
  category: string
  categoryAr: string
  price: number
  oldPrice?: number
  rating: number
  reviewsCount: number
  sold: number
  stock: number
  image: string
  images: string[]
  description: string
  features: string[]
  specs: { key: string; value: string }[]
  isNew?: boolean
  isFeatured?: boolean
  isBestSeller?: boolean
  createdAt: string
}

export interface Category {
  id: string
  name: string
  nameEn: string
  icon: string
  color: string
  count: number
}

export const categories: Category[] = [
  { id: 'electronics', name: 'الإلكترونيات', nameEn: 'Electronics', icon: 'cpu', color: 'from-blue-500 to-cyan-500', count: 8 },
  { id: 'fashion', name: 'الأزياء', nameEn: 'Fashion', icon: 'shirt', color: 'from-pink-500 to-rose-500', count: 6 },
  { id: 'home', name: 'المنزل', nameEn: 'Home', icon: 'home', color: 'from-emerald-500 to-teal-500', count: 5 },
  { id: 'beauty', name: 'الجمال', nameEn: 'Beauty', icon: 'sparkles', color: 'from-purple-500 to-fuchsia-500', count: 4 },
  { id: 'sports', name: 'الرياضة', nameEn: 'Sports', icon: 'dumbbell', color: 'from-orange-500 to-red-500', count: 4 },
  { id: 'books', name: 'الكتب', nameEn: 'Books', icon: 'book-open', color: 'from-amber-500 to-yellow-500', count: 3 }
]

// صور حقيقية من Unsplash (مرخصة للاستخدام)
export const products: Product[] = [
  {
    id: 1,
    name: 'سماعات لاسلكية احترافية - Pro Max',
    nameEn: 'Pro Max Wireless Headphones',
    category: 'electronics',
    categoryAr: 'الإلكترونيات',
    price: 899,
    oldPrice: 1299,
    rating: 4.8,
    reviewsCount: 1247,
    sold: 3200,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&q=80'
    ],
    description: 'سماعات لاسلكية احترافية مع إلغاء ضوضاء نشط، عمر بطارية 40 ساعة، وجودة صوت استوديو. تصميم مريح للاستخدام الطويل.',
    features: ['إلغاء ضوضاء نشط ANC', 'بطارية 40 ساعة', 'صوت Hi-Fi استوديو', 'بلوتوث 5.3', 'شحن سريع 10 دقائق = 5 ساعات'],
    specs: [
      { key: 'الاتصال', value: 'Bluetooth 5.3' },
      { key: 'البطارية', value: '40 ساعة' },
      { key: 'الوزن', value: '250 جرام' },
      { key: 'الضمان', value: 'سنتان' }
    ],
    isFeatured: true,
    isBestSeller: true,
    createdAt: '2025-09-15'
  },
  {
    id: 2,
    name: 'ساعة ذكية متطورة - Series 9',
    nameEn: 'Smart Watch Series 9',
    category: 'electronics',
    categoryAr: 'الإلكترونيات',
    price: 1499,
    oldPrice: 1899,
    rating: 4.9,
    reviewsCount: 892,
    sold: 2100,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    ],
    description: 'ساعة ذكية بشاشة Retina دائمة العمل، تتبع صحي شامل، GPS مدمج، ومقاومة للماء حتى 50 متراً.',
    features: ['شاشة Always-On Retina', 'تتبع معدل ضربات القلب', 'GPS دقيق', 'مقاومة للماء 50م', 'بطارية تدوم 36 ساعة'],
    specs: [
      { key: 'الشاشة', value: '1.9 بوصة Retina' },
      { key: 'البطارية', value: '36 ساعة' },
      { key: 'مقاومة الماء', value: '50 متر' },
      { key: 'الضمان', value: 'سنة كاملة' }
    ],
    isFeatured: true,
    isNew: true,
    createdAt: '2025-10-20'
  },
  {
    id: 3,
    name: 'لابتوب احترافي - UltraBook 16',
    nameEn: 'UltraBook 16 Pro',
    category: 'electronics',
    categoryAr: 'الإلكترونيات',
    price: 7999,
    oldPrice: 9499,
    rating: 4.7,
    reviewsCount: 456,
    sold: 890,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80'
    ],
    description: 'لابتوب احترافي بمعالج Intel Core i9، ذاكرة 32GB، تخزين SSD 1TB، شاشة OLED 4K. للمحترفين والمصممين.',
    features: ['Intel Core i9 الجيل 13', 'ذاكرة 32GB DDR5', 'SSD 1TB NVMe', 'شاشة OLED 4K', 'كرت رسوميات RTX 4070'],
    specs: [
      { key: 'المعالج', value: 'Intel Core i9-13900H' },
      { key: 'الذاكرة', value: '32GB DDR5' },
      { key: 'التخزين', value: '1TB NVMe SSD' },
      { key: 'الشاشة', value: '16" OLED 4K' }
    ],
    isFeatured: true,
    createdAt: '2025-08-10'
  },
  {
    id: 4,
    name: 'هاتف ذكي رائد - Galaxy Pro',
    nameEn: 'Galaxy Pro Smartphone',
    category: 'electronics',
    categoryAr: 'الإلكترونيات',
    price: 3499,
    oldPrice: 3999,
    rating: 4.6,
    reviewsCount: 2341,
    sold: 5400,
    stock: 78,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80'
    ],
    description: 'هاتف ذكي رائد بكاميرا 200MP، شاشة AMOLED 120Hz، معالج رائد، وبطارية 5000mAh مع شحن سريع 65W.',
    features: ['كاميرا 200MP بصرية', 'شاشة AMOLED 120Hz', 'بطارية 5000mAh', 'شحن سريع 65W', 'مقاوم للماء IP68'],
    specs: [
      { key: 'الشاشة', value: '6.7" AMOLED 120Hz' },
      { key: 'الكاميرا', value: '200MP + 50MP + 12MP' },
      { key: 'البطارية', value: '5000mAh' },
      { key: 'التخزين', value: '256GB / 512GB' }
    ],
    isBestSeller: true,
    createdAt: '2025-07-01'
  },
  {
    id: 5,
    name: 'كاميرا احترافية - DSLR R5',
    nameEn: 'Professional DSLR R5',
    category: 'electronics',
    categoryAr: 'الإلكترونيات',
    price: 12999,
    rating: 4.9,
    reviewsCount: 178,
    sold: 320,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80'
    ],
    description: 'كاميرا احترافية بدقة 45 ميجابكسل، تصوير فيديو 8K، نظام تثبيت 8 محاور، مناسبة للمحترفين.',
    features: ['دقة 45MP Full Frame', 'فيديو 8K RAW', 'تثبيت 8 محاور', 'تركيز AI متقدم', 'بطارية تصوير 800 صورة'],
    specs: [
      { key: 'الدقة', value: '45 ميجابكسل' },
      { key: 'الفيديو', value: '8K RAW @ 30fps' },
      { key: 'الحساس', value: 'Full Frame CMOS' },
      { key: 'ISO', value: '100-51,200' }
    ],
    isNew: true,
    createdAt: '2025-11-01'
  },
  {
    id: 6,
    name: 'تابلت إبداعي - Pro Tab 12.9',
    nameEn: 'Creative Pro Tab 12.9',
    category: 'electronics',
    categoryAr: 'الإلكترونيات',
    price: 4299,
    oldPrice: 4799,
    rating: 4.8,
    reviewsCount: 567,
    sold: 1100,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80'
    ],
    description: 'تابلت احترافي بشاشة Liquid Retina XDR 12.9 بوصة، معالج M2، مثالي للمصممين والفنانين.',
    features: ['شاشة Liquid Retina XDR', 'معالج M2 قوي', 'دعم القلم الذكي', 'بطارية 10 ساعات', 'كاميرات احترافية'],
    specs: [
      { key: 'الشاشة', value: '12.9" Liquid Retina XDR' },
      { key: 'المعالج', value: 'Apple M2' },
      { key: 'التخزين', value: '256GB / 1TB' },
      { key: 'البطارية', value: '10 ساعات' }
    ],
    isFeatured: true,
    createdAt: '2025-09-01'
  },
  {
    id: 7,
    name: 'لوحة مفاتيح ميكانيكية - Gaming Pro',
    nameEn: 'Mechanical Gaming Keyboard Pro',
    category: 'electronics',
    categoryAr: 'الإلكترونيات',
    price: 549,
    oldPrice: 749,
    rating: 4.7,
    reviewsCount: 1834,
    sold: 4200,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
    ],
    description: 'لوحة مفاتيح ميكانيكية للألعاب بإضاءة RGB قابلة للتخصيص، مفاتيح Cherry MX، تصميم مريح.',
    features: ['مفاتيح Cherry MX Red', 'إضاءة RGB لكل مفتاح', 'مقاومة للماء', 'تصميم مريح للمعصم', 'برمجة ماكرو متقدمة'],
    specs: [
      { key: 'النوع', value: 'ميكانيكية كاملة' },
      { key: 'المفاتيح', value: 'Cherry MX Red' },
      { key: 'الاتصال', value: 'USB-C / لاسلكي' },
      { key: 'الضمان', value: 'سنتان' }
    ],
    isBestSeller: true,
    createdAt: '2025-06-15'
  },
  {
    id: 8,
    name: 'سماعات إيربودز - AirPro 3',
    nameEn: 'AirPro 3 Earbuds',
    category: 'electronics',
    categoryAr: 'الإلكترونيات',
    price: 699,
    oldPrice: 899,
    rating: 4.6,
    reviewsCount: 3421,
    sold: 8900,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80'
    ],
    description: 'سماعات إيربودز لاسلكية بإلغاء ضوضاء نشط، صوت مكاني، عمر بطارية 30 ساعة مع علبة الشحن.',
    features: ['إلغاء ضوضاء نشط', 'صوت مكاني ديناميكي', 'بطارية 30 ساعة', 'مقاومة للعرق IPX4', 'شحن لاسلكي'],
    specs: [
      { key: 'النوع', value: 'In-Ear لاسلكية' },
      { key: 'البطارية', value: '6+24 ساعة' },
      { key: 'المقاومة', value: 'IPX4' },
      { key: 'الاتصال', value: 'Bluetooth 5.3' }
    ],
    isBestSeller: true,
    createdAt: '2025-05-10'
  },
  // الأزياء
  {
    id: 9,
    name: 'حذاء رياضي عصري - RunFlex',
    nameEn: 'RunFlex Sneakers',
    category: 'fashion',
    categoryAr: 'الأزياء',
    price: 449,
    oldPrice: 599,
    rating: 4.5,
    reviewsCount: 892,
    sold: 2300,
    stock: 89,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
    ],
    description: 'حذاء رياضي خفيف ومريح بتقنية الوسادة الهوائية، مثالي للجري والاستخدام اليومي.',
    features: ['وسادة هوائية متقدمة', 'مادة تنفس عالية', 'مقاومة الانزلاق', 'وزن خفيف 280 جرام', 'تصميم عصري'],
    specs: [
      { key: 'النوع', value: 'حذاء جري' },
      { key: 'المقاسات', value: '38-46' },
      { key: 'المادة', value: 'شبك ومطاط' },
      { key: 'الألوان', value: 'أسود/أبيض/رمادي' }
    ],
    isFeatured: true,
    createdAt: '2025-08-20'
  },
  {
    id: 10,
    name: 'جاكيت جلد فاخر',
    nameEn: 'Premium Leather Jacket',
    category: 'fashion',
    categoryAr: 'الأزياء',
    price: 1299,
    oldPrice: 1799,
    rating: 4.7,
    reviewsCount: 234,
    sold: 567,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
    ],
    description: 'جاكيت جلد طبيعي فاخر بتصميم كلاسيكي عصري، مناسب للمناسبات والاستخدام اليومي.',
    features: ['جلد طبيعي 100%', 'بطانة حريرية', 'جيوب متعددة', 'سحاب معدني عالي الجودة', 'تصميم كلاسيكي'],
    specs: [
      { key: 'المادة', value: 'جلد طبيعي' },
      { key: 'البطانة', value: 'حرير' },
      { key: 'المقاسات', value: 'S - XXL' },
      { key: 'البلد', value: 'صناعة إيطالية' }
    ],
    createdAt: '2025-07-25'
  },
  {
    id: 11,
    name: 'حقيبة يد فاخرة - Luxe',
    nameEn: 'Luxe Handbag',
    category: 'fashion',
    categoryAr: 'الأزياء',
    price: 899,
    oldPrice: 1299,
    rating: 4.8,
    reviewsCount: 456,
    sold: 1200,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'
    ],
    description: 'حقيبة يد نسائية فاخرة بتصميم أنيق وعصري، مساحة واسعة لاحتياجاتك اليومية.',
    features: ['جلد عالي الجودة', 'تصميم أنيق وعصري', 'جيوب داخلية متعددة', 'حزام كتف قابل للتعديل', 'إغلاق آمن'],
    specs: [
      { key: 'المادة', value: 'جلد صناعي راقي' },
      { key: 'الأبعاد', value: '30×25×15 سم' },
      { key: 'الألوان', value: '5 ألوان' },
      { key: 'الضمان', value: 'سنة' }
    ],
    isFeatured: true,
    createdAt: '2025-09-05'
  },
  {
    id: 12,
    name: 'نظارة شمسية كلاسيكية',
    nameEn: 'Classic Sunglasses',
    category: 'fashion',
    categoryAr: 'الأزياء',
    price: 349,
    oldPrice: 499,
    rating: 4.4,
    reviewsCount: 678,
    sold: 1800,
    stock: 95,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80'
    ],
    description: 'نظارة شمسية كلاسيكية بحماية UV400، إطار خفيف ومتين، تصميم أنيق يناسب الجميع.',
    features: ['حماية UV400', 'إطار تيتانيوم خفيف', 'عدسات مستقطبة', 'تصميم كلاسيكي', 'علبة فاخرة'],
    specs: [
      { key: 'الإطار', value: 'تيتانيوم' },
      { key: 'العدسات', value: 'مستقطبة UV400' },
      { key: 'الوزن', value: '22 جرام' },
      { key: 'الضمان', value: 'سنتان' }
    ],
    createdAt: '2025-06-20'
  },
  {
    id: 13,
    name: 'ساعة كلاسيكية أنيقة',
    nameEn: 'Classic Elegant Watch',
    category: 'fashion',
    categoryAr: 'الأزياء',
    price: 1599,
    oldPrice: 2099,
    rating: 4.7,
    reviewsCount: 234,
    sold: 480,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80'
    ],
    description: 'ساعة يد كلاسيكية بحركة أوتوماتيكية سويسرية، حزام جلد طبيعي، مقاومة للماء.',
    features: ['حركة أوتوماتيكية سويسرية', 'حزام جلد طبيعي', 'مقاومة للماء 100م', 'زجاج ياقوت مقاوم للخدش', 'تصميم خالد'],
    specs: [
      { key: 'الحركة', value: 'أوتوماتيكية سويسرية' },
      { key: 'الحزام', value: 'جلد طبيعي' },
      { key: 'الزجاج', value: 'ياقوت' },
      { key: 'الضمان', value: 'سنتان' }
    ],
    createdAt: '2025-04-15'
  },
  {
    id: 14,
    name: 'تيشيرت قطن عضوي',
    nameEn: 'Organic Cotton T-Shirt',
    category: 'fashion',
    categoryAr: 'الأزياء',
    price: 149,
    oldPrice: 199,
    rating: 4.5,
    reviewsCount: 1567,
    sold: 4500,
    stock: 320,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'
    ],
    description: 'تيشيرت قطن عضوي 100% مريح وعصري، متوفر بعدة ألوان ومقاسات.',
    features: ['قطن عضوي 100%', 'مريح ومتنفس', 'ألوان ثابتة', 'تصميم عصري', 'صديق للبيئة'],
    specs: [
      { key: 'المادة', value: 'قطن عضوي 100%' },
      { key: 'المقاسات', value: 'XS - 3XL' },
      { key: 'الألوان', value: '8 ألوان' },
      { key: 'العناية', value: 'غسيل آلي' }
    ],
    isBestSeller: true,
    createdAt: '2025-03-10'
  },
  // المنزل
  {
    id: 15,
    name: 'مصباح ذكي - SmartLight',
    nameEn: 'SmartLight Bulb',
    category: 'home',
    categoryAr: 'المنزل',
    price: 199,
    oldPrice: 299,
    rating: 4.6,
    reviewsCount: 1234,
    sold: 3400,
    stock: 250,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
      'https://images.unsplash.com/photo-1558002038-bb4237b50b11?w=800&q=80'
    ],
    description: 'مصباح ذكي بـ16 مليون لون، تحكم بالصوت والتطبيق، توفير طاقة 80%، عمر افتراضي 25 ألف ساعة.',
    features: ['16 مليون لون', 'تحكم بالصوت', 'توفير طاقة 80%', 'تطبيق ذكي', 'دعم Alexa & Google'],
    specs: [
      { key: 'القوة', value: '9W (60W مكافئ)' },
      { key: 'الألوان', value: '16M ألوان RGB' },
      { key: 'الاتصال', value: 'WiFi 2.4GHz' },
      { key: 'العمر', value: '25,000 ساعة' }
    ],
    isFeatured: true,
    createdAt: '2025-08-01'
  },
  {
    id: 16,
    name: 'آلة قهوة احترافية - Barista',
    nameEn: 'Barista Coffee Machine',
    category: 'home',
    categoryAr: 'المنزل',
    price: 2499,
    oldPrice: 2999,
    rating: 4.8,
    reviewsCount: 567,
    sold: 890,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
      'https://images.unsplash.com/photo-1572286258217-215cf8e9e373?w=800&q=80'
    ],
    description: 'آلة قهوة احترافية بمضخة 19 بار، طاحونة مدمجة، شاشة لمس، تحضر القهوة بمستوى الباريستا.',
    features: ['مضخة 19 بار', 'طاحونة سيراميك', 'شاشة لمس ملونة', '15 وصفة جاهزة', 'تنظيف ذاتي'],
    specs: [
      { key: 'الضغط', value: '19 بار' },
      { key: 'السعة', value: '1.8 لتر' },
      { key: 'الطاقة', value: '1450W' },
      { key: 'الضمان', value: '3 سنوات' }
    ],
    isFeatured: true,
    createdAt: '2025-07-15'
  },
  {
    id: 17,
    name: 'مكنسة روبوت ذكية - CleanBot',
    nameEn: 'CleanBot Robot Vacuum',
    category: 'home',
    categoryAr: 'المنزل',
    price: 1799,
    oldPrice: 2299,
    rating: 4.5,
    reviewsCount: 789,
    sold: 1500,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80'
    ],
    description: 'مكنسة روبوت ذكية مع خرائط ليزر LiDAR، شفط 5000Pa، مسح ذكي، عمر بطارية 180 دقيقة.',
    features: ['خرائط ليزر LiDAR', 'شفط 5000Pa قوي', 'مسح وشفط معاً', 'بطارية 180 دقيقة', 'تحكم بالتطبيق'],
    specs: [
      { key: 'قوة الشفط', value: '5000Pa' },
      { key: 'البطارية', value: '180 دقيقة' },
      { key: 'الخزان', value: '450ml غبار + 300ml ماء' },
      { key: 'الضوضاء', value: '<60dB' }
    ],
    createdAt: '2025-06-30'
  },
  {
    id: 18,
    name: 'وسائد فندقية فاخرة - طقم 2',
    nameEn: 'Hotel Luxury Pillows Set',
    category: 'home',
    categoryAr: 'المنزل',
    price: 299,
    oldPrice: 449,
    rating: 4.7,
    reviewsCount: 1456,
    sold: 3800,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
    ],
    description: 'وسائد فاخرة بمستوى الفنادق الخمسة نجوم، حشوة ميكروفايبر ناعمة، غطاء قطن 100%.',
    features: ['ميكروفايبر فاخر', 'غطاء قطن 100%', 'مضادة للحساسية', 'قابلة للغسل', 'دعم رقبة مريح'],
    specs: [
      { key: 'الحجم', value: '50×70 سم' },
      { key: 'الحشوة', value: 'ميكروفايبر' },
      { key: 'الغطاء', value: 'قطن 100%' },
      { key: 'العدد', value: 'وسادتان' }
    ],
    isBestSeller: true,
    createdAt: '2025-05-25'
  },
  {
    id: 19,
    name: 'سبيكر منزلي ذكي',
    nameEn: 'Smart Home Speaker',
    category: 'home',
    categoryAr: 'المنزل',
    price: 549,
    oldPrice: 749,
    rating: 4.6,
    reviewsCount: 892,
    sold: 2100,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80'
    ],
    description: 'سبيكر منزلي ذكي بصوت 360 درجة، تحكم بالصوت، دعم جميع منصات البث.',
    features: ['صوت 360 درجة', 'مساعد صوتي ذكي', 'دعم Spotify, YouTube', 'WiFi و Bluetooth', 'تصميم أنيق'],
    specs: [
      { key: 'الصوت', value: '360° مكاني' },
      { key: 'الاتصال', value: 'WiFi + BT 5.2' },
      { key: 'الطاقة', value: '40W' },
      { key: 'الميكروفون', value: '4 ميكروفونات بعيدة المدى' }
    ],
    createdAt: '2025-04-20'
  },
  // الجمال
  {
    id: 20,
    name: 'مجموعة العناية بالبشرة الكاملة',
    nameEn: 'Complete Skincare Set',
    category: 'beauty',
    categoryAr: 'الجمال',
    price: 599,
    oldPrice: 899,
    rating: 4.8,
    reviewsCount: 2134,
    sold: 5600,
    stock: 88,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'
    ],
    description: 'مجموعة كاملة للعناية بالبشرة تشمل غسول، تونر، سيروم، ومرطب. مكونات طبيعية 100%.',
    features: ['مكونات طبيعية 100%', 'مناسبة لجميع أنواع البشرة', 'فيتامين C وحمض الهيالورونيك', 'خالية من البارابين', 'نتائج مرئية في 14 يوم'],
    specs: [
      { key: 'المنتجات', value: '4 منتجات' },
      { key: 'النوع', value: 'لجميع البشرات' },
      { key: 'المكونات', value: 'طبيعية' },
      { key: 'الحجم', value: '50ml × 4' }
    ],
    isFeatured: true,
    isBestSeller: true,
    createdAt: '2025-09-10'
  },
  {
    id: 21,
    name: 'عطر فاخر للرجال - Noir',
    nameEn: 'Noir Premium Men Perfume',
    category: 'beauty',
    categoryAr: 'الجمال',
    price: 449,
    oldPrice: 649,
    rating: 4.7,
    reviewsCount: 678,
    sold: 1900,
    stock: 56,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80'
    ],
    description: 'عطر رجالي فاخر بتركيبة شرقية فرنسية، رائحة دافئة وجذابة تدوم 24 ساعة.',
    features: ['تركيبة فرنسية فاخرة', 'يدوم 24 ساعة', 'رائحة شرقية دافئة', 'عبوة كريستال أنيقة', 'مناسب للمناسبات'],
    specs: [
      { key: 'الحجم', value: '100ml' },
      { key: 'النوع', value: 'EDP بارفيوم' },
      { key: 'العائلة', value: 'شرقي خشبي' },
      { key: 'الصنع', value: 'فرنسا' }
    ],
    createdAt: '2025-08-05'
  },
  {
    id: 22,
    name: 'مكواة شعر احترافية',
    nameEn: 'Professional Hair Straightener',
    category: 'beauty',
    categoryAr: 'الجمال',
    price: 379,
    oldPrice: 549,
    rating: 4.6,
    reviewsCount: 1234,
    sold: 3200,
    stock: 110,
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80'
    ],
    description: 'مكواة شعر احترافية بألواح سيراميك توربمالين، حرارة قابلة للتعديل، تسخين سريع 30 ثانية.',
    features: ['ألواح سيراميك توربمالين', 'تسخين سريع 30 ثانية', '5 درجات حرارة', 'خاصية الأيون السلبي', 'إيقاف تلقائي'],
    specs: [
      { key: 'الألواح', value: 'سيراميك توربمالين' },
      { key: 'الحرارة', value: '120-230°C' },
      { key: 'الطاقة', value: '60W' },
      { key: 'الضمان', value: 'سنتان' }
    ],
    createdAt: '2025-07-20'
  },
  {
    id: 23,
    name: 'مجموعة مكياج احترافية',
    nameEn: 'Professional Makeup Kit',
    category: 'beauty',
    categoryAr: 'الجمال',
    price: 799,
    oldPrice: 1099,
    rating: 4.9,
    reviewsCount: 456,
    sold: 1100,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80'
    ],
    description: 'مجموعة مكياج احترافية كاملة بأكثر من 50 منتج، مناسبة للمحترفات والمبتدئات.',
    features: ['50+ منتج مكياج', 'فرش احترافية', 'حقيبة فاخرة', 'مرآة LED مدمجة', 'مكونات آمنة'],
    specs: [
      { key: 'المنتجات', value: '50+ قطعة' },
      { key: 'النوع', value: 'مجموعة كاملة' },
      { key: 'الحقيبة', value: 'جلد فاخر' },
      { key: 'الضمان', value: 'سنة' }
    ],
    isNew: true,
    createdAt: '2025-10-15'
  },
  // الرياضة
  {
    id: 24,
    name: 'دراجة هوائية رياضية - Speed X',
    nameEn: 'Speed X Sport Bike',
    category: 'sports',
    categoryAr: 'الرياضة',
    price: 2799,
    oldPrice: 3499,
    rating: 4.7,
    reviewsCount: 234,
    sold: 580,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80'
    ],
    description: 'دراجة هوائية رياضية بإطار ألمنيوم خفيف، 21 سرعة Shimano، مكابح هيدروليكية.',
    features: ['إطار ألمنيوم خفيف', '21 سرعة Shimano', 'مكابح هيدروليكية', 'إطارات مقاومة للثقب', 'تصميم رياضي'],
    specs: [
      { key: 'الإطار', value: 'ألمنيوم 6061' },
      { key: 'السرعات', value: '21 سرعة' },
      { key: 'الوزن', value: '12.5 كجم' },
      { key: 'الضمان', value: '5 سنوات' }
    ],
    isFeatured: true,
    createdAt: '2025-06-10'
  },
  {
    id: 25,
    name: 'حقيبة رياضية متعددة الاستخدامات',
    nameEn: 'Multi-purpose Sports Bag',
    category: 'sports',
    categoryAr: 'الرياضة',
    price: 199,
    oldPrice: 299,
    rating: 4.5,
    reviewsCount: 1567,
    sold: 4200,
    stock: 230,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
    ],
    description: 'حقيبة رياضية متينة بمقصورات متعددة، مناسبة للجيم، السفر، والاستخدام اليومي.',
    features: ['مادة مقاومة للماء', 'مقصورات متعددة', 'حزام كتف مريح', 'سعة كبيرة 35L', 'تصميم عصري'],
    specs: [
      { key: 'السعة', value: '35 لتر' },
      { key: 'المادة', value: 'بوليستر مقاوم للماء' },
      { key: 'الأبعاد', value: '50×30×25 سم' },
      { key: 'الألوان', value: '6 ألوان' }
    ],
    createdAt: '2025-05-15'
  },
  {
    id: 26,
    name: 'مجموعة أوزان قابلة للتعديل',
    nameEn: 'Adjustable Dumbbells Set',
    category: 'sports',
    categoryAr: 'الرياضة',
    price: 1299,
    oldPrice: 1799,
    rating: 4.8,
    reviewsCount: 345,
    sold: 780,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80'
    ],
    description: 'مجموعة أوزان قابلة للتعديل من 5 إلى 25 كجم، مثالية للتمرين المنزلي.',
    features: ['وزن قابل للتعديل 5-25 كجم', 'تغيير سريع للأوزان', 'مقابض مريحة', 'حامل تخزين مدمج', 'مادة عالية الجودة'],
    specs: [
      { key: 'الوزن', value: '5-25 كجم' },
      { key: 'العدد', value: 'زوج' },
      { key: 'المادة', value: 'حديد مطلي' },
      { key: 'الضمان', value: 'سنتان' }
    ],
    isFeatured: true,
    createdAt: '2025-04-25'
  },
  {
    id: 27,
    name: 'بساط يوغا احترافي',
    nameEn: 'Professional Yoga Mat',
    category: 'sports',
    categoryAr: 'الرياضة',
    price: 159,
    oldPrice: 229,
    rating: 4.6,
    reviewsCount: 892,
    sold: 2400,
    stock: 175,
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80'
    ],
    description: 'بساط يوغا احترافي بسماكة 8 ملم، مادة TPE صديقة للبيئة، مقاوم للانزلاق.',
    features: ['سماكة 8 ملم', 'مادة TPE صديقة للبيئة', 'مقاوم للانزلاق', 'حقيبة حمل مجانية', 'مقاسات كبيرة'],
    specs: [
      { key: 'الأبعاد', value: '183×61 سم' },
      { key: 'السماكة', value: '8 ملم' },
      { key: 'المادة', value: 'TPE' },
      { key: 'الوزن', value: '900 جرام' }
    ],
    isBestSeller: true,
    createdAt: '2025-03-20'
  },
  // الكتب
  {
    id: 28,
    name: 'كتاب: عادات الناجحين',
    nameEn: 'Habits of Successful People',
    category: 'books',
    categoryAr: 'الكتب',
    price: 89,
    oldPrice: 119,
    rating: 4.9,
    reviewsCount: 3456,
    sold: 12000,
    stock: 500,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'
    ],
    description: 'كتاب يكشف العادات السبع الأكثر تأثيراً في حياة الناجحين، مع تطبيقات عملية.',
    features: ['350 صفحة', 'لغة عربية فصيحة', 'أمثلة عملية', 'تمارين تطبيقية', 'مؤلف معروف'],
    specs: [
      { key: 'الصفحات', value: '350' },
      { key: 'اللغة', value: 'العربية' },
      { key: 'الغلاف', value: 'مقوى' },
      { key: 'الناشر', value: 'دار الفكر' }
    ],
    isBestSeller: true,
    createdAt: '2025-02-15'
  },
  {
    id: 29,
    name: 'كتاب: رحلة الإبداع',
    nameEn: 'Journey of Creativity',
    category: 'books',
    categoryAr: 'الكتب',
    price: 119,
    oldPrice: 159,
    rating: 4.7,
    reviewsCount: 1234,
    sold: 5600,
    stock: 280,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80'
    ],
    description: 'كتاب ملهم عن كيفية إيقاظ الإبداع داخلك وتحويله إلى منتج حقيقي يغير حياتك.',
    features: ['280 صفحة', 'قصص ملهمة', 'تقنيات إبداعية', 'تطبيقات يومية', 'مؤلف مبدع'],
    specs: [
      { key: 'الصفحات', value: '280' },
      { key: 'اللغة', value: 'العربية' },
      { key: 'الغلاف', value: 'فني' },
      { key: 'الناشر', value: 'دار الإبداع' }
    ],
    createdAt: '2025-01-20'
  },
  {
    id: 30,
    name: 'كتاب: إدارة الوقت بذكاء',
    nameEn: 'Smart Time Management',
    category: 'books',
    categoryAr: 'الكتب',
    price: 79,
    oldPrice: 109,
    rating: 4.6,
    reviewsCount: 892,
    sold: 3400,
    stock: 320,
    image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&q=80'
    ],
    description: 'دليل عملي شامل لإدارة وقتك بذكاء وتحقيق الإنتاجية القصوى في حياتك.',
    features: ['220 صفحة', 'استراتيجيات عملية', 'جداول جاهزة', 'تطبيقات يومية', 'سهل القراءة'],
    specs: [
      { key: 'الصفحات', value: '220' },
      { key: 'اللغة', value: 'العربية' },
      { key: 'الغلاف', value: 'عادي' },
      { key: 'الناشر', value: 'دار التطوير' }
    ],
    createdAt: '2024-12-10'
  }
]

// منتجات للـ admin (يمكن التعديل عليها)
export const initialAdminOrders = [
  { id: 'ORD-2025-001', customer: 'أحمد محمد', total: 1547, status: 'مكتمل', date: '2025-04-25', items: 3 },
  { id: 'ORD-2025-002', customer: 'فاطمة علي', total: 899, status: 'قيد الشحن', date: '2025-04-26', items: 2 },
  { id: 'ORD-2025-003', customer: 'خالد عبدالله', total: 3299, status: 'قيد المعالجة', date: '2025-04-27', items: 1 },
  { id: 'ORD-2025-004', customer: 'مريم حسن', total: 749, status: 'مكتمل', date: '2025-04-28', items: 4 },
  { id: 'ORD-2025-005', customer: 'يوسف إبراهيم', total: 2199, status: 'قيد الشحن', date: '2025-04-28', items: 2 },
  { id: 'ORD-2025-006', customer: 'نورا سعيد', total: 1299, status: 'مكتمل', date: '2025-04-29', items: 3 },
  { id: 'ORD-2025-007', customer: 'سلمى أحمد', total: 599, status: 'قيد المعالجة', date: '2025-04-29', items: 1 }
]

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}

export function getRelatedProducts(productId: number, category: string, limit = 4): Product[] {
  return products
    .filter(p => p.id !== productId && p.category === category)
    .slice(0, limit)
}
