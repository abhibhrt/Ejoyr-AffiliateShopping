import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - About */}
        <div className="footer-about">
          <h2>Ejoyr</h2>
          <p>Bringing you the best quality products at unbeatable prices. Enjoy shopping with us!</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-media center">
            <a href="https://www.facebook.com/" className="fa-brands fa-facebook"> </a>
            <a href="https://www.linkedin.com/" className="fa-brands fa-linkedin"> </a>
            <a href="https://github.com/" className="fa-brands fa-github"> </a>
            <a href="https://x.com/" className="fa-brands fa-x-twitter"> </a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ejoyr. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
