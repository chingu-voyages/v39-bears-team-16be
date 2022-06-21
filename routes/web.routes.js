const express = require('express');

const {
  signUpStoreRequest,
  signInStoreRequest,
  forgotPasswordStoreRequest,
  resetPasswordRequest,
  signUpController,
  signInController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  githubAuthController,
  planController,
} = require('./index');

const router = express.Router();
// local
router.route('/sign-up').post(signUpStoreRequest, signUpController.store);
router.route('/sign-in').post(signInStoreRequest, signInController.store);
router.route('/logout').post(logoutController.store);
router
  .route('/forgot-password')
  .post(forgotPasswordStoreRequest, forgotPasswordController.store);
router
  .route('/reset-password')
  .post(resetPasswordRequest, resetPasswordController.store);
// github
router.route('/auth/github').get(githubAuthController.index);
router.route('/auth/github/callback').get(githubAuthController.store);
// resources
router.route('/plans/create').post(planController.store);
router.route('/plans/:planId').get(planController.show);
router.route('plans/:planId').put(planController.update);
router.route('/plans/:planId').delete(planController.destroy);
// csrf token
router.route('/fetchCsrfToken').get((req, res) => {
  res.status(200).send({ csrfToken: req.csrfToken() });
});

module.exports = router;
