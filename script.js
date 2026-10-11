const productsData = {
    'poliflora': {
        title: 'Miere Polifloră',
        img: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
        desc: '100% naturală, culeasă din flora bogată a dealurilor însorite. Un amestec complex de nectare cu proprietăți energizante și tonice pentru organism.',
        variants: [
            { size: '400g', price: 35 },
            { size: '800g', price: 60 },
            { size: '1kg', price: 75 }
        ]
    },
    'salcam': {
        title: 'Miere de Salcâm',
        img: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80',
        desc: 'Fină, translucidă și delicioasă. Un gust diafan și delicat, recunoscut prin faptul că rămâne în stare lichidă o perioadă foarte îndelungată.',
        variants: [
            { size: '400g', price: 45 },
            { size: '800g', price: 80 },
            { size: '1kg', price: 95 }
        ]
    },
    'tei': {
        title: 'Miere de Tei',
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80',
        desc: 'Aromă intensă și relaxantă. Perfectă pentru ceai și seri liniștite, având un efect calmant dovedit și un parfum inconfundabil.',
        variants: [
            { size: '400g', price: 40 },
            { size: '800g', price: 70 },
            { size: '1kg', price: 85 }
        ]
    },
    'rapita': {
        title: 'Miere de Rapiță',
        img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
        desc: 'Cremoasă, fină și bogată în nutrienți. Se topește instant pe limbă și este extrem de apreciată pentru conținutul ridicat de glucoză.',
        variants: [
            { size: '400g', price: 35 },
            { size: '800g', price: 60 },
            { size: '1kg', price: 75 }
        ]
    },
    'floare': {
        title: 'Miere de Floarea-Soarelui',
        img: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=600&q=80',
        desc: 'Aromă puternică de vară și culoare aurie intensă, extrem de energizantă și bogată în enzime benefice.',
        variants: [
            { size: '400g', price: 30 },
            { size: '800g', price: 55 },
            { size: '1kg', price: 65 }
        ]
    },
    'capaceala': {
        title: 'Capăceală de Miere',
        img: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
        desc: 'Căpăceala fagurilor, un elixir natural cu miere, ceară și propolis, excelentă pentru sănătatea cavității bucale și digestie.',
        variants: [
            { size: '300g', price: 40 },
            { size: '600g', price: 75 },
            { size: '1kg', price: 110 }
        ]
    },
    'rame': {
        title: 'Rame cu Miere (Fagure)',
        img: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80',
        desc: 'Fagure proaspăt în ramă completă, direct din stup, exact așa cum l-au zidit albinele. Puritate maximă.',
        variants: [
            { size: '1 ramă', price: 90 },
            { size: '2 rame', price: 170 },
            { size: '3 rame', price: 240 }
        ]
    },
    'pastura': {
        title: 'Păstură Naturală',
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        desc: 'Cunoscută drept „pâinea albinelor”, un superaliment cu efecte curative excepționale și conținut ridicat de aminoacizi.',
        variants: [
            { size: '200g', price: 60 },
            { size: '400g', price: 110 },
            { size: '800g', price: 200 }
        ]
    },
    'tinctura': {
        title: 'Tinctură de Propolis',
        img: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
        desc: 'Extract pur de propolis în alcool etilic, un antibiotic natural puternic pentru imunitate și vindecarea țesuturilor.',
        variants: [
            { size: '30ml', price: 25 },
            { size: '50ml', price: 40 },
            { size: '100ml', price: 70 }
        ]
    }
};

let cart = [];
let currentDetailProduct = null;
let currentDetailVariantIndex = 0;

window.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('nature-bg');
    if (bg) {
        const emojis = ['🐝', '🍯', '🌼', '✨'];
        for (let i = 0; i < 18; i++) {
            const span = document.createElement('span');
            span.className = 'floating-element';
            span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.left = Math.random() * 100 + 'vw';
            span.style.fontSize = (Math.random() * 1.2 + 1) + 'rem';
            span.style.animationDuration = (Math.random() * 12 + 10) + 's';
            span.style.animationDelay = (Math.random() * 8) + 's';
            bg.appendChild(span);
        }
    }
    toggleCardInputs();
    setupCardValidation();
    setupSwipeToCloseCart();
});

