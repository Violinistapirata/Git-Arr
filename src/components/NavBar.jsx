import logo from "../assets/logo.png";
import cartLogo from "../assets/cart-logo.svg";
import "./NavBar.css";
import { Link } from "react-router-dom";
// import CartPage from "../pages/CartPage";
import SearchBar from "./SearchBar";
import { useContext, useEffect, useState } from "react";
import supabase from "../supabase/config";
import { cartContext } from "../Contexts/cart.context";

function NavBar() {
	const [categories, setCategories] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const { cart } = useContext(cartContext);

	useEffect(() => {
		let counter = 0;
		cart.map((cartElement) => {
			counter += cartElement.quantity || 0 
			return cart;
		})
		setCartCount(counter)
	}, [cart])

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
					<Link to="/cart" className="cart-inline" >
						<img className="cart" src={cartLogo} alt="Cart" />
						<p>{cartCount}</p>
					</Link>
				</div>
			</nav>
			<div className="categories">
				<ul className="category-list">
					{categories ? (
						categories.map((category) => {
							return (
								<Link to={`/category/${category.id}`} key={category.id}>
									<li className="cat-li">{category.category_name}</li>
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
