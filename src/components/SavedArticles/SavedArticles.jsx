import React, { useEffect, useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import "../Header/Header.css";
import "./SavedArticles.css";

function SavedArticles({ currentUser }) {
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const displayKeywords = (keywords) => {
    if (keywords.length === 1) {
      return keywords[0];
    } else if (keywords.length === 2) {
      return `${keywords[0]} and ${keywords[1]}`;
    } else if (keywords.length > 2) {
      return `${keywords[0]}, ${keywords[1]}, and ${
        keywords.length - 2
      } others`;
    }
    return "";
  };

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

      // Retrieve the unique keywords from the saved articles
      const allKeywords = uniqueArticles.flatMap(
        (article) => article.keywords || []
      );
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

    // Recalculate keywords and update the state
    const allKeywords = updatedArticles.flatMap(
      (article) => article.keywords || []
    );
    setKeywords([...new Set(allKeywords)]); // Update keywords state
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
                {displayKeywords(keywords)}
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
                keywords={article.keywords}
              />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default SavedArticles;
