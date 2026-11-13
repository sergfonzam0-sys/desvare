const CATALOGO_DESVARE = [
{
    id: 1,
    nombre: "Aceite Full Sintético 10W-40 4T",
    categoria: "Lubricantes",
    precio: 48000,
    stock: 25,
    imagen: "img/products/aceite.jpg",
    descripcion: "Lubricante de alto rendimiento para motores 4 tiempos. Protección térmica extrema para el clima de Barranquilla."
  },
  {
    id: 2,
    nombre: "Asistencia Desvare Express 24/7 (1 Servicio)",
    categoria: "Servicios",
    precio: 35000,
    stock: 99,
    imagen: "img/nacimiento/taller mivil.png",
    descripcion: "Desplazamiento inmediato de técnico certificado hasta tu ubicación en Barranquilla y área metropolitana."
  },
  {
    id: 3,
    nombre: "Kit de Arrastre Reforzado O-Ring",
    categoria: "Repuestos",
    precio: 135000,
    stock: 14,
    imagen: "img/products/kid de arrastre.jpg",
    descripcion: "Piñón delantero, catalina en acero templado y cadena reforzada de alta durabilidad."
  },
  {
    id: 4,
    nombre: "Batería Gel 12V 7Ah Libre Mantenimiento",
    categoria: "Eléctrico",
    precio: 118000,
    stock: 18,
    imagen: "img/products/bateria 12v.jpg",
    descripcion: "Arranque en frío garantizado, sellada de fábrica y resistente a vibraciones."
  },
  {
    id: 5,
    nombre: "Juego de Pastillas de Freno Cerámicas",
    categoria: "Frenos y Llantas",
    precio: 38000,
    stock: 30,
    imagen: "img/products/juego de pasrtilla.jpg",
    descripcion: "Frenado silencioso y seguro en pavimento seco o mojado sin desgaste prematuro del disco."
  },
  {
    id: 6,
    nombre: "Kit de Despinche Sellomatic + Inflador CO2",
    categoria: "Emergencia",
    precio: 42000,
    stock: 22,
    imagen: " img/products/kit despiche.webp",
   
    descripcion: "Solución portátil para reparar pinchazos en la vía en menos de 5 minutos sin desmontar la llanta."
  },
  {
    id: 7,
    nombre: "Bujía Iridium IX Alto Desempeño",
    categoria: "Eléctrico",
    precio: 45000,
    stock: 40,
    imagen: "img/products/bujia.jpg",
    descripcion: "Encendido rápido, mejor combustión y ahorro de combustible para motos urbanas y sport."
  },
  {
    id: 8,
    nombre: "Lubricante de Cadena Teflón Spray 300ml",
    categoria: "Lubricantes",
    precio: 29000,
    stock: 35,
    imagen: "img/products/lubricante cadena.jpg",
    descripcion: "Adherencia superior que repele polvo y humedad, alargando la vida útil del kit de arrastre."
  },
  {
    id: 9,
    nombre: "Plan Afiliado Desvare Plus (Anual)",
    categoria: "Servicios",
    precio: 89000,
    stock: 50,
    imagen: "img/desvare/logo.jpeg",
    descripcion: "3 asistencias en vía sin costo de desplazamiento, tarifas preferenciales y prioridad 24/7."
  },
  {
    id: 10,
    nombre: "Llanta Trasera Sellomatic 130/70-17",
    categoria: "Frenos y Llantas",
    precio: 215000,
    stock: 9,
    imagen: "img/products/llanta.jpg",
    descripcion: "Labrado deportivo de máximo agarre y evacuación de agua para conducción segura."
  },
  {
    id: 11,
    nombre: "Guaya de Clutch y Acelerador Universal",
    categoria: "Repuestos",
    precio: 24000,
    stock: 28,
    imagen: "img/products/guaya clutch.jpg",
    descripcion: "Cable trenzado en acero inoxidable con prisioneros de emergencia para desvare rápido."
  },
  {
    id: 12,
    nombre: "Mantenimiento Preventivo a Domicilio",
    categoria: "Servicios",
    precio: 75000,
    stock: 20,
    imagen: "img/products/preventivo.jpg",
    descripcion: "Cambio de aceite, tensión y lubricación de cadena, revisión de frenos, luces y batería en tu casa."
  }
];

