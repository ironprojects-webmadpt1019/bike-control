const express = require("express");
const router = express.Router();

router.get("/register", (req, res, next) => {
  res.render("auth/register");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

module.exports = router;
