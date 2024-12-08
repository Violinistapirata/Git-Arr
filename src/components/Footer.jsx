import linkedin from "../assets/linkedin.svg";
import git from "../assets/git.svg";
import "./Footer.css";


function Footer(){
    return(
        <footer className="footer">
            <div className="footer-container" >
            <h1 className="about-us" >About us</h1>
            <img src={linkedin}/>
            <img src={git}/>
            </div>


        </footer>
    )
}

export default Footer;