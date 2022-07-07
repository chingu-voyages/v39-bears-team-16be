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
  classController,
  classworkController,
  enrollmentController,
  isAuth,
} = require('./index');

const router = express.Router();
router.route('/').get((req, res) => {
  res.status(200).send('server is running');
});
// auth
router.route('/sign-up').post(signUpStoreRequest, signUpController.store);
router.route('/sign-in').post(signInStoreRequest, signInController.store);
router
  .route('/forgot-password')
  .post(forgotPasswordStoreRequest, forgotPasswordController.store);
router
  .route('/reset-password')
  .post(resetPasswordRequest, resetPasswordController.store);
// github
router.route('/auth/github').get(githubAuthController.index);
router.route('/auth/github/callback').get(githubAuthController.store);
// csrf token
router.route('/fetchCsrfToken').get((req, res) => {
  res.status(200).json({ csrfToken: req.csrfToken() });
});

router.use(isAuth);
// auth
router.route('/logout').post(logoutController.store);
// resources
// plans
router.route('/plans').get(planController.index);
router.route('/user/plans').get(planController.showByUser);
router.route('/plans').post(planController.store);
router.route('/plans/:planId').get(planController.show);
router.route('/plans/:planId').put(planController.update);
router.route('/plans/:planId').delete(planController.destroy);
// classes
router.route('/plans/:planId/classes').get(classController.index);
router.route('/plans/:planId/classes').post(classController.store);
router.route('/classes/:classId').get(classController.show);
router.route('/classes/:classId').put(classController.update);
router.route('/classes/:classId').delete(classController.destroy);
// classworks
router.route('/classes/:classId/classworks').post(classworkController.store);
router
  .route('/classes/:classId/classworks/:classworkId')
  .delete(classworkController.destroy);
// enrolled
router.route('/enrollments').get(enrollmentController.index);

module.exports = router;
