import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setCategoryOpen(false);
        setTransactionOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        <h1 className="logo">Ejoyr</h1>

        {/* Mobile menu toggle */}
        <div 
          className={`hamburger ${menuOpen ? "open" : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="/cart" className="nav-link">Your Cart</a></li>

          {/* Category Dropdown */}
          <li className="dropdown">
            <div 
              className="dropdown-toggle"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <span>Categories</span>
              <svg className={`chevron ${categoryOpen ? "open" : ""}`} viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
            <ul className={`dropdown-menu ${categoryOpen ? "show" : ""}`}>
              <li><a href="#men">Men's Fashion</a></li>
              <li><a href="#women">Women's Fashion</a></li>
              <li><a href="#electronics">Electronics</a></li>
              <li><a href="#kids">Kids & Toys</a></li>
              <li><a href="#home">Home Decor</a></li>
            </ul>
          </li>

          {/* Transaction Dropdown */}
          <li className="dropdown">
            <div 
              className="dropdown-toggle"
              onClick={() => setTransactionOpen(!transactionOpen)}
            >
              <span>Transactions</span>
              <svg className={`chevron ${transactionOpen ? "open" : ""}`} viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
            <ul className={`dropdown-menu ${transactionOpen ? "show" : ""}`}>
              <li><a href="/transaction">Order History</a></li>
              <li><a href="/transaction#refund">Refund Status</a></li>
              <li><a href="/transaction#track">Track Order</a></li>
            </ul>
          </li>

          <li><a href="#contact" className="nav-link">Contact Us</a></li>
          <li>
            <a href="/login" className="login-btn">
              <span>Login</span>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M20 12l-6-6v5H6v2h8v5z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;