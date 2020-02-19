const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bike = require("../models/Bike");

router.get("/", (req, res, next) => {
  res.render("map/map");
});

module.exports = router;
