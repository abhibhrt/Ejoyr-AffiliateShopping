import React, { useEffect } from "react";

export default function Home(props) {

  useEffect(() => {
    document.getElementById('right-image').addEventListener('load', () => {
      props.setLoading(false);
    })
  })

  return (
    <div className="container">
      <img src={props.image} className="home-bg" alt="background" />
      <section className="section-home flex-row center">
        <div className="home-left flex-col">
          <span className="home-title">{props.title}</span>
          <h1 className="flex-row center">All Products are in <br />
            Best Quality & Best Price</h1>
          <p>Let's Enjoy With Ejoyr</p>
          <div className="flex-row social-media center">
            <a href="https://www.facebook.com/profile.php?id=100027548940668" className="fa-brands fa-facebook"> </a>
            <a href="https://www.linkedin.com/in/abhishek-bharti7843/" className="fa-brands fa-linkedin"> </a>
            <a href="https://github.com/abhishekbharti2" className="fa-brands fa-github"> </a>
            <a href="https://x.com/AD_Jack9?t=9DGN-8JDwo4rVMXtPKXpUA&s=08" className='fa-brands fa-x-twitter'> </a>
          </div>
          <button className="stylish-btn">Explore &#8594;</button>
        </div>
        <div className="home-right">
          <img src={props.image} id="right-image" className="home-right-image" alt="Product Display" />
        </div>
      </section>
    </div>
  );
};