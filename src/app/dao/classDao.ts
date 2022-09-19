import ClassModel from '../models/ClassModel';
import ClassworkModel from '../models/ClassworkModel';
import { ClassworkInterface, ClassworkType } from '../models/ClassworkModel';
import * as mongodb from 'mongodb';

class ClassDao {
  static classCollection: mongodb.Collection | undefined;

  static async initialize(client: mongodb.MongoClient) {
    if (this.classCollection) {
      return;
    }

    try {
      this.classCollection = await client.db().collection('classes');
    } catch (err) {
      console.error(err);
    }
  }

  static async find(_id: mongodb.ObjectId) {
    if (!this.classCollection) {
      throw new Error(`class collection hasn't been initialized`);
    }

    try {
      const result = await this.classCollection.findOne({ _id: new mongodb.ObjectId(_id) });
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  static async create({ name, description }: { name: string; description: string }) {
    const classInstance = new ClassModel(name, description);

    if (!this.classCollection) {
      throw new Error(`class collection hasn't been initialized`);
    }

    try {
      const result = await this.classCollection.insertOne(classInstance);

      return result.insertedId;
    } catch (err) {
      console.error(err);
    }
  }

  static async update({
    _id,
    name,
    description,
    classworks,
    completed,
  }: {
    _id: mongodb.ObjectId;
    name: string;
    description: string;
    classworks: ClassworkInterface;
    completed: boolean;
  }) {
    if (!this.classCollection) {
      throw new Error(`class collection hasn't been initialized`);
    }

    const result = await this.classCollection.updateOne(
      { _id: new mongodb.ObjectId(_id) },
      {
        $set: {
          name,
          description,
          classworks,
          completed,
        },
      }
    );

    return result;
  }

  static async delete(_id: mongodb.ObjectId) {
    if (!this.classCollection) {
      throw new Error(`class collection hasn't been initialized`);
    }

    try {
      const result = await this.classCollection.deleteOne({ _id: new mongodb.ObjectId(_id) });
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  static async allClassworks(classId: mongodb.ObjectId) {
    if (!this.classCollection) {
      throw new Error(`class collection hasn't been initialized`);
    }

    try {
      const classworks = await this.classCollection.findOne(
        { _id: new mongodb.ObjectId(classId) },
        { projection: { classworks: 1, _id: 0 } }
      );
      return classworks;
    } catch (err) {
      console.error(err);
    }
  }

  static async createClasswork({
    classId,
    name = '',
    description = '',
    link = '',
    type = ClassworkType.MATERIAL,
  }: {
    classId: mongodb.ObjectId;
    name: string;
    description: string;
    link: string;
    type: ClassworkType;
  }) {
    if (!this.classCollection) {
      throw new Error(`class collection hasn't been initialized`);
    }

    const newClasswork = new ClassworkModel(
      name,
      description,
      type === ClassworkType.ASSIGNMENT ? '' : link,
      type
    );

    try {
      const result = await this.classCollection.updateOne(
        {
          _id: new mongodb.ObjectId(classId),
        },
        {
          $push: {
            classworks: newClasswork,
          },
        }
      );
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteClasswork({
    classId,
    classworkId,
  }: {
    classId: mongodb.ObjectId;
    classworkId: mongodb.ObjectId;
  }) {
    if (!this.classCollection) {
      throw new Error(`class collection hasn't been initialized`);
    }

    try {
      const result = await this.classCollection.updateOne(
        { _id: new mongodb.ObjectId(classId) },
        { $pull: { classworks: { _id: new mongodb.ObjectId(classworkId) } } }
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  }
}

export default ClassDao;
