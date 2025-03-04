import { useState } from "react";
import "../../components/NewsCard/NewsCard.css";
import { saveArticle } from "../../utils/api";

function NewsCard({ article }) {
  const [savedArticles, setSavedArticles] = useState(new Set());

  const handleSaveClick = (article) => {
    saveArticle(article)
      .then((savedArticle) => {
        setSavedArticles((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(savedArticle._id)) {
            newSet.delete(savedArticle._id); // Remove if already saved
          } else {
            newSet.add(savedArticle._id); // Add if not saved
          }
          return newSet;
        });
      })
      .catch((error) => {
        console.error("Error saving article:", error);
      });
  };

  return (
    <li className="newsCards__card" key={article._id}>
      <button
        className={`newsCards__card-save-button ${
          savedArticles.has(article._id) ? "active" : ""
        }`}
        onClick={() => handleSaveClick(article)}
      ></button>
      <div className="newsCards__card-image-container">
        <img
          src={article.imageUrl}
          alt="News Image"
          className="newsCards__card-image"
        />
      </div>
      <div className="newsCards__content">
        <p className="newsCards__card-date-text">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2 className="newsCards__card-title">{article.title}</h2>
        <p className="newsCards__card-article-text">{article.description}</p>
        <p className="newsCards__card-source-text">Source</p>
      </div>
    </li>
  );
}

export default NewsCard;
