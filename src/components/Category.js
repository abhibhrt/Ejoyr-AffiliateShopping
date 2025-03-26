import React from "react";
import "./categories.css";

const categories = [
  { name: "Electronics", image: "https://t4.ftcdn.net/jpg/03/64/41/07/360_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8.jpg" },
  { name: "Fashion", image: "https://www.cato.org/sites/cato.org/files/styles/aside_3x/public/2023-11/fast-fashion2.jpeg?itok=72ek8bxI" },
  { name: "Home Decor", image: "https://static01.nyt.com/images/2021/02/28/realestate/26diyextra-slide-EVOY/26diyextra-slide-EVOY-articleLarge.jpg?quality=75&auto=webp&disable=upscale" },
];

export default function Categories() {
  return ( 
    <section className="categories-section">
      <h2 className="categories-title">Explore Categories</h2>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-overlay">
              <span className="category-name">{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
