import * as mongodb from 'mongodb';
import { PasswordResetTokenModel } from '../models/PasswordResetTokenModel';
import * as crypto from 'crypto'; //no default module or named module 'crypto' 

class PasswordResetTokenDao {
  static passwordResetTokenCollection: mongodb.Collection | undefined;
  
  static async initialize (client: mongodb.MongoClient) {
    if (this.passwordResetTokenCollection) {
      return;
    }

    try {
      this.passwordResetTokenCollection = await client.db().collection('passwordResetTokens');
    } catch (err) {
      console.error(err);
    }
  };

  static async find (email:string) {
    try {
        const passwordResetToken = await this.passwordResetTokenCollection?.findOne({ email }); //note optional chaining
        return passwordResetToken;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  static async create(email:string, token:string) {
    //when this vs when would optional chaining be acceptable?
    if (!this.passwordResetTokenCollection) {
        throw new Error(`Password-reset-token collection hasn't been initialized`);
    }
    const passwordResetTokenInstance = new PasswordResetTokenModel(email, crypto.randomBytes(32).toString('hex'));

    try {
        const result = await this.passwordResetTokenCollection.insertOne(passwordResetTokenInstance);
      return result;
    } catch (err) {
      console.error(err);
    //   throw new Error(err.message); //need for exit?
    }
  };

  static async delete(email: string) {
    if (!this.passwordResetTokenCollection) {
        throw new Error(`Password-reset-token collection hasn't been initialized`);
    }
    try {
      const result = await this.passwordResetTokenCollection.deleteOne({ email });
      return result;
    } catch (err) {
      console.error(err);
    //   throw new Error(err.message); //need for exit?
    }
  };
}

export default PasswordResetTokenDao;
