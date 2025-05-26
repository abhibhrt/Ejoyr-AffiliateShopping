import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './scripts/Home';
import Navbar from './scripts/Navbar';
import Footer from './scripts/Footer';
import Product from './scripts/selectedProduct';
import ScrollToTop from './scripts/scrollToTop';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fet = await fetch(`${process.env.REACT_APP_API}/api/products`);
        setProducts(await fet.json());
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="body-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home products={products} />}/>
          <Route path="/products/:productId" element={<Product />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