const STORAGE_KEY = "desvare_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function formatCOP(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(valor);
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  document.querySelectorAll(".cart-badge").forEach(el => {
    el.textContent = totalItems;
  });
}

function showToast(mensaje) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensaje;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function addToCart(productId) {
  const producto = CATALOGO_DESVARE.find(p => p.id === productId);
  if (!producto) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    if (existing.cantidad < producto.stock) {
      existing.cantidad += 1;
    } else {
      showToast("Stock máximo alcanzado para este producto.");
      return;
    }
  } else {
    cart.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }
  saveCart(cart);
  showToast(`✔ "${producto.nombre}" agregado al carrito`);
}

function renderCatalogo(lista) {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = `<div class="info-card" style="grid-column:1/-1;text-align:center;">
      <h3>No encontramos productos con ese criterio</h3>
      <p>Intenta con otra palabra clave o selecciona "Todos" en las categorías.</p>
    </div>`;
    return;
  }

  grid.innerHTML = lista.map(p => `
    <article class="product-card">
      <div class="product-img-wrap">
        <span class="product-category-tag">${p.categoria}</span>
        <span class="product-stock-tag">Disp: ${p.stock}</span>
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      </div>
      <div class="product-body">
        <h3 class="product-title">${p.nombre}</h3>
        <p class="product-desc">${p.descripcion}</p>
        <div class="product-footer">
          <span class="product-price">${formatCOP(p.precio)}</span>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">+ Agregar</button>
        </div>
      </div>
    </article>
  `).join("");
}

function initCatalogFilters() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  let categoriaActiva = "Todos";
  let textoBusqueda = "";

  const filtrar = () => {
    const filtrados = CATALOGO_DESVARE.filter(p => {
      const matchCat = categoriaActiva === "Todos" || p.categoria === categoriaActiva;
      const matchText = p.nombre.toLowerCase().includes(textoBusqueda) ||
                        p.descripcion.toLowerCase().includes(textoBusqueda);
      return matchCat && matchText;
    });
    renderCatalogo(filtrados);
  };

  renderCatalogo(CATALOGO_DESVARE);

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      textoBusqueda = e.target.value.trim().toLowerCase();
      filtrar();
    });
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      categoriaActiva = btn.dataset.category;
      filtrar();
    });
  });
}

