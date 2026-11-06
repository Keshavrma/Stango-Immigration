/**
 * STANGO CLOTHING - MEME HOODIE STORE ENGINE
 * 5 Exclusive Meme Graphic Hoodies @ ₹799 Each
 * Free Delivery All Over India on Orders Above ₹999
 */

const STANGO_PRODUCTS = [
  {
    id: 'hoodie-sussy-kal-ji',
    name: 'Sussy Kal Ji Meme Graphic Hoodie',
    color: 'Washed Black',
    category: 'black',
    categoryLabel: 'Black Edition',
    price: 799,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 184,
    badge: 'Best Seller',
    badgeClass: 'gold',
    image: 'resources/hoodies/hoodie-1-sussy-kal-ji.jpg',
    description: 'Heavyweight 380 GSM fleece hoodie featuring the iconic "Sussy Kal Ji 👅" meme print. Ultra-soft brushed interior with double-lined hood.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'hoodie-olive-flex',
    name: 'Desi Sigma Flex Graphic Hoodie',
    color: 'Military Olive Green',
    category: 'olive',
    categoryLabel: 'Olive Edition',
    price: 799,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 142,
    badge: 'Trending',
    badgeClass: 'green',
    image: 'resources/hoodies/hoodie-2-olive-flex.jpg',
    description: 'Earthy olive pullover hoodie with the viral desi flex meme graphic. Pre-shrunk breathable cotton with snug ribbed cuffs and hem.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'hoodie-maroon-shoe',
    name: 'Shoe On Head Meme Graphic Hoodie',
    color: 'Burgundy Maroon',
    category: 'maroon',
    categoryLabel: 'Maroon Edition',
    price: 799,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 97,
    badge: 'Viral Edition',
    badgeClass: 'gold',
    image: 'resources/hoodies/hoodie-3-maroon-shoe.jpg',
    description: 'Deep maroon hoodie with crisp digital print of the legendary shoe-on-head mood meme. High-density print that won\'t fade or peel.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'hoodie-blue-pose',
    name: 'Deep Thinker Meme Graphic Hoodie',
    color: 'Cobalt Royal Blue',
    category: 'blue',
    categoryLabel: 'Blue Edition',
    price: 799,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 115,
    badge: 'Top Pick',
    badgeClass: 'blue',
    image: 'resources/hoodies/hoodie-4-blue-pose.jpg',
    description: 'Striking royal blue fleece hoodie with signature hands-on-feet contemplative meme artwork. Spacious kangaroo pocket and matching drawstrings.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'hoodie-purple-kissie',
    name: 'Kissie Kardunga Meme Graphic Hoodie',
    color: 'Royal Purple',
    category: 'purple',
    categoryLabel: 'Purple Edition',
    price: 799,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 210,
    badge: 'Fan Favorite',
    badgeClass: 'gold',
    image: 'resources/hoodies/hoodie-5-purple-kissie.jpg',
    description: 'Vibrant royal purple street hoodie featuring the viral "kissie kardunga" artwork. Relaxed unisex fit engineered for maximum cozy comfort.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

// Free delivery threshold in India: ₹999
const FREE_DELIVERY_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 79;

class StangoCart {
  constructor() {
    this.items = this.loadCart();
    this.selectedSizes = {};
    this.activeCategory = 'all';
    this.sortBy = 'featured';
  }

  loadCart() {
    try {
      const stored = localStorage.getItem('stango_clothing_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('stango_clothing_cart', JSON.stringify(this.items));
    } catch (e) {
      console.error('Could not save cart:', e);
    }
    this.updateCartUI();
  }

  addItem(productId, size = null) {
    const product = STANGO_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const chosenSize = size || this.selectedSizes[productId] || product.sizes[1] || 'M';
    const existingIndex = this.items.findIndex(i => i.id === productId && i.size === chosenSize);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: product.color,
        size: chosenSize,
        quantity: 1
      });
    }

    this.saveCart();
    this.showToast(`Added "${product.name} (${chosenSize})" to your bag!`);
    this.openDrawer();
  }

  updateQuantity(productId, size, change) {
    const itemIndex = this.items.findIndex(i => i.id === productId && i.size === size);
    if (itemIndex === -1) return;

    this.items[itemIndex].quantity += change;
    if (this.items[itemIndex].quantity <= 0) {
      this.items.splice(itemIndex, 1);
    }

    this.saveCart();
  }

  removeItem(productId, size) {
    this.items = this.items.filter(i => !(i.id === productId && i.size === size));
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  showToast(message) {
    let toast = document.getElementById('shopToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'shopToast';
      toast.className = 'shop-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
      <button class="shop-toast-btn" onclick="stangoCart.openDrawer()">View Bag</button>
    `;

    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  openDrawer() {
    const backdrop = document.getElementById('cartBackdrop');
    const drawer = document.getElementById('cartDrawer');
    if (backdrop && drawer) {
      backdrop.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const backdrop = document.getElementById('cartBackdrop');
    const drawer = document.getElementById('cartDrawer');
    if (backdrop && drawer) {
      backdrop.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  updateCartUI() {
    const totalCount = this.getTotalCount();
    const subtotal = this.getSubtotal();

    // Update navbar badges
    document.querySelectorAll('.cart-count-pill, .cart-count-badge').forEach(el => {
      el.textContent = totalCount;
    });

    const cartBody = document.getElementById('cartBody');
    const cartFooter = document.getElementById('cartFooter');
    const shippingBarFill = document.getElementById('shippingBarFill');
    const shippingBarMsg = document.getElementById('shippingBarMsg');

    if (shippingBarFill && shippingBarMsg) {
      if (subtotal >= FREE_DELIVERY_THRESHOLD) {
        shippingBarFill.style.width = '100%';
        shippingBarMsg.innerHTML = '🎉 You unlocked <strong>FREE Delivery all over India!</strong>';
      } else {
        const percent = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
        const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
        shippingBarFill.style.width = `${percent}%`;
        shippingBarMsg.innerHTML = `Add <strong>₹${remaining}</strong> more for <strong>FREE Delivery all over India</strong>! 🚚`;
      }
    }

    if (cartBody) {
      if (this.items.length === 0) {
        cartBody.innerHTML = `
          <div class="cart-empty-state">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <h3 style="font-size:1.15rem; color:var(--text-primary); margin-bottom:0.35rem; font-family:var(--font-heading);">Your Bag is Empty</h3>
            <p style="font-size:0.88rem; max-width:260px; margin:0 auto 1.5rem; color:var(--text-muted);">Pick your favorite viral meme hoodie @ ₹799 each. Free delivery on ₹999+!</p>
            <button class="btn-submit-form" onclick="stangoCart.closeDrawer()" style="padding:0.6rem 1.25rem; font-size:0.88rem;">Shop Hoodies Now</button>
          </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
      } else {
        if (cartFooter) cartFooter.style.display = 'block';
        cartBody.innerHTML = this.items.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
            <div class="cart-item-info">
              <div style="display:flex; justify-content:space-between; gap:0.5rem;">
                <div>
                  <h4 class="cart-item-title">${item.name}</h4>
                  <span class="cart-item-size">Size: <strong>${item.size}</strong> • ${item.color || ''}</span>
                </div>
                <button class="cart-item-remove" onclick="stangoCart.removeItem('${item.id}', '${item.size}')" title="Remove item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div class="cart-item-bottom">
                <span class="cart-item-price">₹${item.price * item.quantity}</span>
                <div class="cart-qty-controls">
                  <button class="qty-btn" onclick="stangoCart.updateQuantity('${item.id}', '${item.size}', -1)">-</button>
                  <span class="qty-number">${item.quantity}</span>
                  <button class="qty-btn" onclick="stangoCart.updateQuantity('${item.id}', '${item.size}', 1)">+</button>
                </div>
              </div>
            </div>
          </div>
        `).join('');

        const subtotalEl = document.getElementById('cartSubtotal');
        const totalEl = document.getElementById('cartTotal');
        const shippingFeeEl = document.getElementById('cartShippingFee');

        if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
        const shippingFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
        if (shippingFeeEl) {
          shippingFeeEl.textContent = shippingFee === 0 ? 'FREE' : `₹${shippingFee}`;
          if (shippingFee === 0) shippingFeeEl.style.color = '#16a34a';
          else shippingFeeEl.style.color = 'var(--text-primary)';
        }
        if (totalEl) totalEl.textContent = `₹${subtotal + shippingFee}`;
      }
    }
  }

  renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let filtered = STANGO_PRODUCTS.filter(p => {
      return this.activeCategory === 'all' || p.category === this.activeCategory;
    });

    if (this.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    grid.innerHTML = filtered.map(p => {
      const selectedSize = this.selectedSizes[p.id] || p.sizes[1] || 'M';
      return `
        <article class="product-card" data-id="${p.id}">
          <div class="product-media">
            <span class="product-badge ${p.badgeClass}">${p.badge}</span>
            <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
          </div>
          <div class="product-content">
            <span class="product-category-label">${p.color}</span>
            <h3 class="product-title">${p.name}</h3>
            <p class="product-desc-snippet">${p.description}</p>
            
            <div class="product-rating">
              <span class="stars">★★★★★</span>
              <span>${p.rating} (${p.reviewsCount} reviews)</span>
            </div>

            <div class="product-price-row">
              <span class="product-price">₹${p.price}</span>
              <span class="product-original-price">₹${p.originalPrice}</span>
              <span class="product-discount-pill">47% OFF</span>
            </div>
            
            <div class="product-sizes">
              <span class="size-label">Select Size:</span>
              <div class="size-options">
                ${p.sizes.map(s => `
                  <button type="button" class="size-pill ${s === selectedSize ? 'active' : ''}" 
                    onclick="stangoCart.selectSize('${p.id}', '${s}')">
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>

            <button type="button" class="btn-add-cart" onclick="stangoCart.addItem('${p.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Bag • ₹${p.price}
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  selectSize(productId, size) {
    this.selectedSizes[productId] = size;
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (card) {
      card.querySelectorAll('.size-pill').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === size);
      });
    }
  }

  initEventListeners() {
    // Category tabs
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category');
        this.renderProducts();
      });
    });

    // Sort select
    const sortSelect = document.getElementById('shopSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderProducts();
      });
    }

    // Backdrop click & Escape key
    const backdrop = document.getElementById('cartBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeDrawer());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDrawer();
        this.closeCheckoutModal();
      }
    });

    // Checkout modal triggers
    const checkoutBtn = document.getElementById('btnProceedCheckout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.openCheckoutModal());
    }

    const checkoutForm = document.getElementById('checkoutDemoForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCheckoutSubmit(checkoutForm);
      });
    }
  }

  openCheckoutModal() {
    this.closeDrawer();
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      const checkoutTotal = document.getElementById('modalCheckoutTotal');
      const subtotal = this.getSubtotal();
      const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
      if (checkoutTotal) checkoutTotal.textContent = `₹${subtotal + shipping}`;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  handleCheckoutSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Placing Order...';

    setTimeout(() => {
      const name = form.querySelector('#orderName').value || 'Customer';
      const address = form.querySelector('#orderAddress').value || 'Address';
      const city = form.querySelector('#orderCity').value || 'City';
      const subtotal = this.getSubtotal();
      const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
      const finalAmount = subtotal + shipping;

      alert(`🎉 Thank you, ${name}!\n\nYour Stango Clothing order for ₹${finalAmount} has been placed successfully.\n\nShipping to: ${address}, ${city}\nFree Delivery All Over India (Estimated: 3-5 Business Days).`);
      this.clearCart();
      this.closeCheckoutModal();
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 900);
  }
}

const stangoCart = new StangoCart();

document.addEventListener('DOMContentLoaded', () => {
  stangoCart.updateCartUI();
  stangoCart.renderProducts();
  stangoCart.initEventListeners();
});
