import * as mongodb from 'mongodb';

//the following are pending PR 67 and planDao update
// import LikeDao from './likeDao';
// import PlanDao from './planDao';

//to repl with above
import likeDao = require('./like.dao');
import planDao = require('./plan.dao');

class Transaction {
  static client: mongodb.MongoClient;

  static initialize(clientInstance: /* ? */) {
    if (this.client) {
      return;
    }

    this.client = clientInstance;
  };

  static async addLikeTransaction (email:string, planId: /*string or objid?*/) {
    const session = this.client.startSession();
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
    } finally {
      session.endSession();
    }
  };

  static async removeLikeTransaction (email:string, planId: /*tbc */) {
    const session = this.client.startSession();
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
    } finally {
      session.endSession();
    }
  };
}

export default Transaction;