/* ==================== LOGICA DEL CARRITO (carrito.html) ==================== */
function renderCartPage() {
  const listContainer = document.getElementById("cart-items-list");
  if (!listContainer) return;

  const cart = getCart();
  const subtotalEl = document.getElementById("summary-subtotal");
  const ivaEl = document.getElementById("summary-iva");
  const totalEl = document.getElementById("summary-total");
  const checkoutSection = document.getElementById("checkout-form-section");

  if (cart.length === 0) {
    listContainer.innerHTML = `
      <div class="info-card" style="text-align:center; padding:3rem 1.5rem;">
        <h3>Tu carrito de Desvare está vacío</h3>
        <p style="margin-bottom:1.5rem;">Explora nuestros repuestos, lubricantes y bonos de asistencia mecánica móvil en Barranquilla.</p>
        <a href="index.html#catalogo" class="btn btn-primary">Ir al Catálogo de Productos</a>
      </div>`;
    if (subtotalEl) subtotalEl.textContent = "$0";
    if (ivaEl) ivaEl.textContent = "$0";
    if (totalEl) totalEl.textContent = "$0";
    if (checkoutSection) checkoutSection.style.display = "none";
    return;
  }

  if (checkoutSection) checkoutSection.style.display = "block";

  listContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.nombre}</div>
        <div class="cart-item-price">${formatCOP(item.precio)} c/u</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <strong>${item.cantidad}</strong>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <div style="font-weight:800; min-width:95px; text-align:right;">
        ${formatCOP(item.precio * item.cantidad)}
      </div>
      <button class="remove-btn" onclick="removeItem(${item.id})">Eliminar</button>
    </div>
  `).join("");

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const iva = Math.round(subtotal * 0.19);
  const total = subtotal + iva;

  if (subtotalEl) subtotalEl.textContent = formatCOP(subtotal);
  if (ivaEl) ivaEl.textContent = formatCOP(iva);
  if (totalEl) totalEl.textContent = formatCOP(total);
}

function changeQty(id, delta) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].cantidad += delta;
  if (cart[idx].cantidad <= 0) {
    cart.splice(idx, 1);
  }
  saveCart(cart);
  renderCartPage();
}

function removeItem(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCartPage();
  showToast("Producto eliminado del carrito.");
}

function clearCart() {
  saveCart([]);
  renderCartPage();
  showToast("Carrito vaciado.");
}

function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) return;

    const nombre = document.getElementById("chk-nombre");
    const telefono = document.getElementById("chk-telefono");
    const direccion = document.getElementById("chk-direccion");
    const pago = document.getElementById("chk-pago");

    let valid = true;
    [nombre, telefono, direccion].forEach(input => {
      const err = input.nextElementSibling;
      if (!input.value.trim()) {
        input.classList.add("error");
        if (err) err.classList.add("visible");
        valid = false;
      } else {
        input.classList.remove("error");
        if (err) err.classList.remove("visible");
      }
    });

    if (!valid) return;

    const subtotal = cart.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    const total = subtotal + Math.round(subtotal * 0.19);
    const ordenId = "DSV-" + Math.floor(100000 + Math.random() * 900000);

    const modal = document.getElementById("order-modal");
    const modalBody = document.getElementById("order-modal-body");
    if (modal && modalBody) {
      modalBody.innerHTML = `
        <h2 style="color:var(--success); margin-bottom:0.5rem;">✔ ¡Pedido Confirmado!</h2>
        <p style="margin-bottom:1rem;">Orden <strong>#${ordenId}</strong> registrada exitosamente en Desvare Barranquilla.</p>
        <div style="background:#f9fafb; padding:1rem; border-radius:8px; margin-bottom:1.25rem; font-size:0.92rem;">
          <p><strong>Cliente:</strong> ${nombre.value.trim()}</p>
          <p><strong>Teléfono / WhatsApp:</strong> ${telefono.value.trim()}</p>
          <p><strong>Dirección de entrega / desvare:</strong> ${direccion.value.trim()}</p>
          <p><strong>Método de pago:</strong> ${pago.value}</p>
          <p style="margin-top:0.5rem; font-size:1.1rem; color:var(--primary);"><strong>Total Pagado: ${formatCOP(total)}</strong></p>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="closeOrderModal()">Continuar navegando</button>
      `;
      modal.classList.add("open");
    }

    saveCart([]);
    renderCartPage();
    form.reset();
  });
}

function closeOrderModal() {
  const modal = document.getElementById("order-modal");
  if (modal) modal.classList.remove("open");
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("cnt-nombre").value.trim();
    const email = document.getElementById("cnt-email").value.trim();
    const mensaje = document.getElementById("cnt-mensaje").value.trim();
    if (!nombre || !email || !mensaje) {
      showToast("Por favor completa todos los campos obligatorios.");
      return;
    }
    showToast(`✔ Gracias ${nombre}, nuestro equipo en Barranquilla te responderá pronto.`);
    form.reset();
  });
}


function initCarrusel() {
  const imagenes = document.querySelectorAll(".carrusel-img");
  const dots = document.querySelectorAll(".carrusel-dots .dot");
  if (imagenes.length === 0) return;

  let index = 0;
  let intervalId;

  const mostrarSlide = (nuevoIndex) => {
    imagenes[index].classList.remove("active");
    if (dots[index]) dots[index].classList.remove("active");
    index = (nuevoIndex + imagenes.length) % imagenes.length;
    imagenes[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
  };

  const iniciarAuto = () => {
    intervalId = setInterval(() => {
      mostrarSlide(index + 1);
    }, 3500);
  };

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      clearInterval(intervalId);
      mostrarSlide(idx);
      iniciarAuto();
    });
  });

  iniciarAuto();
}

document.addEventListener("DOMContentLoaded", () => {
  initCarrusel();
  updateCartBadge();
  initCatalogFilters();
  renderCartPage();
  initCheckoutForm();
  initContactForm();

  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => navMenu.classList.toggle("open"));
  }
});
