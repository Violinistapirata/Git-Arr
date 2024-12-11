//DATABASE
import supabase from "../supabase/config";

//HOOKS
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

/* ----------------------------------------------- */

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  /* const {productsList} = useContext(productsListContext)
    console.log(productsList); */

  const categoriesArray = ["Classical", "Electric", "Acoustic", "Flamenco"];
  const { productId } = useParams();
  console.log(productId);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await supabase
          .from("products")
          .select("*, products_categories (category_name)")
          .eq("id", `${productId}`);
        console.log("esto es la response", response.data[0]);
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, []);

  /* productsList.filter(product => product.id == productId) */
  return (
    <>
      {product && (
        <article className="product-details-card">
          <img src={product.image} alt="guitar image" />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          {product.featured && <span>{"⭐"}</span>}
          <h4>{product.products_categories.category_name}</h4>
          <h4>{product.price}€</h4>
          <h2>
            {product.stock > 0
              ? `IN STOCK: ${product.stock}`
              : "OUT OF STOCK"}
          </h2>
          <button className="add-to-cart-button" >Add to card</button>
        </article>
      )}
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
