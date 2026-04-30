/* ============================================================
   متجر نوڤا - تطبيق عام: أيقونات، helpers، quick add، search
   ============================================================ */

let _iconsRefreshing = false;
let _iconsScheduled = false;

function refreshIcons() {
  if (!window.lucide) return;
  if (_iconsRefreshing) return;
  _iconsRefreshing = true;
  try { lucide.createIcons(); } catch(e) {}
  setTimeout(() => { _iconsRefreshing = false; }, 50);
}

function scheduleIconsRefresh() {
  if (_iconsScheduled) return;
  _iconsScheduled = true;
  requestAnimationFrame(() => {
    _iconsScheduled = false;
    refreshIcons();
  });
}

/* =============== Helpers =============== */
function formatPrice(price) {
  return new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 0 }).format(Math.round(Number(price) || 0));
}

function safeProductFromButton(btn) {
  // Read product data from data-* attributes (safe, no eval)
  return {
    id: Number(btn.dataset.productId),
    name: btn.dataset.productName || '',
    price: Number(btn.dataset.productPrice) || 0,
    oldPrice: btn.dataset.productOldPrice ? Number(btn.dataset.productOldPrice) : undefined,
    image: btn.dataset.productImage || '',
    categoryAr: btn.dataset.productCategory || '',
    stock: Number(btn.dataset.productStock) || 99
  };
}

/* =============== Sanitize JSON product payload from inline onclick =============== */
function _parseProductJSON(payload) {
  try {
    // payload arrives already-decoded by the browser (HTML entities → real chars)
    const raw = typeof payload === 'string' ? payload : '';
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== 'object') return null;
    return {
      id: Number(obj.id) || 0,
      name: String(obj.name || '').slice(0, 200),
      price: Number(obj.price) || 0,
      oldPrice: obj.oldPrice ? Number(obj.oldPrice) : undefined,
      image: String(obj.image || '').slice(0, 500),
      categoryAr: String(obj.categoryAr || '').slice(0, 100),
      stock: Number(obj.stock) || 99
    };
  } catch {
    return null;
  }
}

/* =============== Inline-onclick helpers (used by product-card) =============== */
function addToCartFromCard(payload) {
  const p = _parseProductJSON(payload);
  if (!p || !p.id) return;
  if (window.Cart && typeof window.Cart.add === 'function') {
    window.Cart.add(p, 1);
  }
}

function toggleWishlistFromCard(payload) {
  const p = _parseProductJSON(payload);
  if (!p || !p.id) return;
  if (window.Wishlist && typeof window.Wishlist.toggle === 'function') {
    const added = window.Wishlist.toggle(p);
    // Update only the buttons that match this product id
    document.querySelectorAll(`.js-wishlist-btn[data-product-id="${p.id}"]`).forEach((btn) => {
      btn.classList.toggle('active', !!added);
      btn.setAttribute('aria-pressed', added ? 'true' : 'false');
      const heart = btn.querySelector('[data-lucide="heart"]');
      if (heart) heart.setAttribute('fill', added ? 'currentColor' : 'none');
    });
  }
}

window.addToCartFromCard = addToCartFromCard;
window.toggleWishlistFromCard = toggleWishlistFromCard;

/* =============== Global delegated events =============== */
document.addEventListener('click', (e) => {
  // Add to cart from any [data-add-to-cart] button
  const cartBtn = e.target.closest('[data-add-to-cart]');
  if (cartBtn) {
    e.preventDefault();
    const product = safeProductFromButton(cartBtn);
    if (product.id) Cart.add(product, 1);
    return;
  }

  // Toggle wishlist from any [data-wishlist-toggle] button
  const wishBtn = e.target.closest('[data-wishlist-toggle]');
  if (wishBtn) {
    e.preventDefault();
    const product = safeProductFromButton(wishBtn);
    if (product.id) {
      const added = Wishlist.toggle(product);
      wishBtn.classList.toggle('active', added);
      const heart = wishBtn.querySelector('[data-lucide="heart"]');
      if (heart) heart.setAttribute('fill', added ? 'currentColor' : 'none');
    }
  }
});

