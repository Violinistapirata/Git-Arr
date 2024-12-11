import { createContext } from "react";
import { useState, useEffect } from "react";
import supabase from "../supabase/config";

const cartContext = createContext();

function CartProvider(props) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const { data, error } = await supabase.from("cart").select("id");
    error ? console.error(error) : setCart(data);
    console.log("This is cart", cart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </cartContext.Provider>
  );
}

export { cartContext, CartProvider };
