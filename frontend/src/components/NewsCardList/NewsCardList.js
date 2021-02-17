import NewsCard from '../NewsCard/NewsCard';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewsCardList.css';

/**
 * @module NewsCardList
 * @description Функциональный компонент<br>
 * Список карточек статей.
 * @property {Array} cards - массив с данными статей
 * @property {Boolean} isSavedNewsOpened - стейт состояния страницы с сохраненными новостями
 * @property {Boolean} isLoggedIn -  стейт состяния пользователя: авторизован/не авторизован
 * @property {Function} openRegisterPopup - колбэк, открывает попап регистрации
 * @property {Function} deleteArticle - колбэк, удаляет статью
 * @property {Function} saveArticle - колбэк, сохраняет статью
 * @returns {JSX}
 * @since v.1.0.0
 */
function NewsCardList({
  cards,
  isSavedNewsOpened,
  isLoggedIn,
  openRegisterPopup,
  handleDeleteArticle,
  handleSaveArticle,
}) {
  const newsCardListClassName = classNames('news-card-list', {
    'search-result__cards': !isSavedNewsOpened,
    'saved-news__container': isSavedNewsOpened,
  });

  return (
    <ul className={newsCardListClassName}>
      {cards.map((card, index) => (
        <NewsCard
          key={index + 1}
          {...card}
          isSavedNewsOpened={isSavedNewsOpened}
          isLoggedIn={isLoggedIn}
          openRegisterPopup={openRegisterPopup}
          deleteArticle={handleDeleteArticle}
          saveArticle={handleSaveArticle}
        />
      ))}
    </ul>
  );
}

NewsCardList.propTypes = {
  cards: PropTypes.arrayOf(
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
  isSavedNewsOpened: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  openRegisterPopup: PropTypes.func,
  handleDeleteArticle: PropTypes.func.isRequired,
  handleSaveArticle: PropTypes.func,
};

export default NewsCardList;
