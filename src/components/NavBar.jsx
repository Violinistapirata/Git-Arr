import logo from "../assets/logo.png";
import cart from "../assets/cart-logo.svg";
import glass from "../assets/glass.svg";
import "./NavBar.css";
import {Link} from "react-router-dom"
import CartPage from "../pages/CartPage";

function NavBar() {
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
        <div className="nav-right">
          <Link to="/cart">
          <img className="cart" src={cart} alt="Cart" />
          </Link>
        </div>
      </nav>
      <div className="categories">
        <ul className="category-list">
        <Link to={"/category/1"}>
          <li className="list">Electric guitars</li>
        </Link>
        <Link to={"/category/2"}>
          <li className="list">Acoustic guitars</li>
        </Link>
        <Link to={"/category/3"}>
          <li className="list">Classic guitars</li>
        </Link>
        <Link to={"/category/4"}>
          <li className="list">Flamenco guitars</li>
        </Link>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
