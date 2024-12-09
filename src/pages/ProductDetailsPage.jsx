import { useParams } from "react-router-dom"

function ProductDetailsPage({productsList}) {
    const categoriesArray = ["Classical", "Electric", "Acoustic", "Flamenco"]
    const {productId} = useParams()
    const product = productsList.filter(product => product.id === productId)
  return (
    <article className="product-details-card">
        <img src={product.image} alt="guitar image" />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
       {product.featured && <span>{"⭐"}</span>}
       <h4>{categoriesArray[product.category]} guitarr</h4>
        <h2>{product.stock > 0? `IN STOCK: ${product.stock}` : "OUT OF STOCK"}</h2>
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