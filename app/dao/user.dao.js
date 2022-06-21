const { defaultProfilePicture } = require('../../config/defaultVars.config');

let userCollection;

function UserDao() {
  this.initialize = async (client) => {
    if (userCollection) {
      return;
    }

    try {
      userCollection = await client.db().collection('users');
    } catch (err) {
      console.error(err);
    }
  };

  this.all = async () => {
    try {
      const users = await userCollection
        .find()
        .project({ _id: 0, hash: 0, salt: 0 });
      return users.toArray();
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.find = async (email) => {
    try {
      const user = await userCollection.findOne(
        { email },
        { projection: { _id: 0 } },
      );
      return user;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.create = async ({
    name = '',
    profilePicture = defaultProfilePicture,
    email = '',
    hash = '',
    salt = '',
    sex = null,
    location = '',
    isAdmin = false,
    lastLogin = null,
    loginCount = 0,
    createdAt = new Date(),
  }) => {
    try {
      const result = await userCollection.insertOne({
        name,
        profilePicture,
        email,
        hash,
        salt,
        sex,
        location,
        isAdmin,
        lastLogin,
        loginCount,
        createdAt,
      });

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.findOrCreate = async ({
    name = '',
    profilePicture = defaultProfilePicture,
    email = '',
    hash = '',
    salt = '',
    sex = null,
    location = '',
    isAdmin = false,
    lastLogin = null,
    loginCount = 0,
    createdAt = new Date(),
  }) => {
    try {
      const result = await userCollection.findOneAndUpdate(
        { email },
        {
          $setOnInsert: {
            name,
            profilePicture,
            email,
            hash,
            salt,
            sex,
            location,
            isAdmin,
            lastLogin,
            loginCount,
            createdAt,
          },
        },
        {
          upsert: true,
          returnNewDocument: true,
          projection: { _id: 0, hash: 0, salt: 0 },
        },
      );
      return result.value;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.updatePassword = async (email, hash, salt) => {
    try {
      const result = await userCollection.updateOne(
        {
          email,
        },
        {
          $set: {
            hash,
            salt,
          },
        },
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.login = async (email) => {
    try {
      const result = await userCollection.findOneAndUpdate(
        { email },
        { $set: { lastLogin: new Date() }, $inc: { loginCount: 1 } },
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };
}

const userDao = new UserDao();

Object.freeze(userDao);

module.exports = userDao;