let passwordResetTokens;

function PasswordResetTokenDao() {
  this.initialize = async function initialize(client) {
    if (passwordResetTokens) {
      return;
    }

    try {
      passwordResetTokens = await client
        .db()
        .collection("password_reset_tokens")        
        .createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } );
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

  this.findToken = async function findToken(token, user_id) {
    try {
      const passwordResetToken = await passwordResetTokens.findOne({
        token,
        user_id,
      });
      return passwordResetToken;
    } catch (err) {
      console.error(err);
    }
  };

  this.createToken = async function createToken() {

  }
}

const passwordResetTokenDao = new PasswordResetTokenDao();

Object.freeze(passwordResetTokenDao);

module.exports = passwordResetTokenDao;
