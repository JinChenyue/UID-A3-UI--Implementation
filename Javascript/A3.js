// Information for all the products
let products = [
    { name: "Pet Air Filter", price: "29.99", originalPrice: "", image: "A3 image/filter.svg", detailPage:"productDetail.html" },
    { name: "S-XL Front Range No-Pull Dog Harness", price: "54.95", originalPrice: "$119.99", image: "A3 image/harness.svg", detailPage:"productDetail 2.html"},
    { name: "Calming Dog Bed", price: "58.99", originalPrice: "", image: "A3 image/products/dog bed.svg" },
    { name: "Grooming Kit", price: "52.99", originalPrice: "$64.99", image: "A3 image/products/grooming kit.svg"},
    { name: "Pet Safety Seat Belt", price: "23.99", originalPrice: "$35.99", image: "A3 image/products/seat belt.svg"},
    { name: "Pet Dryer", price: "149.99", originalPrice: "", image: "A3 image/products/Dryer.svg" },
    { name: "Teeth Cleaning Toy", price: "17.99", originalPrice: "$20.99", image: "A3 image/products/Tooth cleaning toy.svg"},
    { name: "Pet Safety Seat Belt", price: "23.99", originalPrice: "$35.99", image: "A3 image/products/seat belt 2.svg"},
    { name: "Cordless Vacuum Cleaner", price: "74.99", originalPrice: "", image: "A3 image/products/cleaner.svg"},
    { name: "Cordless Pet Clipper Grooming Kit", price: "49.99", originalPrice: "", image: "A3 image/products/clipper.svg"},
];

// using local storage for persisting data across multiple pages
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// Floating window
// Shopping cart 
function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay.style.display === 'flex') {
        cartOverlay.style.display = 'none';
    } else {
        cartOverlay.style.display = 'flex';
    }
    displayCartItems()
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

// confirmation page 
function toggleReturn() {
    const returnOverlay = document.getElementById('returnOverlay');
    if (returnOverlay.style.display === 'flex') {
        returnOverlay.style.display = 'none';
    } else {
        returnOverlay.style.display = 'flex';
    }
}

function toggleSideBar(){
    const barOverlay = document.getElementById('barOverlay');
    if (barOverlay.style.display === 'flex') {
        barOverlay.style.display = 'none';
    } else {
        barOverlay.style.display = 'flex';
    }
}   


// Javascript for product list page

// Function to add click event listeners to product icons
function addClickEventToProductIcons() {
    const buttons = document.querySelectorAll('.product-icon[data-index]');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Prevent the browser navigate away
            event.preventDefault();
            // Get product index from the data-index attribute
            const productIndex = this.getAttribute('data-index');
            // Calls the function with the product index
            addToCart(productIndex);
        });
    });
}
// Loading all the products in product list page.
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.all-products');

    products.forEach((product, index) => {
        const productCard = `
        <a href="${product.detailPage}" class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-details">
                <p class="product-price">$${product.price}<span class="original-price">${product.originalPrice ? `$${product.originalPrice}` : ""}</span></p>
                <div class="product-action">
                    <img src="A3 image/Hearts.svg" alt="like" class="product-icon">
                    <img src="A3 image/Shopping-Cart.svg" alt="add to cart" class="product-icon" data-index="${index}">
                </div>
            </div>
        </a>`;
        container.insertAdjacentHTML('beforeend', productCard);
    });

        // Call the function to add click event listeners to product icons
        addClickEventToProductIcons();
    });


