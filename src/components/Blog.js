import React from "react";
import "./blog.css";

const products = [
  {
    id: 1,
    name: "Smart Watch Pro X",
    description: "Stay ahead with the latest Smart Watch featuring health tracking, notifications, and a sleek design.",
    image: "https://hammeronline.in/cdn/shop/files/Hammerglidebluetoothcallingsmartwatch_1.webp?v=1694851875",
    price: "₹199",
  },
  {
    id: 2,
    name: "Men's Leather Jacket",
    description: "A stylish, durable, and comfortable leather jacket for the modern man. Perfect for any occasion.",
    image: "https://images.pexels.com/photos/849835/pexels-photo-849835.jpeg",
    price: "₹149",
  },
  {
    id: 3,
    name: "Wireless Earbuds 2.0",
    description: "Crystal-clear sound, noise cancellation, and all-day battery life. The best companion for your music.",
    image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
    price: "₹99",
  },
];

const Blog = () => {
  return (
    <section className="best-products">
      <h2>Featured Products</h2>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">{product.price}</span>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
