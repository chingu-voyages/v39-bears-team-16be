const { ObjectId } = require('mongodb');
const { defaultProfilePicture } = require('../../config/defaultVars.config');

function UserDao() {
  let userCollection;

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
      const cursor = await userCollection.find({}, { projection: { _id: 0, hash: 0, salt: 0 } });
      return cursor.toArray();
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.find = async (email) => {
    try {
      const user = await userCollection.findOne({ email }, { projection: { _id: 0 } });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.create = async ({
    name = '',
    email = '',
    hash = '',
    salt = '',
    profilePicture = defaultProfilePicture,
    location = '',
    sex = '',
    isAdmin = false,
    enrolledIn = [],
    createdAt = new Date(),
  }) => {
    try {
      const result = await userCollection.insertOne({
        name,
        email,
        hash,
        salt,
        profilePicture,
        location,
        sex,
        isAdmin,
        enrolledIn,
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
    email = '',
    hash = '',
    salt = '',
    profilePicture = defaultProfilePicture,
    location = '',
    sex = '',
    isAdmin = false,
    enrolledIn = [],
    createdAt = new Date(),
  }) => {
    try {
      const result = await userCollection.findOneAndUpdate(
        { email },
        {
          $setOnInsert: {
            name,
            email,
            hash,
            salt,
            profilePicture,
            location,
            sex,
            isAdmin,
            enrolledIn,
            createdAt,
          },
        },
        {
          upsert: true,
          returnNewDocument: true,
          projection: { _id: 0, hash: 0, salt: 0 },
        }
      );
      return result.value;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.updatePassword = async ({ email, hash, salt }) => {
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
        }
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.allPlans = async (email) => {
    try {
      const cursor = await userCollection.aggregate([
        {
          $match: {
            email,
          },
        },
        {
          $unwind: '$enrolledIn',
        },
        {
          $lookup: {
            from: 'plans',
            let: {
              planId: '$enrolledIn.planId',
              plans: '$enrolledIn',
              progress: '$enrolledIn.progress',
            },
            pipeline: [
              {
                $match: { $expr: { $eq: ['$_id', '$$planId'] } },
              },
              {
                $replaceRoot: {
                  newRoot: {
                    $mergeObjects: ['$$plans', '$$ROOT'],
                  },
                },
              },
              {
                $project: {
                  planId: 0,
                },
              },
            ],
            as: 'plans',
          },
        },
        {
          $group: {
            _id: '$_id',
            plans: { $push: { $first: '$plans' } },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);

      const data = await cursor.toArray();

      return data[0].plans;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.findPlan = async ({ email, planId }) => {
    try {
      const cursor = await userCollection.aggregate([
        {
          $match: {
            email,
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $first: {
                $filter: {
                  input: '$enrolledIn',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.planId', ObjectId(planId)],
                  },
                },
              },
            },
          },
        },
      ]);

      const plan = cursor.toArray();

      return plan;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.addPlan = async ({ email, planId }) => {
    const newPlanObj = {
      planId: ObjectId(planId),
      progress: 0,
      classes: [],
    };
    try {
      const result = await userCollection.updateOne(
        {
          email,
        },
        { $push: { enrolledIn: newPlanObj } }
      );

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.removePlan = async ({ email, planId }) => {
    try {
      const result = await userCollection.updateOne(
        {
          email,
        },
        {
          $pull: { enrolledIn: { planId: ObjectId(planId) } },
        }
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
