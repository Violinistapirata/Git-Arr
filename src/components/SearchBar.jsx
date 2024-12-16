import "./SearchBar.css";
import glass from "../assets/glass.svg";
import { useState } from "react";

function SearchBar() {
    const [search,setSearch] = useState();

	return (
		<form className="search-bar">
			<input
				className="search-container"
				type="text"
				placeholder="search guitars"
			/>
			<button className="search-button" type="button">
				<img className="glass" src={glass} alt="Search" />
			</button>
		</form>
	);
}

export default SearchBar;
