require('dotenv').config();

const { MongoClient } = require('mongodb');

const users = require('./dao/user.dao');
const passwordResetTokenDao = require('./dao/password-reset-token.dao');
const cohortDao = require('./dao/cohort.dao');
const classDao = require('./dao/class.dao');
const app = require('./app');

const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGODB_URI);

const main = async () => {
  try {
    await client.connect();

    await users.initialize(client);
    await passwordResetTokenDao.initialize(client);
    await cohortDao.initialize(client);
    await classDao.initialize(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
