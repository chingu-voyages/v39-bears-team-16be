import * as mongodb from 'mongodb';
import PlanModel from '../models/PlanModel';
import { ClassInterface } from '../models/ClassModel';
// import { defaultProfilePicture } from '../../config/defaultVars.config';

class PlanDao {
  static planCollection: mongodb.Collection | undefined;

  static async initialize(client: mongodb.MongoClient) {
    if (this.planCollection) {
      return;
    }

    try {
      this.planCollection = await client.db().collection('plans');
    } catch (err) {
      console.error(err);
    }
  };

  static async all() {
    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    try {
      const cursor = await this.planCollection.find();
      return cursor.toArray();
    } catch (err) {
      console.error(err);
    }
  };

  static async allByUser(email:string) {
    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    try {
      const cursor = await this.planCollection.find({ createdBy: email });
      return cursor.toArray();
    } catch (err) {
      console.error(err);
    }
  };

  static async find(_id: string) {
    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    try {
      const plan = await this.planCollection.findOne({ _id: new mongodb.ObjectId(_id) });
      return plan;
    } catch (err) {
      console.error(err);
    }
  };

  static async create({
    name,
    description,
    thumbnail,
    tags,
    likes,
    classes,
    createdBy,
    visible,
    createdAt,
  }:{
    name: string;
    description: string;
    thumbnail: File;
    tags: string[];
    likes: number;
    classes: ClassInterface[];
    createdBy: string;
    visible: boolean;
    createdAt: Date;
  }) {
    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    const planObject = new PlanModel(
        name,
        description,
        thumbnail,
        tags=[], //error without default
        likes,
        classes=[], //error without default
        createdBy,
        visible,
        createdAt
    )
    try {
      const result = await this.planCollection.insertOne(planObject);

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  static async update ({
    _id,
    name,
    description,
    thumbnail,
    tags = [],
    classes,
    likes,
    visible,
  }:{
    _id: string;
    name: string;
    description: string;
    thumbnail:File;
    tags: string[];
    classes: ClassInterface[];
    likes: number;
    visible: boolean
  }) {

    //why extra checks here?
    const planObject = {
      ...(name && { name }),
      ...(description && { description }),
      ...(thumbnail && { thumbnail }),
      ...(tags && { tags }),
      ...(classes && { classes }),
      ...(likes && { likes }),
      ...((visible === true || visible === false) && { visible }),
    };

    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    try {
      const result = await this.planCollection.updateOne(
        { _id: new mongodb.ObjectId(_id) },
        {
          $set: planObject,
        },
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  static async updateLike({ 
    planId, 
    val, 
    session 
  }:{
    planId: string;
    val: number;
    session: //???
  }) {
    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    try {
      const result = await this.planCollection.updateOne(
        { _id: new mongodb.ObjectId(planId) },
        { $inc: { likes: val } },
        {
          session,
        },
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  static async delete(_id: string) {
    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    try {
      const result = await this.planCollection.deleteOne({ _id: new mongodb.ObjectId(_id) });
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  static async allClasses(_id:string) {
    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    try {
      const cursor = await this.planCollection.aggregate([
        {
          $match: {
            _id: new mongodb.ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: 'classes',
            localField: 'classes',
            foreignField: '_id',
            as: 'classes',
          },
        },
      ]);

      const data = await cursor.toArray();

      return data[0];
    } catch (err) {
      console.error(err);
    }
  };

  static async addClass({ 
    planId, 
    classId 
  }:{
    planId: string;
    classId: string;
  }) {
    if (!this.planCollection) {
        throw new Error(`Plan collection hasn't been initialized`);
    }
    try {
      const result = await this.planCollection.updateOne(
        {
          _id: new mongodb.ObjectId(planId),
        },
        {
          $push: { classes: new mongodb.ObjectId(classId) },
        },
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  };
}

export default PlanDao;
