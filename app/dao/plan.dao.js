const { ObjectId } = require('mongodb');
const { defaultProfilePicture } = require('../../config/defaultVars.config');

let planCollection;

function PlanDao() {
  this.initialize = async (client) => {
    if (planCollection) {
      return;
    }

    try {
      planCollection = await client.db().collection('plans');
    } catch (err) {
      console.error(err);
    }
  };

  this.all = async () => {
    try {
      const cursor = await planCollection.find();
      return cursor.toArray();
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.allByUser = async (email) => {
    try {
      const cursor = await planCollection.find({ createdBy: email });
      return cursor.toArray();
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.find = async (_id) => {
    try {
      const plan = await planCollection.findOne({ _id: ObjectId(_id) });
      return plan;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.create = async ({
    name = '',
    description = '',
    thumbnail = defaultProfilePicture,
    tags = [],
    likes = 0,
    classes = [],
    createdBy = '',
    visible = false,
    createdAt = new Date(),
  }) => {
    try {
      const result = await planCollection.insertOne({
        name,
        description,
        thumbnail,
        tags,
        classes,
        createdBy,
        likes,
        visible,
        createdAt,
      });

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.update = async ({
    _id,
    name,
    description,
    thumbnail,
    tags = [],
    classes,
    likes,
    visible,
  }) => {
    const planObject = {
      ...(name && { name }),
      ...(description && { description }),
      ...(thumbnail && { thumbnail }),
      ...(tags && { tags }),
      ...(classes && { classes }),
      ...(likes && { likes }),
      ...((visible === true || visible === false) && { visible }),
    };

    try {
      const result = await planCollection.updateOne(
        { _id: ObjectId(_id) },
        {
          $set: planObject,
        },
      );

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.delete = async (_id) => {
    try {
      const result = await planCollection.deleteOne({ _id: ObjectId(_id) });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.allClasses = async (_id) => {
    try {
      const cursor = await planCollection.aggregate([
        {
          $match: {
            _id: ObjectId(_id),
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

      return data[0].classes;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.addClass = async ({ planId, classId }) => {
    try {
      const result = await planCollection.updateOne(
        {
          _id: ObjectId(planId),
        },
        {
          $push: { classes: ObjectId(classId) },
        },
      );

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };
}

const planDao = new PlanDao();

Object.freeze(planDao);

module.exports = planDao;
