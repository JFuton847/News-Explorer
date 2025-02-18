import { useState } from "react";
import "../../components/SearchForm/SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="searchForm__search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="searchForm"
      />
      <button className="searchForm__search-button">Search</button>
    </div>
  );
}

export default SearchForm;
