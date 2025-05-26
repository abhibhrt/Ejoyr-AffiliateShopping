import React, { useState, useEffect, useRef } from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

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
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)} >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li><a className='nav-link' href='#products'>Shop Now</a></li>
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;