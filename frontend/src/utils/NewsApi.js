import * as PATH_TO from './endpoints';
import { NEWS_API_URL, PAGE_SIZE, API_KEY, DATE_FROM, DATE_TO } from '../configs';

/**
 * @module NewsApi
 * @description Модуль взаимодействия с новостным сервером.
 * @since v.1.1.0
 */

/**
 * @method getArticlesFromNewsApi
 * @description Метод получения статей по ключевому слову (запросу) от новостного сервера.
 * По ключевому слову ищет статьи на новостном сервере, возвращает:
 * -  массив с данными новостей,
 * - пустой массив, если статьи не найдены,
 * - ошибку, если запрос завершился неудачей
 * @param {String} userQuery - ключевое слово (поисковый запрос)
 * @returns {Array} массив с данными найденных новостей
 * @since v.1.1.0
 */
export const getArticlesFromNewsApi = (userQuery) => {
  return fetch(
    `${NEWS_API_URL}${PATH_TO.EVERYTHING}?q=${userQuery}&from=${DATE_FROM}&to=${DATE_TO}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`,
    {
      method: 'GET',
    },
  ).then((res) => {
    if (res.status) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status}`);
  });
};
