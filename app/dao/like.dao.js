const { ObjectId } = require('mongodb');

function LikeDao() {
  let likeCollection;

  this.initialize = async (client) => {
    if (likeCollection) {
      return;
    }

    try {
      likeCollection = await client.db().collection('likes');
    } catch (err) {
      console.error(err);
    }
  };

  this.show = async (email, planId) => {
    try {
      const result = await likeCollection.findOne({
        email,
        planId: ObjectId(planId),
      });

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.create = async ({ email, planId, session }) => {
    try {
      const result = await likeCollection.insertOne(
        {
          email,
          planId: ObjectId(planId),
          createdAt: new Date(),
        },
        { session },
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.delete = async ({ email, planId, session }) => {
    try {
      const result = await likeCollection.deleteOne(
        { email, planId: ObjectId(planId) },
        { session },
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };
}

const likeDao = new LikeDao();

Object.freeze(likeDao);

module.exports = likeDao;
