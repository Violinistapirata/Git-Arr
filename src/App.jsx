//COMPONENTS
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>} />
       {/* <div className="page-container">*/}
          <Route path="/product/:productId" element={<ProductDetailsPage/>}/>
          <Route path="/cart" element={<CartPage/>} />
          <Route path="*" element={<ErrorPage/>}/>
       { /*</div>*/}
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
