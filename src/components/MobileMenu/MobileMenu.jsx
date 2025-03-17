import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MobileMenu.css";

function MobileMenu({
  isOpen,
  closeMenu,
  isLoggedIn,
  currentUser,
  handleLogout,
  setActiveModal,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <>
      {/* Overlay: when clicked, closes the menu */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      )}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <ul className="mobile-menu-list">
          <li
            className="mobile-menu-item"
            onClick={() => handleNavigation("/")}
          >
            Home
          </li>
          {isLoggedIn && (
            <li
              className="mobile-menu-item"
              onClick={() => handleNavigation("/saved-articles")}
            >
              Saved articles
            </li>
          )}
          <li className="mobile-menu-item">
            {isLoggedIn ? (
              <div
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                {currentUser?.name || "Anonymous"}
              </div>
            ) : (
              <div
                onClick={() => {
                  setActiveModal("login");
                  closeMenu();
                }}
              >
                Sign in
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default MobileMenu;
