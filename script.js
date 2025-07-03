// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Validation
            if (!validateForm(name, email, message)) {
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showSuccessMessage();
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(30, 60, 114, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(30, 60, 114, 1)';
        }
    });
    
    // Add fade-in animation for products
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to products
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.style.opacity = '0';
        product.style.transform = 'translateY(30px)';
        product.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(product);
    });
});

// Form validation function
function validateForm(name, email, message) {
    const errors = [];
    
    // Name validation
    if (name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Message validation
    if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4CAF50;
            color: white;
            padding: 20px 40px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        ">
            ✓ Thank you! Your message has been sent successfully.
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Show error message
function showErrorMessage(errors) {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #f44336;
            color: white;
            padding: 20px 40px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            font-size: 16px;
            white-space: pre-line;
        ">
            ⚠ ${errors}
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 4000);
}

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        document.querySelector('.checkout-btn').disabled = true;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="images/${getProductImage(item.id)}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">£${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    document.querySelector('.checkout-btn').disabled = false;
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get product image by ID
function getProductImage(id) {
    const images = {
        1: 'brake-pad.jpg',
        2: 'oil-filter.jpg',
        3: 'spark-plug.jpg',
        4: 'motor-oil.jpg',
        5: 'tire.jpg',
        6: 'battery.jpg'
    };
    return images[id] || 'brake-pad.jpg';
}

// Add to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${name} added to cart!`, 'success');
}

// Update quantity
function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
    }
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Checkout function
function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Checkout total: £${total.toFixed(2)}. Feature coming soon!`, 'info');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
    
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10001;
            font-weight: bold;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        ">
            ${message}
        </div>
    `;
    
    // Add CSS animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart display
    updateCartDisplay();
    
    // Add hover effect to product images
    const productImages = document.querySelectorAll('.product img');
    
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add typing effect to hero text (optional enhancement)
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(typeWriter);
            }
        }, 100);
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('cart-sidebar');
        const cartLink = document.querySelector('.cart-link');
        
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !cartLink.contains(e.target)) {
            toggleCart();
        }
    });
    
    // Initialize search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    // Initialize product count display
    updateProductCount();
});

// Search and Filter Functionality
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        const productDescription = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
    updateProductCount();
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        let showProduct = true;
        
        // Category filter
        if (categoryFilter && product.getAttribute('data-category') !== categoryFilter) {
            showProduct = false;
        }
        
        // Price filter
        if (priceFilter && showProduct) {
            const price = parseInt(product.getAttribute('data-price'));
            
            switch(priceFilter) {
                case '0-50':
                    if (price > 50) showProduct = false;
                    break;
                case '50-100':
                    if (price < 50 || price > 100) showProduct = false;
                    break;
                case '100-200':
                    if (price < 100 || price > 200) showProduct = false;
                    break;
                case '200+':
                    if (price < 200) showProduct = false;
                    break;
            }
        }
        
        // Search filter
        if (searchTerm && showProduct) {
            const productName = product.getAttribute('data-name').toLowerCase();
            const productDescription = product.querySelector('.product-description').textContent.toLowerCase();
            
            if (!productName.includes(searchTerm) && !productDescription.includes(searchTerm)) {
                showProduct = false;
            }
        }
        
        product.style.display = showProduct ? 'block' : 'none';
    });
    
    updateProductCount();
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('price-filter').value = '';
    
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.style.display = 'block';
    });
    
    updateProductCount();
}

function updateProductCount() {
    const products = document.querySelectorAll('.product');
    const visibleProducts = Array.from(products).filter(product => 
        product.style.display !== 'none'
    );
    
    // Add product count display if it doesn't exist
    let countDisplay = document.querySelector('.product-count');
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.className = 'product-count';
        countDisplay.style.cssText = `
            text-align: center;
            margin: 1rem 0;
            color: #666;
            font-weight: 500;
        `;
        document.querySelector('.product-list').parentNode.insertBefore(
            countDisplay, 
            document.querySelector('.product-list')
        );
    }
    
    countDisplay.textContent = `Showing ${visibleProducts.length} of ${products.length} products`;
    
    // Show "no products found" message if needed
    if (visibleProducts.length === 0) {
        showNoProductsMessage();
    } else {
        hideNoProductsMessage();
    }
}

function showNoProductsMessage() {
    let noProductsMsg = document.querySelector('.no-products-message');
    if (!noProductsMsg) {
        noProductsMsg = document.createElement('div');
        noProductsMsg.className = 'no-products-message';
        noProductsMsg.innerHTML = `
            <div style="
                text-align: center;
                padding: 3rem;
                color: #666;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                margin: 2rem 0;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <h3 style="margin-bottom: 0.5rem; color: #333;">No products found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        document.querySelector('.product-list').parentNode.appendChild(noProductsMsg);
    }
    noProductsMsg.style.display = 'block';
}

function hideNoProductsMessage() {
    const noProductsMsg = document.querySelector('.no-products-message');
    if (noProductsMsg) {
        noProductsMsg.style.display = 'none';
    }
}