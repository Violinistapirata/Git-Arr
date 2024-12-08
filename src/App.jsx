//COMPONENTS
import NavBar from "./components/NavBar"
import ProductList from "./components/ProductList"
import Footer from "./components/Footer"

function App() {

  return (
    <>
     <NavBar/>
     <div className="page-container">
      <ProductList />
     </div>
     <Footer/>
    </>
  )
}

export default App
