require('dotenv').config();

const { MongoClient } = require('mongodb');

const app = require('./server');
const userDao = require('./app/dao/user.dao');
const passwordResetTokenDao = require('./app/dao/password-reset-token.dao');
const planDao = require('./app/dao/plan.dao');
const classDao = require('./app/dao/class.dao');
const logDao = require('./app/dao/log.dao');

const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGODB_URI);

const main = async () => {
  try {
    await client.connect();

    await userDao.initialize(client);
    await passwordResetTokenDao.initialize(client);
    await planDao.initialize(client);
    await classDao.initialize(client);
    await logDao.initialize(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
