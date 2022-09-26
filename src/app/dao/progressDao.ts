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
      await this.progressCollection.updateOne(
        {
          user: email,
          planId: new mongodb.ObjectId(planId),
        },
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

      const totalClassworkProgress = await this.progressCollection.aggregate([
        {
          $match: {
            user: `${email}`,
            planId: `${new mongodb.ObjectId(planId)}`,
          },
        },
        // {
        //   $match: {
        //     'classes.classId': `${new mongodb.ObjectId(classId)}`,
        //   },
        // },
        // {
        //   $project: {
        //     totalClassworkProgress: {
        //       $sum: '$classworks.classworkProgress',
        //     },
        //   },
        // },
      ]);

      console.log('classwork progress', await totalClassworkProgress.toArray());

      return await totalClassworkProgress.toArray();
    } catch (err) {
      console.error(err);
    }
  }
}

export default ProgressDao;
