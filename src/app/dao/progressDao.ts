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

  static async markClassworkAsComplete({
    email,
    planId,
    classId,
    classworkId,
  }: {
    email: string;
    planId: mongodb.ObjectId;
    classId: mongodb.ObjectId;
    classworkId: mongodb.ObjectId;
  }) {
    if (!this.progressCollection) {
      throw new Error(`Progress collection hasn't been initialized`);
    }

    try {
      const result = await this.progressCollection.updateOne(
        {
          userEmail: `${email}`,
          planId: new mongodb.ObjectId(planId),
        },
        {
          $set: {},
        }
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  }
}

export default ProgressDao;
