// Enhanced Shopping Cart and E-commerce functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartDisplay();
    }

    addItem(id, name, price, image = '') {
        const existingItem = this.items.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: id,
                name: name,
                price: price,
                quantity: 1,
                image: image
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${name} added to cart!`, 'success');
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        // Update cart count
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }

        // Update cart total
        if (cartTotal) {
            cartTotal.textContent = this.getTotal().toFixed(2);
        }

        // Update cart items
        if (cartItems) {
            if (this.items.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <p>Your cart is empty</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">£${item.price.toFixed(2)}</div>
                            <div class="cart-item-controls">
                                <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                <button class="remove-item" onclick="cart.removeItem(${item.id})">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add notification styles if not exist
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    min-width: 300px;
                    animation: slideIn 0.3s ease;
                    border-left: 4px solid #28a745;
                }
                .notification-success { border-left-color: #28a745; }
                .notification-error { border-left-color: #dc3545; }
                .notification-info { border-left-color: #17a2b8; }
                .notification button {
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: #666;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }
}

// Enhanced Product Search and Filter
class ProductFilter {
    constructor() {
        this.products = Array.from(document.querySelectorAll('.product'));
        this.searchInput = document.getElementById('search-input');
        this.categoryFilter = document.getElementById('category-filter');
        this.priceFilter = document.getElementById('price-filter');
        this.productsCount = document.getElementById('products-count');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.filterProducts());
        }
        
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => this.filterProducts());
        }
        
        if (this.priceFilter) {
            this.priceFilter.addEventListener('change', () => this.filterProducts());
        }
    }

    filterProducts() {
        const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : '';
        const selectedCategory = this.categoryFilter ? this.categoryFilter.value : '';
        const selectedPriceRange = this.priceFilter ? this.priceFilter.value : '';

        let visibleCount = 0;

        this.products.forEach(product => {
            const productName = product.dataset.name || '';
            const productCategory = product.dataset.category || '';
            const productPrice = parseFloat(product.dataset.price) || 0;

            // Check search term
            const matchesSearch = !searchTerm || productName.toLowerCase().includes(searchTerm);

            // Check category
            const matchesCategory = !selectedCategory || productCategory === selectedCategory;

            // Check price range
            let matchesPrice = true;
            if (selectedPriceRange) {
                if (selectedPriceRange === '0-50') {
                    matchesPrice = productPrice >= 0 && productPrice <= 50;
                } else if (selectedPriceRange === '50-100') {
                    matchesPrice = productPrice > 50 && productPrice <= 100;
                } else if (selectedPriceRange === '100-200') {
                    matchesPrice = productPrice > 100 && productPrice <= 200;
                } else if (selectedPriceRange === '200+') {
                    matchesPrice = productPrice > 200;
                }
            }

            const isVisible = matchesSearch && matchesCategory && matchesPrice;
            
            if (isVisible) {
                product.style.display = 'block';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        // Update products count
        if (this.productsCount) {
            this.productsCount.textContent = `Showing ${visibleCount} of ${this.products.length} products`;
        }
    }

    clearFilters() {
        if (this.searchInput) this.searchInput.value = '';
        if (this.categoryFilter) this.categoryFilter.value = '';
        if (this.priceFilter) this.priceFilter.value = '';
        this.filterProducts();
    }
}

// Initialize cart and filter system
const cart = new ShoppingCart();
const productFilter = new ProductFilter();

// Global functions for HTML onclick events
function addToCart(id, name, price) {
    // Get product image
    const productElement = document.querySelector(`[data-product-id="${id}"]`);
    const image = productElement ? productElement.querySelector('.main-image img').src : '';
    
    cart.addItem(id, name, price, image);
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
        
        // Prevent body scroll when cart is open
        if (cartSidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function searchProducts() {
    productFilter.filterProducts();
}

function filterProducts() {
    productFilter.filterProducts();
}

function clearFilters() {
    productFilter.clearFilters();
}

function checkout() {
    if (cart.items.length === 0) {
        cart.showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Redirect to checkout page or show checkout modal
    window.location.href = 'checkout.html';
}

// New function for changing main product image
function changeMainImage(thumbnail, productId) {
    const product = document.querySelector(`[data-product-id="${productId}"]`);
    if (!product) return;

    const mainImage = product.querySelector('.main-image img');
    const thumbnails = product.querySelectorAll('.thumbnail');

    if (mainImage && thumbnail) {
        // Update main image
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;

        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');

        // Add smooth transition effect
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.opacity = '1';
        }, 100);
    }
}

// Enhanced form handling
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
    
    // Make products clickable to open modal
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        // Add click event to the entire product card
        product.addEventListener('click', function(e) {
            // Don't open modal if clicking on thumbnail or add to cart button
            if (e.target.closest('.thumbnail') || e.target.closest('.add-to-cart')) {
                return;
            }
            
            const productId = this.getAttribute('data-product-id');
            if (productId) {
                openProductModal(productId);
            }
        });
        
        // Add hover effect
        product.style.cursor = 'pointer';
    });
});

// Product Detail Modal Functions
const productDetails = {
    1: {
        name: "Premium Brake Pads",
        price: 125.00,
        description: "Professional-grade ceramic brake pads designed for superior stopping power and durability. Compatible with most European vehicles and engineered to provide consistent performance in all weather conditions.",
        specifications: [
            "Material: Premium ceramic compound",
            "Compatibility: European vehicles (BMW, Mercedes, Audi)",
            "Temperature Range: -40°C to 650°C",
            "Warranty: 2 years or 50,000 miles",
            "Installation: Professional recommended"
        ],
        features: [
            "Superior stopping power in wet and dry conditions",
            "Low noise and vibration technology",
            "Extended pad life with reduced dust",
            "Environmentally friendly materials",
            "Easy installation with included hardware"
        ],
        images: [
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/8f15e883279b46dfb7c0ec43049d3ee6.jpg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/01f4fb6511284217aee812c585e2fd57.jpg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/150c1fd95e964681b70872b955255533.jpg"
        ]
    },
    2: {
        name: "High-Performance Oil Filter",
        price: 90.00,
        description: "Advanced multi-layer filtration system that removes 99.5% of contaminants. Engineered for high-performance engines and extended service intervals with superior flow rates.",
        specifications: [
            "Filtration Efficiency: 99.5% at 25 microns",
            "Material: Synthetic filter media",
            "Thread Size: M20 x 1.5",
            "Capacity: 1.2 liters",
            "Service Interval: 15,000 miles"
        ],
        features: [
            "Extended service life - up to 15,000 miles",
            "Superior contaminant removal",
            "Optimized flow rate for maximum performance",
            "Anti-drain back valve included",
            "Corrosion-resistant steel construction"
        ],
        images: [
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/934120da19c5481389696d9d9e691ae1",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/6c0fcf3fd3644cf9b0a6f5eb94e5c45d.jpg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/67f939a8748c4d92848e58669d80180a.jpg"
        ]
    },
    3: {
        name: "Iridium Spark Plug",
        price: 85.00,
        description: "Ultra-fine iridium center electrode provides superior ignition performance and fuel efficiency. Designed for modern engines requiring precise spark timing and extended service life.",
        specifications: [
            "Electrode Material: Iridium/Platinum",
            "Thread Size: 14mm x 1.25",
            "Heat Range: 6",
            "Gap: 0.7mm pre-gapped",
            "Service Life: 100,000 miles"
        ],
        features: [
            "Enhanced fuel efficiency and power",
            "Consistent spark performance",
            "Corrosion and wear resistant",
            "Pre-gapped for easy installation",
            "Compatible with modern engine management"
        ],
        images: [
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/5bdeb0c9748443759bbeb1e6b0ba6adf.jpg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/fa196931d8cc42a59fd716a735a3fb04.webp",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/b39edbcac88e446c949e952ff4282573.jpg"
        ]
    },
    4: {
        name: "Premium Motor Oil 5W-30",
        price: 35.00,
        description: "Full synthetic motor oil formulated for modern engines. Provides exceptional protection against wear, deposits, and temperature extremes while maintaining optimal viscosity.",
        specifications: [
            "Viscosity: 5W-30 Full Synthetic",
            "Volume: 5 Liters",
            "API Rating: SP",
            "ACEA Rating: A3/B4",
            "Temperature Range: -35°C to 150°C"
        ],
        features: [
            "Superior engine protection",
            "Enhanced fuel economy",
            "Extended drain intervals",
            "All-season performance",
            "Reduces engine deposits and sludge"
        ],
        images: [
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/fc424e90c9454cda9345c28023217ded.jpeg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/3b2d333c379f4a65b8d86db3869cb391.jpg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/fc424e90c9454cda9345c28023217ded.jpeg"
        ]
    },
    5: {
        name: "All-Season Performance Tire",
        price: 180.00,
        description: "High-performance all-season tire engineered for superior grip, handling, and longevity. Features advanced tread compound for excellent wet and dry traction.",
        specifications: [
            "Size: 225/45R17",
            "Load Index: 94W",
            "Tread Depth: 10mm",
            "Speed Rating: W (168 mph)",
            "Tread Life: 60,000 miles"
        ],
        features: [
            "Excellent wet and dry traction",
            "Reduced road noise",
            "Enhanced fuel efficiency",
            "Durable sidewall construction",
            "Optimized tread pattern for even wear"
        ],
        images: [
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/7162c610867143168f89b134acf23dcc.jpg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/7162c610867143168f89b134acf23dcc.jpg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/7162c610867143168f89b134acf23dcc.jpg"
        ]
    },
    6: {
        name: "Heavy Duty 12V Car Battery",
        price: 110.00,
        description: "Maintenance-free AGM battery designed for modern vehicles with high electrical demands. Provides reliable starting power and excellent deep-cycle performance.",
        specifications: [
            "Voltage: 12V",
            "Capacity: 70Ah",
            "CCA: 720A",
            "Technology: AGM (Absorbed Glass Mat)",
            "Dimensions: 278 x 175 x 190mm"
        ],
        features: [
            "Maintenance-free design",
            "Superior starting power in cold weather",
            "Vibration resistant construction",
            "Extended service life",
            "Environmentally friendly recyclable"
        ],
        images: [
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/e87d3d8e5a66460f95bdd3a0d4041a43.jpg",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/2e0f5869478a4b07bf58d35fc72b00d2.png",
            "https://public.youware.com/users-website-assets/prod/6fe91ca0-869d-4694-97d8-b8ccae364fbf/8a8ba61891a54c80ae5023141a504c7e.png"
        ]
    }
};

let currentModalProduct = null;

function openProductModal(productId) {
    const modal = document.getElementById('product-modal-overlay');
    const product = productDetails[productId];
    
    if (!product || !modal) return;
    
    currentModalProduct = productId;
    
    // Update modal content
    document.getElementById('modal-product-title').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `£${product.price.toFixed(2)}`;
    document.getElementById('modal-product-description').textContent = product.description;
    
    // Update main image
    const mainImg = document.getElementById('modal-main-img');
    mainImg.src = product.images[0];
    mainImg.alt = product.name;
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.modal-thumb');
    thumbnails.forEach((thumb, index) => {
        if (product.images[index]) {
            thumb.src = product.images[index];
            thumb.alt = `${product.name} - View ${index + 1}`;
            thumb.classList.toggle('active', index === 0);
            // Ensure thumbnails are visible
            thumb.style.display = 'block';
        } else {
            // Hide unused thumbnail slots
            thumb.style.display = 'none';
        }
    });
    
    // Update specifications
    const specsList = document.getElementById('modal-product-specs');
    specsList.innerHTML = product.specifications.map(spec => `<li>${spec}</li>`).join('');
    
    // Update features
    const featuresList = document.getElementById('modal-product-features');
    featuresList.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');
    
    // Reset quantity
    document.getElementById('modal-quantity').value = 1;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentModalProduct = null;
    }
}

function changeModalImage(thumbnail) {
    const mainImg = document.getElementById('modal-main-img');
    const thumbnails = document.querySelectorAll('.modal-thumb');
    
    if (mainImg && thumbnail) {
        // Transition effect for smoother image change
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = thumbnail.src;
            mainImg.style.opacity = '1';
            
            // Update active state for thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        }, 200);
    }
}

function increaseModalQuantity() {
    const quantityInput = document.getElementById('modal-quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseModalQuantity() {
    const quantityInput = document.getElementById('modal-quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function addToCartFromModal() {
    if (!currentModalProduct) return;
    
    const product = productDetails[currentModalProduct];
    const quantity = parseInt(document.getElementById('modal-quantity').value);
    
    for (let i = 0; i < quantity; i++) {
        cart.addItem(currentModalProduct, product.name, product.price, product.images[0]);
    }
    
    closeProductModal();
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('product-modal-overlay');
    if (e.target === modal) {
        closeProductModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
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
            
            // Simulate form submission
            setTimeout(() => {
                cart.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Add scroll effects
    const handleScroll = () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 60, 114, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
            header.style.backdropFilter = 'none';
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit, .stat, .product');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Initialize thumbnail click handlers
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const productId = this.closest('.product').dataset.productId;
            changeMainImage(this, productId);
        });
    });

    // Add keyboard navigation for thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make thumbnails focusable
        thumbnail.setAttribute('tabindex', '0');
    });
});

// Form validation
function validateForm(name, email, message) {
    if (!name) {
        cart.showNotification('Please enter your name', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        cart.showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!message) {
        cart.showNotification('Please enter a message', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle cart overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cart-overlay')) {
        toggleCart();
    }
});

// Handle escape key to close cart
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Add loading states for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.alt = 'Image not available';
        });
    });
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Apply to images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add product gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle thumbnail hover effect for better UX
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', function() {
            const productId = this.closest('.product').dataset.productId;
            const mainImage = this.closest('.product').querySelector('.main-image img');
            
            // Store original image source
            if (!mainImage.dataset.originalSrc) {
                mainImage.dataset.originalSrc = mainImage.src;
            }
            
            // Preview on hover
            mainImage.style.opacity = '0.7';
            setTimeout(() => {
                mainImage.src = this.src;
                mainImage.style.opacity = '1';
            }, 150);
        });
        
        thumbnail.addEventListener('mouseleave', function() {
            const mainImage = this.closest('.product').querySelector('.main-image img');
            const activeThumbnail = this.closest('.product').querySelector('.thumbnail.active');
            
            // Restore active image
            if (activeThumbnail && activeThumbnail !== this) {
                mainImage.style.opacity = '0.7';
                setTimeout(() => {
                    mainImage.src = activeThumbnail.src;
                    mainImage.style.opacity = '1';
                }, 150);
            }
        });
    });
});