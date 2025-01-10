//DATABASE
import supabase from "../supabase/config";

//HOOKS
import { useEffect, useState } from "react";

//COMPONENTS
import ProductImageUpload from "./ProductImageUpload";

//STYLES
import "./ProductForm.css"

/* ----------------------------------------------- */

function CategoryForm({ getCategories, categoryForm, setCategoryForm }) {
  const categoryColumns = {
    title: "",
    image: "",
  };

  const [form, setForm] = useState(categoryColumns);
  //State for the input values
  const [inputs, setInputs] = useState({
    categoryName: "",
    categoryImage: "",
  });
  const { categoryName, categoryImage } = inputs;

  const getCategory = async () => {
    try {
      if (categoryForm.show === "edit") {
        const { data, error } = await supabase
          .from("products_categories")
          .select("id, category_name, category_image")
          .eq("id", categoryForm.id);
          setForm({
            title: data[0].category_name,
          image: data[0].category_image
          })
          
          
        /* setInputs({
          categoryName: data.category_name,
          categoryImage: data.category_image,
        }); */
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getCategory, []);

  //Handle function for the inputs
  const handleInput = (e) => {
    const value = e.target.value;
    
    setForm({...form, [e.target.name]: value })
    /* setInputs({ ...inputs, [e.target.name]: value }); */
    
  };

  const updateDatabase = async () => {
    try {
      if (categoryForm.show === "edit") {
        const { data, error } = await supabase
          .from("products_categories")
          .update({
            category_name: form.title,
            category_image: form.image,
          })
          .eq("id", categoryForm.id);
        getCategories();
        

        

        if (error) throw error;
      } else if (categoryForm.show === "add") {
        const { data, error } = await supabase
          .from("products_categories")
          .insert([
            {
              category_name: form.title,
            category_image: form.image,
            },
          ]);
        getCategories();
        

        

        if (error) throw error;
      }
      setCategoryForm({ ...categoryForm, show: "none" });
    } catch (error) {
      console.error(error);
    }
  };
  //Handle function for the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    updateDatabase();
  };
  return (
    <>
      <div className="product-form-overlay">
        <div className="product-form">
          <span
            className="product-form-close-button"
            onClick={() => setCategoryForm({ show: "none", id: "" })}
          >
            &#x2715;
          </span>
          <h1>{categoryForm.show === "add" ? "NEW" : "EDIT"} CATEGORY</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Category name: </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInput}
            />
            <label htmlFor="image">Category image: </label>
            <img src={form.image} className="product-form-image" />
            <input
              type="hidden"
              name="image"
              id="image"
              value={form.image}
              onChange={handleInput}
            />
            <ProductImageUpload
              form={form}
              setForm={setForm}
              imageName={form.title}
            />
            <button type="submit">
              {categoryForm.show === "add" ? "ADD" : "UPDATE"} CATEGORY
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default CategoryForm;
