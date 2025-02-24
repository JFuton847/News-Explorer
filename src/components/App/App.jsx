import { useState } from "react";
import "./App.css";
import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import NewsCard from "../../components/NewsCard/NewsCard";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <div className="App">
      <div className="App__content">
        <Header onSearch={handleSearch} />
        <About />
        <NewsCard />
        <Footer />
      </div>
    </div>
  );
}

export default App;
