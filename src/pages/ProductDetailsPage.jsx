//CONTEXT
import { productsListContext } from "../Contexts/productsList.context"

//HOOKS
import { useParams } from "react-router-dom"
import { useContext } from "react"

/* ----------------------------------------------- */

function ProductDetailsPage() {
    const {productsList} = useContext(productsListContext)
    console.log(productsList);
    
    const categoriesArray = ["Classical", "Electric", "Acoustic", "Flamenco"]
    const {productId} = useParams()
    const product = productsList.filter(product => product.id == productId)
    console.log(product);
    
  return (
    <article className="product-details-card">
        <img src={product[0].image} alt="guitar image" />
        <h1>{product[0].title}</h1>
        <p>{product[0].description}</p>
       {product[0].featured && <span>{"⭐"}</span>}
       <h4>{categoriesArray[product[0].category]} guitarr</h4>
       <h4>{product[0].price}€</h4>
        <h2>{product[0].stock > 0? `IN STOCK: ${product[0].stock}` : "OUT OF STOCK"}</h2>
        <button className="add-to-cart-button" >Add to card</button>
    </article>
  )
}
/* >TITLE: {product.title}</li>
        <li>CATEGORY: {product.category}</li>
        <li>CREATED AT: {product.created_at}</li>
        <li>DESCRIPTION: {product.description}</li>
        <li>FEATURED: {product.featured}</li>
        <li>IMAGE: {product.image}</li>
        <li>PRICE: {product.price}</li>
        <li>STOCK: {product.s */
export default ProductDetailsPage
