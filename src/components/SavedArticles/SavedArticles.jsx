import React, { useEffect, useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import "../Header/Header.css";
import "./SavedArticles.css";

function SavedArticles({ currentUser }) {
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const savedArticlesDetails =
      JSON.parse(localStorage.getItem("savedArticlesDetails")) || [];
    console.log(
      "Retrieved saved article details from local storage:",
      savedArticlesDetails
    );

    if (savedArticlesDetails.length > 0) {
      // Ensure no duplicates
      const uniqueArticles = savedArticlesDetails.reduce((acc, current) => {
        const x = acc.find((item) => item.url === current.url);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setSavedArticles(uniqueArticles);

      const allKeywords = uniqueArticles.flatMap((article) => article.keywords);
      setKeywords([...new Set(allKeywords)]);
    }
  }, []);

  const handleDeleteArticle = (url) => {
    // Remove from state
    const updatedArticles = savedArticles.filter(
      (article) => article.url !== url
    );
    setSavedArticles(updatedArticles);

    // Remove from local storage
    localStorage.setItem(
      "savedArticlesDetails",
      JSON.stringify(updatedArticles)
    );

    // Update the saved article URLs as well
    const savedArticleUrls = updatedArticles.map((article) => article.url);
    localStorage.setItem("savedArticles", JSON.stringify(savedArticleUrls));
  };

  return (
    <div className="savedArticles">
      <div className="savedArticles__container">
        <div className="savedArticles__text-container">
          <h1 className="savedArticles__pageName-text">Saved articles</h1>
          <h2 className="savedArticles__header-text">
            {currentUser?.name}, you have {savedArticles.length} saved articles
          </h2>
          {savedArticles.length > 0 && (
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
          )}
        </div>
        {savedArticles.length > 0 ? (
          <ul className="newsCard">
            {savedArticles.map((article) => (
              <NewsCard
                key={article.url}
                article={article}
                isSavedPage={true}
                onDelete={handleDeleteArticle}
              />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default SavedArticles;
