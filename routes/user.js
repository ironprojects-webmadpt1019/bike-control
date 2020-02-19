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
  res.render("user/bike/bikes");
});

// Create -> Add a new bike
router.get("/bikes/add", (req, res, next) => {
  res.render("user/bike/add");
});

router.post("/bikes/add", async (req, res, next) => {
  const { modelBike } = req.body;
  const loggedUser = req.user;

  loggedUser.bike.push({ model: modelBike });

  await loggedUser.save();
  res.redirect("/user/bikes");
});

// Update -> edit a bike
router.get("/bikes/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const loggedUser = req.user;
  console.log(id);
  try {
    const bike = await loggedUser.bike.findById(id);
    console.log(bike);
    res.render("user/bike/edit", { bike });
  } catch (e) {
    next();
  }
});

// Delete -> Remove a bike
router.get("/bike/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const obj = await User.bike.findByIdAndRemove(id);
  res.redirect("/user/bikes");
});

module.exports = router;
