import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" data-testid="main-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900" data-testid="logo-link">
            <Store className="h-6 w-6" />
            <span>ShopHub</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900" data-testid="nav-home">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-gray-900" data-testid="nav-shop">Shop</Link>
            <Link to="/admin" className="text-gray-700 hover:text-gray-900" data-testid="nav-admin">Admin</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/shop')} 
              className="p-2 hover:bg-gray-100 rounded-full"
              data-testid="search-button"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            <button 
              onClick={() => navigate('/cart')} 
              className="p-2 hover:bg-gray-100 rounded-full relative"
              data-testid="cart-button"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="cart-count">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;