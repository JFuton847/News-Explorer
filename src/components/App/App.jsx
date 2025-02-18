import { useState } from "react";
import "./App.css";
import "../../components/Header/header.css";
import SearchForm from "../../components/SearchForm/SearchForm"; // Import SearchBar

function App() {
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query); // You can replace this with actual filtering logic
  };

  return (
    <div className="App">
      <div className="App__content">
        <header className="header">
          <div className="header__container">
            <h1 className="header__header-name">NewsExplorer</h1>
            <div className="header__user-container">
              <button>Home</button>
              <button>Saved articles</button>
              <button>James</button>
            </div>
          </div>
          <h2 className="header__header-text">What's going on in the world?</h2>
          <p className="header__subheader-text">
            Find the latest news on any topic and save them in your account
          </p>
          <div className="header__search">
            <SearchForm onSearch={handleSearch} /> {/* Add search bar here */}
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
