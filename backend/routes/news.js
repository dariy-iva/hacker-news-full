const router = require('express').Router();

const {
  getNews,
} = require('../controllers/news');

router.get('/', getNews);

module.exports = router;
