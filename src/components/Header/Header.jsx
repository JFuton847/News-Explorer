import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import Link
import SearchForm from "../../components/SearchForm/SearchForm";
import logoutButton from "../../assets/logout-button.png";
import logoutButtonOther from "../../assets/logout-button-other.png";
import hamburgerIconBlack from "../../assets/hamburger-icon-black.svg";
import hamburgerIconWhite from "../../assets/hamburger-icon-white.svg";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
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
  const location = useLocation();

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const logoutButtonImage = isSavedArticlesPage
    ? logoutButtonOther
    : logoutButton;

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
              ? "1px solid #D1D2D6"
              : "1px solid #FFFFFF",
        }}
      >
        <h1
          className="nav__header-name"
          style={{
            color: isSavedArticlesPage ? "#1a1b22" : "",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          NewsExplorer
        </h1>
        {/* Standard nav links for larger screens */}
        <div className="nav__links">
          <Link
            to="/"
            className={`nav__link ${
              location.pathname === "/" ? "nav__link_active" : ""
            }`}
            style={{
              color: isSavedArticlesPage ? "#1a1b22" : "rgba(182, 188, 191, 1)",
            }}
          >
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/saved-articles"
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
              >
                Saved articles
              </Link>
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

        <div className="header__hamburger-container" onClick={toggleMobileMenu}>
          <img
            src={isSavedArticlesPage ? hamburgerIconBlack : hamburgerIconWhite}
            alt="Menu"
            className={`hamburger-icon ${
              isSavedArticlesPage
                ? "hamburger-icon-black"
                : "hamburger-icon-white"
            }`}
          />
        </div>
      </div>

      {/* Show search only on non-mobile views */}
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

      {/* Render MobileMenu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        closeMenu={() => setIsMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleLogout={handleLogout}
        setActiveModal={setActiveModal}
      />
    </header>
  );
}

export default Header;
