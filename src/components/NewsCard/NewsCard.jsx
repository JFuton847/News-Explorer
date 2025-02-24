import "../../components/NewsCard/NewsCard.css";
import newsImage1 from "../../assets/image_01.png";
import newsImage2 from "../../assets/image_02.png";
import newsImage3 from "../../assets/image_03.png";
import newsImage4 from "../../assets/image_04.png";
import newsImage5 from "../../assets/image_05.png";

function NewsCard() {
  return (
    <ul className="newsCards">
      <li className="newsCards__card">
        <img
          src={newsImage1} // Temporary placeholder image since no props exist yet
          alt="News Image"
          className="newsCards__card-image"
        />
        <p className="newsCards__card-date-text">November 4, 2020</p>
        <h2 className="newsCards__card-title">
          Everyone Needs a Special 'Sit Spot' in Nature
        </h2>
        <p className="newsCards__card-article-text">
          Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special "sit spot" has stuck with me.
          This advice, which Louv attributes to nature educator Jon Young, is
          for both adults and children to find...
        </p>
        <p className="newsCards__card-source-text">TREEHUGGER</p>
      </li>
      <li className="newsCards__card">
        <img
          src={newsImage2} // Temporary placeholder image since no props exist yet
          alt="News Image"
          className="newsCards__card-image"
        />
        <p className="newsCards__card-date-text">February 19, 2019</p>
        <h2 className="newsCards__card-title">Nature makes you better</h2>
        <p className="newsCards__card-article-text">
          We all know how good nature can make us feel. We have known it for
          millennia: the sound of the ocean, the scents of a forest, the way
          dappled sunlight dances through leaves.
        </p>
        <p className="newsCards__card-source-text">NATIONAL GEOGRAPHIC</p>
      </li>
      <li className="newsCards__card">
        <img
          src={newsImage3} // Temporary placeholder image since no props exist yet
          alt="News Image"
          className="newsCards__card-image"
        />
        <p className="newsCards__card-date-text">October 19, 2020</p>
        <h2 className="newsCards__card-title">
          Nostalgic Photos of Tourists in U.S. National Parks
        </h2>
        <p className="newsCards__card-article-text">
          Uri Løvevild Golman and Helle Løvevild Golman are National Geographic
          Explorers and conservation photographers who just completed a project
          and book they call their love letter to...
        </p>
        <p className="newsCards__card-source-text">NATIONAL GEOGRAPHIC</p>
      </li>
      <li className="newsCards__card">
        <img
          src={newsImage4} // Temporary placeholder image since no props exist yet
          alt="News Image"
          className="newsCards__card-image"
        />
        <p className="newsCards__card-date-text">November 4, 2020</p>
        <h2 className="newsCards__card-title">
          Grand Teton Renews Historic Crest Trail
        </h2>
        <p className="newsCards__card-article-text">
          “The linking together of the Cascade and Death Canyon trails, at their
          heads, took place on October 1, 1933, and marked the first step in the
          realization of a plan whereby the hiker will be...
        </p>
        <p className="newsCards__card-source-text">NATIONAL PARKS TRAVELER</p>
      </li>
      <li className="newsCards__card">
        <img
          src={newsImage5} // Temporary placeholder image since no props exist yet
          alt="News Image"
          className="newsCards__card-image"
        />
        <p className="newsCards__card-date-text">March 16, 2020</p>
        <h2 className="newsCards__card-title">
          Scientists Don't Know Why Polaris Is So Weird
        </h2>
        <p className="newsCards__card-article-text">
          Humans have long relied on the starry sky to push into new frontiers,
          sail to the very edge of the world and find their way back home again.
          Even animals look to the stars to guide them.
        </p>
        <p className="newsCards__card-source-text">TREEHUGGER</p>
      </li>
    </ul>
  );
}

export default NewsCard;
