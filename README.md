# AutoPartsUK - E-Commerce Website

🚗 **Professional automotive spare parts e-commerce website with modern design and full shopping cart functionality.**

## 🌟 Live Demo
- **GitHub Pages**: `https://[username].github.io/autopartsuk/`
- **Target Domain**: `autopartsuk.tk` (Freenom)

## ✨ Features

### 🛒 E-Commerce Functionality
- **Shopping Cart System** - Add/remove items, quantity management
- **Product Search & Filtering** - Real-time search, category and price filters
- **Persistent Storage** - Cart contents saved in localStorage
- **Responsive Design** - Mobile-first approach

### 💷 UK Market Pricing
- **Sterling Currency** - All prices in British Pounds (£)
- **Market Research Based** - Real automotive parts pricing
- **Price Range Filtering** - £0-50, £50-100, £100-200, £200+

### 📦 Product Catalog
- **6 Product Categories**: Brake System, Engine Parts, Electrical, Fluids & Oils, Tires & Wheels, Battery & Power
- **Product Images**: High-quality automotive parts images
- **Stock Management**: In-stock indicators and availability

## 🚀 Quick Start

### Option 1: GitHub Pages Deployment

1. **Fork this repository**
2. **Go to Settings > Pages**
3. **Select source**: Deploy from a branch
4. **Choose branch**: main
5. **Save and wait 2-3 minutes**
6. **Access**: `https://[username].github.io/autopartsuk/`

### Option 2: Local Development

```bash
# Clone repository
git clone https://github.com/[username]/autopartsuk.git
cd autopartsuk

# Open in browser
open index.html
# or
python -m http.server 8000
```

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **Storage**: localStorage for cart persistence
- **Images**: Optimized automotive parts photos
- **No Dependencies**: Pure vanilla JavaScript

## 📁 Project Structure

```
autopartsuk/
├── index.html          # Main entry point
├── styles.css          # All styling and responsive design
├── script.js           # Shopping cart and interactive functionality
├── images/            # Product images
│   ├── brake-pad.jpg
│   ├── oil-filter.jpg
│   ├── spark-plug.jpg
│   ├── motor-oil.jpg
│   ├── tire.jpg
│   └── battery.jpg
├── README.md          # This file
└── YOUWARE.md         # Development documentation
```

## 🎯 Products & Pricing

| Product | Category | Price |
|---------|----------|-------|
| Brake Pads | Brake System | £125.00 |
| Oil Filter | Engine Parts | £90.00 |
| Spark Plug | Electrical | £85.00 |
| Motor Oil 5W-30 | Fluids & Oils | £35.00 |
| All-Season Tire | Tires & Wheels | £180.00 |
| 12V Car Battery | Battery & Power | £110.00 |

## 🌐 Custom Domain Setup

### Step 1: Get Free Domain
1. Visit [Freenom.com](https://freenom.com)
2. Search for `autopartsuk.tk`
3. Register for free (up to 12 months)

### Step 2: Connect to GitHub Pages
1. Go to repository **Settings > Pages**
2. Add custom domain: `autopartsuk.tk`
3. Wait for DNS verification
4. Enable "Enforce HTTPS"

### Step 3: Configure DNS
In Freenom DNS settings:
```
Type: CNAME
Name: www
Target: [username].github.io

Type: A
Name: @
Target: 185.199.108.153
Target: 185.199.109.153
Target: 185.199.110.153
Target: 185.199.111.153
```

## 🛡️ Features Ready for Production

- ✅ Responsive design for all devices
- ✅ SEO-friendly structure
- ✅ Fast loading optimized images
- ✅ Cross-browser compatibility
- ✅ Accessible design (ARIA labels)
- ✅ Error handling and validation

## 🔮 Future Enhancements

- 🔄 **Supabase Integration** - Database for products and orders
- 👤 **User Authentication** - Customer accounts and login
- 💳 **Payment Processing** - Stripe/PayPal integration
- 📧 **Email Notifications** - Order confirmations
- 📊 **Analytics** - Google Analytics integration

## 📞 Support

For questions about this project:
- 📧 Create an issue in this repository
- 💬 Contact via GitHub Discussions
- 🌐 Visit [youware.com](https://youware.com) for AI development tools

---

**Made with ❤️ using [Youware](https://youware.com) - AI-powered web development platform**