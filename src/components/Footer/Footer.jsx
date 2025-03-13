import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2025 Supersite, Powered by News API</p>
      <div className="footer__nav-container">
        <button className="footer__home-button">Home</button>
        <button className="footer__tripleTen-button">TripleTen</button>
        <button className="footer__github-button"></button>
        <button className="footer__facebook-button"></button>
      </div>
    </footer>
  );
}
export default Footer;
