const { serverErrorMessage } = require('../constants/errorMessages');

/**
 * @module
 * @description Централизованный обработчик ошибок.<br>
 * @since v.1.0.0
 */
const handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? serverErrorMessage : message,
  });
  next();
};

module.exports = handleErrors;
