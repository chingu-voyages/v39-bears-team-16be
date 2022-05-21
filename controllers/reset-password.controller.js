require('dotenv').config();
const passwordResetTokens = require('../dao/password-reset-token.dao');
const { hashPassword } = require('../utilities/password.util');
const users = require('../dao/user.dao');

function ResetPasswordController() {
  this.store = async (req, res, next) => {
    const { email, password, token } = req.body;

    try {
      // check if the token is valid
      const resetPasswordToken = await passwordResetTokens.findToken({
        email,
        token,
      });

      if (!resetPasswordToken) {
        return res.status(400).send({ err: 'token is not valid.' });
      }
      // generating hashed password and salt
      const { hashedPassword, salt } = hashPassword(password);
      // update the database
      const updated = await users.updateUserPasswordByEmail(email, hashedPassword, salt);

      if (!updated) {
        res.set(400).send({ msg: 'failed to update.' });
      }

      const deleted = await passwordResetTokens.deleteTokenBy('email', email);

      if (deleted.deletedCount !== 1) {
        res.status(400).send({ msg: 'failed to update.' });
      }

      return res.status(200).send({ message: 'Password has been reset.' });
    } catch (err) {
      return next(err);
    }
  };
}

const resetPasswordController = new ResetPasswordController();

Object.freeze(resetPasswordController);

module.exports = resetPasswordController;
