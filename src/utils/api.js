const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export function getItems() {
  return new Promise((resolve, reject) => {
    const apiUrl = newsApiBaseUrl;
    const apiKey = "58e1cfada4974bd6994169d3c2703587"; // Your API key

    fetch(`${apiUrl}?apiKey=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const articles = data.articles.map((article, index) => ({
          _id: article.url, // Use article URL as the unique key or generate a new one
          title: article.title,
          url: article.url,
          imageUrl: article.urlToImage,
        }));

        resolve(articles);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a0", // another fake MongoDB ID
      url: article.url, // Corrected property assignment
      title: article.title,
      imageUrl: article.imageUrl, // Corrected property name
    });
  });
}
