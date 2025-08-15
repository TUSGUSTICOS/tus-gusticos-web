document.addEventListener('DOMContentLoaded', function() {
    // Select key elements
    const menuItems = document.querySelectorAll('.menu-item');
    const categorySpans = document.querySelectorAll('.categories span');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-btn');
    const navbarButtons = document.querySelectorAll('.icon-btn');
    const bottomIcons = document.querySelectorAll('.bottom-icons i');
    const cartButton = document.querySelector('.icon-btn i.fa-shopping-cart');

    // Shopping cart functionality
    const cart = {
        items: [],
        total: 0,
        
        addItem(item) {
            this.items.push(item);
            this.calculateTotal();
            this.updateCartBadge();
        },
        
        removeItem(itemName) {
            this.items = this.items.filter(item => item.name !== itemName);
            this.calculateTotal();
            this.updateCartBadge();
        },
        
        calculateTotal() {
            this.total = this.items.reduce((sum, item) => sum + item.price, 0);
        },
        
        updateCartBadge() {
            let badge = cartButton.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.classList.add('cart-badge');
                cartButton.appendChild(badge);
            }
            badge.textContent = this.items.length;
            badge.style.display = this.items.length > 0 ? 'block' : 'none';
        }
    };

    // Add to cart functionality for menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('p').textContent;
            const itemPrice = parseFloat(this.querySelector('span').textContent.replace('$', '').replace('.', ''));
            
            cart.addItem({
                name: itemName,
                price: itemPrice
            });
            
            // Optional: Show a brief animation or notification
            this.classList.add('added-to-cart');
            setTimeout(() => {
                this.classList.remove('added-to-cart');
            }, 500);
        });
    });

    // Category filtering
    categorySpans.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            categorySpans.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu items (placeholder logic, you'd implement actual filtering)
            const selectedCategory = this.textContent;
            menuItems.forEach(item => {
                // This is a placeholder. You'd need more robust filtering logic
                item.style.display = 'block';
            });
        });
    });

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        menuItems.forEach(item => {
            const itemName = item.querySelector('p').textContent.toLowerCase();
            
            if (itemName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);

    // Navigation and bottom icons functionality
    navbarButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.querySelector('.fa-bars')) {
                // Open side menu
                alert('Menú lateral');
            }
        });
    });

    bottomIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            if (this.classList.contains('heart')) {
                alert('Favoritos');
            } else if (this.classList.contains('history')) {
                alert('Historial de pedidos');
            } else if (this.classList.contains('profile')) {
                alert('Perfil de usuario');
            }
        });
    });

    // Optional: Responsive design adjustments
    function adjustLayoutForScreen() {
        const screenWidth = window.innerWidth;
        const menuGrid = document.querySelector('.menu-grid');
        
        if (screenWidth < 600) {
            menuGrid.classList.add('mobile-layout');
        } else {
            menuGrid.classList.remove('mobile-layout');
        }
    }

    // Initial layout check and add resize listener
    adjustLayoutForScreen();
    window.addEventListener('resize', adjustLayoutForScreen);
});

// Optional CSS for interactions (can be moved to your CSS file)
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerHTML = `
.menu-item.added-to-cart {
    transform: scale(0.95);
    opacity: 0.7;
    transition: transform 0.3s, opacity 0.3s;
}

.cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.7em;
}
`;
document.head.appendChild(styleSheet);