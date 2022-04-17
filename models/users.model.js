let users;

function UsersModel() {
  this.injectDB = async function injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.MONGODB_DB).collection("users");
    } catch (err) {
      console.error(err);
    }
  };

  this.getUsers = async function getUsers() {
    try {
      const cursor = await users.find({});
      const data = cursor.toArray();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
};

const User = new UsersModel();

Object.freeze(User);

module.exports = User
