const crypto = require('crypto');

const generateHash = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, 310000, 32, 'sha256')
    .toString('hex');
};

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = generateHash(password, salt);

  return {
    salt,
    hashedPassword,
  };
};

const validatePassword = (password, hash, salt) => {
  const hashedPassword = generateHash(password, salt);
  return hash === hashedPassword;
};

module.exports = { hashPassword, validatePassword };
