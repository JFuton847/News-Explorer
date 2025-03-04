import React from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import About from "../../components/About/About";

function Main({ articles, loading, error }) {
  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <ul className="cards__list">
        {articles.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
      </ul>
      <About />
    </main>
  );
}

export default Main;
