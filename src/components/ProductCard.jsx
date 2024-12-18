//ROUTES
import { Link, Navigate, useLocation } from "react-router-dom";
import supabase from "../supabase/config";

/* ----------------------------------------------- */

function ProductCard({
  product: {
    image,
    title,
    price,
    id,
    products_categories: { category_name },
  },
  setEditForm,
}) {
  const location = useLocation().pathname;
  /*  const handleDelete = (e) => supabase.from("products").delete().eq("id", e.id) */
  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("THIS IS E.TARGET: ", e.target);
  };
  return (
    <div className="product-card">
      <Link to={"/product/" + id}>
        <div>
          <img className="product-image" src={image} alt="product-image" />
          <h3 className="product-title">{title}</h3>
          <h4 className="product-category">{category_name}</h4>
          <p className="product-price">{price}€</p>
        </div>
      </Link>
      {location === "/admin" && (
        <>
          {/* <button onClick={setEditForm(true)}>Edit</button>  */}
          <button>Edit</button>
          <button onClick={(e) => handleDelete(e)}>
            <img
              src="../src/assets/trash-can.png"
              alt="delete"
              className="delete-button"
            />
          </button>
        </>
      )}
    </div>
  );
}

export default ProductCard;
