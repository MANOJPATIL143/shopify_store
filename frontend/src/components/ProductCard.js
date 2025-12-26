import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setAdding(true);
    await addToCart(product.id);
    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          data-testid="product-image"
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded" data-testid="low-stock-badge">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded" data-testid="out-of-stock-badge">
            Out of Stock
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1" data-testid="product-name">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2" data-testid="product-description">{product.description}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600" data-testid="product-rating">{product.rating}</span>
          </div>
          <span className="ml-2 text-sm text-gray-500" data-testid="product-reviews">({product.reviews} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900" data-testid="product-price">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            data-testid="add-to-cart-button"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{adding ? 'Added!' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;