/* =============== Mobile Drawer =============== */
function toggleDrawer(open) {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;
  const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
  drawer.classList.toggle('open', isOpen);
  backdrop.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  if (isOpen) {
    // focus the close button for keyboard users
    const closeBtn = drawer.querySelector('[aria-label="إغلاق"]');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  }
}
window.toggleDrawer = toggleDrawer;

/* Close drawer / search dropdowns on Escape */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const drawer = document.getElementById('mobile-drawer');
  if (drawer && drawer.classList.contains('open')) {
    toggleDrawer(false);
    return;
  }
  document.querySelectorAll('[data-search-dropdown].open').forEach((d) => d.classList.remove('open'));
});

/* =============== Search Suggestions (live) =============== */
let _searchTimer = null;
async function fetchSearchSuggestions(query) {
  if (!query || query.length < 2) return [];
  try {
    const r = await fetch(`/api/products?q=${encodeURIComponent(query)}&limit=6`);
    const data = await r.json();
    return data.ok ? data.items : [];
  } catch {
    return [];
  }
}

function setupSearchSuggestions() {
  const inputs = document.querySelectorAll('[data-search-input]');
  inputs.forEach(input => {
    const dropdown = input.closest('form')?.querySelector('[data-search-dropdown]');
    if (!dropdown) return;
    input.addEventListener('input', () => {
      clearTimeout(_searchTimer);
      const q = input.value.trim();
      if (q.length < 2) { dropdown.classList.remove('open'); return; }
      _searchTimer = setTimeout(async () => {
        const items = await fetchSearchSuggestions(q);
        renderSearchDropdown(dropdown, items, q);
      }, 200);
    });
    input.addEventListener('focus', () => {
      if (input.value.trim().length >= 2) dropdown.classList.add('open');
    });
    document.addEventListener('click', (e) => {
      if (!input.closest('form').contains(e.target)) dropdown.classList.remove('open');
    });
  });
}

function renderSearchDropdown(dropdown, items, q) {
  dropdown.innerHTML = '';
  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'p-6 text-center text-sm text-ink-500';
    empty.textContent = `لا توجد نتائج لـ "${q}"`;
    dropdown.appendChild(empty);
    dropdown.classList.add('open');
    return;
  }
  items.forEach(p => {
    const a = document.createElement('a');
    a.href = `/product/${p.id}`;
    a.className = 'search-result';
    const img = document.createElement('img');
    img.src = p.image; img.alt = p.name; img.loading = 'lazy';
    const info = document.createElement('div');
    info.className = 'flex-1 min-w-0';
    const name = document.createElement('div');
    name.className = 'font-semibold text-sm text-ink-900 line-clamp-1';
    name.textContent = p.name;
    const cat = document.createElement('div');
    cat.className = 'text-xs text-ink-500 mt-0.5';
    cat.textContent = p.categoryAr;
    info.append(name, cat);
    const price = document.createElement('div');
    price.className = 'font-bold text-sm text-brand-600 flex-shrink-0';
    price.textContent = formatPrice(p.price) + ' ر.س';
    a.append(img, info, price);
    dropdown.appendChild(a);
  });
  // "view all" link
  const viewAll = document.createElement('a');
  viewAll.href = `/products?q=${encodeURIComponent(q)}`;
  viewAll.className = 'block text-center text-xs font-bold text-brand-600 hover:text-brand-700 py-2 mt-1 border-t border-ink-100';
  viewAll.textContent = `عرض كل النتائج لـ "${q}"`;
  dropdown.appendChild(viewAll);
  dropdown.classList.add('open');
}

/* =============== Mark wishlist buttons on page load =============== */
function markWishlistButtons() {
  if (!window.Wishlist) return;
  const selector = '[data-wishlist-toggle], .js-wishlist-btn';
  document.querySelectorAll(selector).forEach(btn => {
    const id = Number(btn.dataset.productId);
    if (!id) return;
    const active = window.Wishlist.has(id);
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    const heart = btn.querySelector('[data-lucide="heart"]');
    if (heart) heart.setAttribute('fill', active ? 'currentColor' : 'none');
  });
}

