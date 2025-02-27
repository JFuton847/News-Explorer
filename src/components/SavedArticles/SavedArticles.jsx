import React, { useEffect, useState } from "react";
import { saveArticle } from "../../utils/api"; // New API function to fetch saved articles
import NewsCard from "../../components/NewsCard/NewsCard"; // Reuse NewsCard component for displaying articles

function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    // Fetch saved articles on component mount
    saveArticle()
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((error) => {
        console.error("Error fetching saved articles:", error);
      });
  }, []);

  return (
    <div className="saved-articles">
      <h2>Your Saved Articles</h2>
      <ul className="saved-articles__list">
        {savedArticles.map((article) => (
          <li key={article._id}>
            <NewsCard article={article} />{" "}
            {/* Pass saved articles to NewsCard */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedArticles;
