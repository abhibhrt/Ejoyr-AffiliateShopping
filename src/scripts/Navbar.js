import React, { useState, useEffect, useRef } from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setCategoryOpen(false);
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
    <>
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
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>

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
              <li><a href="#men">Fashion</a></li>
              <li><a href="#electronics">Electronics</a></li>
              <li><a href="#home">Home Decor</a></li>
            </ul>
          </li>
          <li><NavLink className='nav-link' to='/products'>Collections</NavLink></li>
          <li>
            <NavLink to="/adminpanel" className="nav-link">
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    <div className="forspace">.</div>
    </>
  );
};

export default Navbar;