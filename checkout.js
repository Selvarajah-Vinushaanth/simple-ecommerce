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
