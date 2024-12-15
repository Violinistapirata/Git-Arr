//DATABASE
import supabase from "../supabase/config";

//ROUTES
import { Link } from "react-router-dom";

//HOOKS
import { useEffect, useState } from "react";

//STYLES
import "./Categories.css";

/* ----------------------------------------------- */

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
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
    getCategories();
  }, []);
  console.log("THIS IS CATEGORIES", categories);

  return (
    <section>
      <h1>Categories</h1>
      <div className="categories-wrapper">
        {categories ? (
          categories.map((category) => {
            return (
              <Link to={`/category/${category.id}`} key={category.id}>
                <article className="category-card">
                  <img
                    src="../src/assets/guitar-images/mock-category-icon.png" /*{category.category_image}*/
                    alt={category.category_name}
                  />
                  <b>{category.category_name}</b>
                </article>
              </Link>
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
