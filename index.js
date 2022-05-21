require('dotenv').config();
const { MongoClient } = require('mongodb');
const users = require('./dao/user.dao');
const passwordResetTokens = require('./dao/password-reset-token.dao');
const classworkTypes = require('./dao/classwork-type.dao');
const cohorts = require('./dao/cohort.dao');
const classes = require('./dao/class.dao');

const app = require('./server');
const port = process.env.PORT || 8000;
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const main = async () => {
  try {
    await client.connect();
    await users.initialize(client);
    await passwordResetTokens.initialize(client);
    await classworkTypes.initialize(client);
    await cohorts.initialize(client);
    await classes.initialize(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main().catch(console.error);
