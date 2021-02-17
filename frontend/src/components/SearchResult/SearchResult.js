import { useCallback, useEffect, useState } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import classNames from 'classnames';
import { forSearchResult as config } from '../../configs/configForComponents';
import PropTypes from 'prop-types';
import './SearchResult.css';

/**
 * @module SearchResult
 * @description Функциональный компонент<br>
 * Блок отображает статьи, найденные в результате поиска по запросу пользователя.<br>
 * @property {Array} searchResult - массив с данными статей, найденых в результате поиска по запросу пользователя.
 * @property {Boolean} isLoggedIn - стейт состяния пользователя: авторизован/не авторизован
 * @property {Function} openRegisterPopup - openRegisterPopup - колбэк, открывает попап регистрации
 * @property {Function} handleDeleteArticle - колбэк, обработчик удаления статьи
 * @property {Function} handleSaveArticle - колбэк, обработчик сохранения статьи
 * @returns {JSX}
 * @since v.1.0.0
 */
function SearchResult({
  searchResult,
  isLoggedIn,
  openRegisterPopup,
  handleDeleteArticle,
  handleSaveArticle,
}) {
  const { TITLE, SHOW_MORE_BUTTON_TEXT } = config;

  const [cardsToRender, setCardsToRender] = useState([]);
  const [cardsToRenderQuantity, setCardsToRenderQuantity] = useState(3);
  const [isDisabled, setIsDisabled] = useState(false);

  const showMoreButtonClassName = classNames('search-result__button', {
    'search-result__button_disabled': isDisabled,
    'search-result__button_enabled': !isDisabled,
  });

  /**
   * @method handleClickShowMoreButton
   * @description Обработчик клика по кнопке "Показать ещё". Отображает следующую
   *  часть карточек статей, но не более трех за один раз.
   * @public
   * @since v.1.0.0
   */
  const handleClickShowMoreButton = useCallback(() => {
    let cardsQuantity;
    if (searchResult.length - cardsToRenderQuantity > 3) {
      cardsQuantity = cardsToRenderQuantity + 3;
    } else {
      cardsQuantity = cardsToRenderQuantity + (searchResult.length - cardsToRenderQuantity);
      setIsDisabled(true);
    }
    setCardsToRenderQuantity(cardsQuantity);
  }, [searchResult, cardsToRenderQuantity]);

  useEffect(() => {
    setCardsToRender(searchResult.slice(0, cardsToRenderQuantity));
  }, [cardsToRenderQuantity, searchResult]);

  return (
    <section className="search-result">
      <h2 className="search-result__title">{TITLE}</h2>
      <NewsCardList
        cards={cardsToRender}
        isSavedNewsOpened={false}
        isLoggedIn={isLoggedIn}
        openRegisterPopup={openRegisterPopup}
        handleDeleteArticle={handleDeleteArticle}
        handleSaveArticle={handleSaveArticle}
      />
      <button
        onClick={handleClickShowMoreButton}
        disabled={isDisabled}
        type="button"
        className={showMoreButtonClassName}
      >
        {SHOW_MORE_BUTTON_TEXT}
      </button>
    </section>
  );
}

SearchResult.propTypes = {
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      source: PropTypes.string.isRequired,
      keyword: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  openRegisterPopup: PropTypes.func.isRequired,
  handleDeleteArticle: PropTypes.func.isRequired,
  handleSaveArticle: PropTypes.func.isRequired,
};

export default SearchResult;