function setupSwipeToCloseCart() {
    let touchStartX = 0;
    let touchEndX = 0;
    const cartDrawer = document.getElementById('cart-drawer');

    if (cartDrawer) {
        cartDrawer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        cartDrawer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX - touchStartX > 50) {
                if (cartDrawer.classList.contains('open')) {
                    toggleCart();
                }
            }
        }, { passive: true });
    }
}

function setupCardValidation() {
    const cardNumberInput = document.getElementById('c-number');
    const cardExpInput = document.getElementById('c-exp');
    const cardCvcInput = document.getElementById('c-cvc');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '').substring(0, 16);
            let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
            e.target.value = formatted;
        });
    }

    if (cardExpInput) {
        cardExpInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '').substring(0, 4);
            if (val.length >= 2) {
                let month = parseInt(val.substring(0, 2), 10);
                if (month > 12) month = 12;
                if (month < 1 && val.length === 2) month = 1;
                let formattedMonth = month < 10 && val.length === 2 ? '0' + month : month.toString();
                val = formattedMonth + val.substring(2);
                e.target.value = val.substring(0, 2) + '/' + val.substring(2);
            } else {
                e.target.value = val;
            }
        });
    }

    if (cardCvcInput) {
        cardCvcInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
}

function selectVariant(btn) {
    const picker = btn.parentElement;
    const buttons = picker.querySelectorAll('.v-btn');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const index = Array.from(buttons).indexOf(btn);
    const slider = picker.querySelector('.ios-slider');
    if (slider) {
        slider.style.transform = `translateX(${index * 100}%)`;
    }

    const price = btn.getAttribute('data-price');
    const card = picker.closest('.product-card');
    if (card) {
        const priceVal = card.querySelector('.price-val');
        if (priceVal) priceVal.innerText = price;
    }
}

function showStoreView() {
    document.getElementById('store-view').style.display = 'block';
    document.getElementById('product-detail-view').style.display = 'none';
    document.getElementById('checkout-view').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openProductDetail(productId) {
    currentDetailProduct = productsData[productId];
    if (!currentDetailProduct) return;

    document.getElementById('detail-img').src = currentDetailProduct.img;
    document.getElementById('detail-title').innerText = currentDetailProduct.title;
    document.getElementById('detail-desc').innerText = currentDetailProduct.desc;
    document.getElementById('detail-price').innerText = currentDetailProduct.variants[0].price;

    currentDetailVariantIndex = 0;
    const picker = document.getElementById('detail-variant-picker');
    picker.innerHTML = '<div class="ios-slider"></div>';

    currentDetailProduct.variants.forEach((v, index) => {
        const b = document.createElement('button');
        b.className = `v-btn ${index === 0 ? 'active' : ''}`;
        b.innerText = v.size;
        b.onclick = () => {
            currentDetailVariantIndex = index;
            document.getElementById('detail-price').innerText = v.price;
            picker.querySelectorAll('.v-btn').forEach(btn => btn.classList.remove('active'));
            b.classList.add('active');
            picker.querySelector('.ios-slider').style.transform = `translateX(${index * 100}%)`;
        };
        picker.appendChild(b);
    });

    document.getElementById('store-view').style.display = 'none';
    document.getElementById('product-detail-view').style.display = 'block';
    document.getElementById('checkout-view').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToCheckoutPage() {
    if (cart.length === 0) {
        alert('Coșul tău este gol!');
        return;
    }
    toggleCart();
    document.getElementById('store-view').style.display = 'none';
    document.getElementById('product-detail-view').style.display = 'none';
    document.getElementById('checkout-view').style.display = 'block';
    renderCheckoutSummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
}

function addToCartFromCard(event, btn, productName) {
    event.stopPropagation();
    const card = btn.closest('.product-card');
    const activeBtn = card.querySelector('.v-btn.active');
    const size = activeBtn.getAttribute('data-size');
    const price = parseInt(activeBtn.getAttribute('data-price'));

    const existing = cart.find(item => item.name === productName && item.size === size);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name: productName, size: size, price: price, qty: 1 });
    }
    updateCartUI();
    toggleCart();
}

