const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bike = require("../models/Bike");
const Report = require("../models/Reports");

const ensureLogin = require("connect-ensure-login");

router.get(
  "/",
  ensureLogin.ensureLoggedIn("/auth/login"),
  async (req, res, next) => {
    res.render("map/map");
  }
);

router.get("/reports", async (req, res, next) => {
  const reports = await Report.find();
  console.log(reports);
  res.json(reports);
});

router.get("/bikes", async (req, res, next) => {
  const loggedUser = req.user;
  const bikes = await Bike.find({ owner: loggedUser._id });
  res.json(bikes);
});

router.get(
  "/add/report",
  ensureLogin.ensureLoggedIn("/auth/login"),
  async (req, res, next) => {
    res.render("user/report/add");
  }
);

router.post(
  "/add/report",
  ensureLogin.ensureLoggedIn("/auth/login"),
  async (req, res, next) => {
    const { longitude, latitude } = req.body;
    const newReport = await Report.create({
      location: {
        type: "Point",
        coordinates: [longitude, latitude]
      }
    });
    res.json({});
  }
);

module.exports = router;
