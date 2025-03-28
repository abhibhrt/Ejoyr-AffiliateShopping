import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './products.css';
import productsData from './allItems.json';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home Decor' }
];

const subCategories = {
  electronics: [
    { id: 'audio', name: 'Audio' },
    { id: 'wearables', name: 'Wearables' },
    { id: 'accessories', name: 'Accessories' }
  ],
  fashion: [
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'kids', name: 'Kids' }
  ],
  home: [
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'decor', name: 'Decor' },
    { id: 'furniture', name: 'Furniture' }
  ]
};

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products based on selections
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.price * (1 - a.discount / 100);
    const priceB = b.price * (1 - b.discount / 100);
    
    switch (sortOption) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  // Reset subcategory when main category changes
  useEffect(() => {
    setSelectedSubCategory('all');
  }, [selectedCategory]);

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
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategories */}
          {selectedCategory !== 'all' && (
            <div className="filter-section">
              <h4>Subcategories</h4>
              <ul className="subcategory-list">
                <li 
                  className={selectedSubCategory === 'all' ? 'active' : ''}
                  onClick={() => setSelectedSubCategory('all')}
                >
                  All {categories.find(c => c.id === selectedCategory)?.name}
                </li>
                {subCategories[selectedCategory]?.map(subCategory => (
                  <li 
                    key={subCategory.id}
                    className={selectedSubCategory === subCategory.id ? 'active' : ''}
                    onClick={() => setSelectedSubCategory(subCategory.id)}
                  >
                    {subCategory.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
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
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query</p>
              <button onClick={() => {
                setSelectedCategory('all');
                setSelectedSubCategory('all');
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
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="product-card">
      <div className="product-badge">
        {product.features && <span className="featured-badge">Featured</span>}
        {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
      </div>
      <div className="product-image">
        <img 
          src={`${product.images[0]}?w=500&h=500&fit=crop&auto=format`} 
          alt={product.name}
          loading="lazy"
        />
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="quick-view">Quick View</Link>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-category">
          {categories.find(c => c.id === product.category)?.name}
          {product.subCategory && ` • ${subCategories[product.category]?.find(sc => sc.id === product.subCategory)?.name}`}
        </div>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(product.rating) ? 'filled' : ''}>
              {i < product.rating ? '★' : '☆'}
            </span>
          ))}
          <span className="review-count">({product.reviewCount})</span>
        </div>
        <div className="product-price">
          {product.discount > 0 && (
            <span className="original-price">${product.price.toFixed(2)}</span>
          )}
          <span className="current-price">${discountedPrice.toFixed(2)}</span>
        </div>
      </div>
    </div> 
  );
};

export default ProductsPage;