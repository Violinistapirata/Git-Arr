//ROUTES
import { Link } from "react-router-dom";

/* ----------------------------------------------- */

function ProductCard({ product: { image, title, category, price, id } }) {
  const categoriesArray = ["Classical", "Electric", "Acoustic", "Flamenco"];
  return (
    <Link to={"/product/" + id}>
      <div className="product-card">
        <img src={image} alt="product-image" />
        <h3>{title}</h3>
        <h4>{categoriesArray[category]} guitarr</h4>
        <p>{price}€</p>

        {/* <ul>
        <li>TITLE: {product.title}</li>
        <li>CATEGORY: {product.category}</li>
        <li>CREATED AT: {product.created_at}</li>
        <li>DESCRIPTION: {product.description}</li>
        <li>FEATURED: {product.featured}</li>
        <li>IMAGE: {product.image}</li>
        <li>PRICE: {product.price}</li>
        <li>STOCK: {product.stock}</li>
      </ul> */}
      </div>
    </Link>
  );
}

export default ProductCard;
