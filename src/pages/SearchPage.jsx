//CONTEXT
import { searchContext } from "../Contexts/search.context";
import { useContext } from "react";

//COMPONENTS
import ProductCard from "../components/ProductCard";

//STYLES
import "./CategoryPage.css";

/* ------------------------------------------------------- */

function SearchPage() {
	const { search, searchResult } = useContext(searchContext);

	console.log(searchResult);
	

	if (searchResult) {
		return (
			<>
				<h1>You searched for "{search}"</h1>

				<section className="product-list">
					{searchResult.map((product) => {
						return <ProductCard key={product.id} product={product} />;
					})}
				</section>
			</>
		);
	}
}

export default SearchPage;
