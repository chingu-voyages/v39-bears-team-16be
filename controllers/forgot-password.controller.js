const { validationResult } = require("express-validator");
const transporter = require("../utilities/ses-transport.util");
const users = require("../dao/user.dao");
const passwordResetTokens = require("../dao/password-reset-token.dao");

function ForgotPasswordController() {
  this.store = async function store(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;

    try {
      const user = await users.findUserBy("email", email);

      if (!user) {
        return res.status(400).send("email not found.");
      }

      const passwordResetToken = await passwordResetTokens.findToken(token, user._id)

      res.send("email sent.");
    } catch (err) {
      console.error(err);
    }

    // async (req, res) => {
    //   try {
    //     const info = await transporter.sendMail({
    //       from: "v39bearsteam16@gmail.com",
    //       to: "theodorusandi.g@gmail.com",
    //       subject: "test Amazon SES",
    //       text: "Hello world?",
    //       html: "<h1>Hello world?</h1>",
    //     });
    //     res.send(`message sent ${info.messageId}`);
    //   } catch (err) {
    //     console.error(err);
    //     res.send(err);
    //   }
    // }
  };
}

const forgotPasswordController = new ForgotPasswordController();

Object.freeze(forgotPasswordController);

module.exports = forgotPasswordController;
