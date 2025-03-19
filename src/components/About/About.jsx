import "./About.css";
import AboutMePicture from "../../assets/About-Me.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img
          src={AboutMePicture}
          alt="James Petersen"
          className="about__image"
        />
        <div className="about__content">
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            James Petersen is currently a relationship account manager in the
            mortgage subservicing industry. He is currently attending TripleTen,
            studying web development languages like HTML, CSS, Javascript, and
            using technologies like Vite, React, VSCode, and API implementation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
