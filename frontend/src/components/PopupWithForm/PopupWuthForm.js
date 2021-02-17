import classNames from 'classnames';
import PropTypes from 'prop-types';
import './PopupWithForm.css';

/**
 * @module PopupWithForm
 * @description Функциональный компонент<br>
 * Попап с формой регистрации или авторизации.<br>
 * @property {String} formTitle - заголовок формы
 * @property {String} submitButtonText - текст на кнопке сабмит
 * @property {String} redirectTitleText - текст до ссылки переадресации
 * @property {String} redirectLinkText - текст ссылки переадресации
 * @property {Boolean} isOpened - стейт открытого состояния попапа
 * @property {JSX} children - JSX фрагмент, например дополнительный инпут для формы регистрации
 * @property {Function} onClose - колбэк, закрывает попап при клике по крестику
 * @property {Function} onOverlayClick - колбэк, закрывает попап при клике по оверлею
 * @property {Function} onRedirectLinkClick - колбэк, вызывается при клике по ссылке переадресации,
 * @property {Boolean} isDisabled - стейт состояния кнопки сабмит
 * @property {Function} onSubmit -  колбэк, вызывается при сабмите формы
 * @property {String} formError - текст ошибки, полученной от сервера в результате обработки запроса.
 * @returns {JSX}
 * @since v.1.0.0
 */
function PopupWithForm({
  formTitle,
  submitButtonText,
  redirectTitleText,
  redirectLinkText,
  isOpened,
  children,
  onClose,
  onOverlayClick,
  onRedirectLinkClick,
  isDisabled,
  onSubmit,
  formError,
  isRequestProcessing,
}) {
  const overlayClassName = classNames('popup', {
    'popup_opened page__overlay': isOpened,
  });

  const popupClassName = classNames('popup__container', {
    popup__container_mobile_opened: isOpened,
  });

  const submitButtonClassName = classNames('form__submit-button', {
    'form__submit-button_inactive': isDisabled || isRequestProcessing,
    'form__submit-button_active': !isDisabled && !isRequestProcessing,
  });

  return (
    <div onClick={onOverlayClick} className={overlayClassName}>
      <div className={popupClassName}>
        <button type="button" onClick={onClose} className="popup__close-button"></button>
        <form onSubmit={onSubmit} className="form popup__form">
          <h2 className="form__title">{formTitle}</h2>
          {children}
          <span className="form__submit-error-element">{formError || ''}</span>
          <button
            type="submit"
            className={submitButtonClassName}
            disabled={isDisabled || isRequestProcessing}
          >
            {submitButtonText}
          </button>
        </form>
        <p className="popup__redirect-title">
          {redirectTitleText}
          <span onClick={onRedirectLinkClick} className="popup__redirect-link">
            {redirectLinkText}
          </span>
        </p>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  redirectTitleText: PropTypes.string.isRequired,
  redirectLinkText: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  onRedirectLinkClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formError: PropTypes.string,
  isRequestProcessing: PropTypes.bool.isRequired,
};

export default PopupWithForm;
