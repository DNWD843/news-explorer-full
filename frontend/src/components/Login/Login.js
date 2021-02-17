import { forLogin as config } from '../../configs/configForComponents';
import { useEffect, useCallback } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWuthForm';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import PropTypes from 'prop-types';

/**
 * @module Login
 * @description Функциональный компонент<br>
 * Попап, форма входа (авторизации) в приложение.
 * @property {Boolean} isOpened - - стейт открытого состояния попапа
 * @property {Boolean} isRequestProcessing - стейт состояния запроса: true - выполняется, false - не выполняется
 * @property {Function} onClose - колбэк, закрывает попапы при клике по крестику
 * @property {Function} onOverlayClick - колбэк, закрывает попапы при клике по оверлею
 * @property {Function} onRedirectLinkClick - колбэк, переводит на другую страницу
 * @property {Function} handleLogin - колбэк, отправляет запрос при сабмите формы
 * @returns {JSX} - JSX-фрагмент разметки, форма авторизации в приложении
 * @since v.1.0.0
 */
function Login({
  isOpened,
  isRequestProcessing,
  onClose,
  onOverlayClick,
  onRedirectLinkClick,
  handleLogin,
}) {
  const {
    FORM_TITLE,
    SUBMIT_BUTTON_TEXT,
    REDIRECT_TITLE_TEXT,
    REDIRECT_LINK_TEXT,
    EMAIL_LABEL,
    EMAIL_PLACEHOLDER,
    PASSWORD_LABEL,
    PASSWORD_PLACEHOLDER,
  } = config;

  const {
    values,
    errors,
    isFormValid,
    handleInputChange,
    resetForm,
    formError,
    setFormError,
  } = useFormWithValidation();

  const { login, password } = values;

  /**
   * @method handleSubmit
   * @description Публичный метод<br>
   * Обработчик сабмита формы авторизации. Возвращает токен.
   * @param {Event} evt - событие
   * @public
   * @returns {Object} токен в формате {token: <токен>}
   * @since v.1.1.0
   */
  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      handleLogin({ email: login, password }, setFormError);
    },
    [handleLogin, login, password, setFormError],
  );

  useEffect(() => {
    resetForm();
    //eslint-disable-next-line
  }, [isOpened]);

  return (
    <PopupWithForm
      formTitle={FORM_TITLE}
      submitButtonText={SUBMIT_BUTTON_TEXT}
      redirectTitleText={REDIRECT_TITLE_TEXT}
      redirectLinkText={REDIRECT_LINK_TEXT}
      isOpened={isOpened}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onRedirectLinkClick={onRedirectLinkClick}
      isDisabled={!isFormValid}
      onSubmit={handleSubmit}
      formError={formError}
      isRequestProcessing={isRequestProcessing}
    >
      <>
        <ul className="form__inputs">
          <li className="form__field">
            <label className="form__input-label">{EMAIL_LABEL}</label>
            <input
              id="login"
              name="login"
              type="email"
              onChange={handleInputChange}
              value={login || ''}
              className="form__input"
              placeholder={EMAIL_PLACEHOLDER}
              disabled={isRequestProcessing}
              required
            />
            <span className="form__input-error" id="login-input-error">
              {errors.login || ''}
            </span>
          </li>
          <li className="form__field">
            <label className="form__input-label">{PASSWORD_LABEL}</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={password || ''}
              className="form__input"
              placeholder={PASSWORD_PLACEHOLDER}
              disabled={isRequestProcessing}
              required
            />
            <span className="form__input-error" id="password-input-error">
              {errors.password || ''}
            </span>
          </li>
        </ul>
      </>
    </PopupWithForm>
  );
}

Login.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  isRequestProcessing: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  onRedirectLinkClick: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
