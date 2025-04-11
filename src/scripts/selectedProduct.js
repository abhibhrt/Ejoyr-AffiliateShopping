import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/selectedProduct.css';

const SelectedProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <div className="product-detail-error">Product not found</div>;
  }

  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <div className="product-detail-container">
      {/* Breadcrumb Navigation */}
      <div className="product-detail-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.title}</span>
      </div>

      {/* Main Product Content */}
      <div className="product-detail-content">
        {/* Product Images */}
        <div className="product-detail-images">
          <div className="product-detail-main-image">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title} 
              className="product-detail-img"
            />
            {product.discount > 0 && (
              <span className="product-detail-discount-badge">-{product.discount}%</span>
            )}
          </div>
          <div className="product-detail-thumbnails">
            {product.images.map((img, index) => (
              img && <div key={index}
              className={`product-detail-thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}>
              <img src={img} alt={`${product.title} thumbnail ${index}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-meta">
            <div className="product-detail-rating">
              <p style={product.rating>=4?{backgroundColor:'green'}:{backgroundColor:'red'}} className='rating'><span>★ </span>{product.rating}</p>
              <span className="product-detail-review-count">({product.ratingCount || 0} reviews)</span>
            </div>
            <div className="product-detail-availability">
              {product.stock > 0 ? (
                <span className="in-stock">In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
          </div>

          <div className="product-detail-price">
            {product.discount > 0 && (
              <span className="product-detail-original-price">₹{product.price.toFixed(2)}</span>
            )}
            <span className="product-detail-current-price">₹{discountedPrice.toFixed(2)}</span>
          </div>

          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.specification && (
            <div className="product-detail-specs">
              <h3>Specifications</h3>
              <ul>
                {product.specification.split(',').map((spec, i) => (
                  <li key={i}>{spec.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-detail-actions">
           
            <a href={product.affiliate || ''}
               className="product-detail-add-to-cart"
               disabled={product.stock <= 0}>
              {product.stock > 0 ? 'Buy Now' : 'Notify Me'}
            </a>
            
            {/* <button className="product-detail-wishlist">
              ♡ Add to Wishlist
            </button> */}
          </div>

          <div className="product-detail-meta-footer">
            <div className="product-detail-category">
              <span>Category:</span> {product.category}
            </div>
            <div className="product-detail-brand">
              <span>Brand:</span> {product.brand}
            </div>
            {product.supplier && (
              <div className="product-detail-supplier">
                <span>Supplier:</span> {product.supplier}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedProduct;