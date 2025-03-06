const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export function getItems(query) {
  return new Promise((resolve, reject) => {
    const apiKey = "58e1cfada4974bd6994169d3c2703587"; // Your API key
    const currentDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(currentDate.getDate() - 7); // Date 7 days before the current date

    // Formatting the dates in ISO format
    const from = fromDate.toISOString().split("T")[0];
    const to = currentDate.toISOString().split("T")[0];

    // Constructing the API URL with parameters
    const apiUrl = `${newsApiBaseUrl}?q=${query}&apiKey=${apiKey}&from=${from}&to=${to}&pageSize=15`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const articles = data.articles.map((article) => ({
          _id: article.url, // Use article URL as the unique key or generate a new one
          title: article.title,
          url: article.url,
          imageUrl: article.urlToImage,
          description: article.description,
          date: article.publishedAt,
          source: article.source?.name || "Unknown Source", // Default to "Unknown Source" if name is missing
        }));

        resolve(articles);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getArticlesByUrls(urls) {
  return Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok for URL: ${url}`);
          }
          return response.json();
        })
        .then((data) => ({
          _id: url,
          title: data.title,
          url: data.url,
          imageUrl: data.urlToImage,
          description: data.description,
          date: data.publishedAt,
          source: data.source?.name || "Unknown Source", // Default to "Unknown Source" if name is missing
        }))
        .catch((error) => {
          console.error(`Error fetching article for URL: ${url}`, error);
          return null;
        })
    )
  ).then((articles) => articles.filter((article) => article !== null));
}

export function saveArticle(article, searchKeywords) {
  return new Promise((resolve, reject) => {
    // Check if article.source is a string; if not, use article.source.name
    const sourceName =
      typeof article.source === "string"
        ? article.source
        : article.source?.name || "Unknown Source";

    if (
      !article.url ||
      !article.title ||
      !article.imageUrl ||
      !article.description ||
      !article.date
    ) {
      console.error("Article object is missing required properties:", article);
      reject(new Error("Article object is missing required properties"));
    } else {
      console.log("Saving article object:", article); // Log the article object
      resolve({
        _id: article.url,
        url: article.url,
        title: article.title,
        imageUrl: article.imageUrl,
        description: article.description,
        date: article.date || article.publishedAt,
        source: sourceName, // Use the computed sourceName here
        keywords: searchKeywords || [], // Use the search term as the keyword
      });
    }
  });
}
