
// Shopping cart 
function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay.style.display === 'flex') {
        cartOverlay.style.display = 'none';
    } else {
        cartOverlay.style.display = 'flex';
    }
}
// Search area
function toggleSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay.style.display === 'block') {
        searchOverlay.style.display = 'none';
    } else {
        searchOverlay.style.display = 'block';
    }
}
// Javascript for product list page

// Information for all the products
const products = [
    { name: "Pet Air Filter", price: "$29.99", originalPrice: "", image: "A3 image/filter.svg" },
    { name: "S-XL Front Range No-Pull Dog Harness", price: "$54.95", originalPrice: "$119.99", image: "A3 image/harness.svg" },
    { name: "Calming Dog Bed", price: "$58.99", originalPrice: "", image: "A3 image/products/dog bed.svg" },
    { name: "Grooming Kit", price: "$52.99", originalPrice: "$64.99", image: "A3 image/products/grooming kit.svg" },
    { name: "Pet Safety Seat Belt", price: "$23.99", originalPrice: "$35.99", image: "A3 image/products/seat belt.svg" },
    { name: "Pet Dryer", price: "$149.99", originalPrice: "", image: "A3 image/products/Dryer.svg" },
    { name: "Teeth Cleaning Toy", price: "$17.99", originalPrice: "$20.99", image: "A3 image/products/Tooth cleaning toy.svg" },
    { name: "Pet Safety Seat Belt", price: "$23.99", originalPrice: "$35.99", image: "A3 image/products/seat belt 2.svg" },
    { name: "Cordless Vacuum Cleaner", price: "$74.99", originalPrice: "", image: "A3 image/products/cleaner.svg" },
    { name: "Cordless Pet Clipper Grooming Kit", price: "$49.99", originalPrice: "", image: "A3 image/products/clipper.svg" },
];
// Loading all the products
document.addEventListener('DOMContentLoaded', function() {

    const container = document.querySelector('.all-products');

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <div class = "product-details">
                    <p class="product-price">${product.price}<span class="original-price">${product.originalPrice}</span></p>
                    <div class="product-action">
                        <img src="A3 image/Hearts.svg" alt="like" class="product-icon">
                        <img src="A3 image/Shopping-Cart.svg" alt="add to cart" class="product-icon">
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', productCard);
    });
});







// JaveScript for product details page

// Set up varibles
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    const quantityInput = document.querySelector('.quantity input');
    const quantityDecrease = document.querySelector('.quantity-decrease');
    const quantityIncrease = document.querySelector('.quantity-increase');
    const colorOptions = document.querySelectorAll('.color');
// Changing main image when click 
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src;
            thumbnails.forEach(img => img.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

// Change of quantity
    quantityDecrease.addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value--;
        }
    });

    quantityIncrease.addEventListener('click', function() {
        quantityInput.value++;
    });

// Select Color 
    colorOptions.forEach(color => {
        color.addEventListener('click', function() {
            colorOptions.forEach(col => col.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});