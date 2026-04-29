/* ============================
   التطبيق العام - App
   ============================ */

let _iconsRefreshing = false;
let _iconsScheduled = false;

// إعادة إنشاء أيقونات Lucide بعد تحديث DOM (آمن من الحلقة اللانهائية)
function refreshIcons() {
  if (!window.lucide) return;
  if (_iconsRefreshing) return;
  _iconsRefreshing = true;
  try { lucide.createIcons(); } catch(e) {}
  // give the DOM a moment before allowing next refresh
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

// Helper: تنسيق السعر
function formatPrice(price) {
  return new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
}

// Helper: نجوم التقييم
function renderStars(rating, size = 14) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = '<div class="stars" aria-label="تقييم ' + rating + '">';
  for (let i = 0; i < 5; i++) {
    let cls = 'text-ink-300';
    if (i < full) cls = 'text-amber-400 fill-amber-400';
    else if (i === full && half) cls = 'text-amber-400';
    html += `<i data-lucide="star" class="${cls}" style="width:${size}px;height:${size}px"></i>`;
  }
  html += '</div>';
  return html;
}

// Add to cart helper from product card
function addToCartFromCard(productJson) {
  try {
    const product = typeof productJson === 'string' ? JSON.parse(productJson) : productJson;
    Cart.add(product, 1);
  } catch(e) {
    console.error('Failed to add to cart', e);
    showToast('حدث خطأ، يرجى المحاولة مرة أخرى', 'error');
  }
}
window.addToCartFromCard = addToCartFromCard;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  refreshIcons();
});

// Observe DOM changes — only refresh icons when *new* nodes are added that contain
// data-lucide attribute. Skip mutations caused by lucide itself (it replaces <i> with <svg>).
const observer = new MutationObserver((mutations) => {
  let hasNewIconElement = false;
  for (const m of mutations) {
    if (m.type !== 'childList') continue;
    for (const node of m.addedNodes) {
      if (node.nodeType !== 1) continue;
      // Skip svg replacements done by lucide
      if (node.tagName === 'svg' || node.tagName === 'SVG') continue;
      if (node.hasAttribute && node.hasAttribute('data-lucide')) {
        hasNewIconElement = true; break;
      }
      if (node.querySelector && node.querySelector('[data-lucide]')) {
        hasNewIconElement = true; break;
      }
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
window.renderStars = renderStars;
