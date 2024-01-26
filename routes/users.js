var express = require("express");
var router = express.Router();
var User = require("../models/user"); // Adjust the path to your User model

// GET users listing
router.get("/", function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
});

// POST a new user
router.post("/", function (req, res, next) {
  var newUser = new User(req.body);
  newUser.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(newUser);
  });
});

module.exports = router;
