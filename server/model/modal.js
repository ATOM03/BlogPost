const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for comment
const CommentSchema = new Schema({
  title: String,
  body: String,
  upvotes: Number,
  downvotes: Number,
  date: {
    type: String,
    default: Date.now(),
  },
});

const Comments = mongoose.model("comments", CommentSchema);

module.exports = Comments;
