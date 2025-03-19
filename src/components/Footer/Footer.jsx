import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__nav-container">
        <nav className="footer__text-links">
          <Link to="/" className="footer__home-button">
            Home
          </Link>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__tripleTen-button"
          >
            TripleTen
          </a>
        </nav>
        <div className="footer__icon-links">
          <a
            href="https://github.com/JFuton847/News-Explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__github-button"
          ></a>
          <a
            href="https://www.facebook.com/tripleten.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__facebook-button"
          ></a>
        </div>
      </div>
      <p className="footer__text">© 2025 Supersite, Powered by News API</p>
    </footer>
  );
}

export default Footer;
