import React from "react";
import '../styles/home.css';
import ProductsPage from './AllProducts'

export default function Home({ products }) {
  const object = {
    image: "https://asia.dynabook.com/assets_new/images/Dynabook-animation-X40-K.gif",
    title: "Electronics Collection"
  };

  return (
    <div className="container">
      <img src={object.image} className="home-bg" alt="background" />
      <section className="section-home flex-row center">
        <div className="home-left flex-col">
          <span className="home-title">{object.title}</span>
          <h1 className="flex-row center">All Products are in <br />
            Best Quality & Best Price</h1>
          <p>Let's Enjoy With Ejoyr</p>
          <div className="flex-row social-media center">
            <a href="https://www.facebook.com/profile.php?id=61574006632071" className="fa-brands fa-facebook"> </a>
            <a href="https://www.instagram.com/teamejoyr/" className="fa-brands fa-instagram"> </a>
            <a href="https://t.me/teamejoyr" className="fa-brands fa-telegram"> </a>
            <a href="https://x.com/TeamEjoyr" className='fa-brands fa-x-twitter'> </a>
          </div>
        </div>
        <div className="home-right">
          <img src={object.image} id="right-image" className="home-right-image" alt="Product Display" />
        </div>
      </section>
      <ProductsPage products={products}/>
    </div>
  );
};