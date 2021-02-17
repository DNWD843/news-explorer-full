import { forNoResult as config } from '../../configs/configForComponents';
import PropTypes from 'prop-types';
import './NoResult.css';

/**
 * @module NoResult
 * @description Функциональный компонент<br>
 * Блок с отображением отсутствия результатов поиска.<br>
 * @param {Boolean} isSearchFailed - стейт состояния результата запроса: true - не успешный, false -  успешный
 * @returns {JSX}
 * @since v.1.0.0
 */
function NoResult({ isSearchFailed }) {
  const { TITLE, DESCRIPTION, ERROR_TITLE, ERROR_DESCRIPTION } = config;
  return (
    <section className="no-result">
      <div className="no-result__element"></div>
      <h2 className="no-result__title">{isSearchFailed ? ERROR_TITLE : TITLE}</h2>
      <p className="no-result__description">{isSearchFailed ? ERROR_DESCRIPTION : DESCRIPTION}</p>
    </section>
  );
}

NoResult.propTypes = {
  isSearchFailed: PropTypes.bool.isRequired,
};

export default NoResult;
