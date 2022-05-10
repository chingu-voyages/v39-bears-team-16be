const express = require("express");

const forgotPasswordRequest = require("../middlewares/requests/forgot-password.request");
const resetPasswordRequest = require("../middlewares/requests/reset-password.request");
// controllers
const userController = require("../controllers/user.controller.js");
const loginController = require("../controllers/login.controller");
const dashboardController = require("../controllers/admin/dashboard.controller");
const forgotPasswordController = require("../controllers/forgot-password.controller");
const resetPasswordController = require("../controllers/reset-password.controller");
const cohortController = require("../controllers/admin/cohort.controller.js");

const passport = require("../middlewares/passport.middleware");
const { isAuth, isAdmin } = require("../middlewares/auth.middleware");

const res = require("express/lib/response");

const router = express.Router();

router.route("/register").post(userController.store);

router.route("/login").post(loginController.store);

router.post("/logout", (req, res, next) => {
  req.logout();
});

// router.get("/classroom", isAuth, (req, res) => {
//   res.render("classroom");
// });

// router.get("/admin", isAdmin, cohortController.index);

// router.get("/admin/:cohortId/dashboard", dashboardController.index);

router
  .route("/forgot-password")
  // .get((req, res) => {
  //   res.render("forgot-password");
  // })
  .post(forgotPasswordRequest, forgotPasswordController.store);

router
  .route("/reset-password/:token")
  // .get((req, res) => {
  //   const token = req.params.token;
  //   res.render("reset-password", { token });
  // })
  .post(resetPasswordRequest, resetPasswordController.store);

router.route("/fetchCsrfToken").get((req, res) => {
  res.json({ csrfToken: res.locals.csrfToken });
});

module.exports = router;
