//COMPONENTS
import ProductsList from "../components/ProductsList"
import Categories from "../components/Categories"


function AdminPage() {
  return (
    <div>
        <h1>ADMIN PAGE</h1>
        <section>
            <ProductsList/>
        </section>
        <section>
            <Categories/>
        </section>
    </div>
  )
}

export default AdminPage