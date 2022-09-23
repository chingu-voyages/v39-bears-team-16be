import * as mongodb from 'mongodb';

export interface PasswordResetTokenInterface {
  _id: mongodb.ObjectId;
  email: string;
  token: string; 
  createdAt: Date;
}

export class PasswordResetTokenModel implements PasswordResetTokenInterface {
    _id: mongodb.ObjectId;
    email: string;
    token: string; 
    createdAt: Date;

  constructor(
    email = '',
    token = '', 
  ) {
    this._id = new mongodb.ObjectId();
    this.email = email;
    this.token = token;
    this.createdAt = new Date();
  }
}
