import React, { useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import About from "../../components/About/About";
import NotFoundImage from "../../assets/not-found.png";

function Main({ articles, loading, error, searched }) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (loading) return <p>Loading articles...</p>;

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <main>
      {articles.length > 0 ? (
        <>
          <ul className="newsCard">
            {articles.slice(0, visibleCount).map((article) => (
              <NewsCard key={article._id} article={article} />
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
