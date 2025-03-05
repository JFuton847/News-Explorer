import { useState, useEffect } from "react";
import "../../components/NewsCard/NewsCard.css";
import { saveArticle } from "../../utils/api";

function NewsCard({ article }) {
  // Manage saved articles state at the NewsCard level
  const [savedArticles, setSavedArticles] = useState(new Set());

  useEffect(() => {
    // Check if the article is already saved when the component is mounted
    const savedArticleIds =
      JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(new Set(savedArticleIds));
  }, []);

  const handleSaveClick = (article, e) => {
    e.stopPropagation();

    // Check if the article is already saved
    if (savedArticles.has(article._id)) {
      setSavedArticles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(article._id); // Remove article from saved
        localStorage.setItem(
          "savedArticles",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
    } else {
      setSavedArticles((prev) => {
        const newSet = new Set(prev);
        newSet.add(article._id); // Add article to saved
        localStorage.setItem(
          "savedArticles",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
    }
  };

  const handleCardClick = () => {
    window.open(article.url, "_blank");
  };

  return (
    <li className="newsCard__card" key={article._id} onClick={handleCardClick}>
      <button
        className={`newsCard__card-save-button ${
          savedArticles.has(article._id) ? "active" : ""
        }`}
        onClick={(e) => handleSaveClick(article, e)}
      ></button>
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
        <p className="newsCard__card-source-text">{article.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
