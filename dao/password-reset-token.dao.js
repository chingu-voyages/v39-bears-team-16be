let passwordResetTokens;

function PasswordResetTokenDao() {
  this.initialize = async function initialize(client) {
    if (passwordResetTokens) {
      return;
    }

    try {
      passwordResetTokens = await client
        .db()
        .collection("password_reset_tokens");

      passwordResetTokens.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: 300 }
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.insertToken = async function insertToken(token) {
    try {
      const result = await passwordResetTokens.insertOne(token);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  this.findTokenBy = async function findTokenBy(key, value) {
    try {
      const passwordResetToken = await passwordResetTokens.findOne({
        [key]: value,
      });
      return passwordResetToken;
    } catch (err) {
      console.error(err);
    }
  };

  this.deleteTokenBy = async function deleteTokenBy(key, value) {
    const query = {
      [key]: value,
    };
    try {
      const result = await passwordResetTokens.deleteOne(query);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  this.findToken = async function findToken(query) {
    try {
      const passwordResetToken = await passwordResetTokens.findOne(query);
      return passwordResetToken;
    } catch (err) {
      console.error(err);
    }
  };
}

const passwordResetTokenDao = new PasswordResetTokenDao();

Object.freeze(passwordResetTokenDao);

module.exports = passwordResetTokenDao;
