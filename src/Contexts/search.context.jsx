import { createContext } from "react";
import { useState, useEffect } from "react";
import supabase from "../supabase/config";

const searchContext = createContext();

function SearchProviderWrapper(props) {
	//STATES
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	//

	const getSearchProducts = async () => {
		try {
			
			const { data, error } = await supabase
				.from("products")
				.select("*, products_categories(category_name)")
				.textSearch("title_description", `${search}`);

			if (error) {
				throw error;
			}

			setSearchResult(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getSearchProducts();
	}, [search]);

	return (
		<searchContext.Provider
			value={{
				search,
				setSearch,
				searchResult,
			}}
		>
			{props.children}
		</searchContext.Provider>
	);
}

export { SearchProviderWrapper, searchContext };