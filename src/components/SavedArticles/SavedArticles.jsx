import React, { useEffect, useState } from "react";
import { saveArticle, getItems } from "../../utils/api.js";
import NewsCard from "../../components/NewsCard/NewsCard";
import "../Header/Header.css";
import "./SavedArticles.css";

function SavedArticles({ currentUser }) {
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    // Assuming you want to save fetched articles:
    getItems()
      .then((articles) => {
        setSavedArticles(articles);
        const allKeywords = articles.flatMap((article) => article.keywords);
        setKeywords([...new Set(allKeywords)]);
      })
      .catch((error) => {
        console.error("Error fetching saved articles:", error);
      });
  }, []);

  const keywordsText = `By Keywords: ${keywords.join(", ")}`;

  return (
    <div className="savedArticles">
      <div className="savedArticles__container">
        {" "}
        {/* New container */}
        <h1 className="savedArticles__pageName-text">Saved articles</h1>
        <h2 className="savedArticles__header-text">
          {currentUser?.name}, you have {savedArticles.length} saved articles
        </h2>
        <p className="savedArticles__keywords-text">
          By Keywords:{" "}
          <span
            style={{
              fontFamily: '"Roboto", "Inter", sans-serif',
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "24px",
            }}
          >
            {keywords.join(", ")}
          </span>
        </p>
        <ul className="newsCards">
          {savedArticles.map((article) => (
            <NewsCard key={article._id} article={article} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SavedArticles;
