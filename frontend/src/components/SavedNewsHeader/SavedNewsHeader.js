import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';
import { MAIN } from '../../utils/routesMap';
import classNames from 'classnames';
import { forSavedNewsHeader as config } from '../../configs/configForComponents';
import PropTypes from 'prop-types';
import './SavedNewsHeader.css';

/**
 * @module SavedNewsHeader
 * @description Функциональный компонент<br>
 * Хэдер, блок содержит логотип и меню навигации по сайту.<br>
 * @property {Boolean} isLoggedIn - стейт состяния пользователя: авторизован/не авторизован
 * @property {Function} onLogInClick - колбэк, вызывается при клике по кнопке "Авторизоваться"
 *  или ссылке "Войти", открывает попап авторизации
 * @property {Function} onLogOutClick - колбэк, переводит состояние пользователя в "не авторизован"
 * @property {Function} onMenuButtonClick - колбэк, открывает скрытое меню на мобильном разрешении
 * @property {Boolean} isMobileMenuOpened - стейт открытого состояния мобильного меню
 * @property {Boolean} isPopupOpened - стейт открытого состояния одного из попапов
 * @property {Function} onOverlayClick - колбэк, закрывает попапы при клике по оверлею
 * @property {JSX} children - JSX-фрагмент, блок с информацией о сохраненных пользователем статьях
 * @returns {JSX}
 * @since v.1.0.0
 */
function SavedNewsHeader({
  isLoggedIn,
  onLogInClick,
  onLogOutClick,
  onMenuButtonClick,
  isMobileMenuOpened,
  isPopupOpened,
  onOverlayClick,
  children,
}) {
  const { HEADER_LOGO_TEXT } = config;

  const headerContainerClassName = classNames('saved-news-header__container', {
    'saved-news-header__container_mobile': isMobileMenuOpened,
  });

  const headerMobileMenuButtonClassName = classNames('saved-news-header__menu-button', {
    'saved-news-header__menu-button_not-pressed': !(isMobileMenuOpened && isPopupOpened),
    'saved-news-header__menu-button_pressed': isMobileMenuOpened || isPopupOpened,
  });

  const headerMobileMenuOverlayClassName = classNames('overlay', {
    'saved-news-header__menu-mobile-overlay': isMobileMenuOpened,
  });

  return (
    <header className="saved-news-header">
      <div className={headerContainerClassName}>
        <Link to={MAIN} className="saved-news-header__link">
          <p className="saved-news-header__logo">{HEADER_LOGO_TEXT}</p>
        </Link>

        <Menu
          onLogInClick={onLogInClick}
          onLogOutClick={onLogOutClick}
          isLoggedIn={isLoggedIn}
          isMobile={false}
          isMobileMenuOpened={isMobileMenuOpened}
        />
        <button
          type="button"
          onClick={onMenuButtonClick}
          className={headerMobileMenuButtonClassName}
        />
      </div>
      {children}
      <div className={headerMobileMenuOverlayClassName} onClick={onOverlayClick}>
        <Menu
          onLogInClick={onLogInClick}
          onLogOutClick={onLogOutClick}
          isLoggedIn={isLoggedIn}
          isMobile={true}
          isMobileMenuOpened={isMobileMenuOpened}
        />
      </div>
    </header>
  );
}

SavedNewsHeader.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogInClick: PropTypes.func.isRequired,
  onLogOutClick: PropTypes.func.isRequired,
  onMenuButtonClick: PropTypes.func.isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  isPopupOpened: PropTypes.bool.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default SavedNewsHeader;