/* =============== DOM Init =============== */
document.addEventListener('DOMContentLoaded', () => {
  refreshIcons();
  setupSearchSuggestions();
  markWishlistButtons();
});

document.addEventListener('wishlist:updated', () => {
  setTimeout(markWishlistButtons, 50);
});

/* =============== Mutation Observer for icons =============== */
const observer = new MutationObserver((mutations) => {
  let hasNewIconElement = false;
  for (const m of mutations) {
    if (m.type !== 'childList') continue;
    for (const node of m.addedNodes) {
      if (node.nodeType !== 1) continue;
      if (node.tagName === 'svg' || node.tagName === 'SVG') continue;
      if (node.hasAttribute && node.hasAttribute('data-lucide')) { hasNewIconElement = true; break; }
      if (node.querySelector && node.querySelector('[data-lucide]')) { hasNewIconElement = true; break; }
    }
    if (hasNewIconElement) break;
  }
  if (hasNewIconElement) scheduleIconsRefresh();
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

window.refreshIcons = refreshIcons;
window.formatPrice = formatPrice;

/* =============== Global Confirm Dialog (replaces window.confirm) =============== */
let _confirmDialogState = {
  onConfirm: null,
  onCancel: null,
  previouslyFocused: null,
  keyHandler: null
};

function _closeConfirmDialog(triggerCancel) {
  const backdrop = document.getElementById('confirm-dialog-backdrop');
  const dialog = document.getElementById('confirm-dialog');
  if (!backdrop || !dialog) return;

  dialog.classList.remove('scale-100', 'opacity-100');
  dialog.classList.add('scale-95', 'opacity-0');

  setTimeout(() => {
    backdrop.classList.add('hidden');
    backdrop.classList.remove('flex');
    document.body.style.overflow = '';
  }, 180);

  if (_confirmDialogState.keyHandler) {
    document.removeEventListener('keydown', _confirmDialogState.keyHandler);
    _confirmDialogState.keyHandler = null;
  }
  if (_confirmDialogState.previouslyFocused && typeof _confirmDialogState.previouslyFocused.focus === 'function') {
    try { _confirmDialogState.previouslyFocused.focus(); } catch(e) {}
  }

  if (triggerCancel && typeof _confirmDialogState.onCancel === 'function') {
    try { _confirmDialogState.onCancel(); } catch (e) {}
  }
  _confirmDialogState.onConfirm = null;
  _confirmDialogState.onCancel = null;
}

function openConfirmDialog(opts) {
  const o = opts || {};
  const backdrop = document.getElementById('confirm-dialog-backdrop');
  const dialog = document.getElementById('confirm-dialog');
  const titleEl = document.getElementById('confirm-dialog-title');
  const msgEl = document.getElementById('confirm-dialog-message');
  const iconWrap = document.getElementById('confirm-dialog-icon');
  const cancelBtn = document.getElementById('confirm-dialog-cancel');
  const confirmBtn = document.getElementById('confirm-dialog-confirm');

  if (!backdrop || !dialog || !titleEl || !msgEl || !cancelBtn || !confirmBtn) {
    // Fallback in case the layout dialog is missing
    if (window.confirm(String(o.message || 'هل أنت متأكد؟'))) {
      if (typeof o.onConfirm === 'function') o.onConfirm();
    } else {
      if (typeof o.onCancel === 'function') o.onCancel();
    }
    return;
  }

  titleEl.textContent = String(o.title || 'تأكيد');
  msgEl.textContent = String(o.message || 'هل أنت متأكد؟');
  cancelBtn.textContent = String(o.cancelText || 'إلغاء');
  confirmBtn.textContent = String(o.confirmText || 'تأكيد');

  // Style the confirm button based on destructive flag
  confirmBtn.className = o.destructive
    ? 'h-10 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors'
    : 'h-10 px-5 rounded-xl bg-ink-900 hover:bg-ink-800 text-white font-bold text-sm transition-colors';

  if (iconWrap) {
    if (o.destructive) {
      iconWrap.className = 'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-red-50 text-red-600';
      iconWrap.innerHTML = '<i data-lucide="trash-2" class="w-6 h-6" aria-hidden="true"></i>';
    } else if (o.icon === 'info') {
      iconWrap.className = 'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-brand-50 text-brand-600';
      iconWrap.innerHTML = '<i data-lucide="info" class="w-6 h-6" aria-hidden="true"></i>';
    } else {
      iconWrap.className = 'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-amber-50 text-amber-600';
      iconWrap.innerHTML = '<i data-lucide="alert-triangle" class="w-6 h-6" aria-hidden="true"></i>';
    }
  }

  _confirmDialogState.onConfirm = typeof o.onConfirm === 'function' ? o.onConfirm : null;
  _confirmDialogState.onCancel = typeof o.onCancel === 'function' ? o.onCancel : null;
  _confirmDialogState.previouslyFocused = document.activeElement;

  backdrop.classList.remove('hidden');
  backdrop.classList.add('flex');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    dialog.classList.remove('scale-95', 'opacity-0');
    dialog.classList.add('scale-100', 'opacity-100');
    setTimeout(() => confirmBtn.focus(), 60);
  });

  refreshIcons();

  // Wire handlers (replace clones to clear previous listeners)
  const newCancel = cancelBtn.cloneNode(true);
  cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
  newCancel.addEventListener('click', () => _closeConfirmDialog(true));

  const newConfirm = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
  newConfirm.addEventListener('click', () => {
    const cb = _confirmDialogState.onConfirm;
    _confirmDialogState.onConfirm = null;
    _confirmDialogState.onCancel = null;
    _closeConfirmDialog(false);
    if (typeof cb === 'function') {
      try { cb(); } catch (e) { console.error(e); }
    }
  });

  // Backdrop click closes
  const backdropClickHandler = (e) => {
    if (e.target === backdrop) {
      backdrop.removeEventListener('click', backdropClickHandler);
      _closeConfirmDialog(true);
    }
  };
  backdrop.addEventListener('click', backdropClickHandler);

  // Escape key closes
  _confirmDialogState.keyHandler = (e) => {
    if (e.key === 'Escape') _closeConfirmDialog(true);
  };
  document.addEventListener('keydown', _confirmDialogState.keyHandler);
}

