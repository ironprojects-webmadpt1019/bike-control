const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const auth = require("./auth");
router.use("/auth", auth);

const user = require("./user");
router.use("/user", user);

module.exports = router;
