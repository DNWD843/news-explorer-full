import About from '../About/About';
import NoResult from '../NoResult/NoResult';
import Preloader from '../Preloader/Preloader';
import SearchResult from '../SearchResult/SearchResult';
import PropTypes from 'prop-types';
import './Main.css';

/**
 * @module Main
 * @description Функциональный компонент<br>
 * Блок с основным контентом страницы.<br>
 * @property {Boolean} isLoggedIn - стейт состяния пользователя: авторизован/не авторизован
 * @property {Boolean} isSearchDone - стейт, показывающий отправлял ли пользователь запросы.
 * @property {Boolean} isSearchInProgress - стейт состояния запроса: true - выполняется, false - не выполняется
 * @property {Boolean} isSearchFailed - стейт состояния результата запроса: true - не успешный, false -  успешный
 * @property {Array} searchResult - массив с данными результата поиска
 * @property {Function} openRegisterPopup - колбэк, открывает попап регистрации
 * @property {Function} handleDeleteArticle - колбэк, обработчик удаления статьи
 * @property {Function} handleSaveArticle - колбэк, обработчик сохранения статьи
 * @returns {JSX}
 * @since v.1.0.0
 */
function Main({
  isLoggedIn,
  isSearchDone,
  isSearchInProgress,
  isSearchFailed,
  searchResult,
  openRegisterPopup,
  handleDeleteArticle,
  handleSaveArticle,
}) {
  return (
    <>
      <main className="content">
        {isSearchInProgress && <Preloader />}
        {isSearchDone ? (
          !isSearchFailed && searchResult.length > 0 ? (
            <SearchResult
              searchResult={searchResult}
              isLoggedIn={isLoggedIn}
              openRegisterPopup={openRegisterPopup}
              handleDeleteArticle={handleDeleteArticle}
              handleSaveArticle={handleSaveArticle}
            />
          ) : (
            <NoResult isSearchFailed={isSearchFailed} />
          )
        ) : null}

        <About />
      </main>
    </>
  );
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isSearchDone: PropTypes.bool.isRequired,
  isSearchInProgress: PropTypes.bool.isRequired,
  isSearchFailed: PropTypes.bool.isRequired,
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
  openRegisterPopup: PropTypes.func.isRequired,
  handleDeleteArticle: PropTypes.func.isRequired,
  handleSaveArticle: PropTypes.func.isRequired,
};

export default Main;
