import linkedin from "../assets/linkedin.svg";
import git from "../assets/git.svg";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/about">
          <h1 className="about-us">About us</h1>
        </Link>
        <img src={linkedin} />
        <img src={git} />
      </div>
    </footer>
  );
}

export default Footer;
