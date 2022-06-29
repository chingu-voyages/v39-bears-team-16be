require('dotenv').config();

const { passwordResetTokenDao, userDao, hashPassword } = require('./index');

function ResetPasswordController() {
  this.store = async (req, res, next) => {
    const { email, password, token } = req.body;

    try {
      // check if the token is valid
      const resetPasswordToken = await passwordResetTokenDao.find(email);

      if (resetPasswordToken.token !== token) {
        return res.status(400).send({ err: 'token is not valid.' });
      }
      // generate has and salt
      const { hash, salt } = hashPassword(password);
      // update the database
      const updated = await userDao.updatePassword({ email, hash, salt });

      if (!updated) {
        res.set(400).send({ msg: 'failed to update.' });
      }

      const deleted = await passwordResetTokenDao.delete(email);

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