window.openConfirmDialog = openConfirmDialog;

// =====================================================
// Alpine component: Product Detail Page
// =====================================================
document.addEventListener('alpine:init', () => {
  if (typeof Alpine === 'undefined') return;
  Alpine.data('productPage', (product, images) => ({
    product: product,
    images: images || [product.image],
    activeImage: 0,
    qty: 1,
    maxStock: product.stock || 0,
    inWishlist: false,

    init() {
      // Sync wishlist state
      try {
        if (window.Wishlist && typeof window.Wishlist.has === 'function') {
          this.inWishlist = window.Wishlist.has(product.id);
        }
      } catch (e) {}
      document.addEventListener('wishlist:updated', () => {
        try { this.inWishlist = window.Wishlist.has(product.id); } catch (e) {}
      });
    },

    incQty() {
      if (this.qty < this.maxStock) this.qty++;
    },
    decQty() {
      if (this.qty > 1) this.qty--;
    },

    addToCart() {
      if (this.maxStock === 0) {
        if (typeof showToast === 'function') showToast('المنتج غير متوفر حالياً', 'warning');
        return;
      }
      const q = Math.max(1, Math.min(parseInt(this.qty, 10) || 1, this.maxStock));
      try {
        window.Cart.add(this.product, q);
      } catch (e) {
        if (typeof showToast === 'function') showToast('حدث خطأ، حاول مرة أخرى', 'error');
      }
    },

    buyNow() {
      this.addToCart();
      setTimeout(() => { window.location.href = '/cart'; }, 250);
    },

    toggleWishlist() {
      try {
        const isAdded = window.Wishlist.toggle(this.product);
        this.inWishlist = !!isAdded;
      } catch (e) {}
    }
  }));
});
