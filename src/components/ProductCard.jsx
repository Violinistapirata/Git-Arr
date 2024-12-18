//ROUTES
import { Link } from "react-router-dom";

/* ----------------------------------------------- */

function ProductCard({
  product: {
    image,
    title,
    price,
    id,
    products_categories: { category_name },
  },
}) {
  return (
    <Link to={"/product/" + id}>
      <div className="product-card">
        <img src={image} alt="product-image" />
        <h3>{title}</h3>
        <h4>{category_name}</h4>
        <p>{price}€</p>
      </div>
    </Link>
  );
}

export default ProductCard;
