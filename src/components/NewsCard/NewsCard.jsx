import { useState, useEffect, useRef } from "react";
import "../../components/NewsCard/NewsCard.css";
import { saveArticle } from "../../utils/api";

function NewsCard({ article, isSavedPage, onDelete, isLoggedIn, keywords }) {
  const [savedArticles, setSavedArticles] = useState(new Set());
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  // Update savedArticles based on login status
  useEffect(() => {
    if (isLoggedIn) {
      const savedArticleIds =
        JSON.parse(localStorage.getItem("savedArticles")) || [];
      setSavedArticles(new Set(savedArticleIds));
    } else {
      // Clear saved articles state when logged out so button appears inactive
      setSavedArticles(new Set());
    }
  }, [isLoggedIn]);

  const handleSaveClick = (article, e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowTooltip(true);
      return;
    }

    let savedArticlesArray =
      JSON.parse(localStorage.getItem("savedArticlesDetails")) || [];

    // Use the keywords passed as props (e.g., "Seinfeld")
    const searchKeywords = keywords || [];
    console.log("Saving article with keywords:", searchKeywords);

    if (savedArticles.has(article.url)) {
      setSavedArticles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(article.url);

        savedArticlesArray = savedArticlesArray.filter(
          (a) => a.url !== article.url
        );
        localStorage.setItem(
          "savedArticlesDetails",
          JSON.stringify(savedArticlesArray)
        );
        localStorage.setItem(
          "savedArticles",
          JSON.stringify(Array.from(newSet))
        );

        return newSet;
      });
    } else {
      saveArticle(article, searchKeywords)
        .then((savedArticle) => {
          console.log("Saved article:", savedArticle);

          setSavedArticles((prev) => {
            const newSet = new Set(prev);
            newSet.add(savedArticle.url);

            savedArticlesArray.push(savedArticle);
            localStorage.setItem(
              "savedArticlesDetails",
              JSON.stringify(savedArticlesArray)
            );
            localStorage.setItem(
              "savedArticles",
              JSON.stringify(Array.from(newSet))
            );

            return newSet;
          });
        })
        .catch((error) => {
          console.error("Error saving article:", error);
        });
    }
  };

  // Opens the article URL in a new tab.
  const handleCardClick = () => {
    window.open(article.url, "_blank");
  };

  return (
    <li className="news-card__card" key={article.url} onClick={handleCardClick}>
      {isSavedPage ? (
        <>
          <button
            className="news-card__card-delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(article.url);
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          ></button>
          {showTooltip && (
            <div ref={tooltipRef} className="news-card__card-tooltip">
              Remove from saved
            </div>
          )}
        </>
      ) : (
        <>
          <button
            className={`news-card__card-save-button ${
              isLoggedIn && savedArticles.has(article.url) ? "active" : ""
            }`}
            onClick={(e) => handleSaveClick(article, e)}
            onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          ></button>
          {showTooltip && !isLoggedIn && (
            <div ref={tooltipRef} className="news-card__card-tooltip">
              Sign in to save articles
            </div>
          )}
        </>
      )}
      <div className="news-card__card-image-container">
        <img
          src={article.imageUrl}
          alt="News Image"
          className="news-card__card-image"
        />
      </div>
      <div className="news-card__content">
        <p className="news-card__card-date-text">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2 className="news-card__card-title">{article.title}</h2>
        <p className="news-card__card-article-text">{article.description}</p>
        <p className="news-card__card-source-text">{article.source}</p>
        {isSavedPage && keywords.length > 0 && (
          <div className="news-card__card-keyword">
            {keywords.map((keyword, index) => (
              <span key={index}>
                {keyword}
                {index < keywords.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default NewsCard;
