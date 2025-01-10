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
              
              <article key={category.id} className="category-card">
            
                <Link to={`/category/${category.id}`}>
                  <div>
                    <img
                      src= /*"../src/assets/guitar-images/mock-category-icon.png"*/ {category.category_image}
                      alt={category.category_name}
                    />
                    <b>{category.category_name}</b>
                  </div>
                </Link>
                {location === "/admin" && (
                  <>
                    <button onClick={() => setCategoryForm({show: "edit", id: category.id})}>Edit</button>
                    <button onClick={(e) => handleDelete(e)}>
                      <img
                        src="../../public/trash-can.png"
                        alt="delete"
                        className="delete-button"
                      />
                    </button>
                  </>
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
