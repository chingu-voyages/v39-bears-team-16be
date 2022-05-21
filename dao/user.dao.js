const { defaultUserImage } = require('../config');

let users;

function UserDao() {
  this.initialize = async (client) => {
    if (users) {
      return;
    }

    try {
      users = await client.db().collection('users');
      return;
    } catch (err) {
      console.error(err);
    }
  };

  this.findUserBy = async (key, value) => {
    try {
      const user = await users.findOne({ [key]: value });
      return user;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.insertUser = async (user) => {
    const newUser = {
      ...user,
      isAdmin: false,
      createdAt: new Date(),
      photo: defaultUserImage,
      loginCount: 0,
    };

    try {
      const result = await users.insertOne(newUser);
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.updateUserPasswordByEmail = async (email, hashedPassword, salt) => {
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
      return err;
    }
  };

  this.attemptLogin = async (email) => {
    try {
      const result = await users.findOneAndUpdate({ email }, { $inc: { loginCount: 1 } });
      return result.value;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.findOrInsert = async (user) => {
    const { email, name } = user;
    try {
      const result = await users.findOneAndUpdate(
        { email },
        {
          $setOnInsert: {
            name,
            email,
            isAdmin: false,
            createdAt: new Date(),
            photo:
              'https://images.unsplash.com/photo-1623584973952-182bcb43b8ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80',
            loginCount: 0,
          },
        },
        {
          upsert: true,
          returnNewDocument: true,
        }
      );
      return result.value;
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

const userDao = new UserDao();

Object.freeze(userDao);

module.exports = userDao;
