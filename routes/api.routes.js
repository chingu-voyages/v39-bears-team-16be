const express = require("express");

const resetPasswordRequest = require("../middlewares/requests/reset-password.request");
// requests
const registerStoreRequest = require("../middlewares/requests/register-store.request");
const loginStoreRequest = require("../middlewares/requests/login-store.request");
const forgotPasswordRequest = require("../middlewares/requests/forgot-password.request");
const adminClassStoreRequest = require("../middlewares/requests/admin/admin-class-store.request");
//middlewares
const passport = require("../middlewares/passport.middleware");
const { isAuth, isAdmin } = require("../middlewares/auth.middleware");
// controllers
const registerController = require("../controllers/register.controller.js");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const forgotPasswordController = require("../controllers/forgot-password.controller");
const resetPasswordController = require("../controllers/reset-password.controller");
const authGithubController = require("../controllers/auth-github.controller");
// admin ctonrollers
const adminCohortController = require("../controllers/admin/admin-cohort.controller");
const adminClassController = require("../controllers/admin/admin-class.controller");
// student controllers
const studentCohortController = require("../controllers/student/student-cohort.controller");

const router = express.Router();

router.route("/register").post(registerStoreRequest, registerController.store);
router.route("/login").post(loginStoreRequest, loginController.store);
router.route("/logout").post(logoutController.store);
router
  .route("/forgot-password")
  .post(forgotPasswordRequest, forgotPasswordController.store);
router
  .route("/reset-password")
  .post(resetPasswordRequest, resetPasswordController.store);

router
  .route("/auth/github")
  .get(passport.authenticate("github", { scope: ["user:email"] }));

router.route("/auth/github/callback").get(authGithubController.store);

// admin
router.route("/admin/cohorts").get(isAdmin, adminCohortController.index);
router.route("/admin/cohorts/create").post(isAdmin,
  adminClassStoreRequest,
  adminCohortController.store
);
router
  .route("/admin/cohorts/:cohortId/class")
  .get(isAdmin, adminClassController.index);
// student
router.route("/student/cohorts").get(isAuth, studentCohortController.index);

router.route("/fetchCsrfToken").get((req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
