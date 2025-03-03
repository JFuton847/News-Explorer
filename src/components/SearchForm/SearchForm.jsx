import { useState } from "react";
import "../../components/SearchForm/SearchForm.css";

function SearchForm({ onSearch, onSearchSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Update the search query
  };

  const handleSearchClick = () => {
    onSearchSubmit(); // Trigger the search when button is clicked
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearchSubmit(); // Trigger the search when Enter key is pressed
    }
  };

  return (
    <div className="searchForm__search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress} // Listen for Enter key press
        className="searchForm"
      />
      <button
        className="searchForm__search-button"
        onClick={handleSearchClick} // Trigger search on button click
      >
        Search
      </button>
    </div>
  );
}

export default SearchForm;
