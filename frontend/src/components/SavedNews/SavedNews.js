import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsInfo from '../SavedNewsInfo/SavedNewsInfo';
import PropTypes from 'prop-types';
import './SavedNews.css';

/**
 * @module SavedNews
 * @description Функциональный компонент<br>
 * Отрисовывает карточки со статьями, сохраненными пользователем в своей коллекции.<br>
 * Отрисовка производится частями по три карточки.
 * @property {Boolean} isLoggedIn - стейт состяния пользователя: авторизован/не авторизован
 * @property {Array} savedArticles - массив с данными о сохраненных статьях
 * @property {Function} handleDeleteArticle - колбэк, обработчик удаления статьи
 * @property {Object} props - пробрасываемые пропсы
 * @returns {JSX} - JSX-фрагмент разметки, форма авторизации в приложении
 * @since v.1.0.0
 */
function SavedNews({ isLoggedIn, savedArticles, handleDeleteArticle, ...props }) {
  return (
    <>
      <SavedNewsHeader isLoggedIn={isLoggedIn} {...props}>
        <SavedNewsInfo savedArticles={savedArticles} />
      </SavedNewsHeader>

      {savedArticles.length ? (
        <main className="saved-news">
          <NewsCardList
            cards={savedArticles}
            isSavedNewsOpened={true}
            isLoggedIn={isLoggedIn}
            handleDeleteArticle={handleDeleteArticle}
          />
        </main>
      ) : null}
    </>
  );
}

SavedNews.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  savedArticles: PropTypes.arrayOf(
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
  handleDeleteArticle: PropTypes.func.isRequired,
  props: PropTypes.objectOf(PropTypes.any),
};

export default SavedNews;
