const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Add LoggedIn Middleware
const ensureLogin = require("connect-ensure-login");

router.get(
  "/settings",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    res.render("user/settings");
  }
);

router.post(
  "/settings",
  ensureLogin.ensureLoggedIn("/auth/login"),
  async (req, res, next) => {
    const { username, firstName, lastName } = req.body;
    const loggedUser = req.user;

    // Update user in database
    loggedUser.username = username;
    loggedUser.name.first = firstName;
    loggedUser.name.last = lastName;

    await loggedUser.save();

    req.flash("error", "Updated user!");
    res.redirect("/user/settings");
  }
);

module.exports = router;
