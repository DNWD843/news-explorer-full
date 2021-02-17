import { Link } from 'react-router-dom';
import { MAIN } from '../../utils/routesMap';
import { forFooter as config } from '../../configs/configForComponents';
import './Footer.css';

/**
 * @module Footer
 * @description Функциональный компонент<br>
 * Футер, блок с навигационными и информационными ссылками.<br>
 * @returns {JSX}
 * @since v.1.0.0
 */
function Footer() {
  const {
    COPYRIGHT_TEXT,
    NAV_LINK_TEXT,
    OUTER_LINK_TEXT,
    OUTER_LINK,
    SOCIAL_LINK_GITHUB,
    SOCIAL_LINK_FACEBOOK,
  } = config;
  return (
    <>
      <footer className="footer">
        <p className="footer__copyright">{COPYRIGHT_TEXT}</p>
        <nav className="footer__menu">
          <ul className="footer__links">
            <li className="footer__links-item">
              <Link to={MAIN} className="footer__link">
                {NAV_LINK_TEXT}
              </Link>
            </li>
            <li className="footer__links-item">
              <a
                href={OUTER_LINK}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {OUTER_LINK_TEXT}
              </a>
            </li>
          </ul>
          <ul className="footer__social">
            <li className="footer__social-item">
              <a
                href={SOCIAL_LINK_GITHUB}
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="footer__social-icon footer__social-icon_type_github"></div>
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href={SOCIAL_LINK_FACEBOOK}
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="footer__social-icon footer__social-icon_type_facebook"></div>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
