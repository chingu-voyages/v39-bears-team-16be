import { Request, Response, NextFunction } from 'express';
import ClassworkController from '../app/http/controllers/classworkController';
import EnrolmentController from '../app/http/controllers/enrolmentController';
import ClassController from '../app/http/controllers/classController';

const express = require('express');
const likeController = require('../app/http/controllers/like.controller');

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
  isAuth,
} = require('./index');

const router = express.Router();
router.route('/').get((req: Request, res: Response) => {
  res.status(200).send('server is running');
});
// auth
router.route('/sign-up').post(signUpStoreRequest, signUpController.store);
router.route('/sign-in').post(signInStoreRequest, signInController.store);

router.route('/forgot-password').post(forgotPasswordStoreRequest, forgotPasswordController.store);
router.route('/reset-password').post(resetPasswordRequest, resetPasswordController.store);
// github
router.route('/auth/github').get(githubAuthController.index);
router.route('/auth/github/callback').get(githubAuthController.store);
// csrf token
router.route('/fetchCsrfToken').get((req: Request, res: Response) => {
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
router.route('/plans/:planId/like').post(likeController.like);
router.route('/plans/:planId/dislike').delete(likeController.dislike);
// classes
router.route('/plans/:planId/classes').get(ClassController.index);
router.route('/plans/:planId/classes').post(ClassController.store);
router.route('/classes/:classId').get(ClassController.show);
router.route('/classes/:classId').put(ClassController.update);
router.route('/classes/:classId').delete(ClassController.destroy);
// classworks
router.route('/classes/:classId/classworks').post(ClassworkController.store);
router.route('/classes/:classId/classworks/:classworkId').delete(ClassworkController.destroy);
// enrolled
router.route('/enrollments').get(EnrolmentController.index);
router.route('/enrollments').post(EnrolmentController.store);
router.route('/enrollments').delete(EnrolmentController.destroy);

module.exports = router;
