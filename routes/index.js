const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const auth = require("./auth");
router.use("/auth", auth);

const user = require("./user");
router.use("/user", ensureLogin.ensureLoggedIn("/auth/login"), user);

const map = require("./map");
router.use("/map", map);

module.exports = router;
