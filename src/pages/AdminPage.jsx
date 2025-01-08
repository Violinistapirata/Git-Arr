//COMPONENTS
import ProductsList from "../components/ProductsList"
import Categories from "../components/Categories"
import ProductForm from "../components/ProductForm"
import CategoryForm from "../components/CategoryForm"
import { useState } from "react"

//CSS
import "./AdminPage.css"


function AdminPage({categories, getCategories}) {
  const [productForm, setProductForm] = useState({show:"none", id:""})
  const [categoryForm, setCategoryForm] = useState({show:"none", id:""})
  
  return (
    <div className="admin-page">
        <h1>ADMIN PAGE</h1>
        <section>
        <h2>Products</h2>
            <ProductsList setProductForm={setProductForm} productForm={productForm}/>
        </section>
        <section>
        <h2>Categories</h2>
            <Categories categories={categories} getCategories={getCategories} setCategoryForm={setCategoryForm}/>

        </section>
        <section>
          {(productForm.show === "add" || productForm.show === "edit") && <ProductForm productForm={productForm} setProductForm={setProductForm} /> }
          {(categoryForm.show === "add" || categoryForm.show === "edit") && <CategoryForm getCategories={getCategories} categoryForm={categoryForm} setCategoryForm={setCategoryForm} /> }
        </section>
        <button onClick={() => setProductForm({show:"add",id:""})} >Add product</button>
    </div>
  )
}

export default AdminPage