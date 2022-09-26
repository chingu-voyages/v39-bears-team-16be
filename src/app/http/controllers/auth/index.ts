import passport from '../../../../config/passport.config';

const transporter = require('../../../../utilities/ses-transport.util');
const logDao = require('../../../dao/log.dao');
const passwordResetTokenDao = require('../../../dao/password-reset-token.dao');
const { hashPassword } = require('../../../../utilities/password.util');

module.exports = {
  transporter,
  logDao,
  passwordResetTokenDao,
  passport,
  hashPassword,
};
