import * as mongodb from 'mongodb';
import { ClassInterface } from '../models/ClassModel';
import classDao = require('./classDao');
import planDao = require('./plan.dao');

const { defaultProfilePicture } = require('../../config/defaultVars.config');

class UserDao {
  static userCollection: mongodb.Collection | undefined;

  static async initialize(client: mongodb.MongoClient) {
    if (this.userCollection) {
      return;
    }

    try {
      this.userCollection = await client.db().collection('users');
    } catch (err) {
      console.error(err);
    }
  }

  static async all() {
    if (!this.userCollection) {
      return;
    }

    try {
      const cursor = await this.userCollection.find(
        {},
        { projection: { _id: 0, hash: 0, salt: 0 } }
      );
      return cursor.toArray();
    } catch (err) {
      console.error(err);
    }
  }

  static async find(email: string) {
    if (!this.userCollection) {
      return;
    }

    try {
      const user = await this.userCollection.findOne({ email }, { projection: { _id: 0 } });
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  static async create({
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
  }) {
    if (!this.userCollection) {
      return;
    }

    try {
      const result = await this.userCollection.insertOne({
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
    }
  }

  static async findOrCreate({
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
  }) {
    if (!this.userCollection) {
      return;
    }

    try {
      const user = await this.userCollection.findOne({ email });

      if (user) {
        return user;
      }

      const newUser = await this.userCollection.insertOne({
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

      return newUser;
    } catch (err) {
      console.error(err);
    }
  }

  static async updatePassword({
    email,
    hash,
    salt,
  }: {
    email: string;
    hash: string;
    salt: string;
  }) {
    if (!this.userCollection) {
      return;
    }

    try {
      const result = await this.userCollection.updateOne(
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
    }
  }

  static async allPlans(email: string) {
    if (!this.userCollection) {
      return;
    }
    try {
      const cursor = await this.userCollection.aggregate([
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
    }
  }

  static async findPlan({ email, planId }: { email: string; planId: string }) {
    if (!this.userCollection) {
      return;
    }

    try {
      const cursor = await this.userCollection.aggregate([
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
                    $eq: ['$$item.planId', new mongodb.ObjectId(planId)],
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
    }
  }

  static async addPlan({ email, planId }: { email: string; planId: string }) {
    if (!this.userCollection) {
      return;
    }

    const newPlanObj = {
      planId: new mongodb.ObjectId(planId),
      progress: 0,
      classes: [],
    };

    try {
      // const result = await this.userCollection.updateOne(
      //   {
      //     email,
      //   },
      //   { $push: { enrolledIn: newPlanObj } }
      // );

      const { classes } = await planDao.allClasses(planId);

      console.log('Classes', classes);

      const result = await Promise.all(
        classes.map((item: ClassInterface) => classDao.allClassworks(item._id))
      );

      console.log('Classworks', result);

      // return result;
    } catch (err) {
      console.error(err);
    }
  }

  static async removePlan({ email, planId }: { email: string; planId: string }) {
    if (!this.userCollection) {
      return;
    }

    try {
      const result = await this.userCollection.updateOne(
        {
          email,
        },
        {
          $pull: { enrolledIn: { planId: new mongodb.ObjectId(planId) } },
        }
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  }
}
export default UserDao;
