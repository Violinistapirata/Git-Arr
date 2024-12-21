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

function ProductsList({setProductForm}) {
/*     const {productsList} = useContext(productsListContext) */
    const [products, setProducts] = useState([]);
    async function getProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*, products_categories(category_name)")
        setProducts(data);
        console.log("THIS IS PRODUCT", data);
        
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error);
      }
    }
useEffect(() => {
  getProducts();
}, [])
  return (
    <>
      <h1>Product List</h1>
      <section className="product-list">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} getProducts={getProducts} setProductForm={setProductForm}/>;
        })}
      </section>
    </>
  );
}
export default ProductsList;
