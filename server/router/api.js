const express = require("express");
const router = express.Router();
const Comments = require("../model/modal");

//Fetched all the comment from database
router.get("/", (req, res) => {
  Comments.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {});
});

//Save comment in the databasw
router.post("/save", (req, res) => {
  const data = req.body;
  const newComment = new Comments(data);
  newComment.save((error) => {
    if (error) {
      res.status(404).json({ msg: "Sorry,Internal Erros" });
      return;
    }
    return res.json({
      msg: "Your data has been saved",
    });
  });
});

//Update the comment vote in the database
router.post("/vote", (req, res) => {
  console.log("Hit");
  const { id, vote, upvote, downvote } = req.body;
  var ID = { _id: id };
  var VOTE = { $set: { upvotes: upvote, downvotes: downvote } };
  Comments.updateMany(ID, VOTE, (err) => {
    if (err) {
      return res.status(404).json({ msg: "Not updated" });
    }
    return res.json({
      msg: "Updated",
    });
  });
});

module.exports = router;
