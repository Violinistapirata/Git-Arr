//COMPONENTS
import ProductsList from "../components/ProductsList"
import Categories from "../components/Categories"


function AdminPage() {
  return (
    <div>
        <h1>ADMIN PAGE</h1>
        <h2>Products</h2>
        <section>
            <ProductsList/>
        </section>
        <h2>Categories</h2>
        <section>
            <Categories/>
        </section>
    </div>
  )
}

export default AdminPage