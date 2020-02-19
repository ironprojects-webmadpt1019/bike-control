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

  // Update user in database
  loggedUser.username = username;
  loggedUser.name.first = firstName;
  loggedUser.name.last = lastName;

  await loggedUser.save();

  req.flash("error", "Updated user!");
  res.redirect("/user/settings");
});

router.get("/bikes", (req, res, next) => {
  res.render("user/bikes");
});

router.get("/bikes/add", (req, res, next) => {
  res.render("user/addBike");
});

router.post("/bikes/add", async (req, res, next) => {
  const { modelBike } = req.body;
  const loggedUser = req.user;

  loggedUser.bike.push({ model: modelBike });

  await loggedUser.save();
  res.redirect("/user/bikes");
});
module.exports = router;
