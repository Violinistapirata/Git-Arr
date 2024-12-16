import "./SearchBar.css";
import glass from "../assets/glass.svg";

function SearchBar() {
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
