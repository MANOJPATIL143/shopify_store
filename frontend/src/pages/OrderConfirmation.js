import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Package, MapPin } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${API}/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" data-testid="order-not-found">
        <p className="text-gray-600 text-lg">Order not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" data-testid="order-confirmation-page">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8" data-testid="success-header">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2" data-testid="confirmation-title">Order Confirmed!</h1>
          <p className="text-gray-600" data-testid="confirmation-message">Thank you for your purchase. Your order has been received.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6" data-testid="order-details">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-xl font-bold" data-testid="order-number">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Status</p>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium" data-testid="order-status">
                {order.status}
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold mb-1">Shipping Address</p>
                <p className="text-gray-600 text-sm" data-testid="shipping-address">
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold mb-1">Contact Information</p>
                <p className="text-gray-600 text-sm" data-testid="contact-info">
                  Email: {order.shippingAddress.email}<br />
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6" data-testid="order-items">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.productId} className="flex items-center space-x-4" data-testid={`order-item-${item.productId}`}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  data-testid="item-image"
                />
                <div className="flex-1">
                  <p className="font-semibold" data-testid="item-name">{item.name}</p>
                  <p className="text-sm text-gray-600" data-testid="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold" data-testid="item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold" data-testid="order-subtotal">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-green-600" data-testid="order-shipping">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span data-testid="order-total">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            data-testid="continue-shopping-button"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => window.print()} 
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold"
            data-testid="print-order-button"
          >
            Print Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;