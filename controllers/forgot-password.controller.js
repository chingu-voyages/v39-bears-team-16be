require('dotenv').config();

const crypto = require('crypto');
const transporter = require('../utilities/ses-transport.util');
const users = require('../dao/user.dao');
const passwordResetTokens = require('../dao/password-reset-token.dao');

function ForgotPasswordController() {
  this.store = async (req, res, next) => {
    const { email } = req.body;

    try {
      // check if user exists
      const user = await users.findUserBy('email', email);

      if (!user) {
        return res.status(400).send({ errors: [{ msg: 'Email not found.', value: 'email' }] });
      }
      // check if token already existed
      let passwordResetToken = await passwordResetTokens.findTokenBy('email', user.email);

      // if not create a new one
      if (!passwordResetToken) {
        const token = {
          email: user.email,
          token: crypto.randomBytes(32).toString('hex'),
          createdAt: new Date(),
        };

        const result = await passwordResetTokens.insertToken(token);
        passwordResetToken = await passwordResetTokens.findTokenBy('_id', result.insertedId);
      }
      // set the url
      const url = `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken.token}`;
      // send email
      await transporter.sendMail({
        from: 'v39bearsteam16@gmail.com',
        to: email,
        subject: 'Reset password link',
        html: `<a href=${url}>Click here to reset password</a>`,
      });

      return res.status(200).send({ msg: 'Email sent.' });
    } catch (err) {
      return next(err);
    }
  };
}

const forgotPasswordController = new ForgotPasswordController();

Object.freeze(forgotPasswordController);

module.exports = forgotPasswordController;
