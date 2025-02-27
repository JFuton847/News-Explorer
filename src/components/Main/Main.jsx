import React, { useEffect, useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import About from "../../components/About/About";
import { getItems } from "../../utils/api"; // Import API function

function Main() {
  const [articles, setArticles] = useState([]); // State to store fetched articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getItems();
        setArticles(data);
      } catch (err) {
        setError("Failed to load articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles(); // Call API when component mounts
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <ul className="cards__list">
        {articles.map((article) => (
          <NewsCard key={article._id} articles={[article]} />
        ))}
      </ul>
      <About />
    </main>
  );
}

export default Main;
