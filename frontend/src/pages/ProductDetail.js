import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(product.id, quantity);
    setTimeout(() => {
      setAdding(false);
      navigate('/cart');
    }, 500);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" data-testid="product-not-found">
        <p className="text-gray-600 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" data-testid="product-detail-page">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        data-testid="back-button"
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden" data-testid="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid="product-image"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4" data-testid="product-name">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600" data-testid="product-rating">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900" data-testid="product-price">${product.price.toFixed(2)}</span>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium" data-testid="product-category">
              {product.category}
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed" data-testid="product-description">
            {product.description}
          </p>

          <div className="mb-6">
            <p className="text-gray-700" data-testid="product-stock">
              <span className="font-semibold">Availability:</span>{' '}
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" data-testid="quantity-label">Quantity</label>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  data-testid="quantity-decrease"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                  min="1"
                  data-testid="quantity-input"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  data-testid="quantity-increase"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            data-testid="add-to-cart-button"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{adding ? 'Adding to Cart...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;