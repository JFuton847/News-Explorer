import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__nav-container">
        <nav className="footer__text-links">
          <button className="footer__home-button">Home</button>
          <button className="footer__tripleTen-button">TripleTen</button>
        </nav>
        <div className="footer__icon-links">
          <button className="footer__github-button"></button>
          <button className="footer__facebook-button"></button>
        </div>
      </div>
      <p className="footer__text">© 2025 Supersite, Powered by News API</p>
    </footer>
  );
}

export default Footer;
