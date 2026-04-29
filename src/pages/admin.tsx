import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'
import { products, initialAdminOrders, categories } from '../data/products'

export const AdminPage: FC = () => {
  // إحصائيات حقيقية
  const totalProducts = products.length
  const totalOrders = initialAdminOrders.length
  const totalRevenue = initialAdminOrders.reduce((sum, o) => sum + o.total, 0)
  const completedOrders = initialAdminOrders.filter(o => o.status === 'مكتمل').length
  const productsJson = JSON.stringify(products).replace(/</g, '\\u003c')
  const ordersJson = JSON.stringify(initialAdminOrders).replace(/</g, '\\u003c')
  const categoriesJson = JSON.stringify(categories).replace(/</g, '\\u003c')

  return (
    <Layout title="لوحة الإدارة - متجر نوڤا" currentPage="admin">
      <section class="max-w-7xl mx-auto px-4 py-8" x-data="adminPanel" x-init="init()">
        {/* Header */}
        <div class="mb-8">
          <nav class="flex items-center gap-1.5 text-sm text-ink-500 mb-3">
            <a href="/" class="hover:text-brand-600 transition-colors">الرئيسية</a>
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <span class="text-ink-900 font-medium">لوحة الإدارة</span>
          </nav>
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 class="font-display font-black text-3xl md:text-4xl text-ink-900 flex items-center gap-3">
                <i data-lucide="layout-dashboard" class="w-8 h-8 text-brand-500"></i>
                <span>لوحة الإدارة</span>
              </h1>
              <p class="text-ink-500 mt-1.5">مرحباً بعودتك! إليك نظرة عامة على متجرك.</p>
            </div>
            <button {...{ '@click': 'openProductModal()' }} class="h-11 px-5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-brand-500/30 transition-all">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>إضافة منتج</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'إجمالي المنتجات', value: totalProducts, icon: 'package', color: 'from-blue-500 to-cyan-500', change: '+5 هذا الشهر' },
            { label: 'إجمالي الطلبات', value: totalOrders, icon: 'shopping-bag', color: 'from-emerald-500 to-teal-500', change: '+12% هذا الأسبوع' },
            { label: 'الإيرادات (ر.س)', value: totalRevenue.toLocaleString('ar-SA'), icon: 'trending-up', color: 'from-violet-500 to-purple-500', change: '+18% هذا الشهر' },
            { label: 'الطلبات المكتملة', value: completedOrders, icon: 'check-circle-2', color: 'from-amber-500 to-orange-500', change: 'من أصل ' + totalOrders }
          ].map(stat => (
            <div class="bg-white rounded-2xl border border-ink-100 p-5 hover-lift">
              <div class="flex items-center justify-between mb-3">
                <div class={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                  <i data-lucide={stat.icon} class="w-5 h-5"></i>
                </div>
                <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{stat.change}</span>
              </div>
              <div class="font-display font-black text-2xl md:text-3xl text-ink-900">{stat.value}</div>
              <div class="text-xs text-ink-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div class="bg-white rounded-2xl border border-ink-100 mb-6">
          <div class="flex items-center border-b border-ink-100 px-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'products', label: 'المنتجات', icon: 'package' },
              { id: 'orders', label: 'الطلبات', icon: 'shopping-bag' },
              { id: 'analytics', label: 'الإحصائيات', icon: 'bar-chart-3' }
            ].map(t => (
              <button {...{ '@click': `tab = '${t.id}'` }} class="px-4 py-3.5 text-sm font-semibold transition-colors relative whitespace-nowrap flex items-center gap-2" {...{ ':class': `tab === '${t.id}' ? 'text-brand-600' : 'text-ink-500 hover:text-ink-900'` }}>
                <i data-lucide={t.icon} class="w-4 h-4"></i>
                <span>{t.label}</span>
                <span x-show={`tab === '${t.id}'`} class="absolute bottom-0 right-2 left-2 h-0.5 bg-brand-500 rounded-t"></span>
              </button>
            ))}
          </div>

          {/* === Products Tab === */}
          <div x-show="tab === 'products'" class="p-5">
            <div class="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div class="flex items-center gap-2 flex-1 min-w-[200px]">
                <div class="relative flex-1 max-w-md">
                  <input type="text" x-model="productSearch" placeholder="ابحث عن منتج..." class="form-input h-10 pr-10 text-sm" />
                  <i data-lucide="search" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-ink-400"></i>
                </div>
                <select x-model="productCategoryFilter" class="form-input h-10 text-sm w-auto pr-8">
                  <option value="">كل التصنيفات</option>
                  <template x-for="cat in categoriesData" {...{ ':key': 'cat.id' }}>
                    <option {...{ ':value': 'cat.id' }} x-text="cat.name"></option>
                  </template>
                </select>
              </div>
              <div class="text-sm text-ink-500">
                <span class="font-bold text-ink-900" x-text="filteredProducts.length"></span> منتج
              </div>
            </div>

            <div class="overflow-x-auto -mx-5">
              <table class="w-full text-sm">
                <thead class="bg-ink-50">
                  <tr>
                    <th class="text-right px-5 py-3 font-bold text-ink-700 text-xs">المنتج</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">التصنيف</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">السعر</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">المخزون</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">المبيعات</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">التقييم</th>
                    <th class="text-right px-5 py-3 font-bold text-ink-700 text-xs">الإجراءات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-ink-100">
                  <template x-for="p in filteredProducts" {...{ ':key': 'p.id' }}>
                    <tr class="hover:bg-ink-50/50 transition-colors">
                      <td class="px-5 py-3">
                        <div class="flex items-center gap-3">
                          <img {...{ ':src': 'p.image' }} class="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div class="font-semibold text-ink-900 line-clamp-1" x-text="p.name"></div>
                            <div class="text-xs text-ink-500" x-text="'#' + p.id"></div>
                          </div>
                        </div>
                      </td>
                      <td class="px-3 py-3">
                        <span class="px-2 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-bold" x-text="p.categoryAr"></span>
                      </td>
                      <td class="px-3 py-3">
                        <div class="font-bold text-ink-900" x-text="p.price.toLocaleString('ar-SA') + ' ر.س'"></div>
                        <template x-if="p.oldPrice"><div class="text-[10px] text-ink-400 line-through" x-text="p.oldPrice.toLocaleString('ar-SA') + ' ر.س'"></div></template>
                      </td>
                      <td class="px-3 py-3">
                        <span class="text-xs font-bold px-2 py-1 rounded" {...{ ':class': 'p.stock > 20 ? \'bg-emerald-50 text-emerald-700\' : p.stock > 0 ? \'bg-amber-50 text-amber-700\' : \'bg-red-50 text-red-700\'' }} x-text="p.stock + ' قطعة'"></span>
                      </td>
                      <td class="px-3 py-3 text-ink-700" x-text="p.sold.toLocaleString('ar-SA')"></td>
                      <td class="px-3 py-3">
                        <div class="flex items-center gap-1">
                          <i data-lucide="star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400"></i>
                          <span class="font-bold text-ink-700" x-text="p.rating"></span>
                        </div>
                      </td>
                      <td class="px-5 py-3">
                        <div class="flex items-center gap-1">
                          <a {...{ ':href': '\'/product/\' + p.id' }} target="_blank" class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-brand-50 hover:text-brand-600 transition-colors" title="عرض">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                          </a>
                          <button {...{ '@click': 'openProductModal(p)' }} class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-amber-50 hover:text-amber-600 transition-colors" title="تعديل">
                            <i data-lucide="edit-2" class="w-4 h-4"></i>
                          </button>
                          <button {...{ '@click': 'deleteProduct(p.id)' }} class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-red-50 hover:text-red-600 transition-colors" title="حذف">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div x-show="filteredProducts.length === 0" class="py-12 text-center">
                <i data-lucide="package-x" class="w-12 h-12 mx-auto text-ink-300 mb-3"></i>
                <p class="text-ink-500">لا توجد منتجات تطابق البحث</p>
              </div>
            </div>
          </div>

          {/* === Orders Tab === */}
          <div x-show="tab === 'orders'" {...{ "x-cloak": "" }} class="p-5">
            <div class="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div class="flex items-center gap-2">
                <select x-model="orderStatusFilter" class="form-input h-10 text-sm w-auto pr-8">
                  <option value="">كل الحالات</option>
                  <option value="مكتمل">مكتمل</option>
                  <option value="قيد الشحن">قيد الشحن</option>
                  <option value="قيد المعالجة">قيد المعالجة</option>
                </select>
              </div>
              <div class="text-sm text-ink-500">
                <span class="font-bold text-ink-900" x-text="filteredOrders.length"></span> طلب
              </div>
            </div>

            <div class="overflow-x-auto -mx-5">
              <table class="w-full text-sm">
                <thead class="bg-ink-50">
                  <tr>
                    <th class="text-right px-5 py-3 font-bold text-ink-700 text-xs">رقم الطلب</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">العميل</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">المنتجات</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">الإجمالي</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">التاريخ</th>
                    <th class="text-right px-3 py-3 font-bold text-ink-700 text-xs">الحالة</th>
                    <th class="text-right px-5 py-3 font-bold text-ink-700 text-xs">إجراءات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-ink-100">
                  <template x-for="o in filteredOrders" {...{ ':key': 'o.id' }}>
                    <tr class="hover:bg-ink-50/50 transition-colors">
                      <td class="px-5 py-3 font-bold text-ink-900" x-text="o.id"></td>
                      <td class="px-3 py-3">
                        <div class="flex items-center gap-2">
                          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 text-white flex items-center justify-center font-bold text-xs" x-text="o.customer.charAt(0)"></div>
                          <span x-text="o.customer"></span>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-ink-600" x-text="o.items + ' منتج'"></td>
                      <td class="px-3 py-3 font-bold text-ink-900" x-text="o.total.toLocaleString('ar-SA') + ' ر.س'"></td>
                      <td class="px-3 py-3 text-ink-600 text-xs" x-text="o.date"></td>
                      <td class="px-3 py-3">
                        <select {...{ '@change': 'updateOrderStatus(o.id, $event.target.value)' }} class="px-2 py-1 rounded-md text-xs font-bold border-0 outline-none cursor-pointer" {...{ ':class': 'getStatusClass(o.status)' }}>
                          <option value="مكتمل" {...{ ':selected': 'o.status === \'مكتمل\'' }}>مكتمل</option>
                          <option value="قيد الشحن" {...{ ':selected': 'o.status === \'قيد الشحن\'' }}>قيد الشحن</option>
                          <option value="قيد المعالجة" {...{ ':selected': 'o.status === \'قيد المعالجة\'' }}>قيد المعالجة</option>
                          <option value="ملغي" {...{ ':selected': 'o.status === \'ملغي\'' }}>ملغي</option>
                        </select>
                      </td>
                      <td class="px-5 py-3">
                        <div class="flex items-center gap-1">
                          <button class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-brand-50 hover:text-brand-600 transition-colors" title="عرض التفاصيل" {...{ '@click': 'alert(\'تفاصيل الطلب: \' + o.id + \'\\nالعميل: \' + o.customer + \'\\nالإجمالي: \' + o.total + \' ر.س\')' }}>
                            <i data-lucide="eye" class="w-4 h-4"></i>
                          </button>
                          <button {...{ '@click': 'deleteOrder(o.id)' }} class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-red-50 hover:text-red-600 transition-colors" title="حذف">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div x-show="filteredOrders.length === 0" class="py-12 text-center">
                <i data-lucide="package-x" class="w-12 h-12 mx-auto text-ink-300 mb-3"></i>
                <p class="text-ink-500">لا توجد طلبات</p>
              </div>
            </div>
          </div>

          {/* === Analytics Tab === */}
          <div x-show="tab === 'analytics'" {...{ "x-cloak": "" }} class="p-5">
            <div class="grid md:grid-cols-2 gap-4 mb-5">
              {/* Sales by Category */}
              <div class="bg-ink-50 rounded-2xl p-5">
                <h3 class="font-bold text-ink-900 mb-4 flex items-center gap-2">
                  <i data-lucide="pie-chart" class="w-4 h-4 text-brand-500"></i>
                  <span>المبيعات حسب التصنيف</span>
                </h3>
                <div class="space-y-3">
                  <template x-for="cat in categoryStats" {...{ ':key': 'cat.id' }}>
                    <div>
                      <div class="flex items-center justify-between mb-1.5 text-sm">
                        <span class="font-semibold text-ink-700 flex items-center gap-1.5">
                          <i {...{ ':data-lucide': 'cat.icon' }} class="w-3.5 h-3.5"></i>
                          <span x-text="cat.name"></span>
                        </span>
                        <span class="font-bold text-ink-900" x-text="cat.count + ' منتج'"></span>
                      </div>
                      <div class="progress-bar">
                        <div class="progress-bar-fill" {...{ ':style': '`width: ${(cat.count / 30) * 100}%`' }}></div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              {/* Top Products */}
              <div class="bg-ink-50 rounded-2xl p-5">
                <h3 class="font-bold text-ink-900 mb-4 flex items-center gap-2">
                  <i data-lucide="award" class="w-4 h-4 text-amber-500"></i>
                  <span>أفضل المنتجات مبيعاً</span>
                </h3>
                <div class="space-y-3">
                  <template x-for="(p, idx) in topProducts" {...{ ':key': 'p.id' }}>
                    <div class="flex items-center gap-3">
                      <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs" {...{ ':class': 'idx === 0 ? \'bg-amber-500\' : idx === 1 ? \'bg-gray-400\' : idx === 2 ? \'bg-orange-700\' : \'bg-ink-400\'' }} x-text="idx + 1"></div>
                      <img {...{ ':src': 'p.image' }} class="w-10 h-10 rounded-lg object-cover" />
                      <div class="flex-1 min-w-0">
                        <div class="text-sm font-semibold text-ink-900 line-clamp-1" x-text="p.name"></div>
                        <div class="text-xs text-ink-500" x-text="p.sold.toLocaleString('ar-SA') + ' مبيعة'"></div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div class="bg-ink-50 rounded-2xl p-5">
              <h3 class="font-bold text-ink-900 mb-4 flex items-center gap-2">
                <i data-lucide="clock" class="w-4 h-4 text-emerald-500"></i>
                <span>أحدث الطلبات</span>
              </h3>
              <div class="space-y-2">
                <template x-for="o in ordersData.slice(0, 5)" {...{ ':key': 'o.id' }}>
                  <div class="bg-white rounded-xl p-3 flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-400 to-accent-400 text-white flex items-center justify-center font-bold text-xs" x-text="o.customer.charAt(0)"></div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-ink-900" x-text="o.customer"></div>
                      <div class="text-xs text-ink-500" x-text="o.id + ' • ' + o.date"></div>
                    </div>
                    <div class="text-left">
                      <div class="font-bold text-sm text-ink-900" x-text="o.total.toLocaleString('ar-SA') + ' ر.س'"></div>
                      <div class="text-[10px] font-bold mt-0.5 px-2 py-0.5 rounded inline-block" {...{ ':class': 'getStatusClass(o.status)' }} x-text="o.status"></div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        {/* Product Modal */}
        <div x-show="modalOpen" {...{ "x-cloak": "" }} class="fixed inset-0 z-[200] flex items-center justify-center p-4" {...{ 'x-transition.opacity': '' }}>
          <div class="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" {...{ '@click': 'modalOpen = false' }}></div>
          <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" {...{ "x-transition": "" }}>
            <div class="flex items-center justify-between p-6 border-b border-ink-100">
              <h3 class="font-display font-black text-xl text-ink-900" x-text="editingProduct.id ? 'تعديل منتج' : 'إضافة منتج جديد'"></h3>
              <button {...{ '@click': 'modalOpen = false' }} class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-ink-100 text-ink-500">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>
            <form {...{ '@submit.prevent': 'saveProduct()' }} class="flex-1 overflow-y-auto p-6 space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="form-label">اسم المنتج <span class="text-red-500">*</span></label>
                  <input type="text" x-model="editingProduct.name" required class="form-input" />
                </div>
                <div>
                  <label class="form-label">التصنيف <span class="text-red-500">*</span></label>
                  <select x-model="editingProduct.category" required class="form-input">
                    <option value="">اختر</option>
                    <template x-for="cat in categoriesData" {...{ ':key': 'cat.id' }}>
                      <option {...{ ':value': 'cat.id' }} x-text="cat.name"></option>
                    </template>
                  </select>
                </div>
                <div>
                  <label class="form-label">رابط الصورة</label>
                  <input type="url" x-model="editingProduct.image" placeholder="https://..." class="form-input" />
                </div>
                <div>
                  <label class="form-label">السعر (ر.س) <span class="text-red-500">*</span></label>
                  <input type="number" {...{ 'x-model.number': 'editingProduct.price' }} required min="0" step="1" class="form-input" />
                </div>
                <div>
                  <label class="form-label">السعر القديم</label>
                  <input type="number" {...{ 'x-model.number': 'editingProduct.oldPrice' }} min="0" step="1" class="form-input" />
                </div>
                <div>
                  <label class="form-label">المخزون</label>
                  <input type="number" {...{ 'x-model.number': 'editingProduct.stock' }} min="0" class="form-input" />
                </div>
                <div>
                  <label class="form-label">التقييم (0-5)</label>
                  <input type="number" {...{ 'x-model.number': 'editingProduct.rating' }} min="0" max="5" step="0.1" class="form-input" />
                </div>
                <div class="sm:col-span-2">
                  <label class="form-label">الوصف</label>
                  <textarea x-model="editingProduct.description" rows="3" class="form-input" style="height: auto; padding: 12px 14px;"></textarea>
                </div>
              </div>
            </form>
            <div class="p-6 border-t border-ink-100 flex items-center gap-3 justify-end">
              <button {...{ '@click': 'modalOpen = false' }} type="button" class="h-11 px-5 rounded-xl border border-ink-200 hover:bg-ink-50 text-ink-700 font-semibold transition-colors">إلغاء</button>
              <button {...{ '@click': 'saveProduct()' }} type="button" class="h-11 px-6 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-semibold hover:shadow-lg transition-all">
                <span x-text="editingProduct.id ? 'حفظ التغييرات' : 'إضافة المنتج'"></span>
              </button>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('alpine:init', () => {
            Alpine.data('adminPanel', () => ({
              tab: 'products',
              productsData: ${productsJson},
              ordersData: ${ordersJson},
              categoriesData: ${categoriesJson},
              productSearch: '',
              productCategoryFilter: '',
              orderStatusFilter: '',
              modalOpen: false,
              editingProduct: { id: null, name: '', category: '', image: '', price: 0, oldPrice: null, stock: 0, rating: 5, description: '' },

              init() {
                // Load from localStorage if available
                const saved = localStorage.getItem('nova_admin_products');
                if (saved) try { this.productsData = JSON.parse(saved); } catch(e){}
                const savedOrders = localStorage.getItem('nova_admin_orders');
                if (savedOrders) try { this.ordersData = JSON.parse(savedOrders); } catch(e){}
                setTimeout(() => refreshIcons(), 100);
              },

              get filteredProducts() {
                return this.productsData.filter(p => {
                  if (this.productCategoryFilter && p.category !== this.productCategoryFilter) return false;
                  if (this.productSearch) {
                    const q = this.productSearch.toLowerCase();
                    return p.name.toLowerCase().includes(q) || p.categoryAr.toLowerCase().includes(q);
                  }
                  return true;
                });
              },

              get filteredOrders() {
                return this.ordersData.filter(o => !this.orderStatusFilter || o.status === this.orderStatusFilter);
              },

              get categoryStats() {
                return this.categoriesData.map(cat => ({
                  ...cat,
                  count: this.productsData.filter(p => p.category === cat.id).length
                }));
              },

              get topProducts() {
                return [...this.productsData].sort((a,b) => b.sold - a.sold).slice(0, 5);
              },

              getStatusClass(status) {
                const map = {
                  'مكتمل': 'bg-emerald-100 text-emerald-700',
                  'قيد الشحن': 'bg-blue-100 text-blue-700',
                  'قيد المعالجة': 'bg-amber-100 text-amber-700',
                  'ملغي': 'bg-red-100 text-red-700'
                };
                return map[status] || 'bg-ink-100 text-ink-700';
              },

              persist() {
                localStorage.setItem('nova_admin_products', JSON.stringify(this.productsData));
                localStorage.setItem('nova_admin_orders', JSON.stringify(this.ordersData));
              },

              openProductModal(product = null) {
                if (product) {
                  this.editingProduct = JSON.parse(JSON.stringify(product));
                } else {
                  this.editingProduct = {
                    id: null, name: '', category: '', categoryAr: '',
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
                    price: 0, oldPrice: null, stock: 100, rating: 5,
                    reviewsCount: 0, sold: 0, description: '',
                    images: [], features: [], specs: [],
                    createdAt: new Date().toISOString().split('T')[0]
                  };
                }
                this.modalOpen = true;
              },

              saveProduct() {
                if (!this.editingProduct.name || !this.editingProduct.category || this.editingProduct.price <= 0) {
                  showToast('الرجاء ملء الحقول المطلوبة', 'error');
                  return;
                }
                const cat = this.categoriesData.find(c => c.id === this.editingProduct.category);
                this.editingProduct.categoryAr = cat ? cat.name : '';
                if (!this.editingProduct.images || this.editingProduct.images.length === 0) {
                  this.editingProduct.images = [this.editingProduct.image];
                }

                if (this.editingProduct.id) {
                  const idx = this.productsData.findIndex(p => p.id === this.editingProduct.id);
                  if (idx !== -1) this.productsData[idx] = { ...this.editingProduct };
                  showToast('تم تحديث المنتج بنجاح', 'success');
                } else {
                  this.editingProduct.id = Math.max(...this.productsData.map(p => p.id), 0) + 1;
                  this.productsData.push({ ...this.editingProduct });
                  showToast('تم إضافة المنتج بنجاح', 'success');
                }
                this.persist();
                this.modalOpen = false;
              },

              deleteProduct(id) {
                if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
                this.productsData = this.productsData.filter(p => p.id !== id);
                this.persist();
                showToast('تم حذف المنتج', 'info');
              },

              updateOrderStatus(id, status) {
                const order = this.ordersData.find(o => o.id === id);
                if (order) {
                  order.status = status;
                  this.persist();
                  showToast('تم تحديث حالة الطلب', 'success');
                }
              },

              deleteOrder(id) {
                if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;
                this.ordersData = this.ordersData.filter(o => o.id !== id);
                this.persist();
                showToast('تم حذف الطلب', 'info');
              }
            }))
          });
        `}}></script>
        <style dangerouslySetInnerHTML={{ __html: `[x-cloak]{display:none!important}` }}></style>
      </section>
    </Layout>
  )
}
