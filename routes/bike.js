const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bike = require("../models/Bike");

router.get("/", async (req, res, next) => {
  const loggedUser = req.user;
  const bikes = await Bike.find({ owner: loggedUser.username });
  res.render("user/bike/bikes", { bikes });
});

// Create -> Add a new bike
router.get("/add", (req, res, next) => {
  res.render("user/bike/add");
});

router.post("/add", async (req, res, next) => {
  const { modelBike } = req.body;
  const loggedUser = req.user;

  const newBike = await Bike.create({
    model: modelBike,
    owner: loggedUser.username
  });

  res.redirect("/user/bikes");
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

module.exports = router;
