const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const passport = require("../middlewares/passport.middleware");
const { isAuth } = require("../middlewares/auth.middleware");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", userController.store);

router.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.get("/dashboard", isAuth, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
