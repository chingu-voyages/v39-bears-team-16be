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
      const plans = await planCollection.find();
      return plans.toArray();
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
    createdBy = '',
    like = 0,
    visibility = false,
    tags = [],
    createdAt = new Date(),
  }) => {
    try {
      const result = await planCollection.insertOne({
        name,
        description,
        thumbnail,
        createdBy,
        like,
        visibility,
        tags,
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
    visibility,
    tags = [],
  }) => {
    try {
      const result = await planCollection.updateOne(
        { _id: ObjectId(_id) },
        {
          name,
          description,
          thumbnail,
          visibility,
          tags,
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
}

const planDao = new PlanDao();

Object.freeze(planDao);

module.exports = planDao;
