const crypto = require('crypto');

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex');

  return {
    hash,
    salt,
  };
};

module.exports = { hashPassword };
