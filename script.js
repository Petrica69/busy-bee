let cart = [];

// Generare optimizată pentru fundal (Ultra-fluid pe mobil)
function createNatureBackground() {
    const container = document.getElementById('nature-bg');
    if (!container) return;
    
    container.innerHTML = '';
    const symbols = ['🐝', '🍯', '✨', '🌿', '🌼'];
    
    // Pe mobil punem doar 6 elemente ca să nu streseze GPU-ul telefonului
    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? 6 : 18;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'floating-element';
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        const size = Math.random() * 0.9 + 0.8;
        el.style.fontSize = `${size}rem`;
        el.style.left = `${Math.random() * 92}%`;
        
        const duration = Math.random() * 12 + (isMobile ? 12 : 10);
        const delay = Math.random() * 8;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;

        container.appendChild(el);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createNatureBackground();
});

// Acordeon FAQ
function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) {
        element.classList.add('active');
    }
}

// Selector variante stil iOS
function selectVariant(button) {
    const picker = button.closest('.variant-picker');
    picker.querySelectorAll('.v-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const buttons = Array.from(picker.querySelectorAll('.v-btn'));
    const index = buttons.indexOf(button);
    const slider = picker.querySelector('.ios-slider');
    
    if (slider) {
        slider.style.transform = `translateX(${index * 100}%)`;
    }

    const newPrice = button.getAttribute('data-price');
    const card = button.closest('.product-card');
    const priceEl = card.querySelector('.price-val');

    priceEl.style.opacity = '0';
    priceEl.style.transform = 'translateY(-6px)';
    
    setTimeout(() => {
        priceEl.innerText = newPrice;
        priceEl.style.opacity = '1';
        priceEl.style.transform = 'translateY(0)';
    }, 120);
}

// Albinuță zburătoare spre coș
function triggerFlyingBee(event) {
    const cartTarget = document.getElementById('cart-target-icon');
    if (!cartTarget) return;
    const rectTarget = cartTarget.getBoundingClientRect();
    const startX = event.clientX || (event.touches && event.touches[0].clientX) || window.innerWidth / 2;
    const startY = event.clientY || (event.touches && event.touches[0].clientY) || window.innerHeight / 2;

    const bee = document.createElement('div');
    bee.className = 'flying-bee';
    bee.innerText = '🐝';
    document.body.appendChild(bee);

    const targetX = rectTarget.left + rectTarget.width / 2;
    const targetY = rectTarget.top + rectTarget.height / 2;

    const deltaX = targetX - startX;
    const deltaY = targetY - startY;

    bee.style.position = 'fixed';
    bee.style.fontSize = '1.8rem';
    bee.style.zIndex = '9999';
    bee.style.pointerEvents = 'none';
    bee.style.left = `${startX}px`;
    bee.style.top = `${startY}px`;
    bee.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

    setTimeout(() => {
        bee.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2) rotate(45deg)`;
        bee.style.opacity = '0';
    }, 20);

    setTimeout(() => {
        bee.remove();
    }, 650);
}

function addToCartFromCard(event, button, productName) {
    triggerFlyingBee(event);

    const card = button.closest('.product-card');
    const activeVar = card.querySelector('.v-btn.active');
    const size = activeVar.getAttribute('data-size');
    const price = parseInt(activeVar.getAttribute('data-price'));

    const itemKey = `${productName}-${size}`;
    const existing = cart.find(item => item.key === itemKey);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ key: itemKey, name: productName, size, price, qty: 1 });
    }

    updateCartUI();
    
    setTimeout(() => {
        toggleCart(true);
    }, 650);

    button.innerText = "Adăugat! ✓";
    button.style.background = "#10b981";
    button.style.color = "white";
    setTimeout(() => {
        button.innerText = "Adaugă";
        button.style.background = "";
        button.style.color = "";
    }, 1200);
}

function changeQuantity(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
    updateCheckoutSummary();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const countBadge = document.getElementById('cart-count');
    const totalVal = document.getElementById('cart-total-val');

    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg" style="color: var(--text-muted); text-align: center; margin-top: 2rem;">Coșul tău este gol momentan.</p>';
    } else {
        container.innerHTML = cart.map((item, index) => {
            totalItems += item.qty;
            totalPrice += item.price * item.qty;
            return `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; padding-bottom: 1.2rem; border-bottom: 1px solid var(--border-color);">
                    <div>
                        <strong style="font-size: 0.95rem; color: #fff;">${item.name}</strong><br>
                        <span style="color: var(--text-muted); font-size: 0.8rem;">${item.size} | ${item.price} LEI</span>
                        <div style="display: flex; align-items: center; gap: 0.8rem; margin-top: 0.5rem;">
                            <button onclick="changeQuantity(${index}, -1)" style="background: rgba(255,255,255,0.1); border: none; color: white; width: 26px; height: 26px; border-radius: 8px; cursor: pointer; font-weight: bold;">-</button>
                            <span style="font-size: 0.9rem; font-weight: 600; color: #fff;">${item.qty}</span>
                            <button onclick="changeQuantity(${index}, 1)" style="background: rgba(255,255,255,0.1); border: none; color: white; width: 26px; height: 26px; border-radius: 8px; cursor: pointer; font-weight: bold;">+</button>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <strong style="color: var(--accent-gold); display: block; margin-bottom: 0.5rem; font-size: 1.05rem;">${item.price * item.qty} LEI</strong>
                        <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:0.75rem;">Șterge</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    countBadge.innerText = totalItems;
    totalVal.innerText = `${totalPrice} LEI`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    updateCheckoutSummary();
}

function toggleCart(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer || !overlay) return;
    if (forceOpen) {
        drawer.classList.add('open');
        overlay.classList.add('open');
    } else {
        drawer.classList.toggle('open');
        overlay.classList.toggle('open');
    }
}

function goToCheckoutPage() {
    if (cart.length === 0) {
        alert("Coșul tău este gol! Adaugă cel puțin un produs.");
        return;
    }
    toggleCart();
    document.getElementById('store-view').style.display = 'none';
    document.getElementById('checkout-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateCheckoutSummary();
}

function showStoreView() {
    document.getElementById('checkout-view').style.display = 'none';
    document.getElementById('store-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCheckoutSummary() {
    const listContainer = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('co-subtotal');
    const totalEl = document.getElementById('co-total');
    if (!listContainer) return;

    let subtotal = 0;
    listContainer.innerHTML = cart.map(item => {
        subtotal += item.price * item.qty;
        return `
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 0.8rem;">
                <div>
                    <span style="color: #fff; font-weight: 600;">${item.name}</span><br>
                    <span style="color: var(--text-muted); font-size: 0.8rem;">${item.size} x ${item.qty}</span>
                </div>
                <div style="color: var(--accent-gold); font-weight: 700;">
                    ${item.price * item.qty} LEI
                </div>
            </div>
        `;
    }).join('');

    subtotalEl.innerText = `${subtotal} LEI`;
    totalEl.innerText = `${subtotal + 20} LEI`;
}

function submitOrder(e) {
    e.preventDefault();
    const name = document.getElementById('o-name').value;
    alert(`Felicitări, ${name}! Comanda ta a fost înregistrată cu succes. Te sunăm în curând pentru confirmare.`);
    cart = [];
    updateCartUI();
    showStoreView();
}
