const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bike = require("../models/Bike");
const Report = require("../models/Reports");

router.get("/", async (req, res, next) => {
  const loggedUser = req.user;
  try {
    const bikes = await Bike.find({ owner: loggedUser._id });
    return res.render("user/bike/bikes", { bikes });
  } catch (e) {
    next();
  }
});

// Create -> Add a new bike
router.get("/add", (req, res, next) => {
  res.render("user/bike/add");
});

router.post("/add", async (req, res, next) => {
  const { modelBike } = req.body;
  const loggedUser = req.user;
  try {
    const newBike = await Bike.create({
      model: modelBike,
      owner: loggedUser._id
    });
    return res.redirect("/user/bikes");
  } catch (e) {
    next();
  }
});

// Update -> edit a bike
router.get("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const bike = await Bike.findById(id);
    return res.render("user/bike/edit", { bike });
  } catch (e) {
    next();
  }
});

router.post("/edit/:id", async (req, res, next) => {
  const { modelBike } = req.body;
  const { id } = req.params;
  try {
    const bike = await Bike.findById(id);
    bike.model = modelBike;
    await bike.save();
    return res.redirect("/user/bikes");
  } catch (e) {
    next();
  }
});

// Delete -> Remove a bike
router.get("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  //const loggedUser = req.user;
  try {
    const bike = await Bike.findByIdAndRemove(id);
    return res.redirect("/user/bikes");
  } catch (e) {
    next();
  }
});

//lcoation Bikes
router.post("/location", async (req, res, next) => {
  const { id, longitude, latitude } = req.body;
  try {
    const bike = await Bike.findById(id);
    bike.location.coordinates = [longitude, latitude];
    await bike.save();
    return res.json({});
  } catch (e) {
    next();
  }
});

router.post("/location/check", async (req, res, next) => {
  const { id, longitude, latitude } = req.body;
  try {
    const bike = await Bike.findById(id);
    const reports = await Report.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: 1000, //1km
          $minDistance: 0
        }
      }
    });
    //bike.location.coordinates = [longitude, latitude];
    //await bike.save();
    return res.json({ reports });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
