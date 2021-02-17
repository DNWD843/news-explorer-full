import { Link } from 'react-router-dom';
import { MAIN } from '../../utils/routesMap';
import { forPageNotFound as config } from '../../configs/configForComponents';
import './PageNotFound.css';

/**
 * @module PageNotFound
 * @description Функциональный компонент<br>
 * Блок с сообщением, что пользователь пытался перейти на несуществующую страницу.
 * @returns {JSX}
 * @since v.1.1.0
 */
function PageNotFound() {
  const { TITLE, DESCRIPTION, ERROR_STATUS, LINK_TEXT } = config;
  return (
    <section className="page-not-found">
      <div className="page-not-found__element"></div>
      <span className="page-not-found__status">{ERROR_STATUS}</span>
      <h2 className="page-not-found__title">{TITLE}</h2>
      <p className="page-not-found__description">{DESCRIPTION}</p>
      <Link className="page-not-found__link" to={MAIN}>
        {LINK_TEXT}
      </Link>
    </section>
  );
}

export default PageNotFound;
