import { useContext } from "react";
import { cartContext } from "../Contexts/cart.context";
import deleteLogo from "../assets/delete.svg";
import emptyCartIcon from "../assets/SadFace.svg";
import "./CartPage.css";

function CartPage() {
  const { cart, deleteItem, updateItem, totalPrice } = useContext(cartContext);
  const addQuantityToCart = async (item) => {
    const newItem = { ...item, quantity: item.quantity + 1 };
    await updateItem(newItem);
  };

  const substractQuantityToCart = async (item) => {
    if (item.quantity === 1) {
      return deleteItem(item);
    }
    const newItem = { ...item, quantity: item.quantity - 1 };
    await updateItem(newItem);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title"> This is your cart</h1>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} className="cart-image" />
            <h2 className="cart-item-title">{item.title}</h2>
            <p className="cart-item-descripcion">{item.description}</p>
            <p className="cart-item-quantity">Quantity: {item.quantity}</p>
            <p className="cart-item-price">Price: ${item.price}</p>
            <img
              src={deleteLogo}
              className="cart-item-delete"
              onClick={async () => await deleteItem(item)}
            ></img>
            <button
              className="button-increase"
              onClick={() => addQuantityToCart(item)}
            >
              +1
            </button>
            <button
              className="button-decrease"
              onClick={() => substractQuantityToCart(item)}
            >
              -1
            </button>
          </li>
        ))}
        {cart && cart.length > 0 ? (
          <p className="total-price">Total price: {totalPrice}€ </p>
        ) : (
          <p className="cart-empty-message">
            <img className="empty-cart-icon" src={emptyCartIcon}/>
            Your cart is empty!</p>

        )}
      </ul>
    </div>
  );
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
