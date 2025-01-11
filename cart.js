// Function to render cart
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';

    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 50px;">
            <h3>${product.name} (${product.variant})</h3>
            <p>$${product.price}</p>
            <button onclick="changeQuantity(${index}, -1)">-</button>
            <span>${product.quantity || 1}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItems.appendChild(cartItem);
    });
}

// Function to change quantity
function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (index < 0 || index >= cart.length) return;

    const product = cart[index];
    const newQuantity = (product.quantity || 1) + delta;

    if (newQuantity <= 0) {
        cart.splice(index, 1); // Remove item if quantity is 0 or less
    } else {
        product.quantity = newQuantity; // Update quantity
        cart[index] = product;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to remove product from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item by index

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to handle checkout
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let totalAmount = 0;
    let receiptContent = `<h2>Receipt</h2><ul>`;

    cart.forEach(product => {
        const itemTotal = (product.price * (product.quantity || 1)).toFixed(2);
        totalAmount += parseFloat(itemTotal);
        receiptContent += `
            <li>
                <img src="${product.image}" alt="${product.name}" style="width: 50px;">
                <strong>${product.name}</strong> (${product.variant}) - $${itemTotal}
            </li>
        `;
    });

    receiptContent += `</ul><p><strong>Total: $${totalAmount.toFixed(2)}</strong></p>`;
    
    // Display receipt
    const receipt = document.getElementById('receipt');
    receipt.innerHTML = receiptContent;
    receipt.style.display = 'block';

    // Clear the cart
    localStorage.removeItem('cart');
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
