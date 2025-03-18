import React, { useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import About from "../../components/About/About";
import NotFoundImage from "../../assets/not-found.png";
import Preloader from "../../components/Preloader/Preloader";

function Main({
  articles,
  loading,
  error,
  searched,
  isLoggedIn,
  keywords,
  searchQuery,
  isSearchSubmitted,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  // Debugging logs
  console.log("searched:", searched);
  console.log("articles:", articles);

  return (
    <main>
      {isSearchSubmitted && searchQuery && (
        <h1 className="newsCard__search-results-header">Search results</h1>
      )}
      {loading ? (
        <div className="newsCard__search-results">
          <Preloader />
        </div>
      ) : articles.length > 0 ? (
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
        isSearchSubmitted &&
        searchQuery && (
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
