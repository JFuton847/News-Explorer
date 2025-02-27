import "../../components/NewsCard/NewsCard.css";

function NewsCard({ articles }) {
  return (
    <ul className="newsCards">
      {articles.map((article) => (
        <li className="newsCards__card" key={article._id}>
          <img
            src={article.imageUrl}
            alt="News Image"
            className="newsCards__card-image"
          />
          <div className="newsCards__content">
            <p className="newsCards__card-date-text">Date</p>
            <h2 className="newsCards__card-title">{article.title}</h2>
            <p className="newsCards__card-article-text">
              {article.description}
            </p>
            <p className="newsCards__card-source-text">Source</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NewsCard;
