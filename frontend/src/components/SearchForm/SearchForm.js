import { forSearchForm as config } from '../../configs/configForComponents';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';

/**
 * @module SearchForm
 * @description Функциональный компонент<br>
 * Блок с формой поиска новостей.<br>
 * @property {Function} handleSearchFormSubmit - колбэк, обработчик сабмита формы поиска
 * @property {Boolean} isSearchInProgress - стейт состояния запроса: true - выполняется, false - не выполняется
 * @returns {JSX}
 * @since v.1.0.0
 */
function SearchForm({ handleSearchFormSubmit, isSearchInProgress }) {
  const { TITLE, DESCRIPTION, PLACEHOLDER_TEXT, SUBMIT_BUTTON_TEXT, EMPTY_INPUT_ERROR } = config;

  const { values, errors, isFormValid, handleInputChange, resetForm } = useFormWithValidation();

  const { searchInput } = values;

  /**
   * @method handleSubmit
   * @description Обработчик сабмита формы поиска новостей.
   * @param {Event} evt - событие
   * @public
   * @since v.1.1.0
   */
  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      handleSearchFormSubmit(searchInput);
    },
    [handleSearchFormSubmit, searchInput],
  );

  useEffect(() => {
    resetForm();
    //eslint-disable-next-line
  }, []);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <h1 className="search-form__title">{TITLE}</h1>
        <p className="search-form__description">{DESCRIPTION}</p>
        <div className="search-form__search-stroke">
          <div className="search-form__field">
            <input
              type="text"
              id="searchInput"
              name="searchInput"
              className="search-form__input"
              onChange={handleInputChange}
              value={searchInput || ''}
              placeholder={PLACEHOLDER_TEXT}
              disabled={isSearchInProgress}
              required
            />
            <span className="search-form__input-error" id="searchInput-error">
              {errors.searchInput ? EMPTY_INPUT_ERROR : ''}
            </span>
          </div>

          <button
            className="search-form__submit-button"
            disabled={!isFormValid || isSearchInProgress}
          >
            {SUBMIT_BUTTON_TEXT}
          </button>
        </div>
      </div>
    </form>
  );
}

SearchForm.propTypes = {
  handleSearchFormSubmit: PropTypes.func.isRequired,
  isSearchInProgress: PropTypes.bool.isRequired,
};

export default SearchForm;
