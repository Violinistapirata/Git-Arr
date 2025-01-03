import { createContext } from "react";
import { useState, useEffect } from "react";
import supabase from "../supabase/config";

const cartContext = createContext();

function CartProvider(props) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      // Obtengo cart table con supabase
      const supabaseCart = await supabase
        .from("cart")
        .select("*")
        .eq("id", "88763458-4058-47c6-aa6e-ecfa042e409f"); // Aqui deber;iamos buscar un cart en concreto

      const cartProductIds = supabaseCart.data[0].product_ids;

      if (supabaseCart.error) {
        return console.error(error);
      }

      // obtengo los productos de supabase filtrados por los ids del carrito
      const products = await supabase
        .from("products")
        .select("*")
        .in("id", cartProductIds); // este codigo estaba dentro del array del console.log -> cart.data[0].product_id

      console.log("these are the products", products); // AQUi pondremos la data del cart "product_ids

      // en productos, busco los que coinciden con los del carrito y asigno las cantidades a cada uno de los productos
      const productsWithQuantity = products.data.map((product) => {
        const quantity = cartProductIds.filter(
          (productId) => productId === product.id
        ).length;

        return {
          ...product,
          quantity,
        };
      });

      setCart(productsWithQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (item) => {
    try {
      console.log({ item });
      const cartIds = cart.map((cartItem) => cartItem.id);
      const newCart = [...cartIds, item.id];
      // supabase inserta el row entero de la tabla cart
      const { data, error } = await supabase
        .from("cart")
        .update([{ product_ids: newCart }])
        .eq("id", "88763458-4058-47c6-aa6e-ecfa042e409f");
      console.log({ data, error });

      //buscamos si el carrito existe,si existe lo incrementa y si no existe lo agrega
      const existingProduct = cart.findIndex(
        (existingCartItem) => existingCartItem.id === item.id
      );

      if (existingProduct !== -1) {
        const cartWithUpdatedQuantity = cart.map((cartElement, index) => {
          if (index === existingProduct) {
            return { ...cartElement, quantity: cartElement.quantity + 1 };
          }
          return cartElement;
        });
        setCart(cartWithUpdatedQuantity);
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    } catch (error) {
      console.error(error);
    }
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
