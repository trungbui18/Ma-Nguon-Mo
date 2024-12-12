
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("cart");
    const span = document.getElementsByClassName("close")[0];
    const closeFooter = document.getElementsByClassName("close-footer")[0];
    const orderButton = document.getElementsByClassName("order")[0];
    const cartItems = document.querySelector('.cart-items');
    const cartTotalPrice = document.querySelector('.cart-total-price');
    const cartBadge = document.getElementById("cart-badge");
    const notification = document.getElementById("notification");

    let cart = [];

    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...item, quantity: 1});
        }
        updateCartBadge();
        renderCart();
        showNotification();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartRow = document.createElement('div');
            cartRow.classList.add('cart-row');
            cartRow.innerHTML = `
                <div class="cart-item cart-column">
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                </div>
                <span class="cart-price cart-column">${formatPrice(item.price)}VNĐ</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="${item.quantity}" min="1">
                    <button class="btn btn-danger" type="button">Xóa</button>
                </div>
            `;
            cartItems.append(cartRow);

            const removeButton = cartRow.querySelector('.btn-danger');
            removeButton.addEventListener('click', () => removeFromCart(item.id));

            const quantityInput = cartRow.querySelector('.cart-quantity-input');
            quantityInput.addEventListener('change', event => updateQuantity(item.id, event.target.value));

            totalPrice += item.price * item.quantity;
        });

        cartTotalPrice.innerText = formatPrice(totalPrice) + 'VNĐ';
    }

    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartBadge();
        renderCart();
    }

    function updateQuantity(itemId, quantity) {
        const item = cart.find(cartItem => cartItem.id === itemId);
        if (item) {
            item.quantity = parseInt(quantity);
        }
        updateCartBadge();
        renderCart();
    }

    function updateCartBadge() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.innerText = totalQuantity;
    }

    function formatPrice(price) {
        return price.toLocaleString('vi-VN');
    }

    function showNotification() {
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    closeFooter.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    orderButton.onclick = function() {
        alert('Thanh Toán Thành Công!');
        cart = [];
        updateCartBadge();
        renderCart();
        modal.style.display = "none";
    }

    // Add event listeners to the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const card = button.parentElement;
            const item = {
                id: index + 1,
                name: card.querySelector('.data-name').innerText,
                price: parseInt(card.querySelector('.price').innerText.replace(/\D/g, '')),
                image: card.parentElement.querySelector('img').src
            };
            addToCart(item);
        });
    });
});
