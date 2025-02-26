import "./header.css";
import SearchForm from "../../components/SearchForm/SearchForm";

function Header({ onSearch, setActiveModal, isLoggedIn, currentUser }) {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__header-name">NewsExplorer</h1>
        <div className="header__user-container">
          <button className="header__home-button">Home</button>

          {isLoggedIn ? (
            <>
              <button className="header__saved-articles-button">
                Saved articles
              </button>
              <button className="header__logout-button">
                {currentUser?.name || "Anonymous"}
                <img
                  src="../../components/assets/logout-button.png"
                  alt="Logout"
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
      <h2 className="header__header-text">What's going on in the world?</h2>
      <p className="header__subheader-text">
        Find the latest news on any topic and save them in your account
      </p>
      <div className="header__search">
        <SearchForm onSearch={onSearch} />
      </div>
    </header>
  );
}

export default Header;
