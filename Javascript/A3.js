function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay.style.display === 'flex') {
        cartOverlay.style.display = 'none';
    } else {
        cartOverlay.style.display = 'flex';
    }
}