import "./ErrorPage.css";
import notFound from "../assets/errorPage.png";

function ErrorPage() {
  return (
    <div className="error-page-container">
      <h1 className="error-page-title">404</h1>
      <p className="error-text">Houston, we have a problem</p>
      <p className="error-description">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <img className="error-img" src={notFound}/>
      <a href="/" className="error-button">Go Back Home</a>
    </div>
  );
}


export default ErrorPage;



