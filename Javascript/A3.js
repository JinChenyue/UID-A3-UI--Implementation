function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay.style.display === 'flex') {
        cartOverlay.style.display = 'none';
    } else {
        cartOverlay.style.display = 'flex';
    }
}

// Build function for loading products in grid section
document.addEventListener('DOMContentLoaded', function() {
// Create constants to store all the products information
    const products = [
        { name: "Calming Dog Bed", price: "$58.99", originalPrice: "", image: "A3 image/product/dog bed.svg" },
        { name: "Pet Air Filter", price: "$29.99", originalPrice: "", image: "path/to/image2.jpg" },
        { name: "S-XL Front Range No-Pull Dog Harness", price: "$54.95", originalPrice: "$119.99", image: "path/to/image3.jpg" },
        { name: "Grooming Kit", price: "$52.99", originalPrice: "$64.99", image: "path/to/image1.jpg" },
        { name: "Pet Safety Seat Belt", price: "$23.99", originalPrice: "$35.99", image: "path/to/image2.jpg" },
        { name: "Pet Dryer", price: "$149.99", originalPrice: "", image: "path/to/image3.jpg" },
    ]

    const container = document.querySelector('.all-product');
    const template = document.getElementById('template');

    products.forEach(product => {
        const productCard = template.cloneNode(true);
        productCard.style.display = 'block';
        productCard.querySelector('.product-image').src = product.image;
        productCard.querySelector('.product-image').alt = product.name;
        productCard.querySelector('.product-name').textContent = product.name;
        productCard.querySelector('.product-price').textContent = product.price;
        productCard.querySelector('.original-price').textContent = product.originalPrice;
        container.appendChild(productCard);
    });
});