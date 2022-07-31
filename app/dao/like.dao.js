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

  this.create = async ({ email, planId, session }) => {
    try {
      const result = await likeCollection.insertOne(
        {
          email,
          planId,
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
        { email, planId },
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
