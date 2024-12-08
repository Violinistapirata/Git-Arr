import logo from "../assets/logo.png";
import cart from "../assets/cart-logo.svg";
import glass from "../assets/glass.svg";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <img className="logo" src={logo} />
          <h1 className="brand-name">Git-Arr</h1>
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
          <img className="cart" src={cart} alt="Cart" />
        </div>
      </nav>
      <div className="categories">
        <ul className="category-list">
          <li className="list">Classic guitars</li>
          <li className="list">Acoustic guitars</li>
          <li className="list">Flamenco guitars</li>
          <li className="list">Electric guitars</li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
