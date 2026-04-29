/* ============================
   نظام السلة - Cart Management
   ============================ */

const CART_KEY = 'nova_cart_v1';

const Cart = {
  // قراءة السلة من localStorage
  getItems() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // حفظ السلة
  saveItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items } }));
  },

  // إضافة منتج
  add(product, qty = 1) {
    const items = this.getItems();
    const existing = items.find(i => i.id === product.id);

    if (existing) {
      existing.quantity = Math.min(existing.quantity + qty, product.stock || 99);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.image,
        category: product.categoryAr || product.category,
        stock: product.stock || 99,
        quantity: qty
      });
    }
    this.saveItems(items);
    showToast(`تمت إضافة "${product.name}" إلى السلة`, 'success');
  },

  // تحديث كمية
  updateQty(id, qty) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (qty <= 0) {
      this.remove(id);
      return;
    }
    item.quantity = Math.min(qty, item.stock || 99);
    this.saveItems(items);
  },

  // حذف منتج
  remove(id) {
    const items = this.getItems().filter(i => i.id !== id);
    this.saveItems(items);
    showToast('تم حذف المنتج من السلة', 'info');
  },

  // مسح السلة
  clear() {
    localStorage.removeItem(CART_KEY);
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items: [] } }));
  },

  // إجمالي عدد القطع
  count() {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0);
  },

  // المجموع الفرعي
  subtotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  // الخصم (التوفير من الأسعار القديمة)
  savings() {
    return this.getItems().reduce((sum, i) => {
      if (i.oldPrice) return sum + (i.oldPrice - i.price) * i.quantity;
      return sum;
    }, 0);
  },

  // الشحن
  shipping() {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    if (sub >= 500) return 0;
    return 25;
  },

  // الإجمالي النهائي
  total() {
    return this.subtotal() + this.shipping();
  },

  // تحديث شارة السلة
  updateBadge() {
    const badge = document.getElementById('cart-badge');
    const count = this.count();
    if (!badge) return;
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  }
};

/* ============================
   نظام الإشعارات Toast
   ============================ */
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: '<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-500"></i>',
    error: '<i data-lucide="x-circle" class="w-5 h-5 text-red-500"></i>',
    info: '<i data-lucide="info" class="w-5 h-5 text-brand-500"></i>',
    warning: '<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-500"></i>'
  };

  toast.innerHTML = `
    ${icons[type] || icons.info}
    <div class="flex-1 text-sm font-medium text-ink-800">${message}</div>
    <button class="text-ink-400 hover:text-ink-700" onclick="this.parentElement.classList.add('removing'); setTimeout(()=>this.parentElement.remove(),250)">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

/* ============================
   نظام الطلبات Orders
   ============================ */
const Orders = {
  KEY: 'nova_orders_v1',

  getAll() {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  },

  save(order) {
    const orders = this.getAll();
    orders.unshift(order);
    localStorage.setItem(this.KEY, JSON.stringify(orders));
  },

  getById(id) {
    return this.getAll().find(o => o.id === id);
  },

  generateId() {
    const date = new Date();
    const stamp = date.getFullYear().toString().slice(2) +
                  String(date.getMonth() + 1).padStart(2, '0') +
                  String(date.getDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `NV-${stamp}-${rand}`;
  }
};

// تهيئة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  if (window.lucide) lucide.createIcons();
});

// Make Cart and helpers global
window.Cart = Cart;
window.Orders = Orders;
window.showToast = showToast;
