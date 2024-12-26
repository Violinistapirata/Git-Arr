//HOOKS
import { useEffect, useState } from "react";

//SUPABASE
import supabase from "../supabase/config";

function ProductForm({ productForm, setProductForm }) {
  console.log("productForm show:", productForm.show);
  console.log("productForm id:", productForm.id);

  const productColumns = {
    title: "",
    image: "",
    description: "",
    price: 0,
    stock: 0,
    featured: false,
  };

  const [form, setForm] = useState(productColumns);
  console.log("setForm form:", form);

  const getProduct = async (id) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, products_categories(category_name)")
        .eq("id", `${id}`);

      console.log("product from db", data);

      setForm({
        id: data[0].id,
        title: data[0].title,
        image: data[0].image,
        description: data[0].description,
        price: data[0].price,
        stock: data[0].stock,
        featured: data[0].featured,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (id, object) => {
    try {
      console.log(object);

      const { data, error } = await supabase
        .from("products")
        .update(object)
        .eq("id", id)
        .select();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (event) => {
    const value = event.target.value;
    setForm({
      ...form,
      [event.target.name]: value,
    });
  };

  /* 
const { data, error } = await supabase
  .from('products')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')
  .select()
*/

  const handleSubmit = (e) => {
    e.preventDefault();
    const editProduct = {
      title: form.title,
      image: form.image,
      description: form.description,
      price: form.price,
      stock: form.stock,
      featured: form.featured,
    };
    console.log("editProduct object", editProduct);
    if (productForm.show === "edit") {
      updateProduct(form.id, editProduct);
    }
    //props.handleAddStudent(newStudent);
  };

  useEffect(() => {
    if (productForm.show === "edit") {
      getProduct(productForm.id);
      console.log("useEffect === edit");
    }
  }, [productForm.id]);

  return (
    <form onSubmit={handleSubmit}>
      <span>Edit</span>
      {form.id && <input value={form.id} name="id" type="hidden" />}
      <div>
        <label>
          Title
          <input
            value={form.title}
            onChange={handleInput}
            name="title"
            type="text"
            placeholder="Product name"
          />
        </label>
        <label>
          Image
          <input
            value={form.image}
            onChange={handleInput}
            name="image"
            type="text"
            placeholder="Product image url"
          />
        </label>
        <label>
          Description
          <textarea
            value={form.description}
            onChange={handleInput}
            name="description"
            type="text"
            placeholder="Product description"
            rows="5"
          />
        </label>
        <label>
          Price €
          <input
            value={form.price}
            onChange={handleInput}
            name="price"
            type="number"
            placeholder="Product price"
          />
        </label>
        <label>
          Stock
          <input
            value={form.stock}
            onChange={handleInput}
            name="stock"
            type="number"
            placeholder="Products in stock"
          />
        </label>

        {/* 
                

			price: form.price,
			stock: form.stock,
			featured: form.featured,

                 */}

        <button type="submit">Save</button>
      </div>
    </form>
  );
}
export default ProductForm;
