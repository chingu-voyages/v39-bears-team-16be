const express = require("express");

const resetPasswordRequest = require("../middlewares/requests/reset-password.request");
// requests
const userStoreRequest = require("../middlewares/requests/user-store.request");
const loginStoreRequest = require("../middlewares/requests/login-store.request");
// controllers
const userController = require("../controllers/user.controller.js");
const loginController = require("../controllers/login.controller");
const forgotPasswordController = require("../controllers/forgot-password.controller");
const resetPasswordController = require("../controllers/reset-password.controller");
// student controllers
const studentDashboardController = require("../controllers/student/dashboard.controller");

const router = express.Router();

router.route("/register").post(userStoreRequest, userController.store);
router.route("/login").post(loginStoreRequest, loginController.store);
router.post("/logout", (req, res) => {
  req.logout();
});

router.route("/forgot-password").post(forgotPasswordController.store);
router
  .route("/reset-password/:token")
  .post(resetPasswordRequest, resetPasswordController.store);
router.route("/student/dashboard").get(studentDashboardController.store);
router.route("/fetchCsrfToken").get((req, res) => {
  res.json({ csrfToken: res.locals.csrfToken });
});

module.exports = router;
