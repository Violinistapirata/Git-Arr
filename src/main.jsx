import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//ROUTES
import { HashRouter as Router } from "react-router-dom";

//CONTEXTS
import { CartProvider } from "./Contexts/cart.context.jsx";
import { SearchProviderWrapper } from "./Contexts/search.context.jsx";

//COMPONENTS
import App from "./App.jsx";

//STYLES
import "./index.css";

/* ----------------------------------------------- */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <CartProvider>
        <SearchProviderWrapper>
          <App />
        </SearchProviderWrapper>
      </CartProvider>
    </Router>
  </StrictMode>
);
