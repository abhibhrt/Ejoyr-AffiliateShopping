import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logomaker">Ejoyr</h1>

        {/* Menu Toggle Button for Mobile */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </div>

        {/* Navigation Links */}
        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          <li><a href="/cart">Your Cart</a></li>

          {/* Category Dropdown */}
          <li className="dropdown">
            <span onClick={() => setCategoryOpen(!categoryOpen)}>Category ▾</span>
            <ul className={categoryOpen ? "dropdown-menu show" : "dropdown-menu"}>
              <li><a href="#men">Men Section</a></li>
              <li><a href="#women">Women Section</a></li>
              <li><a href="#electronics">Electronics</a></li>
              <li><a href="#kids">Kids Section</a></li>
              <li><a href="#all">All Items</a></li>
            </ul>
          </li>

          {/* Transaction Dropdown */}
          <li className="dropdown">
            <span onClick={() => setTransactionOpen(!transactionOpen)}>Transaction ▾</span>
            <ul className={transactionOpen ? "dropdown-menu show" : "dropdown-menu"}>
              <li><a href="/transaction">Payment History</a></li>
              <li><a href="/transaction#refund">Refund Status</a></li>
            </ul>
          </li>

          <li><a href="#contact">Contact Us</a></li>
          <li><a href="/login" className="login-btn">Login</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
