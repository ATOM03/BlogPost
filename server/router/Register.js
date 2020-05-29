const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/", (req, res) => {
  const { Name, Email, Password } = req.body;

  if (!Name || !Email || !Password) {
    return res.status(400).json({
      msg: "Enter All Field",
    });
  }
  User.findOne({ Email }).then((user) => {
    if (user)
      return res.status(400).json({
        msg: "User Already Exist",
      });

    const newUser = new User({
      Name,
      Email,
      Password,
    });
    //To create Encyrtion Password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.Password, salt, (err, hash) => {
        if (err) throw err;
        newUser.Password = hash;
        // create a unique token for a individual User
        newUser.save().then((user) => {
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
  });
});

module.exports = router;
