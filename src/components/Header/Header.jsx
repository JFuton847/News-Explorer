import React from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import logoutButton from "../../assets/logout-button.png";
import logoutButtonOther from "../../assets/logout-button-other.png";
import "./Header.css";

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

  // Conditionally set the logout button image based on the saved articles page
  const logoutButtonImage = isSavedArticlesPage
    ? logoutButtonOther
    : logoutButton;

  return (
    <header
      className="header"
      style={{
        backgroundColor: isSavedArticlesPage ? "rgba(255, 255, 255, 1)" : "", // Conditionally set background color
        backgroundImage: isSavedArticlesPage ? "none" : "", // Remove the background image
        borderBottom: isSavedArticlesPage
          ? "1px solid #D1D2D6"
          : "1px solid #FFFFFF",
      }}
    >
      <div className="header__container">
        <h1
          className="header__header-name"
          style={{
            color: isSavedArticlesPage ? "#1a1b22" : "", // Change color when on SavedArticles page
          }}
        >
          NewsExplorer
        </h1>
        <div className="header__user-container">
          <button
            className="header__home-button"
            onClick={() => navigate("/")}
            style={{
              color: isSavedArticlesPage ? "#1a1b22" : "", // Change color when on SavedArticles page
            }}
          >
            Home
          </button>

          {isLoggedIn ? (
            <>
              <button
                className="header__saved-articles-button"
                onClick={() => navigate("/saved-articles")}
                style={{
                  color: isSavedArticlesPage ? "#1a1b22" : "", // Change color when on SavedArticles page
                }}
              >
                Saved articles
              </button>
              <button
                className="header__logout-button"
                onClick={handleLogout}
                style={{
                  color: isSavedArticlesPage ? "#1a1b22" : "", // Change color when on SavedArticles page
                  border: isSavedArticlesPage ? "1px solid #1a1b22" : "", // Change border color when on SavedArticles page
                }}
              >
                {currentUser?.name || "Anonymous"}
                <img
                  src={logoutButtonImage} // Use the conditional image path here
                  alt="Logout"
                  className="header__logout-button-image"
                />
              </button>
            </>
          ) : (
            <button
              className="header__login-button"
              onClick={() => setActiveModal("login")}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
      {!isSavedArticlesPage && (
        <>
          <h2 className="header__header-text">What's going on in the world?</h2>
          <p className="header__subheader-text">
            Find the latest news on any topic and save them in your account
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
