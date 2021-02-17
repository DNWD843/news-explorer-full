const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  articlesNotFoundMessage,
  articleNotFoundMessage,
  articleDeletionBanMessage,
  invalidIdMessage,
  invalidRequestDataMessage,
} = require('../constants/errorMessages.js');
const {
  // articleCreationSuccessMessage,
  articleDeletionSuccessMessage,
} = require('../constants/responseMessages');

/**
 * @module
 * @description Контроллеры модели Article.<br>
 * Обрабатывают запросы:<br>
 *  - GET /articles - возвращает все статьи пользователя<br>
 *  - POST /articles - сохраняет статью в коллекции пользователя<br>
 *  - DELETE /articles/:articlesId - удаляет статью из коллекции пользователя<br>
 * @since v.1.0.0
 */

/**
 * @description Контроллер getArticles()<br>
 * Получает данные всех статей пользователя и отправляет их пользователю.<br>
 * Обрабатываeт запрос GET /articles
 * @returns {JSON}
 * @since v.1.0.0
 * @instance
 * @public
 */
const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError(articlesNotFoundMessage);
      }
      return res.status(200).send(articles);
    })
    .catch(next);
};

/**
 * @description Контроллер createArticle()<br>
 * Сохраняет статью в коллекции пользователя.<br>
 * Обрабатываeт запрос POST /articles
 * @property {String} req.body.keyword - ключевое слово, по которому искалась статья
 * @property {String} req.body.title - заголовок статьи
 * @property {String} req.body.text - текст статьи
 * @property {String} req.body.date - дата статьи
 * @property {String} req.body.source - источник статьи
 * @property {String} req.body.link -  ссылка на статью
 * @property {String} req.body.image -ссылка на иллюстрацию к статье
 * @returns {JSON}
 * @instance
 * @since v.1.0.0
 * @public
 */
const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  /**
   * @param {String} owner - при создании статьи добавляем поле owner, в которое
   *  записываем _id пользователя, создающего статью
   * @ignore
   */
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((card) => {
      const { owner, ...restCard } = card.toObject();
      return res.status(200).send(restCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError(invalidRequestDataMessage);
        return next(error);
      }
      return next(err);
    });
};

/**
 * @description Контроллер deleteArticle()<br>
 * Удаляет статью по её идентификатору, возвращает сообщение об успешном удалении<br>
 * Обрабатываeт запрос DELETE /articles/:articleId
 * @returns {JSON}
 * @since v.1.0.0
 * @instance
 * @public
 */
const deleteArticle = (req, res, next) => Article.findById(req.params.articleId)
  .select('+owner')
  .then((article) => {
    if (!article) {
      throw new NotFoundError(articleNotFoundMessage);
    }
    if (article.owner !== req.user._id) {
      throw new ForbiddenError(articleDeletionBanMessage);
    }
    return article
      .remove()
      .then(() => res.send({ message: articleDeletionSuccessMessage }));
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new BadRequestError(invalidIdMessage);
      return next(error);
    }
    return next(err);
  });

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
