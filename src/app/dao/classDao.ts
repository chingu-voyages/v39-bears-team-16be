/* eslint-disable object-curly-newline */
import ClassModel from '../models/ClassModel';
import ClassworkModel from '../models/ClassworkModel';
const { ObjectId } = require('mongodb');
const { ClassworkType } = require('../models/ClassworkModel');

function ClassDao() {
  let classCollection;

  this.initialize = async (client) => {
    if (classCollection) {
      return;
    }

    try {
      classCollection = await client.db().collection('classes');
    } catch (err) {
      console.error(err);
    }
  };

  this.find = async (_id) => {
    try {
      const result = await classCollection.findOne({ _id: ObjectId(_id) });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.create = async ({ name, description, completed, classworks, createdAt }) => {
    const classInstance = new ClassModel(name, description, completed, classworks, createdAt);
    try {
      const result = await classCollection.insertOne(classInstance);

      return result.insertedId;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };

  this.update = async ({ _id, name, description, classworks, completed }) => {
    const result = await classCollection.updateOne(
      { _id: ObjectId(_id) },
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
  };

  this.delete = async (_id) => {
    try {
      const result = await classCollection.deleteOne({ _id: ObjectId(_id) });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.allClassworks = async (classId) => {
    try {
      const classworks = await classCollection.findOne(
        { _id: ObjectId(classId) },
        { projection: { classworks: 1, _id: 0 } }
      );
      return classworks;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.createClasswork = async ({
    classId = '',
    name = '',
    description = '',
    link = '',
    type = '',
  }) => {
    const newClasswork = new ClassworkModel(
      name,
      description,
      type === ClassworkType.ASSIGNMENT ? '' : link,
      type
    );

    try {
      const result = await classCollection.updateOne(
        {
          _id: ObjectId(classId),
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
      throw new Error(err.message);
    }
  };

  this.deleteClasswork = async ({ classId, classworkId }) => {
    console.log(typeof classworkId);
    try {
      const result = await classCollection.updateOne(
        { _id: ObjectId(classId) },
        { $pull: { classworks: { _id: ObjectId(classworkId) } } }
      );

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };
}

const classDao = new ClassDao();

Object.freeze(classDao);

module.exports = classDao;
