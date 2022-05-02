const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    meta: {
      upvotes: Number,
      bookmarks: Number,
    },
    text: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `upvoteCount` that gets the amount of comments per user
thoughtSchema
  .virtual('upvoteCount')
  // Getter
  .get(function () {
    return this.meta.upvotes;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
