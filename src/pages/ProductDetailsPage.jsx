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
          .select("*")
          .eq("id", `${productId}`);
          console.log("esto es la response", response);
          setProduct(response);
        } catch (error) {
            console.error(error);
        }
    };
    getProduct();
}, []);

/* productsList.filter(product => product.id == productId) */
  return (
    <>

  {product&&  <article className="product-details-card">
      <img src={product[0].image} alt="guitar image" />
      <h1>{product[0].title}</h1>
      <p>{product[0].description}</p>
      {product[0].featured && <span>{"⭐"}</span>}
      <h4>{categoriesArray[product[0].category]} guitarr</h4>
      <h4>{product[0].price}€</h4>
      <h2>
        {product[0].stock > 0
          ? `IN STOCK: ${product[0].stock}`
          : "OUT OF STOCK"}
      </h2>
    </article>}
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
