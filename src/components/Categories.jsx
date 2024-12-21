//DATABASE
import supabase from "../supabase/config";

//ROUTES
import { Link, useLocation } from "react-router-dom";

//HOOKS
import { useEffect, useState } from "react";

//STYLES
import "./Categories.css";

/* ----------------------------------------------- */

function Categories({setCategoryForm}) {
  const [categories, setCategories] = useState([]);
  const location = useLocation().pathname;

  async function getCategories() {
    try {
      const { data, error } = await supabase
        .from("products_categories")
        .select("id, category_name, category_image");
      setCategories(data);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section>
      <h1>Categories</h1>
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
                      src="../src/assets/guitar-images/mock-category-icon.png" /*{category.category_image}*/
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
                        src="../src/assets/trash-ca.png"
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
