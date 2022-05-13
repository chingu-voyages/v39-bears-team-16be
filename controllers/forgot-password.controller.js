require("dotenv").config();

const forgotPasswordRequest = require("../middlewares/requests/forgot-password.request");
const { validationResult } = require("express-validator");
const transporter = require("../utilities/ses-transport.util");
const users = require("../dao/user.dao");
const passwordResetTokens = require("../dao/password-reset-token.dao");
const crypto = require("crypto");

function ForgotPasswordController() {
  this.store = async function store(req, res, next) {
    const email = req.body.email;

    try {
      // check if user exists
      const user = await users.findUserBy("email", email);

      if (!user) {
        return res.status(400).send("email not found.");
      }
      // check if token already existed
      let passwordResetToken = await passwordResetTokens.findTokenBy(
        "email",
        user.email
      );

      // if not create a new one
      if (!passwordResetToken) {
        const token = {
          email: user.email,
          token: crypto.randomBytes(32).toString("hex"),
          createdAt: new Date(),
        };

        const result = await passwordResetTokens.insertToken(token);
        passwordResetToken = await passwordResetTokens.findTokenBy(
          "_id",
          result.insertedId
        );
      }
      // set the url
      const url = `http://localhost:3000/reset-password/${passwordResetToken.token}`;
      // send email
      const message = await transporter.sendMail({
        from: "v39bearsteam16@gmail.com",
        to: email,
        subject: "Reset password link",
        html: `<a href=${url}>Click here to reset password</a>`,
      });

      res.status(200).send(`message sent ${message.messageId}`);
    } catch (err) {
      return next(err);
    }
  };
}

const forgotPasswordController = new ForgotPasswordController();

Object.freeze(forgotPasswordController);

module.exports = forgotPasswordController;
