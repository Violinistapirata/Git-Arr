//CONTEXT
import { productsListContext } from "../Contexts/productsList.context";

//HOOKS
import { useContext } from "react";

//COMPONENTS
import ProductCard from "./ProductCard";

//STYLES
import "./ProductsList.css"

/* ------------------------------------------------------- */

function ProductsList() {
    const {productsList} = useContext(productsListContext)

  return (
    <>
      <h1>Product List</h1>
      <section className="product-list">
        {productsList.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </section>
    </>
  );
}
export default ProductsList;
