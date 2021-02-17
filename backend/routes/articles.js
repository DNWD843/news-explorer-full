const router = require('express').Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

const { createArticleReqValidator, deleteArticleReqValidator } = require('../middlewares/articlesValidators');

router.get('/', getArticles);
router.post('/', createArticleReqValidator, createArticle);
router.delete('/:articleId', deleteArticleReqValidator, deleteArticle);

module.exports = router;
