const express = require("express");
const router = express.Router();
const BlogPost = require("../model/modal");

router.get("/", (req, res) => {
  BlogPost.find({})
    .then(data => {
      // console.log("Data :", data);
      res.json(data);
    })
    .catch(err => {
      console.log("Error:", err);
    });
});
//Post
router.post("/save", (req, res) => {
  // console.log(req.body);
  const data = req.body;
  const newBlogPost = new BlogPost(data);
  newBlogPost.save(error => {
    if (error) {
      res.status(500).json({ msg: "Sorry,Internal Erros" });
      return;
    }
    return res.json({
      msg: "Your data has been saved"
    });
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "Priyanshu",
    age: 21
  };
  res.json(data);
});
module.exports = router;
