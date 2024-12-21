//COMPONENTS
import ProductsList from "../components/ProductsList"
import Categories from "../components/Categories"
import ProductForm from "../components/ProductForm"
import CategoryForm from "../components/CategoryForm"
import { useState } from "react"


function AdminPage() {
  const [productForm, setProductForm] = useState({"show":false,"id":""})
  const [categoryForm, setCategoryForm] = useState({"show":false,"id":""})
  return (
    <div>
        <h1>ADMIN PAGE</h1>
        <section>
            <ProductsList setProductForm={setProductForm}/>
        </section>
        <section>
            <Categories setCategoryForm={setCategoryForm}/>

        </section>
        <section>
          {productForm && <ProductForm setProductForm={setProductForm}/> }
          {categoryForm && <CategoryForm setCategoryForm={setCategoryForm}/> }
        </section>
    </div>
  )
}

export default AdminPage