import React, { useState, useEffect } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import About from "../../components/About/About";
import NotFoundImage from "../../assets/not-found.png";

function Main({ articles, loading, error, searched, isLoggedIn, keywords }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Ensure search query and keywords are properly set
    setSearchQuery(keywords);
  }, [keywords]);

  if (loading) return <p>Loading articles...</p>;

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <main>
      {searched && (
        <h1 className="newsCard__search-results-header">Search results</h1>
      )}
      {articles.length > 0 ? (
        <>
          <ul className="newsCard">
            {articles.slice(0, visibleCount).map((article) => (
              <NewsCard
                key={article._id}
                article={article}
                isLoggedIn={isLoggedIn}
                keywords={keywords}
                source={article.source}
              />
            ))}
          </ul>
          {visibleCount < articles.length && (
            <div className="newsCard__show-more-button-container">
              <button
                className="newsCard__show-more-button"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </>
      ) : (
        searched && (
          <div className="newsCard__no-results">
            <img
              src={NotFoundImage}
              alt="Article Not Found Image"
              className="newsCard__not-found-image"
            />
            <p className="newsCard__no-results__top-message">Nothing found</p>
            <p className="newsCard__no-results_bottom-message">
              Sorry, but nothing matched your search terms
            </p>
          </div>
        )
      )}
      <About />
    </main>
  );
}

export default Main;
