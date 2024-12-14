//DATABASE
import supabase from "../supabase/config";

//HOOKS
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../Contexts/cart.context";

/* ----------------------------------------------- */

function ProductDetailsPage() {
  const { addItem } = useContext(cartContext);


  const [product, setProduct] = useState({});
  const {
    image,
    title,
    description,
    featured,
    price,
    stock,
    id,
    products_categories,
  } = product;

  const { productId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await supabase
          .from("products")
          .select("*, products_categories (category_name)")
          .eq("id", `${productId}`);
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, []);

  return (
    <>
        <article className="product-details-card">
          <img src={image} alt="guitar image" />
          <h1>{title}</h1>
          <p>{description}</p>
          {featured && <span>{"⭐"}</span>}
          <h4>{products_categories?.category_name}</h4>
          <h4>{price}€</h4>
          <h2>
            {stock > 0 ? `IN STOCK: ${stock}` : "OUT OF STOCK"}
          </h2>
          <button
            className="add-to-cart-button"
            onClick={() => {
              addItem(id);
            }}
          >
            Add to cart
          </button>
         
        
        
          
        
         
        </article>
    </>
  );
}
/* >TITLE: {product.title}</li>
        <li>CATEGORY: {product.category}</li>
        <li>CREATED AT: {product.created_at}</li>
        <li>DESCRIPTION: {product.description}</li>
        <li>FEATURED: {product.featured}</li>
        <li>IMAGE: {product.image}</li>
        <li>PRICE: {product.price}</li>
        <li>STOCK: {product.s */
export default ProductDetailsPage;