// JaveScript for product details page
document.addEventListener('DOMContentLoaded', function() {
// Set up varibles    
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    const quantityInput = document.getElementById('quantity-input');
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


//  Add to cart action
// Use index to identify which product
function addToCart(productIndex) {
    const product = products[productIndex];
    const cartItem = cart.find(item => item.name === product.name);
    const quantityInput = document.getElementById('quantity-input');
    // checks if the quantityInput variable is null or undefined
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    // Ture : update quantity
    if (cartItem) {
        cartItem.quantity += quantity;
    // False : Add to cart array
    } else {
        cart.push({ name: product.name, price: product.price, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to the cart.`);
    displayCartItems();
}
// Shopping cart page
function displayCartItems() {
    const cartItems = document.getElementById('cart-items-container');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `
            <img src="${products.find(p => p.name === item.name).image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h4 class="item-name">${item.name}</h4>
                <p class="item-price">$${item.price}</p>
            </div>   
            <div class="quantity-control">
                    <button class="quantity-decrease" data-index="${index}">-</button>
                    <input id="quantity-input" value="${item.quantity}" data-index="${index}">
                    <button class="quantity-increase" data-index="${index}">+</button>
            </div>`;
        cartItems.appendChild(cartItemDiv);
    });

// Update total price
    document.getElementById('total-price').textContent ='$'+ total.toFixed(2);

    // Attach event listeners for quantity buttons
    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            }
        });
    });
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        });
    });
}
function directPay(productIndex){
    addToCart(productIndex)
    window.location.href = 'paymentPage.html';
}
// 'check out' action in shopping cart 
function checkout() {
    window.location.href = 'paymentPage.html';
}
// Checkout page 
function displayOrderSummary() {
    const orderSummary = document.getElementById('order-summary-container');
    orderSummary.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const orderItemDiv = document.createElement('div');
        orderItemDiv.className = 'order-item';

        orderItemDiv.innerHTML = `
        <img src="${products.find(p => p.name === item.name).image}" alt="${item.name}" class="item-image">
        <div class="item-details">
            <h4 class="item-name">${item.name}</h4>
            <p class="item-price">$${item.price}</p>
        </div>
        <div class="quantity-control">
            <button class="quantity-decrease" data-index="${index}">-</button>
            <input id="quantity-input" value="${item.quantity}" data-index="${index}">
            <button class="quantity-increase" data-index="${index}">+</button>
        </div>
        `;

        orderSummary.appendChild(orderItemDiv);
    });

    // Update total
    const totalDiv = document.getElementById('order-total')
    totalDiv.innerHTML = `
    <p>Total</p>
    <p> $${total.toFixed(2)}</p>
    `;
        // Attach event listeners for quantity buttons
    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayOrderSummary();
            }
        });
    });

    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayOrderSummary();
        });
    });
}

// 'pay now' action in checkout page
function payNow() {
    window.location.href = 'confirmationPage.html';
}


// Confirmation page
function displayConfirmationSummary() {
    const confirmationSummary = document.getElementById('confirmation-summary-container');
    confirmationSummary.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const confirmationItemDiv = document.createElement('div');
        confirmationItemDiv.className = 'confirmation-item';

        confirmationItemDiv.innerHTML = `
        <img src="${products.find(p => p.name === item.name).image}" alt="${item.name}" class="item-image">
        <div class="item-details">
            <h4 class="item-name">${item.name}</h4>
            <p class="item-price">$${item.price}</p>
        </div>           
        <div class="quantity-control">
            <input id="quantity-input" value="${item.quantity}">
        </div>
        `;

        confirmationSummary.appendChild(confirmationItemDiv);
    });
// Update the total price
    const totalDiv = document.getElementById('confirmation-total')

    totalDiv.innerHTML = `
        <div class="summary">
            <span><p><strong>Subtotal</strong> </p><p>$${total.toFixed(2)}</p></span>
            <span><p><strong>Shipping</strong> </p><p>Free</p></span>                  
        </div>
        <span class="total"><p><strong>Total</strong></p> <p id="item-total">$${total.toFixed(2)}</p></span>
    `;
}

// Loading cart items
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});




// Confirmation page
// Ask if user want to return to homepage
function returnHomepage() {
    window.location.href = 'index.html'
    // Empty the cart after confirmation
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Payment page
// automatically fill the form 
document.addEventListener('DOMContentLoaded', function() {
    const autofillCheckbox = document.getElementById('autofill-checkbox');

    autofillCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('region').value = 'VICTORIA';
            document.getElementById('first-name').value = 'Eva';
            document.getElementById('last-name').value = 'Fang';
            document.getElementById('company').value = '';
            document.getElementById('address').value = '7 Haideh St';
            document.getElementById('apartment').value = '';
            document.getElementById('city').value = 'Wantirna South';
            document.getElementById('state').value = 'Melbourne';
            document.getElementById('postcode').value = '3152';
            document.getElementById('email').value = 'abcgh@hotmail.com';
            document.getElementById('phone').value = '0486379039';
            document.getElementById('card-number').value = '1234 6354 8653 2738';
            document.getElementById('security-code').value = '123';
            document.getElementById('expiration').value = '12/04';
            document.getElementById('name-on-card').value = 'Eva Fang';

        } else {
            document.getElementById('region').value = '';
            document.getElementById('first-name').value = '';
            document.getElementById('last-name').value = '';
            document.getElementById('company').value = '';
            document.getElementById('address').value = '';
            document.getElementById('apartment').value = '';
            document.getElementById('city').value = '';
            document.getElementById('state').value = '';
            document.getElementById('postcode').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('card-number').value = '';
            document.getElementById('security-code').value = '';
            document.getElementById('expiration').value = '';
            document.getElementById('name-on-card').value = '';
        }
    });
});
