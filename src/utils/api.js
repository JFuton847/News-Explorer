export function getItems() {
  return new Promise((resolve, reject) => {
    resolve([
      {
        _id: "65f7368dfb74bd6a92114c85",
        title: "Some news article",
        url: "put some actual article URL here",
        imageUrl: "put an image URL here",
      },
      {
        _id: "65f7371e7bce9e7d331b11a1",
        title: "Another news article",
        url: "another article URL here",
        imageUrl: "another image URL here",
      },
      // Add more fake articles as needed
    ]);
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
