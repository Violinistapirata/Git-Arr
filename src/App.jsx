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
import { useState } from "react";
import supabase from "./supabase/config.js";

/* ----------------------------------------------- */

function App() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const { data, error } = await supabase
        .from("products_categories")
        .select("id, category_name, category_image")
        .order("id", {ascending: true})
        
        
      setCategories(data);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage categories={categories} getCategories={getCategories}/>}/>
        <Route path="/about" element={<AboutPage/>} />
       {/* <div className="page-container">*/}
          <Route path="/product/:productId" element={<ProductDetailsPage/>}/>
          <Route path="/category/:categoryId" element={<CategoryPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/admin" element={<AdminPage  categories={categories} getCategories={getCategories}/>}/>
          <Route path="*" element={<ErrorPage/>}/>
       { /*</div>*/}
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
