const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

router.use('/news', require('./news'));
router.use('/comments', require('./comments'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
