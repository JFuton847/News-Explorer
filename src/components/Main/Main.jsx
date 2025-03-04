import React, { useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import About from "../../components/About/About";

function Main({ articles, loading, error }) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <main>
      <ul className="newsCards">
        {articles.slice(0, visibleCount).map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
      </ul>
      {visibleCount < articles.length && (
        <div className="newsCards__show-more-button-container">
          <button
            className="newsCards__show-more-button"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}
      <About />
    </main>
  );
}

export default Main;
