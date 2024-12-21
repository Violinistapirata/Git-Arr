//COMPONENTS
import ProductsList from "../components/ProductsList"
import Categories from "../components/Categories"
import ProductForm from "../components/ProductForm"
import CategoryForm from "../components/CategoryForm"
import { useState } from "react"
import supabase from "../supabase/config"


function AdminPage() {
  const [productForm, setProductForm] = useState({show:"none", id:""})
  const [categoryForm, setCategoryForm] = useState({show:"none", id:""})
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const { data, error } = await supabase
        .from("products_categories")
        .select("id, category_name, category_image")
        .order("id", {ascending: true})
      setCategories(data);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
        <h1>ADMIN PAGE</h1>
        <section>
            <ProductsList setProductForm={setProductForm}/>
        </section>
        <section>
            <Categories categories={categories} getCategories={getCategories} setCategoryForm={setCategoryForm}/>

        </section>
        <section>
          {(productForm.show === "add" || productForm.show === "edit") && <ProductForm productForm={productForm} setProductForm={setProductForm} /> }
          {(categoryForm.show === "add" || categoryForm.show === "edit") && <CategoryForm getCategories={getCategories} categoryForm={categoryForm} setCategoryForm={setCategoryForm} /> }
        </section>
    </div>
  )
}

export default AdminPage