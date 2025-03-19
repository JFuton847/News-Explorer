import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logoutButton from "../../assets/logout-button.png";
import logoutButtonOther from "../../assets/logout-button-other.png";
import "./MobileMenu.css";

function MobileMenu({
  isOpen,
  closeMenu,
  isLoggedIn,
  currentUser,
  handleLogout,
  setActiveModal,
  isSavedArticlesPage, // Added to control styles like in Header.jsx
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Retain the same logout image logic as Header.jsx
  const logoutButtonImage = isSavedArticlesPage
    ? logoutButtonOther
    : logoutButton;

  return (
    <>
      {/* Overlay: when clicked, closes the menu */}
      {isOpen && (
        <div className="mobileMenu__overlay" onClick={closeMenu}></div>
      )}
      <div className={`mobileMenu ${isOpen ? "open" : ""}`}>
        {/* NewsExplorer header (same as in Header.jsx) */}
        <div className="mobileMenu__header">
          <h1
            className="nav__header-name"
            style={{
              color: isSavedArticlesPage ? "#1a1b22" : "",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
              closeMenu();
            }}
          >
            NewsExplorer
          </h1>
        </div>

        {/* Navigation links (exactly as in Header.jsx) */}
        <div className="mobileMenu__links">
          <Link
            to="/"
            className={`nav__link ${
              location.pathname === "/" ? "nav__link_active" : ""
            }`}
            style={{
              color: isSavedArticlesPage ? "#1a1b22" : "rgba(182, 188, 191, 1)",
            }}
            onClick={closeMenu}
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
                onClick={closeMenu}
              >
                Saved articles
              </Link>
              <a
                href="#"
                className="nav__logout"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                  closeMenu();
                }}
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
              onClick={(e) => {
                e.preventDefault();
                setActiveModal("login");
                closeMenu();
              }}
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
      </div>
    </>
  );
}

export default MobileMenu;
