const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Add LoggedIn Middleware
const ensureLogin = require("connect-ensure-login");

router.get("/settings", (req, res, next) => {
  res.render("user/settings");
});

router.post("/settings", async (req, res, next) => {
  const { username, firstName, lastName } = req.body;
  const loggedUser = req.user;
  console.log(loggedUser);
  const existingUser = await User.findOne({ username });
  // Update user in database
  if (!existingUser) {
    loggedUser.username = username;
    loggedUser.name.first = firstName;
    loggedUser.name.last = lastName;

    await loggedUser.save();
    req.flash("error", "Updated user!");
    return res.redirect("/user/settings");
  } else {
    if (loggedUser.username === existingUser.username) {
      loggedUser.name.first = firstName;
      loggedUser.name.last = lastName;
      await loggedUser.save();
      req.flash("error", "Updated user!");
      return res.redirect("/user/settings");
    } else {
      req.flash("error", "That username is taken!");
      return res.redirect("/user/settings");
    }
  }
});

const bike = require("./bike");
router.use("/bikes", bike);

module.exports = router;
