const likeDao = require('./like.dao');
const planDao = require('./plan.dao');

function Transaction() {
  let client;

  this.initialize = (clientInstance) => {
    if (client) {
      return;
    }

    client = clientInstance;
  };

  this.addLikeTransaction = async (email, planId) => {
    const session = client.startSession();
    try {
      const result = await session.withTransaction(async () => {
        const createLikeResult = await likeDao.create({
          email,
          planId,
          session,
        });
        const updateLikeResult = await planDao.updateLike({
          planId,
          val: 1,
          session,
        });

        return [createLikeResult, updateLikeResult];
      });

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    } finally {
      session.endSession();
    }
  };

  this.removeLikeTransaction = async (email, planId) => {
    const session = client.startSession();
    try {
      const result = await session.withTransaction(async () => {
        const createLikeResult = await likeDao.delete({
          email,
          planId,
          session,
        });
        const updateLikeResult = await planDao.updateLike({
          planId,
          email,
          val: -1,
          session,
        });

        return [createLikeResult, updateLikeResult];
      });

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    } finally {
      session.endSession();
    }
  };
}

const transaction = new Transaction();

Object.freeze(transaction);

module.exports = transaction;
