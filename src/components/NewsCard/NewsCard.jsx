import { useState, useEffect, useRef } from "react";
import "../../components/NewsCard/NewsCard.css";
import { saveArticle } from "../../utils/api";

function NewsCard({ article, isSavedPage, onDelete, isLoggedIn, keywords }) {
  const [savedArticles, setSavedArticles] = useState(new Set());
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const savedArticleIds =
      JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(new Set(savedArticleIds));
  }, []);

  const handleSaveClick = (article, e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowTooltip(true); // Show tooltip if not logged in
      return;
    }

    let savedArticlesArray =
      JSON.parse(localStorage.getItem("savedArticlesDetails")) || [];

    // Use the keywords passed as props (e.g., "Seinfeld")
    const searchKeywords = keywords || []; // This should be the search term(s) you used
    console.log("Saving article with keywords:", searchKeywords); // Debugging line

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
      saveArticle(article, searchKeywords) // Pass searchKeywords here
        .then((savedArticle) => {
          console.log("Saved article:", savedArticle); // Debugging line

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

  return (
    <li className="newsCard__card" key={article.url}>
      {isSavedPage ? (
        <>
          <button
            className="newsCard__card-delete-button"
            onClick={() => onDelete(article.url)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          ></button>
          {showTooltip && (
            <div ref={tooltipRef} className="newsCard__card-tooltip">
              Remove from saved
            </div>
          )}
        </>
      ) : (
        <>
          <button
            className={`newsCard__card-save-button ${
              savedArticles.has(article.url) ? "active" : ""
            }`}
            onClick={(e) => handleSaveClick(article, e)}
            onMouseEnter={() => !isLoggedIn && setShowTooltip(true)} // Show tooltip when not logged in
            onMouseLeave={() => setShowTooltip(false)}
          ></button>
          {showTooltip && !isLoggedIn && (
            <div ref={tooltipRef} className="newsCard__card-tooltip">
              Sign in to save articles
            </div>
          )}
        </>
      )}
      <div className="newsCard__card-image-container">
        <img
          src={article.imageUrl}
          alt="News Image"
          className="newsCard__card-image"
        />
      </div>
      <div className="newsCard__content">
        <p className="newsCard__card-date-text">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2 className="newsCard__card-title">{article.title}</h2>
        <p className="newsCard__card-article-text">{article.description}</p>
        <p className="newsCard__card-source-text">{article.source.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
