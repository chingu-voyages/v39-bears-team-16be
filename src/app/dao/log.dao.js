let logCollection;

function LogDao() {
  this.initialize = async (client) => {
    if (logCollection) {
      return;
    }

    try {
      logCollection = await client.db().collection('logs');
    } catch (err) {
      console.error(err);
    }
  };

  this.login = async (email) => {
    try {
      const result = await logCollection.insertOne({
        user: email,
        action: 'login',
        createdAt: new Date(),
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.logout = async (email) => {
    try {
      const result = await logCollection.insertOne({
        user: email,
        action: 'logout',
        createdAt: new Date(),
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };
}

const logDao = new LogDao();

module.exports = logDao;
