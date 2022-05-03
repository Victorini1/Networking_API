const { Thought, User } = require('../models');

module.exports = {

  getThoughts(req, res) {
    Thought.find()
      .populate('reactions')
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtsId })
      .populate('reactions')
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thought => {
          User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          )
          .then(user =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought with this id!' })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // add reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete reaction from thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: {reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};