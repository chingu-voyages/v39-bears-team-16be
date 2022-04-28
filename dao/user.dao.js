let users;

function UserDao() {
  this.initialize = async function initialize(client) {
    if (users) {
      return;
    }

    try {
      users = await client.db().collection("users");
      return;
    } catch (err) {
      console.error(err);
    }
  };

  this.findUserBy = async function findUserBy(key, value) {
    try {
      const user = await users.findOne({ [key]: value });
      return user;
    } catch (err) {
      console.error(err);
    }
  };

  this.insertUser = async function insertUser(user) {
    user = {
      ...user,
      isAdmin: false
    }
    try {
      const result = await users.insertOne(user);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  this.updateUserPasswordByEmail = async function updateUserPasswordByEmail(email, hashedPassword, salt) {
    const filter = {
      email,
    };

    const updateDoc = {
      $set: {
        password: hashedPassword,
        salt
      },
    };

    try {
      const result = await users.updateOne(filter, updateDoc);
      return result;
    } catch (err) {
      console.error(err);
    }
  };
}

const userDao = new UserDao();

Object.freeze(userDao);

module.exports = userDao;
