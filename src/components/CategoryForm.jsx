//DATABASE
import supabase from "../supabase/config";

//HOOKS
import { useEffect, useState } from "react";

//COMPONENTS
import ProductImageUpload from "./ProductImageUpload";

/* ----------------------------------------------- */

function CategoryForm({getCategories, categoryForm, setCategoryForm }) {
  const categoryColumns = {
    title: "",
    image: ""
  };

  const [form, setForm] = useState(categoryColumns);
  //State for the input values
  const [inputs, setInputs] = useState({
    categoryName: "",
    categoryImage: ""
  });
  const { categoryName, categoryImage } = inputs;

  const getCategory = async () => {
    try {
      if (categoryForm.show === "edit") {
        const { data, error } = await supabase
          .from("products_categories")
          .select("id, category_name, category_image")
          .eq("id", categoryForm.id);
        setInputs({
          categoryName: data.category_name,
          categoryImage: data.category_image,
        });
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
    const value = e.target.value.length > 0 ? e.target.value : null;
    console.log("THIS IS THE INPUT VALUE: ", value);

    setInputs({ ...inputs, [e.target.name]: value });
    console.log("THIS IS INPUTS: ", { ...inputs, [e.target.name]: value });
  };

  const updateDatabase = async () => {
    try {
      if (categoryForm.show === "edit") {
        const {data, error} = await supabase
          .from("products_categories")
          .update({
            category_name: inputs.categoryName,
            category_image: inputs.categoryImage,
          })
          .eq("id", categoryForm.id);
          getCategories();
          console.log("THIS IS CATEGORY NAME FROM INPUTS: ", inputs.categoryName );
          
          console.log("THIS IS THE RESPONSE FOR THE EDIT: ", data);

          if (error) throw error;
          
      } else if (categoryForm.show === "add") {
        const {data, error} = await supabase
          .from("products_categories")
          .insert([
            { category_name: inputs.categoryName,
              category_image: inputs.categoryImage, },
          ])
          getCategories();
          console.log("THIS IS CATEGORY NAME FROM INPUTS: ", inputs.categoryName );
          
          console.log("THIS IS THE RESPONSE FOR THE ADD CATEGORY: ", data);

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
      <h1>{categoryForm.show === "add" ? "NEW" : "EDIT"} CATEGORY</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categoryName">Category name: </label>
        <input
          type="text"
          name="categoryName"
          value={categoryName}
          onChange={handleInput}
        />
        <label htmlFor="categoryImage">Category image: </label>
        <img src={form.image} className="product-form-image" />
        <input
          type="text"
          name="categoryImage"
          id="image"
          value={categoryImage}
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
    </>
  );
}
export default CategoryForm;
