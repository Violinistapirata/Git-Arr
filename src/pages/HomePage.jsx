import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";

function HomePage({categories, getCategories}){
    return(
        <>
        <FeaturedProducts/>
        <Categories categories={categories} getCategories={getCategories} />
        </>
    )
}

export default HomePage;