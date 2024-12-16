//CONTEXT
// import { productsListContext } from "../Contexts/productsList.context";

//HOOKS
import { useEffect, useState } from "react";

//COMPONENTS
import ProductCard from "./ProductCard";

//STYLES
import "./ProductsList.css"
import supabase from "../supabase/config";
/* ------------------------------------------------------- */

function ProductsList() {
/*     const {productsList} = useContext(productsListContext) */
    const [products, setProducts] = useState([]);
useEffect(() => {
  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select()
      setProducts(data);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  }
  getProducts();
}, [])
  return (
    <>
      <h1>Product List</h1>
      <section className="product-list">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </section>
    </>
  );
}
export default ProductsList;
