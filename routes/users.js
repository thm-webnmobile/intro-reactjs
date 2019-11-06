const router = require("express").Router();

// Item Model
let User = require("../models/user.model");

// @route   GET /users
// @desc    Get All Users
// @access  Public
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route   POST users/add
// @desc    Create An User
// @access  Private
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route   DELETE users/:id
// @desc    Delete A User
// @access  Private
router.route("/:id").delete((req, res) => {
  User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
