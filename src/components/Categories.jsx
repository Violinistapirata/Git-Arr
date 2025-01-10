//DATABASE
import supabase from "../supabase/config";

//ROUTES
import { Link, useLocation } from "react-router-dom";

//HOOKS
import { useEffect } from "react";

//STYLES
import "./Categories.css";

/* ----------------------------------------------- */

function Categories({categories, getCategories, setCategoryForm}) {
  const location = useLocation().pathname;

  useEffect(() => {
    getCategories();
  }, []);
  
  return (
    <section>
      <div className="categories-wrapper">
        
        {categories ? (
          categories.map((category) => {
            const handleDelete = async (e) => {
              try {
                e.stopPropagation();
                const { error } = await supabase
                  .from("products_categories")
                  .delete()
                  .eq("id", category.id);
                if (error) {
                  throw error;
                }
                getCategories();
              } catch (error) {
                console.error(error);
              }
            };
            return (
              
              <article key={category.id} className="product-card">
            
                <Link to={`/category/${category.id}`}>
                  <div>
                    <img className="product-image"
                      src= {category.category_image}
                      alt={category.category_name}
                    />
                    <h3 className="product-title">{category.category_name}</h3>
                  </div>
                </Link>
                {location === "/admin" && (
                  <div className="admin-buttons">
                    <button onClick={() => setCategoryForm({show: "edit", id: category.id})} className="edit-button">Edit</button>
                    <button onClick={(e) => handleDelete(e)} className="delete-button">
                      Delete
                    </button>
                  </div>
                )}
              </article>
            );
          })
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </section>
  );
}

export default Categories;
