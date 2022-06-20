const crypto = require('crypto');

let passwordResetTokenCollection;

function PasswordResetTokenDao() {
  this.initialize = async (client) => {
    if (passwordResetTokenCollection) {
      return;
    }

    try {
      passwordResetTokenCollection = await client
        .db()
        .collection('passwordResetTokens');
    } catch (err) {
      console.error(err);
    }
  };

  this.create = async (
    email,
    token = crypto.randomBytes(32).toString('hex'),
    createdAt = new Date(),
  ) => {
    try {
      const result = await passwordResetTokenCollection.insertOne({
        email,
        token,
        createdAt,
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.find = async (email) => {
    try {
      const passwordResetToken = await passwordResetTokenCollection.findOne({
        email,
      });
      return passwordResetToken;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.delete = async (email) => {
    try {
      const result = await passwordResetTokenCollection.deleteOne({ email });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };
}

const passwordResetTokenDao = new PasswordResetTokenDao();

Object.freeze(passwordResetTokenDao);

module.exports = passwordResetTokenDao;
