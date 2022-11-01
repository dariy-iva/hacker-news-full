const router = require('express').Router();

const {
  getComments,
} = require('../controllers/comments');

router.get('/:parentId', getComments);

module.exports = router;
