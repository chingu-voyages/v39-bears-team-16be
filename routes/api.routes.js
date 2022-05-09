const express = require("express");
const userController = require("../controllers/user.controller.js");
const loginController = require("../controllers/login.controller");
const dashboardController = require("../controllers/admin/dashboard.controller");
const forgotPasswordController = require("../controllers/forgot-password.controller");
const resetPasswordController = require("../controllers/reset-password.controller");
const userStoreRequest = require("../middlewares/requests/user-store.request");
const loginStoreRequest = require("../middlewares/requests/login-store.request");
const forgotPasswordRequest = require("../middlewares/requests/forgot-password.request");
const resetPasswordRequest = require("../middlewares/requests/reset-password.request");
const passport = require("../middlewares/passport.middleware");
const { isAuth, isAdmin } = require("../middlewares/auth.middleware");
const cohortController = require("../controllers/admin/cohort.controller.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router
  .route("/login")
  // .get((req, res) => {
  //   res.render("login");
  // })
  .post(
    loginStoreRequest,
    loginController.store,
    passport.authenticate("local", {
      failureRedirect: "/login",
    }),
    (req, res, next) => {
      if (req.user.isAdmin) {
        res.redirect("/admin");
      } else {
        res.redirect("/classroom");
      }
    }
  );

router
  .route("/register")
  // .get((req, res) => {
  //   res.render("register");
  // })
  .post(userStoreRequest, userController.store);

router.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
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
