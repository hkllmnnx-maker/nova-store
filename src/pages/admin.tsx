import type { FC } from 'hono/jsx'
import { Layout } from '../components/layout'
import { categories } from '../data/products'
import { ORDER_STATUSES } from '../data/store'
import { safeJson } from '../lib/security'

export const AdminPage: FC = () => {
  const categoriesJson = safeJson(categories)
  const statusesJson = safeJson(ORDER_STATUSES)

  return (
    <Layout title="لوحة الإدارة - متجر نوڤا" currentPage="admin">
      <section class="max-w-7xl mx-auto px-4 py-8" x-data="adminPanel" x-init="init()">
        {/* Header */}
        <div class="mb-8">
          <nav class="flex items-center gap-1.5 text-sm text-ink-500 mb-3" aria-label="مسار التنقل">
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
              <p class="text-ink-500 mt-1.5">مرحباً بعودتك! إليك نظرة عامة على متجرك في الزمن الحقيقي.</p>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" {...{ '@click': 'refreshAll()' }} class="h-11 px-4 rounded-xl border border-ink-200 hover:bg-ink-50 text-ink-700 font-semibold flex items-center gap-2 transition-colors" aria-label="تحديث">
                <i data-lucide="refresh-cw" class="w-4 h-4" {...{ ':class': "loading && 'animate-spin'" }}></i>
                <span class="hidden sm:inline">تحديث</span>
              </button>
              <button type="button" {...{ '@click': 'openProductModal()' }} class="h-11 px-5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-brand-500/30 transition-all">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>إضافة منتج</span>
              </button>
              <a href="/admin/logout" class="h-11 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-semibold flex items-center gap-2 transition-colors" title="تسجيل الخروج">
                <i data-lucide="log-out" class="w-4 h-4"></i>
                <span class="hidden sm:inline">خروج</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-white rounded-2xl border border-ink-100 p-5 hover-lift">
            <div class="flex items-center justify-between mb-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <i data-lucide="package" class="w-5 h-5"></i>
              </div>
              <span x-show="stats.lowStock > 0" {...{ 'x-cloak': '' }} class="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md" x-text="stats.lowStock + ' منخفض'"></span>
            </div>
            <div class="font-display font-black text-2xl md:text-3xl text-ink-900" x-text="stats.totalProducts"></div>
            <div class="text-xs text-ink-500 mt-1">إجمالي المنتجات</div>
          </div>
          <div class="bg-white rounded-2xl border border-ink-100 p-5 hover-lift">
            <div class="flex items-center justify-between mb-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
                <i data-lucide="shopping-bag" class="w-5 h-5"></i>
              </div>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md" x-text="stats.pendingOrders + ' قيد المعالجة'"></span>
            </div>
            <div class="font-display font-black text-2xl md:text-3xl text-ink-900" x-text="stats.totalOrders"></div>
            <div class="text-xs text-ink-500 mt-1">إجمالي الطلبات</div>
          </div>
          <div class="bg-white rounded-2xl border border-ink-100 p-5 hover-lift">
            <div class="flex items-center justify-between mb-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                <i data-lucide="trending-up" class="w-5 h-5"></i>
              </div>
              <span class="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-md" x-text="stats.customers + ' عميل'"></span>
            </div>
            <div class="font-display font-black text-2xl md:text-3xl text-ink-900" x-text="Number(stats.totalRevenue).toLocaleString('ar-SA')"></div>
            <div class="text-xs text-ink-500 mt-1">الإيرادات (ر.س)</div>
          </div>
          <div class="bg-white rounded-2xl border border-ink-100 p-5 hover-lift">
            <div class="flex items-center justify-between mb-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <i data-lucide="check-circle-2" class="w-5 h-5"></i>
              </div>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md" x-text="stats.conversion + '% تحويل'"></span>
            </div>
            <div class="font-display font-black text-2xl md:text-3xl text-ink-900" x-text="stats.completedOrders"></div>
            <div class="text-xs text-ink-500 mt-1">الطلبات المكتملة</div>
          </div>
        </div>

        {/* Quick Insight Cards: Recent Orders + Low Stock + Top Products */}
        <div class="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Recent Orders */}
          <div class="bg-white rounded-2xl border border-ink-100 p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-ink-900 flex items-center gap-2">
                <i data-lucide="clock" class="w-4 h-4 text-emerald-500"></i>
                <span>أحدث الطلبات</span>
              </h3>
              <button type="button" {...{ '@click': "tab = 'orders'" }} class="text-xs text-brand-600 hover:underline font-semibold">عرض الكل</button>
            </div>
            <div class="space-y-2">
              <template x-for="o in recentOrders" {...{ ':key': 'o.id' }}>
                <button type="button" {...{ '@click': 'viewOrder(o)' }} class="w-full text-right bg-ink-50 hover:bg-brand-50/40 rounded-xl p-3 flex items-center gap-3 transition-colors">
                  <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-400 to-accent-400 text-white flex items-center justify-center font-bold text-xs flex-shrink-0" x-text="(o.customer && o.customer.fullName || '?').charAt(0)"></div>
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-sm text-ink-900 truncate" x-text="o.customer && o.customer.fullName"></div>
                    <div class="text-[11px] text-ink-500 font-mono" x-text="o.id"></div>
                  </div>
                  <div class="text-left flex-shrink-0">
                    <div class="font-bold text-sm text-ink-900" x-text="Number(o.total).toLocaleString('ar-SA') + ' ر.س'"></div>
                    <div class="text-[10px] font-bold mt-0.5 px-2 py-0.5 rounded inline-block" {...{ ':class': 'getStatusClass(o.status)' }} x-text="o.statusAr"></div>
                  </div>
                </button>
              </template>
              <div x-show="recentOrders.length === 0" {...{ 'x-cloak': '' }} class="py-6 text-center text-sm text-ink-500">لا توجد طلبات</div>
            </div>
          </div>

          {/* Low Stock */}
          <div class="bg-white rounded-2xl border border-ink-100 p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-ink-900 flex items-center gap-2">
                <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500"></i>
                <span>منتجات قاربت على النفاد</span>
              </h3>
              <button type="button" {...{ '@click': "tab = 'products'" }} class="text-xs text-brand-600 hover:underline font-semibold">عرض الكل</button>
            </div>
            <div class="space-y-2">
              <template x-for="p in lowStock" {...{ ':key': 'p.id' }}>
                <div class="bg-ink-50 rounded-xl p-3 flex items-center gap-3">
                  <img {...{ ':src': 'p.image', ':alt': 'p.name' }} class="w-10 h-10 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-sm text-ink-900 truncate" x-text="p.name"></div>
                    <div class="text-[11px] text-ink-500" x-text="p.categoryAr"></div>
                  </div>
                  <span class="text-xs font-bold px-2 py-1 rounded flex-shrink-0" {...{ ':class': 'p.stock === 0 ? \'bg-red-50 text-red-700\' : \'bg-amber-50 text-amber-700\'' }} x-text="p.stock + ' قطعة'"></span>
                </div>
              </template>
              <div x-show="lowStock.length === 0" {...{ 'x-cloak': '' }} class="py-6 text-center text-sm text-ink-500">المخزون مستقر</div>
            </div>
          </div>

          {/* Top Selling */}
          <div class="bg-white rounded-2xl border border-ink-100 p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-ink-900 flex items-center gap-2">
                <i data-lucide="award" class="w-4 h-4 text-violet-500"></i>
                <span>الأكثر مبيعاً</span>
              </h3>
            </div>
            <div class="space-y-2">
              <template x-for="(p, idx) in topSelling" {...{ ':key': 'p.id' }}>
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0" {...{ ':class': 'idx === 0 ? \'bg-amber-500\' : idx === 1 ? \'bg-gray-400\' : idx === 2 ? \'bg-orange-700\' : \'bg-ink-400\'' }} x-text="idx + 1"></div>
                  <img {...{ ':src': 'p.image', ':alt': 'p.name' }} class="w-10 h-10 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-semibold text-ink-900 truncate" x-text="p.name"></div>
                    <div class="text-xs text-ink-500" x-text="Number(p.sold).toLocaleString('ar-SA') + ' مبيعة'"></div>
                  </div>
                </div>
              </template>
              <div x-show="topSelling.length === 0" {...{ 'x-cloak': '' }} class="py-6 text-center text-sm text-ink-500">لا توجد بيانات</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div class="bg-white rounded-2xl border border-ink-100 mb-6">
          <div class="flex items-center border-b border-ink-100 px-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="أقسام لوحة الإدارة">
            <button type="button" role="tab" {...{ '@click': "tab = 'products'", ':aria-selected': "tab === 'products'" }} class="px-4 py-3.5 text-sm font-semibold transition-colors relative whitespace-nowrap flex items-center gap-2" {...{ ':class': "tab === 'products' ? 'text-brand-600' : 'text-ink-500 hover:text-ink-900'" }}>
              <i data-lucide="package" class="w-4 h-4"></i>
              <span>المنتجات</span>
              <span x-show="tab === 'products'" class="absolute bottom-0 right-2 left-2 h-0.5 bg-brand-500 rounded-t"></span>
            </button>
            <button type="button" role="tab" {...{ '@click': "tab = 'orders'", ':aria-selected': "tab === 'orders'" }} class="px-4 py-3.5 text-sm font-semibold transition-colors relative whitespace-nowrap flex items-center gap-2" {...{ ':class': "tab === 'orders' ? 'text-brand-600' : 'text-ink-500 hover:text-ink-900'" }}>
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              <span>الطلبات</span>
              <span x-show="tab === 'orders'" class="absolute bottom-0 right-2 left-2 h-0.5 bg-brand-500 rounded-t"></span>
            </button>
          </div>

          {/* === Products Tab === */}
          <div x-show="tab === 'products'" class="p-5">
            <div class="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div class="flex items-center gap-2 flex-1 min-w-[200px]">
                <div class="relative flex-1 max-w-md">
                  <label for="admin-product-search" class="sr-only">ابحث عن منتج</label>
                  <input id="admin-product-search" type="text" x-model="productSearch" placeholder="ابحث عن منتج..." class="form-input h-10 pr-10 text-sm" />
                  <i data-lucide="search" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-ink-400" aria-hidden="true"></i>
                </div>
                <label for="admin-cat-filter" class="sr-only">تصنيف</label>
                <select id="admin-cat-filter" x-model="productCategoryFilter" class="form-input h-10 text-sm w-auto pr-8">
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
                    <th scope="col" class="text-right px-5 py-3 font-bold text-ink-700 text-xs">المنتج</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">التصنيف</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">السعر</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">المخزون</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">المبيعات</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">التقييم</th>
                    <th scope="col" class="text-right px-5 py-3 font-bold text-ink-700 text-xs">الإجراءات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-ink-100">
                  <template x-for="p in filteredProducts" {...{ ':key': 'p.id' }}>
                    <tr class="hover:bg-ink-50/50 transition-colors">
                      <td class="px-5 py-3">
                        <div class="flex items-center gap-3">
                          <img {...{ ':src': 'p.image', ':alt': 'p.name' }} class="w-12 h-12 rounded-lg object-cover" loading="lazy" />
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
                        <div class="font-bold text-ink-900" x-text="Number(p.price).toLocaleString('ar-SA') + ' ر.س'"></div>
                        <template x-if="p.oldPrice"><div class="text-[10px] text-ink-400 line-through" x-text="Number(p.oldPrice).toLocaleString('ar-SA') + ' ر.س'"></div></template>
                      </td>
                      <td class="px-3 py-3">
                        <span class="text-xs font-bold px-2 py-1 rounded" {...{ ':class': 'p.stock > 20 ? \'bg-emerald-50 text-emerald-700\' : p.stock > 0 ? \'bg-amber-50 text-amber-700\' : \'bg-red-50 text-red-700\'' }} x-text="p.stock + ' قطعة'"></span>
                      </td>
                      <td class="px-3 py-3 text-ink-700" x-text="Number(p.sold).toLocaleString('ar-SA')"></td>
                      <td class="px-3 py-3">
                        <div class="flex items-center gap-1">
                          <i data-lucide="star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden="true"></i>
                          <span class="font-bold text-ink-700" x-text="p.rating"></span>
                        </div>
                      </td>
                      <td class="px-5 py-3">
                        <div class="flex items-center gap-1">
                          <a {...{ ':href': '\'/product/\' + p.id' }} target="_blank" rel="noopener" class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-brand-50 hover:text-brand-600 transition-colors" title="عرض" aria-label="عرض المنتج">
                            <i data-lucide="eye" class="w-4 h-4" aria-hidden="true"></i>
                          </a>
                          <button type="button" {...{ '@click': 'openProductModal(p)' }} class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-amber-50 hover:text-amber-600 transition-colors" title="تعديل" aria-label="تعديل المنتج">
                            <i data-lucide="edit-2" class="w-4 h-4" aria-hidden="true"></i>
                          </button>
                          <button type="button" {...{ '@click': 'deleteProduct(p.id)' }} class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-red-50 hover:text-red-600 transition-colors" title="حذف" aria-label="حذف المنتج">
                            <i data-lucide="trash-2" class="w-4 h-4" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div x-show="filteredProducts.length === 0" {...{ 'x-cloak': '' }} class="py-12 text-center">
                <i data-lucide="package-x" class="w-12 h-12 mx-auto text-ink-300 mb-3" aria-hidden="true"></i>
                <p class="text-ink-500">لا توجد منتجات تطابق البحث</p>
              </div>
            </div>
          </div>

          {/* === Orders Tab === */}
          <div x-show="tab === 'orders'" {...{ "x-cloak": "" }} class="p-5">
            <div class="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div class="flex items-center gap-2 flex-1 min-w-[200px]">
                <div class="relative flex-1 max-w-md">
                  <label for="admin-order-search" class="sr-only">ابحث في الطلبات</label>
                  <input id="admin-order-search" type="text" x-model="orderSearch" placeholder="رقم الطلب أو اسم العميل..." class="form-input h-10 pr-10 text-sm" />
                  <i data-lucide="search" class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-ink-400" aria-hidden="true"></i>
                </div>
                <label for="admin-status-filter" class="sr-only">حالة</label>
                <select id="admin-status-filter" x-model="orderStatusFilter" class="form-input h-10 text-sm w-auto pr-8">
                  <option value="">كل الحالات</option>
                  <template x-for="s in statuses" {...{ ':key': 's.id' }}>
                    <option {...{ ':value': 's.id' }} x-text="s.ar"></option>
                  </template>
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
                    <th scope="col" class="text-right px-5 py-3 font-bold text-ink-700 text-xs">رقم الطلب</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">العميل</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">المنتجات</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">الإجمالي</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">التاريخ</th>
                    <th scope="col" class="text-right px-3 py-3 font-bold text-ink-700 text-xs">الحالة</th>
                    <th scope="col" class="text-right px-5 py-3 font-bold text-ink-700 text-xs">إجراءات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-ink-100">
                  <template x-for="o in filteredOrders" {...{ ':key': 'o.id' }}>
                    <tr class="hover:bg-ink-50/50 transition-colors">
                      <td class="px-5 py-3 font-bold text-ink-900 font-mono text-xs" x-text="o.id"></td>
                      <td class="px-3 py-3">
                        <div class="flex items-center gap-2">
                          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 text-white flex items-center justify-center font-bold text-xs" x-text="(o.customer && o.customer.fullName || '?').charAt(0)"></div>
                          <div class="min-w-0">
                            <div class="font-semibold text-ink-900 truncate" x-text="o.customer && o.customer.fullName"></div>
                            <div class="text-[11px] text-ink-500 truncate" x-text="o.customer && o.customer.city"></div>
                          </div>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-ink-600" x-text="o.itemsCount + ' منتج'"></td>
                      <td class="px-3 py-3 font-bold text-ink-900" x-text="Number(o.total).toLocaleString('ar-SA') + ' ر.س'"></td>
                      <td class="px-3 py-3 text-ink-600 text-xs" x-text="formatDate(o.date)"></td>
                      <td class="px-3 py-3">
                        <select {...{ '@change': 'updateOrderStatus(o.id, $event.target.value, o.status)' }} class="px-2 py-1 rounded-md text-xs font-bold border-0 outline-none cursor-pointer" {...{ ':class': 'getStatusClass(o.status)' }} aria-label="تغيير حالة الطلب">
                          <template x-for="s in statuses" {...{ ':key': 's.id' }}>
                            <option {...{ ':value': 's.id', ':selected': 's.id === o.status' }} x-text="s.ar"></option>
                          </template>
                        </select>
                      </td>
                      <td class="px-5 py-3">
                        <div class="flex items-center gap-1">
                          <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-brand-50 hover:text-brand-600 transition-colors" title="عرض التفاصيل" aria-label="عرض تفاصيل الطلب" {...{ '@click': 'viewOrder(o)' }}>
                            <i data-lucide="eye" class="w-4 h-4" aria-hidden="true"></i>
                          </button>
                          <button type="button" {...{ '@click': 'deleteOrder(o.id)' }} class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-red-50 hover:text-red-600 transition-colors" title="حذف" aria-label="حذف الطلب">
                            <i data-lucide="trash-2" class="w-4 h-4" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div x-show="filteredOrders.length === 0" {...{ 'x-cloak': '' }} class="py-12 text-center">
                <i data-lucide="package-x" class="w-12 h-12 mx-auto text-ink-300 mb-3" aria-hidden="true"></i>
                <p class="text-ink-500">لا توجد طلبات</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Modal */}
        <div x-show="orderModalOpen" {...{ "x-cloak": "" }} class="fixed inset-0 z-[200] flex items-center justify-center p-4" {...{ 'x-transition.opacity': '' }} role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
          <div class="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" {...{ '@click': 'closeOrderModal()' }}></div>
          <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" {...{ "x-transition": "" }} x-show="selectedOrder">
            <div class="flex items-center justify-between p-6 border-b border-ink-100 bg-gradient-to-l from-brand-50/40 to-white">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white flex items-center justify-center">
                  <i data-lucide="receipt" class="w-5 h-5" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 id="order-modal-title" class="font-display font-black text-xl text-ink-900">تفاصيل الطلب</h3>
                  <div class="text-xs text-ink-500 font-mono" x-text="selectedOrder && selectedOrder.id"></div>
                </div>
              </div>
              <button type="button" {...{ '@click': 'closeOrderModal()' }} class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-ink-100 text-ink-500" aria-label="إغلاق">
                <i data-lucide="x" class="w-5 h-5" aria-hidden="true"></i>
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-6 space-y-5" x-show="selectedOrder">
              <template x-if="selectedOrder">
                <div class="space-y-5">
                  <div class="grid sm:grid-cols-2 gap-4">
                    <div class="bg-ink-50 rounded-xl p-4">
                      <div class="text-[11px] font-bold text-ink-500 uppercase tracking-wider mb-1">العميل</div>
                      <div class="font-bold text-ink-900" x-text="selectedOrder.customer && selectedOrder.customer.fullName"></div>
                      <div class="text-xs text-ink-500" x-text="selectedOrder.customer && selectedOrder.customer.phone"></div>
                      <div class="text-xs text-ink-500" x-text="selectedOrder.customer && selectedOrder.customer.email"></div>
                    </div>
                    <div class="bg-ink-50 rounded-xl p-4">
                      <div class="text-[11px] font-bold text-ink-500 uppercase tracking-wider mb-1">العنوان</div>
                      <div class="font-bold text-ink-900" x-text="selectedOrder.customer && selectedOrder.customer.city"></div>
                      <div class="text-xs text-ink-500" x-text="selectedOrder.customer && selectedOrder.customer.district"></div>
                      <div class="text-xs text-ink-500" x-text="selectedOrder.customer && selectedOrder.customer.address"></div>
                    </div>
                    <div class="bg-ink-50 rounded-xl p-4">
                      <div class="text-[11px] font-bold text-ink-500 uppercase tracking-wider mb-1">طريقة الدفع</div>
                      <div class="font-bold text-ink-900" x-text="paymentLabel(selectedOrder.payment)"></div>
                    </div>
                    <div class="bg-ink-50 rounded-xl p-4">
                      <div class="text-[11px] font-bold text-ink-500 uppercase tracking-wider mb-1">الحالة</div>
                      <span class="inline-block px-2 py-1 rounded-md text-xs font-bold" {...{ ':class': 'getStatusClass(selectedOrder.status)' }} x-text="selectedOrder.statusAr"></span>
                    </div>
                  </div>

                  <div class="bg-white border border-ink-100 rounded-2xl overflow-hidden">
                    <div class="px-4 py-2.5 bg-ink-50 text-xs font-bold text-ink-700">المنتجات</div>
                    <div class="divide-y divide-ink-100">
                      <template x-for="it in (selectedOrder.items || [])" {...{ ':key': 'it.id' }}>
                        <div class="flex items-center gap-3 p-3">
                          <img {...{ ':src': 'it.image', ':alt': 'it.name' }} class="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                          <div class="flex-1 min-w-0">
                            <div class="font-semibold text-sm text-ink-900 truncate" x-text="it.name"></div>
                            <div class="text-xs text-ink-500" x-text="'الكمية: ' + it.quantity"></div>
                          </div>
                          <div class="font-bold text-sm text-ink-900 flex-shrink-0" x-text="Number(it.price * it.quantity).toLocaleString('ar-SA') + ' ر.س'"></div>
                        </div>
                      </template>
                    </div>
                  </div>

                  <div class="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-6 text-white">
                    <div class="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div class="flex justify-between"><span class="text-white/80">المجموع الفرعي</span><span x-text="Number(selectedOrder.subtotal).toLocaleString('ar-SA') + ' ر.س'"></span></div>
                      <div class="flex justify-between"><span class="text-white/80">الشحن</span><span x-text="selectedOrder.shipping === 0 ? 'مجاني' : (Number(selectedOrder.shipping).toLocaleString('ar-SA') + ' ر.س')"></span></div>
                      <div x-show="selectedOrder.couponDiscount > 0" class="flex justify-between col-span-2"><span class="text-white/80" x-text="'خصم (' + (selectedOrder.couponCode || '') + ')'"></span><span x-text="'-' + Number(selectedOrder.couponDiscount).toLocaleString('ar-SA') + ' ر.س'"></span></div>
                    </div>
                    <div class="border-t border-white/20 pt-3 flex items-baseline justify-between">
                      <span class="text-sm text-white/80">الإجمالي</span>
                      <span class="font-display font-black text-3xl"><span x-text="Number(selectedOrder.total).toLocaleString('ar-SA')"></span> <span class="text-base font-semibold">ر.س</span></span>
                    </div>
                  </div>

                  <div x-show="selectedOrder.history && selectedOrder.history.length" class="bg-ink-50/60 border border-ink-100 rounded-xl p-4">
                    <div class="text-xs font-bold text-ink-700 mb-2">سجل الحالة</div>
                    <ol class="space-y-2">
                      <template x-for="(h, idx) in (selectedOrder.history || [])" {...{ ':key': 'idx' }}>
                        <li class="flex items-center gap-2 text-xs">
                          <span class="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                          <span class="font-bold text-ink-900" x-text="h.statusAr"></span>
                          <span class="text-ink-500" x-text="formatDate(h.at)"></span>
                        </li>
                      </template>
                    </ol>
                  </div>
                </div>
              </template>
            </div>
            <div class="p-6 border-t border-ink-100 flex items-center gap-3 justify-end bg-ink-50/40">
              <button type="button" {...{ '@click': 'closeOrderModal()' }} class="h-11 px-5 rounded-xl border border-ink-200 hover:bg-white text-ink-700 font-semibold transition-colors">إغلاق</button>
            </div>
          </div>
        </div>

        {/* Product Modal */}
        <div x-show="modalOpen" {...{ "x-cloak": "" }} class="fixed inset-0 z-[200] flex items-center justify-center p-4" {...{ 'x-transition.opacity': '' }} role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
          <div class="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" {...{ '@click': 'modalOpen = false' }}></div>
          <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" {...{ "x-transition": "" }}>
            <div class="flex items-center justify-between p-6 border-b border-ink-100">
              <h3 id="product-modal-title" class="font-display font-black text-xl text-ink-900" x-text="editingProduct.id ? 'تعديل منتج' : 'إضافة منتج جديد'"></h3>
              <button type="button" {...{ '@click': 'modalOpen = false' }} class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-ink-100 text-ink-500" aria-label="إغلاق">
                <i data-lucide="x" class="w-5 h-5" aria-hidden="true"></i>
              </button>
            </div>
            <form {...{ '@submit.prevent': 'saveProduct()' }} class="flex-1 overflow-y-auto p-6 space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="form-label" for="prod-name">اسم المنتج <span class="text-red-500">*</span></label>
                  <input id="prod-name" type="text" x-model="editingProduct.name" required minlength="3" maxlength="200" class="form-input" />
                </div>
                <div>
                  <label class="form-label" for="prod-cat">التصنيف <span class="text-red-500">*</span></label>
                  <select id="prod-cat" x-model="editingProduct.category" required class="form-input">
                    <option value="">اختر</option>
                    <template x-for="cat in categoriesData" {...{ ':key': 'cat.id' }}>
                      <option {...{ ':value': 'cat.id' }} x-text="cat.name"></option>
                    </template>
                  </select>
                </div>
                <div>
                  <label class="form-label" for="prod-img">رابط الصورة (https)</label>
                  <input id="prod-img" type="url" x-model="editingProduct.image" placeholder="https://..." class="form-input" />
                </div>
                <div>
                  <label class="form-label" for="prod-price">السعر (ر.س) <span class="text-red-500">*</span></label>
                  <input id="prod-price" type="number" {...{ 'x-model.number': 'editingProduct.price' }} required min="0" step="1" class="form-input" />
                </div>
                <div>
                  <label class="form-label" for="prod-old">السعر القديم</label>
                  <input id="prod-old" type="number" {...{ 'x-model.number': 'editingProduct.oldPrice' }} min="0" step="1" class="form-input" />
                  <span class="text-xs text-ink-500 mt-1 block">يجب أن يكون أكبر من السعر</span>
                </div>
                <div>
                  <label class="form-label" for="prod-stock">المخزون</label>
                  <input id="prod-stock" type="number" {...{ 'x-model.number': 'editingProduct.stock' }} min="0" class="form-input" />
                </div>
                <div>
                  <label class="form-label" for="prod-rating">التقييم (0-5)</label>
                  <input id="prod-rating" type="number" {...{ 'x-model.number': 'editingProduct.rating' }} min="0" max="5" step="0.1" class="form-input" />
                </div>
                <div class="sm:col-span-2">
                  <label class="form-label" for="prod-desc">الوصف</label>
                  <textarea id="prod-desc" x-model="editingProduct.description" rows="3" maxlength="2000" class="form-input" style="height: auto; padding: 12px 14px;"></textarea>
                </div>
              </div>
            </form>
            <div class="p-6 border-t border-ink-100 flex items-center gap-3 justify-end">
              <button type="button" {...{ '@click': 'modalOpen = false' }} class="h-11 px-5 rounded-xl border border-ink-200 hover:bg-ink-50 text-ink-700 font-semibold transition-colors">إلغاء</button>
              <button type="button" {...{ '@click': 'saveProduct()', ':disabled': 'saving' }} class="h-11 px-6 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                <span x-show="!saving" x-text="editingProduct.id ? 'حفظ التغييرات' : 'إضافة المنتج'"></span>
                <span x-show="saving" {...{ 'x-cloak': '' }}>جاري الحفظ...</span>
              </button>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('alpine:init', () => {
            Alpine.data('adminPanel', () => ({
              tab: 'products',
              productsData: [],
              ordersData: [],
              recentOrders: [],
              topSelling: [],
              lowStock: [],
              stats: { totalProducts: 0, totalOrders: 0, totalRevenue: 0, completedOrders: 0, pendingOrders: 0, lowStock: 0, customers: 0, conversion: 0 },
              categoriesData: ${categoriesJson},
              statuses: ${statusesJson},
              productSearch: '',
              productCategoryFilter: '',
              orderSearch: '',
              orderStatusFilter: '',
              loading: false,
              saving: false,
              modalOpen: false,
              orderModalOpen: false,
              selectedOrder: null,
              editingProduct: this._blankProduct(),

              _blankProduct() {
                return { id: null, name: '', category: '', image: '', price: 0, oldPrice: null, stock: 100, rating: 5, description: '' };
              },

              async init() {
                await this.refreshAll();
              },

              async refreshAll() {
                this.loading = true;
                try {
                  await Promise.all([this.loadProducts(), this.loadOrders(), this.loadOverview()]);
                } finally {
                  this.loading = false;
                  setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
                }
              },

              async _api(method, url, body) {
                const opts = { method, headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' };
                if (body !== undefined) opts.body = JSON.stringify(body);
                const r = await fetch(url, opts);
                if (r.status === 401) {
                  window.location.href = '/admin/login?next=' + encodeURIComponent('/admin');
                  throw new Error('unauthorized');
                }
                let data = null;
                try { data = await r.json(); } catch(e) { data = null; }
                return { ok: r.ok && data && data.ok, status: r.status, data };
              },

              async loadProducts() {
                const r = await this._api('GET', '/api/admin/products');
                if (r.ok) this.productsData = r.data.items || [];
              },
              async loadOrders() {
                const r = await this._api('GET', '/api/admin/orders');
                if (r.ok) this.ordersData = r.data.items || [];
              },
              async loadOverview() {
                const r = await this._api('GET', '/api/admin/overview');
                if (r.ok) {
                  this.stats = r.data.stats || this.stats;
                  this.recentOrders = r.data.recentOrders || [];
                  this.topSelling = r.data.topSelling || [];
                  this.lowStock = r.data.lowStock || [];
                }
              },

              get filteredProducts() {
                const q = (this.productSearch || '').toLowerCase().trim();
                return this.productsData.filter(p => {
                  if (this.productCategoryFilter && p.category !== this.productCategoryFilter) return false;
                  if (q) {
                    return (p.name || '').toLowerCase().includes(q)
                      || (p.categoryAr || '').toLowerCase().includes(q)
                      || String(p.id).includes(q);
                  }
                  return true;
                });
              },

              get filteredOrders() {
                const q = (this.orderSearch || '').toLowerCase().trim();
                return this.ordersData.filter(o => {
                  if (this.orderStatusFilter && o.status !== this.orderStatusFilter) return false;
                  if (q) {
                    const cust = (o.customer && o.customer.fullName || '').toLowerCase();
                    return o.id.toLowerCase().includes(q) || cust.includes(q);
                  }
                  return true;
                });
              },

              getStatusClass(status) {
                const map = {
                  pending: 'bg-amber-100 text-amber-700',
                  processing: 'bg-blue-100 text-blue-700',
                  shipped: 'bg-indigo-100 text-indigo-700',
                  completed: 'bg-emerald-100 text-emerald-700',
                  cancelled: 'bg-red-100 text-red-700'
                };
                return map[status] || 'bg-ink-100 text-ink-700';
              },

              paymentLabel(p) {
                return p === 'card' ? 'بطاقة ائتمانية' : p === 'apple' ? 'Apple Pay' : p === 'cod' ? 'الدفع عند الاستلام' : '—';
              },

              formatDate(d) {
                try { return new Date(d).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }); }
                catch(e) { return d; }
              },

              openProductModal(product = null) {
                if (product) {
                  this.editingProduct = JSON.parse(JSON.stringify(product));
                } else {
                  this.editingProduct = {
                    id: null, name: '', category: '',
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
                    price: 0, oldPrice: null, stock: 100, rating: 5, description: ''
                  };
                }
                this.modalOpen = true;
                setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
              },

              async saveProduct() {
                if (this.saving) return;
                if (!this.editingProduct.name || this.editingProduct.name.trim().length < 3) {
                  showToast('اسم المنتج مطلوب (3 أحرف على الأقل)', 'error');
                  return;
                }
                if (!this.editingProduct.category) {
                  showToast('الرجاء اختيار التصنيف', 'error');
                  return;
                }
                if (!Number.isFinite(Number(this.editingProduct.price)) || Number(this.editingProduct.price) < 0) {
                  showToast('السعر غير صالح', 'error');
                  return;
                }
                if (this.editingProduct.oldPrice && Number(this.editingProduct.oldPrice) <= Number(this.editingProduct.price)) {
                  showToast('السعر القديم يجب أن يكون أكبر من السعر الحالي', 'error');
                  return;
                }
                if (this.editingProduct.image && !/^https?:\\/\\//.test(this.editingProduct.image)) {
                  showToast('رابط الصورة يجب أن يبدأ بـ http(s)', 'error');
                  return;
                }
                this.saving = true;
                const payload = {
                  name: this.editingProduct.name.trim(),
                  nameEn: this.editingProduct.name.trim(),
                  category: this.editingProduct.category,
                  image: this.editingProduct.image,
                  price: Number(this.editingProduct.price) || 0,
                  oldPrice: this.editingProduct.oldPrice ? Number(this.editingProduct.oldPrice) : undefined,
                  stock: Number(this.editingProduct.stock) || 0,
                  rating: Number(this.editingProduct.rating) || 0,
                  description: this.editingProduct.description || ''
                };
                try {
                  let res;
                  if (this.editingProduct.id) {
                    res = await this._api('PUT', '/api/admin/products/' + this.editingProduct.id, payload);
                  } else {
                    res = await this._api('POST', '/api/admin/products', payload);
                  }
                  if (!res.ok) {
                    const map = { invalid_fields: 'بعض الحقول غير صالحة' };
                    showToast(map[res.data && res.data.error] || 'فشل حفظ المنتج', 'error');
                    return;
                  }
                  showToast(this.editingProduct.id ? 'تم تحديث المنتج' : 'تم إضافة المنتج', 'success');
                  this.modalOpen = false;
                  await this.refreshAll();
                } catch (e) {
                  if (e && e.message !== 'unauthorized') showToast('تعذّر الاتصال بالخادم', 'error');
                } finally {
                  this.saving = false;
                }
              },

              deleteProduct(id) {
                const product = this.productsData.find(p => p.id === id);
                const name = product ? product.name : 'هذا المنتج';
                openConfirmDialog({
                  title: 'حذف المنتج',
                  message: 'سيتم حذف "' + name + '" نهائياً من المتجر. لا يمكن التراجع عن هذا الإجراء.',
                  confirmText: 'نعم، احذف المنتج',
                  cancelText: 'إلغاء',
                  destructive: true,
                  onConfirm: async () => {
                    try {
                      const res = await this._api('DELETE', '/api/admin/products/' + id);
                      if (!res.ok) { showToast('فشل حذف المنتج', 'error'); return; }
                      showToast('تم حذف المنتج', 'info');
                      await this.refreshAll();
                    } catch (e) {
                      if (e && e.message !== 'unauthorized') showToast('تعذّر الاتصال بالخادم', 'error');
                    }
                  }
                });
              },

              async updateOrderStatus(id, status, prevStatus) {
                if (!status || status === prevStatus) return;
                try {
                  const res = await this._api('PUT', '/api/admin/orders/' + id + '/status', { status });
                  if (!res.ok) {
                    const errMap = {
                      invalid_transition: 'لا يمكن الانتقال إلى هذه الحالة',
                      not_found: 'الطلب غير موجود'
                    };
                    showToast(errMap[res.data && res.data.error] || 'فشل تحديث الحالة', 'error');
                    // revert local select
                    await this.loadOrders();
                    return;
                  }
                  showToast('تم تحديث حالة الطلب', 'success');
                  await Promise.all([this.loadOrders(), this.loadOverview()]);
                } catch (e) {
                  if (e && e.message !== 'unauthorized') showToast('تعذّر الاتصال بالخادم', 'error');
                }
              },

              deleteOrder(id) {
                openConfirmDialog({
                  title: 'حذف الطلب',
                  message: 'سيتم حذف الطلب ' + id + ' من السجلات. هذا الإجراء غير قابل للتراجع.',
                  confirmText: 'نعم، احذف الطلب',
                  cancelText: 'إلغاء',
                  destructive: true,
                  onConfirm: async () => {
                    try {
                      const res = await this._api('DELETE', '/api/admin/orders/' + id);
                      if (!res.ok) { showToast('فشل حذف الطلب', 'error'); return; }
                      showToast('تم حذف الطلب', 'info');
                      await Promise.all([this.loadOrders(), this.loadOverview()]);
                    } catch (e) {
                      if (e && e.message !== 'unauthorized') showToast('تعذّر الاتصال بالخادم', 'error');
                    }
                  }
                });
              },

              async viewOrder(o) {
                // Fetch full order in case the recent-list trimmed any fields
                try {
                  const res = await this._api('GET', '/api/admin/orders/' + encodeURIComponent(o.id));
                  this.selectedOrder = (res.ok && res.data.order) ? res.data.order : o;
                } catch (e) {
                  this.selectedOrder = o;
                }
                this.orderModalOpen = true;
                setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
              },

              closeOrderModal() {
                this.orderModalOpen = false;
                this.selectedOrder = null;
              }
            }))
          });
        `}}></script>
        <style dangerouslySetInnerHTML={{ __html: `[x-cloak]{display:none!important}` }}></style>
      </section>
    </Layout>
  )
}
