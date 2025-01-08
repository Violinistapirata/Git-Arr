//COMPONENTS
import ProductsList from "../components/ProductsList";
import Categories from "../components/Categories";
import ProductForm from "../components/ProductForm";
import CategoryForm from "../components/CategoryForm";

//HOOKS
import { useState } from "react";

/* ----------------------------------------------- */

function AdminPage({ categories, getCategories }) {
  const [productForm, setProductForm] = useState({ show: "none", id: "" });
  const [categoryForm, setCategoryForm] = useState({ show: "none", id: "" });

  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <section>
        <ProductsList
          setProductForm={setProductForm}
          productForm={productForm}
        />
        <button onClick={() => setProductForm({ show: "add", id: "" })}>
          Add product
        </button>
      </section>
      <section>
        <Categories
          categories={categories}
          getCategories={getCategories}
          setCategoryForm={setCategoryForm}
        />
        <button onClick={() => setProductForm({ show: "add", id: "" })}>
          Add category
        </button>
      </section>
      <section>
        {(productForm.show === "add" || productForm.show === "edit") && (
          <ProductForm
            productForm={productForm}
            setProductForm={setProductForm}
          />
        )}
        {(categoryForm.show === "add" || categoryForm.show === "edit") && (
          <CategoryForm
            getCategories={getCategories}
            categoryForm={categoryForm}
            setCategoryForm={setCategoryForm}
          />
        )}
      </section>
    </div>
  );
}

export default AdminPage;
