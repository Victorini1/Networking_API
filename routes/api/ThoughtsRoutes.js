const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/ThoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtsId/reactions
router.route('/:thoughtsId/reactions').post(addReaction);

// /api/thoughts/:thoughtsId/reactions/:reactionId
router.route('/:thoughtsId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
