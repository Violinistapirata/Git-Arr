import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//ROUTES
import { BrowserRouter as Router } from "react-router-dom";

//CONTEXTS
import { ProductsListProviderWrapper } from "./Contexts/productsList.context.jsx";

//COMPONENTS
import App from "./App.jsx";

//STYLES
import "./index.css";
import { CartProvider } from "./Contexts/cart.context.jsx";

/* ----------------------------------------------- */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <CartProvider>
        <ProductsListProviderWrapper>
          <App />
        </ProductsListProviderWrapper>
      </CartProvider>
    </Router>
  </StrictMode>
);
