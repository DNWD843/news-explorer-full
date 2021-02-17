const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/too-many-requests');
const { tooManyRequestsMessage } = require('../constants/errorMessages');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: function f(req, res, next) {
    const error = new TooManyRequestsError(tooManyRequestsMessage);
    next(error);
  },
});

module.exports = limiter;
