const express = require("express");

const resetPasswordRequest = require("../middlewares/requests/reset-password.request");
// requests
const registerStoreRequest = require("../middlewares/requests/register-store.request");
const loginStoreRequest = require("../middlewares/requests/login-store.request");
//middlewares
const { isAuth } = require("../middlewares/auth.middleware");
// controllers
const registerController = require("../controllers/register.controller.js");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const forgotPasswordController = require("../controllers/forgot-password.controller");
const resetPasswordController = require("../controllers/reset-password.controller");
// student controllers
const studentDashboardController = require("../controllers/student/dashboard.controller");

const router = express.Router();

router.route("/register").post(registerStoreRequest, registerController.store);
router.route("/login").post(loginStoreRequest, loginController.store);
router.route("/logout").post(logoutController.store);

router.route("/forgot-password").post(forgotPasswordController.store);
router
  .route("/reset-password/:token")
  .post(resetPasswordRequest, resetPasswordController.store);
router
  .route("/student/dashboard")
  .get(isAuth, studentDashboardController.store);
router.route("/fetchCsrfToken").get((req, res) => {
  res.json({ csrfToken: res.locals.csrfToken });
});

module.exports = router;