function addCurrentDetailToCart() {
    if (!currentDetailProduct) return;
    const variant = currentDetailProduct.variants[currentDetailVariantIndex];
    const existing = cart.find(item => item.name === currentDetailProduct.title && item.size === variant.size);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name: currentDetailProduct.title, size: variant.size, price: variant.price, qty: 1 });
    }
    updateCartUI();
    toggleCart();
}

function changeQty(index, delta) {
    if (cart[index]) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        updateCartUI();
    }
}

function updateCartUI() {
    const countSpan = document.getElementById('cart-count');
    const itemsContainer = document.getElementById('cart-items');
    const totalVal = document.getElementById('cart-total-val');

    let totalCount = 0;
    let totalPrice = 0;
    itemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        totalCount += item.qty;
        totalPrice += item.price * item.qty;

        itemsContainer.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.8rem;">
                <div>
                    <div style="font-weight: 700; font-size: 0.95rem;">${item.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${item.size} | ${item.price} LEI</div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button class="cart-qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <span style="font-weight: 700; font-size: 0.95rem; min-width: 18px; text-align: center;">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    countSpan.innerText = totalCount;
    totalVal.innerText = totalPrice + ' LEI';
}

function toggleShippingType() {
    const shippingType = document.querySelector('input[name="shipping"]:checked').value;
    const addressLabel = document.getElementById('address-label');
    const addressInput = document.getElementById('o-address');

    if (shippingType === 'easybox') {
        addressLabel.innerText = 'Selectează / Scrie EasyBox-ul dorit';
        addressInput.placeholder = 'Ex: EasyBox OMV Militari, Str. Virtuții Nr. 12';
    } else {
        addressLabel.innerText = 'Adresa completă de livrare';
        addressInput.placeholder = 'Oraș, Calea/Strada, Nr, Bloc, Ap';
    }
    renderCheckoutSummary();
}

function renderCheckoutSummary() {
    const list = document.getElementById('checkout-items-list');
    list.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        list.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 0.9rem;">
                <span>${item.name} (${item.size}) x ${item.qty}</span>
                <span style="font-weight: 700; color: var(--accent-gold);">${item.price * item.qty} LEI</span>
            </div>
        `;
    });

    const shippingType = document.querySelector('input[name="shipping"]:checked')?.value || 'curier';
    const shippingCost = shippingType === 'easybox' ? 15 : 20;

    document.getElementById('co-subtotal').innerText = subtotal + ' LEI';
    document.getElementById('co-shipping-val').innerText = shippingCost + ' LEI';
    document.getElementById('co-total').innerText = (subtotal + shippingCost) + ' LEI';
}

function toggleCardInputs() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const cardSection = document.getElementById('card-details-section');
    if (paymentMethod === 'card') {
        cardSection.style.display = 'block';
    } else {
        cardSection.style.display = 'none';
    }
}

function submitOrder(event) {
    event.preventDefault();
    const name = document.getElementById('o-name').value;
    const shipping = document.querySelector('input[name="shipping"]:checked').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    alert(`Mulțumim pentru comandă, ${name}! Comanda ta va fi livrată prin ${shipping === 'easybox' ? 'Sameday EasyBox' : 'Curier Rapid'} și va fi procesată prin plata ${payment === 'card' ? 'cu Cardul Online' : 'Ramburs'}. Te vom contacta în curând!`);
    cart = [];
    updateCartUI();
    showStoreView();
}

function toggleFaq(item) {
    item.classList.toggle('active');
}
