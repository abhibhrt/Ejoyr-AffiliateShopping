import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/allProducts.css';
import debounce from 'lodash.debounce';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/amazon/search?keyword=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProducts(data.data || []);
    } catch (err) {
      console.error(err);
      setError('Error fetching Amazon products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchProducts, 1500), []);

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedFetch(searchQuery);
    } else {
      setProducts([]);
    }
  }, [searchQuery, debouncedFetch]);

  const uniqueCategories = [...new Set(products.map(p => p.category || 'Other'))].map(c => ({
    id: c.toLowerCase(),
    name: c
  }));

  const categories = [{ id: 'all', name: 'All Products' }, ...uniqueCategories];

  const filteredProducts = products.filter(p => selectedCategory === 'all' || (p.category?.toLowerCase() === selectedCategory));

  return (
    <div className="products-page" id="products">
      <div className="products-container">
        <div className="filters-sidebar">
          <div className="filters-header"><h3>Filters</h3></div>
          <div className="filter-section">
            <h4>Search</h4>
            <input
              type="text"
              placeholder="Search Amazon products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-section">
            <h4>Categories</h4>
            <ul className="category-list">
              {categories.map(cat => (
                <li
                  key={cat.id}
                  className={selectedCategory === cat.id ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="products-grid-container">
          {loading && <div className="results-count">Loading...</div>}
          {error && <div className="results-count" style={{color:'red'}}>{error}</div>}
          {!loading && !error && (
            <>
              <div className="results-count">{filteredProducts.length} {filteredProducts.length===1?'product':'products'}</div>
              {filteredProducts.length>0 ? (
                <div className="products-grid">
                  {filteredProducts.map((p,i)=>(
                    <AmazonProductCard key={i} product={p} />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <h3>No products found</h3>
                  <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setProducts([]); }}>Reset</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AmazonProductCard = ({ product }) => (
  <div className="product-card">
    <div className="product-image">
      <img src={product.image} alt={product.title} onClick={() => window.open(product.link, "_blank")} loading="lazy" />
    </div>
    <div className="product-info">
      <span className="product-name">{product.title.slice(0,40)}...</span>
      <div className="product-category">{product.category}</div>
      <div className="product-price">{product.price}</div>
      <button className="button-navigate" onClick={() => window.open(product.link, "_blank")}>Buy on Amazon</button>
    </div>
  </div>
);

export default ProductsPage;