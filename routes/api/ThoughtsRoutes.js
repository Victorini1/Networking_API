const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
} = require('../../controllers/ThoughtController');

router.route('/').get(getThoughts).Thoughts(createThoughts);

router.route('/:thoughtsId').get(getSingleThoughts);

module.exports = router;
