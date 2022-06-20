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
};
