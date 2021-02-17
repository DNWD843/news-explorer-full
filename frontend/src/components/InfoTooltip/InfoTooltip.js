import classNames from 'classnames';
import { forRegistrationSuccessToolTip as config } from '../../configs/configForComponents';
import PropTypes from 'prop-types';
import './InfoTooltip.css';

/**
 * @module InfoTooltip
 * @description Функциональный компонент<br>
 * Всплывающая подсказка об успешной регистрации пользователя.<br>
 * @property {Function} onOverlayClick - колбэк, закрывает подсказку при клике по оверлею
 * @property {Boolean} isOpened - стейт открытого состояния подсказки
 * @property {Function} onClose - колбэк, закрывает попапы при клике по крестику
 * @property {Function} onRedirectLinkClick - колбэк, переводит на другую страницу
 * @returns {JSX}
 * @since v.1.0.0
 */
function InfoTooltip({ onOverlayClick, isOpened, onClose, onRedirectLinkClick }) {
  const { REDIRECT_TITLE_TEXT, REDIRECT_LINK_TEXT } = config;

  const infoTooltipOverlayClassName = classNames('popup-info', 'page__overlay-info', {
    'popup-info_opened': isOpened,
  });

  return (
    <div onClick={onOverlayClick} className={infoTooltipOverlayClassName}>
      <div className="popup-info__container">
        <button type="button" onClick={onClose} className="popup-info__close-button"></button>
        <h2 className="popup-info__tooltip-title">{REDIRECT_TITLE_TEXT}</h2>
        <p onClick={onRedirectLinkClick} className="popup-info__redirect-link">
          {REDIRECT_LINK_TEXT}
        </p>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRedirectLinkClick: PropTypes.func.isRequired,
};

export default InfoTooltip;
