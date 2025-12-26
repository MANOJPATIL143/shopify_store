# E-COMMERCE STORE - COMPLETE SOURCE CODE

## 🚀 Project Overview
A full-stack e-commerce demo store built with:
- **Backend**: FastAPI + MongoDB
- **Frontend**: React + Tailwind CSS + shadcn/ui
- **Features**: Product catalog, shopping cart, checkout, admin panel

---

## 📁 Project Structure

```
/app/
├── backend/
│   ├── server.py              # Main FastAPI application (521 lines)
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
│
└── frontend/
    ├── package.json          # Node.js dependencies
    ├── .env                  # Frontend environment variables
    └── src/
        ├── App.js            # Main React app with routing
        ├── App.css           # Application styles
        ├── index.js          # React entry point
        ├── index.css         # Global Tailwind styles
        │
        ├── context/
        │   └── CartContext.js    # Shopping cart state management
        │
        ├── components/
        │   ├── Header.js         # Navigation header with cart
        │   └── ProductCard.js    # Reusable product card component
        │
        └── pages/
            ├── Home.js               # Homepage with hero & featured products
            ├── Shop.js               # Product listing with filters
            ├── ProductDetail.js     # Single product page
            ├── Cart.js              # Shopping cart page
            ├── Checkout.js          # Checkout form
            ├── OrderConfirmation.js # Order success page
            └── Admin.js             # Admin product management
```

---

## 🔧 Setup & Installation

### Backend Setup
```bash
cd /app/backend
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd /app/frontend
yarn install
```

### Environment Variables

**Backend (.env)**:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
```

**Frontend (.env)**:
```
REACT_APP_BACKEND_URL=https://store-exhibit.preview.emergentagent.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

---

## 🎯 Key Features

### Backend API Endpoints

**Products**:
- `GET /api/products` - List products with filters (category, search, price)
- `GET /api/products/{id}` - Get single product
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/{id}` - Update product (admin)
- `DELETE /api/admin/products/{id}` - Delete product (admin)

**Categories**:
- `GET /api/categories` - List all categories

**Cart**:
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/{session_id}` - Get cart
- `PUT /api/cart/{session_id}/update` - Update cart item
- `DELETE /api/cart/{session_id}/item/{product_id}` - Remove item
- `DELETE /api/cart/{session_id}` - Clear cart

**Orders**:
- `POST /api/orders` - Create order
- `GET /api/orders/{order_id}` - Get order details

**Utilities**:
- `POST /api/seed` - Seed database with sample data

### Frontend Routes

- `/` - Home page
- `/shop` - All products with filters
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/order-confirmation/:orderId` - Order success
- `/admin` - Admin dashboard

---

## 🗄️ Database Models

### Product
```javascript
{
  id: string (UUID)
  name: string
  description: string
  price: float
  category: string
  image: string
  images: array[string]
  stock: integer
  rating: float
  reviews: integer
  createdAt: datetime
}
```

### Cart
```javascript
{
  id: string (UUID)
  sessionId: string
  items: array[CartItem]
  total: float
  updatedAt: datetime
}
```

### Order
```javascript
{
  id: string (UUID)
  orderNumber: string
  items: array[CartItem]
  total: float
  shippingAddress: object
  status: string
  createdAt: datetime
}
```

---

## 🎨 Frontend Components

### Context
- **CartContext**: Global shopping cart state management using React Context API

### Components
- **Header**: Navigation bar with logo, links, search, and cart icon with count
- **ProductCard**: Reusable product card with image, details, rating, and add-to-cart

### Pages
- **Home**: Hero section, features, featured products, CTA
- **Shop**: Product grid with sidebar filters (category, search, price)
- **ProductDetail**: Full product information with quantity selector
- **Cart**: Cart items with quantity controls and order summary
- **Checkout**: Shipping form with validation
- **OrderConfirmation**: Order success with details and tracking
- **Admin**: Product management table with add/edit/delete modal

---

## 🧪 Sample Data

The database is seeded with:
- **5 Categories**: Electronics, Fashion, Home & Living, Sports, Books
- **8 Products**: Headphones, Smart Watch, Denim Jacket, Running Shoes, etc.

---

## 🚀 Running the Application

### Development Mode

**Backend**:
```bash
cd /app/backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Frontend**:
```bash
cd /app/frontend
yarn start
```

### Using Supervisor (Production)
```bash
sudo supervisorctl restart all
```

---

## 📝 Key Technologies

### Backend
- FastAPI - Modern Python web framework
- Motor - Async MongoDB driver
- Pydantic - Data validation
- Python 3.x

### Frontend
- React 19 - UI library
- React Router - Routing
- Axios - HTTP client
- Tailwind CSS - Utility-first CSS
- Lucide React - Icon library
- shadcn/ui - Component library

### Database
- MongoDB - NoSQL database

---

## 🎯 Demo Features

✅ Browse products by category
✅ Search products by name/description
✅ Filter by price range
✅ Add products to cart
✅ Update cart quantities
✅ Remove items from cart
✅ Complete checkout with shipping info
✅ View order confirmation
✅ Admin: Add/Edit/Delete products
✅ Responsive design
✅ Professional UI/UX

---

## 📦 All File Locations

### Backend Files
- `/app/backend/server.py` - Main API (521 lines)
- `/app/backend/requirements.txt` - Dependencies
- `/app/backend/.env` - Environment config

### Frontend Core
- `/app/frontend/src/App.js` - Main app
- `/app/frontend/src/index.js` - Entry point
- `/app/frontend/src/App.css` - Styles
- `/app/frontend/src/index.css` - Global styles

### Context & State
- `/app/frontend/src/context/CartContext.js` - Cart management

### Components
- `/app/frontend/src/components/Header.js`
- `/app/frontend/src/components/ProductCard.js`

### Pages (7 total)
- `/app/frontend/src/pages/Home.js`
- `/app/frontend/src/pages/Shop.js`
- `/app/frontend/src/pages/ProductDetail.js`
- `/app/frontend/src/pages/Cart.js`
- `/app/frontend/src/pages/Checkout.js`
- `/app/frontend/src/pages/OrderConfirmation.js`
- `/app/frontend/src/pages/Admin.js`

### Config Files
- `/app/frontend/package.json` - Dependencies
- `/app/frontend/tailwind.config.js` - Tailwind config
- `/app/frontend/.env` - Environment vars

---

## 💡 Notes

- All products use UUID instead of MongoDB ObjectID for easier JSON serialization
- Cart persists using localStorage sessionId
- Mock checkout (no real payment integration)
- Guest checkout (no authentication required)
- All components include data-testid attributes for testing
- Responsive design works on mobile, tablet, and desktop

---

## 📞 Support

For questions or issues, refer to the actual source code files listed above.
All files are fully commented and follow React/FastAPI best practices.

---

**Built with ❤️ for demo purposes**
