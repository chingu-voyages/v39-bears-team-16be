import * as mongodb from 'mongodb';
import { LikeModel } from '../models/LikeModel';

class LikeDao {
  static likeCollection: mongodb.Collection | undefined;

  static async initialize(client: mongodb.MongoClient) {
    if (this.likeCollection) {
      return;
    }
    try {
      this.likeCollection = await client.db().collection('likes');
    } catch (err) {
      console.error(err);
    }
  };

  static async show(email:string, planId:string) {
    if (!this.likeCollection) {
        throw new Error(`Likes collection hasn't been initialized`);
      }

    try {
      const result = await this.likeCollection.findOne({
        email,
        planId: new mongodb.ObjectId(planId),
      });

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  static async create({ 
    email,
    planId, 
    // session 
}: {
    email:string;
    planId: string; //the LikeModel receives planID as a string that it passes to mongodb.ObjectId to generate actual
    // session: //what type is this?
}) {
    if (!this.likeCollection) {
        throw new Error(`Likes collection hasn't been initialized`);
      }

    const likeInstance = new LikeModel(email, planId); 

    try {
      const result = await this.likeCollection.insertOne(
        likeInstance,
        // { session }
      );
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  static async delete({ 
    email, 
    planId, 
    // session 
}:{
    email: string;
    planId: string; //as above
    // session: //??
}) {
    if (!this.likeCollection) {
        throw new Error(`Likes collection hasn't been initialized`);
    }
    try {
      const result = await this.likeCollection.deleteOne(
        { email, planId: new mongodb.ObjectId(planId) }, 
        // { session }
        );
      return result;
    } catch (err) {
      console.error(err);
    }
  };
}

export default LikeDao;
