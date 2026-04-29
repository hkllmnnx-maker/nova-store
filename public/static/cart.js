/* ============================================================
   متجر نوڤا - نظام السلة والمفضلة والكوبونات والطلبات
   ============================================================ */

const CART_KEY = 'nova_cart_v2';
const WISHLIST_KEY = 'nova_wishlist_v1';
const COUPON_KEY = 'nova_coupon_v1';
const ORDERS_KEY = 'nova_orders_v1';

const SHIPPING_FEE = 25;
const FREE_SHIP_THRESHOLD = 500;

/* =============== Utilities =============== */
function safeParse(json, def) {
  try {
    return json ? JSON.parse(json) : def;
  } catch {
    return def;
  }
}

/* =============== Cart =============== */
const Cart = {
  getItems() {
    return safeParse(localStorage.getItem(CART_KEY), []);
  },

  saveItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items } }));
  },

  add(product, qty = 1) {
    if (!product || !product.id) return;
    const items = this.getItems();
    const existing = items.find(i => i.id === product.id);
    const stock = Math.max(0, Number(product.stock) || 99);

    if (existing) {
      existing.quantity = Math.min(existing.quantity + qty, stock);
    } else {
      items.push({
        id: Number(product.id),
        name: String(product.name || '').slice(0, 200),
        price: Number(product.price) || 0,
        oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
        image: String(product.image || ''),
        category: String(product.categoryAr || product.category || ''),
        stock,
        quantity: Math.min(qty, stock)
      });
    }
    this.saveItems(items);
    if (window.showToast) {
      showToast(`تمت إضافة "${product.name}" إلى السلة`, 'success');
    }
  },

  updateQty(id, qty) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (qty <= 0) { this.remove(id, true); return; }
    item.quantity = Math.min(qty, item.stock || 99);
    this.saveItems(items);
  },

  remove(id, silent = false) {
    const items = this.getItems().filter(i => i.id !== id);
    this.saveItems(items);
    if (!silent && window.showToast) showToast('تم حذف المنتج من السلة', 'info');
  },

  clear() {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(COUPON_KEY);
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items: [] } }));
  },

  count() {
    return this.getItems().reduce((s, i) => s + i.quantity, 0);
  },

  subtotal() {
    return this.getItems().reduce((s, i) => s + i.price * i.quantity, 0);
  },

  // total saved from oldPrice (item-level)
  savings() {
    return this.getItems().reduce((s, i) => {
      if (i.oldPrice && i.oldPrice > i.price) return s + (i.oldPrice - i.price) * i.quantity;
      return s;
    }, 0);
  },

  shipping() {
    const sub = this.subtotal();
    const coupon = Coupon.get();
    if (sub === 0) return 0;
    if (coupon && coupon.freeShipping) return 0;
    if (sub >= FREE_SHIP_THRESHOLD) return 0;
    return SHIPPING_FEE;
  },

  couponDiscount() {
    const coupon = Coupon.get();
    if (!coupon) return 0;
    return Number(coupon.discount) || 0;
  },

  total() {
    const sub = this.subtotal();
    const couponDisc = this.couponDiscount();
    const ship = this.shipping();
    return Math.max(0, sub - couponDisc + ship);
  },

  updateBadge() {
    const badges = document.querySelectorAll('[data-cart-badge]');
    const count = this.count();
    badges.forEach(badge => {
      if (count > 0) {
        badge.textContent = count > 99 ? '99+' : String(count);
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    });
  }
};

