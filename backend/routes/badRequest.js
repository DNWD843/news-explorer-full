const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const { invalidRouteMessage } = require('../constants/errorMessages');

router.use(() => {
  throw new NotFoundError(invalidRouteMessage);
});

module.exports = router;
