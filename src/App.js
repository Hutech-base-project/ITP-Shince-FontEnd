import './App.css';
// React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Font Awesome
import "./fontawesome.js"
import "./assets/scss/Customer/Header_customer.scss"
import "./assets/scss/Customer/Carousel_customer.scss"
import "./assets/scss/Customer/Footer_customer.scss"
import HomeIndex from './pages/Customer/HomePage/Home_index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductIndex from './pages/Customer/ProductPage/Product_index';
import { useEffect, useState } from 'react';
import ContactIndex from './pages/Customer/ContactPage/Contact_index';


function App() {
  const [isLoading, setLoading] = useState(true);

  function someRequest() { //Simulates a request; makes a "promise" that'll run for 2.5 seconds
    return new Promise(resolve => setTimeout(() => resolve(), 800));
  }

  useEffect(() => {
    someRequest().then(() => {
      const loaderElement = document.querySelector(".preloader");
      if (loaderElement) {
        loaderElement.remove();
        setLoading(!isLoading);
      }
    });
  });

  return (
    <>
      <div className="preloader">
        <div className="preloader-inner">
          <div className="preloader-icon">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeIndex />} />
          <Route path="/product" element={<ProductIndex />} />
          <Route path="/contact" element={<ContactIndex />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
