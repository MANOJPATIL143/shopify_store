import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" data-testid="empty-cart">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <button 
          onClick={() => navigate('/shop')} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          data-testid="continue-shopping-button"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" data-testid="cart-page">
      <h1 className="text-4xl font-bold mb-8" data-testid="cart-title">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
          {cart.items.map(item => (
            <div key={item.productId} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4" data-testid={`cart-item-${item.productId}`}>
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
                data-testid="cart-item-image"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1" data-testid="cart-item-name">{item.name}</h3>
                <p className="text-gray-600 text-lg" data-testid="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                  data-testid="cart-item-decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold" data-testid="cart-item-quantity">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                  data-testid="cart-item-increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg" data-testid="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button 
                onClick={() => handleRemove(item.productId)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
                data-testid="cart-item-remove"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20" data-testid="order-summary">
            <h2 className="text-2xl font-bold mb-4" data-testid="summary-title">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold" data-testid="summary-subtotal">${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600" data-testid="summary-shipping">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold" data-testid="summary-total">${cart.total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold mb-3"
              data-testid="checkout-button"
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => navigate('/shop')} 
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold"
              data-testid="continue-shopping-button"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;