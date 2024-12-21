//ROUTES
import { Routes, Route } from "react-router-dom";

//PAGES
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";

//COMPONENTS
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

/* ----------------------------------------------- */

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>} />
       {/* <div className="page-container">*/}
          <Route path="/product/:productId" element={<ProductDetailsPage/>}/>
          <Route path="/category/:categoryId" element={<CategoryPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
       { /*</div>*/}
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
