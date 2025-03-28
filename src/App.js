import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Categories from './components/Category';
import Product from './components/Product';
import ProductsPage from './components/ProductPage';

const HomePage = ({ object, setLoading }) => {
  return (
    <>
      <Home image={object.image} title={object.title} setLoading={setLoading} />
      <Blog />
      <Categories />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(false);

  const object = {
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2023/SS23/MFD_june/men.gif",
    title: "Winter Collection"
  };

  return (
    <Router>
      <div className="body-container">
        {loading && <div className="loading flex-row center"><span className="loader"></span></div>}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage object={object} setLoading={setLoading} />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:idnumber" element={<Product />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
