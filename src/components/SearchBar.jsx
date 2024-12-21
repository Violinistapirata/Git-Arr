//HOOKS
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



import "./SearchBar.css";
import glass from "../assets/glass.svg";
import { searchContext } from "../Contexts/search.context";

function SearchBar() {
	const { search, setSearch } = useContext(searchContext);
    console.log(search);
    
	const navigate = useNavigate();


	const handleInput = (event) => {
		const value = event.target.value;
		setSearch(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        navigate("/search");
	};

	return (
		<form onSubmit={handleSubmit} className="search-bar">
			<input
				value={search.searchInput}
				onChange={handleInput}
				name="searchInput"
				className="search-container"
				type="text"
				placeholder="Search guitars..."
			/>
			<button type="submit" className="search-button">
				<img className="glass" src={glass} alt="Search" />
			</button>
		</form>
	);
}

export default SearchBar;
