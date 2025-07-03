# Auto Spare Parts E-Commerce Website

## Project Overview
A fully functional automotive spare parts e-commerce website with modern design, shopping cart, product filtering, and comprehensive product catalog. Features UK market pricing in British Pounds (£).

## Architecture
- **Frontend**: Pure HTML5, CSS3, and JavaScript (no framework dependencies)
- **Styling**: Custom CSS with gradient backgrounds and responsive design
- **Storage**: LocalStorage for cart persistence
- **Images**: Local product images stored in `/images/` directory
- **JavaScript**: Vanilla JS for e-commerce functionality, form validation, and interactive effects

## Key E-Commerce Features
- **Shopping Cart System**: Add/remove items, quantity management, persistent storage
- **Product Search & Filtering**: Real-time search, category filters, price range filters
- **Product Catalog**: 6 automotive products across multiple categories
- **Pricing System**: UK market-based pricing in British Pounds (£)
- **Interactive UI**: Hover effects, animations, notifications
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Product Categories
- **Brake System**: Brake Pads (£125.00)
- **Engine Parts**: Oil Filter (£90.00) 
- **Electrical**: Spark Plug (£85.00)
- **Fluids & Oils**: Motor Oil 5W-30 (£35.00)
- **Tires & Wheels**: All-Season Tire (£180.00)
- **Battery & Power**: 12V Car Battery (£110.00)

## File Structure
```
src/
├── index.html          # Main entry point with complete e-commerce structure
├── styles.css          # E-commerce styling with cart, filters, and product layouts
├── script.js           # Shopping cart, search/filter, and interactive functionality
└── images/            # Product images
    ├── brake-pad.jpg   # Brake pads product image
    ├── oil-filter.jpg  # Oil filter product image
    ├── spark-plug.jpg  # Spark plug product image
    ├── motor-oil.jpg   # Motor oil product image
    ├── tire.jpg        # Tire product image
    └── battery.jpg     # Car battery product image
```

## Shopping Cart Features
- **Persistent Storage**: Cart contents saved in localStorage
- **Quantity Management**: Add/remove/update item quantities
- **Real-time Updates**: Live cart count and total calculation
- **Sidebar UI**: Sliding cart panel with overlay
- **Checkout Ready**: Prepared for payment integration

## Search & Filter System
- **Real-time Search**: Search by product name and description
- **Category Filtering**: Filter by product categories
- **Price Range Filtering**: Filter by price ranges (£0-50, £50-100, etc.)
- **Combined Filters**: Search and filters work together
- **Product Count Display**: Shows filtered results count
- **Clear Filters**: Reset all filters functionality

## Development Notes
- **Modern CSS**: CSS Grid, Flexbox, custom properties, responsive design
- **Vanilla JavaScript**: No external dependencies, modern ES6+ features
- **UK Market Pricing**: Researched average UK automotive parts prices
- **Accessibility**: Proper ARIA labels, keyboard navigation support
- **Performance**: Optimized images, efficient JavaScript
- **Mobile-First**: Responsive design for all screen sizes

## Ready for Backend Integration
- **Database Schema Ready**: Product structure prepared for Supabase
- **API Integration Points**: Cart, products, orders, user management
- **Authentication Ready**: User login/register functionality prepared
- **Payment Integration**: Checkout flow ready for payment processors