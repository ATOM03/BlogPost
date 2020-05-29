const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/", (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({
      msg: "Enter All Field",
    });
  }
  User.findOne({ Email }).then((user) => {
    if (!user)
      return res.status(400).json({
        msg: "User Does not Already Exist",
      });

    //Validate Password

    bcrypt.compare(Password, user.Password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        {
          id: user.id,
        },
        "secretkey",
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              Name: user.Name,
              Email: user.Email,
            },
          });
        }
      );
    });
  });
});

module.exports = router;
