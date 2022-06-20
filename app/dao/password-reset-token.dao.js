const { defaultCreationTS, defaultExpirationTime } = require('../config');

let passwordResetTokens;

function PasswordResetTokenDao() {
  this.initialize = async (client) => {
    if (passwordResetTokens) {
      return;
    }

    try {
      passwordResetTokens = await client.db().collection('passwordResetTokens');

      passwordResetTokens.createIndex(
        { createdAt: defaultCreationTS },
        { expireAfterSeconds: defaultExpirationTime }
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.insertToken = async (token) => {
    try {
      const result = await passwordResetTokens.insertOne(token);
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.findTokenBy = async (key, value) => {
    try {
      const passwordResetToken = await passwordResetTokens.findOne({
        [key]: value,
      });
      return passwordResetToken;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.deleteTokenBy = async (key, value) => {
    const query = {
      [key]: value,
    };
    try {
      const result = await passwordResetTokens.deleteOne(query);
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.findToken = async (query) => {
    try {
      const passwordResetToken = await passwordResetTokens.findOne(query);
      return passwordResetToken;
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

const passwordResetTokenDao = new PasswordResetTokenDao();

Object.freeze(passwordResetTokenDao);

module.exports = passwordResetTokenDao;
