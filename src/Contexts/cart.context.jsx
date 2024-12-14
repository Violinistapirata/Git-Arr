import { createContext } from "react";
import { useState, useEffect } from "react";
import supabase from "../supabase/config";

const cartContext = createContext();

function CartProvider(props) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    // Obtengo cart table con supabase
    const cart = await supabase.from("cart").select('*').eq('id' , '88763458-4058-47c6-aa6e-ecfa042e409f');// Aqu;i deber;iamos buscar un cart en concreto
    
    if (cart.error) {
      return console.error(error);
    }

    // Convierto el arreglo de objetos con ids en arreglo de string de ids
    //const cartIds = cart.data.map((cartProduct) => Number(cartProduct.id));
    //console.log("CART DATA: ",cart.data[0].product_ids); 
    

    // obtengo los productos de supabase filtrados por los ids del carrito
    const products_ids = await supabase
      .from("products")
      .select("*")
      .in("id", []);// este codigo estaba dentro del array del console.log -> cart.data[0].product_id 
      

    // Descomentar cuando functione el fetch de supabase a products
    //setCart(cart.data);
    console.log('this is products' , products_ids); // AQUi pondremos la data del cart "product_ids
  };

  const addItem = async (itemId) => {
// supabase inserta el row entero de la tabla cart
    const { data, error } = await supabase
      .from("cart")
      .insert([{ product_ids: itemId }])
      .select();
    
      setCart([...cart, itemId]);
  };
// supabase elimina el item del cart buscandolo por id
  const deleteItem = async (itemId) => {
    const { error } = await supabase.from("cart").delete().eq("id", itemId);
    console.log({ error });
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <cartContext.Provider value={{ cart, addItem, deleteItem }}>
      {props.children}
    </cartContext.Provider>
  );
}

export { cartContext, CartProvider };


