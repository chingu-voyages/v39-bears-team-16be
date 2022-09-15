import * as mongodb from 'mongodb';

class ProgressDao {
  static progressCollection: mongodb.Collection | undefined;

  static async initialize(client: mongodb.MongoClient) {
    if (this.progressCollection) {
      return;
    }

    try {
      this.progressCollection = await client.db().collection('progresses');
    } catch (err) {
      console.error(err);
    }
  }
}

export default ProgressDao;
