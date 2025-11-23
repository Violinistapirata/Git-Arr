//DATABASE
import supabase from "../supabase/config";

//CONTEXT
import { createContext } from "react"

//HOOKS
import { useState, useEffect } from "react";

/* ----------------------------------------------- */

const productsListContext = createContext()

function ProductsListProviderWrapper(props) {

  //STATES
  const [productsList, setProductsList] = useState([]);
    
  
  const getData = async () => {
    const { data, error } = await supabase.from("products").select("*");
    error ? console.error(error) : setProductsList(data);
    
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <productsListContext.Provider
    value={{
     productsList
    }}
  >
    {props.children}
  </productsListContext.Provider>
  )
}

export {ProductsListProviderWrapper, productsListContext}