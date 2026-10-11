let cart = [];

// Baza de date cu descrierile detaliate pentru fiecare produs
const productsData = {
    poliflora: {
        title: "Miere Polifloră",
        price: 35,
        img: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80",
        desc: "Obținută din nectarul a zeci de specii de flori sălbatice de pe dealurile însorite ale României. Este un cocktail natural de vitamine și minerale, recunoscut pentru efectul său tonic general și sprijinul adus sistemului imunitar în sezonul rece.",
        variants: [
            { size: "400g", price: 35 },
            { size: "800g", price: 60 },
            { size: "1kg", price: 75 }
        ]
    },
    salcam: {
        title: "Miere de Salcâm",
        price: 45,
        img: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80",
        desc: "Considerată regina miersurilor datorită limpezimii sale cristaline și a faptului că rămâne în stare lichidă o perioadă foarte îndelungată. Are un gust fin, delicat, fiind ideală pentru îndulcirea ceaiurilor fără să le schimbe aroma naturală.",
        variants: [
            { size: "400g", price: 45 },
            { size: "800g", price: 80 },
            { size: "1kg", price: 95 }
        ]
    },
    tei: {
        title: "Miere de Tei",
        price: 40,
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80",
        desc: "Cu o aromă puternică, inconfundabilă și o culoare ambra-deschisă, mierea de tei este renumită pentru proprietățile ei calmante. Este alegerea perfectă pentru o seară liniștită, consumată într-un ceai cald înainte de culcare.",
        variants: [
            { size: "400g", price: 40 },
            { size: "800g", price: 70 },
            { size: "1kg", price: 85 }
        ]
    },
    rapita: {
        title: "Miere de Rapiță",
        price: 35,
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
        desc: "O miere unică prin textura ei cremoasă, de un alb-gălbui deosebit. Se topește instant pe limbă și conține cantități ridicate de coenzima Q10, fiind extrem de apreciată pentru menținerea sănătății sistemului cardiovascular.",
        variants: [
            { size: "400g", price: 35 },
            { size: "800g", price: 60 },
            { size: "1kg", price: 75 }
        ]
    },
    floare: {
        title: "Miere de Floarea-Soarelui",
        price: 30,
        img: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80",
        desc: "O explozie de energie curată, cu o culoare galben-aurie intensă și o aromă inconfundabilă de vară. Cristalizează rapid datorită conținutului natural bogat în glucoză, fiind preferată de sportivi și persoane cu activitate fizică intensă.",
        variants: [
            { size: "400g", price: 30 },
            { size: "800g", price: 55 },
            { size: "1kg", price: 65 }
        ]
    },
    pastura: {
        title: "Păstură Naturală",
        price: 60,
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        desc: "Ccunoscută pe bună dreptate drept „pâinea albinelor”, păstura este polenul fermentat natural în faguri. Este un superaliment excepțional, extrem de bogat în aminoacizi esențiali și seleniu, ideal pentru detoxifierea ficatului și imunitate.",
        variants: [
            { size: "200g", price: 60 },
            { size: "400g", price: 110 },
            { size: "800g", price: 200 }
        ]
    },
    propolis: {
        title: "Tinctură de Propolis",
        price: 25,
        img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
        desc: "Extract pur de propolis în soluție hidroalcoolică, cel mai puternic antibiotic natural produs de albine. Ajută la apărarea organismului împotriva infecțiilor, vindecarea rapidă a rănilor și menținerea sănătății căilor respiratorii.",
        variants: [
            { size: "30ml", price: 25 },
            { size: "50ml", price: 40 },
            { size: "100ml", price: 70 }
        ]
    }
};

let currentActiveProductKey = null;

function openProductDetail(productKey) {
    const p = productsData[productKey];
    if (!p) return;
    currentActiveProductKey = productKey;

    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.title;
    document.getElementById('detail-price').innerText = p.variants[0].price;
    document.getElementById('detail-desc').innerText = p.desc;

    // Generăm butoanele de gramaj dinamic
    const picker = document.getElementById('detail-variant-picker');
    picker.innerHTML = `<div class="ios-slider"></div>` + p.variants.map((v, idx) => `
        <button class="v-btn ${idx === 0 ? 'active' : ''}" data-size="${v.size}" data-price="${v.price}" onclick="selectDetailVariant(this)">${v.size}</button>
    `).join('');

    // Resetăm poziția sliderului
    const slider = picker.querySelector('.ios-slider');
    if(slider) slider.style.transform = 'translateX(0%)';

    document.getElementById('store-view').style.display = 'none';
    document.getElementById('checkout-view').style.display = 'none';
    document.getElementById('product-detail-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectDetailVariant(button) {
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
    document.getElementById('detail-price').innerText = newPrice;
}

function addCurrentDetailToCart() {
    const p = productsData[currentActiveProductKey];
    const picker = document.getElementById('detail-variant-picker');
    const activeVar = picker.querySelector('.v-btn.active');
    const size = activeVar.getAttribute('data-size');
    const price = parseInt(activeVar.getAttribute('data-price'));

    const itemKey = `${p.title}-${size}`;
    const existing = cart.find(item => item.key === itemKey);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ key: itemKey, name: p.title, size, price, qty: 1 });
    }

    updateCartUI();
    toggleCart(true);

    const btn = document.getElementById('detail-add-btn');
    btn.innerText = "Adăugat în Coș! ✓";
    btn.style.background = "#10b981";
    setTimeout(() => {
        btn.innerText = "Adaugă în Coș";
        btn.style.background = "";
    }, 1200);
}

// Generare fundal optimizat
function createNatureBackground() {
    const container = document.getElementById('nature-bg');
    if (!container) return;
    
    container.innerHTML = '';
    const symbols = ['🐝', '🍯', '✨', '🌿', '🌼'];
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

// Faq Toggle
function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) {
        element.classList.add('active');
    }
}

// Selector Variante (Efect Miere Lichidă din carduri)
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

function addToCartFromCard(event, button, productName) {
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
    toggleCart(true);

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
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 2rem;">Coșul tău este gol momentan.</p>';
    } else {
        container.innerHTML = cart.map((item, index) => {
            totalItems += item.qty;
            totalPrice += item.price * item.qty;
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; padding-bottom: 1.2rem; border-bottom: 1px solid var(--border-color);">
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
    document.getElementById('product-detail-view').style.display = 'none';
    document.getElementById('checkout-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateCheckoutSummary();
}

function showStoreView() {
    document.getElementById('checkout-view').style.display = 'none';
    document.getElementById('product-detail-view').style.display = 'none';
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
