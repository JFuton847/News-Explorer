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
  isSavedArticlesPage, // This prop will control styles based on the page
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Retain the same logout image logic as in Header.jsx
  const logoutButtonImage = isSavedArticlesPage
    ? logoutButtonOther
    : logoutButton;

  return (
    <>
      {/* Overlay: when clicked, closes the menu */}
      {isOpen && (
        <div className="mobileMenu__overlay" onClick={closeMenu}></div>
      )}
      <div
        className={`mobileMenu ${isOpen ? "open" : ""}`}
        style={{
          backgroundColor: isSavedArticlesPage ? "#FFF" : "#1A1B22", // Change background based on page
        }}
      >
        {/* NewsExplorer header */}
        <div className="mobileMenu__header">
          <h1
            className="nav__header-name"
            style={{
              color: isSavedArticlesPage ? "#1A1B22" : "#FFF", // Change text color based on page
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

        {/* Navigation links */}
        <div className="mobileMenu__links">
          <Link
            to="/"
            className={`nav__link ${
              location.pathname === "/" ? "nav__link_active" : ""
            }`}
            style={{
              color: isSavedArticlesPage ? "#1A1B22" : "#FFF", // Conditional text color for Home link
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
                  color: isSavedArticlesPage ? "#1A1B22" : "#FFF", // Conditional text color for Saved Articles link
                  borderBottom:
                    location.pathname === "/saved-articles"
                      ? "2px solid #1A1B22"
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
                  color: isSavedArticlesPage ? "#1A1B22" : "#FFF", // Conditional text color for logout button
                  border: isSavedArticlesPage ? "1px solid #1A1B22" : "", // Conditional border color for logout
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
                color: isSavedArticlesPage ? "#1A1B22" : "#FFF", // Conditional text color for login
                border: isSavedArticlesPage
                  ? "1px solid #1A1B22"
                  : "1px solid #FFF", // Conditional border color for login
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
