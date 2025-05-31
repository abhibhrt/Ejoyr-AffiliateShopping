import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/selectedProduct.css';

const SelectedProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fet = await fetch(`${process.env.REACT_APP_API}/api${location.pathname}`);
        if (fet.status === 200) {
          const data = await fet.json();
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.log(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="product-loading-container">
        <div className="product-loading-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="product-loading-text">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="productNotFoundContainer">
        <i className="fas fa-search productNotFoundIcon"></i>
        <h2 className="productNotFoundTitle">Product Not Found</h2>
        <p className="productNotFoundMessage">
          We couldn't find the product you're looking for.
          It might be unavailable or the ID might be incorrect.
        </p>
        <Link
          className="productNotFoundButton"
          to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-breadcrumb">
        <Link to="/">Home</Link> / <span>{product.title}</span>
      </div>
      <div className="product-detail-content">
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
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-meta">
            <div className="product-detail-rating">
              <p style={product.rating >= 4 ? { backgroundColor: 'green' } : { backgroundColor: 'red' }} className='rating'><span>★ </span>{product.rating}</p>
              <span className="product-detail-review-count">({product.ratingCount || 0} reviews)</span>
            </div>
            <div className="product-detail-availability">
              { product.stock > 0 ? product.stock===1? (<span className="few-stock">Only Few In Stock</span>) : (<span className="in-stock">In Stock</span>) : (<span className="out-of-stock">Out of Stock</span>) }
            </div>
          </div>
          <div className="product-detail-price">
            {product.discount > 0 && (
              <span className="product-detail-original-price">₹{Math.ceil(product.price / (1 - (product.discount || 0) / 100))}</span>
            )}
            <span className="product-detail-current-price">₹{Math.ceil(product.price)}</span>
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
              disabled={product.stock <= 0}
              style={{backgroundColor: product.stock > 0 ? product.stock===1? '#FFA500' : '#006400' : '#800000'}}>
              {product.stock > 0 ? product.stock===1? 'Hurry Up' : 'Get Now' : 'Notify Me'}
            </a>
          </div>
          <div className="product-detail-meta-footer">
            <div className="product-detail-category">
              <span>Category:</span> {product.category}
            </div>
            <div className="product-detail-brand">
              <span>Brand:</span> {product.brand}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedProduct;