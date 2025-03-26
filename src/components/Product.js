import React, { useState } from 'react';
import './product.css';
import product from './product.json'

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(product.images);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value); 
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const calculateDiscountedPrice = () => {
    return product.price - (product.price * product.discount) / 100;
  };

  return (
    <div className="product-details-container">
      <div className="product-main">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${product.name} thumbnail ${index}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="breadcrumb">
            <span>Home</span> &gt; <span>{product.category}</span> 
            {product.subCategory && (
              <>
                &gt; <span>{product.subCategory}</span>
              </>
            )}
          </div>

          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-meta">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < product.rating ? 'filled' : ''}`}>
                  {i < product.rating ? '★' : '☆'}
                </span>
              ))}
              <span className="rating-count">({product.reviewCount} reviews)</span>
            </div>
            <div className="availability">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>

          <div className="price-section">
            {product.discount > 0 && (
              <>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="discount-percent">-{product.discount}%</span>
              </>
            )}
            <div className="current-price">
              ${calculateDiscountedPrice().toFixed(2)}
            </div>
          </div>

          <div className="product-description">
            <p>{product.shortDescription}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={decrementQuantity}>-</button>
              <input 
                type="number" 
                min="1" 
                max="10" 
                value={quantity} 
                onChange={handleQuantityChange}
              />
              <button onClick={incrementQuantity}>+</button>
            </div>
            <button className="add-to-cart" disabled={!product.inStock}>
              Add to Cart
            </button>
            <button className="buy-now" disabled={!product.inStock}>
              Buy Now
            </button>
          </div>

          <div className="product-meta-details">
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            {product.subCategory && (
              <div className="meta-item">
                <span className="meta-label">Sub Category:</span>
                <span className="meta-value">{product.subCategory}</span>
              </div>
            )}
            <div className="meta-item">
              <span className="meta-label">Brand:</span>
              <span className="meta-value">{product.brand}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SKU:</span>
              <span className="meta-value">{product.sku}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={activeTab === 'description' ? 'active' : ''}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={activeTab === 'specifications' ? 'active' : ''}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>
        
        <div className="tabs-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <h3>Product Details</h3>
              <p>{product.longDescription}</p>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="specifications-content">
              <table>
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index}>
                      <td className="spec-name">{spec.name}</td>
                      <td className="spec-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-content">
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <span className="review-author">{review.author}</span>
                      <span className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'filled' : ''}>
                            {i < review.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </span>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-body">
                      <h4>{review.title}</h4>
                      <p>{review.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to review this product!</p>
              )}
              
              <div className="add-review">
                <h3>Write a Review</h3>
                <form>
                  <div className="form-group">
                    <label>Rating</label>
                    <select>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Review title" />
                  </div>
                  <div className="form-group">
                    <label>Review</label>
                    <textarea rows="4" placeholder="Your review"></textarea>
                  </div>
                  <button type="submit" className="submit-review">Submit Review</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Example product data
ProductDetails.defaultProps = {
  product: {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    subCategory: null,
    brand: 'SoundMaster',
    sku: 'SM-WH-2023',
    price: 199.99,
    discount: 15,
    inStock: true,
    rating: 4.5,
    reviewCount: 42,
    shortDescription: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    longDescription: 'These premium wireless headphones deliver exceptional sound quality with active noise cancellation technology. Enjoy up to 30 hours of battery life, comfortable over-ear design, and crystal-clear calls with built-in microphone. Perfect for music lovers and professionals alike.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Foldable design',
      'Includes carrying case'
    ],
    specifications: [
      { name: 'Color', value: 'Black' },
      { name: 'Connectivity', value: 'Bluetooth 5.0' },
      { name: 'Battery Life', value: '30 hours' },
      { name: 'Charging Time', value: '2 hours' },
      { name: 'Weight', value: '250g' },
      { name: 'Warranty', value: '1 year' }
    ],
    images: [
      'https://example.com/headphones1.jpg',
      'https://example.com/headphones2.jpg',
      'https://example.com/headphones3.jpg',
      'https://example.com/headphones4.jpg'
    ],
    reviews: [
      {
        author: 'Alex Johnson',
        rating: 5,
        date: '2023-05-15',
        title: 'Amazing sound quality!',
        content: 'These headphones exceeded my expectations. The noise cancellation works perfectly and the sound is crystal clear.'
      },
      {
        author: 'Sarah Miller',
        rating: 4,
        date: '2023-04-22',
        title: 'Great but a bit heavy',
        content: 'Love the sound quality and battery life, but they are a bit heavy for long wearing sessions.'
      }
    ]
  }
};

export default ProductDetails;