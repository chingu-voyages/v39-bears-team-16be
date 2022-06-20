require('dotenv').config();

const { transporter, userDao, passwordResetTokenDao } = require('./index');

function ForgotPasswordController() {
  this.store = async (req, res, next) => {
    const { email } = req.body;

    try {
      // check if user exists
      const user = await userDao.find(email);

      if (!user) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Email not found.', value: 'email' }] });
      }

      // check if token already existed
      let passwordResetToken = await passwordResetTokenDao.find(user.email);

      // if not create a new one
      if (!passwordResetToken) {
        await passwordResetTokenDao.create(user.email);
        passwordResetToken = await passwordResetTokenDao.find(user.email);
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
