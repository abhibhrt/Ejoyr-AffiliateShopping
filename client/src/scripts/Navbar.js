import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ products }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = products.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    ).slice(0, 5);

    setSearchResults(results);
  }, [searchQuery, products]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    setSearchQuery('');
    setShowResults(false);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        <NavLink to="/" className="logo">
        Ejoyr
        </NavLink>
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" className="nav-link" end>Home</NavLink>
          </li>
          <li className="search-container" ref={searchRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="searchBar"
            />
            {showResults && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(product => (
                  <div 
                    key={product._id}
                    className="search-result-item"
                    onClick={() => handleProductClick(product._id)} >
                    <div className="result-title">{product.title}</div>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;