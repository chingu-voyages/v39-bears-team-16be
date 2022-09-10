const signUpStoreRequest = require('../app/http/requests/sign-up-store.request');
const signInStoreRequest = require('../app/http/requests/sign-in-store.request');
const forgotPasswordStoreRequest = require('../app/http/requests/forgot-password-store.request');
const resetPasswordRequest = require('../app/http/requests/reset-password-store.request');
const signUpController = require('../app/http/controllers/auth/sign-up.controller');
const signInController = require('../app/http/controllers/auth/sign-in.controller');
const logoutController = require('../app/http/controllers/auth/logout.controller');
const forgotPasswordController = require('../app/http/controllers/auth/forgot-password.controller');
const resetPasswordController = require('../app/http/controllers/auth/reset-password.controller');
const githubAuthController = require('../app/http/controllers/auth/github-auth.controller');
const planController = require('../app/http/controllers/plan.controller');
const classController = require('../app/http/controllers/class.controller');
const classworkController = require('../app/http/controllers/classwork.controller');
const enrollmentController = require('../app/http/controllers/enrollment.controller');
const { isAuth } = require('../app/http/middlewares/auth.middleware');

module.exports = {
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
};

export {};