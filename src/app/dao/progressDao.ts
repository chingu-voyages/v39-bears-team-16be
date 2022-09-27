import * as mongodb from 'mongodb';
import ProgressModel, { ProgressClassInterface, ProgressInterface } from '../models/ProgressModel';

class ProgressDao {
  static progressCollection: mongodb.Collection | undefined;

  static async initialize(client: mongodb.MongoClient) {
    if (this.progressCollection) {
      return;
    }

    try {
      this.progressCollection = await client.db().collection('progresses');
    } catch (err) {
      console.error(err);
    }
  }

  static async create({
    user,
    planId,
    classes,
  }: {
    user: string;
    planId: mongodb.ObjectId;
    classes: ProgressClassInterface[];
  }) {
    if (!this.progressCollection) {
      throw new Error(`Progress collection hasn't been initialized`);
    }

    const newProgress = new ProgressModel(user, planId, classes);

    try {
      const result = await this.progressCollection.insertOne(newProgress);

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  static async updateClassworkProgressValue({
    email,
    planId,
    classId,
    classworkId,
    val,
  }: {
    email: string;
    planId: mongodb.ObjectId;
    classId: mongodb.ObjectId;
    classworkId: mongodb.ObjectId;
    val: 1 | 0;
  }) {
    if (!this.progressCollection) {
      throw new Error(`Progress collection hasn't been initialized`);
    }

    try {
      const filter = {
        user: email,
        planId: new mongodb.ObjectId(planId),
      };

      await this.progressCollection.updateOne(
        filter,
        {
          $set: {
            'classes.$[class].classworks.$[classwork].classworkProgress': val,
          },
        },
        {
          arrayFilters: [
            { 'class.classId': new mongodb.ObjectId(classId) },
            { 'classwork.classworkId': new mongodb.ObjectId(classworkId) },
          ],
        }
      );

      const aggregationFilter = {
        $match: {
          user: `${email}`,
          planId: new mongodb.ObjectId(planId),
        },
      };

      const classworkProgressResult = await this.progressCollection
        .aggregate([
          aggregationFilter,
          {
            $unwind: '$classes',
          },
          {
            $match: {
              'classes.classId': new mongodb.ObjectId(classId),
            },
          },
          {
            $replaceRoot: {
              newRoot: '$classes',
            },
          },
          {
            $project: {
              numOfCompletedClassworks: {
                $sum: '$classworks.classworkProgress',
              },
              numOfClassworks: {
                $size: '$classworks',
              },
            },
          },
        ])
        .toArray();

      const { numOfCompletedClassworks, numOfClassworks } = classworkProgressResult[0];

      const classProgress = Number((numOfCompletedClassworks / numOfClassworks).toFixed(2));

      await this.progressCollection.updateOne(
        filter,
        {
          $set: {
            'classes.$[class].classProgress': classProgress,
          },
        },
        {
          arrayFilters: [{ 'class.classId': new mongodb.ObjectId(classId) }],
        }
      );

      const classProgressResult = await this.progressCollection
        .aggregate([
          aggregationFilter,
          {
            $project: {
              numOfCompletedClasses: {
                $sum: '$classes.classProgress',
              },
              numOfClasses: {
                $size: '$classes',
              },
            },
          },
        ])
        .toArray();

      const { numOfCompletedClasses, numOfClasses } = classProgressResult[0];

      const planProgress = Number(numOfCompletedClasses / numOfClasses).toFixed(2);

      await this.progressCollection.updateOne(filter, {
        $set: {
          planProgress,
        },
      });

      return true;
    } catch (err) {
      console.error(err);
    }
  }
}

export default ProgressDao;
