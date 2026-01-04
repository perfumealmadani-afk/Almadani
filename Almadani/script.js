// Language Switching
let currentLang = "en";
const enBtn = document.getElementById("en-btn");
const arBtn = document.getElementById("ar-btn");

enBtn.addEventListener("click", () => switchLang("en"));
arBtn.addEventListener("click", () => switchLang("ar"));

function switchLang(lang) {
    currentLang = lang;
    document.querySelectorAll("[data-en]").forEach(el => {
        el.innerText = el.dataset[lang];
    });
}

// Navigation between sections
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const target = link.dataset.section;
        sections.forEach(sec => sec.classList.remove("active"));
        document.getElementById(target).classList.add("active");
    });
});

// Product Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        products.forEach(p => {
            if (filter === "all" || p.dataset.category === filter) {
                p.style.display = "block";
            } else {
                p.style.display = "none";
            }
        });
    });
});

// Cart
let cart = [];
const cartBtn = document.getElementById("cart-btn");
const cartSection = document.getElementById("cart");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const product = btn.parentElement;
        const name = product.querySelector("h3").innerText;
        const price = parseFloat(product.querySelector(".price").innerText.replace(" JD",""));
        cart.push({name, price});
        alert(name + " added to cart");
    });
});

cartBtn.addEventListener("click", () => {
    sections.forEach(sec => sec.classList.remove("active"));
    cartSection.classList.add("active");
    renderCart();
});

function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name} - ${item.price} JD</span>
            <button onclick="removeFromCart(${index})">X</button>
        `;
        cartItemsDiv.appendChild(div);
    });
    cartTotal.innerText = (currentLang === "ar" ? "المجموع: " : "Total: ") + total + " JD";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// WhatsApp Contact
const whatsappBtn = document.getElementById("whatsapp-btn");
const customerName = document.getElementById("customer-name");
const customerMessage = document.getElementById("customer-message");
const phoneNumber = "+962789191500";

whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = encodeURIComponent(customerName.value);
    const message = encodeURIComponent(customerMessage.value);
    if(!name || !message) {
        alert(currentLang === "ar" ? "يرجى إدخال الاسم والرسالة" : "Please enter name and message");
        return;
    }
    const url = https://wa.me/${phoneNumber}?text=Name: ${name}%0AMessage: ${message};
    window.open(url, "_blank");
});