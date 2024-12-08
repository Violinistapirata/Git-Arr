//DATABASE
import supabase from "../supabase/config";

//HOOKS
import { useState, useEffect } from "react";

//COMPONENTS
import ProductCard from "./ProductCard";

//STYLES
import "./ProductList.css"

/* ------------------------------------------------------- */

function ProductList() {
  //STATES
  const [productsList, setProductsList] = useState([]);

  //
  const getData = async () => {
    const { data, error } = await supabase.from("products").select("*");
    error ? console.error(error) : setProductsList(data);
    console.log("THIS IS THE PRODUCTS LIST FROM THE DATABASE", productsList);
  };

  useEffect(() => {
    getData();
  }, []);

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

export default ProductList;
