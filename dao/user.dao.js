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
      isAdmin: false,
      createdAt: new Date(),
      photo:
        "https://images.unsplash.com/photo-1623584973952-182bcb43b8ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
      loginCount: 0,
    };

    try {
      const result = await users.insertOne(user);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  this.updateUserPasswordByEmail = async function updateUserPasswordByEmail(
    email,
    hashedPassword,
    salt
  ) {
    const filter = {
      email,
    };

    const updateDoc = {
      $set: {
        password: hashedPassword,
        salt,
      },
    };

    try {
      const result = await users.updateOne(filter, updateDoc);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  this.attemptLogin = async function attemptLogin(email) {
    try {
      const result = await users.findOneAndUpdate(
        { email },
        { $inc: { loginCount: 1 } }
      );
      return result.value;
    } catch (err) {
      console.error(err);
    }
  };

  this.upsertUser = async function upsertUser(twitterId) {
    try {
      console.log("upserting");
      const result = await users.update({ twitterId }, { twitterId }, { upsert: true });
      
      console.log("upserting done");
      return result;
    } catch (err) {
      console.error(err);
    }
  }
}

const userDao = new UserDao();

Object.freeze(userDao);

module.exports = userDao;
