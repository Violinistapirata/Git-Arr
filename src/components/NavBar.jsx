import logo from "../assets/logo.png";
import cart from "../assets/cart-logo.svg";
import "./NavBar.css";
import { Link } from "react-router-dom";
// import CartPage from "../pages/CartPage";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import supabase from "../supabase/config";

function NavBar() {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		async function getCategories() {
			try {
				const { data, error } = await supabase
					.from("products_categories")
					.select("id, category_name, category_image");
				setCategories(data);
				if (error) {
					throw error;
				}
			} catch (error) {
				console.error(error);
			}
		}
		getCategories();
	}, []);

	return (
		<>
			<nav className="nav">
				<div className="nav-left">
					<Link to="/">
						<img className="logo" src={logo} />
					</Link>
					<Link to="/">
						{" "}
						<h1 className="brand-name">Git-Arr</h1>{" "}
					</Link>
				</div>
				<SearchBar />
				<div className="nav-right">
					<Link to="/cart">
						<img className="cart" src={cart} alt="Cart" />
					</Link>
				</div>
			</nav>
			<div className="categories">
				<ul className="category-list">
					{categories ? (
						categories.map((category) => {
							return (
								<Link to={`/category/${category.id}`} key={category.id}>
									<li className="list">{category.category_name}</li>
								</Link>
							);
						})
					) : (
						<p>No categories available</p>
					)}
				</ul>
			</div>
		</>
	);
}

export default NavBar;
