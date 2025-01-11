// Sample product data
const products = [
    { 
        id: 1, 
        name: 'iPhone X', 
        variant: '16GB', 
        price: 999.99, 
        image: '36835_73a2e473-1bf7-4113-95ca-3751f5173d9c.jpg', 
        description: 'Latest model of iPhone X with 16GB storage.', 
        specifications: 'Made by glass, 3GB RAM, 12MP Camera' 
    },
    { 
        id: 2, 
        name: 'iPhone X', 
        variant: '32GB', 
        price: 1099.99, 
        image: 'R.png', 
        description: 'iPhone X with 32GB storage.', 
        specifications: 'Made by glass, 3GB RAM, 12MP Camera' 
    },
    { 
        id: 3, 
        name: 'Bluetooth Speaker', 
        variant: 'Black', 
        price: 49.99, 
        image: '61DcWn4acVL._AC_UF894,1000_QL80_.jpg', 
        description: 'Portable Bluetooth speaker in black.', 
        specifications: 'Water-resistant, 10-hour battery life' 
    },
    { 
        id: 4, 
        name: 'Pendrive', 
        variant: 'Blue', 
        price: 19.99, 
        image: 'flash-drive-1-500x500.webp', 
        description: '16GB blue pendrive.', 
        specifications: 'USB 3.0, Transfer speed up to 150MB/s' 
    },
    {
        id: 6,
        name: 'NVIDIA GeForce RTX 3080',
        variant: '10GB',
        price: 699.99,
        image: '6429440cv13d.jpg',
        description: 'High-end graphics card for gaming and professional work.',
        specifications: '10GB GDDR6X VRAM, Ray tracing support'
    },
    {
        id: 7,
        name: 'Apple Watch Series 7',
        variant: 'GPS, 41mm',
        price: 399.99,
        image: 'bd238e111e0c59c6d97ad47e2799516e--apple-watch-bands-smart-watch.jpg',
        description: 'Smartwatch with GPS and advanced health monitoring features.',
        specifications: 'Blood oxygen monitoring, ECG, Always-on display'
    },
    {
        id: 8,
        name: 'GoPro HERO10',
        variant: 'Black',
        price: 499.99,
        image: 'pddxjrhyecsg15c2usoo.webp',
        description: 'Action camera with 5.3K video recording and waterproof design.',
        specifications: '23MP photos, HyperSmooth 4.0 stabilization, 33ft waterproof'
    },
    {
        id: 9,
        name: 'Bose SoundLink Revolve+',
        variant: 'Bluetooth Speaker',
        price: 299.99,
        image: 'cq5dam.web.1000.1000.png',
        description: 'Portable Bluetooth speaker with 360-degree sound.',
        specifications: '12 hours battery life, Water-resistant, Voice prompts'
    },
    {
        id: 10,
        name: 'kindle Paperwhite',
        variant: '8GB, 6-inch',
        price: 129.99,
        image: '6234046_Khung_Kindle-Paperwhite-5-33.webp',
        description: 'E-reader with a high-resolution display and built-in light.',
        specifications: 'Waterproof, 8GB storage, Adjustable front light'
    },
    {
        id: 11,
        name: 'LG UltraWide Monitor',
        variant: '34-inch, 1440p',
        price: 499.99,
        image: 'R (1).png',
        description: '34-inch UltraWide monitor with a 1440p resolution.',
        specifications: 'IPS panel, 144Hz refresh rate, HDR10 support'
    }
];


// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="openPopup(${product.id})" style="cursor: pointer;">
            <h3>${product.name} (${product.variant})</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productItem);
    });
}

// Function to open the popup with product details
function openPopup(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('popup-title').textContent = `${product.name} (${product.variant})`;
    document.getElementById('popup-image').src = product.image;
    document.getElementById('popup-description').textContent = product.description;
    document.getElementById('popup-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('popup-specifications').textContent = `Specifications: ${product.specifications}`;

    document.getElementById('product-popup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
    document.getElementById('product-popup').style.display = 'none';
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Retrieve cart from localStorage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(p => p.id === productId);
    if (existingProductIndex === -1) {
        cart.push({...product, quantity: 1}); // Initialize quantity
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Added product ID ${productId} to cart.`);
    } else {
        console.log(`Product ID ${productId} is already in the cart.`);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
