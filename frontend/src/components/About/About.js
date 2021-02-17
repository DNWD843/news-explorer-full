import { forAbout as config } from '../../configs/configForComponents';
import './About.css';

/**
 * @module About
 * @description Функциональный компонент<br>
 * Блок с информацией об авторе.<br>
 * @returns {JSX}
 * @since v.1.0.0
 */
function About() {
  const { IMG_SRC, IMG_ALT, TITLE, ABOUT_AUTHOR, DESCRIPTION } = config;

  return (
    <section className="about">
      <img className="about__image" src={IMG_SRC} alt={IMG_ALT} />
      <div className="about__info">
        <h2 className="about__title">{TITLE}</h2>
        <ul className="about__description">
          <li className="about__description-item">
            <p className="about__description-fragment">{ABOUT_AUTHOR}</p>
          </li>
          <li className="about__description-item">
            <p className="about__description-fragment">{DESCRIPTION}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default About;
