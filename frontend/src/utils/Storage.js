import { TOKEN_KEY, USER_KEY, FOUND_NEWS_KEY, SAVED_NEWS_KEY } from '../configs';

/**
 * @module Storage
 * @description Модуль работы с локальным хранилищем браузера.
 * @since v.1.1.0
 */

/**
 * @method setTokenToStorage
 * @description Метод сохранения токена в хранилище.
 * @param {JWT} token - токен
 * @since v.1.1.0
 */
export const setTokenToStorage = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * @method getTokenFromStorage
 * @description Метод извлечения токена из хранилища.
 * @since v.1.1.0
 */
export const getTokenFromStorage = () => localStorage.getItem(TOKEN_KEY);

/**
 * @method removeTokenFromStorage
 * @description Метод удаления токена из хранилища.
 * @since v.1.1.0
 */
export const removeTokenFromStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * @method setUserDataToStorage
 * @description Метод сохранения данных пользователя в хранилище.
 * @param {String} data - данные пользователя в формате строки.
 * @since v.1.1.0
 */
export const setUserDataToStorage = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};

/**
 * @method getUserDataFromStorage
 * @description Метод извлечения данных о пользователе из хранилища.
 * @since v.1.1.0
 */
export const getUserDataFromStorage = () => JSON.parse(localStorage.getItem(USER_KEY));

/**
 * @method removeUserDataFromStorage
 * @description Метод удаления данных пользователя из хранилища.
 * @since v.1.1.0
 */
export const removeUserDataFromStorage = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * @method setFoundNewsToStorage
 * @description Метод сохранения массива найденных статей в хранилище.
 * @param {String} news - масив найденных статей в формате строки
 * @since v.1.1.0
 */
export const setFoundNewsToStorage = (news) => {
  localStorage.setItem(FOUND_NEWS_KEY, JSON.stringify(news));
};

/**
 * @method getFoundNewsFromStorage
 * @description Метод извлечения массива найденных статей из хранилища.
 * @since v.1.1.0
 */
export const getFoundNewsFromStorage = () => JSON.parse(localStorage.getItem(FOUND_NEWS_KEY));

/**
 * @method removeFoundNewsFromStorage
 * @description Метод удаления массива найденных статей из хранилища.
 * @since v.1.1.0
 */
export const removeFoundNewsFromStorage = () => {
  localStorage.removeItem(FOUND_NEWS_KEY);
};

/**
 * @method setSavedNewsToStorage
 * @description Метод сохранения массива сохраненных в БД статей в хранилище.
 * @param {String} news - масив сохраненных статей в формате строки
 * @since v.1.1.0
 */
export const setSavedNewsToStorage = (news) => {
  localStorage.setItem(SAVED_NEWS_KEY, JSON.stringify(news));
};

/**
 * @method getSavedNewsFromStorage
 * @description Метод извлечения массива сохраненных в БД статей из хранилища.
 * @since v.1.1.0
 */
export const getSavedNewsFromStorage = () => JSON.parse(localStorage.getItem(SAVED_NEWS_KEY));

/**
 * @method removeSavedNewsFromStorage
 * @description Метод удаления массива сохраненных в БД статей из хранилища.
 * @since v.1.1.0
 */
export const removeSavedNewsFromStorage = () => {
  localStorage.removeItem(SAVED_NEWS_KEY);
};
