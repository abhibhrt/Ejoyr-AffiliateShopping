import { useState } from 'react';
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Categories from './components/Category';
import Product from './components/Product'

function App() {

  const [loading, setLoading] = useState(false);

  const object = {
    image : "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2023/SS23/MFD_june/men.gif",
    title: "Winter Collection"
  }

  return (
    <div className="body-container">
    {loading && <div className='loading flex-row center'><span className='loader'></span></div>}
     <Navbar/>
     <Home image = {object.image} title={object.title} setLoading={setLoading} />
     <Blog/>
     <Categories/>
     <Product/>
     <Footer/>
    </div>
  );
}

export default App;
