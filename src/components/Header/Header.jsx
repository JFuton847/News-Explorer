import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import logoutButton from "../../assets/logout-button.png";
import logoutButtonOther from "../../assets/logout-button-other.png";
import "./Header.css";
import "../Nav/Nav.css";

function Header({
  onSearch,
  onSearchSubmit,
  setActiveModal,
  isLoggedIn,
  currentUser,
  handleLogout,
  isSavedArticlesPage,
}) {
  const navigate = useNavigate();
  const location = useLocation(); // For determining active link
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const logoutButtonImage = isSavedArticlesPage
    ? logoutButtonOther
    : logoutButton;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className="header"
      style={{
        backgroundColor: isSavedArticlesPage ? "rgba(255, 255, 255, 1)" : "",
        backgroundImage: isSavedArticlesPage ? "none" : "",
      }}
    >
      <div
        className="header__container"
        style={{
          borderBottom:
            location.pathname === "/saved-articles"
              ? "1px solid #D1D2D6" // border for saved articles page
              : "1px solid #FFFFFF", // border for home page
        }}
      >
        <h1
          className="nav__header-name"
          style={{
            color: isSavedArticlesPage ? "#1a1b22" : "",
            cursor: "pointer", // Add a pointer cursor to indicate it's clickable
          }}
          onClick={() => navigate("/")}
        >
          NewsExplorer
        </h1>

        <nav className="nav">
          <button
            className={`nav__menu-button ${
              isMenuOpen ? "nav__menu-button_open" : ""
            }`}
            onClick={toggleMenu}
          >
            <span className="nav__menu-line"></span>
            <span className="nav__menu-line"></span>
            <span className="nav__menu-line"></span>
          </button>

          <div className={`nav__links ${isMenuOpen ? "nav__links_open" : ""}`}>
            <a
              href="#"
              className={`nav__link ${
                location.pathname === "/" ? "nav__link_active" : ""
              }`}
              style={{
                color: isSavedArticlesPage
                  ? "#1a1b22"
                  : "rgba(182, 188, 191, 1)",
              }}
              onClick={() => navigate("/")}
            >
              Home
            </a>

            {isLoggedIn && (
              <>
                <a
                  href="#"
                  className={`nav__link ${
                    location.pathname === "/saved-articles"
                      ? "nav__link_active"
                      : ""
                  }`}
                  style={{
                    color: isSavedArticlesPage
                      ? "#1a1b22"
                      : "rgba(182, 188, 191, 1)",
                    borderBottom:
                      location.pathname === "/saved-articles"
                        ? "2px solid #1a1b22"
                        : "2px solid transparent",
                  }}
                  onClick={() => navigate("/saved-articles")}
                >
                  Saved articles
                </a>
                <a
                  href="#"
                  className="nav__logout"
                  onClick={handleLogout}
                  style={{
                    color: isSavedArticlesPage ? "#1a1b22" : "",
                    border: isSavedArticlesPage ? "1px solid #1a1b22" : "",
                  }}
                >
                  {currentUser?.name || "Anonymous"}
                  <img
                    src={logoutButtonImage}
                    alt="Logout"
                    className="nav__logout-image"
                  />
                </a>
              </>
            )}

            {!isLoggedIn && (
              <a
                href="#"
                className="nav__login"
                onClick={() => setActiveModal("login")}
                style={{
                  color: isSavedArticlesPage ? "#1a1b22" : "white",
                  border: isSavedArticlesPage
                    ? "1px solid #1a1b22"
                    : "1px solid white",
                }}
              >
                Sign in
              </a>
            )}
          </div>
        </nav>
      </div>

      {!isSavedArticlesPage && (
        <>
          <h2 className="header__header-text">What's going on in the world?</h2>
          <p className="header__subheader-text">
            Find the latest news on any topic and save them in your personal
            account
          </p>
          <div className="header__search">
            <SearchForm onSearch={onSearch} onSearchSubmit={onSearchSubmit} />
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
