const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bike = require("../models/Bike");

// Add bcrypt to encrypt passwords
const { hashPassword, checkHashed } = require("../lib/hashing");
// Add passport
const passport = require("passport");
// Add LoggedIn Middleware
const ensureLogin = require("connect-ensure-login");
const strength = require("strength");

router.get("/register", ensureLogin.ensureLoggedOut(), (req, res, next) => {
  res.render("auth/register");
});

router.get("/login", ensureLogin.ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/register",
  ensureLogin.ensureLoggedOut(),
  async (req, res, next) => {
    const { username, password, firstName, lastName, modelBike } = req.body;
    //console.log(req.body);
    if (
      username === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      req.flash(
        "error",
        "You have to fill the required fields (username, name and password)"
      );
      return res.redirect("/auth/register");
    } else {
      try {
        const existingUser = await User.findOne({ username });
        if (!existingUser && strength(password) >= 3) {
          const newUser = await User.create({
            username,
            password: hashPassword(password),
            name: { first: firstName, last: lastName }
          });
          if (modelBike != "") {
            const newBike = await Bike.create({
              model: modelBike,
              owner: username
            });
          }
          req.login(newUser, function(err) {
            if (err) {
              console.log(err);
            }
            return res.redirect("/map");
          });
        } else if (strength(password) < 3) {
          req.flash(
            "error",
            "Create a password with mixed case, special character and number (minimun 8 characters and no repeated letters)"
          );
          return res.redirect("/auth/register");
        } else {
          req.flash("error", "The user already exists");
          return res.redirect("/auth/register");
        }
      } catch (e) {
        next(e);
      }
    }
  }
);

router.post(
  "/login",
  ensureLogin.ensureLoggedOut(),
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "Incorret username or password"
  }),
  function(req, res) {
    res.redirect("/map");
  }
);

router.get(
  "/logout",
  ensureLogin.ensureLoggedIn("/auth/login"),
  async (req, res, next) => {
    req.logout();
    res.redirect("/");
  }
);

module.exports = router;