/* =============== Wishlist =============== */
const Wishlist = {
  getIds() {
    return safeParse(localStorage.getItem(WISHLIST_KEY), []);
  },
  getItems() {
    return safeParse(localStorage.getItem(WISHLIST_KEY + '_full'), []);
  },
  has(id) {
    return this.getIds().includes(Number(id));
  },
  toggle(product) {
    if (!product || !product.id) return false;
    const id = Number(product.id);
    const ids = this.getIds();
    const items = this.getItems();
    const idx = ids.indexOf(id);
    if (idx === -1) {
      ids.push(id);
      items.push({
        id, name: String(product.name || '').slice(0, 200),
        price: Number(product.price) || 0,
        oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
        image: String(product.image || ''),
        category: String(product.categoryAr || product.category || ''),
        stock: Math.max(0, Number(product.stock) || 99)
      });
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
      localStorage.setItem(WISHLIST_KEY + '_full', JSON.stringify(items));
      this.updateBadge();
      document.dispatchEvent(new CustomEvent('wishlist:updated'));
      if (window.showToast) showToast(`تمت إضافة "${product.name}" إلى المفضلة`, 'success');
      return true;
    } else {
      ids.splice(idx, 1);
      const fIdx = items.findIndex(i => i.id === id);
      if (fIdx !== -1) items.splice(fIdx, 1);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
      localStorage.setItem(WISHLIST_KEY + '_full', JSON.stringify(items));
      this.updateBadge();
      document.dispatchEvent(new CustomEvent('wishlist:updated'));
      if (window.showToast) showToast('تم حذف المنتج من المفضلة', 'info');
      return false;
    }
  },
  remove(id) {
    const ids = this.getIds().filter(i => i !== Number(id));
    const items = this.getItems().filter(i => i.id !== Number(id));
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    localStorage.setItem(WISHLIST_KEY + '_full', JSON.stringify(items));
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('wishlist:updated'));
  },
  count() { return this.getIds().length; },
  // alias for wishlist page
  read() { return this.getItems(); },
  clear() {
    localStorage.removeItem(WISHLIST_KEY);
    localStorage.removeItem(WISHLIST_KEY + '_full');
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('wishlist:updated'));
  },
  updateBadge() {
    const badges = document.querySelectorAll('[data-wishlist-badge]');
    const count = this.count();
    badges.forEach(b => {
      if (count > 0) { b.textContent = count > 99 ? '99+' : String(count); b.classList.remove('hidden'); b.classList.add('flex'); }
      else { b.classList.add('hidden'); b.classList.remove('flex'); }
    });
  }
};

/* =============== Coupons =============== */
const Coupon = {
  get() {
    return safeParse(localStorage.getItem(COUPON_KEY), null);
  },
  set(coupon) {
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
    document.dispatchEvent(new CustomEvent('cart:updated'));
  },
  clear() {
    localStorage.removeItem(COUPON_KEY);
    document.dispatchEvent(new CustomEvent('cart:updated'));
  },
  async apply(code) {
    const subtotal = Cart.subtotal();
    try {
      const r = await fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      const data = await r.json();
      if (!data.ok) {
        if (data.error === 'min_not_met') {
          if (window.showToast) showToast(data.message || 'لم يتم استيفاء شروط الكوبون', 'warning');
        } else {
          if (window.showToast) showToast('كود الخصم غير صالح', 'error');
        }
        return false;
      }
      this.set({
        code: data.coupon.code,
        type: data.coupon.type,
        description: data.coupon.description,
        discount: data.discount,
        freeShipping: data.freeShipping
      });
      if (window.showToast) showToast(`تم تطبيق ${data.coupon.code} ${data.coupon.description}`, 'success');
      return true;
    } catch (e) {
      if (window.showToast) showToast('تعذر الاتصال بالخادم', 'error');
      return false;
    }
  }
};

/* =============== Toast =============== */
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconMap = {
    success: 'check-circle-2',
    error: 'x-circle',
    info: 'info',
    warning: 'alert-triangle'
  };
  const colorMap = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    info: 'text-brand-500',
    warning: 'text-amber-500'
  };

  // safe DOM construction (no innerHTML with user data)
  const iconEl = document.createElement('i');
  iconEl.setAttribute('data-lucide', iconMap[type] || 'info');
  iconEl.className = `w-5 h-5 ${colorMap[type] || 'text-brand-500'} flex-shrink-0`;

  const textEl = document.createElement('div');
  textEl.className = 'flex-1 text-sm font-medium text-ink-800';
  textEl.textContent = String(message);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'text-ink-400 hover:text-ink-700 flex-shrink-0';
  closeBtn.setAttribute('aria-label', 'إغلاق');
  closeBtn.innerHTML = '<i data-lucide="x" class="w-4 h-4"></i>';
  closeBtn.onclick = () => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 250);
  };

  toast.append(iconEl, textEl, closeBtn);
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

/* =============== Orders =============== */
const Orders = {
  getAll() {
    return safeParse(localStorage.getItem(ORDERS_KEY), []);
  },
  save(order) {
    const arr = this.getAll();
    arr.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(arr.slice(0, 50)));
  },
  getById(id) {
    if (!id) return null;
    return this.getAll().find(o => o.id === id) || null;
  },
  generateId() {
    const d = new Date();
    return `NV-${String(d.getFullYear()).slice(2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.floor(1000 + Math.random()*9000)}`;
  }
};

/* =============== Initialization =============== */
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  Wishlist.updateBadge();
  if (window.lucide) lucide.createIcons();
});

window.Cart = Cart;
window.Wishlist = Wishlist;
window.Coupon = Coupon;
window.Orders = Orders;
window.showToast = showToast;
