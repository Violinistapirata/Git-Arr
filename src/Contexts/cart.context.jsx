import { createContext } from "react";
import { useState, useEffect } from "react";
import supabase from "../supabase/config";

const cartContext = createContext();

const getPrice = (cart) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  let roundedToTwo = Number(total.toFixed(2));

  return roundedToTwo;

};

function CartProvider(props) {
  const [cart, setCart] = useState([]);
  const totalPrice = getPrice(cart);
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

       // AQUi pondremos la data del cart "product_ids

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
      console.error(error);
    }
  };

  const addItem = async (item) => {
    try {
      
      const cartIds = cart.map((cartItem) => cartItem.id);
      const newCart = [...cartIds, item.id];
      // supabase inserta el row entero de la tabla cart
      const { data, error } = await supabase
        .from("cart")
        .update([{ product_ids: newCart }])
        .eq("id", "88763458-4058-47c6-aa6e-ecfa042e409f");
      

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

  // supabase elimina el item del cart buscandolo por id actualizando el arreglo del carrito entero
  const deleteItem = async (item) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== item.id);

    const productsFromObjectToString = newCart.map((cartItem) => cartItem.id);
    const { error } = await supabase
      .from("cart")
      .update([{ product_ids: productsFromObjectToString }])
      .eq("id", "88763458-4058-47c6-aa6e-ecfa042e409f");

    if (error) {
      console.error(error);
    }

    
    setCart(newCart);
  };

  const updateItem = async (item) => {
    let supabaseCart = [];
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return item;
      }
      return cartItem;
    });

    newCart.forEach((newCartItem) => {
      const newQuantity = new Array(newCartItem.quantity).fill(newCartItem.id);
      supabaseCart = [...supabaseCart, ...newQuantity];
    });

    
    const { error } = await supabase
      .from("cart")
      .update([{ product_ids: supabaseCart }])
      .eq("id", "88763458-4058-47c6-aa6e-ecfa042e409f");

    setCart(newCart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <cartContext.Provider
      value={{ cart, addItem, deleteItem, updateItem, totalPrice }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

export { cartContext, CartProvider };
