import * as mongodb from 'mongodb';
import { LogModel } from "../models/LogModel";

class LogDao {
    static logCollection: mongodb.Collection | undefined;
    
    static async initialize(client: mongodb.MongoClient) {
        if (this.logCollection) {
            return;
        }
        try {
            this.logCollection = await client.db().collection('logs');
            //note the warning on 'await' keyword - async line 14 n/a
        } catch (err){
            console.log(err);
        }
    }

    static async login(email: string) {
        try {
            if (!this.logCollection){
                throw new Error(`Log collection hasn't been initialized`);
            }
            const newLog = new LogModel(email, 'login');
            const result = await this.logCollection.insertOne(newLog);
          return result;
        } catch (err) {
          console.error(err);
        //   throw new Error(err.message); //need for exit?
        }
    }

    static async logout(email: string) {
        try {
            const newLogOut = new LogModel(email, 'logout');
            const result = await this.logCollection?.insertOne(newLogOut); //alternate for optional chaining?
            return result;
        } catch (err) {
            console.error(err);
            // throw new Error(err.message); //need for exit?
        }
      };

}

export default LogDao;
  