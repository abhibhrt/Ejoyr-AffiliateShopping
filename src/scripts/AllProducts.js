import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/allProducts.css';

const ProductsPage = ({products}) => {

  // Extract unique categories from products data
  const uniqueCategories = [...new Set(products.map(product => product.category))].map(category => ({
    id: category.toLowerCase(),
    name: category
  }));

  // Add "All Products" option
  const categories = [
    { id: 'all', name: 'All Products' },
    ...uniqueCategories
  ];

  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products based on selections
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.price * (1 - (a.discount || 0) / 100);
    const priceB = b.price * (1 - (b.discount || 0) / 100);

    switch (sortOption) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default: // featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="products-page">
      {/* Hero Section */}
      <div className="products-hero">
        <div className="hero-content">
          <h1>{selectedCategory === 'all' ? 'Our Products' : categories.find(c => c.id === selectedCategory)?.name}</h1>
          <p>Discover amazing products at unbeatable prices</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="products-container">
        {/* Filters Sidebar - Desktop */}
        <div className={`filters-sidebar ${mobileFiltersOpen ? 'mobile-open' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button
              className="close-filters"
              onClick={() => setMobileFiltersOpen(false)}
            >
              &times;
            </button>
          </div>

          {/* Search */}
          <div className="filter-section">
            <h4>Search</h4>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="filter-section">
            <h4>Categories</h4>
            <ul className="category-list">
              {categories.map(category => (
                <li
                  key={category.id}
                  className={selectedCategory === category.id ? 'active' : ''}
                  onClick={() => setSelectedCategory(category.id)}>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid-container">
          {/* Toolbar */}
          <div className="products-toolbar">
            <button
              className="mobile-filters-btn"
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </button>
            <div className="sort-options">
              <span>Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)} >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="results-count">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="products-grid">
              {sortedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query</p>
              <button onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <div className="product-card">
      <div className="product-badge">
        {product.featured && <span className="featured-badge">Featured</span>}
        {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
      </div>
      <div className="product-image">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
        />
        <div className="product-actions">
          <Link to={`/products/${product._id}`} state={{ product }} className="quick-view">Buy Now</Link>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.title}</h3>
        <div className="product-category">
          {product.brand && `${product.brand} • `}{product.category}
        </div>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(product.rating || 0) ? 'filled' : ''}>
              {i < (product.rating || 0) ? '★' : '☆'}
            </span>
          ))}
          <span className="review-count">({product.ratingCount || 0})</span>
        </div>
        <div className="product-price">
          {product.discount > 0 && (
            <span className="original-price">₹{product.price.toFixed(2)}</span>
          )}
          <span className="current-price">₹{discountedPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;