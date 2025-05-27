import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/home.css';
import ProductsPage from './AllProducts';

export default function Home({ products = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate slides
  useEffect(() => {
    if (products.length === 0 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === products.length - 1 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [products.length, isHovered]);


  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span className="brand-name">Ejoyr</span></h1>
          <p className="hero-subtitle">Discover premium products at unbeatable prices</p>
          <a href="#products" className="hero-cta">Shop Now</a>
        </div>
      </div>

      {/* Featured Products Slider */}
      <section className="product-slider-section">
        <h2 className="section-title">Featured Products</h2>
        <div 
          className="product-slider"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {products.map((product, index) => (
              <div key={product._id} className="slide">
                <Link to={`/products/${product._id}`}>
                  <div className="product-card">
                    <div className="product-badge">
                      {product.discount > 0 && (
                        <span className="discount-badge">-{product.discount}%</span>
                      )}
                    </div>
                    <img 
                      src={product.images?.[0] || 'https://via.placeholder.com/300'} 
                      alt={product.title} 
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3>{product.title}</h3>
                      <div className="price">
                        {product.discount > 0 && (
                          <span className="original-price">₹{product.price}</span>
                        )}
                        <span className="current-price">
                          ₹{Math.ceil(product.price * (1 - (product.discount || 0) / 100))}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button 
            className="slider-nav prev"
            onClick={() => setCurrentSlide(prev => prev === 0 ? products.length - 1 : prev - 1)}
          >
            &lt;
          </button>
          <button 
            className="slider-nav next"
            onClick={() => setCurrentSlide(prev => prev === products.length - 1 ? 0 : prev + 1)}
          >
            &gt;
          </button>
          <div className="slider-dots">
            {products.slice(0, 5).map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide % 5 ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <ProductsPage products={products} />
    </div>
  );
};