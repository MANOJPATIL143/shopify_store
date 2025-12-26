import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, ShoppingBag, TrendingUp, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${API}/products?limit=6`);
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white" data-testid="hero-section">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4" data-testid="hero-title">Welcome to ShopHub</h1>
            <p className="text-xl mb-8 text-blue-100" data-testid="hero-subtitle">
              Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, and more.
            </p>
            <button 
              onClick={() => navigate('/shop')} 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
              data-testid="shop-now-button"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50" data-testid="features-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-shipping">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center" data-testid="feature-quality">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Top-rated products only</p>
            </div>
            <div className="text-center" data-testid="feature-deals">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
              <p className="text-gray-600">Competitive pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16" data-testid="featured-products-section">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold" data-testid="featured-title">Featured Products</h2>
            <button 
              onClick={() => navigate('/shop')} 
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2"
              data-testid="view-all-button"
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12" data-testid="loading-spinner">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="product-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16" data-testid="cta-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" data-testid="cta-title">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 text-blue-100" data-testid="cta-subtitle">Join thousands of happy customers today</p>
          <button 
            onClick={() => navigate('/shop')} 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            data-testid="cta-button"
          >
            Browse Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;