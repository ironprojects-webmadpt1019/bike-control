const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bike = require("../models/Bike");
const Report = require("../models/Reports");

router.get("/", async (req, res, next) => {
  res.render("map/map");
});

router.get("/reports", async (req, res, next) => {
  const reports = await Report.find();
  console.log(reports);
  res.json(reports);
});

module.exports = router;
