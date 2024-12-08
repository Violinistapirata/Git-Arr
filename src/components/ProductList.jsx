//DATABASE
import supabase from "../supabase/config";

//HOOKS
import { useState, useEffect } from "react";

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
      {productsList.map((product) => {
        return (
          <div key={product.id}>
            <ul>
              <li>TITLE: {product.title}</li>
              <li>CATEGORY: {product.category}</li>
              <li>CREATED AT: {product.created_at}</li>
              <li>DESCRIPTION: {product.description}</li>
              <li>FEATURED: {product.featured}</li>
              <li>IMAGE: {product.image}</li>
              <li>PRICE: {product.price}</li>
              <li>STOCK: {product.stock}</li>
            </ul>
          </div>
        );
      })}
      <div>ProductList</div>
    </>
  );
}

export default ProductList;
