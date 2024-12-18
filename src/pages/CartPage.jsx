import { useContext } from "react";
import { cartContext } from "../Contexts/cart.context";

function CartPage() {
  const { cart } = useContext(cartContext);
  console.log(cart);
  return <div>
    <h1>Cart</h1>
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
            <img src={item.image}/>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </li>
      ))}
    </ul>
    : (<p>Your cart is empty!</p>)
  </div>;
}

export default CartPage;


/* return (
    <>
      <h1>Product List</h1>
      <section className="product-list">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </section>
    </>) */