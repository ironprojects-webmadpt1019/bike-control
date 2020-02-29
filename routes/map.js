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

router.get(
  "/reports",
  ensureLogin.ensureLoggedIn("/auth/login"),
  async (req, res, next) => {
    try {
      const reports = await Report.find();
      return res.json(reports);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/bikes",
  ensureLogin.ensureLoggedIn("/auth/login"),
  async (req, res, next) => {
    const loggedUser = req.user;
    try {
      const bikes = await Bike.find({ owner: loggedUser._id });
      return res.json(bikes);
    } catch (e) {
      next(e);
    }
  }
);

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
    const { longitude, latitude, incident } = req.body;
    try {
      const newReport = await Report.create({
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        properties: {
          incident
        }
      });
      return res.json({});
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
